---
title: "Idempotency and replay protection in financial APIs"
description: "How to make a payment request safe to retry: idempotency keys, a request ledger, and why the check belongs in the same transaction as the money."
date: "2026-11-10"
category: "Financial engineering"
systems: ["ranawallet", "meridian-books", "wisdomsigma-ciu"]
---

A customer in a village buys electricity over USSD. The request reaches the server, the money moves, and the reply is lost on the way back. The handset shows an error. The customer tries again.

What happens next is decided long before that moment, by whether the API was designed so that the second request finds the first one's result. If it was not, the customer pays twice. On an unreliable network this is not an edge case. It is the normal case, and it is the first thing I design for.

## The rule

A state-changing request must be safe to send any number of times. The client attaches a key it generated for this one intent; the server guarantees that one key produces one effect.

Three properties make that guarantee real:

1. **The key names an intent, not a request.** "Top up meter 0412 with 2,000" gets one key, created before the first attempt and reused for every retry. A new key on each retry protects nothing.
2. **The server remembers the outcome, not just the key.** A retry must receive the original response, success or failure, so the client converges on the truth.
3. **The check and the effect commit together.** If the key is recorded in one transaction and the money moves in another, a crash between them leaves you with either a charged customer and no record, or a record and no charge.

## A request ledger

The simplest structure that satisfies all three is a table with a unique constraint, written in the same database transaction as the ledger posting.

```sql
create table idempotency_keys (
  tenant_id     uuid        not null,
  key           text        not null,
  request_hash  text        not null,   -- fingerprint of method, path and body
  status        text        not null check (status in ('in_progress', 'done')),
  response_code int,
  response_body jsonb,
  created_at    timestamptz not null default now(),
  primary key (tenant_id, key)
);
```

The handler does four things, in order:

```python
def handle(tenant, key, request):
    with db.transaction():
        row = insert_or_get(tenant, key, hash_of(request))   # unique constraint decides the race
        if row.request_hash != hash_of(request):
            return 422, "this key was used for a different request"
        if row.status == "done":
            return row.response_code, row.response_body        # replay: same answer, no new effect
        if not row.just_inserted:
            return 409, "the first attempt is still running"
        result = post_to_ledger(request)                       # double-entry, same transaction
        mark_done(tenant, key, result)
        return result
```

The unique constraint is the whole trick. Two identical requests that arrive at the same instant cannot both insert; the database picks a winner, and the loser is told to wait. No lock service, no distributed coordination: the database you already trust with the money also arbitrates the race.

## The details that bite

**Scope the key.** A key is unique per tenant, and usually per endpoint. A global key space lets one customer's key collide with another's.

**Fingerprint the request.** If the same key arrives with a different amount, that is a client bug or an attack. Refuse it. Never replay the old response for a request that is not the same request.

**Store failures too.** If the first attempt was declined, the retry should be told it was declined. Otherwise a retry becomes a way to roll the dice again.

**Decide what "in progress" means.** A request that died mid-flight leaves a row that is neither done nor running. Give it a deadline, and let a later retry take it over only once that deadline has passed.

**Do not expire keys early.** A phone that has been offline for a week will retry when it comes back. The retention window has to match how long your clients can be offline, not how long a web request lasts.

## Beyond the database

Idempotency ends where your transaction ends. The moment a request calls another system, such as a vending service that issues an electricity token, you are back to the original problem with a new counterparty.

Two rules carry over. Pass the same key downstream if the provider supports one, so a retry of your call is also a replay for them. And when a reply is lost, ask before you act again: query the outcome of the first attempt instead of sending a second. This is the same rule a prepayment meter app has to follow over Bluetooth. A token is money already paid, so the app I built for that never resends one on its own, and it confirms the result when the meter's answer does not arrive.

## Why this comes first

A double-entry ledger tells you afterwards that something is wrong. Idempotency stops it going wrong. Together they give you the property that matters for anyone who is trusted with other people's money: every intent is applied exactly once, and you can prove it.

I make money paths un-replayable before I make them fast. Speed can be added to a correct system. Correctness is much harder to add to a fast one.
