# Google Sheets MCP integration

This repo configures a **Google Sheets** MCP server so Claude can write directly
into the `Sell Checklist` spreadsheet (used by the `sell-checklist` skill) —
duplicating the `Sell Template` tab, renaming it to the ticker, and filling the
cells, with no manual copy/paste.

The server is [`mcp-google-sheets`](https://github.com/xing5/mcp-google-sheets),
declared in [`.mcp.json`](../.mcp.json) at the repo root. Claude Code picks up
project-scoped MCP servers from that file.

## What the server can do

Once authenticated it exposes tools including:

- `copy_sheet` — duplicate the `Sell Template` tab
- `rename_sheet` — rename the copy to the ticker (e.g. `NVO`)
- `update_cells` / `batch_update_cells` — write the values
- `get_sheet_data`, `list_sheets` — read the template / list tabs

## One-time setup (credentials)

The server authenticates with a **Google Cloud service account** (simplest for
unattended/automated use).

1. **Create a Google Cloud project** (or reuse one) at
   https://console.cloud.google.com.
2. **Enable APIs**: enable both the **Google Sheets API** and the
   **Google Drive API** for that project.
3. **Create a service account**: IAM & Admin → Service Accounts → Create.
   Then *Keys → Add key → JSON* and download the key file. Keep it private —
   **do not commit it**.
4. **Share the spreadsheet with the service account.** Copy the service
   account's email (looks like `name@project.iam.gserviceaccount.com`) and share
   the `Sell Checklist` spreadsheet (or its parent Drive folder) with it as
   **Editor**. The service account can only touch files shared with it.
5. **Set environment variables** so `.mcp.json` can find the credentials:
   - `SERVICE_ACCOUNT_PATH` — absolute path to the downloaded JSON key file.
   - `DRIVE_FOLDER_ID` — the Drive folder ID that contains the spreadsheet
     (optional but recommended; the folder must also be shared with the
     service account).
6. **Install `uv`** (provides `uvx`), if not already present:
   `curl -LsSf https://astral.sh/uv/install.sh | sh`.
7. **Reload** Claude Code so it starts the new MCP server. Approve it when
   prompted to trust the project server.

### Local vs. Claude Code on the web

- **Local:** export the two env vars in your shell profile and make sure the
  key file exists at `SERVICE_ACCOUNT_PATH`.
- **Web / remote environment:** set `SERVICE_ACCOUNT_PATH` and `DRIVE_FOLDER_ID`
  in the environment's configuration, and ensure the service-account JSON is
  available inside the container (e.g. materialized from a secret at the path
  `SERVICE_ACCOUNT_PATH` points to). See
  https://code.claude.com/docs/en/claude-code-on-the-web for how this
  environment is configured.

## Security notes

- The service-account JSON is a credential — never commit it. `.mcp.json` only
  references env vars, so no secret lives in the repo.
- The service account only has access to files explicitly shared with it, so its
  blast radius is limited to the sheets you share.

## Verifying

Ask Claude to "list the tabs in the Sell Checklist". If the integration is live
it will call `list_sheets` and return `Sell Template`, `NVO`, `BN`, `MSFT`,
`CPNG`, … If it falls back to the copy/paste workflow, the server isn't
authenticated yet — re-check the steps above.
