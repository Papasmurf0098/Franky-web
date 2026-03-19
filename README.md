# Franky-web

Franky-web is a single-page dashboard in plain HTML, CSS, and JavaScript. There is no build step and no backend in this repository.

## What is in the repo

- `index.html` - the entire dashboard UI
- `franky-data.local.js` - a bundled snapshot used when the live data feed is unavailable
- `serve.py` - a tiny no-dependency local web server

## Recommended way to run it

```bash
python3 serve.py
```

Then open:

```text
http://127.0.0.1:8000
```

The server honors the `PORT` environment variable, so this also works:

```bash
PORT=3000 python3 serve.py
```

## Alternative: open the file directly

You can also open `index.html` directly in a browser. The app will try the live data feed first and fall back to the bundled local snapshot if the live feed cannot be reached.

## Data behavior

- Primary source: live Google Apps Script JSON feed
- Fallback source: `franky-data.local.js`

If the live feed is down or blocked, the page will still render using the bundled snapshot and will display a notice that it is running from local data.