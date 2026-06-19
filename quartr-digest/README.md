# Quartr digest — the "watchman"

A Google Apps Script that reads your subscribed **Quartr – Followed companies**
calendar each morning and drops a **draft** email digest of every followed-company
event landing in the next look-ahead window, each with a deep-link straight into
Quartr (report / audio / transcript).

It runs unattended on Google's servers — no Claude session, no laptop required.
Nothing is ever sent automatically: it only creates a *draft* addressed to you.
Review, edit, send, or bin it.

## What it does

- Reads the read-only Quartr feed (`CALENDAR_ID` in `quartr_digest.gs`).
- Looks `LOOKAHEAD_HOURS` ahead (default 36h) plus a 12h look-back so early
  "today" all-day events are still caught.
- De-dupes via `ScriptApp` properties so daily runs never double-draft the same
  event (state pruned after `STATE_RETENTION_DAYS`).
- Builds a tidy HTML table (date · company · *open in Quartr* link) and saves it
  as a Gmail draft to `RECIPIENT`.
- Stays silent on quiet days unless `SEND_WHEN_EMPTY` is `true`.

By design it is **detection only** — deterministic, no LLM. Enrichment ("pull the
string") happens on demand via the Quartr link, or by handing the ticker to your
Claude Code routine.

## One-time deploy (≈2 minutes, all on your side)

1. Go to **[script.google.com](https://script.google.com)** → **New project**.
2. Delete the placeholder `Code.gs` contents and **paste in all of
   [`quartr_digest.gs`](./quartr_digest.gs)**. Save (give the project a name like
   *Quartr digest*).
3. In the function dropdown at the top, select **`setupTrigger`** and click
   **Run**. Approve the OAuth prompts when asked — it needs:
   - **Calendar** (read the Quartr feed)
   - **Gmail** (create the draft)
   That single run schedules the daily job (~06:30 `Indian/Mauritius`) and is the
   only thing you need to click.
4. *(Optional sanity check)* Select **`dailyQuartrDigest`** → **Run**, then look
   in Gmail **Drafts**. Note: on a quiet day (nothing in the next 36h) it will
   correctly produce no draft — temporarily set `SEND_WHEN_EMPTY: true` or widen
   `LOOKAHEAD_HOURS` if you want to force one for testing.

To confirm the schedule later: in the Apps Script editor, left sidebar →
**Triggers** (the alarm-clock icon). You should see one time-based trigger for
`dailyQuartrDigest`.

## Tuning (`CONFIG` block at the top of `quartr_digest.gs`)

| Setting | Default | Notes |
|---|---|---|
| `CALENDAR_ID` | the Quartr import feed | Already set to your actual calendar. |
| `RECIPIENT` | `laurentbello@gmail.com` | Where the draft is addressed. |
| `LOOKAHEAD_HOURS` | `36` | How far ahead each run scans. |
| `SEND_WHEN_EMPTY` | `false` | `true` = draft even on quiet days. |
| `TZ` | `Indian/Mauritius` | Display + trigger timezone. |
| `STATE_RETENTION_DAYS` | `30` | How long dedupe state is kept. |

After changing the trigger hour/timezone, re-run `setupTrigger()` (it clears and
re-creates the trigger, so it won't pile up duplicates).

## Validated against live data (2026-06-19)

The feed is readable and event descriptions carry the expected
`https://web.quartr.com/link/companies/.../events/...` deep-links that
`extractQuartrLink_` pulls — e.g. *Sunbelt Rentals Q4 2026* (23 Jun),
*NVIDIA – AGM 2026* (24 Jun), *ASML – Q2 2026* (15 Jul). Quartr marks dates as
tentative/estimated, so they can shift — the digest footnote says as much.
