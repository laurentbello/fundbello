# Holdings — portfolio monitor roster
#
# This table is BOTH human-readable and machine-parseable. The headless runner
# (portfolio_monitor.sh) reads CORE rows where column 2 (weight) is a bare number,
# and uses column 6 (skill path) to find each position's playbook. The Routine-native
# PROMPT.md discovers the same files under positions/.
#
# COLUMNS:  | weight | ticker | name | cluster | skill path |
#   - weight: bare percent number, NO '%' sign (e.g. 5.0). Non-numeric = skipped.
#   - skill path: relative to this directory, e.g. positions/WM.md
#
# To add a holding: copy SKILL.template.md to positions/<TICKER>.md, fill it in,
# then add one row below. To pause a name, blank its weight (or prefix with '#').
# -----------------------------------------------------------------------------

## CORE (monitored every run)

| weight | ticker  | name                  | cluster            | skill                |
|--------|---------|-----------------------|--------------------|----------------------|
| 5.8    | AI.PA   | Air Liquide           | industrial-gases   | positions/AI.md      |
| 5.0    | LIN     | Linde                 | industrial-gases   | positions/LIN.md     |
| 5.0    | DG.PA   | VINCI                 | infra-concession   | positions/VINCI.md   |
| 4.6    | SAF.PA  | Safran                | aerospace          | positions/SAF.md     |
| 3.8    | AENA.MC | Aena                  | infra-concession   | positions/AENA.md    |
| 3.8    | AIR.PA  | Airbus                | aerospace          | positions/AIR.md     |
| 3.8    | SPGI    | S&P Global            | ratings-fin-data   | positions/SPGI.md    |
| 3.5    | CLNX.MC | Cellnex Telecom       | infra-concession   | positions/CLNX.md    |
| 3.5    | ASML    | ASML Holding          | semis-wfe-litho    | positions/ASML.md    |
| 3.0    | FER.MC  | Ferrovial             | infra-concession   | positions/FER.md     |
| 3.0    | MCO     | Moody's               | ratings-fin-data   | positions/MCO.md     |
| 3.0    | LRCX    | Lam Research          | semis-wfe-litho    | positions/LRCX.md    |
| 3.0    | V       | Visa                  | payment-networks   | positions/V.md       |
| 2.3    | MA      | Mastercard            | payment-networks   | positions/MA.md      |
| 1.04   | WM      | Waste Management      | us-industrial-vol  | positions/WM.md      |

## WATCHLIST (non-core; rows have a non-numeric first cell so the runner skips them)
# Move a name up to CORE by giving it a numeric weight and a populated playbook.

| watch | TICKER  | <add candidates here>  | <cluster>          | positions/<TICKER>.md |

# -----------------------------------------------------------------------------
# ROSTER NOTE
# -----------------------------------------------------------------------------
# The 15 rows above are the NAMED holdings with written playbooks (~53.6% of book),
# matching the cluster map's members plus the WM worked example. The full book is
# ~30 positions; the remaining ~14–15 idiosyncratic single names are NOT scaffolded
# here because their tickers/weights were not provided — adding invented names would
# pollute the monitor. To complete the roster: for each real holding, copy
# SKILL.template.md to positions/<TICKER>.md, fill its thesis + anchors + signals,
# and add a CORE row above. The monitor auto-includes every populated playbook.
