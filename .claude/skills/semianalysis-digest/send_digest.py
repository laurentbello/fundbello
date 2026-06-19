#!/usr/bin/env python3
"""
send_digest.py — send the digest from YOUR OWN Gmail. No third parties.

Sends via Gmail's SMTP server using a Gmail App Password. This keeps the whole
pipeline on services you already own: your machine, your Claude subscription,
your Gmail. Nothing external to break or get breached.

ONE-TIME GMAIL SETUP:
  1. Turn on 2-Step Verification (required before App Passwords exist):
        https://myaccount.google.com/security
  2. Generate an App Password (the page only appears AFTER step 1):
        https://myaccount.google.com/apppasswords
     Name it e.g. "semianalysis". Google shows a 16-character code.
  3. Put your creds in ~/.config/semianalysis/env  (then: chmod 600 that file):
        export SMTP_USER="laurentbello@gmail.com"
        export SMTP_PASS="abcdefghijklmnop"        # the 16 chars, spaces removed
        export SENDER_EMAIL="laurentbello@gmail.com"

  Gotchas: use the APP password, not your normal Gmail password; strip the
  spaces Google displays; if auth fails, 2-Step Verification almost certainly
  isn't on yet (that's what hides the App Passwords page).

This is a generic SMTP sender — defaults are Gmail, but SMTP_HOST/PORT can point
anywhere if you ever change your mind.

USAGE (Claude Code runs this for you):
    python send_digest.py \
        --to laurentbello@gmail.com \
        --subject "SemiAnalysis Digest [4/5] — <title>" \
        --bodyfile /tmp/sa_digest.txt
"""
import argparse, os, smtplib, sys
from email.message import EmailMessage

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--to", required=True)
    ap.add_argument("--subject", required=True)
    ap.add_argument("--bodyfile", required=True, help="UTF-8 text file with the digest body")
    a = ap.parse_args()

    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("SMTP_PORT", "587"))
    user = os.environ.get("SMTP_USER")
    pw   = os.environ.get("SMTP_PASS")
    sender = os.environ.get("SENDER_EMAIL", user)
    if not user or not pw:
        sys.exit("Set SMTP_USER and SMTP_PASS (Gmail address + 16-char App Password) in the environment.")

    with open(a.bodyfile, "r", encoding="utf-8") as f:
        body = f.read()

    msg = EmailMessage()
    msg["From"] = sender
    msg["To"] = a.to
    msg["Subject"] = a.subject
    msg.set_content(body)

    try:
        if port == 465:
            server = smtplib.SMTP_SSL(host, port, timeout=30)
        else:
            server = smtplib.SMTP(host, port, timeout=30)
            server.starttls()
        with server:
            server.login(user, pw)
            server.send_message(msg)
    except smtplib.SMTPAuthenticationError:
        sys.exit("Auth rejected. Use a Gmail APP PASSWORD (not your normal password), "
                 "strip the spaces, and make sure 2-Step Verification is ON.")
    print(f"Sent via {host}: {a.subject}")

if __name__ == "__main__":
    main()
