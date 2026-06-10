export type HoldingAction = "new" | "add" | "trim" | "hold" | "exit";

export interface Holding {
  ticker: string;
  company: string;
  weight: number; // % of portfolio
  value: number; // USD
  shares: number;
  action: HoldingAction;
  changePct: number; // share count change vs prior quarter
}

export interface Activity {
  quarter: string;
  ticker: string;
  company: string;
  action: HoldingAction;
  detail: string;
  impact: number; // % of portfolio affected
}

export interface SectorSlice {
  sector: string;
  pct: number;
}

export interface Investor {
  slug: string;
  name: string;
  firm: string;
  country: string;
  countryCode: string;
  strategy: string;
  styleTags: string[];
  aum: number; // USD
  since: number;
  cagr: number; // long-run annualized %
  qoqChange: number; // portfolio value change vs last quarter %
  turnover: number; // %
  concentration: number; // top-10 weight %
  holdingsCount: number;
  philosophy: string;
  performance: number[]; // indexed series for sparkline
  sectors: SectorSlice[];
  holdings: Holding[];
  activity: Activity[];
}

export const LATEST_QUARTER = "Q1 2026";

export const investors: Investor[] = [
  {
    slug: "warren-buffett",
    name: "Warren Buffett",
    firm: "Berkshire Hathaway",
    country: "United States",
    countryCode: "US",
    strategy: "Quality Value",
    styleTags: ["Value", "Buy & Hold", "Mega Cap"],
    aum: 313_400_000_000,
    since: 1965,
    cagr: 19.8,
    qoqChange: 3.2,
    turnover: 2.1,
    concentration: 87.4,
    holdingsCount: 41,
    philosophy:
      "Price is what you pay. Value is what you get. Our favorite holding period is forever.",
    performance: [100, 112, 126, 121, 138, 155, 149, 171, 188, 196, 214, 231],
    sectors: [
      { sector: "Technology", pct: 28.4 },
      { sector: "Financials", pct: 34.6 },
      { sector: "Consumer Staples", pct: 16.8 },
      { sector: "Energy", pct: 12.9 },
      { sector: "Other", pct: 7.3 },
    ],
    holdings: [
      { ticker: "AAPL", company: "Apple Inc.", weight: 24.1, value: 75_530_000_000, shares: 300_000_000, action: "hold", changePct: 0 },
      { ticker: "AXP", company: "American Express", weight: 15.6, value: 48_890_000_000, shares: 151_610_700, action: "hold", changePct: 0 },
      { ticker: "BAC", company: "Bank of America", weight: 9.8, value: 30_710_000_000, shares: 680_233_587, action: "trim", changePct: -7.4 },
      { ticker: "KO", company: "Coca-Cola", weight: 9.2, value: 28_830_000_000, shares: 400_000_000, action: "hold", changePct: 0 },
      { ticker: "CVX", company: "Chevron", weight: 7.5, value: 23_500_000_000, shares: 122_064_792, action: "add", changePct: 3.1 },
      { ticker: "OXY", company: "Occidental Petroleum", weight: 5.4, value: 16_920_000_000, shares: 264_178_414, action: "add", changePct: 4.7 },
      { ticker: "MCO", company: "Moody's Corp", weight: 3.9, value: 12_220_000_000, shares: 24_669_778, action: "hold", changePct: 0 },
      { ticker: "UNH", company: "UnitedHealth Group", weight: 2.8, value: 8_770_000_000, shares: 17_840_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "UNH", company: "UnitedHealth Group", action: "new", detail: "Opened a new position of 17.8M shares", impact: 2.8 },
      { quarter: "Q1 2026", ticker: "OXY", company: "Occidental Petroleum", action: "add", detail: "Added 11.9M shares, +4.7%", impact: 0.3 },
      { quarter: "Q4 2025", ticker: "BAC", company: "Bank of America", action: "trim", detail: "Sold 54.3M shares, -7.4%", impact: -0.9 },
      { quarter: "Q4 2025", ticker: "CVX", company: "Chevron", action: "add", detail: "Added 3.7M shares, +3.1%", impact: 0.2 },
      { quarter: "Q3 2025", ticker: "HPQ", company: "HP Inc.", action: "exit", detail: "Closed remaining 22.9M share position", impact: -0.6 },
    ],
  },
  {
    slug: "bill-ackman",
    name: "Bill Ackman",
    firm: "Pershing Square Capital",
    country: "United States",
    countryCode: "US",
    strategy: "Concentrated Activist",
    styleTags: ["Activist", "Concentrated", "Large Cap"],
    aum: 13_900_000_000,
    since: 2004,
    cagr: 16.1,
    qoqChange: 5.8,
    turnover: 11.3,
    concentration: 100,
    holdingsCount: 9,
    philosophy:
      "We seek simple, predictable, free-cash-flow-generative businesses with formidable barriers to entry.",
    performance: [100, 109, 98, 117, 131, 128, 147, 162, 158, 176, 191, 203],
    sectors: [
      { sector: "Consumer Discretionary", pct: 38.2 },
      { sector: "Real Estate", pct: 17.1 },
      { sector: "Industrials", pct: 16.4 },
      { sector: "Technology", pct: 15.8 },
      { sector: "Financials", pct: 12.5 },
    ],
    holdings: [
      { ticker: "UMG", company: "Universal Music Group", weight: 19.4, value: 2_700_000_000, shares: 97_500_000, action: "hold", changePct: 0 },
      { ticker: "QSR", company: "Restaurant Brands Intl", weight: 16.2, value: 2_250_000_000, shares: 33_270_000, action: "hold", changePct: 0 },
      { ticker: "HLT", company: "Hilton Worldwide", weight: 14.5, value: 2_020_000_000, shares: 8_950_000, action: "trim", changePct: -12.2 },
      { ticker: "GOOGL", company: "Alphabet Inc.", weight: 13.8, value: 1_920_000_000, shares: 9_380_000, action: "add", changePct: 8.6 },
      { ticker: "HHH", company: "Howard Hughes Holdings", weight: 12.1, value: 1_680_000_000, shares: 18_850_000, action: "hold", changePct: 0 },
      { ticker: "CMG", company: "Chipotle Mexican Grill", weight: 10.9, value: 1_520_000_000, shares: 28_300_000, action: "trim", changePct: -4.8 },
      { ticker: "CP", company: "Canadian Pacific KC", weight: 9.6, value: 1_330_000_000, shares: 14_960_000, action: "hold", changePct: 0 },
      { ticker: "NKE", company: "Nike Inc.", weight: 3.5, value: 490_000_000, shares: 6_200_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "NKE", company: "Nike Inc.", action: "new", detail: "Initiated 6.2M share stake", impact: 3.5 },
      { quarter: "Q1 2026", ticker: "GOOGL", company: "Alphabet Inc.", action: "add", detail: "Added 743K shares, +8.6%", impact: 1.1 },
      { quarter: "Q4 2025", ticker: "HLT", company: "Hilton Worldwide", action: "trim", detail: "Sold 1.2M shares, -12.2%", impact: -2.0 },
      { quarter: "Q3 2025", ticker: "CMG", company: "Chipotle Mexican Grill", action: "trim", detail: "Sold 1.4M shares, -4.8%", impact: -0.5 },
    ],
  },
  {
    slug: "michael-burry",
    name: "Michael Burry",
    firm: "Scion Asset Management",
    country: "United States",
    countryCode: "US",
    strategy: "Contrarian Deep Value",
    styleTags: ["Contrarian", "Deep Value", "Macro"],
    aum: 197_000_000,
    since: 2000,
    cagr: 23.4,
    qoqChange: -8.1,
    turnover: 68.7,
    concentration: 100,
    holdingsCount: 11,
    philosophy:
      "My strategy is exceedingly simple: I try to buy shares of unpopular companies when they look like roadkill.",
    performance: [100, 131, 92, 148, 121, 176, 142, 196, 164, 221, 188, 243],
    sectors: [
      { sector: "Technology", pct: 31.6 },
      { sector: "Consumer Discretionary", pct: 26.3 },
      { sector: "Healthcare", pct: 19.8 },
      { sector: "Communication", pct: 13.4 },
      { sector: "Energy", pct: 8.9 },
    ],
    holdings: [
      { ticker: "BABA", company: "Alibaba Group ADR", weight: 18.2, value: 35_900_000, shares: 380_000, action: "add", changePct: 26.7 },
      { ticker: "JD", company: "JD.com ADR", weight: 14.7, value: 29_000_000, shares: 690_000, action: "add", changePct: 15.0 },
      { ticker: "EL", company: "Estée Lauder", weight: 12.9, value: 25_400_000, shares: 290_000, action: "new", changePct: 100 },
      { ticker: "HCA", company: "HCA Healthcare", weight: 11.8, value: 23_300_000, shares: 65_000, action: "hold", changePct: 0 },
      { ticker: "GOOGL", company: "Alphabet Inc.", weight: 10.6, value: 20_900_000, shares: 102_000, action: "trim", changePct: -22.4 },
      { ticker: "PDD", company: "PDD Holdings ADR", weight: 9.4, value: 18_500_000, shares: 152_000, action: "new", changePct: 100 },
      { ticker: "CI", company: "The Cigna Group", weight: 8.3, value: 16_400_000, shares: 49_000, action: "hold", changePct: 0 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "EL", company: "Estée Lauder", action: "new", detail: "New 290K share position", impact: 12.9 },
      { quarter: "Q1 2026", ticker: "PDD", company: "PDD Holdings", action: "new", detail: "New 152K share position", impact: 9.4 },
      { quarter: "Q1 2026", ticker: "BABA", company: "Alibaba Group", action: "add", detail: "Added 80K shares, +26.7%", impact: 3.8 },
      { quarter: "Q4 2025", ticker: "GOOGL", company: "Alphabet Inc.", action: "trim", detail: "Sold 29.5K shares, -22.4%", impact: -3.1 },
      { quarter: "Q4 2025", ticker: "SBUX", company: "Starbucks", action: "exit", detail: "Closed 185K share position", impact: -7.2 },
    ],
  },
  {
    slug: "terry-smith",
    name: "Terry Smith",
    firm: "Fundsmith Equity",
    country: "United Kingdom",
    countryCode: "GB",
    strategy: "Quality Growth",
    styleTags: ["Quality", "Global", "Buy & Hold"],
    aum: 28_600_000_000,
    since: 2010,
    cagr: 15.7,
    qoqChange: 2.4,
    turnover: 4.6,
    concentration: 64.2,
    holdingsCount: 27,
    philosophy:
      "Buy good companies. Don't overpay. Do nothing. Quality compounds while you sleep.",
    performance: [100, 114, 127, 139, 133, 158, 172, 168, 189, 204, 217, 229],
    sectors: [
      { sector: "Consumer Staples", pct: 29.7 },
      { sector: "Technology", pct: 26.1 },
      { sector: "Healthcare", pct: 22.8 },
      { sector: "Consumer Discretionary", pct: 12.6 },
      { sector: "Industrials", pct: 8.8 },
    ],
    holdings: [
      { ticker: "META", company: "Meta Platforms", weight: 9.1, value: 2_600_000_000, shares: 4_120_000, action: "hold", changePct: 0 },
      { ticker: "MSFT", company: "Microsoft Corp", weight: 8.4, value: 2_400_000_000, shares: 5_530_000, action: "hold", changePct: 0 },
      { ticker: "NOVO-B", company: "Novo Nordisk", weight: 7.6, value: 2_170_000_000, shares: 24_800_000, action: "add", changePct: 6.2 },
      { ticker: "LOR", company: "L'Oréal SA", weight: 6.9, value: 1_970_000_000, shares: 4_710_000, action: "hold", changePct: 0 },
      { ticker: "PM", company: "Philip Morris Intl", weight: 6.4, value: 1_830_000_000, shares: 14_900_000, action: "trim", changePct: -3.5 },
      { ticker: "STR", company: "Stryker Corp", weight: 5.8, value: 1_660_000_000, shares: 4_320_000, action: "hold", changePct: 0 },
      { ticker: "ADP", company: "Automatic Data Processing", weight: 5.2, value: 1_490_000_000, shares: 4_870_000, action: "add", changePct: 2.4 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "NOVO-B", company: "Novo Nordisk", action: "add", detail: "Added 1.4M shares, +6.2%", impact: 0.4 },
      { quarter: "Q1 2026", ticker: "ADP", company: "ADP", action: "add", detail: "Added 114K shares, +2.4%", impact: 0.1 },
      { quarter: "Q4 2025", ticker: "PM", company: "Philip Morris", action: "trim", detail: "Sold 540K shares, -3.5%", impact: -0.2 },
      { quarter: "Q3 2025", ticker: "DGE", company: "Diageo plc", action: "exit", detail: "Closed long-standing position", impact: -3.1 },
    ],
  },
  {
    slug: "chris-hohn",
    name: "Sir Christopher Hohn",
    firm: "TCI Fund Management",
    country: "United Kingdom",
    countryCode: "GB",
    strategy: "Concentrated Activist",
    styleTags: ["Activist", "Infrastructure", "Concentrated"],
    aum: 46_800_000_000,
    since: 2003,
    cagr: 18.3,
    qoqChange: 4.1,
    turnover: 6.8,
    concentration: 94.6,
    holdingsCount: 12,
    philosophy:
      "We invest in high-quality, predictable businesses with deep moats — irreplaceable infrastructure at the heart of the economy.",
    performance: [100, 116, 124, 141, 136, 161, 178, 174, 198, 213, 226, 244],
    sectors: [
      { sector: "Industrials", pct: 32.4 },
      { sector: "Technology", pct: 27.9 },
      { sector: "Financials", pct: 18.6 },
      { sector: "Communication", pct: 13.2 },
      { sector: "Other", pct: 7.9 },
    ],
    holdings: [
      { ticker: "GE", company: "GE Aerospace", weight: 17.8, value: 8_330_000_000, shares: 44_200_000, action: "hold", changePct: 0 },
      { ticker: "MSFT", company: "Microsoft Corp", weight: 15.2, value: 7_110_000_000, shares: 16_400_000, action: "add", changePct: 5.3 },
      { ticker: "MCO", company: "Moody's Corp", weight: 13.6, value: 6_360_000_000, shares: 12_840_000, action: "hold", changePct: 0 },
      { ticker: "V", company: "Visa Inc.", weight: 12.9, value: 6_040_000_000, shares: 18_700_000, action: "hold", changePct: 0 },
      { ticker: "GOOGL", company: "Alphabet Inc.", weight: 11.4, value: 5_330_000_000, shares: 26_050_000, action: "add", changePct: 3.8 },
      { ticker: "SPGI", company: "S&P Global", weight: 10.7, value: 5_010_000_000, shares: 9_120_000, action: "hold", changePct: 0 },
      { ticker: "CNI", company: "Canadian National Railway", weight: 8.2, value: 3_840_000_000, shares: 35_600_000, action: "trim", changePct: -5.1 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "MSFT", company: "Microsoft Corp", action: "add", detail: "Added 825K shares, +5.3%", impact: 0.8 },
      { quarter: "Q1 2026", ticker: "GOOGL", company: "Alphabet Inc.", action: "add", detail: "Added 953K shares, +3.8%", impact: 0.4 },
      { quarter: "Q4 2025", ticker: "CNI", company: "Canadian National Railway", action: "trim", detail: "Sold 1.9M shares, -5.1%", impact: -0.4 },
    ],
  },
  {
    slug: "li-lu",
    name: "Li Lu",
    firm: "Himalaya Capital",
    country: "United States",
    countryCode: "US",
    strategy: "Global Value",
    styleTags: ["Value", "Asia", "Concentrated"],
    aum: 2_900_000_000,
    since: 1997,
    cagr: 19.4,
    qoqChange: 6.7,
    turnover: 5.2,
    concentration: 100,
    holdingsCount: 7,
    philosophy:
      "The essence of investing is to predict the future, and accuracy of prediction comes from deep, patient research.",
    performance: [100, 118, 109, 134, 152, 144, 171, 189, 182, 208, 227, 251],
    sectors: [
      { sector: "Financials", pct: 41.3 },
      { sector: "Technology", pct: 33.8 },
      { sector: "Communication", pct: 16.2 },
      { sector: "Consumer Discretionary", pct: 8.7 },
    ],
    holdings: [
      { ticker: "BAC", company: "Bank of America", weight: 24.6, value: 713_000_000, shares: 15_800_000, action: "hold", changePct: 0 },
      { ticker: "GOOGL", company: "Alphabet Inc.", weight: 21.8, value: 632_000_000, shares: 3_090_000, action: "add", changePct: 7.2 },
      { ticker: "BRK-B", company: "Berkshire Hathaway B", weight: 18.4, value: 534_000_000, shares: 1_140_000, action: "hold", changePct: 0 },
      { ticker: "EWBC", company: "East West Bancorp", weight: 16.7, value: 484_000_000, shares: 4_660_000, action: "hold", changePct: 0 },
      { ticker: "AAPL", company: "Apple Inc.", weight: 10.3, value: 299_000_000, shares: 1_190_000, action: "trim", changePct: -9.6 },
      { ticker: "PDD", company: "PDD Holdings ADR", weight: 8.2, value: 238_000_000, shares: 1_950_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "PDD", company: "PDD Holdings", action: "new", detail: "New 1.95M share position", impact: 8.2 },
      { quarter: "Q1 2026", ticker: "GOOGL", company: "Alphabet Inc.", action: "add", detail: "Added 207K shares, +7.2%", impact: 1.5 },
      { quarter: "Q4 2025", ticker: "AAPL", company: "Apple Inc.", action: "trim", detail: "Sold 126K shares, -9.6%", impact: -1.1 },
    ],
  },
  {
    slug: "seth-klarman",
    name: "Seth Klarman",
    firm: "Baupost Group",
    country: "United States",
    countryCode: "US",
    strategy: "Deep Value & Distressed",
    styleTags: ["Deep Value", "Special Situations", "Patient"],
    aum: 22_400_000_000,
    since: 1982,
    cagr: 14.8,
    qoqChange: 1.3,
    turnover: 19.4,
    concentration: 71.8,
    holdingsCount: 24,
    philosophy:
      "The avoidance of loss is the surest way to ensure a profitable outcome. Margin of safety above all.",
    performance: [100, 108, 117, 113, 127, 136, 131, 148, 159, 154, 169, 178],
    sectors: [
      { sector: "Communication", pct: 30.6 },
      { sector: "Technology", pct: 24.9 },
      { sector: "Energy", pct: 17.3 },
      { sector: "Financials", pct: 15.4 },
      { sector: "Other", pct: 11.8 },
    ],
    holdings: [
      { ticker: "LBTYK", company: "Liberty Global C", weight: 14.2, value: 950_000_000, shares: 48_300_000, action: "hold", changePct: 0 },
      { ticker: "GOOGL", company: "Alphabet Inc.", weight: 12.8, value: 856_000_000, shares: 4_180_000, action: "add", changePct: 11.4 },
      { ticker: "WSC", company: "WillScot Holdings", weight: 11.4, value: 763_000_000, shares: 19_700_000, action: "hold", changePct: 0 },
      { ticker: "CRH", company: "CRH plc", weight: 10.6, value: 709_000_000, shares: 7_540_000, action: "add", changePct: 4.9 },
      { ticker: "FIS", company: "Fidelity National Info", weight: 9.3, value: 622_000_000, shares: 7_710_000, action: "trim", changePct: -14.7 },
      { ticker: "JLL", company: "Jones Lang LaSalle", weight: 7.8, value: 522_000_000, shares: 1_920_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "JLL", company: "Jones Lang LaSalle", action: "new", detail: "New 1.9M share position", impact: 7.8 },
      { quarter: "Q1 2026", ticker: "GOOGL", company: "Alphabet Inc.", action: "add", detail: "Added 428K shares, +11.4%", impact: 1.3 },
      { quarter: "Q4 2025", ticker: "FIS", company: "Fidelity National Info", action: "trim", detail: "Sold 1.3M shares, -14.7%", impact: -1.6 },
    ],
  },
  {
    slug: "david-tepper",
    name: "David Tepper",
    firm: "Appaloosa Management",
    country: "United States",
    countryCode: "US",
    strategy: "Opportunistic Macro",
    styleTags: ["Macro", "Distressed", "Aggressive"],
    aum: 6_700_000_000,
    since: 1993,
    cagr: 25.2,
    qoqChange: -2.6,
    turnover: 41.5,
    concentration: 82.3,
    holdingsCount: 19,
    philosophy:
      "The key is to wait. Sometimes the hardest thing to do is to do nothing — then bet big when others panic.",
    performance: [100, 127, 113, 149, 168, 151, 184, 209, 193, 228, 247, 239],
    sectors: [
      { sector: "Technology", pct: 38.9 },
      { sector: "Communication", pct: 22.7 },
      { sector: "Consumer Discretionary", pct: 18.4 },
      { sector: "Energy", pct: 11.6 },
      { sector: "Other", pct: 8.4 },
    ],
    holdings: [
      { ticker: "BABA", company: "Alibaba Group ADR", weight: 15.7, value: 1_050_000_000, shares: 11_100_000, action: "trim", changePct: -8.3 },
      { ticker: "NVDA", company: "NVIDIA Corp", weight: 13.4, value: 898_000_000, shares: 6_420_000, action: "add", changePct: 18.2 },
      { ticker: "AMZN", company: "Amazon.com", weight: 12.6, value: 844_000_000, shares: 3_840_000, action: "hold", changePct: 0 },
      { ticker: "META", company: "Meta Platforms", weight: 11.2, value: 750_000_000, shares: 1_190_000, action: "add", changePct: 6.7 },
      { ticker: "MSFT", company: "Microsoft Corp", weight: 9.8, value: 657_000_000, shares: 1_510_000, action: "hold", changePct: 0 },
      { ticker: "PDD", company: "PDD Holdings ADR", weight: 8.4, value: 563_000_000, shares: 4_620_000, action: "trim", changePct: -11.9 },
      { ticker: "UBER", company: "Uber Technologies", weight: 6.9, value: 462_000_000, shares: 5_710_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "UBER", company: "Uber Technologies", action: "new", detail: "New 5.7M share position", impact: 6.9 },
      { quarter: "Q1 2026", ticker: "NVDA", company: "NVIDIA Corp", action: "add", detail: "Added 988K shares, +18.2%", impact: 2.1 },
      { quarter: "Q4 2025", ticker: "BABA", company: "Alibaba Group", action: "trim", detail: "Sold 1.0M shares, -8.3%", impact: -1.4 },
      { quarter: "Q4 2025", ticker: "PDD", company: "PDD Holdings", action: "trim", detail: "Sold 624K shares, -11.9%", impact: -1.1 },
    ],
  },
  {
    slug: "howard-marks",
    name: "Howard Marks",
    firm: "Oaktree Capital",
    country: "United States",
    countryCode: "US",
    strategy: "Credit & Contrarian",
    styleTags: ["Credit", "Contrarian", "Cycles"],
    aum: 9_200_000_000,
    since: 1995,
    cagr: 13.6,
    qoqChange: 0.8,
    turnover: 23.7,
    concentration: 68.9,
    holdingsCount: 36,
    philosophy:
      "You can't predict. You can prepare. The most important thing is knowing where we stand in the cycle.",
    performance: [100, 106, 113, 109, 121, 128, 124, 137, 146, 142, 153, 161],
    sectors: [
      { sector: "Energy", pct: 26.8 },
      { sector: "Financials", pct: 23.1 },
      { sector: "Utilities", pct: 19.7 },
      { sector: "Industrials", pct: 17.2 },
      { sector: "Other", pct: 13.2 },
    ],
    holdings: [
      { ticker: "TRMD", company: "TORM plc", weight: 13.8, value: 1_270_000_000, shares: 38_400_000, action: "hold", changePct: 0 },
      { ticker: "CWEN", company: "Clearway Energy", weight: 11.6, value: 1_070_000_000, shares: 36_700_000, action: "hold", changePct: 0 },
      { ticker: "STR", company: "Sitio Royalties", weight: 9.7, value: 893_000_000, shares: 37_900_000, action: "add", changePct: 5.6 },
      { ticker: "VST", company: "Vistra Corp", weight: 8.9, value: 819_000_000, shares: 5_240_000, action: "trim", changePct: -16.8 },
      { ticker: "GTX", company: "Garrett Motion", weight: 7.4, value: 681_000_000, shares: 64_200_000, action: "hold", changePct: 0 },
      { ticker: "IHRT", company: "iHeartMedia", weight: 5.8, value: 534_000_000, shares: 89_600_000, action: "add", changePct: 9.2 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "IHRT", company: "iHeartMedia", action: "add", detail: "Added 7.5M shares, +9.2%", impact: 0.5 },
      { quarter: "Q1 2026", ticker: "STR", company: "Sitio Royalties", action: "add", detail: "Added 2.0M shares, +5.6%", impact: 0.5 },
      { quarter: "Q4 2025", ticker: "VST", company: "Vistra Corp", action: "trim", detail: "Sold 1.1M shares, -16.8%", impact: -1.8 },
    ],
  },
  {
    slug: "mohnish-pabrai",
    name: "Mohnish Pabrai",
    firm: "Pabrai Investment Funds",
    country: "United States",
    countryCode: "US",
    strategy: "Focused Value",
    styleTags: ["Value", "Cloning", "Emerging Markets"],
    aum: 1_100_000_000,
    since: 1999,
    cagr: 17.9,
    qoqChange: 4.9,
    turnover: 28.3,
    concentration: 100,
    holdingsCount: 5,
    philosophy:
      "Heads I win, tails I don't lose much. I am a shameless cloner of great investors' best ideas.",
    performance: [100, 121, 107, 139, 126, 158, 174, 162, 191, 213, 198, 224],
    sectors: [
      { sector: "Energy", pct: 47.2 },
      { sector: "Materials", pct: 28.6 },
      { sector: "Financials", pct: 14.8 },
      { sector: "Industrials", pct: 9.4 },
    ],
    holdings: [
      { ticker: "AMR", company: "Alpha Metallurgical Resources", weight: 32.4, value: 356_000_000, shares: 1_480_000, action: "trim", changePct: -6.2 },
      { ticker: "CNX", company: "CNX Resources", weight: 28.1, value: 309_000_000, shares: 9_840_000, action: "hold", changePct: 0 },
      { ticker: "ARCH", company: "Core Natural Resources", weight: 21.7, value: 239_000_000, shares: 2_310_000, action: "hold", changePct: 0 },
      { ticker: "WFG", company: "West Fraser Timber", weight: 11.2, value: 123_000_000, shares: 1_420_000, action: "add", changePct: 12.8 },
      { ticker: "BTI", company: "British American Tobacco", weight: 6.6, value: 73_000_000, shares: 1_870_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "BTI", company: "British American Tobacco", action: "new", detail: "New 1.9M share position", impact: 6.6 },
      { quarter: "Q1 2026", ticker: "WFG", company: "West Fraser Timber", action: "add", detail: "Added 161K shares, +12.8%", impact: 1.3 },
      { quarter: "Q4 2025", ticker: "AMR", company: "Alpha Metallurgical", action: "trim", detail: "Sold 98K shares, -6.2%", impact: -2.1 },
    ],
  },
  {
    slug: "ray-dalio",
    name: "Ray Dalio",
    firm: "Bridgewater Associates",
    country: "United States",
    countryCode: "US",
    strategy: "Global Macro",
    styleTags: ["Macro", "Diversified", "All Weather"],
    aum: 17_600_000_000,
    since: 1975,
    cagr: 11.4,
    qoqChange: 1.9,
    turnover: 34.2,
    concentration: 38.4,
    holdingsCount: 720,
    philosophy:
      "Diversifying well is the most important thing you need to do in order to invest well. Pain plus reflection equals progress.",
    performance: [100, 105, 111, 108, 116, 123, 119, 128, 134, 131, 139, 146],
    sectors: [
      { sector: "ETFs & Index", pct: 34.7 },
      { sector: "Technology", pct: 18.9 },
      { sector: "Consumer Staples", pct: 16.3 },
      { sector: "Healthcare", pct: 14.6 },
      { sector: "Other", pct: 15.5 },
    ],
    holdings: [
      { ticker: "SPY", company: "SPDR S&P 500 ETF", weight: 11.3, value: 1_990_000_000, shares: 3_280_000, action: "add", changePct: 7.8 },
      { ticker: "IVV", company: "iShares Core S&P 500", weight: 8.6, value: 1_510_000_000, shares: 2_470_000, action: "hold", changePct: 0 },
      { ticker: "IEMG", company: "iShares Core MSCI EM", weight: 7.4, value: 1_300_000_000, shares: 23_400_000, action: "add", changePct: 14.6 },
      { ticker: "GOOGL", company: "Alphabet Inc.", weight: 4.8, value: 845_000_000, shares: 4_130_000, action: "hold", changePct: 0 },
      { ticker: "NVDA", company: "NVIDIA Corp", weight: 4.2, value: 739_000_000, shares: 5_280_000, action: "trim", changePct: -9.4 },
      { ticker: "PG", company: "Procter & Gamble", weight: 3.7, value: 651_000_000, shares: 3_920_000, action: "hold", changePct: 0 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "IEMG", company: "iShares Core MSCI EM", action: "add", detail: "Added 3.0M shares, +14.6%", impact: 0.9 },
      { quarter: "Q1 2026", ticker: "SPY", company: "SPDR S&P 500 ETF", action: "add", detail: "Added 237K shares, +7.8%", impact: 0.8 },
      { quarter: "Q4 2025", ticker: "NVDA", company: "NVIDIA Corp", action: "trim", detail: "Sold 548K shares, -9.4%", impact: -0.4 },
    ],
  },
  {
    slug: "carl-icahn",
    name: "Carl Icahn",
    firm: "Icahn Enterprises",
    country: "United States",
    countryCode: "US",
    strategy: "Hostile Activist",
    styleTags: ["Activist", "Special Situations", "Control"],
    aum: 10_300_000_000,
    since: 1987,
    cagr: 14.1,
    qoqChange: -1.2,
    turnover: 15.8,
    concentration: 91.7,
    holdingsCount: 14,
    philosophy:
      "In life and business, there are two cardinal sins: to act precipitately without thought, and to not act at all.",
    performance: [100, 113, 104, 122, 134, 126, 141, 152, 144, 158, 167, 163],
    sectors: [
      { sector: "Energy", pct: 36.4 },
      { sector: "Industrials", pct: 24.7 },
      { sector: "Real Estate", pct: 16.8 },
      { sector: "Healthcare", pct: 12.9 },
      { sector: "Other", pct: 9.2 },
    ],
    holdings: [
      { ticker: "IEP", company: "Icahn Enterprises LP", weight: 28.7, value: 2_960_000_000, shares: 320_000_000, action: "add", changePct: 2.4 },
      { ticker: "CVI", company: "CVR Energy", weight: 19.4, value: 2_000_000_000, shares: 71_200_000, action: "hold", changePct: 0 },
      { ticker: "SWX", company: "Southwest Gas Holdings", weight: 11.8, value: 1_220_000_000, shares: 15_600_000, action: "hold", changePct: 0 },
      { ticker: "UAN", company: "CVR Partners LP", weight: 8.6, value: 886_000_000, shares: 3_890_000, action: "hold", changePct: 0 },
      { ticker: "BHC", company: "Bausch Health", weight: 7.2, value: 742_000_000, shares: 34_700_000, action: "add", changePct: 8.9 },
      { ticker: "JBLU", company: "JetBlue Airways", weight: 4.8, value: 494_000_000, shares: 84_300_000, action: "new", changePct: 100 },
    ],
    activity: [
      { quarter: "Q1 2026", ticker: "JBLU", company: "JetBlue Airways", action: "new", detail: "New 84.3M share activist stake", impact: 4.8 },
      { quarter: "Q1 2026", ticker: "BHC", company: "Bausch Health", action: "add", detail: "Added 2.8M shares, +8.9%", impact: 0.6 },
      { quarter: "Q4 2025", ticker: "FRX", company: "Forian Inc.", action: "exit", detail: "Closed position", impact: -0.8 },
    ],
  },
];

export function getInvestor(slug: string): Investor | undefined {
  return investors.find((i) => i.slug === slug);
}

export interface StockAggregate {
  ticker: string;
  company: string;
  holders: {
    investor: Investor;
    holding: Holding;
  }[];
  totalValue: number;
  buys: number;
  sells: number;
}

export function aggregateStocks(): StockAggregate[] {
  const map = new Map<string, StockAggregate>();
  for (const inv of investors) {
    for (const h of inv.holdings) {
      let agg = map.get(h.ticker);
      if (!agg) {
        agg = { ticker: h.ticker, company: h.company, holders: [], totalValue: 0, buys: 0, sells: 0 };
        map.set(h.ticker, agg);
      }
      agg.holders.push({ investor: inv, holding: h });
      agg.totalValue += h.value;
      if (h.action === "new" || h.action === "add") agg.buys += 1;
      if (h.action === "trim" || h.action === "exit") agg.sells += 1;
    }
  }
  return [...map.values()].sort((a, b) => b.totalValue - a.totalValue);
}

export function getStock(ticker: string): StockAggregate | undefined {
  return aggregateStocks().find(
    (s) => s.ticker.toLowerCase() === ticker.toLowerCase(),
  );
}

export const platformStats = {
  investorsTracked: 312,
  filingsParsed: 48_217,
  assetsTracked: 2_400_000_000_000,
  countries: 27,
};
