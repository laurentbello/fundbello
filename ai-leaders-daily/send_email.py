#!/usr/bin/env python3
"""Send a pre-written digest as email via Gmail SMTP. No LLM/API calls — just delivery.

The Claude Code scheduled session does the research/analysis on your membership, writes the
digest JSON, then runs this to send it:

    python3 ai-leaders-daily/send_email.py path/to/digest.json

The JSON must have keys: subject, text_body, html_body.
Reads from stdin if no path is given. Requires env vars:
    GMAIL_ADDRESS         - the account to send from
    GMAIL_APP_PASSWORD    - a Gmail App Password for that account
    RECIPIENT (optional)  - defaults to laurentbello@gmail.com
"""

from __future__ import annotations

import json
import os
import smtplib
import ssl
import sys
from email.message import EmailMessage


def main() -> None:
    sender = os.environ.get("GMAIL_ADDRESS")
    app_password = os.environ.get("GMAIL_APP_PASSWORD")
    recipient = os.environ.get("RECIPIENT", "laurentbello@gmail.com")
    if not sender or not app_password:
        sys.exit("Missing GMAIL_ADDRESS and/or GMAIL_APP_PASSWORD environment variables.")

    raw = open(sys.argv[1], encoding="utf-8").read() if len(sys.argv) > 1 else sys.stdin.read()
    try:
        digest = json.loads(raw)
    except json.JSONDecodeError as exc:
        sys.exit(f"Input is not valid JSON: {exc}")

    for key in ("subject", "text_body", "html_body"):
        if not str(digest.get(key, "")).strip():
            sys.exit(f"Digest JSON is missing required key: {key}")

    msg = EmailMessage()
    msg["Subject"] = digest["subject"]
    msg["From"] = sender
    msg["To"] = recipient
    msg.set_content(digest["text_body"])
    msg.add_alternative(digest["html_body"], subtype="html")

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender, app_password)
        server.send_message(msg)
    print(f"Sent '{digest['subject']}' to {recipient}.")


if __name__ == "__main__":
    main()
