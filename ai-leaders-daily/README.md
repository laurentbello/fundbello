# AI Leaders Daily — Learn From the Frontier

A daily briefing that helps a **long-term, moat-minded investor learn from the people building
AI**. Every day at **1:00 PM Mauritius (MST, UTC+4)** it researches recent interviews/talks from
the AI frontier and turns them into **lessons** — the mental models, strategy reasoning, and
moat/competitive insights worth absorbing — then **emails them** to `laurentbello@gmail.com`.
It's a teacher, not a portfolio tracker: no holdings, no buy/sell calls.

**Runs on your Claude membership — no paid API.** The research/analysis happens inside a
Claude Code **Routine** (a scheduled cloud session, covered by your subscription). That session
sends the email itself over Gmail SMTP, so there's no Anthropic API key and no draft step.

Voices learned from: **OpenAI · Anthropic · Google DeepMind · Fireworks AI · Base10 · Jensen
Huang · Elon Musk · Dario Amodei** (plus others from these labs/firms when they say something
instructive).

## Files
- `PROMPT.md` — the agent's instructions, output format, and delivery steps (single source of truth).
- `send_email.py` — delivery only (no LLM/API). Sends a pre-written digest JSON via Gmail SMTP.

## Setup (one-time) — as a Claude Code **Routine**
Routines are created/managed at **[claude.ai/code/routines](https://claude.ai/code/routines)**,
the Desktop app, or `/schedule` in a **local terminal** — note `/schedule` is disabled *inside*
a Claude Code on the web session, so use the web Routines page.

1. **(Done) Files are on `main`** — routines clone the repo's *default* branch.
2. **Create the routine** at [claude.ai/code/routines](https://claude.ai/code/routines) → **New routine**:
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
3. Click **Create**, then **Run now** on the routine's page to test immediately.

Each run: the cloud session researches → writes `out/digest.json` → runs `send_email.py` to
deliver it. Watch any run as a normal session to see exactly what it did.

## Tuning what you learn
- **The lens / focus / voices / format:** edit `PROMPT.md`, commit. (Want it weighted toward
  capital allocation, technology shifts, management-reading, etc.? Adjust the TASK section.)
- **The time:** change the routine's schedule (and PROMPT's date note if you move time zones).

## Cost
Zero API spend — the model work is part of your Claude membership. SMTP is free.

## Testing it now
Trigger a session manually with the same prompt: *"Follow `ai-leaders-daily/PROMPT.md` and send
today's briefing."* If `GMAIL_ADDRESS` / `GMAIL_APP_PASSWORD` are set and egress is open, the
email arrives; if not, the session reports the exact error so you can fix the setup.

## Why a Routine (not GitHub Actions)?
A cron in GitHub Actions can't use your Claude membership — it would need a paid API key. A
**Routine** runs the session on your subscription instead: same daily cadence, same hands-off
send, zero API billing. Routines must be **created by you** at claude.ai/code/routines — there is
no agent/API tool to create one (the `/fire` endpoint only *triggers* an existing routine), and
`/schedule` is disabled inside web sessions. So everything the routine *runs* is committed and
ready; creating the routine itself is the one step that has to happen in your account.
