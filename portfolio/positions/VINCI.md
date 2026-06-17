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
