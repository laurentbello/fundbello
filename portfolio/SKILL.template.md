# <TICKER> — <Company Name>
# Per-position playbook. The monitor loop reads THIS file as the only source of
# valid signals for this name. Keep it current; stale playbooks = bad alerts.
# Format = structured memo (human) + machine-parseable signals block (agent).

## META
- ticker:            <TICKER e.g. AENA.MC>
- status:            <CORE | STARTER | WATCH | FLAGGED | EXITED>
- target_weight:     <e.g. 3%>      current_weight: <e.g. 3.22%>
- entry_ref:         <avg cost or entry band>
- base_case_irr:     <e.g. 9–12% / "borderline ~5% prob-weighted">
- last_reunderwrite: <YYYY-MM-DD>
- cluster_tags:      [<e.g. infra-concession, rates>]   # used by cluster layer

## THESIS (what must remain true)
# The 2–4 load-bearing pillars. If one of these stops being true, it's a break.
1. <Pillar — e.g. irreplaceable asset / toll-booth economics>
2. <Pillar — e.g. pricing power above inflation>
3. <Pillar — e.g. long reinvestment runway @ high ROIC>

## UNDERWRITING ANCHORS (the numbers the thesis rests on)
# The specific metrics you'd check to know the thesis is intact. Be quantitative.
# These are what the scan compares fresh data against.
- <metric>: <anchor value / acceptable range>   # e.g. organic growth ≥ +4%
- <metric>: <anchor value>                       # e.g. Adj EBITDA anchor $X (NOT GAAP)
- <metric>: <anchor value>

## DRIVER TREE & KPI ISOLATION
# The analytical core: decompose the financials, then isolate the ≤3 KPIs that actually
# move the thesis and are genuinely contested. These are the monitor's front-running set.

### Driver tree
# Decompose the financial output (revenue / EBIT / FCF) into multiplicative + additive
# operating components, recursively, until each leaf is a real-world observable.
# 4–6 lines. Mark which branch the thesis hinges on.
- <output = component × component + component …>
- <... recurse toward leaf observables …>   ← **thesis hinges here**

### Isolated KPIs (the monitoring set — max 3)
| KPI | Why it's the edge (high weight × contested) | Front-running data source |
|-----|---------------------------------------------|---------------------------|
| <kpi> | <high weight on value AND genuinely debated> | <where it shows up first> |

### Thresholds
- STRENGTHEN (add / upsize): <pre-committed condition>
- BREAK (trim / exit): <pre-committed condition>
- Position rules (entry / size / re-underwrite price): <if applicable>

### Next checkpoint
<earnings date or catalyst that reads the isolated branch — DD Mon YYYY>

### One-line thesis (for investor letter + daily review)
Thesis hinges on <X>; X is currently doing <Y>.

## PRE-REGISTERED SIGNALS
### 🔴 THESIS-BREAK tests (→ SELL/TRIM, no improvisation)
# Each must be a testable condition with an operator + threshold + persistence.
- BREAK-1: <condition with threshold> for <persistence> → <SELL | TRIM to X%>
- BREAK-2: <condition> → <action>
- BREAK-3: <condition> → <action>

### 🟢 THESIS-STRENGTHEN signals (→ ADD)
- STRENGTHEN-1: <condition with threshold> → <ADD to X% | add 1 tranche>
- STRENGTHEN-2: <condition> → <action>

### 💲 PRICE TRIGGERS
- entry / add band:  <e.g. €1,100–1,150>   action: <add tranche>
- trim level:        <e.g. valuation > X>   action: <trim to target>
- hard sell level:   <if any>

## CATALYSTS (sync into catalyst_calendar.md)
- <YYYY-MM[-DD]> | <event> | <HARD|SOFT> | watch: <what would move the thesis>
- <...>

## NOISE FILTER (explicitly ignore)
# Tell the scan what NOT to escalate, to suppress alert fatigue.
- <e.g. sell-side target changes, quarterly print beats/misses within guidance>
- <e.g. intraday price moves that don't cross a registered level>

## MONITORING NOTES
- key_monitor: <the single most important thing to watch — e.g. VantageScore share>
- next_checkpoint: <date/event>
- <free-text context the analyst should carry forward>

## CHANGELOG
- <YYYY-MM-DD>: <thesis event / re-underwrite / signal change>

# -----------------------------------------------------------------------------
# MACHINE BLOCK — keep in sync with the memo above. The scan parses this first.
# Conditions use: metric <op> threshold [for N quarters]. Ops: < <= > >= == !=
# -----------------------------------------------------------------------------
```signals
status: <CORE|STARTER|WATCH|FLAGGED>
cluster_tags: [<tag>, <tag>]
break:
  - id: BREAK-1
    condition: "<metric> < <threshold>"
    persistence: "<e.g. 2 quarters | immediate>"
    action: "<SELL | TRIM to X%>"
  - id: BREAK-2
    condition: "<metric> <op> <threshold>"
    persistence: "immediate"
    action: "<action>"
strengthen:
  - id: STRENGTHEN-1
    condition: "<metric> > <threshold>"
    action: "<ADD ...>"
price:
  add_band: "<low>-<high>"
  trim_above: "<level or valuation rule>"
  hard_sell: "<level or null>"
catalysts:
  - date: "<YYYY-MM[-DD]>"
    event: "<event>"
    type: "<HARD|SOFT>"
    watch: "<trigger>"
key_monitor: "<single most important metric>"
next_checkpoint: "<date/event>"
```
