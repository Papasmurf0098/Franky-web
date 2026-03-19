# Franky-web

Static dashboard for the Franky Frontier data feed.

## Run locally

### Option 1: npm scripts (recommended)

```bash
npm start
```

Then open:

```text
http://localhost:4173
```

### Option 2: direct Python command

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

## Data loading behavior

The dashboard now tries data sources in this order:

1. Remote feed (`FRANKY_CONFIG.dataUrl`)
2. Local fallback (`./data/sample-data.json`)

If the remote feed is unavailable, the app will still run using the local sample data.

## Customizing data source

Edit `FRANKY_CONFIG` in `index.html` to point to your own JSON feed.