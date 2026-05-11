---
title: "The Implementation Plan: How to Keep Context When AI Codes Faster Than You Can Think"
description: "AI coding tools removed code as the bottleneck. What they did not solve is the reasoning that should travel with that code. The Implementation Plan is the structural answer."
date: 2026-04-28
layout: layouts/post-header-overlay.njk
permalink: /en/blog/implementation-plans-how-to-keep-context/index.html
author: Edwin Torres
headerImage: /assets/images/blog/ip-series/implementation-plans-hero.jpg
headerImageAlt: A black beach cruiser bicycle parked on the sand at golden hour, ocean and soft cloud horizon behind it.
eleventyNavigation:
  key: Blog
  parent: Archive
  order: 2
locale: en
tags:
  - engineering
  - ip-system
  - ai-assisted-development
translation: /es/blog/planes-de-implementacion-como-mantener-el-contexto/
---

AI coding tools have changed one thing fundamentally: code is no longer the bottleneck. A task that took two days now takes two hours. A feature that required a week closes in an afternoon.

But here is what nobody warned you about: **the reasoning that should accompany that code does not scale with the velocity. Only the code does.**

Open any community thread about Claude Code, Cursor, or similar tools and you will find the same complaint surfacing everywhere. The AI forgets the plan. Context compacts, the session resumes, and the tool starts making decisions that contradict ones already made two hours ago. It implements something that was explicitly rejected. It reports success on a task that missed the original intent entirely.

The workarounds are all variations of the same desperate patch: write the plan to a file, update it before compaction, hope the AI reads it on resume. Manual. Fragile. And still losing the *why*: the reasoning, the constraints, the alternatives that were considered and rejected before the first file was opened.

This is not a tooling problem waiting for the next model release to fix. It is a structural problem. And structural problems have structural solutions.

What I landed on, from my own work, is what I call the Implementation Plan.

---

## What an Implementation Plan Is

An Implementation Plan (IP) is a document that lives in your repository, carries a stable ID, and does four things a classical spec does not.

It captures the **ordered plan** to execute the work, not just the target. Phase by phase, task by task, with exit criteria per phase so you know exactly when to move and what constitutes done.

It embeds the **decision record** inline. When a non-obvious choice has to be made, with two valid approaches and real tradeoffs, the options, the scoring, and the reasoning live inside the IP, not in a separate document that drifts away from the code it produced.

It records the **outcome**. What actually happened when the work ran. Bugs discovered. Decisions revised. Tests that caught things nobody foresaw. The pre-image and the post-image in the same artifact.

And it stays **alive after the work is done**. The IP does not get filed. Each IP gets a stable, sequential ID when it is created (`IP-001`, `IP-002`, `IP-003`), and that ID is the permanent handle the rest of the system points to. So when a decision in `IP-080` depends on a rule established in `IP-050`, `IP-050` is the authoritative source. Not a blog post about the decision. The decision itself, with the tests that prove it holds and the notes from when it almost did not.

One document. One ID. Spec plus plan plus outcome plus memory.

---

## What This Looks Like When It Works

Picture this: you are deep in a session, the agent is working, and a question lands that none of the open files answer. Can a downstream action read the output of a specific item inside a fan-out operation?

The implementation tool did not guess. It did not generate a plausible answer from first principles. It investigated, found the signal scope rules established in a prior IP, and returned the answer directly: per-item signals go to the stream, not the registry. Signal visibility rules prevent cross-boundary leakage. This is already decided.

The prior IP had never been referenced in that session. The tool hit a boundary, recognized the boundary had been answered, and applied the existing answer: the tests that proved it, the Architecture Decision Record (ADR) that scored the options, and the outcome notes from when the implementation ran.

This is the distinction that matters: **memory beats generation when the answer already exists, because memory carries the full context behind that answer (the tests, the alternatives, the reasoning), while a generated answer carries only its own plausibility.**

A plan mode in a coding agent can generate a plausible answer to the signal-visibility question. An IP system lets the agent retrieve the answer that was already settled. Those are not the same operation and they do not produce the same quality of result.

---

## Context Embedded in the Code Itself

The IP does not just live next to the code. It travels with it.

Every significant block of code that exists because of an IP carries a reference to it, a comment in the form of `// IP-042: signal scope rules, per-item outputs go to stream not registry`. That comment is not documentation. It is a pointer.

Any engineer reading that file, human or AI, can follow the pointer, open `IP-042`, and find the full decision: what was considered, what was rejected, what the tests look like, what happened when it ran. The reasoning is not in someone's head. It is not in a chat thread that compacted. It is in a file, in version control, one reference away from the code it produced.

This is what makes the sequence behave like memory. One IP is a spec with a plan and an outcome. A numbered sequence of IPs is a map of the terrain: decisions that narrow the solution space for every IP that follows, constraints that prevent a whole class of bad designs from being proposed, rules that any new session can retrieve without you having to re-explain them.

You are not just building your application. You are writing its history. And when you (or the next engineer, or the next AI session) need to know what was done and why, the system is already there to answer.

---

## When to Write One

Not everything needs an IP. Small fixes, isolated changes, trivial updates: skip it.

Write an IP when the change affects more than one layer of the system, when the decision involves a tradeoff worth recording, when the implementation will span more than one AI session, or when you are making a call you will need to explain later, to a human or to a tool that has no memory of the conversation where you made it.

The threshold is not complexity. It is consequence.

Start with one. Write the problem statement first. If you cannot state it clearly, you are not ready to hand it to an AI. Then the design, the constraints, the phases. Open the coding session with the IP as context, not as an afterthought. Close phases as they complete. Reference the IP from the code it produces.

After a few of these, the format becomes instinct. After enough of them, the codebase carries its own reasoning, and every session you open inherits that reasoning automatically, without you re-explaining what was already decided.

---

## The Constraint That Keeps It Honest

One rule makes the sequence trustworthy: **no open gaps.**

Every bug discovered during implementation gets fixed before the IP closes. Every architectural question gets answered before code is written. Not deferred. Not worked around. Answered.

If a fix would derail the current IP, the answer is not deferral. You open a new IP for it on the spot. At this implementation velocity, context disappears in a blink, for you and for the AI alike. Use the context while you have it. Defer it, and what gets written later is a guess, not a record.

Because you are actively working from the IP, the gap is visible in front of you, not buried in a backlog. You cannot close an IP while pretending you did not see the hole. And because the IP stays alive after it closes, a hole that slips through gets paid for by every future IP that depends on the decision.

The rule is not perfectionism. It is maintenance of the memory. A sequence with silent gaps is not memory. It is a record with missing pages.

---

AI coding tools made implementation cheap. What they did not make cheap is the cost of implementation without intent.

The IP system keeps reasoning from falling behind the speed of implementation. The codebase that carries its own reasoning is the codebase that can be trusted: by the next engineer, by the next AI session, and by the version of you who opens it six months from now and needs to know not just what it does but why it exists.