"""
BYD Atto 2 crash test monitor.
Checks Euro NCAP and NHTSA for new results and sends an email alert.
"""

import json
import os
import smtplib
import sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

import requests
from bs4 import BeautifulSoup

STATE_FILE = Path(__file__).parent / "state.json"
ALERT_EMAIL = os.environ.get("ALERT_EMAIL", "laurentbello@gmail.com")
SMTP_HOST = os.environ.get("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; crash-test-monitor/1.0)"}

# Euro NCAP URLs to probe (slug variants the site might use)
EURONCAP_URLS = [
    "https://www.euroncap.com/en/results/byd/atto-2/",
    "https://www.euroncap.com/en/results/byd/atto2/",
    "https://www.euroncap.com/en/results/byd/byd-atto-2/",
]

# NHTSA years to check
NHTSA_YEARS = [2024, 2025, 2026]


# ---------------------------------------------------------------------------
# State helpers
# ---------------------------------------------------------------------------

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"euroncap": None, "nhtsa": {}}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2) + "\n")


# ---------------------------------------------------------------------------
# Source checkers
# ---------------------------------------------------------------------------

def check_euroncap() -> dict | None:
    """Return parsed rating data if Euro NCAP has published Atto 2 results."""
    for url in EURONCAP_URLS:
        try:
            resp = requests.get(url, headers=HEADERS, timeout=20)
        except requests.RequestException as exc:
            print(f"  Euro NCAP request error ({url}): {exc}")
            continue

        if resp.status_code == 404:
            continue
        if resp.status_code != 200:
            print(f"  Euro NCAP unexpected status {resp.status_code} for {url}")
            continue

        soup = BeautifulSoup(resp.text, "html.parser")

        # Bail out if the page is a generic "no results" placeholder
        no_results = soup.find(string=lambda t: t and "no results" in t.lower())
        if no_results:
            continue

        result: dict = {"url": url}

        # Overall star rating
        for selector in ["div.overall-rating", "span.stars", "div.stars", ".star-rating"]:
            el = soup.select_one(selector)
            if el:
                result["overall"] = el.get_text(strip=True)
                break

        # Category percentage scores
        scores: dict[str, str] = {}
        for row in soup.select(".category-score, .score-item, li.score"):
            label_el = row.select_one(".label, dt, .category-name")
            value_el = row.select_one(".value, dd, .score-value, .percentage")
            if label_el and value_el:
                scores[label_el.get_text(strip=True)] = value_el.get_text(strip=True)
        if scores:
            result["scores"] = scores

        # Year of test
        year_el = soup.select_one(".test-year, .year, time")
        if year_el:
            result["year"] = year_el.get_text(strip=True)

        # Only count as "found" if we got at least a star rating or scores
        if "overall" in result or scores:
            return result

    return None


def check_nhtsa() -> dict | None:
    """Return a dict keyed by year for any NHTSA Atto 2 entries found."""
    found: dict[str, list] = {}
    base = "https://api.nhtsa.gov/SafetyRatings"
    makes = ["BYD"]
    models = ["Atto 2", "Atto2", "ATTO 2"]

    for year in NHTSA_YEARS:
        for make in makes:
            for model in models:
                url = f"{base}/modelyear/{year}/make/{make}/model/{requests.utils.quote(model)}"
                try:
                    resp = requests.get(url, timeout=15)
                    if resp.status_code != 200:
                        continue
                    data = resp.json()
                    if data.get("Count", 0) > 0:
                        found[str(year)] = data["Results"]
                        break  # found this year, no need to try other model spellings
                except requests.RequestException as exc:
                    print(f"  NHTSA request error: {exc}")

    return found if found else None


# ---------------------------------------------------------------------------
# Email helpers
# ---------------------------------------------------------------------------

def send_email(subject: str, body_html: str, body_text: str) -> None:
    if not SMTP_USER or not SMTP_PASS:
        print("SMTP credentials not set — printing alert to stdout:")
        print(f"\n{subject}\n{'='*60}\n{body_text}\n")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = SMTP_USER
    msg["To"] = ALERT_EMAIL
    msg.attach(MIMEText(body_text, "plain"))
    msg.attach(MIMEText(body_html, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.ehlo()
        server.starttls()
        server.login(SMTP_USER, SMTP_PASS)
        server.sendmail(SMTP_USER, ALERT_EMAIL, msg.as_string())

    print(f"Alert sent to {ALERT_EMAIL}")


def _euroncap_email(data: dict) -> tuple[str, str]:
    overall = data.get("overall", "N/A")
    scores = data.get("scores", {})
    year = data.get("year", "")
    url = data.get("url", EURONCAP_URLS[0])

    score_rows_html = "".join(
        f"<tr><td style='padding:6px 12px;border:1px solid #ddd'>{k}</td>"
        f"<td style='padding:6px 12px;border:1px solid #ddd;font-weight:bold'>{v}</td></tr>"
        for k, v in scores.items()
    )
    score_rows_text = "\n".join(f"  {k}: {v}" for k, v in scores.items())
    score_table_html = (
        f"<table style='border-collapse:collapse;margin:12px 0'>"
        f"<tr><th style='padding:6px 12px;background:#f0f0f0;border:1px solid #ddd'>Category</th>"
        f"<th style='padding:6px 12px;background:#f0f0f0;border:1px solid #ddd'>Score</th></tr>"
        f"{score_rows_html}</table>"
        if scores else ""
    )

    html = f"""
<div style='font-family:sans-serif;max-width:600px'>
  <h2 style='color:#c0392b'>BYD Atto 2 — Euro NCAP Results Published!</h2>
  <p><strong>Overall Star Rating:</strong> {overall}{' (' + year + ')' if year else ''}</p>
  {score_table_html}
  <p><a href="{url}">View full results on Euro NCAP →</a></p>
</div>
"""
    text = (
        f"BYD Atto 2 — Euro NCAP Results Published!\n\n"
        f"Overall Star Rating: {overall}{' (' + year + ')' if year else ''}\n\n"
        f"{score_rows_text}\n\n"
        f"Full results: {url}"
    )
    return html, text


def _nhtsa_email(data: dict) -> tuple[str, str]:
    rows_html = []
    rows_text = []
    for year, results in data.items():
        for r in results:
            desc = r.get("VehicleDescription", f"BYD Atto 2 {year}")
            vid = r.get("VehicleId", "")
            rows_html.append(
                f"<li><strong>{desc}</strong>"
                f"{' — ID: ' + str(vid) if vid else ''}</li>"
            )
            rows_text.append(f"  - {desc}{' (ID: ' + str(vid) + ')' if vid else ''}")

    html = f"""
<div style='font-family:sans-serif;max-width:600px'>
  <h2 style='color:#c0392b'>BYD Atto 2 — NHTSA Safety Rating Available!</h2>
  <ul>{"".join(rows_html)}</ul>
  <p><a href="https://www.nhtsa.gov/vehicle-safety/5-star-safety-ratings">
    View on NHTSA 5-Star Safety Ratings →</a></p>
</div>
"""
    text = (
        "BYD Atto 2 — NHTSA Safety Rating Available!\n\n"
        + "\n".join(rows_text)
        + "\n\nFull details: https://www.nhtsa.gov/vehicle-safety/5-star-safety-ratings"
    )
    return html, text


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    state = load_state()

    # --- Euro NCAP ---
    print("Checking Euro NCAP...")
    euroncap_data = check_euroncap()
    if euroncap_data and state.get("euroncap") != "found":
        print(f"  Found: {euroncap_data}")
        html, text = _euroncap_email(euroncap_data)
        send_email("BYD Atto 2 Euro NCAP Results Published!", html, text)
        state["euroncap"] = "found"
        save_state(state)
    else:
        status = "already notified" if state.get("euroncap") == "found" else "no results yet"
        print(f"  Euro NCAP: {status}.")

    # --- NHTSA ---
    print("Checking NHTSA...")
    nhtsa_data = check_nhtsa()
    if nhtsa_data:
        for year, results in nhtsa_data.items():
            if year not in state.get("nhtsa", {}):
                print(f"  Found NHTSA {year}: {results}")
                html, text = _nhtsa_email({year: results})
                send_email(f"BYD Atto 2 NHTSA {year} Safety Rating Available!", html, text)
                state.setdefault("nhtsa", {})[year] = "found"
                save_state(state)
    else:
        print("  NHTSA: no results yet.")

    print("Done.")


if __name__ == "__main__":
    main()
