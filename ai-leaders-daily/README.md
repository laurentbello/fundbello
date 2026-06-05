# AI Leaders Daily — Moat & Disruption Watch

A daily agent for an **equity investor** whose edge is owning **strong-moat businesses at
reasonable valuations**. Every day at **1:00 PM Mauritius (MST, UTC+4)** it researches recent
interviews/announcements from the AI frontier, judges the **moat consequences** (what gets
threatened vs. strengthened), **stress-tests your watchlist** (Strong / Watch / Weakening per
holding), and **emails the briefing** to `laurentbello@gmail.com` — fully hands-off.

Voices tracked: **OpenAI · Anthropic · Google DeepMind · Fireworks AI · Base10 · Jensen Huang ·
Elon Musk · Dario Amodei** (plus broader lab/firm news that bears on competitive moats).

## Files
- `PROMPT.md` — the agent's instructions and output contract (single source of truth).
- `watchlist.md` — **you edit this.** Your holdings + the moat behind each. The agent reads it
  every run and reports each holding's moat health against the week's AI news.
- `send_digest.py` — generates the digest via the Claude API (with web search) and sends it
  over Gmail SMTP.
- `../.github/workflows/ai-leaders-daily.yml` — the daily 09:00 UTC cron that runs the script.

## Auto-send setup (one-time)
The workflow runs in GitHub Actions and needs three repo secrets. In GitHub →
**Settings → Secrets and variables → Actions → New repository secret**, add:

| Secret | What it is |
| --- | --- |
| `ANTHROPIC_API_KEY` | Your Claude API key (platform.claude.com → API keys). |
| `GMAIL_ADDRESS` | The Gmail address the briefing is **sent from**. |
| `GMAIL_APP_PASSWORD` | A Gmail **App Password** (not your normal password) for that account. |
| `RECIPIENT` *(optional)* | Where to send it. Defaults to `laurentbello@gmail.com` if unset. |

**Getting a Gmail App Password:** enable 2-Step Verification on the sending Google account,
then Google Account → **Security → App passwords** → create one for "Mail". Paste the 16-char
value into `GMAIL_APP_PASSWORD`. (Gmail blocks plain-password SMTP; the app password is the
supported path. If the account uses Workspace SSO that disallows app passwords, tell me and
I'll switch the sender to the Gmail API with OAuth instead.)

That's it. The cron fires daily at 1 PM Mauritius. To test immediately: GitHub →
**Actions → AI Leaders Daily → Run workflow**.

## Editing what it watches
- **Your positions:** edit `watchlist.md` and commit. No code change needed.
- **The lens / format / voices:** edit `PROMPT.md` and commit.
- **The time:** edit the `cron` in the workflow. `0 9 * * *` = 09:00 UTC = 13:00 Mauritius.

## How it works
`send_digest.py` loads `PROMPT.md` (instructions) and `watchlist.md` (your holdings), calls
`claude-opus-4-8` with the `web_search` server tool and adaptive thinking, and asks for a strict
JSON object (`subject`, `text_body`, `html_body`). It resumes the model through web-search
`pause_turn` cycles, parses the JSON, and emails both plain-text and HTML versions via
`smtp.gmail.com`. The email is dated in Mauritius local time.

## Cost
One Opus run with web search per day — typically a few cents to ~$0.10 depending on how much it
searches. Negligible at daily cadence.

## Optional: Claude Code scheduled-trigger path (drafts instead of sends)
If you'd rather it land in Gmail **Drafts** for a human glance (no API key, no app password),
you can instead set a Claude Code on the web scheduled trigger pointed at this repo with the
prompt *"Follow `ai-leaders-daily/PROMPT.md` and draft today's briefing"*, and let it use the
connected Gmail (draft-only). The auto-send workflow above is the zero-click default.
