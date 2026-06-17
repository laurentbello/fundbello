# FER — Ferrovial SE (FER.MC / FER)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            FER.MC
- status:            CORE
- target_weight:     3%      current_weight: 3.0%
- entry_ref:         managed-lane accumulation, blended ~€33–40
- base_case_irr:     ~9–12% (managed-lane dynamic tolling + 407 ETR + airports)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [infra-concession, rates, inflation-linked-tariffs]

## THESIS (what must remain true)
1. US managed lanes (Texas/Virginia) — dynamic, congestion-priced tolling with no
   regulated price cap; pricing power scales with congestion. The crown jewel.
2. 407 ETR (Toronto) — irreplaceable, lightly-regulated toll road; decades of
   above-inflation toll growth and dividend distributions.
3. Airports — Heathrow stake monetization + new airport development optionality.
4. Capital recycling — sells mature/regulated assets at premium multiples, redeploys
   into higher-IRR greenfield managed lanes.

## UNDERWRITING ANCHORS
- managed-lane revenue growth:  double-digit (traffic + dynamic toll)   # confirm
- 407 ETR toll growth + dividend: above inflation, distributions resuming/growing
- net debt (ex-infra-project):   conservative at the corporate level
- new-concession IRR:            ≥ base case on greenfield awards

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: a US managed-lane jurisdiction imposes a price cap / re-regulates dynamic
  tolling on a core asset → SELL/TRIM (removes the un-capped pricing moat)
- BREAK-2: 407 ETR re-regulation or toll-growth restriction by Ontario → re-underwrite
- BREAK-3: managed-lane traffic growth turns structurally negative (not cyclical) for
  2 consecutive quarters → re-underwrite
- BREAK-4: capital recycling reverses — debt-funded acquisition at sub-hurdle IRR → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: new managed-lane concession win at IRR ≥ base case → ADD
- STRENGTHEN-2: 407 dividend resumption/step-up + managed-lane price strength → ADD

### 💲 PRICE TRIGGERS
- add band:          < €32         action: add one tranche
- trim level:        sum-of-parts premium fully closed + assets de-risked
- hard sell level:   only on BREAK-1/BREAK-2 (toll re-regulation)

## CATALYSTS
- 2026-07 | H1 results | HARD | watch: managed-lane revenue/traffic, 407 dividend, recycling
- US/Ontario tolling-policy news | HARD | watch: any price-cap legislation

## NOISE FILTER (ignore)
- Sell-side PT changes; FX (€/$/C$) translation; single-quarter traffic seasonality
- Listing/index-domicile chatter that doesn't touch the assets

## MONITORING NOTES
- key_monitor: US managed-lane and 407 ETR toll-regulation risk (price-cap legislation)
- next_checkpoint: 2026-07 H1 results
- The entire premium is the un-capped dynamic tolling. Any move to cap managed-lane
  or 407 tolls is the thesis-killer; everything else is execution.

## CHANGELOG
- 2026-06-11: registered; toll re-regulation set as the primary break test.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [infra-concession, rates, inflation-linked-tariffs]
break:
  - id: BREAK-1
    condition: "US managed_lane price_cap / dynamic_toll re-regulation on core asset"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "407_ETR re-regulation OR toll-growth restriction"
    persistence: "immediate"
    action: "re-underwrite"
  - id: BREAK-3
    condition: "managed_lane traffic structurally negative"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-4
    condition: "debt-funded acquisition at sub-hurdle IRR"
    persistence: "immediate"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "new managed_lane concession win IRR >= base_case"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "407 dividend step-up AND managed_lane price strength"
    action: "ADD"
price:
  add_band: "below 32"
  trim_above: "SOTP premium closed + assets de-risked"
  hard_sell: "BREAK-1/BREAK-2 only"
catalysts:
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "managed-lane revenue/traffic, 407 dividend, recycling"
  - date: "ongoing"
    event: "US/Ontario tolling policy"
    type: "HARD"
    watch: "price-cap legislation"
key_monitor: "managed-lane / 407 toll-regulation (price-cap) risk"
next_checkpoint: "2026-07 H1 results"
```
