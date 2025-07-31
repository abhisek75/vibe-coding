import { Sandbox } from "@e2b/code-interpreter";

import { openai , createAgent } from "@inngest/agent-kit";


import { inngest } from "./client";
import { stepsSchemas } from "inngest/api/schema";
import { getSandbox } from "./util";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id" , async () => {
    const sandbox = await Sandbox.create("codexa-nextjs-test-22");
      return sandbox.sandboxId;
  });

    const codeAgent = createAgent({
      name: "code-agent",
      system: `You are a next.js developer. You develop a readable, maintanable code.
       you write simple next.js and react snippet.`,
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await codeAgent.run(
      `Summarize the following text: ${event.data.value}`,
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
    const sandbox = await getSandbox (sandboxId);
    const host = sandbox.getHost(3000);
      return `https://${host}`;
    
  })

    return { output , sandboxUrl };
  },
);
