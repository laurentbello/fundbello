# AI — Air Liquide S.A. (AI.PA)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            AI.PA
- status:            CORE
- target_weight:     5.8%      current_weight: 5.8%
- entry_ref:         core-compounder accumulation, blended ~€150–175
- base_case_irr:     ~8–10% (on-site take-or-pay + pricing + decarbonization backlog)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [industrial-gases, input-cost, industrial-cycle, on-site-pricing]

## THESIS (what must remain true)
1. On-site take-or-pay contracts — 15–20yr contracts with energy pass-through and
   minimum volumes; oligopoly density makes pipelines un-replicable.
2. Pricing power — merchant/bulk pricing consistently positive, covering input-cost
   inflation; price/cost spread is the cleanest read on the moat.
3. Margin expansion — efficiencies + portfolio mix lift operating margin steadily.
4. Decarbonization optionality — hydrogen/CCS investment backlog as incremental,
   not load-bearing, upside; only funded at contracted IRRs.

## UNDERWRITING ANCHORS
- pricing (Gas & Services):   positive every quarter (≥ +1–2% underlying)   # confirm
- operating margin:           expanding ~+50–100 bps/yr trend
- ROCE:                       ≥ low-double-digit, rising
- net debt/EBITDA:            ≤ ~2.0x   # confirm

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: underlying pricing turns negative for 2 consecutive quarters (pricing power
  broken) → re-underwrite the moat → SELL/TRIM
- BREAK-2: operating margin contracts YoY for 2 consecutive quarters absent a defined
  one-off → TRIM
- BREAK-3: a large decarbonization/H2 project committed at sub-hurdle or non-take-or-pay
  terms (load-bearing capital at risk) → TRIM, re-rate
- BREAK-4: net debt/EBITDA > 3.0x funding non-accretive M&A → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: pricing accelerating + margin expansion ahead of plan → ADD
- STRENGTHEN-2: large take-or-pay backlog signed at accretive IRR → ADD

### 💲 PRICE TRIGGERS
- add band:          < €150        action: add one tranche
- trim level:        valuation > 28x fwd P/E
- hard sell level:   only on BREAK-1 (pricing-power impairment)

## CATALYSTS
- 2026-07 | H1 results | HARD | watch: pricing, margin, ROCE, backlog/IRR commentary
- ADVANCE 2025/30 plan milestones | SOFT | watch: margin + ROCE targets on track

## NOISE FILTER (ignore)
- Sell-side PT changes; energy-cost pass-through timing noise (it's contractually passed)
- Single-quarter merchant volume softness within the industrial cycle

## MONITORING NOTES
- key_monitor: underlying pricing + operating-margin trend (pricing power vs input cost)
- next_checkpoint: 2026-07 H1 results
- Fuel/energy cost is a pass-through, not a thesis driver — do not confuse cost moves
  with pricing power. The break is pricing going negative, not energy going up.

## CHANGELOG
- 2026-06-11: registered; pricing power + margin trend set as primary break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [industrial-gases, input-cost, industrial-cycle, on-site-pricing]
break:
  - id: BREAK-1
    condition: "underlying_pricing < 0%"
    persistence: "2 quarters"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "operating_margin contracting YoY"
    persistence: "2 quarters"
    action: "TRIM"
  - id: BREAK-3
    condition: "large H2/decarb project committed sub-hurdle OR non-take-or-pay"
    persistence: "immediate"
    action: "TRIM, re-rate"
  - id: BREAK-4
    condition: "net_debt_ebitda > 3.0x for non-accretive M&A"
    persistence: "immediate"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "pricing accelerating AND margin expansion ahead of plan"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "large take-or-pay backlog signed at accretive IRR"
    action: "ADD"
price:
  add_band: "below 150"
  trim_above: "fwd_pe > 28"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "pricing, margin, ROCE, backlog/IRR"
key_monitor: "underlying pricing + operating-margin trend"
next_checkpoint: "2026-07 H1 results"
```
