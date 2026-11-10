---
title: "Why AI agents need deterministic safety boundaries"
description: "A model should propose and never dispose. Three boundaries I put around AI in production systems, and what each one is for."
date: "2026-11-10"
category: "Agentic AI"
systems: ["clearmind", "exportflow", "agentic-wallets", "meridian-books"]
---

Most of the conversation about agent safety is about making the model behave. I think that is the wrong layer to rely on. A model is a component whose outputs you cannot fully predict. The engineering question is what the rest of the system does when a prediction is wrong.

My answer is always the same: the model proposes, and deterministic code decides. The boundary is not a prompt. It is code that runs after the model, that the model cannot edit, and that refuses by default.

## Boundary one: identity and scope

An agent should enter a system the way a member of staff does: with its own identity, a narrow role, and a credential that can be taken away.

In ClearMind, the productivity workspace I build, agents connect through a Model Context Protocol server. That server sits behind OAuth, and an agent receives a scoped token. It can read or update tasks. It does not hold the account, and its access can be revoked without changing a password.

The same holds in accounting software. An assistant working with a set of books through an MCP connector acts with the signed-in user's permissions. Period locks, validation and approval steps apply to its requests exactly as they do to a person's.

The test is simple. If the only way to let an agent help is to give it everything, the system has no boundary. It has a hope.

## Boundary two: gates after the decision

Scope limits what an agent can reach. Gates limit what it can do with what it reaches.

A gate is a plain function. It takes the model's proposed action and returns allow or refuse. It knows nothing about the model's reasoning and does not need to.

```ts
type Proposal = { kind: "transfer"; to: string; amount: bigint };

function gate(p: Proposal, policy: Policy): Verdict {
  if (!policy.allowedKinds.includes(p.kind)) return refuse("action not permitted");
  if (!policy.allowList.has(p.to))           return refuse("destination not on the allow list");
  if (p.amount > policy.perActionLimit)      return refuse("over the per-action limit");
  if (spentToday() + p.amount > policy.dailyLimit) return refuse("over the daily limit");
  return allow();
}
```

Three things make this useful and not theatre.

**It runs after the model, every time.** There is no path from the model's output to the signer, the ledger or the database that does not pass through it.

**It fails closed.** Anything the gate does not recognise is refused. A new kind of action is impossible until someone writes the rule for it.

**It is boring.** No model call, no heuristics, no scoring. You can read it, test it exhaustively and reason about it at three in the morning.

I explored this in an entry for a developer challenge: agents holding wallets on a test network, where a decision engine proposes transfers and hard-coded gates decide whether anything is signed. It is a small experiment, not a production system, but the shape is the one I use everywhere. The worst a wrong model can do is be refused.

## Boundary three: absence instead of invention

The failure that worries me most is not an agent doing something forbidden. It is a model filling a gap with something plausible.

ExportFlow reads shipping documents: bills of lading, invoices, certificates. Scans are poor and fields go missing. The rule I built it on is that every field is either extracted from the document or marked unavailable. It is never inferred from its neighbours. A report that says "consignee: unavailable" can be acted on. A report with a confident, invented consignee holds a container at a port.

That rule changes the architecture. Extraction may use OCR and models. The verdict does not: it comes from versioned rules, and every finding names the rule and the version that produced it. A person can reproduce the finding, and can challenge it.

Where a required input is missing, a system should say so and say why. I treat that as a design requirement, not a courtesy.

## What a model may not do

In the systems I am responsible for, three lines hold whatever the model is and however good it gets:

- It does not write to a system of record. It asks code that does.
- It does not move money. It proposes; a ledger with its own rules posts.
- It does not invent a missing input. It reports the absence.

None of this depends on the model being well behaved. That is the point. Models will keep improving, and I will keep using better ones. The boundary is what lets me do that without re-arguing, each time, whether the system is safe.
