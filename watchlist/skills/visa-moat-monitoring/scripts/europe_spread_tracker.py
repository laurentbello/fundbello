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
