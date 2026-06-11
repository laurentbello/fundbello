/**
 * Pulls fund holdings from the Google Sheet and regenerates
 * src/data/holdings.json. The site only ever displays each fund's most
 * recent snapshot; older snapshots are kept so quarter-over-quarter
 * change and the portfolio trend can be computed.
 *
 * Usage:  npm run sync-data
 *         npm run sync-data -- path/to/export.csv   (parse a local CSV instead)
 *
 * The sheet must be shared as "Anyone with the link can view" for the
 * CSV export endpoint to work without credentials.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SHEET_ID = "1cMno13PITLQpnIyl7fCKT436nDSC26X51fGdMur9eGI";
const GID = "0";
const URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "holdings.json",
);

/** Minimal CSV parser handling quoted fields with commas and newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

const MONTHS = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function toNumber(s) {
  const t = (s ?? "").replace(/[$,%\s]/g, "");
  if (t === "" || t === "-") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/** "30-Dec-25" -> "2025-12-30" */
function toIsoDate(s) {
  const m = (s ?? "").trim().match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2})$/);
  if (!m || !MONTHS[m[2]]) return null;
  return `20${m[3]}-${String(MONTHS[m[2]]).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

let csv;
const localPath = process.argv[2];
if (localPath) {
  csv = readFileSync(localPath, "utf8");
} else {
  const res = await fetch(URL, { redirect: "follow" });
  if (!res.ok) {
    console.error(
      `Failed to fetch sheet (HTTP ${res.status}). ` +
        "Make sure the sheet is shared as 'Anyone with the link can view'.",
    );
    process.exit(1);
  }
  csv = await res.text();
}
const rows = parseCsv(csv);

const header = rows[0].map((h) => h.trim().toLowerCase());
const col = (name) => header.findIndex((h) => h.startsWith(name));
const idx = {
  ticker: col("name"),
  company: col("ticker"),
  valueMM: col("reported value"),
  weightPct: col("this holding"),
  shares: col("# shares held"),
  sharesChange: col("change in #"),
  sharesChangePct: col("% change"),
  pctOutstanding: col("% of shares outstanding"),
  holdingsDate: col("holdings date"),
  filingType: col("filing type"),
  fund: col("fund name"),
  snapshot: col("snapshot date"),
};
const missing = Object.entries(idx).filter(([, i]) => i === -1);
if (missing.length) {
  console.error(
    `Sheet header changed; could not locate columns: ${missing.map(([k]) => k).join(", ")}`,
  );
  process.exit(1);
}

const records = [];
for (const r of rows.slice(1)) {
  const fund = (r[idx.fund] ?? "").trim();
  const snapshot = toIsoDate(r[idx.snapshot]);
  if (!/Investments$/.test(fund) || !snapshot) continue;
  // Dual-ticker cells (e.g. "PRM\nPRMB" after a symbol change) keep the
  // current symbol, which is listed last.
  const ticker = (r[idx.ticker] ?? "").trim().split(/\s+/).pop() ?? "";
  if (!ticker) continue;
  records.push({
    ticker,
    company: (r[idx.company] ?? "").trim(),
    valueMM: toNumber(r[idx.valueMM]),
    weightPct: toNumber(r[idx.weightPct]),
    shares: toNumber(r[idx.shares]),
    sharesChange: toNumber(r[idx.sharesChange]),
    sharesChangePct: toNumber(r[idx.sharesChangePct]),
    pctOutstanding: toNumber(r[idx.pctOutstanding]),
    holdingsDate: (r[idx.holdingsDate] ?? "").trim(),
    filingType: (r[idx.filingType] ?? "").trim(),
    fund: fund.replace(/ Investments$/, ""),
    snapshot,
  });
}

if (records.length === 0) {
  console.error("No holdings rows found — refusing to overwrite holdings.json");
  process.exit(1);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(records, null, 2) + "\n");

const funds = new Map();
for (const r of records) {
  funds.set(r.fund, (funds.get(r.fund) ?? new Set()).add(r.snapshot));
}
console.log(`Wrote ${records.length} rows to src/data/holdings.json`);
for (const [fund, snaps] of funds) {
  console.log(`  ${fund}: ${[...snaps].sort().join(", ")}`);
}
