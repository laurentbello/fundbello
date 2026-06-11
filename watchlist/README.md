# Moat Watchlist — Position Monitoring Agent

A rules-based **watchlist monitor** for a concentrated portfolio of wide-moat businesses. Each
quarter it runs every holding's monitoring **skill**, checks whether any pre-defined thesis-break
**trigger** has fired, applies that holding's written **sell/trim/review discipline**, and
**emails** the verdict to `laurentbello@gmail.com`. It does not trade and it does not editorialize
— it enforces rules so decisions are made on signals, not headlines.

**Runs on your Claude membership — no paid API.** The monitoring/research happens inside a Claude
Code **Routine** (a scheduled cloud session, covered by your subscription). That session sends the
email itself over Gmail SMTP, so there's no Anthropic API key and no draft step.

## How it's organized
```
watchlist/
├── PROMPT.md                       # QUARTERLY run — full earnings/spread workup (single source of truth)
├── PROMPT-fast.md                  # MONTHLY run — event-driven fast-trigger sweep, alerts only
├── README.md                       # this file — Routine + environment setup
├── send_email.py                   # delivery only (no LLM/API); sends a digest JSON via Gmail SMTP
└── skills/
    └── visa-moat-monitoring/       # one self-contained skill per holding
        ├── SKILL.md                # triggers, cadence, data series, discipline
        ├── data/visa_europe_spread.csv      # the persisted time series (system of record)
        └── scripts/europe_spread_tracker.py # primary signal: Europe-vs-US PV spread + alerts
```
**Adding a holding later:** drop a new skill directory under `skills/`. `PROMPT.md` discovers every
skill present at runtime, so no other wiring is needed.

## Holdings currently monitored
- **Visa (V)** — `skills/visa-moat-monitoring/`. Quarterly, aligned to Visa's fiscal-quarter
  earnings (Jan/Apr/Jul/Oct). Primary signal: Europe-vs-US payments-volume spread (Wero/EPI/digital
  euro early warning); secondary triggers cover cross-border volume, network-fee regulation, the
  CCCA, and the stablecoin demand-side test.

## How the time series persists
The container is **ephemeral** — it's cloned fresh each run and discarded afterward. So the spread
CSV is the **system of record committed in the repo**: when the agent reads a new Visa quarter it
appends a row *and pushes the updated CSV back* (PROMPT step 3) so the series survives to the next
run. Only the data file is committed — never `out/` or code.

## Setup (one-time) — as a Claude Code **Routine**
Routines are created/managed at **[claude.ai/code/routines](https://claude.ai/code/routines)**, the
Desktop app, or `/schedule` in a **local terminal** (note `/schedule` is disabled *inside* a Claude
Code on the web session, so use the web Routines page).

1. **Merge this to `main`** — routines clone the repo's *default* branch, and the agent also pushes
   the updated CSV to that branch. (This currently lives on a feature branch / PR.)
2. **Create the routine** → **New routine**:
   - **Prompt:** *"Follow the instructions in `watchlist/PROMPT.md` and run this cycle's watchlist check."*
   - **Repository:** `laurentbello/fundbello`.
   - **Environment:** set **Network access = Full** (the agent fetches investor.visa.com, congress.gov,
     etc., and Gmail SMTP `smtp.gmail.com:465` is not in the default "Trusted" allowlist), and add
     **environment variables**:
     - `GMAIL_ADDRESS` — the Gmail account to send **from**
     - `GMAIL_APP_PASSWORD` — a Gmail **App Password** for that account (16 chars; Security → App
       passwords, requires 2-Step Verification)
     - *(optional `RECIPIENT` — defaults to `laurentbello@gmail.com`)*
   - **Trigger → Schedule:** **quarterly**, a few days after each Visa earnings release (next: **after
     Jul 28, 2026**). Enter times in your **local (Mauritius) time** — the form converts to UTC.
     Routines' minimum interval is 1 hour; for an exact quarterly cadence use `/schedule update` from
     a local terminal if needed.
3. Click **Create**, then **Run now** to test immediately.

### Monthly fast-trigger routine (recommended second routine)
The quarterly run can't catch a CCCA attachment, a regulator's network-fee ruling, or a
major-merchant stablecoin launch that lands *between* earnings — those can move any day. Add a
second, lighter routine to sweep just those:
- **Prompt:** *"Follow the instructions in `watchlist/PROMPT-fast.md` and run the fast-trigger sweep."*
- **Repository / Environment:** same as above (`laurentbello/fundbello`, Network = Full, the two
  Gmail env vars).
- **Trigger → Schedule:** **monthly**.

Unlike the quarterly digest, this sweep is an **exception monitor: it emails only when a fast trigger
fires** (or a development is material enough to act on now). Most months it runs, finds nothing, and
sends nothing — the session log shows `all quiet — no email sent`. It never pulls earnings data or
touches the spread CSV, so it makes no commits.

## Testing it now
Trigger a session manually with the same prompt: *"Follow `watchlist/PROMPT.md` and run this cycle's
watchlist check."* If `GMAIL_ADDRESS` / `GMAIL_APP_PASSWORD` are set and egress is open, the email
arrives; if not, the session reports the exact error so you can fix the setup. You can also run the
core signal directly without the agent:
`python3 watchlist/skills/visa-moat-monitoring/scripts/europe_spread_tracker.py`

## Cost
Zero API spend — the model work is part of your Claude membership. SMTP is free.

## Why a Routine (not GitHub Actions)?
A cron in GitHub Actions can't use your Claude membership — it would need a paid API key. A
**Routine** runs the session on your subscription instead: same cadence, same hands-off send, zero
API billing. Routines must be **created by you** at claude.ai/code/routines; everything the routine
*runs* is committed and ready.
