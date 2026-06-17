# V — Visa Inc. (V)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.
# NOTE: the deep monitoring skill for Visa lives at
#   watchlist/skills/visa-moat-monitoring/SKILL.md (Europe-spread tracker + triggers).
# This playbook is the portfolio-monitor summary; defer to that skill for the
# primary Europe-vs-US spread signal and the CCCA trigger detail.

## META
- ticker:            V
- status:            CORE
- target_weight:     3%      current_weight: 3.0%
- entry_ref:         network-compounder accumulation
- base_case_irr:     ~9–12% (global PV growth + cross-border + value-added services)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [payment-networks, A2A-stablecoin, interchange-reg, cross-border]

## THESIS (what must remain true)
1. Network duopoly + global acceptance — Visa/Mastercard two-sided network; the default
   global rails. Tollbooth economics on payments volume.
2. Cross-border take-rate — high-margin cross-border (travel + e-commerce) is the
   profit lever; structurally grows above domestic PV.
3. Value-added services — fast-growing, recurring services layer diversifies beyond
   per-transaction fees.
4. Cash-to-card secular runway — continued displacement of cash in emerging markets.

## UNDERWRITING ANCHORS
- payments volume growth:     healthy constant-USD growth (watch Europe-vs-US spread)
- cross-border volume:        ≥ +8% YoY (alert below for 2 consecutive Q)
- value-added services:       double-digit growth
- network/scheme fees:        not capped by regulation

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Net revenue = Service [PV × yield] + Data-processing [transactions × fee] + International
  [cross-border volume × higher yield] + Value-added services − client incentives
- Cross-border carries the richest yield, so it's the disproportionate profit lever; the
  threat to it (A2A/stablecoin disintermediation, network-fee caps) is the swing ← **thesis hinges here**
- EBIT = revenue × ~60%+ margin (network scale); EPS × buyback
- Leaf observables: Europe-vs-US PV spread, cross-border growth %, CCCA status, VAS growth

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| Europe-vs-US payments-volume spread | Earliest read on A2A/Wero/EPI displacement of the network | Visa quarterly Operational Performance Data (see watchlist tracker) |
| Cross-border volume growth (%) | The richest-yield profit lever; geopolitically debated | Quarterly earnings — cross-border line |
| CCCA legislative status (S.3623/H.R.7035) | A US routing mandate is the structural take-rate break | congress.gov; committee/floor news |

### Thresholds
- STRENGTHEN (add / upsize): cross-border reaccel + VAS ahead of plan; or CCCA dies in
  committee / Europe spread stable + buyback step-up
- BREAK (trim / exit): per DISCIPLINE — any single trigger → HARD REVIEW; two concurrent OR
  prob-weighted IRR < 8% → TRIM to 2/3; BREAK-1 (Europe spread) + BREAK-3 (CCCA) → EXIT review
- Position rules: add on thesis-intact weakness (define level); see watchlist skill for detail

### Next checkpoint
Next Visa fiscal-quarter earnings (Jan/Apr/Jul/Oct) — reads PV, cross-border, Europe spread

### One-line thesis (for investor letter + daily review)
Thesis hinges on cross-border take-rate surviving A2A/stablecoin + CCCA; the live read is
the Europe-vs-US spread (A2A early warning) and CCCA legislative status.

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1 (Europe spread): Visa Europe payments-volume growth lags US by the registered
  spread for 2 consecutive quarters (A2A/Wero/EPI displacement) → HARD REVIEW
  (see watchlist Europe-spread tracker — Trigger 1)
- BREAK-2: cross-border volume growth < +8% YoY for 2 consecutive quarters, OR a
  regulator caps NETWORK/scheme fees (not interchange) → HARD REVIEW
- BREAK-3 (CCCA): Credit Card Competition Act (S.3623 / H.R.7035) passes either chamber
  as an amendment or attaches to a must-pass vehicle → HARD REVIEW; re-run IRR with
  dual-routing scenario
- BREAK-4 (stablecoin demand-side): an Amazon/Walmart-tier merchant launches stablecoin
  checkout at ≥1% discount vs card (third-party rails = moat-negative) → HARD REVIEW
- DISCIPLINE: any single trigger → HARD REVIEW; two concurrent OR prob-weighted IRR <8%
  → TRIM to 2/3; BREAK-1 + BREAK-3 both confirmed → EXIT review (the pincer)

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: cross-border reacceleration + VAS growth ahead of plan → ADD
- STRENGTHEN-2: CCCA dies in committee / Europe spread stable + buyback step-up → ADD

### 💲 PRICE TRIGGERS
- add band:          on thesis-intact weakness (define level)   # confirm
- trim level:        per DISCIPLINE (two triggers / IRR <8%)
- hard sell level:   BREAK-1 + BREAK-3 pincer

## CATALYSTS (sync into catalyst_calendar.md)
- Visa fiscal-quarter earnings (Jan/Apr/Jul/Oct) | HARD | watch: PV, cross-border, Europe spread
- CCCA legislative calendar | HARD | watch: amendment / must-pass attachment
- EU IFR review / RBA review / US Fed rulemaking | HARD | watch: network-fee caps

## NOISE FILTER (ignore)
- Headline stablecoin settlement figures (incumbent settlement = moat-neutral)
- Interchange-only settlements; single-quarter cross-border geopolitics
- Sell-side PT changes

## MONITORING NOTES
- key_monitor: Europe-vs-US payments-volume spread (A2A/Wero early warning) + CCCA status
- next_checkpoint: next Visa fiscal-quarter earnings
- The deep workup (spread CSV, tracker, trigger detail) is the watchlist skill — this
  portfolio playbook mirrors its triggers so cluster consolidation can see Visa+MA together.

## CHANGELOG
- 2026-06-11: registered; mirrors watchlist visa-moat-monitoring triggers.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [payment-networks, A2A-stablecoin, interchange-reg, cross-border]
break:
  - id: BREAK-1
    condition: "visa_europe_PV_growth lags US by registered spread (A2A displacement)"
    persistence: "2 quarters"
    action: "HARD REVIEW"
  - id: BREAK-2
    condition: "cross_border_growth < 8% YoY OR network/scheme fee cap enacted"
    persistence: "2 quarters / immediate"
    action: "HARD REVIEW"
  - id: BREAK-3
    condition: "CCCA passes a chamber as amendment OR attaches to must-pass vehicle"
    persistence: "immediate"
    action: "HARD REVIEW; IRR dual-routing re-run"
  - id: BREAK-4
    condition: "tier-1 merchant stablecoin checkout at >=1% discount vs card (3rd-party rails)"
    persistence: "immediate"
    action: "HARD REVIEW"
strengthen:
  - id: STRENGTHEN-1
    condition: "cross-border reaccel AND VAS growth ahead of plan"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "CCCA dies in committee OR Europe spread stable AND buyback stepped up"
    action: "ADD"
price:
  add_band: "thesis-intact weakness (define)"
  trim_above: "DISCIPLINE: two triggers / IRR < 8% -> trim to 2/3"
  hard_sell: "BREAK-1 + BREAK-3 pincer"
catalysts:
  - date: "Jan/Apr/Jul/Oct"
    event: "Visa fiscal-quarter earnings"
    type: "HARD"
    watch: "PV, cross-border, Europe spread"
  - date: "ongoing"
    event: "CCCA legislative calendar"
    type: "HARD"
    watch: "amendment / must-pass attachment"
key_monitor: "Europe-vs-US PV spread + CCCA status"
next_checkpoint: "next Visa fiscal-quarter earnings"
```
