# Franky-web

**Franky Frontier** — At-Home AI Opportunity Radar.  
A GitHub-first dashboard for findings, summaries, watchlist movement, and foundational tools.

## Quick Start

### Option 1: npm (recommended)

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Option 2: Zero-dependency Node.js server

No `npm install` required — runs with Node.js alone:

```bash
node server.js
```

Open [http://localhost:3000](http://localhost:3000).  
Set a custom port with `PORT=8080 node server.js`.

### Option 3: Python

```bash
python3 -m http.server 3000
```

### Option 4: Open directly

Simply open `index.html` in a browser.  
> Note: The data fetch from the external API may be blocked by CORS when using `file://`. Use one of the server options above if data fails to load.

## How It Works

The dashboard is a single `index.html` file (HTML + CSS + JS, no build step).  
On load it fetches live JSON data from a Google Apps Script endpoint and renders:

- **Hero metrics** — latest run ID, date, finding count, priority breakdown
- **Quick actions** — one-click filters (latest run, high priority, frontier watch)
- **Summaries** — top takeaway, coverage window, and counts for the most recent run
- **Findings** — every stored finding with filtering by run, priority, device/barrier, keyword
- **Watchlist** — frontier watch, confirmation gaps, and momentum items
- **Foundational tools** — accessible tools that still deserve shelf space

## Deployment

### GitHub Pages

This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically deploys to GitHub Pages on every push to `main`.

To enable it:
1. Go to **Settings → Pages** in your GitHub repository.
2. Under **Source**, select **GitHub Actions**.

### Other static hosts

Upload `index.html` (and any future assets) to any static hosting provider:
Netlify, Vercel, Cloudflare Pages, AWS S3 + CloudFront, etc.

## Configuration

The data source URL is configured at the top of the `<script>` section in `index.html`:

```js
const FRANKY_CONFIG = {
  dataUrl: "https://script.google.com/macros/s/..."
};
```

Replace this URL to point at a different Google Apps Script endpoint or any JSON API that returns the expected shape (`findings`, `summaries`, `watchlist`, `foundationalTools`).

## License

This project is provided as-is.
