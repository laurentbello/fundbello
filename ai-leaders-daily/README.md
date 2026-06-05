# AI Leaders Daily

A scheduled agent that, **every day at 1:00 PM Mauritius time (MST, UTC+4)**, researches
recent interviews from the AI leaders/labs Laurent follows, analyzes them through a
fundbello operator/investor lens, and drafts the briefing as an email to
`laurentbello@gmail.com`.

People/orgs tracked: **OpenAI · Anthropic · Google DeepMind · Fireworks AI · Base10 ·
Jensen Huang · Elon Musk · Dario Amodei.**

## Files
- `PROMPT.md` — the exact prompt the scheduled session runs. This *is* the agent.

## Why a "scheduled trigger" (and not a background process)
Claude Code on the web runs in an **ephemeral container** that is reclaimed after the
session ends, so nothing can "stay running" until 1 PM. Recurring work is done with a
**scheduled trigger**: the platform spins up a fresh session on a cron schedule and runs
a saved prompt. That fresh session needs the **Gmail** connector (and web access) enabled,
exactly like this session has.

## Setup (one-time, in the Claude Code web UI)
1. Open this repository (`laurentbello/fundbello`) in Claude Code on the web.
2. Create a **Scheduled trigger** (Automations / "Schedule" on the environment).
3. **Schedule:** daily. 1 PM Mauritius (UTC+4) = **09:00 UTC**. Cron: `0 9 * * *`.
   - If the scheduler asks for a timezone directly, choose `Indian/Mauritius` and set 13:00.
   - If it only accepts UTC, use `0 9 * * *`.
4. **Prompt:** paste the `## ROLE` … end of `PROMPT.md` (everything below the `---`).
   Or simply: *"Follow the instructions in `ai-leaders-daily/PROMPT.md` and draft today's briefing."*
5. **Connectors:** ensure **Gmail** and **web search** are enabled for the scheduled environment.
6. Save. Each run will leave a ready-to-send draft in your Gmail Drafts.

## Sending
The Gmail connector here can **create drafts** but does not expose a send action, so each
briefing waits in **Drafts** for a one-click send. This is intentional (a human glance
before it goes out), but if you want it fully hands-off, see below.

### Auto-send option (optional, fully hands-off)
Use a GitHub Actions cron workflow with the **Gmail API** (a service that supports
`messages.send`) or SMTP app-password, generating the digest via the Claude API. This
trades the "human glance" for zero clicks and needs secrets stored in the repo. Ask and
I'll scaffold it.

## First test run
A test digest dated **5 Jun 2026** was generated from real searches and placed in your
Gmail Drafts (subject prefixed `[TEST]`) so you can see the format before scheduling.
