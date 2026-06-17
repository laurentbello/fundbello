# WM — Waste Management Inc.
# Per-position playbook. Worked example of SKILL.template.md.

## META
- ticker:            WM
- status:            STARTER (intentional ~1% above WAIT plan, taken Jun-2026)
- target_weight:     full 4–5% on plan      current_weight: 1.04%
- entry_ref:         starter ~$221; tranche-1 add band <$205; full position $190–195
- base_case_irr:     ~9–11% at full-position entry zone
- last_reunderwrite: 2026-06-11
- cluster_tags:      [us-industrial-volume, fuel-cost, rates-leverage]

## THESIS (what must remain true)
1. Landfill permitting moat — irreplaceable, un-replicable disposal assets; new
   landfills effectively un-permittable in developed markets.
2. Pricing power above inflation — core price consistently outpaces internal cost
   inflation, widening the price/cost spread.
3. Route density + internalization — collection density feeds owned disposal,
   compounding unit economics.
4. Optionality — RNG / sustainability investments + WM Healthcare (Stericycle)
   synergy capture as incremental, not load-bearing, upside.

## UNDERWRITING ANCHORS
- core price growth:        ≥ +4.5%
- price/cost spread:        ≥ 150 bps
- net leverage:             on path to ≤ 3.0x by YE2026
- Healthcare synergy target: ≥ $250M (Stericycle integration)

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Revenue = Volume × Yield, across Collection / Landfill-disposal / Recycling / RNG lines
- Operating EBIT = Revenue × margin, where margin = f(price/cost spread); route density →
  disposal internalization lifts the incremental margin   ← **thesis hinges here**
- FCF = EBIT − maintenance capex − RNG/sustainability growth capex + IRA/RNG credits
- Additive optionality (non-load-bearing): WM Healthcare (Stericycle) synergy capture
- Leaf observables: core price %, internal cost inflation %, internalization rate, synergy $

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| Core price growth (%) | The pricing-power moat in one number; debated vs cost inflation | Quarterly earnings exhibit / call — "core price" |
| Price/cost spread (bps) | Cleanest read on moat vs inflation; thesis-defining | Earnings deck: core price vs internal-cost-inflation |
| Healthcare (Stericycle) synergy run-rate ($) | Tests the only load-bearing piece of optionality | Integration updates on calls / 8-K |

### Thresholds
- STRENGTHEN (add / upsize): price/cost spread widening with core price ≥ +5% sustained
- BREAK (trim / exit): core price < 4.5% OR spread < 150 bps for 2 consecutive quarters
- Position rules: starter ~$221; add tranche-1 < $205; full 4–5% at $190–195; re-underwrite > $230

### Next checkpoint
28 Jul 2026 — Q2 earnings (reads core price, spread, Healthcare synergy, leverage path)

### One-line thesis (for investor letter + daily review)
Thesis hinges on the price/cost spread (pricing power on un-permittable disposal); confirm
spread ≥ 150 bps and core price ≥ 4.5% at the 28 Jul Q2 print.

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: core price < 4.5% OR price/cost spread < 150 bps, for 2 consecutive
  quarters → thesis impaired → SELL / do not add
- BREAK-2: Healthcare (Stericycle) synergy target cut below $250M → TRIM, re-rate
- BREAK-3: net leverage NOT ≤ 3.0x by YE2026 → re-underwrite balance-sheet thesis

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: price/cost spread widening with core price ≥ +5% sustained → ADD
- STRENGTHEN-2: leverage ≤ 3.0x ahead of plan + buyback resumption → ADD

### 💲 PRICE TRIGGERS
- add band (tranche-1): < $205            action: add to ~2.5%
- full position:        $190–195          action: complete to 4–5% target
- re-underwrite up:     > $230            action: re-test thesis before any add

## CATALYSTS
- 2026-07-28 | Q2 earnings | HARD | watch: core price vs 4.5%, price/cost spread
  vs 150bps, Healthcare synergy commentary, leverage trajectory
- YE2026     | leverage checkpoint | HARD | watch: ≤ 3.0x confirmed?

## NOISE FILTER (ignore)
- Sell-side PT changes; single-quarter volume softness within guided range
- Fuel-cost pass-through timing noise (it's a pass-through, not a thesis driver)
- Intraday moves that don't cross $205 / $195 / $230

## MONITORING NOTES
- key_monitor: price/cost spread (the cleanest read on pricing power vs the moat)
- next_checkpoint: 2026-07-28 Q2 earnings
- Starter is intentional and above the WAIT plan; adds remain disciplined to the
  price bands. Do not let the starter drift the plan upward.

## CHANGELOG
- 2026-06-11: WM alert set — WAIT ~$221; tranche-1 <$205; full $190–195;
  re-underwrite >$230; break tests registered (above).
- 2026-06: starter ~1% initiated above plan.

# -----------------------------------------------------------------------------
```signals
status: STARTER
cluster_tags: [us-industrial-volume, fuel-cost, rates-leverage]
break:
  - id: BREAK-1
    condition: "core_price < 4.5% OR price_cost_spread < 150bps"
    persistence: "2 quarters"
    action: "SELL / no add"
  - id: BREAK-2
    condition: "healthcare_synergy_target < 250M"
    persistence: "immediate"
    action: "TRIM, re-rate"
  - id: BREAK-3
    condition: "net_leverage > 3.0x at YE2026"
    persistence: "immediate"
    action: "re-underwrite balance sheet"
strengthen:
  - id: STRENGTHEN-1
    condition: "price_cost_spread widening AND core_price >= 5% sustained"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "net_leverage <= 3.0x ahead of plan AND buyback resumed"
    action: "ADD"
price:
  add_band: "below 205"
  full_position: "190-195"
  reunderwrite_above: "230"
  hard_sell: null
catalysts:
  - date: "2026-07-28"
    event: "Q2 earnings"
    type: "HARD"
    watch: "core price vs 4.5%, spread vs 150bps, Healthcare synergy, leverage path"
key_monitor: "price/cost spread"
next_checkpoint: "2026-07-28"
```
