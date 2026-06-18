#!/usr/bin/env python3
"""Build today's AI Leaders Daily digest and write to out/digest.json."""
import json, pathlib

SUBJECT = "AI Leaders Daily — Lessons From the Frontier (18 Jun 2026)"

TEXT_BODY = """\
AI LEADERS DAILY — LESSONS FROM THE FRONTIER
18 Jun 2026 (Mauritius, UTC+4)

──────────────────────────────────────────────
60-SECOND READ
──────────────────────────────────────────────

• G7 AI Summit (yesterday): Altman, Amodei, and Hassabis sat with G7 heads
  of state in France calling for a U.S.-led global AI standards forum — each
  with obvious skin in the game.

• Anthropic kill-switch (June 12): The US government disabled Fable 5 and
  Mythos 5 for all foreign nationals this week, forcing Amodei into a live
  negotiation with the Trump administration days before flying to the G7.

• Amodei’s policy essay (~June 10): He argues “Powerful AI” — a “country of
  geniuses in a datacenter” — is 1–2 years away and calls for binding
  regulation. He filed an S-1 at a $965B valuation three weeks ago.

• Jensen Huang (June 16 AP interview): AI “has closed the technology divide
  more so than any technology in history” and society needs “new social norms.”

• Demis Hassabis (Stanford GSB, June 3): We are “in the foothills of the
  singularity,” AGI 3–4 years out; DeepMind’s moat is scientific discovery
  data, not chatbot scale.

──────────────────────────────────────────────
SAM ALTMAN (OpenAI) — “Don’t Cede Your Responsibilities to Labs Like Mine”
G7 Summit · Évian-les-Bains, France · June 17, 2026
──────────────────────────────────────────────

THE IDEA
Sitting between President Trump and Egyptian President el-Sisi, Altman was
the first AI CEO to address the G7 working lunch. He called for "an
international forum for discussion that establishes globally accepted
standards for testing, provides expert and impartial analysis of capabilities
and risks, and serves as a venue for cooperation among nations." In the same
breath: "Do not cede your responsibilities to AI labs like mine."

OpenAI’s Chris Lehane said afterward that there was "a coalescing amongst
the countries and the businesses … around this idea … of being able to try
to create; design; develop a forum or a space for the different democratic
countries to be able to work together."

Sources:
 - CNBC, June 17: https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html
 - Semafor, June 17: https://www.semafor.com/article/06/17/2026/ai-ceos-talk-global-standards-at-g7
 - Malay Mail, June 18: https://www.malaymail.com/news/tech-gadgets/2026/06/18/openai-chief-sam-altman-tells-g7-to-not-cede-responsibilities-to-ai-giants/224215

THE LESSON
These two statements seem in tension but aren’t. Telling governments not to
abdicate to AI labs positions Altman as trustworthy while pre-empting the
credibility problem that comes if OpenAI appears to be writing its own rules.
With an IPO on the horizon, a predictable governance framework — ideally one
OpenAI helped shape — is in the company’s direct interest. The structural
insight: companies that shape the vocabulary of AI governance build a durable
regulatory-distribution advantage. The ones not at the table don’t get to
complain about the rules.

MOAT LENS
Strengthens: regulatory distribution (being the trusted government
interlocutor); brand/legitimacy (voluntarily inviting oversight differentiates
in enterprise sales where compliance officers matter).
Erodes: commoditized model producers excluded from the standards conversation,
who will face rules shaped by others.

──────────────────────────────────────────────
DARIO AMODEI (Anthropic) — The Kill-Switch Week and the Policy Agenda
Policy essay + Export controls + G7 · June 10–17, 2026
──────────────────────────────────────────────

THE IDEA (three events to read together)

EVENT 1 — THE EXPORT-CONTROL ORDER (June 12)
The Trump administration issued an emergency directive forcing Anthropic to
disable Fable 5 and Mythos 5 for all foreign nationals worldwide — including
Anthropic’s own foreign-national employees. Anthropic’s statement: "The US
government, citing national security authorities, has issued an export control
directive to suspend all access to Fable 5 and Mythos 5 by any foreign
national, whether inside or outside the United States, including foreign
national Anthropic employees."

Anthropic complied but contested the rationale, saying it had been given only
"verbal evidence of a potential narrow, non-universal jailbreak" and that the
vulnerability level "is widely available from other models, including
OpenAI’s GPT-5.5."

Sources:
 - Anthropic statement: https://www.anthropic.com/news/fable-mythos-access
 - Axios, June 12: https://www.axios.com/2026/06/12/anthropic-trump-mythos-fable-national-security
 - Fortune, June 13: https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/

EVENT 2 — THE POLICY ESSAY (~June 10)
In "Policy on the AI Exponential," Amodei argued: "If these scaling laws
continue for only a year or two longer, we are likely to get what I’ve called
Powerful AI, or ‘a country of geniuses in a datacenter’" — a system that
could be "the dominant source of military and economic power for any nation."

The mismatch: "In the several years that it can take Congress to act, AI can
go from an amusing toy to the full country of geniuses." He called for FAA-
style mandatory pre-deployment testing, labor displacement support, civil
liberties protections, and a democratic chip coalition that excludes China.

Sources:
 - Amodei essay: https://darioamodei.com/post/policy-on-the-ai-exponential
 - Axios, June 10: https://www.axios.com/2026/06/10/anthropic-ceo-government-block-dangerous-ai

EVENT 3 — THE G7 (June 17)
Five days after his models were pulled, Amodei flew to France and told G7
heads of state that international cooperation should include "structured
access to frontier models" and chip/component trade that "excludes China."
Source: https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html

INCENTIVE NOTE: Amodei is (a) preparing a ~$965B IPO — the regulatory
environment he helps design shapes his S-1 story; (b) simultaneously fighting
the Trump administration over the very "structured access" he proposed
globally. Neither invalidates his policy proposals, but both mean his
arguments should be read as advocacy as well as analysis.

THE LESSON
The export-control episode is the most instructive AI event of the week — not
because of the specific jailbreak claim but because of what it reveals
structurally: a government can disable a $965B company’s flagship products
with a letter. No court. No legislature. The Anthropic S-1 now carries a risk
category most investors weren’t modeling a month ago.

The deeper structural point: AI at the frontier is becoming state
infrastructure, and state infrastructure gets restricted in ways that software
products don’t. The companies that survive will make themselves indispensable
while also making themselves easy to regulate — which requires investing in
technical auditability as much as in model performance. Safety as a brand is
not the same as safety as an architecture.

MOAT LENS
Strengthens: regulatory architecture (auditability, access controls, safety
logs make companies easier for governments to work with); mission alignment as
a genuine talent magnet.
Erodes: pure-play global reach moats (export-control logic favors US-
government-compliant labs over all others); international competitor models
(foreign nationals now excluded from the best US-frontier AI).

──────────────────────────────────────────────
DEMIS HASSABIS (Google DeepMind) — “In the Foothills of the Singularity”
Stanford GSB · June 3, 2026 + G7 · June 17, 2026
──────────────────────────────────────────────

THE IDEA
At Stanford GSB, Hassabis said: "When we look back at this time, I think —
maybe I’m thinking 10 years from now — I think we will realize that we were
standing in the foothills of the singularity now." He puts AGI at 3–4 years
out (2029–2030). At the G7, he argued for "scientific diplomacy" — the claim
that AI can solve climate change and drug discovery if there is a stable
framework for public-private cooperation.

Sources:
 - Semafor, May 20: https://www.semafor.com/article/05/20/2026/google-exec-demis-hassabis-predicts-were-at-the-foothills-of-the-singularity
 - Stanford Daily, May 29: https://stanforddaily.com/2026/05/29/deepmind-ceo-warns-about-ai/
 - CNBC G7, June 17: https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html

THE LESSON
"Scientific diplomacy" is Hassabis’s competitive angle. DeepMind’s moat claim
is not chatbot volume or API revenue — it’s AlphaFold → drug discovery →
government partnerships in biomedical research. When Hassabis talks about AI
solving climate and disease, he describes sectors where deep domain datasets
(protein structures, climate models, genomics) compound as advantages more
durably than in general-purpose AI. That’s a moat built on proprietary
scientific data, not distribution scale.

Separately: the "foothills" framing functions as a call to action. If
governments believe AGI is 3–4 years away, they will prioritize DeepMind’s
research agenda. Urgency is the precondition for the public-private
cooperation he needs.

MOAT LENS
Strengthens: scientific dataset accumulation (AlphaFold, genomics, climate
models); government/institutional partnerships in regulated domains (pharma,
energy, defense); cross-disciplinary talent that won’t join a pure-AI company.
Erodes: general-purpose model providers without deep scientific data;
academic research institutions that can no longer keep pace.

──────────────────────────────────────────────
JENSEN HUANG (Nvidia) — “New Social Norms” and the $9 Trillion Claim
AP Interview, Sherman TX · June 16, 2026 + GTC Taipei · June 1, 2026
──────────────────────────────────────────────

THE IDEA
In an AP interview at a Coherent manufacturing expansion in Sherman, TX,
Huang said: "We need to create new social norms. I would advocate that
everybody use AI. Just go engage it." He argued AI "has closed the technology
divide more so than any technology in history." His analogy: "When I was
growing up, I used to play in the streets. When cars came along, you obviously
can’t play in the streets now."

At GTC Taipei (June 1), Huang made the economic case: ~30–40M software
developers represent $3 trillion in annual salaries but can now generate "$9
trillion worth of productive work." His conclusion: enterprises will want more
developers, not fewer. He declared: "Today we can say that agentic AI has
arrived, that useful AI has arrived."

Sources:
 - AP/Yahoo, June 16: https://www.yahoo.com/news/politics/articles/ap-exclusive-nvidias-jensen-huang-200608744.html
 - SiliconAngle GTC Taipei, June 1: https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/

INCENTIVE NOTE: Huang is making the bull case for an industry whose
infrastructure he sells. The $9T-from-$3T productivity claim is a marketing
argument for continued GPU spend, not a validated macroeconomic finding.

THE LESSON
The "technology divide" framing is Huang’s most interesting — and testable —
claim. If AI genuinely makes non-programmers capable of advanced work, the
implication cuts both ways: it lowers barriers for small-company challengers
(eroding technical-expertise moats) but raises barriers for any business
that fails to adopt quickly (the competitive divide shifts from "who has the
best engineers" to "who has the best AI-augmented workflows").

The car analogy is sharper than it sounds: society didn’t stop using streets
— it rebuilt them for cars. Businesses that rebuild operating models around AI
rather than bolting it on will capture the surplus Huang’s arithmetic implies.
The ones that don’t will find their moat has changed shape without their
noticing.

MOAT LENS
Strengthens: Nvidia’s infrastructure moat (accelerated compute remains the
scarce input if even half the productivity claim holds); workflow switching
costs (deep AI integration creates ERP-like stickiness).
Erodes: human-expertise moats in knowledge work (consulting, research,
analysis); technical skills as hiring differentiation.

──────────────────────────────────────────────
LESSONS TO KEEP
──────────────────────────────────────────────

1. FRONTIER MODELS ARE NOW STATE INFRASTRUCTURE — ACT ACCORDINGLY.
Governments can issue kill-switch orders without legislative process. AI
companies with global revenue now carry regulatory risk that resembles a
public utility’s political exposure more than a software company’s. The
durable advantage is regulatory architecture: auditability, access controls,
cooperative compliance.

2. THE INFRASTRUCTURE BET AND THE DISTRIBUTION BET AREN’T THE SAME.
Huang’s $9T claim, Altman’s Stargate capex, and Amodei’s $965B IPO all assume
"widely used" AI — but that requires trust, memory lock-in, or enterprise
integration that model quality alone doesn’t guarantee. Deepening per-
customer spend signals sticky distribution; new customer acquisition still
indicates commodity exposure.

3. SAFETY CREDENTIALS ARE NOT A SHIELD FROM GOVERNMENT ACTION.
Anthropic’s models were disabled despite it being the most vocal safety-first
lab. "Safe" as a brand is not the same as safe as an architecture. The moat
isn’t the label; it’s the technical stack that makes a company controllable.

4. THE CEO AS POLICY ARCHITECT IS THE NEW NORMAL.
Altman, Amodei, and Hassabis each operated across three tracks this week:
building products, raising capital, and lobbying governance frameworks. For
investors, the question is whether these government relationships are creating
durable institutional access or just favorable IPO coverage.

──────────────────────────────────────────────
QUESTIONS TO SIT WITH
──────────────────────────────────────────────

1. If the US government can disable a $965B company’s flagship models
   overnight, what’s the right discount rate for regulatory risk in an AI
   company’s valuation — and does it get priced in before or after the IPO?

2. Huang says AI "closes the technology divide." But if the $9T productivity
   surplus accrues mostly to capital (Nvidia, hyperscalers, model companies)
   rather than labor, is the divide actually closing — or just changing shape?

3. All three G7 CEOs proposed some version of a democratic AI coalition. No
   binding commitments emerged. What does the gap between proposal and outcome
   tell us about where real power sits in the AI governance conversation?

──────────────────────────────────────────────
CROSS-CUTTING SIGNAL
──────────────────────────────────────────────

This week the line between "AI company" and "strategic national asset"
collapsed in real time. The Fable 5 kill-switch, the G7 summit attendance by
the three largest AI lab CEOs, and Amodei’s regulatory essay aren’t separate
stories — they’re one: AI has crossed the threshold where governments feel
compelled to determine who can use it and on what terms.

This is not new for semiconductors (cf. TSMC, ASML). What’s new is that it’s
happening to software-layer companies, at commercial scale, faster than any
policy apparatus can respond. The companies that figure out how to be
genuinely useful to democratic governments — technically, politically, and
culturally — are building the most durable moat of this era.

──────────────────────────────────────────────
SOURCES
──────────────────────────────────────────────

CNBC — G7 AI coalition meeting (June 17):
  https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html
Semafor — AI CEOs pitch global standards at G7 (June 17):
  https://www.semafor.com/article/06/17/2026/ai-ceos-talk-global-standards-at-g7
Malay Mail — Altman at G7: don’t cede responsibilities (June 18):
  https://www.malaymail.com/news/tech-gadgets/2026/06/18/openai-chief-sam-altman-tells-g7-to-not-cede-responsibilities-to-ai-giants/224215
Anthropic — Statement on Fable 5/Mythos 5 (June 12):
  https://www.anthropic.com/news/fable-mythos-access
Axios — Trump admin blocks Anthropic model access (June 12):
  https://www.axios.com/2026/06/12/anthropic-trump-mythos-fable-national-security
Fortune — Anthropic disables Fable/Mythos (June 13):
  https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/
Dario Amodei — "Policy on the AI Exponential" (June 2026):
  https://darioamodei.com/post/policy-on-the-ai-exponential
Axios — Amodei calls for binding AI regulation (June 10):
  https://www.axios.com/2026/06/10/anthropic-ceo-government-block-dangerous-ai
AP/Yahoo — Huang: "new social norms" for AI (June 16):
  https://www.yahoo.com/news/politics/articles/ap-exclusive-nvidias-jensen-huang-200608744.html
Semafor — Hassabis: foothills of the singularity (May 20):
  https://www.semafor.com/article/05/20/2026/google-exec-demis-hassabis-predicts-were-at-the-foothills-of-the-singularity
Stanford Daily — Hassabis at GSB: species-level transition (May 29):
  https://stanforddaily.com/2026/05/29/deepmind-ceo-warns-about-ai/
SiliconAngle — Huang GTC Taipei: "useful AI has arrived" (June 1):
  https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/
"""

HTML_BODY = """\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>AI Leaders Daily &mdash; 18 Jun 2026</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Georgia,'Times New Roman',serif;color:#1e293b;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;">
<tr><td align="center" style="padding:24px 16px;">
<table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:4px;overflow:hidden;">

<!-- HEADER -->
<tr><td style="background:#0f172a;padding:36px 40px 28px;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:3px;color:#475569;text-transform:uppercase;">Laurent&rsquo;s Daily Briefing</p>
  <h1 style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;color:#f8fafc;line-height:1.2;">AI Leaders Daily</h1>
  <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#94a3b8;">Lessons From the Frontier &nbsp;&middot;&nbsp; <strong style="color:#e2e8f0;">18 Jun 2026</strong></p>
  <p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#64748b;font-style:italic;">For a moat-minded investor who wants to understand how the sharpest operators and capital allocators in AI actually think.</p>
</td></tr>

<!-- 60-SECOND READ -->
<tr><td style="background:#1e3a5f;padding:24px 40px;">
  <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">60-Second Read</p>
  <ul style="margin:0;padding:0 0 0 18px;color:#bfdbfe;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.8;">
    <li style="margin-bottom:7px;"><strong style="color:#e0f2fe;">G7 AI Summit (yesterday):</strong> Altman, Amodei &amp; Hassabis sat with G7 heads of state in France to propose a U.S.-led AI standards forum &mdash; each with obvious skin in the game.</li>
    <li style="margin-bottom:7px;"><strong style="color:#e0f2fe;">Anthropic kill-switch (June 12):</strong> The US government disabled Fable 5 and Mythos 5 for all foreign nationals &mdash; forcing Amodei into a live negotiation with Trump&rsquo;s team days before flying to the G7.</li>
    <li style="margin-bottom:7px;"><strong style="color:#e0f2fe;">Amodei&rsquo;s policy essay (~June 10):</strong> &ldquo;Powerful AI&rdquo; is 1&ndash;2 years away; he calls for binding regulation &mdash; written by a CEO who just filed a $965B-valuation S-1.</li>
    <li style="margin-bottom:7px;"><strong style="color:#e0f2fe;">Jensen Huang (June 16, AP):</strong> AI &ldquo;has closed the technology divide more so than any technology in history&rdquo; &mdash; society needs &ldquo;new social norms.&rdquo;</li>
    <li><strong style="color:#e0f2fe;">Demis Hassabis (Stanford GSB, June 3):</strong> We are &ldquo;in the foothills of the singularity.&rdquo; AGI 3&ndash;4 years out. DeepMind&rsquo;s moat is scientific discovery data, not chatbot scale.</li>
  </ul>
</td></tr>

<!-- DIVIDER -->
<tr><td style="height:6px;background:#ffffff;"></td></tr>

<!-- SAM ALTMAN -->
<tr><td style="padding:32px 40px 0;border-top:3px solid #3b82f6;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Sam Altman &mdash; OpenAI</p>
  <h2 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:700;color:#0f172a;line-height:1.3;">&ldquo;Don&rsquo;t Cede Your Responsibilities to Labs Like Mine&rdquo;</h2>
  <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">G7 Summit &middot; &Eacute;vian-les-Bains, France &middot; June 17, 2026</p>
</td></tr>
<tr><td style="padding:16px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Idea</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">Sitting between President Trump and Egyptian President el-Sisi, Altman was the first AI CEO to address the G7 working lunch. He called for <em>&ldquo;an international forum for discussion that establishes globally accepted standards for testing, provides expert and impartial analysis of capabilities and risks, and serves as a venue for cooperation among nations.&rdquo;</em> In the same breath: <em>&ldquo;Do not cede your responsibilities to AI labs like mine.&rdquo;</em> OpenAI&rsquo;s Chris Lehane told reporters afterward that there was &ldquo;a coalescing amongst the countries and the businesses &hellip; around this idea &hellip; of being able to try to create; design; develop a forum or a space for the different democratic countries to be able to work together.&rdquo;</p>
  <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Sources: <a href="https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html" style="color:#3b82f6;text-decoration:none;">CNBC Jun 17</a> &middot; <a href="https://www.semafor.com/article/06/17/2026/ai-ceos-talk-global-standards-at-g7" style="color:#3b82f6;text-decoration:none;">Semafor Jun 17</a> &middot; <a href="https://www.malaymail.com/news/tech-gadgets/2026/06/18/openai-chief-sam-altman-tells-g7-to-not-cede-responsibilities-to-ai-giants/224215" style="color:#3b82f6;text-decoration:none;">Malay Mail Jun 18</a></p>
</td></tr>
<tr><td style="padding:14px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Lesson</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">These two statements seem in tension but aren&rsquo;t. Telling governments not to abdicate to AI labs positions Altman as trustworthy while pre-empting the credibility problem that comes if OpenAI appears to be writing its own rules. With an IPO in view, a predictable governance framework &mdash; ideally one OpenAI helped shape &mdash; is in the company&rsquo;s direct interest. The structural insight: <strong>companies that shape the vocabulary of AI governance build a durable regulatory-distribution advantage.</strong> The ones not at the table don&rsquo;t get to complain about the rules.</p>
</td></tr>
<tr><td style="padding:14px 40px 28px;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">Moat Lens</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong>Strengthens:</strong> regulatory distribution (trusted government interlocutor status); brand/legitimacy (voluntarily inviting oversight differentiates in enterprise sales where compliance matters).<br><strong>Erodes:</strong> commoditized model producers excluded from the standards conversation, who will face rules shaped by others.</p>
</td></tr>

<tr><td style="height:1px;background:#e2e8f0;margin:0;padding:0;"></td></tr>

<!-- DARIO AMODEI -->
<tr><td style="padding:32px 40px 0;border-top:3px solid #ef4444;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Dario Amodei &mdash; Anthropic</p>
  <h2 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:700;color:#0f172a;line-height:1.3;">The Kill-Switch Week and the Policy Agenda</h2>
  <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Policy essay + export controls + G7 &middot; June 10&ndash;17, 2026</p>
</td></tr>
<tr><td style="padding:16px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Idea &mdash; Three Events to Read Together</p>
  <p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;"><strong>(1) The export-control order (June 12):</strong> The Trump administration issued an emergency directive forcing Anthropic to disable Fable 5 and Mythos 5 for all foreign nationals worldwide &mdash; including Anthropic&rsquo;s own foreign-national employees. Anthropic&rsquo;s statement: <em>&ldquo;The US government, citing national security authorities, has issued an export control directive to suspend all access to Fable 5 and Mythos 5 by any foreign national, whether inside or outside the United States, including foreign national Anthropic employees.&rdquo;</em> Anthropic complied but contested the rationale, saying it had been given only <em>&ldquo;verbal evidence of a potential narrow, non-universal jailbreak&rdquo;</em> and that comparable capabilities exist in other public models including GPT-5.5.</p>
  <p style="margin:0 0 10px;font-size:15px;line-height:1.75;color:#374151;"><strong>(2) The policy essay (~June 10):</strong> In <em>&ldquo;Policy on the AI Exponential,&rdquo;</em> Amodei argued: <em>&ldquo;If these scaling laws continue for only a year or two longer, we are likely to get what I&rsquo;ve called Powerful AI, or &lsquo;a country of geniuses in a datacenter&rsquo;&rdquo;</em> &mdash; a system that could be <em>&ldquo;the dominant source of military and economic power for any nation.&rdquo;</em> The mismatch: <em>&ldquo;In the several years that it can take Congress to act, AI can go from an amusing toy to the full country of geniuses.&rdquo;</em> He called for FAA-style pre-deployment testing, labor displacement support, and a democratic chip coalition excluding China.</p>
  <p style="margin:0 0 8px;font-size:15px;line-height:1.75;color:#374151;"><strong>(3) The G7 (June 17):</strong> Five days after his models were pulled, Amodei flew to France and told heads of state that cooperation should include <em>&ldquo;structured access to frontier models&rdquo;</em> and chip trade that <em>&ldquo;excludes China.&rdquo;</em></p>
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Sources: <a href="https://www.anthropic.com/news/fable-mythos-access" style="color:#3b82f6;text-decoration:none;">Anthropic statement</a> &middot; <a href="https://www.axios.com/2026/06/12/anthropic-trump-mythos-fable-national-security" style="color:#3b82f6;text-decoration:none;">Axios Jun 12</a> &middot; <a href="https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/" style="color:#3b82f6;text-decoration:none;">Fortune Jun 13</a> &middot; <a href="https://darioamodei.com/post/policy-on-the-ai-exponential" style="color:#3b82f6;text-decoration:none;">Amodei essay</a> &middot; <a href="https://www.axios.com/2026/06/10/anthropic-ceo-government-block-dangerous-ai" style="color:#3b82f6;text-decoration:none;">Axios Jun 10</a></p>
</td></tr>
<tr><td style="padding:14px 40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-left:4px solid #f59e0b;padding:12px 16px;background:#fffbeb;">
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#92400e;">&#9888; Incentive Note</p>
    <p style="margin:5px 0 0;font-size:13px;line-height:1.6;color:#78350f;">Amodei is (a) preparing a ~$965B IPO &mdash; the regulatory environment he helps design shapes his S-1 story; (b) simultaneously fighting the Trump administration over the very &ldquo;structured access&rdquo; he proposed globally. Neither invalidates his policy proposals, but both mean his arguments should be read as advocacy as well as analysis.</p>
  </td></tr></table>
</td></tr>
<tr><td style="padding:14px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Lesson</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">The export-control episode is the most instructive AI event of the week &mdash; not because of the specific jailbreak claim but because of what it reveals structurally: a government can disable a $965B company&rsquo;s flagship products with a letter. No court. No legislature. The Anthropic S-1 now carries a risk category most investors weren&rsquo;t modeling a month ago. The deeper point: AI at the frontier is becoming state infrastructure, and state infrastructure gets restricted in ways that software products don&rsquo;t. <strong>The companies that survive will make themselves indispensable while also making themselves easy to regulate &mdash; which requires investing in technical auditability as much as in model performance. Safety as a brand is not the same as safety as an architecture.</strong></p>
</td></tr>
<tr><td style="padding:14px 40px 28px;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">Moat Lens</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong>Strengthens:</strong> regulatory architecture (auditability, access controls, safety logs); mission alignment as genuine talent magnet.<br><strong>Erodes:</strong> pure-play global reach moats (export controls favor US-government-compliant labs); international competitor models (foreign nationals excluded from frontier US AI).</p>
</td></tr>

<tr><td style="height:1px;background:#e2e8f0;padding:0;"></td></tr>

<!-- DEMIS HASSABIS -->
<tr><td style="padding:32px 40px 0;border-top:3px solid #10b981;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Demis Hassabis &mdash; Google DeepMind</p>
  <h2 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:700;color:#0f172a;line-height:1.3;">&ldquo;In the Foothills of the Singularity&rdquo;</h2>
  <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Stanford GSB &middot; June 3, 2026 &nbsp;+&nbsp; G7 &middot; June 17, 2026</p>
</td></tr>
<tr><td style="padding:16px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Idea</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">At Stanford GSB, Hassabis said: <em>&ldquo;When we look back at this time, I think &mdash; maybe I&rsquo;m thinking 10 years from now &mdash; I think we will realize that we were standing in the foothills of the singularity now.&rdquo;</em> He puts AGI at 3&ndash;4 years out (2029&ndash;2030). At the G7, he argued for &ldquo;scientific diplomacy&rdquo; &mdash; the claim that AI can solve climate change and drug discovery if there is stable public-private cooperation.</p>
  <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Sources: <a href="https://www.semafor.com/article/05/20/2026/google-exec-demis-hassabis-predicts-were-at-the-foothills-of-the-singularity" style="color:#3b82f6;text-decoration:none;">Semafor May 20</a> &middot; <a href="https://stanforddaily.com/2026/05/29/deepmind-ceo-warns-about-ai/" style="color:#3b82f6;text-decoration:none;">Stanford Daily May 29</a> &middot; <a href="https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html" style="color:#3b82f6;text-decoration:none;">CNBC G7 Jun 17</a></p>
</td></tr>
<tr><td style="padding:14px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Lesson</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">&ldquo;Scientific diplomacy&rdquo; is Hassabis&rsquo;s competitive angle. DeepMind&rsquo;s moat claim is not chatbot volume or API revenue &mdash; it&rsquo;s AlphaFold &rarr; drug discovery &rarr; government partnerships in biomedical research. When Hassabis talks about AI solving climate and disease, he describes sectors where deep domain datasets (protein structures, climate models, genomics) <strong>compound as advantages more durably than in general-purpose AI.</strong> That&rsquo;s a moat built on proprietary scientific data, not distribution scale. Separately: the &ldquo;foothills&rdquo; framing functions as a call to action. If governments believe AGI is 3&ndash;4 years away, they will prioritize DeepMind&rsquo;s research agenda. Urgency is the precondition for the cooperation Hassabis needs.</p>
</td></tr>
<tr><td style="padding:14px 40px 28px;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">Moat Lens</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong>Strengthens:</strong> scientific dataset accumulation (AlphaFold, genomics, climate models); institutional partnerships in regulated domains (pharma, energy, defense); cross-disciplinary talent.<br><strong>Erodes:</strong> general-purpose model providers without deep scientific data; academic research institutions that can no longer keep pace.</p>
</td></tr>

<tr><td style="height:1px;background:#e2e8f0;padding:0;"></td></tr>

<!-- JENSEN HUANG -->
<tr><td style="padding:32px 40px 0;border-top:3px solid #8b5cf6;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Jensen Huang &mdash; Nvidia</p>
  <h2 style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:700;color:#0f172a;line-height:1.3;">&ldquo;New Social Norms&rdquo; and the $9 Trillion Productivity Claim</h2>
  <p style="margin:4px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">AP Interview, Sherman TX &middot; June 16, 2026 &nbsp;+&nbsp; GTC Taipei Keynote &middot; June 1, 2026</p>
</td></tr>
<tr><td style="padding:16px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Idea</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">In an AP interview, Huang said: <em>&ldquo;We need to create new social norms. I would advocate that everybody use AI. Just go engage it.&rdquo;</em> He argued AI <em>&ldquo;has closed the technology divide more so than any technology in history.&rdquo;</em> His analogy: <em>&ldquo;When I was growing up, I used to play in the streets. When cars came along, you obviously can&rsquo;t play in the streets now.&rdquo;</em> At GTC Taipei (June 1), Huang made the economic case: ~30&ndash;40M software developers represent $3 trillion in annual salaries but can now generate <em>&ldquo;$9 trillion worth of productive work.&rdquo;</em> His conclusion: enterprises will want <em>more</em> developers, not fewer. He declared: <em>&ldquo;Today we can say that agentic AI has arrived, that useful AI has arrived.&rdquo;</em></p>
  <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#94a3b8;">Sources: <a href="https://www.yahoo.com/news/politics/articles/ap-exclusive-nvidias-jensen-huang-200608744.html" style="color:#3b82f6;text-decoration:none;">AP/Yahoo Jun 16</a> &middot; <a href="https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/" style="color:#3b82f6;text-decoration:none;">SiliconAngle Jun 1</a></p>
</td></tr>
<tr><td style="padding:14px 40px 0;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-left:4px solid #f59e0b;padding:12px 16px;background:#fffbeb;">
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#92400e;">&#9888; Incentive Note</p>
    <p style="margin:5px 0 0;font-size:13px;line-height:1.6;color:#78350f;">Huang is making the bull case for an industry whose infrastructure he sells. The $9T-from-$3T productivity claim is a marketing argument for continued GPU spend, not a validated macroeconomic finding. Worth testing critically before accepting.</p>
  </td></tr></table>
</td></tr>
<tr><td style="padding:14px 40px 0;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">The Lesson</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;">The &ldquo;technology divide&rdquo; framing is Huang&rsquo;s most interesting &mdash; and testable &mdash; claim. If AI genuinely makes non-programmers capable of advanced work, the implication cuts both ways: it lowers barriers for small-company challengers (eroding technical-expertise moats) but raises barriers for any business that fails to adopt quickly (the competitive divide shifts from &ldquo;who has the best engineers&rdquo; to &ldquo;who has the best AI-augmented workflows&rdquo;). The car analogy is sharper than it sounds: society didn&rsquo;t stop using streets &mdash; it rebuilt them for cars. <strong>Businesses that rebuild operating models around AI rather than bolting it on will capture the surplus Huang&rsquo;s arithmetic implies.</strong></p>
</td></tr>
<tr><td style="padding:14px 40px 28px;">
  <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#374151;">Moat Lens</p>
  <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong>Strengthens:</strong> Nvidia&rsquo;s infrastructure moat (accelerated compute remains scarce if even half the productivity claim holds); workflow switching costs (deep AI integration creates ERP-like stickiness).<br><strong>Erodes:</strong> human-expertise moats in knowledge work (consulting, research, analysis); technical skills as hiring differentiation.</p>
</td></tr>

<tr><td style="height:1px;background:#e2e8f0;padding:0;"></td></tr>

<!-- LESSONS TO KEEP -->
<tr><td style="padding:32px 40px 0;background:#f8fafc;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Lessons to Keep</p>
</td></tr>
<tr><td style="padding:12px 40px 0;background:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:20px;background:#ffffff;border:1px solid #e2e8f0;border-radius:4px;">
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#374151;"><strong>1. Frontier models are now state infrastructure &mdash; act accordingly.</strong> Governments can issue kill-switch orders without legislative process. AI companies with global revenue now carry regulatory risk that resembles a public utility&rsquo;s political exposure more than a software company&rsquo;s. The durable advantage is regulatory architecture: auditability, access controls, cooperative compliance.</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#374151;"><strong>2. The infrastructure bet and the distribution bet aren&rsquo;t the same.</strong> Huang&rsquo;s $9T claim, Altman&rsquo;s Stargate capex, and Amodei&rsquo;s $965B IPO all assume &ldquo;widely used&rdquo; AI &mdash; but that requires trust, memory lock-in, or enterprise integration that model quality alone doesn&rsquo;t guarantee. Watch whether revenue growth comes from deepening per-customer spend (sticky distribution) or new customer acquisition (still commodity exposure).</p>
    <p style="margin:0 0 14px;font-size:15px;line-height:1.75;color:#374151;"><strong>3. Safety credentials are not a shield from government action.</strong> Anthropic&rsquo;s models were disabled despite it being the most vocal safety-first lab. &ldquo;Safe&rdquo; as a brand is not the same as safe as an architecture. The moat isn&rsquo;t the label; it&rsquo;s the technical stack that makes a company controllable and auditable by governments.</p>
    <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong>4. The CEO as policy architect is the new normal.</strong> All three G7 attendees spent this week across three simultaneous tracks: building products, raising capital, and lobbying governance frameworks. For investors, the question is whether these government relationships create durable institutional access &mdash; or just favorable coverage ahead of IPOs.</p>
  </td></tr></table>
</td></tr>

<!-- QUESTIONS TO SIT WITH -->
<tr><td style="padding:24px 40px 0;background:#f8fafc;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Questions to Sit With</p>
</td></tr>
<tr><td style="padding:12px 40px 32px;background:#f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:20px;background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #6366f1;border-radius:0 4px 4px 0;">
    <p style="margin:0 0 12px;font-size:15px;line-height:1.75;color:#374151;"><strong>1.</strong> If the US government can disable a $965B company&rsquo;s flagship models overnight, what&rsquo;s the right discount rate for regulatory risk in an AI company&rsquo;s valuation &mdash; and does this get priced in before or after the IPO?</p>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.75;color:#374151;"><strong>2.</strong> Huang says AI &ldquo;closes the technology divide.&rdquo; But if the $9T productivity surplus accrues mostly to capital (Nvidia, hyperscalers, model companies) rather than labor, is the divide actually closing &mdash; or just changing shape?</p>
    <p style="margin:0;font-size:15px;line-height:1.75;color:#374151;"><strong>3.</strong> All three G7 CEOs proposed some version of a democratic AI coalition. No binding commitments emerged. What does the gap between proposal and outcome tell us about where real power sits in the AI governance conversation?</p>
  </td></tr></table>
</td></tr>

<!-- CROSS-CUTTING SIGNAL -->
<tr><td style="padding:24px 40px 0;">
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64748b;">Cross-Cutting Signal</p>
</td></tr>
<tr><td style="padding:12px 40px 32px;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="padding:22px 24px;background:#0f172a;border-radius:4px;">
    <p style="margin:0;font-size:15px;line-height:1.8;color:#cbd5e1;">This week the line between &ldquo;AI company&rdquo; and &ldquo;strategic national asset&rdquo; collapsed in real time. The Fable 5 kill-switch, the G7 summit attendance by the three largest AI lab CEOs, and Amodei&rsquo;s regulatory essay aren&rsquo;t separate stories &mdash; they&rsquo;re one: AI has crossed the threshold where governments feel compelled to determine who can use it and on what terms. This is not new for semiconductors (cf. TSMC, ASML). <strong style="color:#f1f5f9;">What&rsquo;s new is that it&rsquo;s happening to software-layer companies, at commercial scale, faster than any policy apparatus can respond.</strong> The companies that figure out how to be genuinely useful to democratic governments &mdash; technically, politically, and culturally &mdash; are building the most durable moat of this era.</p>
  </td></tr></table>
</td></tr>

<!-- SOURCES FOOTER -->
<tr><td style="padding:24px 40px 40px;border-top:1px solid #e2e8f0;">
  <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#94a3b8;">Sources</p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.cnbc.com/2026/06/17/anthropic-amodei-google-hassabis-us-ai-coalition-g7.html" style="color:#3b82f6;text-decoration:none;">CNBC &mdash; G7 AI coalition meeting (Jun 17, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.semafor.com/article/06/17/2026/ai-ceos-talk-global-standards-at-g7" style="color:#3b82f6;text-decoration:none;">Semafor &mdash; AI CEOs pitch global standards at G7 (Jun 17, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.malaymail.com/news/tech-gadgets/2026/06/18/openai-chief-sam-altman-tells-g7-to-not-cede-responsibilities-to-ai-giants/224215" style="color:#3b82f6;text-decoration:none;">Malay Mail &mdash; Altman at G7: don&rsquo;t cede responsibilities (Jun 18, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.anthropic.com/news/fable-mythos-access" style="color:#3b82f6;text-decoration:none;">Anthropic &mdash; Statement on Fable 5/Mythos 5 export directive (Jun 12, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.axios.com/2026/06/12/anthropic-trump-mythos-fable-national-security" style="color:#3b82f6;text-decoration:none;">Axios &mdash; Trump admin blocks Anthropic model access (Jun 12, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://fortune.com/2026/06/13/anthropic-disables-fable-mythos-export-controls-national-security-threat/" style="color:#3b82f6;text-decoration:none;">Fortune &mdash; Anthropic disables Fable/Mythos after export ban (Jun 13, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://darioamodei.com/post/policy-on-the-ai-exponential" style="color:#3b82f6;text-decoration:none;">Dario Amodei &mdash; &ldquo;Policy on the AI Exponential&rdquo; essay (Jun 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.axios.com/2026/06/10/anthropic-ceo-government-block-dangerous-ai" style="color:#3b82f6;text-decoration:none;">Axios &mdash; Amodei calls for binding AI regulation (Jun 10, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.yahoo.com/news/politics/articles/ap-exclusive-nvidias-jensen-huang-200608744.html" style="color:#3b82f6;text-decoration:none;">AP/Yahoo &mdash; Huang: society needs &ldquo;new social norms&rdquo; for AI (Jun 16, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://www.semafor.com/article/05/20/2026/google-exec-demis-hassabis-predicts-were-at-the-foothills-of-the-singularity" style="color:#3b82f6;text-decoration:none;">Semafor &mdash; Hassabis: &ldquo;foothills of the singularity&rdquo; (May 20, 2026)</a></p>
  <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://stanforddaily.com/2026/05/29/deepmind-ceo-warns-about-ai/" style="color:#3b82f6;text-decoration:none;">Stanford Daily &mdash; Hassabis at Stanford GSB: species-level transition (May 29, 2026)</a></p>
  <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;"><a href="https://siliconangle.com/2026/06/01/five-thoughts-nvidia-ceo-jensen-huangs-gtc-taipei-2026-keynote/" style="color:#3b82f6;text-decoration:none;">SiliconAngle &mdash; Huang GTC Taipei: &ldquo;useful AI has arrived&rdquo; (Jun 1, 2026)</a></p>
  <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#94a3b8;font-style:italic;">AI Leaders Daily is a scheduled briefing generated by Claude Code for Laurent Bello. All facts are sourced and linked; analysis is synthesis, not financial advice.</p>
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

out_path = pathlib.Path(__file__).parent / "out" / "digest.json"
out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text(json.dumps(digest, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Wrote {out_path}")
