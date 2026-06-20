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
  name: "QXO, Inc.",
  sub: "NYSE: QXO  ·  Building Products Distribution (tech-enabled roll-up)  ·  United States",
  snapshotRows: [
    ["Metric", "Value", "Note"],
    ["Share price", "~US$17", "after recent weakness"],
    ["Market cap", "~US$12.1 bn", "EV ~US$14 bn"],
    ["FY2025 net sales", "US$6.84 bn", "Beacon from Apr'25"],
    ["FY2025 adj. EBITDA", "US$648 m", "9.5% margin"],
    ["Q1'26 net sales", "US$1.73 bn", "industry 'softness'"],
    ["Pending deal", "TopBuild ~$17 bn", "close ~Q3'26"],
    ["Combined revenue", ">US$18 bn", "post-TopBuild"],
    ["Ambition", "US$50 bn rev", "within a decade"],
  ],
  preparedFor: "Prepared for: laurentbello@gmail.com  ·  IWP Portfolio Research",
});

// ----------------------------------------------------- EXECUTIVE SUMMARY --------
children.push(H1("1. Executive Summary"));
children.push(P("QXO, Inc. is a bet on a person and a playbook more than on a current set of financials. In under two years, serial acquirer Brad Jacobs has converted a ~$57 million tech-services shell into North America's largest publicly-traded building-products distributor, deploying more than $13 billion of acquisitions in eleven months — Beacon Roofing ($11 bn, April 2025), Kodiak Building Partners ($2.25 bn, April 2026) — and announcing the landmark $17 billion TopBuild deal in April 2026. The stated ambition is $50 billion of revenue within a decade."));
children.push(P("The financials, however, reflect a company mid-construction. FY2025 net sales were $6.84 billion with adjusted EBITDA of $648 million (9.5% margin) but a GAAP loss of $(0.63)/share. Q1 2026 laid the tension bare: $1.73 billion of sales, an adjusted net loss of $(0.12)/share, and adjusted EBITDA of just $1.2 million as building-products demand softened and the company spent heavily on people and technology. This is a roll-up being built through a cyclical trough."));
children.push(leadBullet("Bull case", "A proven operator-acquirer (Jacobs' prior platforms returned ~300x cumulatively) consolidating an $800 bn+ fragmented market, with a tech-enabled distribution model, scale procurement, and a long M&A runway."));
children.push(leadBullet("Bear case", "Near-zero current profitability, a cyclical end-market in a downturn, heavy share issuance to fund deals, and a valuation underwritten on a decade-out promise rather than today's cash flows."));
children.push(leadBullet("Our read", "A high-variance special-situation. The quality of the jockey is exceptional and the addressable market is real, but the moat is thin, the execution risk is front-loaded, and the entry price embeds a great deal of faith. Size as a speculative position, not a core compounder."));
children.push(hr());

// ----------------------------------------------------- BUSINESS OVERVIEW -------
children.push(H1("2. Business Overview"));
children.push(P("QXO distributes building products — roofing, waterproofing, insulation, lumber and complementary materials — to professional contractors across North America. The strategy is a classic Jacobs roll-up: acquire scaled platforms in a fragmented industry, integrate them onto a common technology and procurement backbone, and compound through both organic share gains and continued M&A."));
children.push(leadBullet("Core platform — Beacon", "The April 2025 acquisition of Beacon Roofing Supply ($124.35/share, ~$11 bn incl. debt) is the foundation: a national roofing & waterproofing distribution network that instantly made QXO the largest listed building-products distributor in North America."));
children.push(leadBullet("Tech-enabled model", "Digital sales channels, private-label products, and data/logistics tooling are positioned as the structural differentiator versus mom-and-pop and legacy distributors in an otherwise low-tech industry."));
children.push(leadBullet("The operator", "CEO Brad Jacobs built XPO, United Rentals, United Waste and United Waste Industries through ~500 acquisitions, generating roughly 300x cumulative returns. QXO is his fifth platform; the thesis leans heavily on repeating that record."));
children.push(P("The addressable market is large and fragmented — an ~$800 billion building-products distribution industry, rising to a $300 billion-plus served market once TopBuild closes — which is precisely the terrain a disciplined consolidator is built for."));
children.push(hr());

// -------------------------------------------------- FINANCIAL PERFORMANCE ------
children.push(H1("3. Financial Performance"));
children.push(H2("3.1 Full-year 2025 (first year of scale)"));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "FY2025", "Note"], w, {1:{align:C}}),
    row(["Net sales", "$6.84 bn", "Beacon from 29 Apr"], w, {1:{align:R,bold:true}}),
    row(["Adjusted EBITDA", "$647.8 m", "9.5% margin"], w, {1:{align:R,bold:true}}),
    row(["Adjusted diluted EPS", "$0.34", "non-GAAP"], w, {1:{align:R}}),
    row(["GAAP EPS", "$(0.63)", "reported loss"], w, {1:{align:R,color:RED,bold:true}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(H2("3.2 Q1 2026 — softness meets investment spend"));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Q1 2026", "Note"], w, {1:{align:C}}),
    row(["Net sales", "$1.73 bn", "below expectations"], w, {1:{align:R,bold:true}}),
    row(["Adjusted EBITDA", "$1.2 m", "0.1% margin"], w, {1:{align:R,color:RED,bold:true}}),
    row(["Adjusted net loss", "$(57.2) m", "$(0.12)/sh"], w, {1:{align:R,color:RED,bold:true}}),
    row(["GAAP net loss", "$(227) m", "incl. deal/integration"], w, {1:{align:R,color:RED}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("Brad Jacobs framed the quarter as reflecting \"the softness we're seeing in the building products industry, and our investments in the business, including people and technology.\" Management guides to roughly $11.78 billion of revenue for full-year 2026 — the step-up driven by a full year of Beacon plus Kodiak, before any TopBuild contribution.", { italics: true }));
children.push(hr());

// --------------------------------------------------- THE ROLL-UP ENGINE --------
children.push(H1("4. The Roll-Up Engine & Competitive Position"));
children.push(P("QXO's edge is not a product or a patent — it is a capital-allocation and integration capability layered on top of distribution scale. That distinction matters for how durable the advantage really is."));
children.push(leadBullet("Operator pedigree", "Jacobs' track record across four prior platforms is the single strongest asset in the thesis. Serial acquirers who can both buy well and integrate are rare; the market is effectively underwriting that skill."));
children.push(leadBullet("Scale economics", "Greater purchasing power, branch density, and logistics leverage are genuine local advantages in distribution — the bigger network can serve contractors faster and cheaper."));
children.push(leadBullet("Technology overlay", "Digital ordering, pricing analytics and private label are real margin levers in a laggard industry, if execution follows the promise."));
children.push(leadBullet("But — low structural barriers", "Building-products distribution is fundamentally a fragmented, low-margin, cyclical business with modest switching costs. Scale helps, but it does not confer pricing power on the order of a franchise monopoly."));
children.push(moatBox("5", "An execution-and-scale advantage led by an elite capital allocator, built in a commoditised, cyclical distribution market. The moat is being manufactured deal-by-deal rather than inherited — promising, but unproven at this scale and thinner than the valuation implies."));
children.push(P("Why a 5? The jockey and the runway justify optimism, but the underlying economics are ordinary distribution. The advantage compounds only if integration, technology and procurement synergies actually materialise across rapidly stacked acquisitions — and that is exactly what has yet to be demonstrated at QXO's new size, through a soft market."));
children.push(hr());

// ------------------------------------------------- GROWTH DRIVERS / M&A --------
children.push(H1("5. Growth Drivers & M&A Pipeline"));
children.push(leadBullet("TopBuild ($17 bn, pending)", "Announced 19 Apr 2026 at $505/share (≈45% cash / 55% QXO stock); closing targeted Q3 2026. Adds the #1 insulation distributor/installer. Combined company: >$18 bn revenue, >$2 bn adjusted EBITDA, leadership in insulation (#1), roofing (#2) and waterproofing (#1)."));
children.push(leadBullet("Deal economics", "TopBuild priced at 14.9x 2025 adjusted EBITDA pre-synergy, 11.8x post — with ~$300 m of targeted synergies by 2030 from procurement, network/logistics optimisation, cross-selling and technology."));
children.push(leadBullet("Kodiak ($2.25 bn, closed Apr'26)", "Lumber, trusses and building materials — broadens the product set beyond roofing and adds another integration lever."));
children.push(leadBullet("Served market", "Post-TopBuild addressable market exceeds $300 bn, within an ~$800 bn industry — ample runway for continued consolidation."));
children.push(leadBullet("The decade goal", "Management reiterates a path to ~$50 bn of annual revenue within ten years, implying many more acquisitions on top of organic growth."));
children.push(hr());

// --------------------------------------------------------------- VALUATION -----
children.push(H1("6. Valuation"));
children.push(P("QXO defies conventional earnings multiples — it is barely profitable today, so the market is pricing optionality on the roll-up, not current cash flows. The stock has been weak in 2026 as the building-products cycle softened and integration risk rose."));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Approx.", "Comment"], w, {1:{align:C}}),
    row(["Market cap", "~$12.1 bn", "EV ~$14 bn"], w, {1:{align:R,bold:true}}),
    row(["Share price", "~$17", "off recent highs"], w, {1:{align:R}}),
    row(["FY26E revenue", "~$11.78 bn", "pre-TopBuild"], w, {1:{align:R}}),
    row(["FY26E EPS", "~$(0.26)", "loss expected"], w, {1:{align:R,color:RED}}),
    row(["P/E", "n/m", "not yet profitable"], w, {1:{align:R}}),
    row(["Consensus target", "~$32.86", "implies large upside"], w, {1:{align:R,color:GREEN,bold:true}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(leadBullet("The bull framing", "On a sum-of-platforms, mid-cycle EBITDA basis with synergies realised, today's ~$14 bn EV looks modest against a company targeting $50 bn of revenue. The consensus ~$33 target implies the market sees significant value if the plan delivers."));
children.push(leadBullet("The bear framing", "You are paying a forward, faith-based multiple for a currently loss-making distributor in a cyclical trough, with heavy stock issuance diluting the per-share claim. If integration slips or the cycle stays soft, there is no earnings floor to catch the stock."));
children.push(hr());

// ----------------------------------------------- PRICE TARGET & SCENARIOS ------
children.push(H1("7. Price Target & Scenario Analysis"));
children.push(P("Given negative current earnings, value hinges almost entirely on execution of the roll-up through-cycle. We frame three illustrative, probability-weighted outcomes anchored to the ~$17 spot price. These are scenario sketches, not precise forecasts."));
{
  const w = [1700, 1300, 1500, 1500, 1400];
  const rows = [
    row(["Scenario", "Prob.", "Core assumption", "12–24m target", "vs spot"], w, {1:{align:C},3:{align:C},4:{align:C}}),
    row(["Bull", "30%", "Integrations + synergies deliver; cycle recovers", "$35", "+106%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN,bold:true}}),
    row(["Base", "40%", "Steady integration; modest demand recovery", "$24", "+41%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN}}),
    row(["Bear", "30%", "Soft cycle + integration missteps + dilution", "$12", "-29%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:RED,bold:true}}),
    row(["Weighted", "100%", "Probability-weighted expected value", "$23.7", "+39%"], w,
        {0:{bold:true,fill:LIGHT},1:{align:C,bold:true,fill:LIGHT},2:{bold:true,fill:LIGHT},3:{align:R,bold:true,fill:LIGHT},4:{align:R,bold:true,fill:LIGHT}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The distribution is wide in both directions — characteristic of a special-situation. The probability-weighted ~+39% upside reflects a stock already marked down for risk, but the bear case is a real ~30% drawdown with no profit floor. This is convexity, not a steady compounder: position size should respect the variance.", { italics: true }));
children.push(leadBullet("Bull triggers", "TopBuild closes on time; visible synergy capture; building-products demand inflects upward; QXO posts clean positive adjusted EBITDA at scale."));
children.push(leadBullet("Bear triggers", "Prolonged construction/R&R softness; integration or culture stumbles; equity issuance dilutes faster than earnings build; a large deal disappoints."));
children.push(hr());

// ------------------------------------------------------------------ RISKS ------
children.push(H1("8. Key Risks"));
children.push(leadBullet("Integration risk", "Multiple multi-billion-dollar acquisitions are being stacked and integrated simultaneously — operationally the hardest part of any roll-up, now front-loaded."));
children.push(leadBullet("End-market cyclicality", "Building products track construction, housing and repair-&-remodel activity; the company is scaling into a soft patch, compressing margins."));
children.push(leadBullet("Dilution", "Large deals funded substantially with QXO stock (TopBuild ~55% stock) dilute existing holders and raise the bar for per-share value creation."));
children.push(leadBullet("Profitability", "Adjusted EBITDA was near zero in Q1 2026 and full-year losses are expected — there is currently no earnings cushion."));
children.push(leadBullet("Key-person dependence", "The thesis rests heavily on Brad Jacobs and his ability to repeat a historic record; succession and execution concentration are real risks."));
children.push(leadBullet("Valuation / sentiment", "A faith-based multiple is vulnerable to sharp de-rating if the cadence of deals or synergy proof points disappoints."));
children.push(hr());

// -------------------------------------------------------- INVESTMENT VIEW ------
children.push(H1("9. Investment View"));
children.push(P("QXO is one of the more interesting special-situations in the market: an A-list capital allocator, a vast fragmented industry, and a clearly articulated decade-long consolidation plan. If even a fraction of Jacobs' prior success repeats, the upside from today's marked-down price is substantial."));
children.push(P("But it is not a buy-and-forget compounder. It is a loss-making distributor, mid-build, in a cyclical trough, priced on promise. The investment question is whether you trust the operator and can stomach the variance — because the financials offer no floor and the moat is being manufactured rather than inherited."));
children.push(P("Our probability-weighted scenario work (Section 7) suggests a fair value near $24 — roughly 39% above the ~$17 spot — but with a credible ~30% downside. That is genuine convexity, appropriate for a small, deliberately-sized speculative sleeve rather than a core holding, and best added on cyclical weakness with synergy proof points as the milestones to monitor."));
children.push(leadBullet("Suitable for", "Investors who back proven operators, can tolerate losses and high volatility, and want optionality on a long M&A compounding story."));
children.push(leadBullet("Less suitable for", "Investors needing current earnings, dividends, or a defensive, low-variance position."));
children.push(leadBullet("Watch items", "TopBuild close and synergy capture; adjusted EBITDA turning durably positive; building-products demand trend; pace and price discipline of new deals; share count creep."));

disclaimer(children);

const doc = makeDoc("QXO, Inc. — Equity Research", children);
save(doc, "/home/user/fundbello/QXO_Equity_Research_2026.docx");
