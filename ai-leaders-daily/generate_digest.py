#!/usr/bin/env python3
"""Generates ai-leaders-daily/out/digest.json for 17 Jun 2026."""
import json, os

os.makedirs("ai-leaders-daily/out", exist_ok=True)

SUBJECT = "AI Leaders Daily — Lessons From the Frontier (17 Jun 2026)"

TEXT_BODY = """\
AI LEADERS DAILY — LESSONS FROM THE FRONTIER
17 Jun 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
60-SECOND READ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Altman (CNBC, June 1): enterprise AI costs hit inflection — 100B tokens/month power users
  and Q1 budget blow-outs. The bottleneck has shifted from capability to cost.
• OpenAI ends Microsoft exclusivity, expands AWS deal by $100B — managed agents go to AWS
  exclusively. A template for escaping platform lock-in while maximising distribution leverage.
• Amodei publishes "Policy on the AI Exponential" — FAA-style AI regulation, compute-
  threshold testing, worker protections — while Anthropic approaches IPO. Read proposals
  alongside incentives.
• Huang at GTC Taipei (June 1): "Agentic AI has arrived." NVIDIA reframes as full-stack AI
  infrastructure builder. AI factories at $50–100B/gigawatt.
• Hassabis at Stanford GSB (June 3): AGI "maybe 2030 ± 1 year." We are standing "in the
  foothills of the singularity."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SAM ALTMAN — OpenAI
CNBC Power Lunch · June 1  |  OpenAI "Intelligence at Work" · June 2  |  Sydney · May 26
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE IDEA

At Stargate (Michigan), Altman told CNBC: "We still don't think the world has appreciated
how much A.I., every person and every business is going to want."

At the next day’s enterprise event he disclosed that OpenAI’s top customer burns 100 billion
tokens per month, then quoted a meme circulating in enterprise IT: "The company spent its
entire 2026 budget in Q1. Can you make it more efficient?" Cost concerns, he said, are now
the second most common complaint from enterprise clients — where early 2026 "nobody cared
about costs."

In Sydney (May 26) he admitted his team was "pretty wrong" about AI’s economic impact:
he expected more entry-level white-collar displacement than has occurred. "I’m delighted
to be wrong about this."

Concurrently, OpenAI ended Microsoft’s exclusive license and signed a $100B expansion with
Amazon Web Services. Bedrock Managed Agents — OpenAI’s highest-value agentic product — is
available exclusively on AWS, not Azure.

THE LESSON

The shift from capability to cost is the real story. Once enterprise customers hit budget walls
rather than technology walls, the competitive variable changes: whoever delivers the same
intelligence per dollar wins. Inference efficiency, model routing, and distillation now matter
more than benchmark scores.

The distribution move has its own lesson: OpenAI’s Microsoft exclusivity was never OpenAI’s
moat — it was Microsoft’s. Altman used multi-cloud leverage to renegotiate, then positioned
the highest-value product on AWS exclusively. Application-layer companies don’t build durable
moats through single-platform exclusivity; the real lock-in is in enterprise workflow
integration, not the cloud contract.

The jobs reversal is a calibration note: even the CEO closest to the technology made
materially wrong macro predictions. Update AI leaders’ economic forecasts with significant
downward uncertainty.

MOAT LENS

Capability moats (frontier performance) are being compressed by cost pressure. Distribution
moats — API stickiness, enterprise workflow integration — are hardening. The cloud exclusive
is a negotiating weapon, not a durable competitive position; but the workflow it enables may
be. Switching costs at the enterprise level remain contingent on integration depth.

⚠ INCENTIVE NOTE: Altman is positioning for an OpenAI IPO. His bullish demand outlook and
soothing jobs messaging both serve that narrative. The demand case may well be right; read it
in context.

Sources:
  CNBC Power Lunch (June 1):
    https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html
  Axios / 100B token user (June 2):
    https://www.axios.com/2026/06/02/altman-openai-top-token-user
  CNBC / OpenAI-AWS expansion (Apr 28):
    https://www.cnbc.com/2026/04/28/openai-brings-models-to-aws-after-ending-exclusivity-with-microsoft.html
  Yahoo Finance / jobs reversal (May 26):
    https://finance.yahoo.com/economy/policy/articles/billionaire-sam-altman-says-openai-162112093.html

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. DARIO AMODEI — Anthropic
"Policy on the AI Exponential" · darioamodei.com · early June 2026
Semafor · June 11  |  TechCrunch · June 10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE IDEA

Amodei published a sweeping policy essay proposing: (1) mandatory third-party testing for
frontier models above a compute threshold across four risk categories — cybersecurity,
bioweapons, loss-of-control, and automated R&D that could accelerate the others; (2) US
government authority to block or reverse release of models that fail testing; (3) FAA-style
pre-release safety approval; (4) a new federal body overseeing frontier AI research; and
(5) worker protection mechanisms to redirect economic gains from AI companies to displaced
workers. Anthropic is committing reportedly $350M to back legislative proposals, and is
pushing the economic agenda at the G7 and Geneva AI Summit.

A TechCrunch profile (June 10) revealed he has just one direct report — his chief of staff
— with all senior leaders reporting to Daniela Amodei (co-president). He spends "a third,
maybe 40%" of his time on company culture.

THE LESSON

Regulatory frameworks shaped by incumbents tend to entrench incumbents. FAA-style compute-
threshold testing is technically defensible — and precisely describes a barrier that only
Anthropic, OpenAI, and Google can reliably clear. Amodei’s concern for safety is genuine;
the regulatory moat it creates is real regardless of intent. Historical precedents: financial
regulation post-2008, pharmaceutical approval, nuclear licensing — in each case, the
incumbents who helped write the rules became the hardest to dislodge.

The essay also signals a meaningful shift in Amodei’s own economic thinking: he is no longer
confident gains will be broadly distributed without policy intervention. That’s a significant
update from the default "technology creates jobs" framing from a CEO with direct visibility
into what frontier models can do.

MOAT LENS

Regulatory compliance moats are the most durable in heavily regulated industries. If compute-
threshold testing becomes law, a small number of labs gain a built-in barrier with no direct
relationship to model quality. The geographic dimension matters: nations adopting this
framework create a de facto trade barrier — or accelerate a US/EU vs. China AI bifurcation.
Watch which governments adopt versions of this framework, and who helped design them.

⚠ INCENTIVE NOTE: Anthropic is approaching an IPO. Proposing regulations it already meets,
and that smaller competitors cannot, is classic incumbency defense. The proposals may be
correct; the timing makes them easier to make.

Sources:
  Dario Amodei essay:
    https://darioamodei.com/post/policy-on-the-ai-exponential
  Semafor / workers rights (June 11):
    https://www.semafor.com/article/06/11/2026/anthropics-amodei-calls-for-workers-rights-over-ai
  TechCrunch / leadership (June 10):
    https://techcrunch.com/2026/06/10/anthropics-dario-amodei-has-just-one-direct-report/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. JENSEN HUANG — NVIDIA
GTC Taipei keynote (Computex 2026) · June 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE IDEA

One thesis, stated repeatedly: "Today we can say that agentic AI has arrived, that useful AI
has arrived." Huang formally reframed NVIDIA as an AI infrastructure builder — no longer a
chip designer — focused on agentic AI development, optimization, and operations. He described
AI factories as "the largest infrastructure buildout in human history," with single sites
heading toward 1 gigawatt and capital costs "at $50 billion to $60 billion, and soon it will
be $80 billion to $100 billion per gigawatt." He launched Vera Rubin GPUs (now in full
production) and Vera CPUs. His framing: every token is now a revenue unit. AI factories are
the power plants of the intelligence economy.

THE LESSON

Huang is executing a vertical integration strategy unprecedented in semiconductor history.
NVIDIA now sells the factory (hardware), the OS (CUDA), the models (Nemotron), and the
workflow tooling — each layer deepening switching costs for the layer below. The $50–100B
per gigawatt capex barrier is the key moat signal: only sovereign wealth funds, hyperscalers,
and the wealthiest nations can cross it. That scale creates both a barrier to entry and a
structural dependency on NVIDIA’s roadmap.

The "every token is a revenue unit" reframe is consequential for AI economics: if agents
autonomously complete productive work rather than answer queries, total monetisable inference
scales by orders of magnitude beyond subscription or per-seat pricing. TAM expands
proportionally with agent autonomy.

MOAT LENS

NVIDIA is compounding three moat types simultaneously: scale economies (manufacturing,
supply chain), switching costs (CUDA ecosystem, software tooling), and ecosystem network
effects. The $50–100B capex is the moat — and also the exposure: if hardware prices fall
faster than demand grows, or if credible alternative compute architectures emerge (hyperscaler
custom silicon), the moat compresses. The full-stack software play is the hedge against that.

Sources:
  SiliconANGLE / GTC Taipei (June 1):
    https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/
  TradingKey / Vera Rubin summary:
    https://www.tradingkey.com/analysis/stocks/us-stocks/261938407-nvda-verarubin-ai-jensenhuang-nvidia-tradingkey

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. DEMIS HASSABIS — Google DeepMind
Stanford Graduate School of Business fireside chat · June 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE IDEA

At Stanford GSB, Hassabis gave his most specific public AGI timeline to date: "Maybe 2030,
plus or minus a year, which is astounding to think, really. I think that will be such an
enormous transformative technology; it’s gonna effectively be a new human era." He added:
"Looking back 10 years from now, we will realize that we were standing in the foothills of
the singularity now," and warned: "Society needs to hear that because we don’t have long to
prepare for what that means." He raised the prospect of a "post-scarcity world" and described
AGI as 10x the Industrial Revolution — compressed into a decade, not a century.

THE LESSON

Hassabis is the most science-grounded of the major AI CEOs (AlphaFold, Nobel Prize in
Chemistry 2024). His timelines warrant more weight than pure-tech-CEO claims. The direct
investment implication: if AGI arrives near 2030, moats requiring 7–10 years to compound are
largely irrelevant. The relevant advantages are those already in place — distribution embedded
in enterprise workflows, proprietary data that can’t be quickly replicated, regulatory
positioning locked in, brand trust already earned.

The Industrial Revolution analogy is instructive: its biggest winners were not the steam
engine makers (the enablers) but the textile mills and railroads (the deployers). Look
downstream from model providers toward the industries deploying AI at scale — those with
large, proprietary datasets and deep customer relationships are the more interesting frame.

MOAT LENS

In a near-AGI scenario, durable moats are those that don’t require rebuilding human
processes: proprietary real-world data, deep enterprise workflow integration, regulatory
positioning, brand trust. Pure model-quality advantages compress fast. Distribution is the
word that appears in every framework — because it’s already built and hard to replicate
quickly. Brand and trust may be the last moats standing, both as consumer preference and
as regulatory safe harbor.

Sources:
  Axios / Hassabis AGI (May 26):
    https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis
  Tekedia / Stanford GSB summary (June 3):
    https://www.tekedia.com/google-deepmind-ceo-says-agi-could-arrive-by-2030-warning-society-has-little-time-to-prepare/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LESSONS TO KEEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Capability moats are eroding; cost moats are building. Enterprise AI has crossed from
   "does it work?" to "can I afford it at scale?" Inference efficiency and workflow integration
   now matter more than benchmark leadership.

2. Regulatory moats are being built right now, by the firms writing the rules. FAA-style
   compute-threshold testing converts safety compliance into a market barrier. Watch which
   governments adopt it and who helped design it.

3. Cloud exclusivity is a negotiating weapon, not a durable moat. The real lock-in is in
   enterprise workflow integration. OpenAI’s Microsoft-to-AWS move is the template.

4. Compress your investment time horizon. If Hassabis is right about AGI near 2030, moats
   that take 7–10 years to compound are irrelevant. The advantages that matter are those
   already in place — distribution, data, regulatory positioning, brand trust.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTIONS TO SIT WITH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. When enterprise cost is the primary bottleneck, who captures the "efficiency dividend" —
   the model provider, the cloud provider, or the enterprise software integrator sitting
   between them?

2. If frontier AI regulation is shaped by Anthropic and OpenAI, what happens to the open-
   source ecosystem (Meta, Mistral, Chinese labs)? Does it accelerate bifurcation — or
   create an unregulated alternative that eventually captures distribution?

3. The Industrial Revolution’s biggest winners were not the steam engine makers. Who are
   the textile mills and railroads of this AI transition — and are any already clearly
   visible today?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CROSS-CUTTING SIGNAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The AI industry is transitioning from proving capability to capturing economics. Every
leader’s move this week makes sense through that lens: Altman is building multi-cloud
distribution while managing enterprise cost expectations (and approaching an IPO); Amodei is
converting safety brand into regulatory law (and approaching an IPO); Huang is locking NVIDIA
into the entire AI stack from chip to agent; Hassabis is framing AGI as urgent enough to
justify massive infrastructure investment but credible enough to support long-term bets. The
capital cycle is turning — from who builds the smartest model to who owns the infrastructure
and distribution through which intelligence flows.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SOURCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CNBC / Altman Power Lunch (June 1):
  https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html
Axios / 100B token user (June 2):
  https://www.axios.com/2026/06/02/altman-openai-top-token-user
CNBC / OpenAI-AWS expansion (Apr 28):
  https://www.cnbc.com/2026/04/28/openai-brings-models-to-aws-after-ending-exclusivity-with-microsoft.html
Yahoo Finance / Altman jobs reversal (May 26):
  https://finance.yahoo.com/economy/policy/articles/billionaire-sam-altman-says-openai-162112093.html
Dario Amodei / "Policy on the AI Exponential":
  https://darioamodei.com/post/policy-on-the-ai-exponential
Semafor / Amodei workers rights (June 11):
  https://www.semafor.com/article/06/11/2026/anthropics-amodei-calls-for-workers-rights-over-ai
TechCrunch / Amodei leadership (June 10):
  https://techcrunch.com/2026/06/10/anthropics-dario-amodei-has-just-one-direct-report/
SiliconANGLE / GTC Taipei keynote (June 1):
  https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/
Axios / Hassabis AGI (May 26):
  https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis
Tekedia / Hassabis Stanford (June 3):
  https://www.tekedia.com/google-deepmind-ceo-says-agi-could-arrive-by-2030-warning-society-has-little-time-to-prepare/
"""

HTML_BODY = """\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>AI Leaders Daily — 17 Jun 2026</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f5;font-family:Georgia,serif;color:#1a1a2e;">

<!-- HEADER -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0f1c;">
<tr><td align="center" style="padding:36px 24px 28px;">
  <p style="margin:0 0 6px;color:#7f9cf5;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">CLAUDE CODE ROUTINE &nbsp;&middot;&nbsp; 17 JUN 2026</p>
  <h1 style="margin:0 0 6px;color:#f0f4ff;font-family:Georgia,serif;font-size:30px;font-weight:bold;line-height:1.2;">AI Leaders Daily</h1>
  <p style="margin:0;color:#a0aec0;font-family:Arial,sans-serif;font-size:14px;">Lessons From the Frontier</p>
</td></tr>
</table>

<!-- BODY WRAPPER -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f2f5;">
<tr><td align="center" style="padding:0 16px 40px;">
<table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;width:100%;">

<!-- 60-SECOND READ -->
<tr><td style="padding:28px 0 0;">
<div style="background:#1a1a2e;border-radius:10px;padding:26px 30px;">
  <p style="margin:0 0 14px;color:#7f9cf5;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">60-SECOND READ</p>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="padding:0 0 9px;vertical-align:top;width:18px;color:#7f9cf5;font-family:Arial,sans-serif;font-size:14px;">&bull;</td><td style="padding:0 0 9px;color:#e2e8f0;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;"><strong style="color:#f7fafc;">Altman (CNBC, June 1):</strong> Enterprise AI costs hit inflection &mdash; 100B tokens/month users, Q1 budget blow-outs. The bottleneck has shifted from capability to cost.</td></tr>
    <tr><td style="padding:0 0 9px;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:14px;">&bull;</td><td style="padding:0 0 9px;color:#e2e8f0;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;"><strong style="color:#f7fafc;">OpenAI ends Microsoft exclusivity, expands AWS by $100B</strong> &mdash; managed agents go to AWS exclusively. A template for escaping platform lock-in.</td></tr>
    <tr><td style="padding:0 0 9px;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:14px;">&bull;</td><td style="padding:0 0 9px;color:#e2e8f0;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;"><strong style="color:#f7fafc;">Amodei&rsquo;s policy essay:</strong> FAA-style AI regulation, compute-threshold testing, worker protections &mdash; while Anthropic approaches IPO. Read proposals alongside incentives.</td></tr>
    <tr><td style="padding:0 0 9px;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:14px;">&bull;</td><td style="padding:0 0 9px;color:#e2e8f0;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;"><strong style="color:#f7fafc;">Huang at GTC Taipei (June 1):</strong> &ldquo;Agentic AI has arrived.&rdquo; NVIDIA reframes as full-stack infrastructure builder. AI factories at $50&ndash;100B/gigawatt.</td></tr>
    <tr><td style="padding:0;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:14px;">&bull;</td><td style="padding:0;color:#e2e8f0;font-family:Arial,sans-serif;font-size:13px;line-height:1.65;"><strong style="color:#f7fafc;">Hassabis at Stanford GSB (June 3):</strong> AGI &ldquo;maybe 2030 &plusmn; 1 year.&rdquo; We are standing &ldquo;in the foothills of the singularity.&rdquo;</td></tr>
  </table>
</div>
</td></tr>

<!-- ALTMAN -->
<tr><td style="padding:22px 0 0;">
<div style="background:#ffffff;border-radius:10px;padding:28px;border-left:5px solid #667eea;">
  <p style="margin:0 0 3px;color:#667eea;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">SAM ALTMAN &middot; OPENAI</p>
  <p style="margin:0 0 18px;color:#718096;font-family:Arial,sans-serif;font-size:11px;">CNBC Power Lunch &middot; June 1 &nbsp;&nbsp;|&nbsp;&nbsp; Intelligence at Work &middot; June 2 &nbsp;&nbsp;|&nbsp;&nbsp; Sydney &middot; May 26</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE IDEA</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">At Stargate (Michigan), Altman told CNBC: <em>&ldquo;We still don&rsquo;t think the world has appreciated how much A.I., every person and every business is going to want.&rdquo;</em></p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">At the next day&rsquo;s enterprise event he disclosed that OpenAI&rsquo;s top customer burns <strong>100 billion tokens per month</strong>, then quoted a meme circulating in enterprise IT: <em>&ldquo;The company spent its entire 2026 budget in Q1. Can you make it more efficient?&rdquo;</em> Cost concerns, he said, are now the second most common complaint from enterprise clients &mdash; where early 2026 <em>&ldquo;nobody cared about costs.&rdquo;</em></p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">In Sydney (May 26) he said his team was <em>&ldquo;pretty wrong&rdquo;</em> about AI&rsquo;s economic impact: he expected more white-collar job displacement than occurred. <em>&ldquo;I&rsquo;m delighted to be wrong about this.&rdquo;</em></p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">Concurrently, OpenAI ended Microsoft&rsquo;s exclusive license and signed a $100B expansion with AWS. Bedrock Managed Agents &mdash; OpenAI&rsquo;s highest-value agentic product &mdash; is available <strong>exclusively on AWS</strong>, not Azure.</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE LESSON</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The shift from capability to cost is the real story. Once enterprise customers hit budget walls rather than technology walls, the competitive variable changes: whoever delivers the same intelligence per dollar wins. Inference efficiency, model routing, and distillation now matter more than benchmark scores.</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The distribution move: OpenAI&rsquo;s Microsoft exclusivity was never OpenAI&rsquo;s moat &mdash; it was Microsoft&rsquo;s. Altman used multi-cloud leverage to renegotiate, then positioned the highest-value product on AWS exclusively. Application-layer companies don&rsquo;t build durable moats through cloud exclusivity; the real lock-in is in enterprise workflow integration.</p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The jobs reversal is a calibration note: even the CEO closest to the technology made materially wrong macro predictions. Update AI leaders&rsquo; economic forecasts with significant downward uncertainty.</p>

  <div style="background:#ebf4ff;border-radius:7px;padding:14px 18px;margin-bottom:14px;">
    <p style="margin:0 0 5px;color:#2b6cb0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">MOAT LENS</p>
    <p style="margin:0;color:#2a4365;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;">Capability moats are being compressed by cost pressure. Distribution moats &mdash; API stickiness, enterprise workflow integration &mdash; are hardening. The cloud exclusive is a negotiating weapon, not a durable position; the workflow it enables may be. Switching costs remain contingent on integration depth, not yet deep workflow lock-in.</p>
  </div>

  <div style="background:#fff5f5;border-radius:7px;padding:12px 18px;">
    <p style="margin:0;color:#c53030;font-family:Arial,sans-serif;font-size:12px;line-height:1.55;"><strong>&#9888; Incentive note:</strong> Altman is positioning for an OpenAI IPO. His bullish demand outlook and soothing jobs messaging both serve that narrative. The demand case may be right; read it in that context.</p>
  </div>
</div>
</td></tr>

<!-- AMODEI -->
<tr><td style="padding:20px 0 0;">
<div style="background:#ffffff;border-radius:10px;padding:28px;border-left:5px solid #48bb78;">
  <p style="margin:0 0 3px;color:#276749;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">DARIO AMODEI &middot; ANTHROPIC</p>
  <p style="margin:0 0 18px;color:#718096;font-family:Arial,sans-serif;font-size:11px;">&ldquo;Policy on the AI Exponential&rdquo; &middot; early June 2026 &nbsp;&nbsp;|&nbsp;&nbsp; Semafor &middot; June 11 &nbsp;&nbsp;|&nbsp;&nbsp; TechCrunch &middot; June 10</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE IDEA</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">Amodei published a sweeping policy essay proposing: (1) mandatory third-party testing for frontier models above a compute threshold across four risk categories &mdash; cybersecurity, bioweapons, loss-of-control, and automated R&amp;D that could accelerate the others; (2) US government authority to block or reverse model releases that fail testing; (3) FAA-style pre-release safety approval; (4) a new federal body overseeing frontier AI; and (5) worker protections to redirect gains from AI companies to displaced workers. Anthropic is committing reportedly <strong>$350M</strong> to back legislative proposals, and is bringing the economic agenda to the G7 and Geneva AI Summit.</p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">A TechCrunch profile (June 10) revealed he has just one direct report &mdash; his chief of staff &mdash; with all senior leaders reporting to Daniela Amodei (co-president). He spends <em>&ldquo;a third, maybe 40%&rdquo;</em> of his time on culture.</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE LESSON</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">Regulatory frameworks shaped by incumbents tend to entrench incumbents. FAA-style compute-threshold testing is technically defensible &mdash; and precisely describes a barrier that only Anthropic, OpenAI, and Google can reliably clear. Amodei&rsquo;s concern is genuine; the regulatory moat it creates is real regardless of intent. Historical precedents: financial regulation post-2008, pharma approval, nuclear licensing &mdash; in each case, the incumbents who helped write the rules became the hardest to dislodge.</p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The essay also signals a meaningful shift: Amodei is no longer confident gains will be broadly distributed without policy intervention &mdash; a significant update from the default &ldquo;technology creates jobs&rdquo; framing from a CEO with direct visibility into what frontier models can do.</p>

  <div style="background:#f0fff4;border-radius:7px;padding:14px 18px;margin-bottom:14px;">
    <p style="margin:0 0 5px;color:#276749;font-family:Arial,sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">MOAT LENS</p>
    <p style="margin:0;color:#22543d;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;">Regulatory compliance moats are the most durable in heavily regulated industries. If compute-threshold testing becomes law, a small number of labs gain a barrier independent of model quality. The geographic dimension matters: nations adopting this framework create a de facto trade barrier &mdash; or accelerate US/EU vs. China AI bifurcation. Watch who designed it.</p>
  </div>

  <div style="background:#fff5f5;border-radius:7px;padding:12px 18px;">
    <p style="margin:0;color:#c53030;font-family:Arial,sans-serif;font-size:12px;line-height:1.55;"><strong>&#9888; Incentive note:</strong> Anthropic is approaching an IPO. Proposing regulations it already meets, and smaller competitors cannot, is classic incumbency defense. The proposals may be correct; the timing makes them easier to make.</p>
  </div>
</div>
</td></tr>

<!-- HUANG -->
<tr><td style="padding:20px 0 0;">
<div style="background:#ffffff;border-radius:10px;padding:28px;border-left:5px solid #ed8936;">
  <p style="margin:0 0 3px;color:#c05621;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">JENSEN HUANG &middot; NVIDIA</p>
  <p style="margin:0 0 18px;color:#718096;font-family:Arial,sans-serif;font-size:11px;">GTC Taipei keynote (Computex 2026) &middot; June 1</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE IDEA</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">One thesis, stated repeatedly: <em>&ldquo;Today we can say that agentic AI has arrived, that useful AI has arrived.&rdquo;</em> Huang formally reframed NVIDIA as an <strong>AI infrastructure builder</strong> &mdash; no longer a chip designer &mdash; focused on agentic AI development, optimization, and operations. He described AI factories as &ldquo;the largest infrastructure buildout in human history,&rdquo; with single sites heading toward 1 gigawatt and capital costs <em>&ldquo;at $50 billion to $60 billion, and soon it will be $80 billion to $100 billion per gigawatt.&rdquo;</em> He launched Vera Rubin GPUs (now in full production) and Vera CPUs. His framing: <strong>every token is now a revenue unit</strong>.</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE LESSON</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">Huang is executing a vertical integration strategy unprecedented in semiconductor history. NVIDIA now sells the factory (hardware), the OS (CUDA), the models (Nemotron), and workflow tooling &mdash; each layer deepening switching costs for the layer below. The $50&ndash;100B/gigawatt capex barrier is the key moat signal: only sovereign wealth funds, hyperscalers, and the wealthiest nations can cross it. That scale creates both a barrier to entry and a structural dependency on NVIDIA&rsquo;s roadmap.</p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The &ldquo;every token is a revenue unit&rdquo; reframe matters: if agents autonomously complete productive work rather than answer queries, total monetisable inference scales by orders of magnitude beyond subscription or per-seat pricing. TAM expands with agent autonomy.</p>

  <div style="background:#fffaf0;border-radius:7px;padding:14px 18px;">
    <p style="margin:0 0 5px;color:#c05621;font-family:Arial,sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">MOAT LENS</p>
    <p style="margin:0;color:#7b341e;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;">NVIDIA is compounding three moat types: scale economies (manufacturing), switching costs (CUDA ecosystem, software tooling), and ecosystem network effects. The $50&ndash;100B capex is the moat &mdash; and also the exposure: if hardware prices fall faster than demand grows, or credible alternative compute architectures emerge (hyperscaler custom silicon), the moat compresses. The full-stack software play is the hedge.</p>
  </div>
</div>
</td></tr>

<!-- HASSABIS -->
<tr><td style="padding:20px 0 0;">
<div style="background:#ffffff;border-radius:10px;padding:28px;border-left:5px solid #9f7aea;">
  <p style="margin:0 0 3px;color:#553c9a;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;">DEMIS HASSABIS &middot; GOOGLE DEEPMIND</p>
  <p style="margin:0 0 18px;color:#718096;font-family:Arial,sans-serif;font-size:11px;">Stanford Graduate School of Business fireside chat &middot; June 3</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE IDEA</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;"><em>&ldquo;Maybe 2030, plus or minus a year, which is astounding to think, really. I think that will be such an enormous transformative technology; it&rsquo;s gonna effectively be a new human era.&rdquo;</em></p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">He added: <em>&ldquo;Looking back 10 years from now, we will realize that we were standing in the foothills of the singularity now&rdquo;</em> and warned: <em>&ldquo;Society needs to hear that because we don&rsquo;t have long to prepare for what that means.&rdquo;</em> He raised the prospect of a &ldquo;post-scarcity world&rdquo; and described AGI as 10&times; the Industrial Revolution &mdash; compressed into a decade, not a century.</p>

  <p style="margin:0 0 8px;color:#2d3748;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">THE LESSON</p>
  <p style="margin:0 0 11px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">Hassabis is the most science-grounded major AI CEO (AlphaFold, Nobel Prize in Chemistry 2024). His timelines warrant more weight than pure-tech-CEO claims. The direct investment implication: if AGI arrives near 2030, moats requiring 7&ndash;10 years to compound are largely irrelevant. The relevant advantages are those already in place &mdash; distribution embedded in enterprise workflows, proprietary data, regulatory positioning locked in, brand trust already earned.</p>
  <p style="margin:0 0 18px;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The Industrial Revolution analogy is instructive: its biggest winners were not the steam engine makers (the enablers) but the textile mills and railroads (the deployers). Look downstream from model providers toward industries deploying AI at scale &mdash; those with large proprietary datasets and deep customer relationships.</p>

  <div style="background:#faf5ff;border-radius:7px;padding:14px 18px;">
    <p style="margin:0 0 5px;color:#553c9a;font-family:Arial,sans-serif;font-size:10px;letter-spacing:1px;text-transform:uppercase;font-weight:bold;">MOAT LENS</p>
    <p style="margin:0;color:#44337a;font-family:Arial,sans-serif;font-size:13px;line-height:1.6;">In a near-AGI scenario, durable moats are those that don&rsquo;t require rebuilding human processes: proprietary real-world data, deep enterprise workflow integration, regulatory positioning, brand trust. Pure model-quality advantages compress fast. Distribution is the word that appears in every framework &mdash; because it&rsquo;s already built and hard to replicate quickly.</p>
  </div>
</div>
</td></tr>

<!-- LESSONS TO KEEP -->
<tr><td style="padding:28px 0 0;">
<div style="background:#1a1a2e;border-radius:10px;padding:26px 30px;">
  <p style="margin:0 0 16px;color:#7f9cf5;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">LESSONS TO KEEP</p>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="padding:0 0 12px;vertical-align:top;width:22px;color:#7f9cf5;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">1.</td><td style="padding:0 0 12px;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;"><strong style="color:#f7fafc;">Capability moats are eroding; cost moats are building.</strong> Enterprise AI has crossed from &ldquo;does it work?&rdquo; to &ldquo;can I afford it at scale?&rdquo; Inference efficiency and workflow integration now matter more than benchmark leadership.</td></tr>
    <tr><td style="padding:0 0 12px;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">2.</td><td style="padding:0 0 12px;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;"><strong style="color:#f7fafc;">Regulatory moats are being built right now, by the firms writing the rules.</strong> FAA-style compute-threshold testing converts safety compliance into a market barrier. Watch which governments adopt it and who helped design it.</td></tr>
    <tr><td style="padding:0 0 12px;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">3.</td><td style="padding:0 0 12px;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;"><strong style="color:#f7fafc;">Cloud exclusivity is a negotiating weapon, not a durable moat.</strong> The real lock-in is in enterprise workflow integration. OpenAI&rsquo;s Microsoft-to-AWS move is the template.</td></tr>
    <tr><td style="padding:0;vertical-align:top;color:#7f9cf5;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">4.</td><td style="padding:0;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;"><strong style="color:#f7fafc;">Compress your investment time horizon.</strong> If Hassabis is right about AGI near 2030, moats that take 7&ndash;10 years to compound are irrelevant. The advantages that matter are those already in place &mdash; distribution, data, regulatory positioning, brand trust.</td></tr>
  </table>
</div>
</td></tr>

<!-- QUESTIONS TO SIT WITH -->
<tr><td style="padding:20px 0 0;">
<div style="background:#2d3748;border-radius:10px;padding:26px 30px;">
  <p style="margin:0 0 16px;color:#a0aec0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">QUESTIONS TO SIT WITH</p>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="padding:0 0 12px;vertical-align:top;width:22px;color:#a0aec0;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">1.</td><td style="padding:0 0 12px;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;">When enterprise cost is the primary bottleneck, who captures the &ldquo;efficiency dividend&rdquo; &mdash; the model provider, the cloud provider, or the enterprise software integrator sitting between them?</td></tr>
    <tr><td style="padding:0 0 12px;vertical-align:top;color:#a0aec0;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">2.</td><td style="padding:0 0 12px;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;">If frontier AI regulation is shaped by Anthropic and OpenAI, what happens to the open-source ecosystem (Meta, Mistral, Chinese labs)? Does it accelerate bifurcation &mdash; or create an unregulated alternative that eventually captures distribution?</td></tr>
    <tr><td style="padding:0;vertical-align:top;color:#a0aec0;font-family:Arial,sans-serif;font-size:13px;font-weight:bold;">3.</td><td style="padding:0;color:#e2e8f0;font-family:Georgia,serif;font-size:15px;line-height:1.65;">The Industrial Revolution&rsquo;s biggest winners were not the steam engine makers. Who are the textile mills and railroads of this AI transition &mdash; and are any already clearly visible today?</td></tr>
  </table>
</div>
</td></tr>

<!-- CROSS-CUTTING SIGNAL -->
<tr><td style="padding:20px 0 0;">
<div style="background:#ffffff;border-radius:10px;padding:26px 30px;border-top:4px solid #667eea;">
  <p style="margin:0 0 12px;color:#667eea;font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;">CROSS-CUTTING SIGNAL</p>
  <p style="margin:0;color:#2d3748;font-family:Georgia,serif;font-size:15px;line-height:1.7;">The AI industry is transitioning from proving capability to capturing economics. Every leader&rsquo;s move this week makes sense through that lens: Altman is building multi-cloud distribution while managing enterprise cost expectations (and approaching an IPO); Amodei is converting safety brand into regulatory law (and approaching an IPO); Huang is locking NVIDIA into the entire AI stack from chip to agent; Hassabis is framing AGI as urgent enough to justify massive infrastructure investment but credible enough to support long-term bets. The capital cycle is turning &mdash; from <em>who builds the smartest model</em> to <em>who owns the infrastructure and distribution through which intelligence flows.</em></p>
</div>
</td></tr>

<!-- SOURCES -->
<tr><td style="padding:20px 0 0;">
<div style="background:#f7fafc;border-radius:10px;padding:22px 26px;">
  <p style="margin:0 0 12px;color:#718096;font-family:Arial,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;">SOURCES</p>
  <p style="margin:0;color:#4a5568;font-family:Arial,sans-serif;font-size:12px;line-height:2.0;">
    <a href="https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html" style="color:#4299e1;text-decoration:none;">CNBC / Altman Power Lunch (June 1)</a><br>
    <a href="https://www.axios.com/2026/06/02/altman-openai-top-token-user" style="color:#4299e1;text-decoration:none;">Axios / OpenAI 100B token user (June 2)</a><br>
    <a href="https://www.cnbc.com/2026/04/28/openai-brings-models-to-aws-after-ending-exclusivity-with-microsoft.html" style="color:#4299e1;text-decoration:none;">CNBC / OpenAI-AWS expansion (Apr 28)</a><br>
    <a href="https://finance.yahoo.com/economy/policy/articles/billionaire-sam-altman-says-openai-162112093.html" style="color:#4299e1;text-decoration:none;">Yahoo Finance / Altman jobs reversal (May 26)</a><br>
    <a href="https://darioamodei.com/post/policy-on-the-ai-exponential" style="color:#4299e1;text-decoration:none;">Dario Amodei / &ldquo;Policy on the AI Exponential&rdquo;</a><br>
    <a href="https://www.semafor.com/article/06/11/2026/anthropics-amodei-calls-for-workers-rights-over-ai" style="color:#4299e1;text-decoration:none;">Semafor / Amodei workers rights (June 11)</a><br>
    <a href="https://techcrunch.com/2026/06/10/anthropics-dario-amodei-has-just-one-direct-report/" style="color:#4299e1;text-decoration:none;">TechCrunch / Amodei leadership (June 10)</a><br>
    <a href="https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/" style="color:#4299e1;text-decoration:none;">SiliconANGLE / GTC Taipei keynote (June 1)</a><br>
    <a href="https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis" style="color:#4299e1;text-decoration:none;">Axios / Hassabis AGI timeline (May 26)</a><br>
    <a href="https://www.tekedia.com/google-deepmind-ceo-says-agi-could-arrive-by-2030-warning-society-has-little-time-to-prepare/" style="color:#4299e1;text-decoration:none;">Tekedia / Hassabis Stanford GSB (June 3)</a>
  </p>
</div>
</td></tr>

</table>
</td></tr>
</table>

<!-- FOOTER -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0f1c;">
<tr><td align="center" style="padding:18px 24px;">
  <p style="margin:0;color:#4a5568;font-family:Arial,sans-serif;font-size:10px;">AI Leaders Daily &middot; Compiled by Claude Code Routine &middot; laurentbello@gmail.com</p>
</td></tr>
</table>

</body>
</html>
"""

digest = {
    "subject": SUBJECT,
    "text_body": TEXT_BODY,
    "html_body": HTML_BODY,
}

with open("ai-leaders-daily/out/digest.json", "w", encoding="utf-8") as f:
    json.dump(digest, f, indent=2, ensure_ascii=False)

print("digest.json written successfully.")
