import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT || 4173);
let basePath = "";

try {
  const buildInfo = JSON.parse(await readFile(path.join(root, "site-build.json"), "utf8"));
  basePath = buildInfo.basePath || "";
} catch {
  console.error("No existe una compilación válida. Ejecuta npm run build.");
  process.exit(1);
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

function safePathname(url) {
  let pathname = decodeURIComponent(new URL(url, `http://localhost:${port}`).pathname);
  if (basePath && pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
  else if (basePath && pathname === basePath) pathname = "/";
  const normalized = path.posix.normalize(pathname).replace(/^\.\.(?:\/|$)/, "");
  return normalized;
}

const server = http.createServer(async (request, response) => {
  try {
    let pathname = safePathname(request.url || "/");
    let filePath = path.join(root, pathname);
    const info = await stat(filePath).catch(() => null);
    if (pathname.endsWith("/") || info?.isDirectory()) filePath = path.join(filePath, "index.html");
    const file = await readFile(filePath).catch(() => null);
    if (!file) {
      const fallback = await readFile(path.join(root, "404.html"));
      response.writeHead(404, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
      response.end(fallback);
      return;
    }
    const extension = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mime[extension] || "application/octet-stream",
      "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600"
    });
    response.end(file);
  } catch (error) {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Error interno: ${error.message}`);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Vista previa disponible en http://127.0.0.1:${port}${basePath || "/"}`);
});
