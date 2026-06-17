# LRCX — Lam Research Corporation (LRCX)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            LRCX
- status:            CORE
- target_weight:     3%      current_weight: 3.0%
- entry_ref:         WFE-compounder accumulation, blended ~$70–95 (post-split basis)   # confirm
- base_case_irr:     ~9–12% (etch/deposition leadership + installed-base CSBG annuity)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [semis-wfe-litho, wfe-capex, china-export-controls, memory-vs-logic]

## THESIS (what must remain true)
1. Etch + deposition leadership — Lam co-leads the etch/deposition WFE niches that get
   MORE critical as devices go 3D (NAND stacking, gate-all-around, advanced packaging).
2. Installed-base annuity (CSBG) — spares/services/upgrades on a large fielded base is a
   recurring, higher-margin revenue stream that cushions WFE cyclicality.
3. Memory + logic leverage — NAND/DRAM recovery plus leading-edge logic transitions
   drive etch/dep intensity; Lam captures the architecture-driven step-ups.
4. Capital return — strong FCF funds aggressive buyback compounding EPS.

## UNDERWRITING ANCHORS
- WFE / systems revenue:      tracking the WFE cycle; share held in etch/dep
- CSBG (installed-base) rev:  growing, recurring
- gross margin:               holding/expanding (high-40s%)   # confirm
- China revenue mix:          within underwritten export-control assumptions

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Revenue = Systems [WFE etch/deposition share × served WFE] + CSBG [installed-base
  spares/service/upgrades, recurring]
- Systems is cyclical (memory-heavy) and gated by export-control scope; the etch/dep
  technology-leadership SHARE on leading-edge nodes is the durable edge   ← **thesis hinges here**
- CSBG annuity cushions the WFE down-cycles; gross margin holds with mix
- FCF → aggressive buyback (EPS compounding)
- Leaf observables: etch/dep share, served WFE / memory capex, China mix, CSBG growth

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| Etch/deposition share on leading-edge nodes | The durable moat vs AMAT/TEL; share shifts are the structural risk | Earnings commentary; node-win disclosures |
| Export-control scope + China revenue mix | Gates the served TAM; the cyclical+policy swing | US BIS policy; quarterly China-mix disclosure |
| CSBG (installed-base) revenue growth | The recurring cushion that de-risks WFE cyclicality | Quarterly results — CSBG segment |

### Thresholds
- STRENGTHEN (add / upsize): NAND/DRAM capex recovery + etch/dep share gains; or CSBG
  inflection + margin expansion + buyback step-up
- BREAK (trim / exit): export controls cut a larger China/served-market slice than
  underwritten; or etch/dep share loss on a leading-edge node
- Position rules: add band < $70 (confirm split-adjusted); trim if fwd P/E > 28 at WFE peak

### Next checkpoint
Next quarterly earnings (reads WFE outlook, China mix, CSBG, gross margin, buyback)

### One-line thesis (for investor letter + daily review)
Thesis hinges on etch/deposition leadership share through the WFE cycle, cushioned by CSBG;
the live read is share held + export-control scope. (Moves with ASML — cluster the semis driver.)

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: tightened export controls cut a structurally larger China/served-market slice
  than underwritten → re-underwrite TAM → SELL/TRIM
- BREAK-2: share loss in core etch/deposition to a competitor (Applied Materials/TEL) on
  a leading-edge node → SELL/TRIM (technology-leadership break)
- BREAK-3: CSBG (installed-base) revenue declines structurally (utilization collapse,
  not a soft quarter) → re-underwrite the annuity cushion
- BREAK-4: a deep, prolonged WFE/memory down-cycle beyond a normal 1–2Q air-pocket →
  re-underwrite IRR (cyclical, size accordingly)

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: NAND/DRAM capex recovery + etch/dep share gains → ADD
- STRENGTHEN-2: CSBG inflection + margin expansion + buyback step-up → ADD

### 💲 PRICE TRIGGERS
- add band:          < $70         action: add one tranche   # confirm split-adjusted level
- trim level:        valuation > 28x fwd P/E at WFE-cycle peak
- hard sell level:   only on BREAK-1/BREAK-2 (TAM or share-loss break)

## CATALYSTS
- quarterly earnings | HARD | watch: WFE outlook, China mix, CSBG, gross margin, buyback
- export-control policy (US vs China) | HARD | watch: scope to etch/dep tools
- memory-maker capex (Samsung/SK Hynix/Micron) | SOFT | watch: NAND/DRAM recovery

## NOISE FILTER (ignore)
- Sell-side PT changes; single-quarter WFE timing within an intact cycle
- Memory spot-price noise that doesn't change customer capex plans

## MONITORING NOTES
- key_monitor: export-control scope + etch/deposition competitive share
- next_checkpoint: next quarterly earnings
- Moves with ASML on WFE/export-control news — treat shared semis-driver moves as a
  CLUSTER read-through. This is the more cyclical of the two; size and add on weakness.

## CHANGELOG
- 2026-06-11: registered; export-control TAM + competitive share set as break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [semis-wfe-litho, wfe-capex, china-export-controls, memory-vs-logic]
break:
  - id: BREAK-1
    condition: "export_controls cut larger China/served-market slice than underwritten"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "etch/deposition share loss on leading-edge node"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-3
    condition: "CSBG installed-base revenue structural decline"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-4
    condition: "deep prolonged WFE/memory down-cycle"
    persistence: "sustained"
    action: "re-underwrite IRR"
strengthen:
  - id: STRENGTHEN-1
    condition: "NAND/DRAM capex recovery AND etch/dep share gains"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "CSBG inflection AND margin expansion AND buyback stepped up"
    action: "ADD"
price:
  add_band: "below 70"
  trim_above: "fwd_pe > 28 at WFE peak"
  hard_sell: "BREAK-1/BREAK-2 only"
catalysts:
  - date: "quarterly"
    event: "earnings"
    type: "HARD"
    watch: "WFE outlook, China mix, CSBG, gross margin, buyback"
  - date: "ongoing"
    event: "export-control policy (US vs China)"
    type: "HARD"
    watch: "scope to etch/dep tools"
key_monitor: "export-control scope + etch/deposition share"
next_checkpoint: "next quarterly earnings"
```
