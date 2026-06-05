# AI Leaders Daily — Moat & Disruption Watch

A daily agent for an **equity investor** whose edge is owning **strong-moat businesses at
reasonable valuations**. Every day at **1:00 PM Mauritius (MST, UTC+4)** it researches recent
interviews/announcements from the AI frontier, judges the **moat consequences** (what gets
threatened vs. strengthened), **stress-tests your watchlist** (Strong / Watch / Weakening per
holding), and **emails the briefing** to `laurentbello@gmail.com`.

**Runs on your Claude membership — no paid API.** The research/analysis happens inside a
Claude Code on the web **scheduled session** (covered by your subscription). That session sends
the email itself over Gmail SMTP, so there's no Anthropic API key and no draft step.

Voices tracked: **OpenAI · Anthropic · Google DeepMind · Fireworks AI · Base10 · Jensen Huang ·
Elon Musk · Dario Amodei** (plus broader lab/firm news that bears on competitive moats).

## Files
- `PROMPT.md` — the agent's instructions, output format, and delivery steps (single source of truth).
- `watchlist.md` — **you edit this.** Your holdings + the moat behind each; graded every run.
- `send_email.py` — delivery only (no LLM/API). Sends a pre-written digest JSON via Gmail SMTP.

## Setup (one-time) — as a Claude Code **Routine**
This runs as a scheduled cloud session on your Claude subscription (no API key). Routines are
created/managed at **[claude.ai/code/routines](https://claude.ai/code/routines)**, the Desktop
app, or `/schedule` in a **local terminal** — note `/schedule` is disabled *inside* a Claude
Code on the web session, so use the web Routines page.

1. **Add your holdings** → edit `watchlist.md` and commit.
2. **Merge this branch to the default branch.** Routines clone the repo's *default* branch, so
   these files (`PROMPT.md`, `watchlist.md`, `send_email.py`) must be on `main`.
3. **Create the routine** at [claude.ai/code/routines](https://claude.ai/code/routines) → **New routine**:
   - **Prompt:** *"Follow the instructions in `ai-leaders-daily/PROMPT.md` and send today's briefing."*
   - **Repository:** `laurentbello/fundbello`.
   - **Environment:** set **Network access = Full** (Gmail SMTP `smtp.gmail.com:465` is not in the
     default "Trusted" allowlist), and add **environment variables**:
     - `GMAIL_ADDRESS` — the Gmail account to send **from**
     - `GMAIL_APP_PASSWORD` — a Gmail **App Password** for that account
     - *(optional `RECIPIENT` — defaults to `laurentbello@gmail.com`)*

     App Password: enable 2-Step Verification on the sending Google account → Google Account →
     **Security → App passwords** → create one for "Mail" (16 chars). Gmail blocks plain-password
     SMTP; the app password is the supported path.
   - **Trigger → Schedule:** **daily at 1:00 PM**. Enter it in your **local (Mauritius) time** —
     the form converts to UTC automatically, so no cron math needed. (For a custom cadence you can
     run `/schedule update` from a local terminal; minimum interval is 1 hour.)
4. Click **Create**, then **Run now** on the routine's page to test immediately.

Each run: the cloud session researches → writes `out/digest.json` → runs `send_email.py` to
deliver it. Watch any run as a normal session to see exactly what it did.

## Editing what it watches
- **Your positions:** edit `watchlist.md`, commit. No code change.
- **The lens / format / voices:** edit `PROMPT.md`, commit.
- **The time:** change the trigger schedule (and PROMPT's date note if you move time zones).

## Cost
Zero API spend — the model work is part of your Claude membership. SMTP is free.

## Testing it now
Trigger a session manually with the same prompt: *"Follow `ai-leaders-daily/PROMPT.md` and send
today's briefing."* If `GMAIL_ADDRESS` / `GMAIL_APP_PASSWORD` are set and egress is open, the
email arrives; if not, the session reports the exact error so you can fix the setup.

## Why a Routine (not GitHub Actions)?
A cron in GitHub Actions can't use your Claude membership — it would need a paid API key. A
**Routine** runs the session on your subscription instead: same daily cadence, same hands-off
send, zero API billing. Note: routines must be **created by you** at claude.ai/code/routines —
there is no agent/API tool to create one (the `/fire` endpoint only *triggers* an existing
routine), and `/schedule` is disabled inside web sessions. So I prepared everything the routine
runs; creating the routine itself is the one step that has to happen in your account.
