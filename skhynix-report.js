const { H1, H2, P, bullet, leadBullet, hr, moatBox, table, cover, disclaimer, makeDoc, save,
        AlignmentType, GREEN, RED, NAVY, BLUE } = require('./lib.js');

// Column-width helpers for tables ----------------------------------------------
const R = AlignmentType.RIGHT, C = AlignmentType.CENTER;
function row(cells, widths, opts = {}) {
  return cells.map((t, i) => ({ t: String(t), w: widths[i], ...(opts[i] || {}) }));
}

const children = [];

// ---------------------------------------------------------------- COVER --------
cover(children, {
  name: "SK hynix Inc.",
  sub: "KRX: 000660  ·  Semiconductors — Memory (DRAM / NAND / HBM)  ·  South Korea",
  snapshotRows: [
    ["Metric", "Value", "Note"],
    ["Share price", "~₩1,686,000", "early May 2026"],
    ["Market cap", "~US$1.0 trillion", "13th largest globally"],
    ["FY2025 revenue", "₩97.1 tn", "+47% YoY"],
    ["FY2025 op. profit", "₩47.2 tn", "49% margin"],
    ["Q1'26 op. margin", "72%", "record; >Nvidia, >TSMC"],
    ["HBM share", "~57%", "Q4'25, market leader"],
    ["Net cash", "Positive", "cash > total debt"],
    ["Dividend yield", "~0.3%", "₩3,000/sh annual"],
  ],
  preparedFor: "Prepared for: laurentbello@gmail.com  ·  IWP Portfolio Research",
});

// ----------------------------------------------------- EXECUTIVE SUMMARY --------
children.push(H1("1. Executive Summary"));
children.push(P("SK hynix has transformed from the perennial number-two memory maker into the defining winner of the AI hardware build-out. As the dominant supplier of High Bandwidth Memory (HBM) — the stacked DRAM that sits beside every leading-edge AI accelerator — the company has captured the scarcest, highest-margin component in the data-center supply chain. In 2025 it overtook Samsung in annual operating profit for the first time in its history, and in May 2026 it briefly joined the trillion-dollar market-cap club."));
children.push(P("The financial inflection has been extraordinary. FY2025 revenue reached ₩97.1 trillion (+47% YoY) with operating profit of ₩47.2 trillion (49% margin). Q1 2026 then broke every record: ₩52.6 trillion of revenue in a single quarter at a 72% operating margin — a profitability level higher than either Nvidia or TSMC reported in the same period. Management has stated that customer HBM requests already exceed planned capacity for the next three years.", { bold: false }));
children.push(leadBullet("Bull case", "SK hynix sits at the supply-constrained centre of the largest capex cycle in computing history, with multi-year visibility, a technology lead in HBM4, and net-cash balance sheet."));
children.push(leadBullet("Bear case", "Memory is historically the most cyclical industry in technology. Today's record margins are a function of a supply shortage that the company itself — plus Samsung and Micron — is spending >₩30 tn/year to eliminate."));
children.push(leadBullet("Our read", "A genuinely improved, structurally advantaged franchise that nonetheless remains a cyclical commodity producer. The quality of the business has risen faster than the market sometimes credits, but so has the risk of buying at the top of a super-cycle."));
children.push(hr());

// ----------------------------------------------------- BUSINESS OVERVIEW -------
children.push(H1("2. Business Overview"));
children.push(P("SK hynix Inc. is the world's second-largest memory semiconductor manufacturer by volume and, since 2025, the most profitable. It designs and fabricates two core product families:"));
children.push(leadBullet("DRAM", "Volatile working memory, including standard DDR5 server/PC memory, mobile LPDDR, and — critically — HBM, the high-margin stacked DRAM used in AI GPUs and accelerators. DRAM, led by HBM, drives the bulk of profit."));
children.push(leadBullet("NAND flash", "Non-volatile storage for SSDs and mobile devices, operated partly through the Solidigm enterprise-SSD business acquired from Intel. Enterprise SSD demand is now also benefiting from the AI storage tier."));
children.push(P("The company is majority-owned within the SK Group, one of Korea's largest conglomerates. Its strategic position is anchored by a deep qualification relationship with Nvidia, for whom it is the lead HBM supplier across the Hopper, Blackwell and now Rubin accelerator generations."));
children.push(hr());

// -------------------------------------------------- FINANCIAL PERFORMANCE ------
children.push(H1("3. Financial Performance"));
children.push(H2("3.1 Annual results (₩ trillion)"));
{
  const w = [3000, 1800, 1800, 1800];
  const rows = [
    row(["Metric", "FY2024", "FY2025", "YoY"], w, {1:{align:C},2:{align:C},3:{align:C}}),
    row(["Revenue", "66.2", "97.1", "+47%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Operating profit", "23.5", "47.2", "+101%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Operating margin", "35%", "49%", "+14pp"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN}}),
    row(["Net profit", "—", "42.9", "—"], w, {1:{align:R},2:{align:R},3:{align:R}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(H2("3.2 Q1 2026 — a record quarter"));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Q1 2026", "Change"], w, {1:{align:C},2:{align:C}}),
    row(["Revenue", "₩52.6 tn", "+60% QoQ / +198% YoY"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Operating profit", "₩37.6 tn", "+96% QoQ"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Operating margin", "72%", "record high"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Net margin", "77%", "record high"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
  ];
  children.push(table(rows, w));
}
children.push(P("", ));
children.push(P("Q1 2026 was the first quarter SK hynix ever crossed ₩50 trillion of revenue — achieved despite Q1 normally being a seasonally weak period for memory. The 72% operating margin is a direct read on the severity of the HBM shortage: pricing power, not volume, is doing the work.", { italics: true }));
children.push(hr());

// ------------------------------------------------------- THE HBM FRANCHISE -----
children.push(H1("4. The HBM Franchise & Competitive Moat"));
children.push(P("HBM is the pivot on which the entire investment case turns. It is DRAM, but assembled into vertical stacks bonded with advanced packaging (MR-MUF and, increasingly, hybrid bonding) and sold attached to AI accelerators. It carries far higher margins than commodity DRAM and is sold under multi-year, capacity-reserved agreements rather than spot pricing."));
children.push(leadBullet("Market leadership", "SK hynix held ~57% of the HBM market in Q4 2025 and is forecast to hold ~54% of the 2026 HBM4 market (Samsung ~28%, Micron ~18%). For Nvidia's Rubin platform specifically, estimates put SK hynix's share as high as ~70%."));
children.push(leadBullet("Nvidia lock-in", "SK hynix has secured the majority — reportedly over two-thirds — of HBM supply for Nvidia's next-generation Vera Rubin products. Each Rubin GPU requires ~288GB of HBM4, nearly triple Blackwell."));
children.push(leadBullet("Technology lead", "First to deliver HBM4 customer samples to Nvidia. Seventh-generation HBM4E sampling is targeted for H2 2026 with mass production in 2027."));
children.push(leadBullet("Structural triopoly", "HBM4's capital and yield complexity has priced out smaller entrants. Only SK hynix, Samsung and Micron can compete — a rational three-player oligopoly rather than the fragmented price-war structure of older memory cycles."));
children.push(moatBox("7", "A real and widening moat in HBM — technology leadership, Nvidia qualification lock-in, and oligopoly structure — built on top of an inherently cyclical, commoditised memory base. Strong, but not Nvidia-grade durable."));
children.push(P("Why a 7 and not higher? The moat is genuine but it is rented against a commodity foundation. SK hynix's lead is measured in product generations and yield, not in irreproducible IP. Samsung is closing on HBM4 (1c-nm process, in-house foundry base die), and the same shortage funding SK hynix's margins is funding two well-capitalised competitors to expand. The durability of the moat depends on staying one node ahead — a recurring, capital-intensive race rather than a permanent toll booth."));
children.push(hr());

// ----------------------------------------------------------- GROWTH DRIVERS ----
children.push(H1("5. Growth Drivers & Capacity"));
children.push(leadBullet("Demand visibility", "Management says HBM customer requests already exceed planned production for the next three years — unusually long visibility for a memory maker."));
children.push(leadBullet("M15X fab", "Pulled forward ~4 months; began 1b-nm DRAM for HBM4 in early 2026, ramping toward 55,000–60,000 wafers/month by year-end."));
children.push(leadBullet("P&T7 packaging", "~US$13 bn (₩19 tn) investment in what is slated to be the world's largest dedicated HBM packaging & test facility, to feed the Rubin era."));
children.push(leadBullet("Capex step-up", "FY2025 capex in the mid-₩20 tn range; FY2026 projected above ₩30 tn (~US$21 bn). Management has pledged to roughly double wafer capacity within five years."));
children.push(leadBullet("Broadening AI pull", "Beyond HBM, AI is now tightening conventional server DDR5 and enterprise SSD (Solidigm) markets, lifting the non-HBM book as well."));
children.push(hr());

// --------------------------------------------------------------- VALUATION -----
children.push(H1("6. Valuation"));
children.push(P("Valuation is the crux of the debate. On trailing super-cycle earnings the stock looks inexpensive; the question is what fraction of those earnings is sustainable through-cycle."));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Approx.", "Comment"], w, {1:{align:C}}),
    row(["Market cap", "~US$1.0 tn", "joined club May 2026"], w, {1:{align:R,bold:true}}),
    row(["Share price", "~₩1,686,000", "early May 2026"], w, {1:{align:R}}),
    row(["2026 share gain", "~+250% YTD", "AI-driven re-rating"], w, {1:{align:R,color:GREEN}}),
    row(["Forward P/E", "~7–9x", "on peak-cycle EPS"], w, {1:{align:R}}),
    row(["Dividend yield", "~0.3%", "₩3,000/sh, quarterly"], w, {1:{align:R}}),
    row(["Balance sheet", "Net cash", "cash > total debt; D/E ~24%"], w, {1:{align:R,color:GREEN}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(leadBullet("The bull framing", "A high-single-digit forward P/E for the structural leader of the AI memory cycle, with net cash and three years of demand visibility, is cheap if earnings hold."));
children.push(leadBullet("The bear framing", "A ~7x multiple on peak-cycle earnings is the classic cyclical trap — low P/Es at the top, high P/Es at the bottom. After a ~250% run, the price already discounts a great deal of good news. Normalise margins toward a mid-cycle 30–40% and the multiple looks far less generous."));
children.push(hr());

// ----------------------------------------------- PRICE TARGET & SCENARIOS ------
children.push(H1("7. Price Target & Scenario Analysis"));
children.push(P("Because SK hynix's earnings are super-cycle-inflated, a single point target is misleading. We frame value across three through-cycle scenarios, anchored to the early-May 2026 price of ~₩1,686,000. These are illustrative, probability-weighted outcomes — not precise forecasts — and depend chiefly on how long the HBM shortage persists before triopoly capex closes the gap."));
{
  const w = [1700, 1300, 1500, 1500, 1400];
  const rows = [
    row(["Scenario", "Prob.", "Core assumption", "12–18m target", "vs spot"], w, {1:{align:C},3:{align:C},4:{align:C}}),
    row(["Bull", "35%", "Structural HBM shortage to 2030; margins hold", "₩2,400,000", "+42%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN,bold:true}}),
    row(["Base", "40%", "HBM premium persists; margins ease to mid-cycle", "₩1,900,000", "+13%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN}}),
    row(["Bear", "25%", "Cycle rolls over; capacity catches demand", "₩1,100,000", "-35%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:RED,bold:true}}),
    row(["Weighted", "100%", "Probability-weighted expected value", "₩1,875,000", "+11%"], w,
        {0:{bold:true,fill:"D9E2F3"},1:{align:C,bold:true,fill:"D9E2F3"},2:{bold:true,fill:"D9E2F3"},3:{align:R,bold:true,fill:"D9E2F3"},4:{align:R,bold:true,fill:"D9E2F3"}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The asymmetry is the point: the probability-weighted target sits only ~11% above spot, yet the bear case implies a ~35% drawdown. After a ~250% YTD run, the distribution of outcomes is skewed — modest expected upside against a fat left tail. The bull case is credible but requires the shortage to outlast three well-funded expanders; the bear case requires only that memory behave the way memory has always behaved.", { italics: true }));
children.push(leadBullet("Bull triggers", "HBM4E qualified ahead of peers; Nvidia Rubin volumes exceed plan; 2027 supply still sold out; conventional DRAM stays tight."));
children.push(leadBullet("Bear triggers", "Samsung/Micron close the Nvidia qualification gap; AI-capex growth decelerates; combined 2026–27 capex visibly outruns demand; HBM spot pricing rolls over."));
children.push(hr());

// ------------------------------------------------------------------ RISKS ------
children.push(H1("8. Key Risks"));
children.push(leadBullet("Cyclicality", "Memory is the most cyclical major tech sub-sector. The current shortage will eventually be met by industry-wide capacity additions, and pricing can reverse sharply."));
children.push(leadBullet("Self-inflicted supply", "SK hynix, Samsung and Micron are collectively spending tens of billions to expand HBM — the cure for the very shortage driving today's margins."));
children.push(leadBullet("Customer concentration", "Heavy dependence on Nvidia and the AI accelerator roadmap. Any slowdown in AI capex, or an architecture that needs less memory, hits the core thesis."));
children.push(leadBullet("Competitive catch-up", "Samsung's HBM4 (1c-nm, in-house base die) and Micron's ramp could erode SK hynix's share and pricing as qualification gaps close."));
children.push(leadBullet("Execution / yield", "HBM4 hybrid-bonding and advanced packaging carry real yield risk at nanometre scale; stumbles would be costly given the capacity commitments."));
children.push(leadBullet("Macro & geopolitical", "Tariff barriers, export controls, rising input costs, and Korea-specific governance/FX factors all bear on the equity."));
children.push(hr());

// -------------------------------------------------------- INVESTMENT VIEW ------
children.push(H1("9. Investment View"));
children.push(P("SK hynix is the highest-quality way to own the AI memory cycle. It has earned a structural advantage in HBM, a net-cash balance sheet, and earnings power that, even haircut for cyclicality, dwarfs anything in its history. The franchise quality is real and has stepped up."));
children.push(P("But the security is still, at root, a cyclical commodity producer enjoying an exceptional — and partly self-correcting — shortage. The 72% margin is a peak signal, not a baseline. The investment decision therefore reduces to a single question: how long does the HBM shortage persist before the triopoly's combined capex closes the gap? Bulls see a multi-year structural shortage into 2030; bears see the seeds of the next down-cycle already in the ground."));
children.push(P("Our probability-weighted scenario work (Section 7) puts fair value around ₩1,875,000 — roughly 11% above the early-May 2026 price — against a bear-case drawdown near 35%. That is positive but modest expected value with a materially fat left tail. The implication is not 'avoid', but 'size and time with discipline': this is a position to scale into on cyclical weakness rather than to chase after a ~250% run."));
children.push(leadBullet("Suitable for", "Investors who want concentrated, high-conviction exposure to AI infrastructure and can tolerate severe drawdowns and cyclicality."));
children.push(leadBullet("Less suitable for", "Investors seeking stable compounding, who should weight the peak-cycle entry point and the history of memory boom-bust heavily."));
children.push(leadBullet("Watch items", "HBM pricing trends, Samsung/Micron HBM4 qualification at Nvidia, the 2026 capex figure across all three players, and any change in Nvidia's accelerator roadmap or AI capex commentary."));

disclaimer(children);

// ---------------------------------------------------------------- BUILD ---------
const doc = makeDoc("SK hynix Inc. — Equity Research", children);
save(doc, "/home/user/fundbello/SK_hynix_Equity_Research_2026.docx");
