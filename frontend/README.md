This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Updating data from the Google Sheet

Fund holdings live in [this Google Sheet](https://docs.google.com/spreadsheets/d/1cMno13PITLQpnIyl7fCKT436nDSC26X51fGdMur9eGI/edit?gid=0). To refresh the site:

```bash
npm run sync-data   # regenerates src/data/holdings.json from the sheet
npm run build       # rebuild the static site
```

The sheet must be shared as **"Anyone with the link can view"** for the sync
to work. The sheet keeps all quarterly snapshots; the site only displays funds
that filed in the most recent quarter and uses older snapshots to compute the
quarter-over-quarter change and the portfolio trend sparkline. New funds added
to the sheet appear automatically; to show a manager name for them, add an
entry to `FUND_META` in `src/lib/data.ts`.

## Deployment

The site deploys to GitHub Pages via `.github/workflows/deploy.yml`. Every
deploy re-runs `sync-data` against the sheet, so to update the live site:
edit the sheet, then either trigger the **Deploy site** workflow from the
GitHub Actions tab (Run workflow), push any commit, or wait for the weekly
scheduled run (Mondays 06:00 UTC).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
