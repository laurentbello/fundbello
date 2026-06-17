# MA — Mastercard Incorporated (MA)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            MA
- status:            CORE
- target_weight:     2.3%      current_weight: 2.3%
- entry_ref:         network-compounder accumulation
- base_case_irr:     ~10–12% (PV growth + cross-border + services/VAS leadership)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [payment-networks, A2A-stablecoin, interchange-reg, cross-border]

## THESIS (what must remain true)
1. Network duopoly + global acceptance — with Visa, the default global payment rails;
   two-sided network tollbooth economics.
2. Cross-border take-rate — high-margin cross-border (travel + e-commerce) grows above
   domestic PV; the key profit lever.
3. Value-added services & solutions — Mastercard's fastest-growing segment (cyber,
   data/analytics, consulting, open banking); recurring, diversifying mix.
4. Cash-to-card + new flows — emerging-market cash displacement plus B2B / disbursement
   "new payment flows" extend the runway.

## UNDERWRITING ANCHORS
- payments volume / GDV growth:  healthy constant-USD growth
- cross-border volume:           ≥ +8% YoY (alert below for 2 consecutive Q)
- value-added services growth:   double-digit (leadership segment)
- network/scheme fees:           not capped by regulation

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: cross-border volume growth < +8% YoY for 2 consecutive quarters (the profit
  lever softening) → HARD REVIEW
- BREAK-2: a regulator caps NETWORK/scheme fees (not interchange) in a major market
  (EU IFR review, US Fed under an enacted CCCA, RBA review) → HARD REVIEW
- BREAK-3 (CCCA): Credit Card Competition Act passes either chamber as an amendment or
  attaches to a must-pass vehicle → HARD REVIEW; IRR re-run with dual-routing
- BREAK-4 (stablecoin/A2A demand-side): a tier-1 merchant launches stablecoin checkout
  at ≥1% discount vs card, or A2A rails take measurable card-bypass share in a disclosed
  corridor → HARD REVIEW
- BREAK-5: value-added-services growth decelerates to single-digit for 2 consecutive
  quarters (the differentiator vs Visa stalls) → re-underwrite
- DISCIPLINE: any single trigger → HARD REVIEW; two concurrent OR prob-weighted IRR <8%
  → TRIM to 2/3

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: cross-border reacceleration + VAS growth ahead of plan → ADD
- STRENGTHEN-2: CCCA dies in committee + buyback step-up → ADD

### 💲 PRICE TRIGGERS
- add band:          on thesis-intact weakness (define level)   # confirm
- trim level:        per DISCIPLINE (two triggers / IRR <8%)
- hard sell level:   only on a confirmed structural network-fee re-regulation

## CATALYSTS (sync into catalyst_calendar.md)
- quarterly earnings | HARD | watch: GDV, cross-border, VAS growth, guidance
- CCCA legislative calendar | HARD | watch: amendment / must-pass attachment
- EU IFR review / RBA review / US Fed rulemaking | HARD | watch: network-fee caps

## NOISE FILTER (ignore)
- Headline stablecoin settlement figures (incumbent settlement = moat-neutral)
- Interchange-only settlements; single-quarter cross-border geopolitics
- Sell-side PT changes

## MONITORING NOTES
- key_monitor: cross-border growth + network-fee regulation + CCCA status
- next_checkpoint: next quarterly earnings
- Moves with Visa on shared payment-network drivers (CCCA, network-fee reg, A2A/
  stablecoin) — treat those as a CLUSTER read-through across V+MA, not two alerts.
  MA's relative edge is the VAS mix; watch that it keeps outgrowing.

## CHANGELOG
- 2026-06-11: registered; cross-border + CCCA/network-fee reg set as primary break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [payment-networks, A2A-stablecoin, interchange-reg, cross-border]
break:
  - id: BREAK-1
    condition: "cross_border_growth < 8% YoY"
    persistence: "2 quarters"
    action: "HARD REVIEW"
  - id: BREAK-2
    condition: "network/scheme fee cap enacted in major market"
    persistence: "immediate"
    action: "HARD REVIEW"
  - id: BREAK-3
    condition: "CCCA passes a chamber as amendment OR attaches to must-pass vehicle"
    persistence: "immediate"
    action: "HARD REVIEW; IRR dual-routing re-run"
  - id: BREAK-4
    condition: "tier-1 merchant stablecoin checkout >=1% discount OR A2A card-bypass share in corridor"
    persistence: "immediate"
    action: "HARD REVIEW"
  - id: BREAK-5
    condition: "value_added_services_growth single-digit"
    persistence: "2 quarters"
    action: "re-underwrite"
strengthen:
  - id: STRENGTHEN-1
    condition: "cross-border reaccel AND VAS growth ahead of plan"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "CCCA dies in committee AND buyback stepped up"
    action: "ADD"
price:
  add_band: "thesis-intact weakness (define)"
  trim_above: "DISCIPLINE: two triggers / IRR < 8% -> trim to 2/3"
  hard_sell: "confirmed structural network-fee re-regulation"
catalysts:
  - date: "quarterly"
    event: "earnings"
    type: "HARD"
    watch: "GDV, cross-border, VAS growth, guidance"
  - date: "ongoing"
    event: "CCCA legislative calendar"
    type: "HARD"
    watch: "amendment / must-pass attachment"
key_monitor: "cross-border growth + network-fee regulation + CCCA status"
next_checkpoint: "next quarterly earnings"
```
