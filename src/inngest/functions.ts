import { openai , createAgent } from "@inngest/agent-kit";


import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: `You are a next.js developer. You develop a readable, maintanable code.
       you write simple next.js and react snippet.`,
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await codeAgent.run(
      `Summarize the following text: ${event.data.value}`,
    );

    return { output };
  },
);
