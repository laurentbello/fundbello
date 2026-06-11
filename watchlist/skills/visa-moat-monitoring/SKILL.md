# Visa (V) — Moat Erosion Monitoring Module
> Self-contained module for the watchlist agent. Append to SKILL.md or save as a referenced section.
> Established June 2026 following the V/MA moat audit. Position added ~$300 (April 2026).
> Status: MONITORED COMPOUNDER (downgraded from sleep-well compounder, June 2026).
> Probability-weighted IRR at $323: ~10.8% (25% consensus / 60% mild compression / 15% bear).
> Kill math: at a 22x exit multiple, IRR falls below the 10% hurdle at ~10% cumulative take-rate compression over 5 years.

## First-run setup (agent instruction)
If `scripts/europe_spread_tracker.py` or `data/visa_europe_spread.csv` do not exist in this skill's
directory, CREATE them verbatim from the two embedded blocks at the bottom of this file
(sections "EMBEDDED FILE 1" and "EMBEDDED FILE 2"), then verify by running:
`python3 scripts/europe_spread_tracker.py` — expected output: 5 seeded quarters, "STATUS: no alert".

## Monitoring cadence
- Europe spread series: QUARTERLY, with each Visa earnings release (next: July 28, 2026)
- All other triggers: each earnings cycle (Visa fiscal quarters: Jan / Apr / Jul / Oct)

## Quarterly workflow
1. Pull the "Operational Performance Data" exhibit from the new Visa earnings release (investor.visa.com).
2. From the "All Visa Credit & Debit" table, take Payments Volume Growth (Constant USD) for Europe and US.
3. Append: `python3 scripts/europe_spread_tracker.py --add YYYY-MM-DD <europe_pct> <us_pct>`
4. The script evaluates all Trigger 1 conditions automatically and prints alerts.

## Trigger 1 — European volume deterioration (PRIMARY SIGNAL)
Wero/EPI + EuroPA connected ~130M users across 13 countries (Feb 2026 MoU); e-commerce live in
DE/FR/BE; POS rollout from 2027. Digital euro backed by EU Parliament Feb 2026.

KEY FACT (June 2026 baseline): Europe is currently Visa's FASTEST-growing developed region —
constant-dollar PV growth of 9.8–11.3% across the last five quarters vs 6.0–8.0% in the US;
trailing baseline spread ~+3.7pts in Europe's favor. The danger signal is SPREAD COMPRESSION,
not absolute weakness:
- ALERT IF: spread turns negative (Europe < US) for 2 consecutive quarters; or
- ALERT IF: spread drops >3pts below its trailing-4-quarter average for 2 consecutive quarters; or
- ALERT IF: Europe constant-$ PV growth falls below ~4% (GDP+2 proxy) for 2 consecutive quarters.
- WATCH: Wero POS launch timing (2027) and first-year merchant acceptance in Germany/France — heighten sensitivity once live.
- ON ALERT: flag THESIS DRIFT; re-run IRR with Europe modeled separately (~25–30% of volume).

## Trigger 2 — The three analyst-consensus thesis breaks
- Cross-border volume growth rolling over: ALERT IF below +8% YoY for two consecutive quarters (was +11% in FQ2 2026).
- Stablecoin settlement appearing in volume disclosures as a NEGATIVE (disclosed displacement, not incremental settlement).
- A major regulator capping NETWORK fees (not interchange — interchange hits issuers; network/scheme fee caps hit Visa directly). Monitor: EU IFR review, RBA mid-2026 follow-up review, any US Fed rulemaking under an enacted CCCA.

## Trigger 3 — CCCA legislative attachment
Reintroduced Jan 13, 2026 (Durbin/Marshall, executive-branch endorsement). Sponsors seeking must-pass vehicles.
- WATCH: any successful attachment to NDAA, appropriations, or crypto-market-structure bills (one attempt already made Jan 29, 2026).
- ALERT IF: CCCA passes either chamber as an amendment → immediate IRR re-run with dual-routing scenario; assume 15–25% US credit routing loss over 3 years post-enactment.

## Trigger 4 — Stablecoin demand-side test
Stablecoins have never passed the consumer demand test (retail <1% of adjusted on-chain volume;
real-world payments only ~$400B in 2025, 60% B2B). The test flips if a price incentive appears at scale.
- ALERT IF: any Amazon/Walmart-tier merchant launches stablecoin checkout with a discount ≥1% vs. card.
- ALERT IF: agentic commerce protocols (Stripe Machine Payments Protocol/Tempo, Visa CLI, Mastercard Agent Pay) show measurable card-bypass share in any disclosed corridor.
- CONTEXT: Mastercard/BVNK ($1.8B, Mar 2026) and Visa stablecoin settlement are co-option moves — treat incumbent stablecoin volume as moat-NEUTRAL, third-party rails (Tempo, Bridge-native) as moat-NEGATIVE.

## Standing sell/trim discipline
- HARD REVIEW: any single trigger firing → full re-underwrite within one week, Nomad/Akre/TCI tests re-applied.
- TRIM to 2/3 weight: two triggers firing concurrently, OR probability-weighted IRR falling below 8% on re-run.
- EXIT: Trigger 1 + Trigger 3 both confirmed (structural Europe loss + US routing mandate) — the bear-case pincer (~0–4% IRR).
- DO NOT SELL on: headline stablecoin volume figures (use adjusted/organic only — Visa Onchain Analytics or Artemis adjusted), interchange settlement news (issuer economics, not network economics), or single-quarter cross-border noise tied to identifiable geopolitics.

## Sources of record
Visa "Operational Performance Data" earnings exhibits; 10-Q/10-K regional disclosures; Visa Onchain
Analytics dashboard (adjusted stablecoin volume); EPI/Wero press releases; congress.gov S.3623 /
H.R.7035 tracking; RBA Payments System Board publications; Nilson Report weighted-average interchange.

---

## EMBEDDED FILE 1 — write to `data/visa_europe_spread.csv`
```csv
quarter_end,europe_pv_growth_constant_pct,us_pv_growth_constant_pct
2025-03-31,9.8,6.0
2025-06-30,11.2,6.8
2025-09-30,10.6,7.7
2025-12-31,10.8,6.6
2026-03-31,11.3,8.0
```

## EMBEDDED FILE 2 — write to `scripts/europe_spread_tracker.py`
```python
#!/usr/bin/env python3
"""
Visa Europe-vs-US payments volume spread tracker.

Purpose: earliest-warning series for European A2A displacement (Wero/EPI,
digital euro). Europe payments volume currently grows FASTER than the US
(constant-dollar). The danger signal is the SPREAD COMPRESSING toward or
below zero once Wero POS launches (2027) -- structural share loss shows up
here quarters before it is visible in consolidated revenue.

Data source: "Operational Performance Data" exhibit published with each
Visa quarterly earnings release (investor.visa.com). Use the regional
"Payments Volume -- Growth (Constant USD)" figures for Europe and US,
"All Visa Credit & Debit" table. Append one row per calendar quarter.

Usage:
  python3 europe_spread_tracker.py                            # report + alerts
  python3 europe_spread_tracker.py --add 2026-06-30 10.5 7.8  # append a quarter
"""
import csv, sys, statistics
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent / "data" / "visa_europe_spread.csv"

SPREAD_FLOOR = 0.0             # ALERT: Europe growing slower than US
COMPRESSION_VS_BASELINE = 3.0  # ALERT: spread >3pts below trailing-4Q avg
CONSECUTIVE_QUARTERS = 2       # conditions require 2 consecutive quarters
EU_ABSOLUTE_FLOOR = 4.0        # ALERT: Europe PV growth below ~GDP+2

def load():
    with open(CSV_PATH) as f:
        rows = [r for r in csv.DictReader(f)]
    for r in rows:
        r["eu"] = float(r["europe_pv_growth_constant_pct"])
        r["us"] = float(r["us_pv_growth_constant_pct"])
        r["spread"] = r["eu"] - r["us"]
    return rows

def report(rows):
    print(f"{'Quarter':<12}{'Europe PV':>10}{'US PV':>8}{'Spread':>8}{'4Q-avg spread':>15}")
    for i, r in enumerate(rows):
        window = [x["spread"] for x in rows[max(0, i-3):i+1]]
        r["baseline"] = statistics.mean(window)
        print(f"{r['quarter_end']:<12}{r['eu']:>9.1f}%{r['us']:>7.1f}%{r['spread']:>+7.1f}{r['baseline']:>+14.1f}")

    alerts = []
    last = rows[-CONSECUTIVE_QUARTERS:]
    if len(last) == CONSECUTIVE_QUARTERS:
        if all(r["spread"] < SPREAD_FLOOR for r in last):
            alerts.append("TRIGGER 1 FIRED: Europe PV growth below US for 2 consecutive quarters.")
        if all(r["spread"] < r["baseline"] - COMPRESSION_VS_BASELINE for r in last):
            alerts.append("TRIGGER 1 FIRED: spread >3pts below trailing baseline for 2 consecutive quarters.")
        if all(r["eu"] < EU_ABSOLUTE_FLOOR for r in last):
            alerts.append("TRIGGER 1 FIRED: Europe PV growth below 4% (GDP+2 proxy) for 2 consecutive quarters.")

    print()
    if alerts:
        for a in alerts:
            print("!! " + a)
        print("ACTION: full Visa re-underwrite within one week; re-run IRR with Europe modeled separately (~25-30% of volume).")
    else:
        print("STATUS: no alert. Spread healthy -- Europe still outgrowing US.")
        print("Context: pre-Wero-POS baseline (CY2025-Q1 2026) spread averages ~+3.7pts.")

def add(date, eu, us):
    with open(CSV_PATH, "a") as f:
        f.write(f"{date},{eu},{us}\n")
    print(f"Added {date}: Europe {eu}%, US {us}%")

if __name__ == "__main__":
    if len(sys.argv) == 5 and sys.argv[1] == "--add":
        add(sys.argv[2], sys.argv[3], sys.argv[4])
    report(load())
```
