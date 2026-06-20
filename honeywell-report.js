const { H1, H2, P, bullet, leadBullet, hr, moatBox, table, cover, disclaimer, makeDoc, save,
        AlignmentType, GREEN, RED, NAVY, BLUE } = require('./lib.js');

const R = AlignmentType.RIGHT, C = AlignmentType.CENTER;
const LIGHT = "D9E2F3";
function row(cells, widths, opts = {}) {
  return cells.map((t, i) => ({ t: String(t), w: widths[i], ...(opts[i] || {}) }));
}

const children = [];

// ---------------------------------------------------------------- COVER --------
cover(children, {
  name: "Honeywell International Inc.",
  sub: "Nasdaq: HON  ·  Diversified Industrials · Aerospace · Automation  ·  United States",
  snapshotRows: [
    ["Metric", "Value", "Note"],
    ["Share price", "~US$214", "early Jun 2026"],
    ["Market cap", "~US$136 bn", "large-cap industrial"],
    ["FY2025 revenue", "US$37.4 bn", "post-Solstice spin"],
    ["FY2025 adj. EPS", "US$9.78", "+12% YoY"],
    ["Q1'26 revenue", "US$9.14 bn", "adj. EPS $2.45 (beat)"],
    ["2026 adj. EPS guide", "US$10.35–10.65", "+6–9%"],
    ["Aerospace spin-off", "Q3 2026", "final split step"],
    ["P/E (trailing)", "~30x", "—"],
  ],
  preparedFor: "Prepared for: laurentbello@gmail.com  ·  IWP Portfolio Research",
});

// ----------------------------------------------------- EXECUTIVE SUMMARY --------
children.push(H1("1. Executive Summary"));
children.push(P("Honeywell is mid-way through the most consequential restructuring in its modern history: the breakup of a 120-year-old industrial conglomerate into three independent, focused public companies. The first step is already done — Solstice Advanced Materials (Nasdaq: SOLS) was spun off on 30 October 2025. The decisive second step — separating Aerospace from the Automation businesses — is on track for the third quarter of 2026, leaving a pure-play automation 'Honeywell' and a standalone Honeywell Aerospace with over $17 billion of annual revenue."));
children.push(P("The underlying businesses are performing well. FY2025 adjusted EPS reached $9.78 (+12% YoY) on $37.4 billion of revenue, and Q1 2026 delivered $2.45 of adjusted EPS (a beat) with segment-margin expansion across all four segments and consolidated segment margin up 90 bps to 23.3%. Management guides 2026 adjusted EPS to $10.35–$10.65 (+6–9%). The investment case is therefore a classic sum-of-the-parts value-unlock story layered on a high-quality, wide-moat industrial portfolio."));
children.push(leadBullet("Bull case", "A breakup that lets a high-multiple, wide-moat Aerospace pure-play and a focused Automation company each re-rate toward best-in-class peers, unlocking conglomerate-discount value with steady margin expansion underneath."));
children.push(leadBullet("Bear case", "Separation dis-synergies and stranded costs, industrial-cycle and aerospace supply-chain exposure, and the risk that the standalone parts re-rate less than hoped while the ~30x multiple already prices in much of the optimism."));
children.push(leadBullet("Our read", "High-quality assets and a credible catalyst (the Q3 2026 Aerospace spin). The franchises are excellent; the question is how much of the sum-of-the-parts upside is already in the price and how cleanly the separation executes."));
children.push(hr());

// ----------------------------------------------------- BUSINESS OVERVIEW -------
children.push(H1("2. Business Overview & The Breakup"));
children.push(P("Honeywell today operates as a diversified industrial across four segments, but it is deliberately deconstructing itself into three independent companies. Understanding the target structure is essential to the thesis."));
children.push(leadBullet("Step 1 — Solstice Advanced Materials (DONE)", "The Advanced Materials business was spun off on 30 October 2025 as Solstice (Nasdaq: SOLS), distributed at one SOLS share per four HON shares. This sharpened Honeywell toward its core automation and aerospace franchises."));
children.push(leadBullet("Step 2 — Honeywell Aerospace (Q3 2026)", "Aerospace Technologies — engines, avionics, auxiliary power and a large, high-margin aftermarket — is to be spun into a standalone public company with >$17 bn of revenue, one of the largest pure-play aerospace suppliers. This is the central value-unlock catalyst."));
children.push(leadBullet("Step 3 — Honeywell (Automation RemainCo)", "What remains is a focused automation company spanning Building Automation, Industrial Automation and Process/Energy automation — software-rich, installed-base-driven businesses with recurring aftermarket and service revenue."));
children.push(P("The four current operating segments — Aerospace Technologies, Building Automation, Industrial Automation, and Process Automation & Technology — all expanded margins in Q1 2026, evidence that the portfolio is being separated from a position of operating strength rather than weakness.", { italics: true }));
children.push(hr());

// -------------------------------------------------- FINANCIAL PERFORMANCE ------
children.push(H1("3. Financial Performance"));
children.push(H2("3.1 Full-year 2025"));
{
  const w = [3000, 1800, 1800, 1800];
  const rows = [
    row(["Metric", "FY2024", "FY2025", "YoY"], w, {1:{align:C},2:{align:C},3:{align:C}}),
    row(["Revenue", "~$38.5 bn", "$37.4 bn", "post-spin*"], w, {1:{align:R},2:{align:R},3:{align:R}}),
    row(["Adjusted EPS", "$8.71", "$9.78", "+12%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Segment margin", "~23%", "expanding", "+bps"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN}}),
  ];
  children.push(table(rows, w));
}
children.push(P("*FY2025 revenue reflects the late-October Solstice spin-off, so the year-over-year comparison is not like-for-like. Adjusted EPS of $9.78 (+12%) is the cleaner read on underlying earnings power.", { italics: true, size: 18 }));
children.push(P(""));
children.push(H2("3.2 Q1 2026 — margin expansion across the board"));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Q1 2026", "Change / note"], w, {1:{align:C},2:{align:C}}),
    row(["Revenue", "$9.14 bn", "slightly below est."], w, {1:{align:R,bold:true},2:{align:R}}),
    row(["Adjusted EPS", "$2.45", "beat ($2.32 est.)"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Segment margin", "23.3%", "+90 bps; all 4 segments"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Aerospace sales", "$4.32 bn", "+4% (+3% organic)"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Aerospace margin", "26.5%", "high-margin aftermarket"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Process Auto. margin", "23.7%", "+200 bps (productivity)"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The quarter showed the quality of the franchises: an EPS beat and margin expansion in every segment, even as top-line came in modestly light (partly a transitory Middle East impact on Process Automation). Management's 2026 guide — sales of $38.8–$39.8 bn (3–6% organic) and adjusted EPS of $10.35–$10.65 — frames a steady mid-single-digit growth profile heading into the Aerospace separation.", { italics: true }));
children.push(hr());

// --------------------------------------------------------- THE MOAT ------------
children.push(H1("4. Competitive Moat"));
children.push(P("Honeywell's moats are the classic industrial kind: certified, mission-critical products with long lifecycles, large installed bases, high switching costs, and recurring aftermarket and service revenue. They are strongest in Aerospace and meaningful across the automation portfolio."));
children.push(leadBullet("Aerospace — razor-and-blade", "Engines, avionics and APUs are certified onto aircraft platforms for decades, generating a high-margin, multi-decade aftermarket (spares, repairs, upgrades). Switching is effectively impossible mid-platform — a genuinely wide moat, reflected in the 26.5% Q1'26 segment margin."));
children.push(leadBullet("Automation installed base", "Building and industrial control systems, sensors and software embed into customer operations; rip-and-replace is costly and risky, producing sticky aftermarket and recurring software/service revenue."));
children.push(leadBullet("Brand, scale & regulation", "A century-old brand, global scale, deep regulatory/certification know-how, and an expanding software layer (Honeywell Forge, Connected Enterprise) reinforce pricing power and customer retention."));
children.push(leadBullet("But — cyclicality & competition", "The automation businesses face capable rivals (Emerson, Siemens, Schneider, Rockwell) and short-cycle industrial demand swings; aerospace carries supply-chain and OEM-build-rate exposure."));
children.push(moatBox("8", "A high-quality, wide-moat industrial portfolio — exceptionally durable in Aerospace (certification lock-in, multi-decade aftermarket) and solid across automation (installed base, switching costs, recurring software/service), tempered by industrial cyclicality and capable competition."));
children.push(P("Why an 8 and not higher? Aerospace alone would rate a 9 on certification and aftermarket lock-in, but the broader automation portfolio competes against strong, well-capitalised peers in more cyclical, shorter-cycle end markets. The breakup is in part an acknowledgement that the parts are worth more — and arguably more defensible — focused than bundled."));
children.push(hr());

// ----------------------------------------------------------- GROWTH DRIVERS ----
children.push(H1("5. Growth Drivers & Value Unlock"));
children.push(leadBullet("Aerospace spin-off (Q3 2026)", "The single biggest catalyst: a >$17 bn-revenue pure-play aerospace supplier can re-rate toward best-in-class aerospace multiples (GE Aerospace, TransDigm, RTX trade at premiums), unlocking value trapped in the conglomerate."));
children.push(leadBullet("Aftermarket & build-rate recovery", "Commercial aerospace aftermarket strength and recovering OEM build rates support durable, high-margin Aerospace growth into the separation."));
children.push(leadBullet("Automation margin expansion", "Productivity actions and a richer software/recurring mix are expanding automation margins (e.g. Process Automation +200 bps in Q1'26), lifting the RemainCo's earnings quality."));
children.push(leadBullet("Software & digitalisation", "Honeywell Forge and Connected Enterprise add recurring, higher-margin software revenue across both Aerospace and Automation."));
children.push(leadBullet("Capital allocation", "A focused RemainCo and a standalone Aerospace can each pursue tailored M&A, buybacks and dividend policies, improving capital efficiency versus the diversified parent."));
children.push(hr());

// --------------------------------------------------------------- VALUATION -----
children.push(H1("6. Valuation"));
children.push(P("Honeywell trades at a high-quality-industrial multiple, and the bull case rests on the sum of the standalone parts being worth more than the current consolidated entity. The breakup is explicitly designed to close that conglomerate discount."));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Approx.", "Comment"], w, {1:{align:C}}),
    row(["Market cap", "~$136 bn", "large-cap industrial"], w, {1:{align:R,bold:true}}),
    row(["Share price", "~$214", "below 52-wk high (~$248)"], w, {1:{align:R}}),
    row(["P/E (trailing)", "~30x", "quality-industrial multiple"], w, {1:{align:R}}),
    row(["P/E (fwd, '26 guide)", "~20–21x", "on $10.35–10.65 EPS"], w, {1:{align:R}}),
    row(["FY2025 adj. EPS", "$9.78", "+12% YoY"], w, {1:{align:R,color:GREEN,bold:true}}),
    row(["2026 EPS growth", "+6–9%", "guided"], w, {1:{align:R,color:GREEN,bold:true}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(leadBullet("The bull framing", "On 2026 guided EPS the forward multiple (~20–21x) is reasonable for the quality, and a successful Aerospace spin could see the pieces re-rate to premium pure-play multiples — a sum-of-the-parts well above the current price."));
children.push(leadBullet("The bear framing", "Much of the breakup optimism may already be in the stock; stranded costs and dis-synergies could erode the theoretical SOTP, and an industrial or aerospace-supply-chain downturn would pressure earnings into the separation."));
children.push(hr());

// ----------------------------------------------- PRICE TARGET & SCENARIOS ------
children.push(H1("7. Price Target & Scenario Analysis"));
children.push(P("We frame three illustrative, probability-weighted outcomes anchored to the ~$214 spot price. The dominant variable is how cleanly the Q3 2026 Aerospace separation executes and how the standalone parts are valued by the market."));
{
  const w = [1700, 1300, 1500, 1500, 1400];
  const rows = [
    row(["Scenario", "Prob.", "Core assumption", "12–18m target", "vs spot"], w, {1:{align:C},3:{align:C},4:{align:C}}),
    row(["Bull", "35%", "Clean spin; parts re-rate to premium peers; margins expand", "$260", "+22%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN,bold:true}}),
    row(["Base", "45%", "Spin completes; modest value unlock; mid-single-digit growth", "$235", "+10%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN}}),
    row(["Bear", "20%", "Dis-synergies / industrial slowdown; limited re-rating", "$185", "-14%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:RED,bold:true}}),
    row(["Weighted", "100%", "Probability-weighted expected value", "$234", "+9%"], w,
        {0:{bold:true,fill:LIGHT},1:{align:C,bold:true,fill:LIGHT},2:{bold:true,fill:LIGHT},3:{align:R,bold:true,fill:LIGHT},4:{align:R,bold:true,fill:LIGHT}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The probability-weighted target sits ~9% above spot with a moderately favourable skew: the breakup provides a defined, near-term catalyst and the downside is cushioned by genuinely high-quality, cash-generative franchises. This is a quality-industrial special-situation where execution of the separation, not the underlying business, is the swing factor.", { italics: true }));
children.push(leadBullet("Bull triggers", "On-time, clean Aerospace spin; standalone Aerospace valued at pure-play premium; automation margin expansion continues; aftermarket strength persists."));
children.push(leadBullet("Bear triggers", "Spin delay or dis-synergies; industrial/short-cycle downturn; aerospace supply-chain or build-rate setbacks; the parts re-rate less than the SOTP implies."));
children.push(hr());

// ------------------------------------------------------------------ RISKS ------
children.push(H1("8. Key Risks"));
children.push(leadBullet("Separation execution", "The Q3 2026 Aerospace spin is complex; delays, stranded costs and dis-synergies could erode the theoretical sum-of-the-parts value."));
children.push(leadBullet("Industrial cyclicality", "The automation businesses are exposed to short-cycle industrial demand, capex cycles and macro slowdowns."));
children.push(leadBullet("Aerospace supply chain & build rates", "Aerospace earnings depend on OEM build rates and a supply chain that has been volatile; disruptions would pressure the segment's growth."));
children.push(leadBullet("Geopolitical / regional", "Conflict-driven slowdowns (e.g. the transitory Middle East impact on Process Automation in Q1'26) and broader geopolitical risk affect demand and timing."));
children.push(leadBullet("Valuation / expectations", "At ~30x trailing earnings, a good deal of breakup optimism may be priced in; disappointment on the re-rating could cap upside."));
children.push(leadBullet("Competition", "Capable, well-funded rivals (Emerson, Siemens, Schneider, Rockwell in automation; RTX, GE, Safran in aerospace) pressure share and pricing."));
children.push(hr());

// -------------------------------------------------------- INVESTMENT VIEW ------
children.push(H1("9. Investment View"));
children.push(P("Honeywell is a high-quality, wide-moat industrial in the final act of a value-creating transformation. With Solstice already spun off and the Aerospace separation slated for Q3 2026, the company is converting a diversified conglomerate into focused, independently valuable pure-plays — a strategy that has historically rewarded shareholders when executed cleanly. The underlying performance supports the move: FY2025 adjusted EPS grew 12%, Q1 2026 beat with margin expansion in all four segments, and 2026 guidance points to continued mid-single-digit earnings growth."));
children.push(P("The debate is about how much of the sum-of-the-parts upside is already in the ~$214 price and how cleanly the separation lands. Aerospace is a genuinely wide-moat franchise that should command a premium pure-play multiple; the automation RemainCo is a solid, software-enriched, installed-base business. The principal risks are execution dis-synergies and industrial/aerospace cyclicality rather than franchise quality."));
children.push(P("Our probability-weighted scenario work (Section 7) implies fair value near $234 — about 9% above the ~$214 spot — with a moderately favourable skew given the defined catalyst and the cash-generative quality of the assets. We would treat Honeywell as a quality-industrial special situation worth owning into the Aerospace spin: hold the high-quality compounder, capture the potential re-rating, and accumulate on cyclical or separation-driven weakness.", { italics: false }));
children.push(leadBullet("Suitable for", "Quality-oriented investors who want a wide-moat industrial with a defined breakup catalyst and are comfortable holding through the separation events."));
children.push(leadBullet("Less suitable for", "Investors wanting a single clean thesis, or those unwilling to bear industrial cyclicality and post-spin complexity (including managing the resulting Aerospace shares)."));
children.push(leadBullet("Watch items", "Aerospace spin timing and terms (Q3 2026); standalone Aerospace and RemainCo valuations/guidance; segment margin trajectory; aerospace aftermarket and build rates; short-cycle automation demand; capital-allocation plans for each entity."));

disclaimer(children);

const doc = makeDoc("Honeywell International Inc. — Equity Research", children);
save(doc, "/home/user/fundbello/Honeywell_Equity_Research_2026.docx");
