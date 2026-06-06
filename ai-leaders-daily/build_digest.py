#!/usr/bin/env python3
"""Build digest.json from researched content."""
import json, os

SUBJECT = "AI Leaders Daily — Lessons From the Frontier (06 Jun 2026)"

TEXT_BODY = """\
AI LEADERS DAILY — LESSONS FROM THE FRONTIER
06 Jun 2026

==============================================================
60-SECOND READ
==============================================================

1. ALTMAN DOUBLE-MOVE: Validates public anxiety about AI at Michigan Stargate
   groundbreaking ("people are right to be anxious"), then flies to DC to lobby
   against pre-market model approval requirements — while OpenAI targets a ~$1T IPO.

2. AMODEI REVERSAL: The CEO who warned of an AI "white-collar bloodbath" now invokes
   the Jevons Paradox ("If you automate 90% of the job, then everyone does the 10%
   of the job") — right as Anthropic eyes a ~$900B IPO.

3. HASSABIS TIGHTENS TIMELINE: AGI "2030 plus or minus a year," with 2029 now on
   the table. Today’s agentic era is "a practice run." Recursive self-improvement:
   all leading labs are focused on it.

4. HUANG’S NEW FRAME: "AI is now a profit generator. AI is now a GDP generator" —
   every token is a revenue unit. Simultaneously: invited to Senate hearing on China
   chip sales.

5. xAI AGGRESSIVE: Grok’s next model triples parameter count; xAI sends engineers
   directly to clients to poach from OpenAI and Anthropic — even as Musk admits
   distillation from OpenAI models.

==============================================================
SAM ALTMAN · OPENAI
"People Are Right to Be Anxious" — Then Head to DC
Venue: CNBC Power Lunch, Saline Township, Michigan, June 1, 2026
       Congressional meetings, Washington DC, June 3, 2026
==============================================================

THE IDEA
At the $16B Stargate campus groundbreaking in Michigan (with Oracle), Altman said
"people are right to be anxious" about AI and acknowledged that "we have failed to
articulate as an industry how people stay in control of determining the future at every
step, and have a really meaningful life in all the ways we care about." He added: "I
have no interest in AI that accomplishes some non-human goals... This has got to be
about something that is working for people, and that people are at the center of it,
and human values are what we drive forward."
Source: https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html

Three days later in Washington, Altman lobbied against pre-market model approval
requirements, pushed for expanded Commerce Dept AI testing, and advocated a "reverse
federalism" approach. On X: "The U.S. should lead on AI by continuing to develop the
very best models, making sure they’re safe, and getting cyber tools into the hands of
trusted defenders."
Source: https://www.cnbc.com/2026/06/03/open-ai-altman-congress-trump-eo.html

THE LESSON
Altman’s double move is a masterclass in managing two audiences simultaneously. The
anxiety acknowledgment buys legitimacy. The regulatory ask — no pre-approval — removes
the largest structural obstacle to OpenAI’s growth. Lesson: validate the concern;
neutralize the mechanism that would address it. What leaders do is more diagnostic
than what they acknowledge.

MOAT LENS
Pre-market model approval would raise compliance costs and entrench incumbents with
established safety infrastructure. Distribution and regulatory-relationship moats are
being assembled alongside technical moats. Who shapes the rules shapes the structure.

⛑ INCENTIVE FLAG: OpenAI is preparing for what could be a record IPO (targeting ~$1T
valuation, generating ~$2B/month revenue). Altman has every incentive to project
controlled optimism and neutralize regulatory risk pre-listing.

==============================================================
DARIO AMODEI · ANTHROPIC
The Jevons Update — Jobs Apocalypse, Revised
Venue: Financial services briefing, Lower Manhattan, May 5, 2026
       Fortune coverage, May 26, 2026
==============================================================

THE IDEA
Amodei — who’d previously warned of an AI-driven "unusually painful" disruption to
white-collar jobs — reached for the Jevons Paradox: "If you automate 90% of the job,
then everyone does the 10% of the job." Translation: automation expands rather than
destroys total employment.

He still hedged: "AI is moving faster than all these previous technologies. And so
when you strain a system more than usual, it’s possible you get these weird behaviors
and this big disruption."
Sources:
  https://fortune.com/2026/05/05/dario-amodei-jevons-paradox-will-ai-wipe-out-white-collar-jobs/
  https://fortune.com/2026/05/26/sam-altman-dario-amodei-walking-back-ai-jobs-apocalypse-prophecies-ipo/

THE LESSON
The Jevons Paradox is a real and empirically grounded economic argument — industrialization
bore it out. But it’s being deployed right before a capital event. Track what changed (his
own previous warning) vs. when it changed (proximity to IPO). That ratio tells you about
signal quality.

MOAT LENS
If Jevons holds, the moat shifts toward whoever owns the human-AI collaboration interface
— the workflow layer where augmented humans actually operate. That’s a switching-cost and
distribution moat, not a raw-model-intelligence moat.

⛑ INCENTIVE FLAG: Anthropic reportedly targeting a ~$900B IPO valuation. A narrative of
AI creating prosperity is more favorable for a public listing than one of mass unemployment.

==============================================================
DEMIS HASSABIS · GOOGLE DEEPMIND
AGI by 2029? "A Practice Run" Before the Real Thing
Venues: Axios interview, May 26, 2026
        Google I/O 2026
        Stanford GSB fireside, June 3, 2026
==============================================================

THE IDEA
Hassabis’ AGI timeline has tightened: "2030 is when I expect it to arrive, either plus
or minus a year" — with 2029 now explicitly on the table. At Google I/O, he described
the present as "the foothills of the singularity."

On today’s agentic AI: "You can imagine the agentic era in this next year is a little
bit like a practice run" — with businesses caught off-guard having received "a good
warning shot across the bow."

On recursive self-improvement: "All the leading labs are quite focused on that.
There’ll be clear gains in terms of speed of your research. But there are also risks
with that type of system."

On his deliberately strong language: "This is partly why I use some of the terms I
used, yeah, which were a little bit provocative."
Sources:
  https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis
  https://www.fastcompany.com/91544235/demis-hassabis-google-io-2026
  https://gigazine.net/gsc_news/en/20260528-google-deepmind-ceo-demis-hassabis-agi-2030/

THE LESSON
The "practice run" framing is practically useful: we are in a period where catching
up is still possible, but narrowing. Organizations that build AI-embedded operations now
develop workflow muscle memory that becomes a genuine moat when the next capability step
arrives. The recursive self-improvement comment is the one to hold: if AI can accelerate
its own R&D, the improvement curve steepens in ways current strategic plans almost
certainly do not model.

MOAT LENS
DeepMind’s bet is that the durable moat lives in scientific discovery applications
— protein folding, drug design, materials science — where validation loops are
proprietary, slow, and regulated. Switching costs come from embedded institutional
workflows in high-stakes industries, not consumer habit.

Note: Hassabis acknowledges using "provocative" language deliberately — the urgency
narrative also serves Google’s interest in being seen as the responsible AGI builder.

==============================================================
JENSEN HUANG · NVIDIA
"Every Token Is a Revenue Unit" — and a Senate Hearing
Venues: GTC Taipei / Computex 2026, Taiwan, June 1, 2026
        Stratechery interview
        Senate invitation, June 4, 2026
==============================================================

THE IDEA
Huang’s GTC Taipei keynote was a thesis repeated across several hours: agentic AI is
here, it works, it makes money. "Today we can say that agentic AI has arrived, that
useful AI has arrived." His architectural frame: "The CPU is now the conductor, and
the GPU is the orchestra." The economic reframe: "AI is now a profit generator. AI is
now a GDP generator." An AI agent is "a large language model or many sitting inside a
harness, and that harness orchestrates it to do productive work" — every token produced
is a unit of revenue.
Source: https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/

Subplot: Sen. Elizabeth Warren invited Huang to testify before the Senate Banking
Committee on June 11 about China chip sales — following a short-seller report alleging
>20% of NVIDIA’s fiscal year 2026 compute revenues come from China, partly through
illegal chip diversion via Southeast Asian intermediaries.
Source: https://www.cnbc.com/2026/06/04/nvidia-ceo-jensen-huang-warren-senate-hearing-china-ai-chips.html

THE LESSON
"Tokenomics" inverts the traditional infrastructure capex debate. When "one token =
$X of economic output," compute spending becomes a marginal revenue calculation, not
an act of faith. NVIDIA’s moat is not just the GPU but ecosystem lock-in (CUDA, NIM
microservices, NVLink) that makes switching architecturally expensive. The China hearing
is the risk to watch: geopolitical exposure is now a primary variable in the NVIDIA
thesis, not a footnote.

MOAT LENS
NVIDIA deepens switching-cost and scale moats simultaneously — every enterprise
building on CUDA and NIM faces growing exit friction. But the China exposure creates
structural risk: if export controls tighten further, the regulatory moat could work
against them in key markets.

⛑ INCENTIVE FLAG: Huang has obvious incentive to frame AI as an economic productivity
revolution. The "every token is revenue" framing is designed to keep enterprise capex
budgets open and growing.

==============================================================
xAI · ELON MUSK
Grok 1.5T, Direct Poaching, and the Distillation Admission
Venues: TechCrunch, April 30, 2026 · TechTimes, May 28, 2026
==============================================================

THE IDEA
xAI’s next Grok model has completed training at 1.5 trillion parameters — triple the
current production model — targeting a coding lead, trained partly on Cursor developer
workflow data. Release expected mid-June 2026.
Source: https://www.techtimes.com/articles/317328/20260528/grok-ai-new-model-triples-parameter-count-targets-coding-lead-release-expected-mid-june.htm

Competitive strategy: xAI is sending engineers directly to prospective clients’
offices — one contract confirmed with Shift4 Payments, switching from ChatGPT to Grok.

Legal subplot: Musk testified in California federal court that xAI used distillation
techniques on OpenAI models to train Grok, asserting this is common industry practice
— even as he continues to sue OpenAI for abandoning its non-profit mission.
Source: https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/

THE LESSON
The distillation admission says something real: if even xAI — with Musk’s resources
— found it useful to distill from OpenAI models, raw model training from scratch is
harder than frontier labs publicly suggest, and "proprietary data" moat claims should
be read with more skepticism. The direct-engineer deployment model is a classic
enterprise sales motion that bypasses procurement — effective for breaking entrenched
relationships, but expensive and hard to scale. A signal of how fierce the race for
enterprise share has become.

MOAT LENS
xAI’s moat thesis rests on data advantages (X/Twitter, developer workflow data) and
compute ambitions (space-based infrastructure). The distillation revelation erodes the
data-moat narrative. Distribution moats — who owns the enterprise relationship — are
where xAI is actually competing right now.

==============================================================
LESSONS TO KEEP
==============================================================

1. TRACK POSITION VS. CAPITAL EVENTS. When AI CEOs soften scary claims near fundraises
   or IPOs, don’t dismiss the update (Jevons Paradox is real) — but don’t take it at
   face value either. The proximity of the message to the capital event is itself data.

2. "EVERY TOKEN IS A REVENUE UNIT" IS A USEFUL INVESTMENT FRAME. The question is no
   longer ROI on compute in the abstract, but: what is the marginal economic output of
   a unit of compute, and who controls the conversion rate? That’s where infrastructure
   moats compound.

3. IF AGI ARRIVES 2029–2030, MODEL-DEPENDENT ADVANTAGES HAVE A KNOWN HORIZON.
   Durability comes from workflow moats — switching costs embedded in how organizations
   actually run — not from temporary model intelligence leads.

4. REGULATORY PROXIMITY IS A SILENT MOAT. Altman broke ground on $16B of infrastructure
   and shaped the rules governing it in the same week. In industries where regulation
   defines competitive structure, who shapes the rules is at least as important as
   who builds the best product.

==============================================================
QUESTIONS TO SIT WITH
==============================================================

1. If multiple lab CEOs now see AGI arriving in 2029–2030, what is the right discount
   rate to apply to advantages that are model-dependent versus workflow-embedded? Which
   of today’s moats survive a capability step of that magnitude?

2. The Jevons Paradox has historically played out over decades. If AI moves faster than
   previous technology transitions — as Amodei himself concedes — does the paradox still
   hold, and who bears the transition cost while the rebalancing plays out?

3. NVIDIA’s moat is deepening (CUDA lock-in, NIM ecosystem) but China exposure and
   Senate scrutiny suggest geopolitical risk is becoming a primary variable. At what
   point does that risk dominate the thesis — and how would you recognize that
   inflection early?

==============================================================
CROSS-CUTTING SIGNAL
==============================================================

This week every major AI leader pressed the accelerator (bigger models, faster AGI
timelines, more infrastructure) while simultaneously walking back the scariest societal
implications (jobs will be fine, humans stay in control, anxiety is normal and
manageable). Altman, Amodei, Hassabis, Huang — all of them, in the same week.

This convergence is not coincidence: all face near-term capital events (IPOs, Senate
hearings, fundraises) that reward optimism and punish fear. The useful inference: their
private timelines and risk assessments are almost certainly more aggressive than their
public statements suggest. Which means the stated AGI timelines (2029–2030) are likely
the conservative public version.

==============================================================
SOURCES
==============================================================

· CNBC — Altman transcript, Power Lunch, June 1:
  https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html
· CNBC — Stargate live updates, Michigan, June 1:
  https://www.cnbc.com/2026/06/01/stargate-project-michigan-live-updates.html
· CNBC — Altman meets lawmakers, DC, June 3:
  https://www.cnbc.com/2026/06/03/open-ai-altman-congress-trump-eo.html
· KFGO — Altman on model approval requirements, June 3:
  https://kfgo.com/2026/06/03/openais-altman-to-urge-us-lawmakers-not-to-require-ai-model-approvals/
· Fortune — Amodei, Jevons Paradox, May 5:
  https://fortune.com/2026/05/05/dario-amodei-jevons-paradox-will-ai-wipe-out-white-collar-jobs/
· Fortune — Altman & Amodei walking back apocalypse, May 26:
  https://fortune.com/2026/05/26/sam-altman-dario-amodei-walking-back-ai-jobs-apocalypse-prophecies-ipo/
· Axios — Hassabis close to AGI, May 26:
  https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis
· Fast Company — Hassabis at Google I/O 2026:
  https://www.fastcompany.com/91544235/demis-hassabis-google-io-2026
· Gigazine — Hassabis AGI 2030/2029, May 28:
  https://gigazine.net/gsc_news/en/20260528-google-deepmind-ceo-demis-hassabis-agi-2030/
· SiliconAngle — Huang GTC Taipei keynote, June 1:
  https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/
· Stratechery — Huang interview on accelerated computing:
  https://stratechery.com/2026/an-interview-with-nvidia-ceo-jensen-huang-about-accelerated-computing/
· CNBC — Warren invites Huang to Senate hearing, June 4:
  https://www.cnbc.com/2026/06/04/nvidia-ceo-jensen-huang-warren-senate-hearing-china-ai-chips.html
· TechTimes — Grok 1.5T parameters, May 28:
  https://www.techtimes.com/articles/317328/20260528/grok-ai-new-model-triples-parameter-count-targets-coding-lead-release-expected-mid-june.htm
· TechCrunch — Musk testifies xAI trained on OpenAI models, April 30:
  https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/
"""

HTML_BODY = """\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Leaders Daily — Lessons From the Frontier (06 Jun 2026)</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f8;font-family:Georgia,'Times New Roman',serif;color:#222;">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td>

<!-- HEADER -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a18;border-bottom:3px solid #4a5fff;">
<tr><td style="padding:32px 40px 28px;">
  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#5a6bff;text-transform:uppercase;margin-bottom:8px;">AI Leaders Daily</div>
  <div style="font-size:24px;font-weight:700;color:#ffffff;line-height:1.2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Lessons From the Frontier</div>
  <div style="font-size:13px;color:#7a84aa;margin-top:6px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">06 Jun 2026 &nbsp;&middot;&nbsp; Mauritius (UTC+4)</div>
</td></tr>
</table>

<!-- 60-SECOND READ -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#12122a;border-bottom:1px solid #222240;">
<tr><td style="padding:28px 40px;">
  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#5a6bff;text-transform:uppercase;margin-bottom:16px;">60-Second Read</div>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#bbc4e8;line-height:1.6;border-bottom:1px solid #1e1e3a;">
      <span style="color:#5a6bff;font-weight:700;">&#9656; Altman double-move &mdash;</span> Validates anxiety ("people are right to be anxious") at Michigan Stargate groundbreaking, then lobbies DC against pre-market model approval requirements. OpenAI targets ~$1T IPO.
    </td></tr>
    <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#bbc4e8;line-height:1.6;border-bottom:1px solid #1e1e3a;">
      <span style="color:#ff6b6b;font-weight:700;">&#9656; Amodei reversal &mdash;</span> Former prophet of AI "white-collar bloodbath" invokes the Jevons Paradox ("automate 90%, everyone does the 10%") weeks before Anthropic’s ~$900B IPO.
    </td></tr>
    <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#bbc4e8;line-height:1.6;border-bottom:1px solid #1e1e3a;">
      <span style="color:#5dba7a;font-weight:700;">&#9656; Hassabis tightens timeline &mdash;</span> AGI "2030 &plusmn; a year," 2029 now on the table. Agentic era today is "a practice run." Recursive self-improvement: all leading labs are on it.
    </td></tr>
    <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#bbc4e8;line-height:1.6;border-bottom:1px solid #1e1e3a;">
      <span style="color:#f5a623;font-weight:700;">&#9656; Huang’s new frame &mdash;</span> "AI is now a profit generator. AI is now a GDP generator." Every token = a revenue unit. Simultaneously invited to Senate hearing on China chip sales.
    </td></tr>
    <tr><td style="padding:6px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;color:#bbc4e8;line-height:1.6;">
      <span style="color:#c07ff5;font-weight:700;">&#9656; xAI aggressive &mdash;</span> Grok triples parameter count to 1.5T. Engineers deployed directly to clients. Musk admits distillation from OpenAI models — even as he sues them.
    </td></tr>
  </table>
</td></tr>
</table>

<!-- MAIN CONTENT -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
<tr><td style="padding:40px 40px 10px;">

  <!-- ALTMAN -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid #4a5fff;padding-left:0;margin-bottom:40px;">
  <tr><td style="padding-left:20px;padding-bottom:32px;">
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:#4a5fff;text-transform:uppercase;margin-bottom:6px;">Sam Altman &middot; OpenAI</div>
    <div style="font-size:20px;font-weight:700;color:#0a0a18;margin-bottom:4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">&ldquo;People Are Right to Be Anxious&rdquo; &mdash; Then Head to DC</div>
    <div style="font-size:12px;color:#999;margin-bottom:18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">CNBC Power Lunch &middot; Saline, Michigan &middot; June 1, 2026 &nbsp;&bull;&nbsp; DC Congressional meetings &middot; June 3, 2026</div>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Idea</div>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">At the $16B Stargate campus groundbreaking (with Oracle), Altman said <em>&ldquo;people are right to be anxious&rdquo;</em> about AI and acknowledged that <em>&ldquo;we have failed to articulate as an industry how people stay in control of determining the future at every step, and have a really meaningful life in all the ways we care about.&rdquo;</em> He added: <em>&ldquo;I have no interest in AI that accomplishes some non-human goals... This has got to be about something that is working for people.&rdquo;</em> (<a href="https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html" style="color:#4a5fff;">CNBC transcript, June 1</a>)</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">Three days later in Washington, Altman lobbied against pre-market model approval requirements, pushed for expanded Commerce Dept AI testing, and advocated a &ldquo;reverse federalism&rdquo; approach. On X: <em>&ldquo;The U.S. should lead on AI by continuing to develop the very best models, making sure they’re safe, and getting cyber tools into the hands of trusted defenders.&rdquo;</em> (<a href="https://www.cnbc.com/2026/06/03/open-ai-altman-congress-trump-eo.html" style="color:#4a5fff;">CNBC, June 3</a>)</p>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Lesson</div>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">Altman’s double move is a masterclass in managing two audiences simultaneously. The anxiety acknowledgment buys legitimacy with the public and skeptical politicians. The regulatory ask &mdash; no pre-approval &mdash; removes the largest structural obstacle to OpenAI’s growth. Principle: <strong>validate the concern; neutralize the mechanism that would address it.</strong> What leaders <em>do</em> is more diagnostic than what they <em>acknowledge</em>.</p>

    <table width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color:#f5f6ff;border-radius:6px;margin-bottom:14px;">
    <tr><td>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#4a5fff;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Moat Lens</div>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#444;">Pre-market model approval raises compliance costs and entrenches incumbents with established safety infrastructure &mdash; which is exactly why Altman opposes it while framing the opposition as &ldquo;pro-innovation.&rdquo; <strong>Distribution and regulatory-relationship moats</strong> are being built alongside technical moats. Who shapes the rules shapes the competitive structure.</p>
    </td></tr>
    </table>

    <p style="margin:0;font-size:12px;color:#999;font-style:italic;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">&#9873; Incentive flag: OpenAI preparing for a record-breaking IPO (targeting ~$1T valuation, generating ~$2B/month in revenue). Altman has every incentive to project controlled optimism and neutralize structural regulatory risk pre-listing.</p>
  </td></tr>
  </table>

  <!-- AMODEI -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid #ff5555;margin-bottom:40px;">
  <tr><td style="padding-left:20px;padding-bottom:32px;">
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:#ff5555;text-transform:uppercase;margin-bottom:6px;">Dario Amodei &middot; Anthropic</div>
    <div style="font-size:20px;font-weight:700;color:#0a0a18;margin-bottom:4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">The Jevons Update &mdash; Jobs Apocalypse, Revised</div>
    <div style="font-size:12px;color:#999;margin-bottom:18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Financial services briefing, Lower Manhattan &middot; May 5, 2026 &nbsp;&bull;&nbsp; Fortune coverage, May 26, 2026</div>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Idea</div>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">Amodei &mdash; who’d previously warned of an AI-driven &ldquo;unusually painful&rdquo; disruption to white-collar jobs &mdash; reached for the Jevons Paradox: <em>&ldquo;If you automate 90% of the job, then everyone does the 10% of the job.&rdquo;</em> The paradox holds that efficiency gains expand total demand, so automation expands rather than destroys total employment. (<a href="https://fortune.com/2026/05/05/dario-amodei-jevons-paradox-will-ai-wipe-out-white-collar-jobs/" style="color:#4a5fff;">Fortune, May 5</a>)</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">He still hedged: <em>&ldquo;AI is moving faster than all these previous technologies. And so when you strain a system more than usual, it’s possible you get these weird behaviors and this big disruption.&rdquo;</em> (<a href="https://fortune.com/2026/05/26/sam-altman-dario-amodei-walking-back-ai-jobs-apocalypse-prophecies-ipo/" style="color:#4a5fff;">Fortune, May 26</a>)</p>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Lesson</div>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">The Jevons Paradox is a real and empirically grounded economic argument. But it’s being deployed right before a capital event. <strong>Track what changed (his own prior warning) vs. when it changed (proximity to IPO).</strong> That ratio tells you about signal quality. Both genuine updating and narrative management are simultaneously possible &mdash; neither rules out the other.</p>

    <table width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color:#fff5f5;border-radius:6px;margin-bottom:14px;">
    <tr><td>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#ff5555;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Moat Lens</div>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#444;">If Jevons holds and automation expands demand for complementary human work, the moat shifts toward whoever owns the <strong>human-AI collaboration interface</strong> &mdash; the workflow layer where augmented humans actually operate. That’s a switching-cost and distribution moat, not a raw-model-intelligence moat. As models commoditize, the workflow layer may become the durable asset.</p>
    </td></tr>
    </table>

    <p style="margin:0;font-size:12px;color:#999;font-style:italic;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">&#9873; Incentive flag: Anthropic reportedly targeting a ~$900B IPO valuation. A narrative of AI-driven prosperity is more favorable for a public listing than mass unemployment.</p>
  </td></tr>
  </table>

  <!-- HASSABIS -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid #5dba7a;margin-bottom:40px;">
  <tr><td style="padding-left:20px;padding-bottom:32px;">
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:#5dba7a;text-transform:uppercase;margin-bottom:6px;">Demis Hassabis &middot; Google DeepMind</div>
    <div style="font-size:20px;font-weight:700;color:#0a0a18;margin-bottom:4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">AGI by 2029? &ldquo;A Practice Run&rdquo; Before the Real Thing</div>
    <div style="font-size:12px;color:#999;margin-bottom:18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Axios &middot; May 26, 2026 &nbsp;&bull;&nbsp; Google I/O 2026 &nbsp;&bull;&nbsp; Stanford GSB &middot; June 3, 2026</div>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Idea</div>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">Hassabis’ AGI timeline has tightened: <em>&ldquo;2030 is when I expect it to arrive, either plus or minus a year&rdquo;</em> &mdash; with 2029 now explicitly on the table. At Google I/O, he described the present as &ldquo;the foothills of the singularity.&rdquo; On today’s agentic era: <em>&ldquo;You can imagine the agentic era in this next year is a little bit like a practice run&rdquo;</em> &mdash; with businesses caught off-guard receiving <em>&ldquo;a good warning shot across the bow.&rdquo;</em> (<a href="https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis" style="color:#4a5fff;">Axios, May 26</a>)</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">On recursive self-improvement: <em>&ldquo;All the leading labs are quite focused on that. There’ll be clear gains in terms of speed of your research. But there are also risks with that type of system.&rdquo;</em> (<a href="https://www.fastcompany.com/91544235/demis-hassabis-google-io-2026" style="color:#4a5fff;">Fast Company, I/O 2026</a>)</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">On his deliberately strong language: <em>&ldquo;This is partly why I use some of the terms I used, yeah, which were a little bit provocative.&rdquo;</em> (<a href="https://gigazine.net/gsc_news/en/20260528-google-deepmind-ceo-demis-hassabis-agi-2030/" style="color:#4a5fff;">Gigazine, May 28</a>)</p>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Lesson</div>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">The &ldquo;practice run&rdquo; framing is actionable: we are in a period where catching up is still possible, but the window is narrowing. Organizations building AI-embedded operations now develop workflow muscle memory that becomes a genuine moat when the next capability step arrives. <strong>The recursive self-improvement comment is the one to hold</strong> &mdash; if AI can materially accelerate its own R&amp;D, the improvement curve steepens in ways current strategic plans almost certainly do not model.</p>

    <table width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color:#f4fff7;border-radius:6px;margin-bottom:14px;">
    <tr><td>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#5dba7a;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Moat Lens</div>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#444;">DeepMind’s distinctive bet: the durable moat lives in <strong>scientific discovery applications</strong> &mdash; protein folding, drug design, materials science &mdash; where validation loops are proprietary, slow, and regulated. Switching costs come from embedded institutional workflows in high-stakes industries, not consumer habit. A fundamentally different moat pattern than OpenAI’s distribution moat or NVIDIA’s infrastructure moat.</p>
    </td></tr>
    </table>

    <p style="margin:0;font-size:12px;color:#999;font-style:italic;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Note: Hassabis acknowledges using &ldquo;provocative&rdquo; language deliberately. The urgency narrative also serves Google’s interest in being seen as the responsible AGI builder.</p>
  </td></tr>
  </table>

  <!-- JENSEN HUANG -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid #f5a623;margin-bottom:40px;">
  <tr><td style="padding-left:20px;padding-bottom:32px;">
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:#f5a623;text-transform:uppercase;margin-bottom:6px;">Jensen Huang &middot; NVIDIA</div>
    <div style="font-size:20px;font-weight:700;color:#0a0a18;margin-bottom:4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">&ldquo;Every Token Is a Revenue Unit&rdquo; &mdash; and a Senate Hearing</div>
    <div style="font-size:12px;color:#999;margin-bottom:18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">GTC Taipei / Computex 2026 &middot; June 1, 2026 &nbsp;&bull;&nbsp; Stratechery interview &nbsp;&bull;&nbsp; Senate invitation &middot; June 4, 2026</div>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Idea</div>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">Huang’s GTC Taipei keynote was one thesis, repeated across hours: agentic AI is here, it works, it makes money. <em>&ldquo;Today we can say that agentic AI has arrived, that useful AI has arrived.&rdquo;</em> Architectural frame: <em>&ldquo;The CPU is now the conductor, and the GPU is the orchestra.&rdquo;</em> Economic reframe: <em>&ldquo;AI is now a profit generator. AI is now a GDP generator.&rdquo;</em> An AI agent is <em>&ldquo;a large language model or many sitting inside a harness, and that harness orchestrates it to do productive work&rdquo;</em> &mdash; every token produced is a unit of revenue. (<a href="https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/" style="color:#4a5fff;">SiliconAngle, June 1</a>)</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">Subplot: Sen. Elizabeth Warren invited Huang to testify before the Senate Banking Committee on June 11 about China chip sales &mdash; following a short-seller report alleging &gt;20% of NVIDIA’s fiscal 2026 compute revenues come from China, partly through illegal chip diversion via Southeast Asian intermediaries. (<a href="https://www.cnbc.com/2026/06/04/nvidia-ceo-jensen-huang-warren-senate-hearing-china-ai-chips.html" style="color:#4a5fff;">CNBC, June 4</a>)</p>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Lesson</div>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">&ldquo;Tokenomics&rdquo; inverts the traditional capex debate. When you can say &ldquo;one token = $X of economic output,&rdquo; infrastructure spending becomes a marginal revenue calculation, not an act of faith. <strong>NVIDIA’s moat is not just the GPU but ecosystem lock-in</strong> (CUDA, NIM microservices, NVLink fabric) that makes switching architecturally expensive. The China hearing is the risk to watch: geopolitical exposure is now a primary variable in the NVIDIA thesis, not a footnote.</p>

    <table width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color:#fffcf0;border-radius:6px;margin-bottom:14px;">
    <tr><td>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#f5a623;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Moat Lens</div>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#444;">NVIDIA deepens <strong>switching-cost and scale moats</strong> simultaneously &mdash; every enterprise building on CUDA and NIM faces growing exit friction. But the China exposure creates structural, not cyclical, risk: if export controls tighten, geopolitical dynamics could work against them in key markets.</p>
    </td></tr>
    </table>

    <p style="margin:0;font-size:12px;color:#999;font-style:italic;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">&#9873; Incentive flag: Huang has obvious incentive to frame AI as an economic productivity revolution &mdash; NVIDIA sells the infrastructure. &ldquo;Every token is revenue&rdquo; is designed to keep enterprise capex budgets open and growing.</p>
  </td></tr>
  </table>

  <!-- xAI -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left:4px solid #b07ff5;margin-bottom:40px;">
  <tr><td style="padding-left:20px;padding-bottom:32px;">
    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:#b07ff5;text-transform:uppercase;margin-bottom:6px;">xAI &middot; Elon Musk</div>
    <div style="font-size:20px;font-weight:700;color:#0a0a18;margin-bottom:4px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Grok 1.5T, Direct Poaching, and the Distillation Admission</div>
    <div style="font-size:12px;color:#999;margin-bottom:18px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">TechCrunch &middot; April 30, 2026 &nbsp;&bull;&nbsp; TechTimes &middot; May 28, 2026</div>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Idea</div>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">xAI’s next Grok model has completed training at 1.5 trillion parameters &mdash; triple the current production model &mdash; targeting a coding lead, trained partly on Cursor developer workflow data. Release expected mid-June 2026. (<a href="https://www.techtimes.com/articles/317328/20260528/grok-ai-new-model-triples-parameter-count-targets-coding-lead-release-expected-mid-june.htm" style="color:#4a5fff;">TechTimes, May 28</a>)</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#333;">Competitive strategy: xAI is sending engineers directly to prospective clients’ offices &mdash; one contract confirmed with Shift4 Payments, switching from ChatGPT to Grok.</p>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">Legal subplot: Musk testified in California federal court that xAI used distillation techniques on OpenAI models to train Grok &mdash; asserting this is common industry practice &mdash; even as he continues to sue OpenAI for abandoning its non-profit mission. (<a href="https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/" style="color:#4a5fff;">TechCrunch, April 30</a>)</p>

    <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#444;text-transform:uppercase;font-weight:700;margin-bottom:8px;">The Lesson</div>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.75;color:#333;">The distillation admission says something real: if even xAI &mdash; with Musk’s resources &mdash; found it useful to distill from OpenAI models, raw model training from scratch is harder than frontier labs publicly suggest, and <strong>&ldquo;proprietary data&rdquo; moat claims should be read with more skepticism.</strong> The direct-engineer deployment model is a classic enterprise sales motion &mdash; effective for breaking entrenched relationships, expensive to scale. It’s a signal of how fierce the enterprise share race has become.</p>

    <table width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color:#faf5ff;border-radius:6px;">
    <tr><td>
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:1px;color:#b07ff5;text-transform:uppercase;font-weight:700;margin-bottom:8px;">Moat Lens</div>
      <p style="margin:0;font-size:14px;line-height:1.7;color:#444;">xAI’s data-moat narrative is undercut by the distillation revelation. <strong>Distribution moats</strong> &mdash; who owns the enterprise relationship &mdash; are where xAI is actually competing right now, not model quality alone. Data advantage and compute ambition remain the stated long-term thesis.</p>
    </td></tr>
    </table>
  </td></tr>
  </table>

</td></tr>
</table>

<!-- LESSONS TO KEEP -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a18;">
<tr><td style="padding:36px 40px;">
  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#5a6bff;text-transform:uppercase;margin-bottom:18px;">Lessons to Keep</div>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="padding:10px 0;border-bottom:1px solid #181830;vertical-align:top;">
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#5a6bff;font-weight:700;margin-bottom:4px;">1</div>
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><strong style="color:#fff;">Track position vs. capital events.</strong> When AI CEOs soften scary claims near fundraises or IPOs, don’t dismiss the update &mdash; but don’t take it at face value either. The proximity of the message to the capital event is itself data.</div>
    </td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #181830;vertical-align:top;">
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#5a6bff;font-weight:700;margin-bottom:4px;">2</div>
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><strong style="color:#fff;">&ldquo;Every token is a revenue unit&rdquo; is a useful investment frame.</strong> The question is no longer ROI on compute in the abstract, but: what is the marginal economic output of a unit of compute, and who controls that conversion rate? That’s where infrastructure moats compound.</div>
    </td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #181830;vertical-align:top;">
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#5a6bff;font-weight:700;margin-bottom:4px;">3</div>
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><strong style="color:#fff;">If AGI arrives 2029–2030, model-dependent advantages have a known horizon.</strong> Durability comes from workflow moats &mdash; switching costs embedded in how organizations actually run &mdash; not from temporary model intelligence leads.</div>
    </td></tr>
    <tr><td style="padding:10px 0;vertical-align:top;">
      <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;color:#5a6bff;font-weight:700;margin-bottom:4px;">4</div>
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><strong style="color:#fff;">Regulatory proximity is a silent moat.</strong> Altman broke ground on $16B of infrastructure and shaped the rules governing it in the same week. In industries where regulation defines competitive structure, who shapes the rules is at least as important as who builds the best product.</div>
    </td></tr>
  </table>
</td></tr>
</table>

<!-- QUESTIONS TO SIT WITH -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#10102a;border-top:1px solid #1e1e40;">
<tr><td style="padding:36px 40px;">
  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#5a6bff;text-transform:uppercase;margin-bottom:18px;">Questions to Sit With</div>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e40;">
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><span style="color:#5a6bff;font-weight:700;">1. </span>If multiple lab CEOs now see AGI arriving in 2029–2030, what is the right discount rate to apply to advantages that are model-dependent versus workflow-embedded? Which of today’s moats survive a capability step of that magnitude?</div>
    </td></tr>
    <tr><td style="padding:10px 0;border-bottom:1px solid #1e1e40;">
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><span style="color:#5a6bff;font-weight:700;">2. </span>The Jevons Paradox has historically played out over decades. If AI moves faster than previous technology transitions &mdash; as Amodei himself concedes &mdash; does the paradox still hold, and who bears the transition cost while the rebalancing plays out?</div>
    </td></tr>
    <tr><td style="padding:10px 0;">
      <div style="font-size:14px;color:#bbc4e8;line-height:1.7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;"><span style="color:#5a6bff;font-weight:700;">3. </span>NVIDIA’s moat is deepening (CUDA lock-in, NIM ecosystem) but China exposure and Senate scrutiny suggest geopolitical risk is becoming a primary variable. At what point does that risk dominate the thesis &mdash; and how would you recognize that inflection early?</div>
    </td></tr>
  </table>
</td></tr>
</table>

<!-- CROSS-CUTTING SIGNAL -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#160a30;border-top:3px solid #5a6bff;">
<tr><td style="padding:36px 40px;">
  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#c0a0ff;text-transform:uppercase;margin-bottom:14px;">Cross-Cutting Signal</div>
  <p style="margin:0;font-size:15px;line-height:1.8;color:#e0d0ff;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">This week every major AI leader pressed the accelerator (bigger models, faster AGI timelines, more infrastructure) while simultaneously walking back the scariest societal implications (jobs will be fine, humans stay in control, anxiety is normal and manageable). Altman, Amodei, Hassabis, Huang &mdash; all of them, in the same week. This convergence is not coincidence: all face near-term capital events (IPOs, Senate hearings, fundraises) that reward optimism and punish fear. <strong style="color:#fff;">The useful inference: their private timelines and risk assessments are almost certainly more aggressive than their public statements suggest.</strong> Which means the stated AGI timelines (2029–2030) are likely the <em>conservative</em> public version.</p>
</td></tr>
</table>

<!-- SOURCES -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#080810;border-top:1px solid #12121e;">
<tr><td style="padding:28px 40px;">
  <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:2px;color:#333;text-transform:uppercase;margin-bottom:14px;">Sources</div>
  <table cellpadding="2" cellspacing="0" border="0">
    <tr><td><a href="https://www.cnbc.com/2026/06/01/cnbc-exclusive-transcript-openai-ceo-sam-altman-speaks-with-cnbcs-david-faber-on-power-lunch-today.html" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">CNBC &mdash; Altman transcript, Power Lunch, June 1</a></td></tr>
    <tr><td><a href="https://www.cnbc.com/2026/06/01/stargate-project-michigan-live-updates.html" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">CNBC &mdash; Stargate Michigan live updates, June 1</a></td></tr>
    <tr><td><a href="https://www.cnbc.com/2026/06/03/open-ai-altman-congress-trump-eo.html" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">CNBC &mdash; Altman meets lawmakers, DC, June 3</a></td></tr>
    <tr><td><a href="https://kfgo.com/2026/06/03/openais-altman-to-urge-us-lawmakers-not-to-require-ai-model-approvals/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">KFGO &mdash; Altman on model approval requirements, June 3</a></td></tr>
    <tr><td><a href="https://fortune.com/2026/05/05/dario-amodei-jevons-paradox-will-ai-wipe-out-white-collar-jobs/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">Fortune &mdash; Amodei, Jevons Paradox, May 5</a></td></tr>
    <tr><td><a href="https://fortune.com/2026/05/26/sam-altman-dario-amodei-walking-back-ai-jobs-apocalypse-prophecies-ipo/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">Fortune &mdash; Altman &amp; Amodei walking back apocalypse, May 26</a></td></tr>
    <tr><td><a href="https://www.axios.com/2026/05/26/deepmind-ceo-demis-hassabis" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">Axios &mdash; Hassabis close to AGI, May 26</a></td></tr>
    <tr><td><a href="https://www.fastcompany.com/91544235/demis-hassabis-google-io-2026" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">Fast Company &mdash; Hassabis at Google I/O 2026</a></td></tr>
    <tr><td><a href="https://gigazine.net/gsc_news/en/20260528-google-deepmind-ceo-demis-hassabis-agi-2030/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">Gigazine &mdash; Hassabis AGI 2030/2029, May 28</a></td></tr>
    <tr><td><a href="https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">SiliconAngle &mdash; Huang GTC Taipei keynote, June 1</a></td></tr>
    <tr><td><a href="https://stratechery.com/2026/an-interview-with-nvidia-ceo-jensen-huang-about-accelerated-computing/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">Stratechery &mdash; Huang interview on accelerated computing</a></td></tr>
    <tr><td><a href="https://www.cnbc.com/2026/06/04/nvidia-ceo-jensen-huang-warren-senate-hearing-china-ai-chips.html" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">CNBC &mdash; Warren invites Huang to Senate hearing, June 4</a></td></tr>
    <tr><td><a href="https://www.techtimes.com/articles/317328/20260528/grok-ai-new-model-triples-parameter-count-targets-coding-lead-release-expected-mid-june.htm" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">TechTimes &mdash; Grok 1.5T parameters, May 28</a></td></tr>
    <tr><td><a href="https://techcrunch.com/2026/04/30/elon-musk-testifies-that-xai-trained-grok-on-openai-models/" style="color:#444;font-size:11px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;">TechCrunch &mdash; Musk testifies xAI trained on OpenAI models, April 30</a></td></tr>
  </table>
  <p style="margin:20px 0 0;font-size:10px;color:#2a2a3a;font-style:italic;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">AI Leaders Daily runs as a Claude Code Routine on Laurent Bello’s Claude membership. Research by Claude; delivered by Gmail SMTP.</p>
</td></tr>
</table>

</td></tr>
</table>

</body>
</html>"""

digest = {
    "subject": SUBJECT,
    "text_body": TEXT_BODY,
    "html_body": HTML_BODY,
}

out_path = "ai-leaders-daily/out/digest.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(digest, f, ensure_ascii=False, indent=2)

print(f"Written to {out_path}")
