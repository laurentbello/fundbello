#!/usr/bin/env bash
# =============================================================================
# portfolio_monitor.sh — Claude Code orchestration loop
# -----------------------------------------------------------------------------
# Per-position headless scan → structured JSON verdicts → cluster consolidation
# → single daily/weekly digest. Designed for Laurent's quality-compounder book.
#
# WHAT IT DOES
#   1. Parses holdings.md for the 30 core positions (ticker, weight, SKILL path)
#   2. Runs ONE isolated `claude -p` call per name — reads that position's
#      SKILL.md, fetches developments since last run, returns a strict JSON verdict
#   3. Assembly pass: consolidates per-name JSON + catalyst calendar + cluster
#      map into one disciplined digest (URGENT / WATCH / CLUSTER / CLEAR / UPCOMING)
#   4. Writes the digest, updates last_run.md, fires the notify hook
#
# CADENCE: set MODE=daily | weekly  (env or ./.monitor_mode). Lookahead scales.
#
# SETUP
#   - Requires: Claude Code CLI (`claude`), jq, GNU date/awk
#   - Put holdings.md, catalyst_calendar.md, last_run.md in $BASE
#   - Per-position SKILL files under $BASE/positions/<TICKER>.md (and watchlist/)
#   - Cron (daily 06:30):  30 6 * * *  /path/portfolio_monitor.sh >> /path/monitor.log 2>&1
#   - Switch to weekly:    echo weekly > .monitor_mode   (or cron Mon-only)
# =============================================================================
set -euo pipefail

# ---- CONFIG -----------------------------------------------------------------
BASE="${PORTFOLIO_DIR:-$HOME/portfolio}"
SCAN_MODEL="${MONITOR_SCAN_MODEL:-claude-sonnet-4-6}"        # per-name scans: cheap, mechanical mapping
ASSEMBLY_MODEL="${MONITOR_ASSEMBLY_MODEL:-claude-opus-4-8}"  # consolidation + digest: judgment
CONCURRENCY="${MONITOR_CONCURRENCY:-4}"            # parallel per-name scans
MAX_TURNS="${MONITOR_MAX_TURNS:-12}"              # tool budget per name
ALLOWED_TOOLS="Read,Grep,Glob,WebSearch,WebFetch" # read-only → no perm prompts
HOLDINGS="$BASE/holdings.md"
CALENDAR="$BASE/catalyst_calendar.md"
LAST_RUN="$BASE/last_run.md"
RUN_DATE="$(date +%F)"
WORK="$BASE/runs/$RUN_DATE"
VERDICTS="$WORK/verdicts"
DIGEST="$WORK/digest_$RUN_DATE.md"
mkdir -p "$VERDICTS"

# ---- CADENCE ----------------------------------------------------------------
MODE="${MODE:-$( [ -f "$BASE/.monitor_mode" ] && cat "$BASE/.monitor_mode" || echo daily )}"
if [ "$MODE" = "weekly" ]; then LOOKAHEAD_DAYS=14; else LOOKAHEAD_DAYS=7; fi
SINCE="$( [ -f "$LAST_RUN" ] && grep -m1 -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' "$LAST_RUN" || date -d '1 day ago' +%F )"
echo "[$(date +%T)] mode=$MODE  since=$SINCE  lookahead=${LOOKAHEAD_DAYS}d  scan=$SCAN_MODEL  assembly=$ASSEMBLY_MODEL"

# ---- DISCIPLINE (shared system prompt appended to every per-name call) -------
read -r -d '' DISCIPLINE <<'SYS' || true
You are a portfolio monitoring analyst for a concentrated quality-compounder book
(10–15% IRR target, multi-year holds). Discipline over coverage. Default to CLEAR.
Rules:
- The position's SKILL file is the ONLY source of valid signals. Never invent a
  buy/sell action that is not pre-registered there.
- Escalate ONLY when a development (a) trips or moves toward a registered
  THESIS-BREAK test, (b) hits a registered THESIS-STRENGTHEN signal, (c) crosses a
  price trigger, or (d) is a hard catalyst inside the lookahead window.
- Ignore sell-side noise, reiterated ratings, and routine price chatter.
- Frame everything as IRR / thesis-drift / explicit-trigger. Quantify vs threshold.
- If a development looks important but maps to NO registered signal, set tier=WATCH
  and set playbook_gap=true (do not improvise an action).
- If you cannot find/read the SKILL file, set playbook_gap=true, monitor generic
  sector drivers only, and say so.
- Be honest about thin/unverified sourcing; lower confidence accordingly.
Output ONLY raw JSON matching the requested schema. No prose, no markdown fences.
SYS

# ---- PER-NAME SCAN ----------------------------------------------------------
scan_one() {
  local weight="$1" ticker="$2" name="$3" skill="$4"
  local safe="${ticker//[^A-Za-z0-9]/_}"
  local out="$VERDICTS/$safe.json"
  local skill_path="$BASE/$skill"

  local prompt
  prompt=$(cat <<EOF
SCAN: $name ($ticker), portfolio weight ${weight}%.
Lookback: developments since $SINCE. Cadence: $MODE (catalyst lookahead ${LOOKAHEAD_DAYS} days).

STEP 1 — Read the position playbook at: $skill_path
  (If absent, set "playbook_gap": true and monitor generic sector drivers only.)
STEP 2 — Find material developments since $SINCE: 8-Ks / material filings, earnings,
  guidance changes, regulatory/legal actions, M&A, management changes, and price
  moves that cross a pre-registered level. Skip routine sell-side noise.
STEP 3 — Map each to this name's pre-registered signals. Decide the tier.

Return ONLY this JSON object (no fences):
{
  "ticker": "$ticker",
  "name": "$name",
  "weight": $weight,
  "scan_date": "$RUN_DATE",
  "tier": "URGENT | WATCH | CLEAR",
  "headline": "one line; empty string if CLEAR",
  "signal_fired": "exact registered signal/test name, or null",
  "action": "pre-registered action (trim/sell/add/re-underwrite), or null",
  "irr_note": "thesis-drift / IRR impact, or null",
  "next_checkpoint": "date or event, or null",
  "developments": ["raw material item", "..."],
  "shared_driver_tags": ["e.g. rates, sector-regulation, export-controls, input-cost, issuance, A2A"],
  "playbook_gap": false,
  "confidence": "high | medium | low",
  "sources": ["url", "..."]
}
EOF
)

  local raw result inner attempt=0
  while [ $attempt -lt 2 ]; do
    attempt=$((attempt+1))
    set +e
    raw=$(claude -p "$prompt" \
            --model "$SCAN_MODEL" \
            --append-system-prompt "$DISCIPLINE" \
            --allowedTools "$ALLOWED_TOOLS" \
            --add-dir "$BASE" \
            --max-turns "$MAX_TURNS" \
            --output-format json 2>"$VERDICTS/$safe.err")
    local rc=$?
    set -e
    [ $rc -ne 0 ] && { echo "  ! $ticker call failed (rc=$rc) try=$attempt"; continue; }
    # envelope → .result, then strip any stray fences, validate inner JSON
    result=$(printf '%s' "$raw" | jq -r '.result // empty' 2>/dev/null || true)
    inner=$(printf '%s' "$result" | sed -e 's/^```json//' -e 's/^```//' -e 's/```$//' | tr -d '\000')
    if printf '%s' "$inner" | jq -e '.tier' >/dev/null 2>&1; then
      printf '%s' "$inner" > "$out"
      local tier; tier=$(jq -r '.tier' "$out")
      echo "  ✓ $ticker → $tier"
      return 0
    fi
    echo "  ! $ticker bad JSON try=$attempt"
  done
  # fallback stub so assembly never breaks on a missing name
  jq -n --arg t "$ticker" --arg n "$name" --argjson w "$weight" --arg d "$RUN_DATE" \
    '{ticker:$t,name:$n,weight:$w,scan_date:$d,tier:"WATCH",
      headline:"SCAN FAILED — manual check required",signal_fired:null,action:null,
      irr_note:null,next_checkpoint:null,developments:[],shared_driver_tags:[],
      playbook_gap:true,confidence:"low",sources:[]}' > "$out"
  echo "  ✗ $ticker → stubbed (scan failed)"
}
export -f scan_one
export BASE SCAN_MODEL ASSEMBLY_MODEL ALLOWED_TOOLS MAX_TURNS VERDICTS RUN_DATE SINCE MODE LOOKAHEAD_DAYS DISCIPLINE

# ---- PARSE HOLDINGS + RUN POOL ----------------------------------------------
# Pull CORE rows only: lines whose 2nd |-field is a number (weight). Watchlist
# rows have a non-numeric first cell, so they're excluded automatically.
echo "[$(date +%T)] launching scans (concurrency=$CONCURRENCY)…"
awk -F'|' '
  { w=$2; gsub(/^[ \t]+|[ \t]+$/,"",w) }
  w ~ /^[0-9]+(\.[0-9]+)?$/ {
    t=$3; n=$4; s=$6
    gsub(/^[ \t]+|[ \t]+$/,"",t); gsub(/^[ \t]+|[ \t]+$/,"",n); gsub(/^[ \t]+|[ \t]+$/,"",s)
    printf "%s\t%s\t%s\t%s\n", w, t, n, s
  }' "$HOLDINGS" \
| while IFS=$'\t' read -r w t n s; do
    printf '%s\t%s\t%s\t%s\0' "$w" "$t" "$n" "$s"
  done \
| xargs -0 -P "$CONCURRENCY" -I{} bash -c '
    IFS=$'"'"'\t'"'"' read -r w t n s <<< "$1"; scan_one "$w" "$t" "$n" "$s"
  ' _ {}

COUNT=$(ls "$VERDICTS"/*.json 2>/dev/null | wc -l | tr -d ' ')
echo "[$(date +%T)] $COUNT verdicts collected."

# ---- ASSEMBLY: cluster consolidation + digest -------------------------------
echo "[$(date +%T)] assembling digest…"
ALL_VERDICTS=$(jq -s '.' "$VERDICTS"/*.json)

ASSEMBLY_PROMPT=$(cat <<EOF
You are assembling the final portfolio monitor digest for $RUN_DATE (mode: $MODE,
catalyst lookahead: ${LOOKAHEAD_DAYS} days).

INPUTS
1. PER-NAME VERDICTS (JSON array): below.
2. CATALYST CALENDAR: read $CALENDAR
3. CLUSTER MAP (correlated-thesis layer):
   - Infra concessions : VINCI, Aena, Cellnex, Ferrovial      (~14.9% | drivers: rates, concession-regulation, inflation-linked tariffs)
   - Industrial gases  : Air Liquide, Linde                   (~10.8% | drivers: energy/input cost, industrial cycle, on-site pricing)
   - Aerospace         : Safran, Airbus                       (~8.4%  | drivers: build rates, aftermarket/RPK, supply chain)
   - Ratings/fin-data  : S&P Global, Moody's                  (~6.8%  | drivers: debt issuance, rate cycle, ratings regulation)
   - Semis (WFE/litho) : Lam Research, ASML                   (~6.5%  | drivers: WFE capex, China export controls, memory vs logic)
   - Payment networks  : Visa, Mastercard                     (~5.3%  | drivers: A2A/stablecoin, interchange reg, cross-border)

CLUSTER LOGIC
- Inspect verdicts' "shared_driver_tags" and developments. If a SINGLE shared
  driver moved and affects ≥2 members of one cluster, collapse it into ONE cluster
  read-through sized by AGGREGATE cluster weight — not N separate alerts.
- IDIOSYNCRATIC items (single-name earnings/mgmt/filing) stay under their own name.
- An item that is BOTH a registered single-name signal AND a cluster read-through
  (e.g. Aena DORA III) is reported ONCE under its primary signal with a one-line
  cluster footnote — never duplicated.
- Size tiers by exposure at risk: a 1–2% name alone is rarely URGENT; a 10–15%
  cluster on one driver can be.

OUTPUT (exactly this structure, concise, notification-style):
=== PORTFOLIO MONITOR — $RUN_DATE ($MODE) ===

🔴 URGENT (N)
[TICKER] — what happened → signal fired → pre-registered action → IRR/drift note

🟡 WATCH (N)
[TICKER] — development → threshold that would escalate → next checkpoint
   (mark any playbook_gap=true names with "⚠ no playbook")

🟣 CLUSTER READ-THROUGHS (N)   [omit section if none]
[Cluster, agg wt] — shared driver → members affected → trips any registered break test? → net read

🟢 CLEAR
One line. "All other positions nominal." (do not enumerate)

⚠ OPERATIONAL
List any names with playbook_gap=true (missing/unreadable SKILL) or tier "SCAN FAILED".

UPCOMING (next ${LOOKAHEAD_DAYS} days)
[date] [TICKER] — catalyst + what to look for   (from catalyst calendar)

PER-NAME VERDICTS:
$ALL_VERDICTS
EOF
)

claude -p "$ASSEMBLY_PROMPT" \
  --model "$ASSEMBLY_MODEL" \
  --allowedTools "Read" \
  --add-dir "$BASE" \
  --max-turns 4 \
  --output-format json 2>"$WORK/assembly.err" \
| jq -r '.result // empty' \
| sed -e 's/^```markdown//' -e 's/^```//' -e 's/```$//' > "$DIGEST"

echo "[$(date +%T)] digest → $DIGEST"

# ---- UPDATE STATE + NOTIFY ---------------------------------------------------
{
  echo "# Last monitor run"
  echo "last_run: $RUN_DATE"
  echo "mode: $MODE"
  echo "verdicts: $COUNT"
  echo "digest: $DIGEST"
} > "$LAST_RUN"

# NOTIFY HOOK — wire to your channel. Examples (uncomment ONE):
#   Email via msmtp:
#     { printf 'Subject: Portfolio Monitor %s\n\n' "$RUN_DATE"; cat "$DIGEST"; } | msmtp you@example.com
#   Slack/Discord webhook:
#     jq -Rs '{text: .}' < "$DIGEST" | curl -s -X POST -H 'Content-type: application/json' -d @- "$MONITOR_WEBHOOK"
#   Telegram:
#     curl -s "https://api.telegram.org/bot$TG_TOKEN/sendMessage" --data-urlencode "chat_id=$TG_CHAT" --data-urlencode "text=$(cat "$DIGEST")"
echo "[$(date +%T)] done. (configure NOTIFY HOOK to deliver the digest)"
cat "$DIGEST"
