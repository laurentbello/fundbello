# MCO — Moody's Corporation (MCO)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            MCO
- status:            CORE
- target_weight:     3%      current_weight: 3.0%
- entry_ref:         compounder accumulation, blended ~$380–440
- base_case_irr:     ~9–11% (MIS ratings duopoly + MA analytics annuity + buyback)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [ratings-fin-data, debt-issuance, rate-cycle, ratings-regulation]

## THESIS (what must remain true)
1. MIS ratings duopoly — with S&P, the regulatory-entrenched issuer-pays oligopoly;
   near-zero marginal cost, structural pricing power.
2. Moody's Analytics (MA) — recurring subscription annuity (risk/data/research,
   KYC, insurance) growing through the cycle; dampens issuance cyclicality.
3. Issuance leverage — healthy debt issuance + a refinancing wall convert transaction
   ratings straight to very high incremental margin.
4. Capital return — high FCF conversion funds consistent buyback + dividend growth.

## UNDERWRITING ANCHORS
- MA recurring revenue:       growing high-single/double-digit, high retention   # confirm
- MIS ratings revenue:        tracking issuance; pricing positive
- adjusted operating margin:  expanding, high-40s%+   # confirm
- ARR (MA):                   growing double-digit

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Revenue = MIS [issuance × fee, transactional ratings] + Moody's Analytics [recurring
  subscription ARR — risk/data/research/KYC/insurance]
- MIS is high-margin but issuance-cyclical; MA's recurring ARR annuity is the durability
  that smooths the cycle and anchors the multiple   ← **thesis hinges here**
- EBIT = Revenue × margin (near-zero marginal cost on MIS); EPS × buyback
- FCF → buyback + dividend
- Leaf observables: MA ARR growth %, retention, issuance volumes, adj operating margin

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| Moody's Analytics ARR growth + retention | The recurring annuity the valuation rests on; AI-disruption debate | Quarterly results — MA ARR/retention |
| Debt issuance volumes (MIS driver) | The cyclical swing; front-runs MIS revenue | SIFMA/Dealogic issuance; refi-wall trackers |
| Ratings-regulation status | The only structural break to the duopoly | SEC/ESMA proposals, issuer-rotation bills |

### Thresholds
- STRENGTHEN (add / upsize): MA ARR reaccel + issuance recovery + buyback step-up; or
  margin expansion ahead of plan
- BREAK (trim / exit): structural ratings re-regulation (issuer rotation / forced
  competition / fee caps); or MA ARR growth → low-single-digit / retention slips 2 quarters
- Position rules: add band < $380; trim if fwd P/E > 35

### Next checkpoint
Next quarterly earnings (reads MIS vs issuance, MA ARR/retention, margin, buyback)

### One-line thesis (for investor letter + daily review)
Thesis hinges on MA's recurring ARR annuity de-risking the issuance-cyclical MIS duopoly;
the live read is ARR growth + retention holding par. (Moves with SPGI — cluster the shared
issuance/regulation driver.)

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: structural ratings re-regulation (mandatory issuer rotation, forced
  competition, fee caps) that breaks the duopoly pricing → SELL/TRIM
- BREAK-2: MA recurring/ARR growth decelerates to low-single-digit or retention slips
  below par for 2 consecutive quarters → re-underwrite the annuity
- BREAK-3: sustained issuance collapse (not a 1–2Q air-pocket) with no MA offset →
  re-underwrite IRR
- BREAK-4: large debt-funded M&A at sub-hurdle returns → TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: MA ARR reacceleration + issuance recovery + buyback step-up → ADD
- STRENGTHEN-2: margin expansion ahead of plan → ADD

### 💲 PRICE TRIGGERS
- add band:          < $380        action: add one tranche
- trim level:        valuation > 35x fwd P/E
- hard sell level:   only on BREAK-1 (ratings re-regulation)

## CATALYSTS
- quarterly earnings | HARD | watch: MIS vs issuance, MA ARR/retention, margin, buyback
- ratings-regulation news (SEC/ESMA) | HARD | watch: issuer-rotation / competition proposals

## NOISE FILTER (ignore)
- Sell-side PT changes; single-quarter issuance swings (rate-driven, mean-reverting)
- AI-disruption-of-research headlines without disclosed MA churn evidence

## MONITORING NOTES
- key_monitor: ratings-regulation risk + MA recurring (ARR/retention) durability
- next_checkpoint: next quarterly earnings
- Moves with SPGI on the issuance cycle — treat shared issuance/regulation moves as a
  CLUSTER read-through, not two independent alerts. The break is regulatory.

## CHANGELOG
- 2026-06-11: registered; ratings re-regulation + MA durability set as break tests.

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
    condition: "MA_ARR_growth low-single-digit OR retention < par"
    persistence: "2 quarters"
    action: "re-underwrite"
  - id: BREAK-3
    condition: "structural issuance collapse with no MA offset"
    persistence: "sustained"
    action: "re-underwrite IRR"
  - id: BREAK-4
    condition: "large debt-funded M&A sub-hurdle"
    persistence: "immediate"
    action: "TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "MA ARR reaccel AND issuance recovery AND buyback stepped up"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "margin expansion ahead of plan"
    action: "ADD"
price:
  add_band: "below 380"
  trim_above: "fwd_pe > 35"
  hard_sell: "BREAK-1 only"
catalysts:
  - date: "quarterly"
    event: "earnings"
    type: "HARD"
    watch: "MIS vs issuance, MA ARR/retention, margin, buyback"
  - date: "ongoing"
    event: "ratings regulation (SEC/ESMA)"
    type: "HARD"
    watch: "issuer-rotation / competition proposals"
key_monitor: "ratings-regulation risk + MA ARR durability"
next_checkpoint: "next quarterly earnings"
```
