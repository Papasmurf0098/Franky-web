import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const PORT = Number.parseInt(process.env.PORT || "4173", 10);
const HOST = process.env.HOST || "0.0.0.0";
const ROOT_DIR = resolve(process.cwd());

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function getMimeType(pathname) {
  return MIME_TYPES[extname(pathname).toLowerCase()] || "application/octet-stream";
}

function resolveRequestPath(urlPathname) {
  const cleanedPath = normalize(decodeURIComponent(urlPathname)).replace(/^(\.\.[/\\])+/, "");
  const relativePath = cleanedPath === "/" ? "/index.html" : cleanedPath;
  return join(ROOT_DIR, relativePath);
}

async function fileExists(pathname) {
  try {
    await access(pathname);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  try {
    if (!req.url) {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad Request");
      return;
    }

    const { pathname } = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    let filePath = resolveRequestPath(pathname);

    if (!(await fileExists(filePath))) {
      filePath = join(ROOT_DIR, "index.html");
    }

    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      filePath = join(filePath, "index.html");
    }

    res.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": getMimeType(filePath)
    });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Server error: ${message}`);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Franky Web is running at http://localhost:${PORT}`);
});
