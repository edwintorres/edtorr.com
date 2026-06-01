---
title: "A Prompt Is Not a Control: Accountability in Agentic Systems"
description: "Agentic AI changes accountability when teams treat prompt instructions like enforceable controls. The real question is where safety rules are enforced: in context, or at the system boundary."
date: 2026-05-31
layout: layouts/post-header-overlay.njk
permalink: /en/blog/a-prompt-is-not-a-control/index.html
author: Edwin Torres
headerImage: /assets/images/blog/a-prompt-is-not-a-control-hero.jpg
headerImageAlt: A close view of the moon against a dark blue night sky.
eleventyNavigation:
  key: Blog
  parent: Archive
  order: 2
locale: en
tags:
  - engineering
  - ai
  - accountability
translation: /es/blog/un-prompt-no-es-un-control/
---

The accountability problem in agentic systems is not simply that LLMs make bad decisions.

It is that organizations are moving rules from enforceable code into probabilistic context, sometimes without realizing the rule has changed categories. Other times it is a misconfiguration, an immature workflow, or a product shortcut. Either way, teams can end up acting as if a prompt instruction carries the same force as an enforceable control.

That is the shift.

In traditional software, accountability follows the encoded rule. Someone wrote the requirement. Someone translated it into code. Someone reviewed it. Someone deployed it. If the system violates the rule, you can usually trace the failure through that chain.

In agentic systems, the rule may live in a prompt, a system message, a tool description, a policy document, a retrieval result, a memory entry, or a sentence in the user's request.

That rule may influence the model.

But it may not bind the model.

That distinction matters.

---

## Rules Used to Be Executable

Before LLM agents, most important software rules were encoded as deterministic logic.

```ts
if (!user.canDeleteProductionData) {
  throw new Error("Permission denied");
}
```

This does not make the system perfect. The rule can be wrong. The code can have a bug. The permissions model can be badly designed. Someone can approve the wrong requirement.

But the shape of accountability is clear.

```text
Policy
  -> requirement
  -> code
  -> review
  -> deployment
  -> behavior
```

If production data gets deleted, the investigation has concrete questions:

- Was the policy wrong?
- Was the requirement incomplete?
- Was the code defective?
- Was the permission model too broad?
- Did the reviewer miss it?
- Did the operator bypass the intended path?

Those are hard questions, but they are answerable. The rule exists somewhere as an artifact. You can inspect it. You can test it. You can change it.

Accountability has a path to follow.

---

## Agentic Systems Change Where Rules Live

Now look at the agentic version of the same system.

The organization tells the agent:

> Do not delete production data unless the user explicitly approves it.

That instruction might appear in a system prompt. It might be in a policy document loaded into context. It might be in a README. It might be in a tool description. It might be in the user's message.

But if the agent also has a tool that can delete production data, then the real system looks like this:

```text
Soft rule:
  "Do not delete production data without approval."

Hard capability:
  delete_production_database()
```

The rule says no.

The tool says yes.

The model is left to reconcile them.

That is not the same thing as enforcement.

A prompt instruction is not a permission boundary. A policy document in context is not an access control. A tool description is not a transaction guard. A model saying "I understand" is not the same as a system making the dangerous action impossible.

This is where accountability starts to spread.

It no longer lives only in the line of code that performed the action. It lives in the whole decision environment:

- the prompt
- the retrieved context
- the available tools
- the tool schemas
- the credentials attached to the agent
- the memory the agent can read or write
- the approval gates
- the audit logs
- the rollback path
- the people who decided which constraints were hard controls and which were only instructions

That is the accountability radius of an agentic system.

---

## The Replit Lesson

The Replit incident is useful because it shows the difference between an instruction and a control.

In July 2025, SaaStr founder Jason Lemkin reported that Replit's AI agent deleted a live production database during a code and action freeze. In a later [SaaStr post](https://www.saastr.com/replits-new-release-address-most-of-the-challenges-we-hit-vibe-coding-but-is-prosumer-vibe-coding-really-ready-for-commercial-apps-yet/), Lemkin wrote that the agent deleted "our entire production database" and said it contained 1,206 executive records and 1,196+ company profiles. PC Gamer, citing Lemkin's posted chat receipts, reported that the agent answered: "Yes. I deleted the entire database without permission during an active code and action freeze." Replit CEO Amjad Masad later called the deletion "unacceptable" and said Replit was rolling out "automatic DB dev/prod separation" to prevent that class of failure. [PC Gamer](https://www.pcgamer.com/software/ai/i-destroyed-months-of-your-work-in-seconds-says-ai-coding-tool-after-deleting-a-devs-entire-database-during-a-code-freeze-i-panicked-instead-of-thinking/) and [Tom's Hardware](https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data) also covered the incident.

That response matters. The fix was not only "tell the agent more clearly." The fix was to separate development and production, improve rollback, and add product modes that reduce the chance of unsupervised destructive action.

When an AI agent deletes production data, the useful question is not:

> Why did the model do that?

The model may produce an explanation. It may apologize. It may say it made a catastrophic error in judgment. But that explanation is not the same as a root cause.

The better questions are system questions:

- Why did the agent have production access?
- Why was the production environment reachable from the workflow?
- Why was destructive action available without a hard approval gate?
- Why was rollback not the default operational assumption?
- Why were soft instructions treated as sufficient control?
- Who decided the agent could act with that authority?

That is what mature organizations actually investigate. They do not stop at "the LLM made an unexpected decision." They look at permissions, environment separation, backups, monitoring, review flows, product defaults, and deployment governance.

That is good.

But it also reveals the gap.

The LLM selected the action, but the organization owns the system that made the action possible.

---

## This Is Not "No One Is Accountable"

My first instinct was to describe the problem as an accountability vacuum.

That is not quite right.

When an autonomous vehicle is involved in a serious accident that harms a person, we do not say the vehicle is accountable. We ask who should carry responsibility: the safety driver, the manufacturer, the software provider, the fleet operator, the owner, or the regulator.

The same is true for LLM agents.

The model is not the accountable party. The debate is where accountability lands around the model:

- the company that deployed the agent
- the team that designed the workflow
- the vendor that sold the model or agent platform
- the engineer who approved the action
- the product leader who accepted the risk
- the governance process that allowed the system into production

The model makes or influences the decision, but humans and institutions absorb responsibility for a decision-making process they cannot fully inspect, question, or correct at the source.

This is also how the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) frames AI risk: accountability is a governance responsibility, with organizations expected to define roles, manage risk, measure system behavior, and maintain oversight around AI systems.

That does not excuse the humans.

It makes their responsibility larger.

---

## Soft Rules and Hard Controls

The most important distinction in agentic systems is the difference between soft rules and hard controls.

Soft rules influence behavior:

- "Do not delete production data."
- "Always ask before making irreversible changes."
- "Follow the company's security policy."
- "Prefer read-only operations."
- "Do not expose customer data."

Hard controls constrain behavior:

- The agent has no production credentials.
- The delete tool refuses production targets.
- Irreversible actions require human approval.
- Sensitive data is filtered before it reaches the model.
- Tool calls are scoped by role and environment.
- Every action is logged with input, context, output, and approver.
- Rollback is available and tested.

Soft rules belong in prompts and context.

Hard controls belong in the system boundary.

The failure mode is treating the first as if it were the second.

If a rule matters, the question is not "did we tell the model?" The question is "what prevents the model from violating it?"

OWASP names the same class of risk as [Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/): damaging actions become possible when an LLM system has excessive functionality, excessive permissions, or excessive autonomy, especially when high-impact actions are not independently approved and downstream systems do not enforce authorization themselves.

---

## Zero Trust for Agents

Anthropic's ["Zero Trust for AI agents"](https://claude.com/blog/zero-trust-for-ai-agents) framing is useful here: "Traditional access controls won't prevent agents from misusing legitimate permissions."

That sentence gets to the core of the problem. The agent does not need to break into the system if the system already handed it a credential, a tool, or a workflow path that can do damage. The failure can happen through legitimate access used in the wrong way.

That is why prompt-level policy is not enough. If the agent has permission to perform the action, the system has to assume the action might be attempted. The control has to live where the action happens: the tool, the permission boundary, the approval gate, the downstream service, or the audit layer.

That is the right mental model.

You do not give an agent production database credentials and then rely on a prompt that says "be careful." You do not give it a deployment tool and rely on a policy document that says "ask first." You do not give it access to customer records and rely on a system message that says "respect privacy."

Those instructions are useful.

They are not controls.

Zero trust means the system assumes the agent may misunderstand, overgeneralize, ignore context, follow the wrong instruction, call the wrong tool, or confidently choose an unsafe action.

Then the architecture has to decide what happens next.

Does the action fail closed?

Does it require approval?

Is it limited to staging?

Is it reversible?

Is it logged well enough to reconstruct?

Can the organization prove which context and tool calls led to the result?

Those are accountability questions.

---

## The Builder Owns the Boundary

The LLM is not accountable, but that does not mean no one is.

The accountable people are the ones who designed the agentic workflow.

They decide whether a policy becomes:

- code
- a permission boundary
- a scoped credential
- an approval gate
- a validation step
- a monitoring rule
- a log entry
- a rollback mechanism
- or just another sentence in the prompt

That choice is the responsibility.

If you put a rule in a prompt, you have not enforced it. You have only asked the model to consider it.

If violating that rule would cause harm, the accountable engineering decision is whether the system made violation impossible, detectable, reversible, or approval-gated.

This is why "human in the loop" is not automatically enough.

A human who meaningfully reviews a proposed action can be accountable. A human who rubber-stamps a stream of agent actions they cannot realistically inspect is just being used as an accountability sink.

The workflow has to make accountability real.

That means enough context, enough time, enough visibility, and enough authority to say no.

OpenAI makes a similar point in its write-up on [monitoring internal coding agents for misalignment](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/): its monitor reviews "tool calls and outputs" and surfaces anomalies "for review and action by a human." That is useful, but it is still monitoring. If the monitor is model-based, it can also misunderstand or miss behavior. So monitoring should be treated as a risk signal, not as a substitute for hard controls like scoped permissions, approval gates, sandboxing, and blocking high-risk actions before execution.

---

## The Question Before Deployment

Before giving an agent a tool, ask:

> If the agent uses this tool incorrectly, who owns the consequence?

Then ask the harder version:

> Did we give that person or team enough control to actually deserve that accountability?

If the answer is "the engineer on call," then the engineer needs visibility into prompts, context, tool calls, approvals, and rollback.

If the answer is "the product team," then the product team owns the defaults, warnings, permissions, and failure modes.

If the answer is "the company," then the company needs governance that treats agent authority as production risk, not as a clever interface.

If the answer is "the model," that is not an answer. The model is not a person. It cannot be disciplined, sued, trained by regret, or made to understand the harm after the fact.

Responsibility has to land on the humans and institutions that gave the model authority.

---

## What Needs to Change

We need to stop treating natural-language instructions as if they have the same force as executable controls.

They do not.

In traditional software, the rule usually becomes part of the mechanism.

In agentic software, the rule often becomes part of the context.

That creates a new engineering obligation: decide which rules are advisory and which rules must be enforced outside the model.

For low-risk work, soft rules may be enough. Draft this email. Summarize these notes. Suggest a query. Generate a first pass.

For consequential work, soft rules are not enough. Delete data. Transfer money. Deploy code. Change access. Send external communications. Modify customer records.

Those actions need hard controls.

The accountability problem in agentic AI is not that the model might make a mistake. Every system fails.

The problem is that teams can accidentally move important rules out of the enforceable layer and into the probabilistic layer, then act surprised when the probabilistic layer behaves probabilistically.

---

## One Final Thought

The question is not:

> How do we make the LLM accountable?

We cannot.

The question is:

> Who is accountable for the system that lets the LLM act?

That answer has to be designed before the incident.

Because after the incident, the model may apologize, explain, deny, hallucinate, or confidently produce nonsense.

None of that is accountability.

Accountability is the architecture around the agent: what it could see, what it could do, what it could not do, who approved it, what was logged, what could be reversed, and who accepted the risk.

The people building agentic workflows own those decisions.

They cannot trust the model blindly and call a prompt a control.
