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
  name: "AppLovin Corporation",
  sub: "Nasdaq: APP  ·  Advertising Technology (AI-driven ad platform)  ·  United States",
  snapshotRows: [
    ["Metric", "Value", "Note"],
    ["Share price", "~US$550", "early Jun 2026"],
    ["Market cap", "~US$190 bn", "S&P 500 member"],
    ["FY2025 revenue", "US$5.8 bn", "+46% YoY"],
    ["FY2025 adj. EBITDA", "US$4.51 bn", "~78% margin"],
    ["Q1'26 revenue", "US$1.84 bn", "+59% YoY"],
    ["Q1'26 adj. EBITDA", "US$1.56 bn", "85% margin"],
    ["FY2025 FCF", "US$3.95 bn", "cash machine"],
    ["P/E (trailing)", "~49x", "premium multiple"],
  ],
  preparedFor: "Prepared for: laurentbello@gmail.com  ·  IWP Portfolio Research",
});

// ----------------------------------------------------- EXECUTIVE SUMMARY --------
children.push(H1("1. Executive Summary"));
children.push(P("AppLovin has completed one of the cleaner transformations in technology: from a sprawling mobile-games-plus-advertising hybrid into a focused, AI-driven advertising platform with software-like margins. The June 2025 sale of its mobile gaming business to Tripledot Studios (≈$400 m cash plus ~20% equity) left a pure-play ad-tech engine built around AXON, its machine-learning advertising recommendation system. The result is a company growing revenue ~50–60% while generating roughly 80% adjusted-EBITDA margins and billions in free cash flow."));
children.push(P("FY2025 revenue reached $5.8 billion (+46% YoY) with adjusted EBITDA of $4.51 billion and free cash flow of $3.95 billion. Q1 2026 accelerated: $1.84 billion of revenue (+59%), an 85% adjusted-EBITDA margin, $3.56 diluted EPS, and $1.29 billion of free cash flow. The June 2026 global launch of AXON's self-serve and e-commerce platforms is the pivotal catalyst — the company's bid to expand beyond mobile gaming into the far larger web and e-commerce advertising markets."));
children.push(leadBullet("Bull case", "A rare combination of hyper-growth and hyper-profitability, an AI advertising engine with compounding data advantages, a fortress FCF profile, and a large new TAM opening in e-commerce/web."));
children.push(leadBullet("Bear case", "A premium ~49x multiple leaves no room for error; persistent short-seller allegations (data practices, attribution, AML) create headline risk; and the model depends on third-party platforms (Apple, Meta, Google) and the unproven scaling of e-commerce."));
children.push(leadBullet("Our read", "A genuinely high-quality, wide-margin platform with a real AI moat — but priced for continued flawless execution. Quality is not the question; the entry multiple and the regulatory/short-seller overhang are."));
children.push(hr());

// ----------------------------------------------------- BUSINESS OVERVIEW -------
children.push(H1("2. Business Overview"));
children.push(P("AppLovin operates an advertising platform that connects advertisers with users across mobile (and, increasingly, web) inventory. Following the 2025 divestiture of its games studios, the business is now essentially a single segment — Advertising — powered by the AXON AI engine."));
children.push(leadBullet("AXON engine", "A machine-learning model that matches ads to users and optimises bidding and creative in real time. More ad spend and outcomes feed more data, which improves targeting — a self-reinforcing flywheel that is the core of the moat."));
children.push(leadBullet("Pure-play pivot", "The sale of 10 game studios (Machine Zone, PeopleFun, Lion Studios and others) to Tripledot in June 2025 removed a lower-margin, hit-driven business and sharpened the financial profile toward software economics."));
children.push(leadBullet("The next frontier", "Historically concentrated in mobile-gaming advertising, AppLovin is pushing into e-commerce and broader web advertising. The June 2026 public launch of self-serve AXON and the e-commerce platform is the key proof point for that expansion."));
children.push(P("The financial signature is unusual: advertising-platform revenue growth in the 50–60% range combined with ~80–85% adjusted-EBITDA margins and near-full free-cash-flow conversion — a profile more typical of a mature software monopoly than a growth advertiser."));
children.push(hr());

// -------------------------------------------------- FINANCIAL PERFORMANCE ------
children.push(H1("3. Financial Performance"));
children.push(H2("3.1 Full-year 2025"));
{
  const w = [3000, 1800, 1800, 1800];
  const rows = [
    row(["Metric", "FY2024", "FY2025", "YoY"], w, {1:{align:C},2:{align:C},3:{align:C}}),
    row(["Revenue", "~$4.0 bn", "$5.8 bn", "+46%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Adjusted EBITDA", "$2.41 bn", "$4.51 bn", "+87%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Net income (cont. ops)", "$1.59 bn", "$3.43 bn", "+116%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Free cash flow", "—", "$3.95 bn", "—"], w, {1:{align:R},2:{align:R},3:{align:R}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(H2("3.2 Q1 2026 — growth with software margins"));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Q1 2026", "Change / note"], w, {1:{align:C},2:{align:C}}),
    row(["Revenue", "$1.84 bn", "+59% YoY"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Adjusted EBITDA", "$1.56 bn", "+66%; 85% margin"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Net income", "$1.21 bn", "63.5% net margin"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Diluted EPS", "$3.56", "record"], w, {1:{align:R,bold:true},2:{align:R}}),
    row(["Free cash flow", "$1.29 bn", "near-full conversion"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("Guidance for Q2 2026 is $1.915–1.945 bn of revenue with adjusted EBITDA of $1.615–1.645 bn (84–85% margin) — implying continued ~55%+ growth at peer-leading profitability. The global public launch of the AXON self-serve and e-commerce platforms is slated for June 2026.", { italics: true }));
children.push(hr());

// --------------------------------------------------------- THE MOAT ------------
children.push(H1("4. The AXON Moat & Competitive Position"));
children.push(P("AppLovin's advantage is a data-and-AI flywheel rather than a brand or a contractual lock-in. AXON improves as it processes more advertising outcomes, and better targeting attracts more ad budgets — which generates more data. That loop, layered on extreme operating leverage, is what produces both the growth and the margins."));
children.push(leadBullet("Data network effects", "Scale of ad spend and conversion data is self-reinforcing; the leader's model keeps widening its accuracy lead, which is hard for sub-scale rivals to replicate."));
children.push(leadBullet("Operating leverage", "~80–85% adjusted-EBITDA margins and near-full FCF conversion mean incremental revenue drops almost straight to cash — a structural advantage that funds reinvestment without dilution."));
children.push(leadBullet("Platform breadth", "Expansion from gaming into e-commerce/web multiplies the addressable market and diversifies away from a single ad vertical, if the self-serve launch lands."));
children.push(leadBullet("But — platform dependence", "AXON relies on access to inventory and signal governed by Apple, Meta and Google. Policy or privacy changes by those gatekeepers are an exogenous risk the company cannot fully control."));
children.push(moatBox("7", "A genuine AI/data-driven moat with software-like economics and network effects — strong and widening in mobile, but exposed to third-party platform policy, privacy regulation, and an e-commerce expansion that is promising yet still unproven at scale."));
children.push(P("Why a 7 and not higher? The data flywheel and margin structure are first-rate, but the moat sits on rails owned by others (the major ad and OS platforms) and faces an unusually loud short-seller and regulatory spotlight on its data and attribution practices. The franchise is excellent; its durability is more contingent than a closed-ecosystem monopoly's."));
children.push(hr());

// ----------------------------------------------------------- GROWTH DRIVERS ----
children.push(H1("5. Growth Drivers"));
children.push(leadBullet("E-commerce expansion", "The June 2026 global launch of the AXON e-commerce platform targets direct-response advertising for online retailers — a TAM far larger than mobile gaming and the single biggest swing factor in the bull case."));
children.push(leadBullet("Self-serve AXON", "Opening the platform to self-serve advertisers broadens the customer base beyond large managed accounts and can accelerate adoption and operating leverage."));
children.push(leadBullet("Pure-play focus", "Post-divestiture, all capital and engineering effort concentrates on the advertising engine, improving model velocity and capital efficiency."));
children.push(leadBullet("Free-cash-flow optionality", "~$4 bn/year of FCF funds buybacks and reinvestment, compounding per-share value without external capital."));
children.push(leadBullet("Index demand", "S&P 500 inclusion (2025) broadened the shareholder base and passive demand for the stock."));
children.push(hr());

// --------------------------------------------------------------- VALUATION -----
children.push(H1("6. Valuation"));
children.push(P("Unlike a cyclical or a roll-up, AppLovin is highly profitable today, so it trades on earnings and cash flow — but at a premium that prices in years of continued rapid growth."));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Approx.", "Comment"], w, {1:{align:C}}),
    row(["Market cap", "~$190 bn", "S&P 500 member"], w, {1:{align:R,bold:true}}),
    row(["Share price", "~$550", "+~52% 1-yr"], w, {1:{align:R}}),
    row(["P/E (trailing)", "~49x", "premium multiple"], w, {1:{align:R}}),
    row(["FY25 FCF", "~$3.95 bn", "~2% FCF yield"], w, {1:{align:R}}),
    row(["EBITDA margin", "~80–85%", "software-like"], w, {1:{align:R,color:GREEN,bold:true}}),
    row(["Revenue growth", "~50–60%", "Q1'26 +59%"], w, {1:{align:R,color:GREEN,bold:true}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(leadBullet("The bull framing", "A ~49x P/E is not expensive for a business compounding revenue ~55% at 80%+ margins with optionality on a vast e-commerce TAM. On forward earnings the multiple compresses quickly if growth holds."));
children.push(leadBullet("The bear framing", "The multiple discounts years of flawless execution and leaves a thin margin of safety. A growth deceleration, a platform-policy shock, or a validated short-seller allegation could trigger a sharp de-rating with little earnings cushion at this valuation."));
children.push(hr());

// ----------------------------------------------- PRICE TARGET & SCENARIOS ------
children.push(H1("7. Price Target & Scenario Analysis"));
children.push(P("We frame three illustrative, probability-weighted outcomes anchored to the ~$550 spot price. The dominant variable is the success of the e-commerce/self-serve expansion against the backdrop of multiple and regulatory risk."));
{
  const w = [1700, 1300, 1500, 1500, 1400];
  const rows = [
    row(["Scenario", "Prob.", "Core assumption", "12–18m target", "vs spot"], w, {1:{align:C},3:{align:C},4:{align:C}}),
    row(["Bull", "35%", "E-commerce scales; growth & margins hold", "$800", "+45%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN,bold:true}}),
    row(["Base", "40%", "Growth moderates but compounds; e-com contributes", "$620", "+13%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN}}),
    row(["Bear", "25%", "Growth decel / policy or short-seller shock; de-rating", "$380", "-31%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:RED,bold:true}}),
    row(["Weighted", "100%", "Probability-weighted expected value", "$623", "+13%"], w,
        {0:{bold:true,fill:LIGHT},1:{align:C,bold:true,fill:LIGHT},2:{bold:true,fill:LIGHT},3:{align:R,bold:true,fill:LIGHT},4:{align:R,bold:true,fill:LIGHT}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The probability-weighted target sits ~13% above spot, but the asymmetry cuts both ways: the bull case is a genuine doubling-path if e-commerce works, while the bear case is a ~31% de-rating given the premium multiple. This is a quality-growth name where the entry multiple, not the business quality, drives the risk.", { italics: true }));
children.push(leadBullet("Bull triggers", "Strong e-commerce platform adoption post-June launch; self-serve traction; sustained 50%+ growth; short-seller claims dismissed."));
children.push(leadBullet("Bear triggers", "Apple/Meta/Google policy changes; privacy/regulatory action; a credible substantiation of short-seller allegations; visible growth deceleration."));
children.push(hr());

// ------------------------------------------------------------------ RISKS ------
children.push(H1("8. Key Risks"));
children.push(leadBullet("Valuation risk", "At ~49x earnings, the stock prices in years of high growth; any disappointment can compress the multiple sharply."));
children.push(leadBullet("Short-seller / reputational overhang", "Multiple firms (Muddy Waters, Culper, Fuzzy Panda, The Bear Cave in 2025; CapitalWatch in 2026) have alleged data-practice, attribution-inflation and even money-laundering ties. AppLovin has denied the claims and commissioned an independent legal review, and at least one report (CapitalWatch) was retracted — but the overhang and headline risk persist."));
children.push(leadBullet("Platform dependence", "AXON relies on inventory, identifiers and signal governed by Apple, Meta and Google; adverse policy or privacy changes could impair targeting and attribution."));
children.push(leadBullet("Regulatory / privacy", "Tightening global privacy regulation and scrutiny of identity-graph/attribution practices is a structural risk to the data flywheel."));
children.push(leadBullet("Execution — e-commerce", "The growth thesis leans heavily on scaling beyond gaming into e-commerce/web, which is new, competitive and unproven at scale."));
children.push(leadBullet("Concentration", "Despite diversification efforts, revenue and attribution remain concentrated in performance advertising verticals sensitive to advertiser ROI."));
children.push(hr());

// -------------------------------------------------------- INVESTMENT VIEW ------
children.push(H1("9. Investment View"));
children.push(P("AppLovin is a genuinely exceptional business: ~55% revenue growth, ~80–85% adjusted-EBITDA margins, ~$4 bn of annual free cash flow, and a self-reinforcing AI advertising engine. Few public companies combine growth and profitability at this level. The pure-play pivot has sharpened that profile, and the e-commerce expansion offers a credible path to a much larger market."));
children.push(P("The debate is therefore not about quality but about price and trust. At ~49x earnings the market already credits years of flawless execution, and the persistent short-seller and regulatory spotlight on the company's data and attribution practices is a real, unresolved overhang. The platform also rides on rails owned by Apple, Meta and Google."));
children.push(P("Our probability-weighted scenario work (Section 7) implies fair value near $623 — about 13% above the ~$550 spot — with a credible ~31% downside on de-rating. That is favourable-but-not-cheap expected value for a top-quality compounder. We would treat it as a high-conviction quality-growth holding to accumulate on volatility and multiple compression, sized to tolerate sharp drawdowns and headline-driven swings.", { italics: false }));
children.push(leadBullet("Suitable for", "Growth-oriented investors who want exposure to AI-driven advertising and can tolerate a premium multiple and event-driven volatility."));
children.push(leadBullet("Less suitable for", "Value-sensitive or low-volatility investors uncomfortable with short-seller overhang and platform-dependency risk."));
children.push(leadBullet("Watch items", "E-commerce/self-serve adoption after the June 2026 launch; revenue-growth trajectory; outcome of the independent review and any regulatory action; Apple/Meta/Google policy shifts; FCF and buyback cadence."));

disclaimer(children);

const doc = makeDoc("AppLovin Corporation — Equity Research", children);
save(doc, "/home/user/fundbello/AppLovin_Equity_Research_2026.docx");
