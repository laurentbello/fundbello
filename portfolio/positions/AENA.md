# AENA — Aena S.M.E., S.A. (AENA.MC)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            AENA.MC
- status:            CORE
- target_weight:     3.5%      current_weight: 3.5%
- entry_ref:         DORA-cycle accumulation, blended ~€150–175
- base_case_irr:     ~8–11% (regulated aero + uncapped commercial + traffic growth)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [infra-concession, regulation, inflation-linked-tariffs]

## THESIS (what must remain true)
1. Monopoly Spanish airport network — irreplaceable, regulated dual-till asset; the
   gateway for Europe's largest tourism inflows.
2. DORA regulatory framework — the airport tariff regulation (DORA III period) sets a
   visible, formula-driven aero revenue path; predictability is the moat.
3. Commercial revenue (un-regulated) — retail/parking/real-estate grows above traffic
   and is NOT tariff-capped; the real value-creation lever.
4. Traffic compounding — Spanish + LatAm (incl. associated stakes) passenger growth
   above GDP, with high incremental margins.

## UNDERWRITING ANCHORS
- DORA III aero tariff path:   regulator's published max-tariff trajectory intact     # confirm DORA III terms
- traffic growth:              ≥ low-single-digit above 2019 base
- commercial rev/pax:          rising YoY (uncapped lever)
- net debt/EBITDA:             ≤ 3.0x   # confirm

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: DORA III (or successor) sets max-tariff growth materially below the
  consultation path, or re-regulates the commercial/dual-till to claw back retail
  upside → SELL/TRIM (this is the load-bearing regulatory break)
- BREAK-2: passenger traffic falls below 2019 levels and stays there for 2 consecutive
  quarters absent a one-off shock → re-underwrite
- BREAK-3: net debt/EBITDA > 3.5x funding non-core real-estate/M&A → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: DORA period finalized at/above consultation tariff path → ADD
- STRENGTHEN-2: commercial rev/pax inflecting up + buyback/dividend step-up → ADD

### 💲 PRICE TRIGGERS
- add band:          < €160        action: add one tranche
- trim level:        valuation > 16x fwd P/E on a fully-recovered traffic base
- hard sell level:   only on BREAK-1 (adverse DORA re-regulation)

## CATALYSTS
- DORA III consultation / resolution milestones | HARD | watch: max-tariff path, dual-till treatment
- 2026-07 | H1 results | HARD | watch: traffic, commercial rev/pax, ND/EBITDA, guidance

## NOISE FILTER (ignore)
- Sell-side PT changes; single-month traffic/weather/strike noise
- Spanish political headlines that don't touch DORA or the dual-till

## MONITORING NOTES
- key_monitor: DORA III regulatory tariff path + any dual-till re-regulation
- next_checkpoint: next DORA milestone / 2026-07 H1 results
- The aero leg is regulated and bounded; the alpha is the uncapped commercial line.
  The only thesis-killer is the regulator clawing back the commercial upside.

## CHANGELOG
- 2026-06-11: registered; DORA III re-regulation set as the primary break test.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [infra-concession, regulation, inflation-linked-tariffs]
break:
  - id: BREAK-1
    condition: "DORA_III max_tariff_path << consultation OR dual_till re-regulated to claw back commercial"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "pax_traffic < 2019_base"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-3
    condition: "net_debt_ebitda > 3.5x for non-core M&A"
    persistence: "immediate"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "DORA_period finalized >= consultation path"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "commercial_rev_per_pax inflecting up AND distribution stepped up"
    action: "ADD"
price:
  add_band: "below 160"
  trim_above: "fwd_pe > 16 on recovered traffic"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "DORA III milestones"
    event: "regulatory tariff resolution"
    type: "HARD"
    watch: "max-tariff path, dual-till treatment"
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "traffic, commercial rev/pax, ND/EBITDA"
key_monitor: "DORA III tariff path / dual-till re-regulation"
next_checkpoint: "next DORA milestone / 2026-07 H1 results"
```
