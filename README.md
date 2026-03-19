# Franky-web

Franky Frontier is a static dashboard (`index.html`) that reads JSON data and renders findings, summaries, a watchlist, and foundational tools.

## Run locally

### 1) Start the local server

```bash
npm start
```

By default this serves the app at:

- `http://localhost:4173`

### 2) Open in browser

Visit:

- `http://localhost:4173`

## Data sources

The app now has two data sources:

1. **Live feed** (default): Google Apps Script endpoint
2. **Fallback sample**: `./data/franky-data.sample.json`

If the live endpoint is unavailable, the app automatically falls back to the sample JSON so the UI still runs.

You can also force a custom source with a query parameter:

```text
http://localhost:4173/?data=https://example.com/data.json
```