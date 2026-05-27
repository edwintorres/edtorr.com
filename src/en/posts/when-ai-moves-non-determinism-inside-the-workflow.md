---
title: "Agentic Workflows Change Where Planning Happens"
description: "AI does not make data workflows simply smarter. It changes where uncertainty lives, and that changes how we should engineer the boundary between deterministic and probabilistic steps."
date: 2026-05-26
layout: layouts/post-header-overlay.njk
author: Edwin Torres
headerImage: /assets/images/blog/when-ai-moves-non-determinism-inside-the-workflow-hero.jpg
headerImageAlt: Warm orange arches inside an auditorium, viewed from the seating area toward the stage.
locale: en
draft: true
eleventyExcludeFromCollections: true
translation: /es/blog/los-agentes-de-ia-cambian-donde-ocurre-la-planificacion/
tags:
  - engineering
  - data-engineering
  - agentic
---

Given the same input, under the same conditions, the system should usually produce the same output.

That expectation shaped how we think about software. We write code. We run tests. We deploy pipelines. We debug failures by tracing what happened step by step.

This does not mean software was ever perfectly deterministic.

Distributed systems have race conditions. Randomized algorithms use probability. Machine learning models produce statistical results. Data pipelines can fail because a file arrived late, a schema changed, or a dependency timed out.

So non-determinism is not new.

What is changing is where non-determinism now lives.

In traditional data workflows, most uncertainty happens around the system: late data, bad records, network failures, missing files, unexpected formats, concurrency issues. The workflow itself is still usually written as a fixed sequence of steps.

1. Extract this data.
2. Validate this schema.
3. Transform these fields.
4. Load this table.

<pre class="mermaid">
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#f8f3e8', 'primaryTextColor':'#363126', 'primaryBorderColor':'#8c744a', 'lineColor':'#8c744a', 'secondaryColor':'#fff', 'tertiaryColor':'#fff' }}}%%
flowchart LR
  A([Extract data]) --> B([Validate schema])
  B --> C([Transform fields])
  C --> D([Load table])
  E([Late data]) -.-> A
  F([Bad records]) -.-> B
  G([Dependency timeout]) -.-> D
</pre>

Even when the inputs are messy, the instructions are explicit.

AI changes that pattern.

With LLMs, uncertainty moves inside the decision step itself. The model may summarize, classify, route, generate code, choose a tool, or decide the next action. The workflow is no longer only executing predefined logic. Part of the logic is being generated at runtime.

That is a major shift.

A normal data workflow says:

Run this step. Then run that step.

An AI workflow may say:

Look at the situation and decide what step should happen next.

An agentic workflow goes further:

Decide, act, observe the result, then decide again.

<pre class="mermaid">
%%{init: {'theme':'base', 'themeVariables': { 'primaryColor':'#f8f3e8', 'primaryTextColor':'#363126', 'primaryBorderColor':'#8c744a', 'lineColor':'#8c744a', 'secondaryColor':'#fff', 'tertiaryColor':'#fff' }}}%%
flowchart TD
  A([Receive request]) --> B([Validate inputs])
  B --> C([Load allowed tools and policies])
  C --> D([Build context])
  D --> E{LLM decides next step}
  E --> F([Call tool or take action])
  F --> G([Observe result])
  G --> H([Update context])
  H --> E
  E --> I([Return proposed output])
  I --> J([Validate schema and permissions])
  J --> K{Allowed to write?}
  K -->|yes| L([Commit result])
  K -->|no| M([Escalate for review])
</pre>

That loop is powerful, but it also changes the behavior of the system. The output is no longer just a product of code and data. It is also a product of context, prompts, model behavior, tool responses, and previous intermediate decisions.

This is why agents should not be understood as normal automation.

A script follows instructions.
A pipeline executes a plan.
An agent participates in creating the plan while it runs.

That distinction matters.

In data engineering, we are used to building pipelines that are repeatable. If a transformation fails, we want to rerun it. If a table looks wrong, we want to trace the lineage. If yesterday's load worked and today's failed, we compare inputs, code, schema, and environment.

Agentic workflows make that harder because the path itself may change from run to run.

The same user request may produce a different plan.
The same plan may call different tools.
The same tool result may lead to a different next step.
The same workflow may stop early, loop longer, or create a different output shape.

That does not make agentic workflows useless.

It means they belong to a different category of system.

They are not just deterministic pipelines with smarter steps. They are hybrid systems where deterministic execution and probabilistic decision-making are mixed together.

That mix is where the real engineering challenge begins.

There is a useful formal version of this argument in the paper [*The Stochastic Gap: A Markovian Framework for Pre-Deployment Reliability and Oversight-Cost Auditing in Agentic Artificial Intelligence*](https://arxiv.org/html/2603.24582v1). The authors frame agentic enterprise workflows as stochastic-control systems, where the question is not whether a next step looks plausible, but whether the full trajectory through the workflow is supported, governable, and worth the oversight cost.

The important question is not simply:

Can AI perform this task?

The better question is:

Which parts of this workflow must be deterministic, and which parts are allowed to be probabilistic?

For data workflows, that question matters a lot.

Some parts should remain strict: schemas, validations, permissions, lineage, writes, deletes, financial calculations, production loads.

Other parts may tolerate uncertainty: summarization, mapping suggestions, anomaly explanations, documentation drafts, exploratory analysis.

The danger is treating both categories the same.

When we add AI to data workflows, we are not just adding a smarter function. We are changing the determinism profile of the system.

That may be acceptable in some places. It may be dangerous in others.

The work now is learning where that boundary belongs.

<script type="module">
  import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";
  mermaid.initialize({ startOnLoad: false, securityLevel: "loose" });
  await mermaid.run();
</script>
