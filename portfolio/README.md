# Portfolio Monitor — Concentrated Quality-Compounder Book

A rules-based **portfolio monitor** for a concentrated book of wide-moat businesses. On a
schedule it reads every holding's **playbook** (`positions/<TICKER>.md`), checks whether any
pre-registered thesis-break / strengthen / price / catalyst **signal** has fired,
**consolidates correlated moves by cluster** (so a single shared driver hitting two names is
one read-through, not two alerts), applies each holding's written **discipline**, and
**emails** the verdict to `laurentbello@gmail.com`. It does not trade and it does not
editorialize — it enforces rules so decisions are made on signals, not headlines.

This is the multi-position sibling of `../watchlist/` (which deep-monitors Visa). Same
delivery pipe (`send_email.py`), same **"Routine, not cron"** philosophy — scaled to the
whole book.

**Runs on your Claude membership — no paid API.** The monitoring/research happens inside a
Claude Code **Routine** (a scheduled cloud session covered by your subscription). That
session sends the email itself over Gmail SMTP — no Anthropic API key, no draft step.

## How it's organized
```
portfolio/
├── PROMPT.md            # the Routine follows this — orient → per-name scan → cluster → digest → email
├── README.md            # this file — Routine + environment setup
├── SKILL.template.md    # blank per-position playbook template (copy this to add a holding)
├── holdings.md          # the roster (weight | ticker | name | cluster | skill path) — also machine-parseable
├── cluster_map.md       # correlated-thesis layer (which names share a driver, aggregate weights)
├── catalyst_calendar.md # hard/soft events the monitor looks ahead to
├── last_run.md          # run state (last date / mode) — system of record for the lookback window
├── send_email.py        # delivery only (no LLM/API); sends a digest JSON via Gmail SMTP
├── portfolio_monitor.sh # OPTIONAL headless runner (cron + `claude -p`); needs a paid API key — see below
└── positions/           # one self-contained playbook per holding
    ├── WM.md            #   ← worked example (Waste Management)
    ├── AI.md  LIN.md  VINCI.md  AENA.md  CLNX.md  FER.md  SAF.md  AIR.md
    └── SPGI.md  MCO.md  ASML.md  LRCX.md  V.md  MA.md
```

**Adding a holding:** copy `SKILL.template.md` to `positions/<TICKER>.md`, fill in the thesis,
underwriting anchors, pre-registered signals, and the machine `signals` block; add one row to
`holdings.md`; if it shares a driver with others, add it to `cluster_map.md`. `PROMPT.md`
discovers every populated playbook at runtime — no other wiring needed.

## What's scaffolded vs. what you still owe
The **15 playbooks above are real, structured starting points** (~54% of the book) covering the
six clusters plus the WM worked example. Two caveats before you trust an alert:
1. **Confirm the numbers.** Anchors and price bands marked `# confirm` are reasonable
   placeholders, not audited figures — replace them with your own underwriting before the
   monitor relies on them. The *structure* (which signals, which directions) is sound; the
   *thresholds* are yours to own.
2. **The remaining ~15 idiosyncratic single names are not scaffolded** — their tickers/weights
   weren't provided, and inventing names would pollute the monitor. Add each real holding via
   the "Adding a holding" steps above to complete the ~30-name roster.

## How state persists
The container is **ephemeral** — cloned fresh each run, discarded after. So `last_run.md` (and
any firmed-up dates in `catalyst_calendar.md`) are the **system of record committed in the
repo**: the agent overwrites `last_run.md` at the end of each run and **pushes it** (PROMPT step
4) so the next run knows its lookback window. Only state files are committed — never `out/`,
`runs/`, or code.

## Setup (one-time) — as a Claude Code **Routine**
Routines are created/managed at **[claude.ai/code/routines](https://claude.ai/code/routines)**,
the Desktop app, or `/schedule` in a **local terminal** (`/schedule` is disabled *inside* a web
session, so use the web Routines page).

> **Cadence:** the web Routines scheduler offers **daily / weekly** only. Schedule **weekly**;
> the prompt's WHEN-TO-SEND gate decides internally whether the week warrants an email (a fired
> signal or a catalyst landing in the window). Most weeks it runs, finds nothing new, and sends
> nothing — so "weekly" is the *session* cadence, not the *email* cadence.

1. **Merge this to `main`** — routines clone the repo's *default* branch, and the agent pushes
   `last_run.md` back to that branch.
2. **Create the routine** → **New routine**:
   - **Prompt:** *"Follow the instructions in `portfolio/PROMPT.md` and run this cycle's
     portfolio monitor."*
   - **Repository:** `laurentbello/fundbello`.
   - **Environment:** set **Network access = Full** (the agent fetches IR sites, congress.gov,
     regulators, etc., and Gmail SMTP `smtp.gmail.com:465` isn't in the default "Trusted"
     allowlist), and add **environment variables**:
     - `GMAIL_ADDRESS` — the Gmail account to send **from**
     - `GMAIL_APP_PASSWORD` — a Gmail **App Password** (16 chars, **no spaces**; Security → App
       passwords, requires 2-Step Verification)
     - *(optional `RECIPIENT` — defaults to `laurentbello@gmail.com`)*
     - These are optional in practice: if unset (or SMTP is blocked), the routine falls back
       to creating a Gmail **draft** via the connected Gmail MCP tool instead of erroring out
       — see PROMPT.md step 7. Set them anyway for true zero-touch delivery straight to the inbox.
   - **Trigger → Schedule:** **weekly** (any day/time; enter local Mauritius time, the form
     converts to UTC).
3. Click **Create**, then **Run now** to test.

## Testing it now
**Guaranteed-email check (recommended first run):** start a manual session with the SETUP TEST
prompt — *"Follow `portfolio/PROMPT.md` — SETUP TEST — and confirm delivery."* The `SETUP TEST`
token bypasses the send-gate and emails a short "setup confirmed" digest (the roster + clusters)
without researching or committing. If it arrives, your env vars + egress are correct.

**Normal manual run:** *"Follow `portfolio/PROMPT.md` and run this cycle's portfolio monitor."*
— signal-gated, so unless something fired or a catalyst is in the window, it correctly sends
nothing and logs why.

## Optional: headless runner (`portfolio_monitor.sh`)
The uploaded `portfolio_monitor.sh` is an **alternative** to the Routine: a bash loop that runs
one isolated `claude -p` per name, then an assembly pass, then fires a notify hook. It's kept
here for completeness, but note:
- It needs the **Claude Code CLI + a paid API key** (each `claude -p` is an API call) plus `jq`
  and GNU `date`/`awk` — it does **not** run on your membership the way a Routine does.
- Point it at this directory: `PORTFOLIO_DIR=$(pwd)/portfolio ./portfolio/portfolio_monitor.sh`
  (it reads `holdings.md`, `catalyst_calendar.md`, `last_run.md`, `positions/`).
- Wire one **NOTIFY HOOK** at the bottom of the script (email/Slack/Telegram) to deliver the
  digest.
- Cron example (daily 06:30): `30 6 * * * PORTFOLIO_DIR=/path/portfolio /path/portfolio/portfolio_monitor.sh >> /path/monitor.log 2>&1`

Use the **Routine** (PROMPT.md) for zero-API-cost monitoring; use the script only if you
specifically want a local/CI cron with an API key.

## Why a Routine (not GitHub Actions)?
A cron in GitHub Actions (or `portfolio_monitor.sh`) can't use your Claude membership — it needs
a paid API key. A **Routine** runs the session on your subscription instead: same cadence,
same hands-off send, zero API billing. Routines must be **created by you** at
claude.ai/code/routines; everything the routine *runs* is committed and ready.

## Cost
Zero API spend on the Routine path — the model work is part of your Claude membership. SMTP is
free.
