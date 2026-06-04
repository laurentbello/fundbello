---
name: sell-checklist
description: >-
  Populate the "Sell Checklist" Google Sheet for a stock the user is thinking
  about selling. Copies the "Sell Template" tab, renames it to the ticker, and
  fills in the table (market data + the qualitative sell-discipline checklist).
  Use when the user says things like "I'm looking at selling NVO", "fill the
  sell checklist for X", "run the sell template for <ticker>", or "should I sell
  <company>".
---

# Sell Checklist

Fills out the sell-discipline worksheet the user keeps for every position they
consider trimming or exiting. The goal is to force an *investing* decision, not
a *trading* one — so the checklist deliberately gathers facts (fundamentals,
who else owns it, valuation, value creation) before any conclusion.

## Where everything lives

- **Spreadsheet:** `Sell Checklist` (Google Drive)
  - File ID: `1A5lDRpfB8QaSG2OYh08OCd0CMXV2maUAnGI-mGhnbUo`
  - URL: https://docs.google.com/spreadsheets/d/1A5lDRpfB8QaSG2OYh08OCd0CMXV2maUAnGI-mGhnbUo/edit
- **Template tab:** `Sell Template` — never edit this; it's the master.
- **One tab per stock**, named after the ticker (`NVO`, `BN`, `MSFT`, `CPNG`, …).

## Inputs

- **Required:** the ticker (e.g. `NVO`). If the user gave a company name,
  resolve it to a ticker and confirm.
- **Optional (ask if not given):**
  - *Source of idea to sell* — what prompted this (e.g. "Dan said Fundsmith are going to sell it").
  - *Why did I own the stock* — original thesis / who you followed in (e.g. "Fundsmith").

Only the ticker is strictly needed to start; gather the rest as you go.

## Tooling note — how "copy + populate" actually happens

**Preferred — the Google Sheets MCP server (`google-sheets`, see
[.mcp.json](../../../.mcp.json) and [docs/google-sheets-mcp-setup.md](../../../docs/google-sheets-mcp-setup.md)).**
When its tools are available you can do the whole thing directly, no paste:

1. `copy_sheet` — duplicate the `Sell Template` tab into the same spreadsheet.
2. `rename_sheet` — rename the copy to the ticker (e.g. `NVO`).
3. `batch_update_cells` (or `update_cells`) — write the values into the cells
   per the field map below. Use `get_sheet_data`/`list_sheets` first to confirm
   the live layout and that the ticker tab doesn't already exist.

Spreadsheet id: `1A5lDRpfB8QaSG2OYh08OCd0CMXV2maUAnGI-mGhnbUo`. Writing literal
`Yes`/`No` into the dropdown cells keeps the data validation intact.

**Fallback — copy/paste (use only if the `google-sheets` tools are NOT loaded,
i.e. the integration isn't authenticated yet).**

1. Build a fully-populated, **tab-separated (TSV)** grid mirroring the template.
2. Tell the user to duplicate the `Sell Template` tab → rename it to the ticker.
3. Tell them to select `A1` of the new tab and paste the TSV. TSV keeps the
   comma-containing numbers (e.g. `143,374,098,000`) inside single cells, and
   pasting over the duplicated template preserves dropdowns and formatting.

Detect which path applies by checking whether the `google-sheets` MCP tools are
present; prefer the direct path whenever they are.

## Procedure

### 1. Confirm the ticker and resolve basics
- Confirm ticker + company long name + listing currency.
- If a tab for this ticker already exists, ask whether to refresh it or create
  a dated copy — don't silently overwrite prior analysis.

### 2. Gather market data (top block)
Use web search/fetch for current figures. Use **today's date** for the `Date`
cell. Fields (header → what to fetch):

| Field | Meaning |
| --- | --- |
| `Price` | Latest share price |
| `marketcap` | Market capitalisation (full number, with thousands separators) |
| `volumeavg` | Average daily share volume |
| `Amount Vol` | Average daily **dollar** volume (price × avg volume) |
| `pe` | Trailing P/E |
| `eps` | Trailing EPS |
| `high52` | 52-week high |
| `low52` | 52-week low |
| `currency` | Quote currency (e.g. USD) |
| `% change 3yr` | Price return over 3 years |
| `% change 5yr` | Price return over 5 years |
| `% change 10yr` | Price return over 10 years |

**Historical closes** — three `Date / Close` pairs. Take the lookback dates ~3,
~5 and ~10 years before today (nearest trading day) and fetch the closing price
on each. These anchor the % change figures, so keep them consistent.

If a figure genuinely isn't available (e.g. a young IPO with no 10yr history),
leave it blank or `na` rather than guessing — that's how the existing tabs
handle it (see `CPNG`).

### 3. Gather the qualitative checklist
Ask the user for the judgement calls; research what you can. Rows:

- **Source of idea to sell** — free text (from inputs).
- **Why did I own the stock** — free text (from inputs).
- **Shareholders** (section header)
  - **Look at Activity on Dataroma** — what super-investors are doing (buying/selling). https://www.dataroma.com
  - **Look at Tikr** — anything notable, else `na`.
  - **Reputable investors with good track record?** — `Yes`/`No`.
  - **Look at fund buying behavior** — `Yes`/`No`.
  - **Insider buying (less relevant)** — `Yes`/`No`.
- **Valuation (use tikr valuation tab)** (section header)
  - **Current valuation vs past** — free text.
  - **Current valuation vs competitors** — free text / `na`.
  - **Over/undervalued** — free text / `na`.
  - **Morningstar valuation** — fair value / star rating if known.
  - **Analyst Ratings** — e.g. "36% upside".
  - **Look at chart** — leave the note "for trend IBKR".
- **Ex div date** / **Next earnings call** — dates if known.
- **Historical value creation** (section header)
  - **Has the firm steadily created value over time** — `Yes`/`No`.
  - **Annalised return since IPO** — `Return`, the total %, `years`, `IPO`,
    the IPO date, the # of years, and the annualised %.
- **Conclusion** — the user's call (e.g. "selling 25% today", "this was a big
  mistake"). This is the user's decision — prompt for it, don't invent it.

### 4. Surface the sell-discipline guardrails
Before recording a conclusion, remind the user of **what is NOT a sell reason
(ever)** — if the conclusion rests only on these, they're *trading, not
investing*:

- Stock "feels expensive"
- Underperforming for < 18 months
- Macro fears
- Headlines
- Peer price action
- Analyst downgrades

### 5. Write the tab
- **If the `google-sheets` MCP tools are available:** `copy_sheet` the
  `Sell Template` tab, `rename_sheet` to the ticker, then `batch_update_cells`
  with the values per the layout below. Confirm the result and link the tab.
- **Otherwise:** produce the populated grid as TSV matching the layout below and
  give the user the duplicate-rename-paste steps (paste at `A1`).

## Template layout reference (for building the TSV)

Column letters for the data block, row = a sheet row:

- **Row 1:** `A=Date`, `B=<today>`
- **Header row:** `A=Name  B=<company>  C=Price  D=marketcap  E=volumeavg
  F=Amount Vol  G=pe  H=eps  I=high52  J=low52  K=currency  L=% change 3yr
  M=% change 5yr  N=% change 10yr`
- **Values row:** `A=Ticker  B=<ticker>  C..N = the figures above`
- **Historical closes:** three `Date | Close` pairs laid out across columns
  `A:B`, `D:E`, `G:H` (label row then value row).
- **Qualitative rows:** label in column `A`, value in column `C` (free-text
  answers), except:
  - `Look at chart` → note `for trend IBKR` in column `C`.
  - `Ex div date` (A) and `Next earnings call` (around column `F`) on one row.
  - `Annalised return since IPO`: `C=Return`, then total %, `years`, `IPO`,
    IPO date, # years, annualised % across the following columns.
- **Conclusion** row: label in `A`, the decision in `C`.

The Yes/No cells (`Reputable investors…`, `fund buying behavior`,
`Insider buying`, `Has the firm steadily created value…`) are dropdowns in the
template — pasting the literal word over the duplicated tab keeps the dropdown.

### Worked example — the `NVO` tab (already filled)
This is the shape of a finished tab, for reference:

- Date `19-Nov-2025`
- `Name=Novo Nordisk A/S, Ticker=NVO, Price=42, marketcap=143,374,098,000,
  volumeavg=16,332,891, Amount Vol=685,981,422, pe=9.85, eps=4.27,
  high52=81.44, low52=35.12, currency=USD, 3yr=-26%, 5yr=24%, 10yr=57%`
- Closes: `21-Nov-2022 → 56.71`, `20-Nov-2020 → 33.8`, `23-Nov-2015 → 26.74`
- Source of idea to sell: "Dan said fundsmith are going to sell it"
- Why owned: "Fundsmith"

## Notes
- Never modify the `Sell Template` master tab.
- Keep the three historical close dates internally consistent with the 3/5/10yr
  return figures.
- The conclusion and the Yes/No judgement calls belong to the user — gather and
  present the evidence, then ask; don't fabricate the verdict.
