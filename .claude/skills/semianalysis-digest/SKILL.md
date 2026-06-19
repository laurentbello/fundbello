---
name: semianalysis-digest
description: >
  Process incoming SemiAnalysis newsletter emails into a buy-side investment digest and email
  the digest back to the user from their own Gmail, then archive the original. Trigger this
  WHENEVER a new SemiAnalysis email arrives, whenever the user says "process SemiAnalysis",
  "run the semi digest", "any new SemiAnalysis", or whenever a scheduled/daily loop checks the
  inbox. Also use it if the user pastes a semianalysis.com article link and asks for the
  portfolio read-through. Do not wait for the user to spell out all eight sections — this skill
  IS the standing instruction for how SemiAnalysis content gets summarized for this portfolio.
---

# SemiAnalysis Digest

Turn each SemiAnalysis newsletter into a concentrated-portfolio investment memo, email it to the
user, and clear the original from the inbox. The user is a quality-compounder PM (20–25 names,
10–15% IRR hurdle; Nomad/Akre/TCI frameworks) with direct semiconductor/AI-infrastructure exposure.
Extract investment signal — do not recap the article — and do it the same way every time so the
outputs are comparable across issues.

## Runtime: free, no third parties

This runs on the user's own stack only: Claude Code (on their Pro/Max subscription, not the metered
API) and their own Gmail. Claude reads the mail through the Gmail connector and delivers the finished
digest back to the same Gmail account. No external email service, no Anthropic API key.

Two delivery environments, two transports:

- **Claude Code on the web (default for the daily scheduled run).** Outbound SMTP (port 587) is
  BLOCKED in the web container, so `send_digest.py` cannot run there. Deliver the digest by creating
  a **Gmail DRAFT** via the Gmail connector (it reuses the session's Google auth — no credentials
  file needed). The draft lands in Drafts for the user to read/send. This is the standing path.
- **Local machine (optional).** If run on a machine with SMTP egress and a configured App Password,
  `send_digest.py` (Gmail SMTP) sends a real email. Use this only when actually running locally.

A daily scheduled web session at 05:00 invokes this skill, checks the inbox, and produces a draft
ONLY when there is a genuinely new SemiAnalysis email — no new mail, no draft.

## Why email is the source of truth (not RSS)

SemiAnalysis moved off Substack to their own login-gated site. A public RSS feed exists, but it only
carries free articles, usually truncated to a teaser. The full deep-dives arrive as full text inside
the subscriber email. So always work from the email body. Never substitute a truncated RSS teaser
for the full email content.

## Workflow

Each new SemiAnalysis email = one digest email + one archive action. Run in order.

### 1. Find unprocessed SemiAnalysis emails
Search Gmail for newsletters not yet digested:
```
label:SemiAnalysis -label:SemiAnalysis/Processed
```
If the `SemiAnalysis` label isn't set up, fall back to sender search and treat inbox items as new:
```
from:(semianalysis.com OR semianalysis@substack.com) in:inbox newer_than:14d
```
Process oldest first. If none, say so plainly and stop — do not invent content.

### 2. Pull full content + canonical link
Read the entire email body, not the snippet. Extract the article link and strip tracking junk
(`utm_*`, `?token=…`, `publication_id`, `post_id`, `isFreemail`, `r=…`); keep the clean
`https://semianalysis.com/...` or `https://newsletter.semianalysis.com/p/...` URL — it goes in the
digest so the user keeps the original. If the email is only a teaser, fetch the canonical URL; if it's
paywalled and unreadable, say so explicitly and analyze only what's visible — never fabricate the
deep-dive's specifics.

### 3. Load current portfolio context
Read `portfolio.yaml` from the superforecaster project if present (authoritative). Otherwise use this
semiconductor / AI-infra subset (keep current): Held — ASML, Alphabet, Meta, Amazon, Microsoft, Lam
Research. Watchlist/read-through — foundries (TSMC, Intel, GlobalFoundries), equipment (Applied
Materials, KLA, Tokyo Electron), memory/HBM (SK Hynix, Micron, Samsung), networking/optics (Broadcom,
Arista, Marvell, Coherent), accelerators (Nvidia, AMD), power & cooling electricals (Vertiv,
Schneider SU.PA, Eaton, GE Vernova, Hitachi Energy).

### 4. Run the analysis — the contract: eight sections + score
Act as a buy-side semiconductor analyst writing for the PM. Terse and quantitative. Produce exactly:

```
SECTION 1 — TL;DR (3–5 bullets), each tagged [FACT]/[OPINION]/[TEASER].
SECTION 2 — Bottleneck read: where the binding AI-infra constraint sits, whether it's moving,
            who captures the rent.
SECTION 3 — Quantitative nuggets: each number tagged [SA-DATA]/[SA-EST]/[3P]/[UNSOURCED].
            No untagged numbers.
SECTION 4 — Pricing power & moat signals for names in/around the book.
SECTION 5 — Portfolio read-throughs: one line per held/watched name the article touches:
            ticker | holding/watchlist | signal (strengthening/weakening/neutral/broken) |
            action (none/monitor/add-on-weakness/trim) | kill-criterion touched? (Y/N). Omit
            names the article doesn't bear on.
SECTION 6 — New ideas surfaced (skip if nothing genuinely new).
SECTION 7 — Monitor / what would change the view (1–3 datapoints).
SECTION 8 — Worth-the-paywall verdict (one line).
SIGNAL SCORE: X/5 with one-line why (1 = noise; 5 = directly actionable for a held/near-entry name).
```
Keep it readable in two minutes. Preserve ranges and exact figures. If the article is outside the
book's relevance, a 1/5 with a two-line explanation is a complete, correct output.

### 5. Deliver the digest back to the user's own Gmail
Render the digest (link + date + score at top, then the eight sections). Subject leads with the score
so the user can triage from the subject line:
`SemiAnalysis Digest [<score>/5] — <title>`.

**Default (Code on the web): create a Gmail DRAFT via the connector**, addressed to the user
(`<DIGEST_RECIPIENT>`), with the rendered digest as the body. SMTP is blocked in the web container,
so this is the only path that works there. The draft sits in Drafts; the user reads it and taps send.

**Optional (local machine with SMTP egress + App Password): send for real** by writing the body to
`/tmp/sa_digest.txt` and running:
```
python <skill_dir>/send_digest.py --to <DIGEST_RECIPIENT> \
  --subject "SemiAnalysis Digest [<score>/5] — <title>" --bodyfile /tmp/sa_digest.txt
```
Only use `send_digest.py` when actually running locally — it will fail in the web container.

### 6. Mark processed (and archive only when actually sent)
Only after delivery succeeds, add the `SemiAnalysis/Processed` label to the original (create the label
if missing). This label is the idempotency guard that stops the next daily run from re-processing it.

- **Draft mode (web):** add the `Processed` label but LEAVE the original in the inbox (do not remove
  `INBOX`). The digest is only a draft, so the user should still see the source email until they act
  on it. The label prevents a duplicate draft tomorrow.
- **Sent mode (local SMTP):** after a successful send, also archive the original (remove `INBOX`).

If delivery fails (draft not created, or send errors), do nothing to the original and report the
failure — never mark processed an email whose digest didn't go out.

## Idempotency & edge cases
- Never double-process: the `SemiAnalysis/Processed` label is the guard. Honor it.
- Multiple new issues at once: process each independently — one digest + one archive per article.
- Non-newsletter mail (receipts, account notices): not deep-dive content — archive/label processed
  without a digest, and note it briefly.
- Paywalled/unreadable body: digest what's visible, flag the gap, still include the canonical link.
- Sourcing discipline: every Section 3 number carries a tag. An untagged figure is a defect.

## Delivery decision (summary)
- **In Claude Code on the web** (the scheduled daily run): always deliver as a Gmail DRAFT via the
  connector. SMTP egress is blocked, so `send_digest.py` cannot run; the connector needs zero
  credentials because it reuses the session's Google auth. The digest sits in Drafts to read — no push
  notification until the user taps send.
- **On a local machine** with SMTP egress and a configured App Password: prefer `send_digest.py` for
  real delivery to the inbox. (App Password setup: Settings → enable 2-Step Verification first, then
  generate the password; creds live in `~/.config/semianalysis/env`.)
- If neither sending nor drafting is possible, report it — never fabricate a digest or silently drop it.
