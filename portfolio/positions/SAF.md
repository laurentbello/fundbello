# SAF — Safran S.A. (SAF.PA)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            SAF.PA
- status:            CORE
- target_weight:     4.6%      current_weight: 4.6%
- entry_ref:         aftermarket-compounder accumulation, blended ~€180–220
- base_case_irr:     ~9–12% (CFM56/LEAP installed base + spares super-cycle)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [aerospace, build-rates, aftermarket-RPK, supply-chain]

## THESIS (what must remain true)
1. CFM installed-base annuity — the world's largest narrowbody engine fleet
   (CFM56 + LEAP via CFM JV); decades of high-margin spare-parts + MRO revenue.
2. Aftermarket super-cycle — air-traffic (RPK) growth + an aging in-service fleet
   drives civil spares well above OE; the real profit engine.
3. LEAP ramp to profitability — as LEAP shop-visits begin, the razor-blade model
   compounds; OE losses convert to aftermarket annuity.
4. Pricing + content — sole/dominant-source position lets spares pricing run above
   inflation; propulsion content per aircraft rising.

## UNDERWRITING ANCHORS
- civil aftermarket growth:   double-digit YoY (spares + services)   # confirm
- RPK growth:                 positive, above-trend
- LEAP shop-visit ramp:       on guided trajectory
- free cash flow conversion:  strong, funding buyback/dividend

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Revenue = Propulsion [OE engines (low/neg margin) + Civil aftermarket (high margin)] +
  Equipment/Defence
- Profit ≈ dominated by civil aftermarket = installed base × shop-visit rate × spares
  pricing; this annuity on CFM56/LEAP is the whole engine   ← **thesis hinges here**
- OE is a razor (loss-leader) that seeds future aftermarket razor-blades
- FCF = aftermarket cash − OE working-capital drag − R&D → buyback/dividend
- Leaf observables: civil aftermarket growth %, RPK, LEAP shop-visit ramp, spares pricing

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| Civil aftermarket (spares) growth (%) | The high-margin annuity = ~all the profit; cycle timing debated | Quarterly results — civil aftermarket line |
| LEAP shop-visit ramp + margin | When LEAP turns razor→blade is the next-leg swing factor | Earnings commentary / guidance |
| Global RPK growth | Demand driver of shop visits + spares | IATA monthly traffic data |

### Thresholds
- STRENGTHEN (add / upsize): aftermarket reacceleration + spares pricing above plan; or
  LEAP shop-visit ramp + margin inflection ahead of guidance
- BREAK (trim / exit): civil aftermarket growth ≤ low-single-digit/negative for 2 quarters
  absent a one-off (the annuity breaks)
- Position rules: add band < €180; trim if fwd P/E > 28 with cycle peaking

### Next checkpoint
Jul 2026 — H1 results (reads civil aftermarket %, LEAP ramp, FCF, guidance)

### One-line thesis (for investor letter + daily review)
Thesis hinges on the high-margin civil-aftermarket annuity on the CFM/LEAP base; the live
read is aftermarket growth staying double-digit, not OE ship counts.

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: civil aftermarket (spares) growth decelerates to low-single-digit / negative
  for 2 consecutive quarters absent a defined one-off → SELL/TRIM (the annuity is the thesis)
- BREAK-2: a structural RPK shock (sustained demand contraction, not a transient event)
  → re-underwrite the aftermarket curve
- BREAK-3: LEAP durability/technical issue forcing uncompensated retrofit or shop-visit
  cost spike → TRIM, re-rate
- BREAK-4: supply-chain constraint caps OE deliveries AND drags aftermarket parts for
  2+ quarters → re-underwrite

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: aftermarket reacceleration + spares pricing above plan → ADD
- STRENGTHEN-2: LEAP shop-visit ramp + margin inflection ahead of guidance → ADD

### 💲 PRICE TRIGGERS
- add band:          < €180        action: add one tranche
- trim level:        valuation > 28x fwd P/E with cycle peaking
- hard sell level:   only on BREAK-1 (aftermarket annuity breaks)

## CATALYSTS
- 2026-07 | H1 results | HARD | watch: civil aftermarket %, LEAP ramp, FCF, guidance
- Paris/industry air-show + airline capex news | SOFT | watch: build rates, RPK

## NOISE FILTER (ignore)
- Sell-side PT changes; single-quarter OE delivery timing (Airbus-driven) noise
- Defense/space order lumpiness within guided range

## MONITORING NOTES
- key_monitor: civil aftermarket (spares) growth — the high-margin annuity
- next_checkpoint: 2026-07 H1 results
- OE deliveries are lumpy and supply-constrained; the thesis is the aftermarket annuity
  on the installed base, not this quarter's engine ship count.

## CHANGELOG
- 2026-06-11: registered; civil-aftermarket growth set as the primary break test.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [aerospace, build-rates, aftermarket-RPK, supply-chain]
break:
  - id: BREAK-1
    condition: "civil_aftermarket_growth <= low-single-digit / negative"
    persistence: "2 quarters"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "structural RPK contraction (not transient)"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-3
    condition: "LEAP durability issue -> uncompensated retrofit / shop-visit cost spike"
    persistence: "immediate"
    action: "TRIM, re-rate"
  - id: BREAK-4
    condition: "supply_chain caps OE AND drags aftermarket parts"
    persistence: "2 quarters"
    action: "re-underwrite"
strengthen:
  - id: STRENGTHEN-1
    condition: "aftermarket reacceleration AND spares pricing above plan"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "LEAP shop-visit ramp + margin inflection ahead of guidance"
    action: "ADD"
price:
  add_band: "below 180"
  trim_above: "fwd_pe > 28 with cycle peaking"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "civil aftermarket %, LEAP ramp, FCF, guidance"
key_monitor: "civil aftermarket (spares) growth"
next_checkpoint: "2026-07 H1 results"
```
