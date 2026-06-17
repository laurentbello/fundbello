# AIR — Airbus SE (AIR.PA)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            AIR.PA
- status:            CORE
- target_weight:     3.8%      current_weight: 3.8%
- entry_ref:         duopoly-compounder accumulation, blended ~€140–170
- base_case_irr:     ~8–11% (A320neo backlog + ramp + services)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [aerospace, build-rates, aftermarket-RPK, supply-chain]

## THESIS (what must remain true)
1. Narrowbody duopoly — A320neo family with a multi-year sold-out backlog; effectively
   a book-to-build annuity with Boeing structurally weakened.
2. Production ramp — the value lever is hitting the monthly A320 rate target; each step
   converts backlog into deliveries, FCF, and margin.
3. Backlog visibility — ~decade of production already sold; pricing power on scarce
   delivery slots.
4. Services + Defence/Space — growing aftermarket + helicopters/defence diversify and
   add high-margin recurring revenue.

## UNDERWRITING ANCHORS
- A320-family monthly rate:   on path to guided target (e.g. ~rate 75)   # confirm target
- deliveries:                 meeting full-year guidance
- book-to-bill:               ≥ 1.0x
- adj EBIT margin:            expanding toward guided range
- free cash flow:             positive, funding dividend/buyback

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: full-year delivery guidance cut materially due to a structural (not
  transient) supply-chain/engine constraint → re-underwrite ramp → SELL/TRIM
- BREAK-2: A320neo-family technical/certification issue forcing groundings or
  uncompensated rework → TRIM, re-rate
- BREAK-3: book-to-bill < 1.0x for 2 consecutive quarters (demand softening) →
  re-underwrite backlog annuity
- BREAK-4: adj EBIT margin contracts YoY for 2 consecutive quarters absent a one-off → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: rate target reached/raised + margin inflection → ADD
- STRENGTHEN-2: large net order intake + FCF beat → ADD

### 💲 PRICE TRIGGERS
- add band:          < €140        action: add one tranche
- trim level:        valuation > 25x fwd P/E with ramp fully de-risked
- hard sell level:   only on BREAK-2 (program-grounding technical break)

## CATALYSTS
- 2026-07 | H1 results | HARD | watch: deliveries vs guide, A320 rate, margin, FCF
- monthly delivery updates | SOFT | watch: ramp cadence
- air-show order campaigns | SOFT | watch: book-to-bill

## NOISE FILTER (ignore)
- Sell-side PT changes; single-month delivery lumpiness (back-end-loaded years)
- Engine-maker (CFM/GTF) headlines that don't change Airbus's delivery guide

## MONITORING NOTES
- key_monitor: A320-family delivery ramp vs guided rate (the FCF/margin lever)
- next_checkpoint: 2026-07 H1 results
- Deliveries are seasonally back-end-loaded — judge the ramp against full-year guide,
  not a slow month. The break is a structural guide cut or a program technical event.

## CHANGELOG
- 2026-06-11: registered; delivery-ramp + program-technical risk set as break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [aerospace, build-rates, aftermarket-RPK, supply-chain]
break:
  - id: BREAK-1
    condition: "FY delivery guidance cut on structural supply/engine constraint"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "A320neo technical/cert issue -> groundings or uncompensated rework"
    persistence: "immediate"
    action: "TRIM, re-rate"
  - id: BREAK-3
    condition: "book_to_bill < 1.0x"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-4
    condition: "adj_ebit_margin contracting YoY"
    persistence: "2 quarters"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "rate target reached/raised AND margin inflection"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "large net order intake AND FCF beat"
    action: "ADD"
price:
  add_band: "below 140"
  trim_above: "fwd_pe > 25 with ramp de-risked"
  hard_sell: "BREAK-2 only"
catalysts:
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "deliveries vs guide, A320 rate, margin, FCF"
key_monitor: "A320 delivery ramp vs guided rate"
next_checkpoint: "2026-07 H1 results"
```
