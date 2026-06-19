#!/bin/bash
# run-digest.sh — run the SemiAnalysis digest on your Claude subscription, no API key.
# Everything stays on services you own: this machine, Claude Code, your Gmail.
#
# One-time setup:
#   1. chmod +x run-digest.sh
#   2. Create ~/.config/semianalysis/env (chmod 600) with your Gmail SMTP creds:
#         export SMTP_USER="laurentbello@gmail.com"
#         export SMTP_PASS="abcdefghijklmnop"        # 16-char Gmail App Password
#         export SENDER_EMAIL="laurentbello@gmail.com"
#         export DIGEST_RECIPIENT="laurentbello@gmail.com"
#   3. Edit PROJECT_DIR below to your project root (where the skill lives).
#   4. crontab -e  ->  every 4 hours is plenty for a biweekly newsletter:
#         0 */4 * * * /full/path/to/run-digest.sh >> "$HOME/sa-digest.log" 2>&1

set -euo pipefail
PROJECT_DIR="$HOME/superforecaster"          # <-- edit to your project root

source "$HOME/.config/semianalysis/env"
cd "$PROJECT_DIR"

SKILL_DIR="$PROJECT_DIR/skills/semianalysis-digest"

# Headless Claude Code run on your subscription. --permission-mode acceptEdits
# lets it use the Gmail connector + run send_digest.py without prompting.
claude -p "Run the semianalysis-digest skill now. Check Gmail for messages labeled \
SemiAnalysis but not SemiAnalysis/Processed, oldest first. For each: extract the full body \
and the clean article link, run all eight sections plus the signal score, write the digest \
to /tmp/sa_digest.txt, then send it by running: \
python $SKILL_DIR/send_digest.py --to $DIGEST_RECIPIENT \
--subject \"SemiAnalysis Digest [<score>/5] — <title>\" --bodyfile /tmp/sa_digest.txt . \
Only after send succeeds, archive the original and label it SemiAnalysis/Processed. \
If there are none, do nothing." \
  --permission-mode acceptEdits
