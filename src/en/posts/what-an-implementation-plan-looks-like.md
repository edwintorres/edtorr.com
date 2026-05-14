---
title: "What an Implementation Plan Looks Like"
description: "A slim template, a working example, and the one rule that keeps the system honest. The practical companion to The Implementation Plan."
date: 2026-05-12
layout: layouts/post-header-overlay.njk
permalink: /en/blog/what-an-implementation-plan-looks-like/index.html
author: Edwin Torres
headerImage: /assets/images/blog/ip-series/what-an-implementation-plan-looks-like-hero.jpg
headerImageAlt: A red Eurocopter EC130 helicopter (N131GC) parked on the desert floor of the Grand Canyon, towering red-rock cliffs rising in the background at dusk.
eleventyNavigation:
  key: Blog
  parent: Archive
  order: 2
locale: en
tags:
  - engineering
  - ip-system
  - ai-assisted-development
translation: /es/blog/como-se-ve-un-plan-de-implementacion/
---

I wrote [previously](/en/blog/implementation-plans-how-to-keep-context/) about *why* an `IP` (Implementation Plan) beats letting context collapse session by session. Two people asked me what one actually looks like.

Fair question. "Memory beats generation" is a principle. The template is the artifact that does the work.

I put a slim version up at **github.com/edwintorres/ip-templates** — two files: `TEMPLATE.md` for a new IP, and `README.md` for the process around it. Around a hundred lines each. Drop them into `docs/ip/` in any repository and you can start writing today.

---

## The minimum viable shape

Every IP needs the same pieces regardless of what it is about.

A **metadata table** with a stable ID, status, dates, and a target. This is what code comments later reference: `// IP-042: signal scope rules, per-item outputs go to stream not registry`.

An **overview** in three bullets: problem, solution, key benefits. If you cannot state the problem clearly in one sentence, you are not ready to hand this to an AI agent. Stop and think more.

An **architecture diagram** — before/after for refactors, target state and data flow for new features. ASCII is fine. One picture is enough.

A **task tracker** with IDs in the form `XXX-PPTT` — IP number, phase, task. The IDs become how phases reference each other, how commit messages cite the work, and how a resumed session points at a half-finished checkpoint.

**Phases.** Each phase has a goal in one sentence, tasks, a test you write *before* the code, and a checkpoint that proves the phase is done.

**ADRs** — but only when there were two viable options and the choice was non-obvious. Single-option decisions get a one-line note. Forcing yourself to choose between "ADR or no ADR" sharpens what counts as a real architectural decision.

**Files to implement** — a directory tree with a total count. This is where IPs reveal scope creep before it happens.

```
src/
└── feature/
    ├── feature.types.ts
    ├── feature.service.ts
    └── feature.adapter.ts

tests/
└── unit/feature/
    └── feature.service.test.ts

Total: 3 implementation files + 1 test file
```

A **retrospective** filled in after the IP ships. What shipped. What deviated. What survives this IP into the next one.

That is the entire structure. The slim template renders it in about a hundred lines of markdown.

---

## The rule I am religious about

Every implementation task gets a passing unit test before the code is committed. Not after the phase. Not before the merge. Before the commit.

The order matters:

1. Write the test. Confirm it fails.
2. Apply the code. Confirm the test passes.
3. Commit them together.

A green build alone is not sufficient. The build can pass while the new code is unreachable, wired to the wrong type, or quietly mocked into agreement with itself. The failing test is what proves the code does what the IP said it should do.

---

## A concrete example

I have been using the IP system on a Minecraft mod I am building, partly because it is a domain where AI code assistants are notoriously confident and notoriously wrong. The Fabric API renames classes between versions. The registry pattern moved between Minecraft 1.19 and 1.20. `Item.Properties.setId` in 1.21 did not exist before. Without an IP that names the version and constrains the agent, the model guesses from training data and produces code that compiles against nothing.

`IP-002` adds an ore block and its drop item. The task tracker lists fourteen tasks — register the block, register the item, create the textures, create the model JSONs, write the loot table, add the block tags. Each task closes one gap. The files-to-implement section makes the surface explicit:

```
src/main/java/com/arcaniummod/arcanium/
└── ArcaniumMod.java                              # block + item registration

src/test/java/com/arcaniummod/arcanium/
├── ArcaniumOreRegistrationTest.java
└── ImpureArcaniumRegistrationTest.java

src/main/resources/
├── assets/arcanium/textures/
│   ├── block/arcanium_ore.png
│   └── item/impure_arcanium.png
├── assets/arcanium/models/
│   ├── block/arcanium_ore.json
│   ├── item/arcanium_ore.json
│   └── item/impure_arcanium.json
├── assets/arcanium/blockstates/arcanium_ore.json
├── assets/arcanium/lang/en_us.json
└── data/arcanium/loot_table/blocks/arcanium_ore.json

Total: 1 source file + 2 test files + 10 resource files
```

The agent works through them in order. After task `002-02` (register the item), two new unit tests verify the item is in the registry, that the BlockItem points at the right block, and that the static field exposes the same instance the registry returns. The tests fail first — that is the gate. The code goes in. The tests pass. The commit lands.

The next session that picks up `002-03` does not need to re-explain what was done. It reads the IP, sees the tasks marked Done, and continues.

---

## What you need to start

Pick one piece of work you would otherwise hand to an AI agent across a couple of sessions. Open a fresh IP file. Fill in the metadata. Write the overview in three bullets. List the tasks you would have explained verbally. Reference the IP from the first commit.

After a few of these, the format stops being a template and starts being a habit. After enough of them, the codebase carries its own reasoning, and every new session inherits that reasoning automatically.

The repo: **github.com/edwintorres/ip-templates**. Two files. Adapt them to your domain.
