# VINCI — VINCI SA (DG.PA)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            DG.PA
- status:            CORE
- target_weight:     5%      current_weight: 5.0%
- entry_ref:         concession-cycle accumulation, blended ~€105–115
- base_case_irr:     ~9–11% (toll inflation-linkage + airports recovery + buybacks)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [infra-concession, rates, inflation-linked-tariffs]

## THESIS (what must remain true)
1. Toll-road concession economics — ASF/Cofiroute/Escota tariffs reset with
   inflation under long-dated French concession contracts; traffic is structurally
   sticky (commuter + freight).
2. VINCI Airports — irreplaceable concession portfolio; passenger traffic compounds
   above GDP with regulated/contracted retail + aero tariff uplift.
3. Contracting (Energies + Construction) — backlog-covered, energy-transition and
   grid capex tailwind; cash-generative, funds the concession/dividend engine.
4. Capital discipline — concession cash funds dividends + buybacks without
   over-levering; new concessions only at accretive IRRs.

## UNDERWRITING ANCHORS
- toll tariff growth:        ≥ CPI-linked floor (French ADP formula intact)   # confirm current formula %
- airport pax recovery:      ≥ 2019 levels, growing low-to-mid single digit
- contracting book-to-bill:  ≥ 1.0x
- net financial debt/EBITDA: ≤ 3.0x   # confirm

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Revenue = Concessions [toll traffic × tariff + airport pax × rev/pax] + Contracting [backlog × execution]
- Concession EBIT ≈ near-fixed-cost base, so margin scales with traffic × tariff; the toll
  tariff inflation pass-through is the value engine   ← **thesis hinges here**
- Contracting EBIT = thin-margin but cash-generative; funds the concession/dividend engine
- FCF = concession EBITDA − maintenance − new-concession capex → dividend + buyback
- Leaf observables: toll tariff reset %, toll traffic %, airport pax, backlog book-to-bill

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| French motorway tariff reset vs CPI formula | The inflation pass-through IS the concession value; politically contested | Annual gov tariff decree (Feb) / ASF filings |
| VINCI Airports pax growth (%) | Second value lever, above-GDP; recovery debated | VINCI Airports monthly traffic releases |
| Net debt / EBITDA | Guards against value-destructive concession M&A | H1 / FY results |

### Thresholds
- STRENGTHEN (add / upsize): accretive new airport/road concession at IRR ≥ base case; or
  tariff formula reaffirmed + buyback step-up
- BREAK (trim / exit): motorway tariff formula impaired OR windfall concession tax enacted
- Position rules: add band < €100; trim if fwd P/E > 18 with airports fully recovered

### Next checkpoint
Jul 2026 — H1 results (reads toll tariff/traffic, airport pax, backlog, ND/EBITDA)

### One-line thesis (for investor letter + daily review)
Thesis hinges on the French motorway tariff inflation pass-through; the live read is whether
the formula stays intact — confirm no windfall concession tax / re-regulation.

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: French government re-opens/cuts motorway concession tariff formula OR
  imposes a windfall concession tax that breaks the inflation pass-through → SELL/TRIM
- BREAK-2: airport pax growth turns negative YoY for 2 consecutive quarters absent a
  one-off shock → re-underwrite airports leg
- BREAK-3: contracting margin compresses below mid-cycle with book-to-bill < 1.0x for
  2 consecutive quarters → TRIM
- BREAK-4: net debt/EBITDA > 3.5x to fund a non-accretive concession acquisition → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: accretive new airport/road concession win at IRR ≥ base case → ADD
- STRENGTHEN-2: tariff formula reaffirmed + buyback step-up → ADD

### 💲 PRICE TRIGGERS
- add band:          < €100        action: add one tranche
- trim level:        valuation > 18x fwd P/E with airports fully recovered
- hard sell level:   only on BREAK-1 (concession-formula impairment)

## CATALYSTS
- 2026-07 | H1 results | HARD | watch: toll traffic/tariff, airport pax, backlog, ND/EBITDA
- ongoing | French motorway concession-end / re-tender policy news | HARD | watch: formula risk

## NOISE FILTER (ignore)
- Sell-side PT changes; single-month traffic weather noise; FX translation
- French political headlines that don't touch the concession tariff formula

## MONITORING NOTES
- key_monitor: French motorway concession tariff-formula / windfall-tax risk
- next_checkpoint: 2026-07 H1 results
- The whole thesis rests on the inflation pass-through staying intact. Political
  pressure on motorway "super-profits" is the one tail that re-rates the name.

## CHANGELOG
- 2026-06-11: registered; concession-formula risk set as the primary break test.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [infra-concession, rates, inflation-linked-tariffs]
break:
  - id: BREAK-1
    condition: "french_motorway_tariff_formula impaired OR windfall_concession_tax enacted"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "airport_pax_growth < 0% YoY"
    persistence: "2 quarters"
    action: "re-underwrite airports"
  - id: BREAK-3
    condition: "contracting_book_to_bill < 1.0x AND margin < mid-cycle"
    persistence: "2 quarters"
    action: "TRIM"
  - id: BREAK-4
    condition: "net_debt_ebitda > 3.5x for non-accretive M&A"
    persistence: "immediate"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "new_concession_win IRR >= base_case"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "tariff_formula reaffirmed AND buyback stepped up"
    action: "ADD"
price:
  add_band: "below 100"
  trim_above: "fwd_pe > 18 with airports recovered"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "toll tariff/traffic, airport pax, backlog, ND/EBITDA"
key_monitor: "french motorway tariff-formula / windfall-tax risk"
next_checkpoint: "2026-07 H1 results"
```
