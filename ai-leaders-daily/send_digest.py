#!/usr/bin/env python3
"""AI Leaders Daily — generate a moat/disruption digest with Claude (web search) and email it.

Run by the GitHub Actions cron (see .github/workflows/ai-leaders-daily.yml), or locally:

    ANTHROPIC_API_KEY=... GMAIL_ADDRESS=you@gmail.com GMAIL_APP_PASSWORD=... \
        RECIPIENT=laurentbello@gmail.com python ai-leaders-daily/send_digest.py

Single source of truth for behavior is PROMPT.md (+ watchlist.md), so edits there flow here.
"""

from __future__ import annotations

import json
import os
import re
import smtplib
import ssl
import sys
from datetime import datetime, timezone, timedelta
from email.message import EmailMessage
from pathlib import Path

import anthropic

MODEL = "claude-opus-4-8"
HERE = Path(__file__).resolve().parent
# Mauritius is UTC+4 — stamp the email with the recipient's local date.
MAURITIUS = timezone(timedelta(hours=4))


def _require(name: str) -> str:
    val = os.environ.get(name)
    if not val:
        sys.exit(f"Missing required environment variable: {name}")
    return val


def read_text(path: Path, *, required: bool) -> str:
    if path.exists():
        return path.read_text(encoding="utf-8")
    if required:
        sys.exit(f"Required file not found: {path}")
    return ""


def extract_json(text: str) -> dict:
    """Pull the JSON object out of the model's final text, tolerating code fences."""
    fenced = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, re.DOTALL)
    candidate = fenced.group(1) if fenced else None
    if candidate is None:
        start, end = text.find("{"), text.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise ValueError("No JSON object found in model output.")
        candidate = text[start : end + 1]
    return json.loads(candidate)


def generate_digest(client: anthropic.Anthropic, prompt: str, watchlist: str, today: str) -> dict:
    system = prompt
    user = (
        f"Today is {today}. Produce today's digest now.\n\n"
        "Here is my current watchlist (holdings and moats to stress-test):\n\n"
        f"{watchlist}\n\n"
        "Research the last ~7 days, then return ONLY the strict JSON object specified in your "
        "instructions (keys: subject, text_body, html_body). No prose outside the JSON."
    )

    messages = [{"role": "user", "content": user}]
    tools = [{"type": "web_search_20260209", "name": "web_search"}]

    # Server-side web search runs its own loop; resume on pause_turn until the model is done.
    final = None
    for _ in range(6):
        resp = client.messages.create(
            model=MODEL,
            max_tokens=16000,
            system=system,
            thinking={"type": "adaptive"},
            output_config={"effort": "high"},
            tools=tools,
            messages=messages,
        )
        if resp.stop_reason == "pause_turn":
            messages = [{"role": "user", "content": user},
                        {"role": "assistant", "content": resp.content}]
            continue
        final = resp
        break

    if final is None:
        sys.exit("Model did not finish (too many pause_turn cycles).")
    if final.stop_reason == "refusal":
        sys.exit("Model refused to produce the digest.")

    text = "".join(b.text for b in final.content if b.type == "text").strip()
    if not text:
        sys.exit("Model returned no text output.")

    data = extract_json(text)
    for key in ("subject", "text_body", "html_body"):
        if key not in data or not str(data[key]).strip():
            sys.exit(f"Model output missing required key: {key}")
    return data


def send_email(sender: str, app_password: str, recipient: str, digest: dict) -> None:
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


def main() -> None:
    api_key = _require("ANTHROPIC_API_KEY")
    gmail_address = _require("GMAIL_ADDRESS")
    app_password = _require("GMAIL_APP_PASSWORD")
    recipient = os.environ.get("RECIPIENT", "laurentbello@gmail.com")

    prompt = read_text(HERE / "PROMPT.md", required=True)
    watchlist = read_text(HERE / "watchlist.md", required=False) or "(no watchlist provided)"
    today = datetime.now(MAURITIUS).strftime("%d %b %Y")

    client = anthropic.Anthropic(api_key=api_key)
    print(f"[{today}] Generating digest with {MODEL}…", flush=True)
    digest = generate_digest(client, prompt, watchlist, today)

    print(f"Sending '{digest['subject']}' to {recipient}…", flush=True)
    send_email(gmail_address, app_password, recipient, digest)
    print("Sent.", flush=True)


if __name__ == "__main__":
    main()
