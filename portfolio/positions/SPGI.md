# SPGI — S&P Global Inc. (SPGI)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            SPGI
- status:            CORE
- target_weight:     3.8%      current_weight: 3.8%
- entry_ref:         compounder accumulation, blended ~$420–480
- base_case_irr:     ~9–11% (ratings duopoly + recurring data/indices + buyback)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [ratings-fin-data, debt-issuance, rate-cycle, ratings-regulation]

## THESIS (what must remain true)
1. Ratings duopoly — S&P + Moody's regulatory-entrenched oligopoly; issuers must be
   rated to access bond markets. Pricing power + ~no marginal cost.
2. Recurring non-issuance mix — Market Intelligence, Indices (S&P 500 licensing),
   Commodity Insights, Mobility — subscription/asset-linked revenue that dampens the
   issuance cycle.
3. Issuance leverage — when debt issuance is healthy, transaction ratings drop straight
   to margin; structural refinancing wall supports volumes.
4. Capital return — high FCF conversion funds steady buyback + dividend growth.

## UNDERWRITING ANCHORS
- ratings revenue:            growing with issuance; pricing positive
- recurring/subscription rev: growing high-single/double-digit, high retention
- operating margin:           expanding, high-40s%+   # confirm
- Indices/Mobility growth:    double-digit

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: structural regulatory change to the ratings model (mandatory issuer rotation,
  forced competition, fee caps) that breaks the duopoly pricing → SELL/TRIM
- BREAK-2: recurring/subscription revenue growth decelerates to low-single-digit / net
  retention falls below par for 2 consecutive quarters → re-underwrite
- BREAK-3: a sustained issuance collapse (not a 1–2Q air-pocket) with no recurring
  offset → re-underwrite IRR
- BREAK-4: large debt-funded M&A at sub-hurdle returns → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: issuance reacceleration + recurring growth holding + buyback step-up → ADD
- STRENGTHEN-2: index AUM/licensing inflecting + margin expansion → ADD

### 💲 PRICE TRIGGERS
- add band:          < $420        action: add one tranche
- trim level:        valuation > 35x fwd P/E
- hard sell level:   only on BREAK-1 (ratings re-regulation)

## CATALYSTS
- quarterly earnings | HARD | watch: ratings vs issuance, recurring growth, margin, buyback
- ratings-regulation news (SEC/ESMA) | HARD | watch: issuer-rotation / competition proposals

## NOISE FILTER (ignore)
- Sell-side PT changes; single-quarter issuance swings (rate-driven, mean-reverting)
- Index-rebalance noise

## MONITORING NOTES
- key_monitor: ratings-regulation risk + recurring (non-issuance) revenue durability
- next_checkpoint: next quarterly earnings
- Issuance is cyclical and self-correcting; don't react to a soft issuance quarter.
  The thesis-killer is regulatory — anything that breaks the issuer-pays duopoly.

## CHANGELOG
- 2026-06-11: registered; ratings re-regulation set as the primary break test.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [ratings-fin-data, debt-issuance, rate-cycle, ratings-regulation]
break:
  - id: BREAK-1
    condition: "ratings re-regulation (issuer rotation / forced competition / fee caps)"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "recurring_revenue_growth low-single-digit OR net_retention < par"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-3
    condition: "structural issuance collapse with no recurring offset"
    persistence: "sustained"
    action: "re-underwrite IRR"
  - id: BREAK-4
    condition: "large debt-funded M&A sub-hurdle"
    persistence: "immediate"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "issuance reaccel AND recurring holding AND buyback stepped up"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "index AUM/licensing inflecting AND margin expansion"
    action: "ADD"
price:
  add_band: "below 420"
  trim_above: "fwd_pe > 35"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "quarterly"
    event: "earnings"
    type: "HARD"
    watch: "ratings vs issuance, recurring growth, margin, buyback"
  - date: "ongoing"
    event: "ratings regulation (SEC/ESMA)"
    type: "HARD"
    watch: "issuer-rotation / competition proposals"
key_monitor: "ratings-regulation risk + recurring revenue durability"
next_checkpoint: "next quarterly earnings"
```
