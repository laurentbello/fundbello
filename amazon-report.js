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
  name: "Amazon.com, Inc.",
  sub: "Nasdaq: AMZN  ·  Cloud Computing · E-Commerce · Digital Advertising  ·  United States",
  snapshotRows: [
    ["Metric", "Value", "Note"],
    ["Share price", "~US$246", "early Jun 2026"],
    ["Market cap", "~US$2.6 tn", "mega-cap"],
    ["FY2025 revenue", "US$717 bn", "+12% YoY"],
    ["FY2025 operating income", "US$80 bn", "+17% YoY"],
    ["FY2025 net income", "US$77.7 bn", "+31% YoY"],
    ["Q1'26 revenue", "US$181.5 bn", "+17% YoY"],
    ["Q1'26 AWS growth", "+28%", "15-quarter high"],
    ["P/E (trailing)", "~29–33x", "near 5-yr lows"],
  ],
  preparedFor: "Prepared for: laurentbello@gmail.com  ·  IWP Portfolio Research",
});

// ----------------------------------------------------- EXECUTIVE SUMMARY --------
children.push(H1("1. Executive Summary"));
children.push(P("Amazon enters mid-2026 firing on every cylinder. FY2025 revenue reached $717 billion (+12% YoY), operating income climbed to $80 billion (+17%), and net income jumped 31% to a record $77.7 billion. The Q1 2026 print was a genuine acceleration: $181.5 billion of revenue (+17%), a record 13.1% operating margin, and — most importantly — AWS growth of 28%, its fastest in fifteen quarters, lifting the cloud business to a $150 billion annualized run-rate. The AI workload demand that bulls have promised for two years is now visibly showing up in the numbers."));
children.push(P("The company is simultaneously the world's largest e-commerce platform, the leading cloud-infrastructure provider, and a top-three digital-advertising business — three wide-moat franchises under one roof, increasingly tied together by AI. The central tension is capital: Amazon deployed $131.8 billion of capex in 2025 and has guided to roughly $200 billion in 2026, a ~50% increase aimed squarely at AI data-centre capacity. That spend has compressed near-term free cash flow (TTM FCF fell to ~$11 billion) even as it underwrites the next leg of AWS growth."));
children.push(leadBullet("Bull case", "Three structurally advantaged businesses, AWS re-accelerating on AI, advertising and retail margins expanding, and a multiple (~29–33x) near five-year lows for a franchise compounding earnings ~30%."));
children.push(leadBullet("Bear case", "A ~$200 bn capex bet that depresses free cash flow and must earn its return; AWS faces aggressive cloud and AI competition; and any AI-demand air-pocket would leave a lot of stranded capacity and disappointed cash-flow expectations."));
children.push(leadBullet("Our read", "A rare combination of mega-cap scale, widening AI-cloud leadership, and a relatively undemanding multiple. The quality is unimpeachable; the open question is whether the historic capex cycle converts into durable returns rather than a margin and cash-flow drag."));
children.push(hr());

// ----------------------------------------------------- BUSINESS OVERVIEW -------
children.push(H1("2. Business Overview"));
children.push(P("Amazon reports across three segments — North America, International, and AWS — but the economic reality is four distinct engines: retail (first- and third-party), cloud (AWS), advertising, and subscriptions (Prime). AWS is the profit centre; retail provides scale, data and the customer relationship; advertising is the high-margin layer monetising that traffic."));
children.push(leadBullet("AWS — the profit engine", "The global cloud-infrastructure leader at a ~$150 bn annualized run-rate, AWS generated the bulk of Amazon's operating income (~$45.6 bn in FY2025). Q1'26 growth re-accelerated to 28% as generative-AI workloads, custom Trainium/Inferentia silicon, and Bedrock model services drove demand."));
children.push(leadBullet("Retail & logistics", "The largest Western e-commerce platform, underpinned by a fulfilment and logistics network that is itself a moat. Regionalisation and automation have steadily lifted North America and International retail margins."));
children.push(leadBullet("Advertising", "A fast-growing, high-margin business — Q4'25 advertising revenue was $21.3 bn (+22%) — monetising Amazon's first-party purchase data and Prime Video inventory. It is now one of the largest ad platforms globally and a key margin driver."));
children.push(leadBullet("Prime & subscriptions", "Prime membership locks in purchase frequency and loyalty, bundling shipping, video, music and more — the flywheel that feeds both retail and advertising."));
children.push(hr());

// -------------------------------------------------- FINANCIAL PERFORMANCE ------
children.push(H1("3. Financial Performance"));
children.push(H2("3.1 Full-year 2025"));
{
  const w = [3000, 1800, 1800, 1800];
  const rows = [
    row(["Metric", "FY2024", "FY2025", "YoY"], w, {1:{align:C},2:{align:C},3:{align:C}}),
    row(["Revenue", "$638 bn", "$717 bn", "+12%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Operating income", "$68.6 bn", "$80 bn", "+17%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Net income", "$59.2 bn", "$77.7 bn", "+31%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Operating cash flow (TTM)", "~$116 bn", "$139.5 bn", "+20%"], w, {1:{align:R},2:{align:R},3:{align:R,color:GREEN,bold:true}}),
    row(["Free cash flow (TTM)", "~$38 bn", "~$11.2 bn", "-71%"], w, {1:{align:R},2:{align:R},3:{align:R,color:RED,bold:true}}),
    row(["Capex", "~$83 bn", "$131.8 bn", "+59%"], w, {1:{align:R},2:{align:R},3:{align:R}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The story of 2025 is record profitability colliding with a record investment cycle: operating income and net income hit all-time highs, while free cash flow collapsed as capex surged to fund AI capacity. This is the crux of the Amazon debate — accounting earnings are strong, but cash generation is temporarily consumed by the build-out.", { italics: true }));
children.push(H2("3.2 Q1 2026 — acceleration with record margins"));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Q1 2026", "Change / note"], w, {1:{align:C},2:{align:C}}),
    row(["Revenue", "$181.5 bn", "+17% YoY (+15% ex-FX)"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Operating income", "$23.9 bn", "record 13.1% margin"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["AWS revenue", "$37.6 bn", "+28%; 15-qtr high"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["AWS operating income", "$14.2 bn", "$150 bn run-rate"], w, {1:{align:R,bold:true},2:{align:R,color:GREEN}}),
    row(["Beat vs guidance", "Above high end", "revenue & op. income"], w, {1:{align:R,bold:true},2:{align:R}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("AWS re-acceleration to 28% is the single most important data point — it validates the thesis that AI demand is converting into cloud consumption, and it directly underwrites the case for the elevated capex. The record 13.1% consolidated operating margin shows retail and advertising leverage building in parallel.", { italics: true }));
children.push(hr());

// --------------------------------------------------------- THE MOAT ------------
children.push(H1("4. Competitive Moat"));
children.push(P("Amazon is one of a small handful of businesses with multiple, mutually reinforcing moats. Each franchise would be a wide-moat company on its own; together they form an ecosystem with formidable switching costs, scale advantages, and data network effects."));
children.push(leadBullet("AWS switching costs & scale", "Enterprises build their stacks on AWS primitives; migrating is costly and risky. Scale funds custom silicon (Trainium/Inferentia), the broadest service catalogue, and price/performance leadership that sub-scale rivals struggle to match."));
children.push(leadBullet("Logistics network effects", "Decades and hundreds of billions of dollars have built a fulfilment and last-mile network that is effectively impossible to replicate. More volume lowers unit cost, which improves selection and speed, which drives more volume."));
children.push(leadBullet("Data & advertising flywheel", "First-party purchase intent data makes Amazon advertising uniquely effective, monetising the retail platform at software-like margins and reinforcing the retail business it sits on."));
children.push(leadBullet("Prime ecosystem lock-in", "Prime bundles shipping, media and services into a loyalty engine that raises frequency and retention across the entire ecosystem."));
children.push(moatBox("9", "A genuine wide-moat compounder: three structurally advantaged businesses — cloud, e-commerce/logistics, and advertising — bound together by Prime and an AI/data flywheel, with switching costs, scale economics and network effects reinforcing one another."));
children.push(P("Why a 9 and not a perfect 10? The moats are exceptionally wide and durable, but each faces credible, well-capitalised competition — Microsoft Azure and Google Cloud in the cloud/AI race, Walmart and others in retail, and Meta/Google/Walmart in advertising. The franchise is about as defensible as a company of this scale can be, but it is not an uncontested monopoly, and the AI infrastructure war is intensifying."));
children.push(hr());

// ----------------------------------------------------------- GROWTH DRIVERS ----
children.push(H1("5. Growth Drivers"));
children.push(leadBullet("AI / AWS", "Generative-AI workloads (Bedrock, custom Trainium silicon, agentic services) are re-accelerating AWS — the largest and most profitable growth vector. The $150 bn run-rate is growing at 28% with a long runway as enterprise AI adoption scales."));
children.push(leadBullet("Advertising", "Among the fastest-growing large ad platforms (>20%), monetising purchase data and Prime Video inventory at high incremental margins — a powerful and under-appreciated profit driver."));
children.push(leadBullet("Retail margin expansion", "Network regionalisation, automation and robotics continue to lower cost-to-serve, lifting North America and International segment margins toward structurally higher levels."));
children.push(leadBullet("Operating leverage", "The record 13.1% Q1'26 operating margin shows the model's mix shift toward high-margin cloud and advertising is compounding profitability faster than revenue."));
children.push(leadBullet("Capex-to-returns", "If the ~$200 bn 2026 capex build converts into AWS revenue at historical returns, today's depressed free cash flow inverts into a powerful FCF recovery in 2027+."));
children.push(hr());

// --------------------------------------------------------------- VALUATION -----
children.push(H1("6. Valuation"));
children.push(P("Amazon is highly profitable on an earnings basis, so it trades on P/E and forward cash flow — but the multiple sits near five-year lows precisely because the capex cycle has temporarily suppressed free cash flow and spooked cash-flow-focused investors."));
{
  const w = [3600, 2400, 2400];
  const rows = [
    row(["Metric", "Approx.", "Comment"], w, {1:{align:C}}),
    row(["Market cap", "~$2.6 tn", "mega-cap"], w, {1:{align:R,bold:true}}),
    row(["Share price", "~$246", "early Jun 2026"], w, {1:{align:R}}),
    row(["P/E (trailing)", "~29–33x", "near 5-yr lows"], w, {1:{align:R}}),
    row(["P/E (forward)", "~31x", "on rising EPS"], w, {1:{align:R}}),
    row(["Net income growth", "+31%", "FY2025"], w, {1:{align:R,color:GREEN,bold:true}}),
    row(["Operating margin", "13.1%", "record (Q1'26)"], w, {1:{align:R,color:GREEN,bold:true}}),
    row(["FCF yield", "low / depressed", "capex-driven"], w, {1:{align:R,color:RED}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(leadBullet("The bull framing", "A ~29–33x multiple is undemanding for a business growing earnings ~30% with AWS re-accelerating and high-margin advertising compounding. On normalised post-capex free cash flow, the stock looks inexpensive versus its own history and its mega-cap peers."));
children.push(leadBullet("The bear framing", "On reported free cash flow the stock is optically expensive; the entire thesis rests on a ~$200 bn capex bet paying off. If AI demand disappoints or returns on the build fall short, both earnings and the multiple are exposed."));
children.push(hr());

// ----------------------------------------------- PRICE TARGET & SCENARIOS ------
children.push(H1("7. Price Target & Scenario Analysis"));
children.push(P("We frame three illustrative, probability-weighted outcomes anchored to the ~$246 spot price. The dominant variable is whether the AI/AWS capex cycle converts into durable cloud growth and a free-cash-flow recovery."));
{
  const w = [1700, 1300, 1500, 1500, 1400];
  const rows = [
    row(["Scenario", "Prob.", "Core assumption", "12–18m target", "vs spot"], w, {1:{align:C},3:{align:C},4:{align:C}}),
    row(["Bull", "30%", "AWS sustains ~25%+; capex earns returns; margins expand", "$320", "+30%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN,bold:true}}),
    row(["Base", "45%", "AWS ~20%; retail & ad margins grind higher; FCF normalises", "$280", "+14%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:GREEN}}),
    row(["Bear", "25%", "AI demand cools; capex strands; AWS decelerates; FCF stays weak", "$190", "-23%"], w,
        {1:{align:C},3:{align:R,bold:true},4:{align:R,color:RED,bold:true}}),
    row(["Weighted", "100%", "Probability-weighted expected value", "$270", "+10%"], w,
        {0:{bold:true,fill:LIGHT},1:{align:C,bold:true,fill:LIGHT},2:{bold:true,fill:LIGHT},3:{align:R,bold:true,fill:LIGHT},4:{align:R,bold:true,fill:LIGHT}}),
  ];
  children.push(table(rows, w));
}
children.push(P(""));
children.push(P("The probability-weighted target sits ~10% above spot with a favourable skew: the bull case is a credible ~30% upside if the AI capex compounds, while the bear downside (~23%) is cushioned by record earnings, a near-trough multiple, and multiple profit engines. This is a quality compounder where the capex cycle — not the franchise — drives the risk.", { italics: true }));
children.push(leadBullet("Bull triggers", "AWS growth holding 25%+; visible free-cash-flow recovery as capacity monetises; continued advertising and retail-margin expansion; AI service traction (Bedrock, agents, custom silicon)."));
children.push(leadBullet("Bear triggers", "AWS deceleration; AI-demand air-pocket leaving stranded capacity; capex overruns beyond $200 bn with no FCF recovery; competitive share loss to Azure/Google Cloud."));
children.push(hr());

// ------------------------------------------------------------------ RISKS ------
children.push(H1("8. Key Risks"));
children.push(leadBullet("Capex / free-cash-flow risk", "The ~$200 bn 2026 capex plan (up ~50%) has depressed FCF and must convert into AWS returns; a shortfall would pressure both cash flow and sentiment."));
children.push(leadBullet("AI-demand durability", "Much of the AWS re-acceleration and the capex case rests on sustained generative-AI demand; a slowdown would strand capacity and disappoint expectations."));
children.push(leadBullet("Cloud competition", "Microsoft Azure and Google Cloud are formidable, well-funded rivals in both cloud and AI infrastructure, pressuring growth and pricing."));
children.push(leadBullet("Regulatory / antitrust", "Amazon faces ongoing antitrust scrutiny (FTC and global regulators) across retail, marketplace practices and bundling, a structural overhang."));
children.push(leadBullet("Retail cyclicality & tariffs", "Consumer-spending softness, FX, and tariff/trade policy can pressure the lower-margin retail segments and international results."));
children.push(leadBullet("Execution & scale complexity", "Managing a ~$700 bn-revenue, multi-business empire and a historic infrastructure build introduces operational and capital-allocation risk."));
children.push(hr());

// -------------------------------------------------------- INVESTMENT VIEW ------
children.push(H1("9. Investment View"));
children.push(P("Amazon is a rare asset: three wide-moat businesses — the world's leading cloud platform, the dominant Western e-commerce and logistics network, and a top-tier advertising engine — compounding together inside one ecosystem. FY2025 delivered record operating and net income, and Q1 2026's 28% AWS re-acceleration is hard evidence that AI demand is now flowing into the most profitable part of the company."));
children.push(P("The debate is not about quality but about the capital cycle. Amazon is making a historic ~$200 bn bet on AI infrastructure that has temporarily collapsed free cash flow and pushed the multiple near five-year lows. If that build earns its return — and the AWS re-acceleration suggests it is starting to — both earnings and cash flow inflect higher from an already-cheap base. If AI demand stalls, the company is left holding expensive, under-utilised capacity."));
children.push(P("Our probability-weighted scenario work (Section 7) implies fair value near $270 — about 10% above the ~$246 spot — with a favourable skew given the record earnings, near-trough multiple, and diversified profit engines cushioning the downside. We would treat Amazon as a high-conviction, core mega-cap holding: own the quality and the AI-cloud optionality, and accumulate on capex-driven weakness, sized to ride out a multi-year investment cycle.", { italics: false }));
children.push(leadBullet("Suitable for", "Long-term, quality-oriented investors who want diversified exposure to cloud/AI, e-commerce and advertising and can look through a near-term free-cash-flow trough."));
children.push(leadBullet("Less suitable for", "Investors who value reported free cash flow today or want to avoid the binary risk on a historic AI capex bet."));
children.push(leadBullet("Watch items", "AWS growth trajectory and backlog; quarterly capex vs the ~$200 bn guide and any FCF recovery; advertising growth; retail segment margins; antitrust developments; AI service adoption (Bedrock, agents, Trainium)."));

disclaimer(children);

const doc = makeDoc("Amazon.com, Inc. — Equity Research", children);
save(doc, "/home/user/fundbello/Amazon_Equity_Research_2026.docx");
