# ASML — ASML Holding N.V. (ASML)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            ASML
- status:            CORE
- target_weight:     3.5%      current_weight: 3.5%
- entry_ref:         monopoly-compounder accumulation, blended ~$650–800
- base_case_irr:     ~9–12% (EUV/High-NA monopoly + installed-base service annuity)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [semis-wfe-litho, wfe-capex, china-export-controls, memory-vs-logic]

## THESIS (what must remain true)
1. EUV monopoly — sole supplier of EUV (and High-NA EUV) lithography; no substitute for
   leading-edge logic/memory. A true single-source bottleneck.
2. Installed-base management — service/upgrade/field-options revenue is a growing,
   recurring, high-margin annuity on a large fielded fleet.
3. Secular WFE demand — AI/HPC + leading-edge transitions drive multi-year wafer-fab
   equipment capex; ASML captures the litho intensity uplift.
4. Backlog + pricing — multi-year order book at rising ASPs; High-NA ramps the next leg.

## UNDERWRITING ANCHORS
- bookings (net):             supporting guided revenue path   # confirm
- EUV/High-NA shipments:      on guided trajectory
- installed-base mgmt revenue: growing, recurring
- gross margin:               expanding toward guided range (high-50s%)   # confirm

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: a tightened export-control regime removes a structurally larger slice of the
  served market (not just China DUV) than underwritten → re-underwrite TAM → SELL/TRIM
- BREAK-2: net bookings fall below the level needed to support the guided revenue path
  for 2 consecutive quarters (demand, not timing) → re-underwrite
- BREAK-3: a credible competing EUV/alternative-patterning path emerges that threatens
  the monopoly → SELL/TRIM (load-bearing moat break)
- BREAK-4: High-NA adoption stalls / customers defer leading-edge transitions
  structurally → re-underwrite growth leg

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: bookings reacceleration + High-NA orders ahead of plan → ADD
- STRENGTHEN-2: installed-base revenue inflection + margin expansion → ADD

### 💲 PRICE TRIGGERS
- add band:          < $650        action: add one tranche
- trim level:        valuation > 40x fwd P/E at cycle peak
- hard sell level:   only on BREAK-1/BREAK-3 (TAM or monopoly break)

## CATALYSTS
- quarterly earnings | HARD | watch: net bookings, China mix, gross margin, guidance
- export-control policy (US/NL/EU vs China) | HARD | watch: scope expansion to EUV/DUV
- customer (TSMC/Intel/Samsung) capex updates | SOFT | watch: leading-edge demand

## NOISE FILTER (ignore)
- Sell-side PT changes; lumpy quarter-to-quarter bookings (it's an order-flow business)
- Single fab's timing push-out within an intact multi-year demand picture

## MONITORING NOTES
- key_monitor: export-control scope (China + any allied tightening) + net bookings trend
- next_checkpoint: next quarterly earnings
- Bookings are inherently lumpy; judge the demand thesis over 2+ quarters. The two real
  break risks are export-control TAM loss and (tail) a credible monopoly challenger.

## CHANGELOG
- 2026-06-11: registered; export-control TAM + monopoly integrity set as break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [semis-wfe-litho, wfe-capex, china-export-controls, memory-vs-logic]
break:
  - id: BREAK-1
    condition: "export_controls remove structurally larger served-market slice than underwritten"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "net_bookings below guided-path support level"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-3
    condition: "credible competing EUV / alt-patterning path emerges"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-4
    condition: "High-NA adoption stalls / leading-edge deferrals structural"
    persistence: "2 quarters"
    action: "re-underwrite"
strengthen:
  - id: STRENGTHEN-1
    condition: "bookings reaccel AND High-NA orders ahead of plan"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "installed-base revenue inflection AND margin expansion"
    action: "ADD"
price:
  add_band: "below 650"
  trim_above: "fwd_pe > 40 at cycle peak"
  hard_sell: "BREAK-1/BREAK-3 only"
catalysts:
  - date: "quarterly"
    event: "earnings"
    type: "HARD"
    watch: "net bookings, China mix, gross margin, guidance"
  - date: "ongoing"
    event: "export-control policy (US/NL/EU vs China)"
    type: "HARD"
    watch: "scope expansion to EUV/DUV"
key_monitor: "export-control scope + net bookings trend"
next_checkpoint: "next quarterly earnings"
```
