import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;
const port = Number(process.env.PORT || 4173);

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function resolvePath(urlPath) {
  const cleanPath = urlPath.split("?")[0].split("#")[0];
  const decodedPath = decodeURIComponent(cleanPath || "/");
  const normalized = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const withIndex = normalized.endsWith("/") ? `${normalized}index.html` : normalized;
  const absolutePath = path.resolve(rootDir, `.${withIndex}`);
  if (!absolutePath.startsWith(rootDir)) return null;
  return absolutePath;
}

const server = http.createServer(async (req, res) => {
  if (!req.url || !["GET", "HEAD"].includes(req.method || "")) {
    res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Method Not Allowed");
    return;
  }

  const targetPath = resolvePath(req.url);
  if (!targetPath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  try {
    const file = await readFile(targetPath);
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": contentType
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    res.end(file);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not Found");
  }
});

server.listen(port, () => {
  console.log(`Franky web is running at http://localhost:${port}`);
});
