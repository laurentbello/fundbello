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

## Setup (one-time, in Claude Code on the web)
1. **Add your holdings** → edit `watchlist.md` and commit (placeholder examples are in there now).
2. **Set two environment variables** on the environment this repo uses (so the scheduled session
   can send mail):
   - `GMAIL_ADDRESS` — the Gmail account to send **from**
   - `GMAIL_APP_PASSWORD` — a Gmail **App Password** for that account
   - *(optional `RECIPIENT` — defaults to `laurentbello@gmail.com`)*

   Getting an App Password: enable 2-Step Verification on the sending Google account, then
   Google Account → **Security → App passwords** → create one for "Mail" and use the 16-char
   value. (Gmail blocks plain-password SMTP; the app password is the supported path.)
3. **Make sure the environment's network policy allows outbound** (SMTP to `smtp.gmail.com:465`).
   If egress is locked down, the send step will fail with a connection error — loosen the policy
   or tell me and I'll adapt. (Web search for the research step also needs network access.)
4. **Create a scheduled trigger** (Automations / "Schedule" in the web app) on this repo:
   - **When:** daily, 1 PM Mauritius. That's `0 9 * * *` if it asks for UTC cron, or pick
     timezone `Indian/Mauritius` at 13:00.
   - **Prompt:** *"Follow the instructions in `ai-leaders-daily/PROMPT.md` and send today's
     briefing."*
   - Ensure **web search** is enabled for that environment.

Each run: the session researches → writes `out/digest.json` → runs `send_email.py` to deliver it.

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

## Why not GitHub Actions?
A cron in GitHub Actions can't use your Claude membership — it would need a paid API key. Since
you want to avoid API billing, the scheduled-session approach above is the right fit: same daily
cadence, same hands-off send, but the model usage rides on your subscription.
