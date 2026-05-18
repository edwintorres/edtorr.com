---
title: "AI Agents in Simple Terms"
description: "The word agent has lost most of its meaning. The fastest way to get it back is to look at one in code. Three pieces, one short file."
date: 2026-05-16
layout: layouts/post-header-overlay.njk
permalink: /en/blog/what-an-agent-is-in-30-lines-of-typescript/index.html
author: Edwin Torres
headerImage: /assets/images/blog/what-an-agent-is-in-30-lines-of-typescript-hero.jpg
headerImageAlt: A turquoise BOGA stand-up paddleboard resting diagonally on warm beach sand at golden hour.
eleventyNavigation:
  key: Blog
  parent: Archive
  order: 2
locale: en
tags:
  - engineering
  - agentic
translation: /es/blog/que-es-un-agente-en-30-lineas-de-typescript/
---

The words *agent* and *agentic* have been buzzing around so often that it is genuinely hard to see what is behind the jargon. It has started to sound like something only large companies can build. It is not. The structure fits in less than a hundred lines of TypeScript, and once you can see it, the word loses every bit of its mystery.

The fastest way out of the fog is to look at what an agent actually is, broken down into its pieces.

Boris Cherny, creator of Claude Code, gave the clearest explanation I have heard on Lenny's Podcast:

> But no one really has used an agent before, and this word agent just gets thrown around all the time, and it's just so misused. It's lost all meaning. But agent actually has a very specific technical meaning, which is it's an AI, it's an LLM that's able to use tools. So it doesn't just talk. It can actually act, and it can interact with your system. And this means it can use your Google Docs, and it can send email, it can run commands on your computer, and do all this kind of stuff.

An LLM with tools, in a loop. That is the whole thing. Here it is in pictures:

<pre class="mermaid">
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#f8f3e8', 'primaryTextColor':'#363126', 'primaryBorderColor':'#8c744a', 'lineColor':'#8c744a', 'secondaryColor':'#fff', 'tertiaryColor':'#fff' }}}%%
flowchart TD
  A([You ask the AI to do something]) --> B([Call LLM])
  B --> C{Need a tool?}
  C -->|yes| D([Run the tool])
  D -->|result| B
  C -->|no| E([The AI replies])
</pre>

The loop is the arrow from *Run the tool* back to *Call LLM*. That is what turns a model call into an agent. Here is the same idea in TypeScript:

```ts
import Anthropic from "@anthropic-ai/sdk";

// THE LLM. Standard SDK client.
const client = new Anthropic();

// THE TOOLS. Each tool has a name, a description the model reads, and
// a JSON schema for its arguments. This is the catalogue of what the
// agent is allowed to do.
const tools = [{
  name: "send_email",
  description: "Send an email to a recipient.",
  input_schema: {
    type: "object",
    properties: {
      to:      { type: "string" },
      subject: { type: "string" },
      body:    { type: "string" },
    },
    required: ["to", "subject", "body"],
  },
}];

// What a tool actually does. The model never runs this. Your code does,
// then hands the result back to the model.
function runTool(name, input) {
  if (name === "send_email") return `Sent to ${input.to}`;
  throw new Error(`Unknown tool: ${name}`);
}

// The conversation so far. Starts with one user message.
const messages = [
  { role: "user", content: "Email alice@example.com to say hello." },
];

// THE LOOP. Each iteration is one turn.
while (true) {
  // Ask the model what to do next, given everything so far.
  const res = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    tools,
    messages,
  });

  // Record what the model said so the next turn sees it.
  messages.push({ role: "assistant", content: res.content });

  // If the model did not ask for a tool, the task is done.
  if (res.stop_reason !== "tool_use") break;

  // Run every tool the model asked for, collect the results.
  const results = res.content
    .filter((b) => b.type === "tool_use")
    .map((b) => ({
      type: "tool_result",
      tool_use_id: b.id,
      content: runTool(b.name, b.input),
    }));

  // Feed the results back as a user message. Loop continues.
  messages.push({ role: "user", content: results });
}
```

That is it. That is an agent. Three pieces, all visible in the code:

**A model.** The `client.messages.create` call is the LLM. You hand it the conversation so far and ask what to do next.

**Tools.** The `tools` array is the catalogue of things the model is allowed to do. Each tool is a name, a description, and the shape of its input. In this case there is one tool, `send_email`, but you could add `run_query`, `edit_file`, `open_browser`, anything else you want the agent to be able to reach. The model picks; your code runs.

**A loop.** The `while (true)` is what makes this an agent and not just a model call. Each turn, the model either calls a tool (you run it, feed the result back) or it stops (you break out). The model drives its own next step every turn, and the loop is what lets a single instruction (*email alice*) turn into the sequence of calls that actually closes the task.

LLM. Tools. Loop. That is the entire architecture.

Once you can see those three pieces, *agent* stops being marketing and turns into a checklist:

- If a product calls itself an agent and the model cannot call tools, it is a chatbot.
- If it calls tools but only once and stops, it is a tool-using model, not an agent.
- If it calls tools in a loop, and picks its own next step each turn, it is an agent.

There is more to a production agent than this. Memory management, so a long task does not lose its place. Retries when a tool fails. Permissions on what the model is allowed to do. Structured prompts. Observability. Real systems carry a lot more on top. But they all sit on the same three pieces.

---

*The Boris Cherny quote is from his appearance on Lenny's Podcast, [Head of Claude Code: What happens after coding is solved](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens).*

---

## Try it

A real agent runs below in your browser. Paste your [Anthropic API key](https://docs.anthropic.com/en/api/getting-started), edit the agent code or the tools, hit Run. The three pieces from this post are right there: visible and live.

<tiny-agent lang="en"></tiny-agent>
<script type="module" src="/assets/js/tiny-agent.js"></script>

*The widget is [open source](https://github.com/edwintorres/tiny-agent) (MIT). Your API key stays in this browser tab.*

<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
  await mermaid.run();
</script>
