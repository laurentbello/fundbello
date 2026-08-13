# Last monitor run
# The monitor reads the most recent date here to set its lookback window ("developments
# since <date>"), then overwrites this file at the end of each run. Seeded below so the
# first run looks back a sensible window instead of all-time.
last_run: 2026-08-13
mode: weekly
verdicts: 15
digest: portfolio/out/digest.json (9 ALERT(S): STRENGTHEN signals fired on AI.PA, LIN [contested BREAK-2], SAF.PA, SPGI, CLNX.MC, FER.MC, V, MA, WM [not executed, price discipline]; no URGENT; no cluster break tripped; every CORE holding reported Q2/H1 earnings inside the ~6-week lookback (prior run's send had failed on missing SMTP env vars))
