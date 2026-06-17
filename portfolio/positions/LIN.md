# LIN — Linde plc (LIN)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            LIN
- status:            CORE
- target_weight:     5%      current_weight: 5.0%
- entry_ref:         core-compounder accumulation, blended ~$380–430
- base_case_irr:     ~9–11% (pricing + project backlog + relentless buyback)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [industrial-gases, input-cost, industrial-cycle, on-site-pricing]

## THESIS (what must remain true)
1. On-site take-or-pay density — best-in-class margins; long contracts with cost
   pass-through and minimum-volume protection.
2. Pricing discipline — the industry's pricing leader; price consistently covers cost
   inflation, expanding margin through the cycle.
3. Project backlog — large contracted sale-of-gas backlog (incl. clean-H2/CCS) at
   disciplined, contracted returns underpins multi-year volume growth.
4. Capital allocation — sector-best ROCE plus steady, large buybacks compounding EPS.

## UNDERWRITING ANCHORS
- operating margin:           expanding, sector-leading (high-20s%)   # confirm
- pricing:                    positive every quarter
- ROCE:                       ≥ ~mid-teens, rising
- sale-of-gas backlog:        growing, all contracted
- buyback:                    ongoing net share-count reduction

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: pricing turns negative for 2 consecutive quarters (pricing leadership lost)
  → SELL/TRIM
- BREAK-2: operating margin contracts YoY for 2 consecutive quarters absent a one-off
  → TRIM
- BREAK-3: management commits large backlog at non-contracted / merchant-exposed clean-H2
  terms (capital-discipline break) → TRIM, re-rate
- BREAK-4: ROCE falls below mid-teens trend on a sustained basis → re-underwrite

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: pricing + margin accelerating with buyback step-up → ADD
- STRENGTHEN-2: large contracted backlog win at accretive ROCE → ADD

### 💲 PRICE TRIGGERS
- add band:          < $400        action: add one tranche
- trim level:        valuation > 30x fwd P/E
- hard sell level:   only on BREAK-1 (pricing-power impairment)

## CATALYSTS
- quarterly earnings | HARD | watch: pricing, margin, ROCE, backlog, buyback pace
- clean-H2 FID announcements | SOFT | watch: contracted vs merchant terms

## NOISE FILTER (ignore)
- Sell-side PT changes; energy/input pass-through timing; FX translation
- Single-quarter merchant-volume softness within the industrial cycle

## MONITORING NOTES
- key_monitor: pricing + operating-margin trend (pricing leadership intact?)
- next_checkpoint: next quarterly earnings
- The Linde edge is pricing discipline and margin. As long as price > cost and
  buybacks run, the compounding is intact. The break is pricing rolling over.

## CHANGELOG
- 2026-06-11: registered; pricing leadership + margin trend set as primary break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [industrial-gases, input-cost, industrial-cycle, on-site-pricing]
break:
  - id: BREAK-1
    condition: "pricing < 0%"
    persistence: "2 quarters"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "operating_margin contracting YoY"
    persistence: "2 quarters"
    action: "TRIM"
  - id: BREAK-3
    condition: "large backlog committed non-contracted / merchant clean-H2"
    persistence: "immediate"
    action: "TRIM, re-rate"
  - id: BREAK-4
    condition: "ROCE < mid-teens sustained"
    persistence: "2 quarters"
    action: "re-underwrite"
strengthen:
  - id: STRENGTHEN-1
    condition: "pricing+margin accelerating AND buyback stepped up"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "large contracted backlog win at accretive ROCE"
    action: "ADD"
price:
  add_band: "below 400"
  trim_above: "fwd_pe > 30"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "quarterly"
    event: "earnings"
    type: "HARD"
    watch: "pricing, margin, ROCE, backlog, buyback"
key_monitor: "pricing + operating-margin trend"
next_checkpoint: "next quarterly earnings"
```
