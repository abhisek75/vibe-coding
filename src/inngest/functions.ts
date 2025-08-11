import {z} from "zod";
import { Sandbox } from "@e2b/code-interpreter";

import { openai , createAgent, createTool , createNetwork, type Tool} from "@inngest/agent-kit";

//import { gemini , createAgent, createTool , createNetwork} from "@inngest/agent-kit";


import { prisma } from "@/lib/db";
import { inngest } from "./client";
import { stepsSchemas } from "inngest/api/schema";
import { PROMPT } from "@/prompt";

import { getSandbox , lastAssistantTextMessageContent} from "./utils";

import { Command } from "lucide-react";

interface AgentState{
  summary: string;
  files: { [path: string]: string } ;
};

export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id" , async () => {
    const sandbox = await Sandbox.create("codexa-nextjs-test-22");
      return sandbox.sandboxId;
  });

    const codeAgent = createAgent<AgentState>({
      name: "code-agent",
      description: "An expert coding agent",
      system: PROMPT,
      model: openai({ 
        model: "gpt-4o-mini",
        defaultParameters: { temperature: 0.5 },
       }),
      tools: [
        createTool({
          name: "terminal",
          description : "use the terminal to run commands",
          parameters : z.object({
            command: z.string(),
        }),
        handler: async ({ command },{ step } ) => {
          return await step?.run("terminal", async () => {
            const buffers = { stdout: "", stderr: "" };

            try{
              const sandbox = await getSandbox(sandboxId);
              const result= await sandbox.commands.run(command, {
                onStdout: (data: string) => {
                  buffers.stdout += data;
                },
                onStderr(data:string) {
                  buffers.stderr += data;
                   } 
              } );
              return result.stdout;
            }
            catch(e){
              console.error(
                `command failed:${e} \nstdout: ${buffers.stdout} \nstderror: ${buffers.stderr}`,
              );
              return  `command failed:${e} \nstdout: ${buffers.stdout} \nstderror: ${buffers.stderr}`;
            }
        });
      },
    }),
    createTool({
        name: "createOrUpdateFiles",
        description: "create or update files in the sandbox ",
        parameters : z.object({
          files: z.array(
            z.object({
              path: z.string(),
              content: z.string(),
            }),
          ),
         }),
          handler: async(
            { files },
            { step , network}: Tool.Options<AgentState>
          ) => {
            
            const newFiles  =  await step?.run("createorUpdateFiles", async () => {
              try{
                const updatedFiles = network.state.data.files || {};
                const sandbox  = await getSandbox(sandboxId);
                for (const file of files) {
                  await sandbox.files.write(file.path, file.content);
                  updatedFiles[file.path] = file.content;
                  return updatedFiles;
                  }
              }
              catch (e) {
                return "Error : " + e;
              }
           });

           if (typeof newFiles === "object"){
            network.state.data.files  = newFiles;
           }
          }
        }),
        createTool({
          name: "readFiles",
          description: "read files from the sandbox",
          parameters: z.object({
            files: z.array(z.string()),
             }),
             handler: async ({ files }, { step }) => {
              return await step?.run("readFiles", async () => {
              try{
                const sandbox = await getSandbox(sandboxId);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path: file, content });
                } 
                return JSON.stringify(contents);
              } 
              catch (e) {
                return "Error : " + e;
              }
              })
            },
        })
      ],
      lifecycle:{
        onResponse:async ({ result, network }) => {
          const lastAssistantMessageText  = 
          lastAssistantTextMessageContent(result);

          if (lastAssistantMessageText && network) {
            if(lastAssistantMessageText.includes("<task_summary>")){
              network.state.data.summary = lastAssistantMessageText;
          }
      }
      return result;
    }
      }
    });
    const network = createNetwork<AgentState>({
      name : "coing-agent-network",
      agents : [codeAgent],
      maxIter : 15,
      router : async ({network}) => {
        const summary = network.state.data.summary;
        if (summary){
          return;
        }
        return codeAgent;
        },

    });
    const result = await network.run(event.data.value);  

    const isError = 
     !result.state.data.summary ||
     Object.keys(result.state.data.files || {}).length === 0;
    
    const sandboxUrl = await step.run("get-sandbox-url", async () => {
    const sandbox = await getSandbox (sandboxId);
    const host = sandbox.getHost(3000);
      return `https://${host}`;
    
  });
  
   await step.run("save-result", async () => {
    if (isError) {
      return await prisma.message.create({
        data: {
          content: "Something went wrong. Please try agin.",
          role: "ASSISTANT",
          type: "ERROR",
        },
      });
    }

    return await prisma.message.create({
      data: {
        content: result.state.data.summary,
        role: "ASSISTANT",
        type: "RESULT",
        fragments:{
         create :{
            sandboxUrl : sandboxUrl,
            title: "Fragment",
            files: result.state.data.files, 
         },
        },
      },
    })
  });


    return { 
      url: sandboxUrl ,
      title : "fragment",
      files: result.state.data.files,
      summary : result.state.data.summary,

    };
  },
);
