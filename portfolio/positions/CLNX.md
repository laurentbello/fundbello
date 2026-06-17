# CLNX — Cellnex Telecom, S.A. (CLNX.MC)
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.

## META
- ticker:            CLNX.MC
- status:            CORE
- target_weight:     3.4%      current_weight: 3.4%
- entry_ref:         deleveraging-story accumulation, blended ~€32–38
- base_case_irr:     ~9–12% (contracted escrow cash flows + deleveraging + buyback turn)
- last_reunderwrite: 2026-06-11
- cluster_tags:      [infra-concession, rates, inflation-linked-tariffs]

## THESIS (what must remain true)
1. Tower toll-booth economics — long-dated, inflation-linked MSA contracts with
   anchor MNOs; revenue is contracted, recurring, and CPI-escalated.
2. Deleveraging + IG turn — the pivot from build-out to FCF: net debt falling toward
   target, rating to investment grade, buybacks resuming.
3. Organic growth — colocation/new build-to-suit on existing grid lifts tenancy
   ratios at near-zero incremental cost (operating leverage).
4. Capital discipline — no more debt-funded mega-M&A; portfolio pruning (asset sales)
   at premium multiples funds the balance sheet.

## UNDERWRITING ANCHORS
- net debt / EBITDA:        on path to ≤ 6.0x then lower (deleveraging target)   # confirm target
- recurring leveraged FCF:  growing double-digit toward guided path
- contract escalators:      CPI-linked, intact
- credit rating:            investment grade achieved/held

## DRIVER TREE & KPI ISOLATION

### Driver tree
- Revenue = Σ(sites × tenancy ratio × rent/tenant), rent CPI-escalated under long MSAs
- EBITDA = Revenue × tower-margin; new colocation drops in at ~zero incremental cost
- Recurring leveraged FCF = EBITDA − maintenance capex − cash interest; the interest line
  (and thus deleveraging + rating) is what turns the equity story   ← **thesis hinges here**
- FCF use = deleverage → IG rating → buyback resumption
- Leaf observables: net debt/EBITDA, RLFCF/share, tenancy ratio, CPI escalators, rating

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| Net debt / EBITDA trajectory | The whole re-rate is the deleveraging-and-IG turn; pace is debated | Quarterly results; rating-agency reports |
| Recurring leveraged FCF / share | Proves the FCF inflection the equity story rests on | H1 / FY results & guidance |
| Anchor-MNO contracted tenancy / CPI escalators | Guards the contracted-cash base under the leverage | MSA disclosures, MNO network-sharing news |

### Thresholds
- STRENGTHEN (add / upsize): deleveraging ahead of plan + buyback launched/expanded; or
  rating upgrade to mid-IG + tenancy ratio rising
- BREAK (trim / exit): anchor-MNO churn removes contracted tenancy beyond guidance, OR
  CPI escalators renegotiated down at a major MSA, OR deleveraging stalls 2 quarters
- Position rules: add band < €30; trim if EV/EBITDA > 22 with deleveraging complete

### Next checkpoint
Jul 2026 — H1 results (reads ND/EBITDA path, RLFCF guidance, buyback) + rating reviews

### One-line thesis (for investor letter + daily review)
Thesis hinges on the deleveraging-to-IG FCF turn on a contracted, CPI-linked tower base;
the live read is ND/EBITDA falling on plan with the rating outlook intact.

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM)
- BREAK-1: anchor MNO churn / network-sharing deal removes contracted tenancy beyond
  guided assumptions → re-underwrite cash flows → SELL/TRIM
- BREAK-2: deleveraging path stalls — net debt/EBITDA not improving for 2 consecutive
  quarters, or rating outlook turns negative → TRIM
- BREAK-3: management re-opens large debt-funded M&A (reverses capital-discipline
  thesis) → TRIM, re-rate
- BREAK-4: CPI-escalator contracts renegotiated downward at a major MSA → SELL/TRIM

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: deleveraging ahead of plan + buyback launched/expanded → ADD
- STRENGTHEN-2: rating upgrade to mid-IG + tenancy ratio rising → ADD

### 💲 PRICE TRIGGERS
- add band:          < €30         action: add one tranche
- trim level:        valuation > 22x EV/EBITDA with deleveraging complete
- hard sell level:   only on BREAK-1/BREAK-4 (contract impairment)

## CATALYSTS
- 2026-07 | H1 results | HARD | watch: ND/EBITDA path, RLFCF guidance, buyback
- rating-agency reviews | HARD | watch: IG status / outlook

## NOISE FILTER (ignore)
- Sell-side PT changes; rate-driven multiple wobble that doesn't change contracted cash
- Single-quarter build-to-suit timing

## MONITORING NOTES
- key_monitor: deleveraging trajectory + IG rating + anchor-MNO contract integrity
- next_checkpoint: 2026-07 H1 results
- This is a rates-sensitive, deleveraging compounder: the thesis is the FCF-and-rating
  turn. Contract impairment (lost tenancy / cut escalators) is the only fundamental break.

## CHANGELOG
- 2026-06-11: registered; deleveraging path + contract integrity set as break tests.

# -----------------------------------------------------------------------------
```signals
status: CORE
cluster_tags: [infra-concession, rates, inflation-linked-tariffs]
break:
  - id: BREAK-1
    condition: "anchor_MNO_churn removes contracted tenancy beyond guidance"
    persistence: "immediate"
    action: "SELL/TRIM"
  - id: BREAK-2
    condition: "net_debt_ebitda not improving OR rating_outlook negative"
    persistence: "2 quarters"
    action: "TRIM"
  - id: BREAK-3
    condition: "large debt-funded M&A reopened"
    persistence: "immediate"
    action: "TRIM, re-rate"
  - id: BREAK-4
    condition: "CPI_escalator renegotiated down at major MSA"
    persistence: "immediate"
    action: "SELL/TRIM"
strengthen:
  - id: STRENGTHEN-1
    condition: "deleveraging ahead of plan AND buyback launched/expanded"
    action: "ADD"
  - id: STRENGTHEN-2
    condition: "rating upgraded to mid-IG AND tenancy ratio rising"
    action: "ADD"
price:
  add_band: "below 30"
  trim_above: "ev_ebitda > 22 with deleveraging complete"
  hard_sell: "BREAK-1/BREAK-4 only"
catalysts:
  - date: "2026-07"
    event: "H1 results"
    type: "HARD"
    watch: "ND/EBITDA path, RLFCF guidance, buyback"
  - date: "rating reviews"
    event: "agency review"
    type: "HARD"
    watch: "IG status / outlook"
key_monitor: "deleveraging path + IG rating + anchor-MNO contract integrity"
next_checkpoint: "2026-07 H1 results"
```
