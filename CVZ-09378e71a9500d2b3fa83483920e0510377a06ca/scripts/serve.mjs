import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp"
};

http
  .createServer(async (request, response) => {
    try {
      const requestPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
      let filePath = path.join(root, requestPath.replace(/^\/+/, ""));
      if (!filePath.startsWith(root)) throw new Error("Ruta inválida");
      try {
        if ((await stat(filePath)).isDirectory()) filePath = path.join(filePath, "index.html");
      } catch {
        if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");
      }
      let body;
      try {
        body = await readFile(filePath);
        response.statusCode = 200;
      } catch {
        body = await readFile(path.join(root, "404.html"));
        filePath = path.join(root, "404.html");
        response.statusCode = 404;
      }
      response.setHeader("Content-Type", types[path.extname(filePath)] || "application/octet-stream");
      response.setHeader("Cache-Control", path.extname(filePath) === ".html" ? "no-cache" : "public, max-age=3600");
      response.end(body);
    } catch (error) {
      response.statusCode = 500;
      response.end(error.message);
    }
  })
  .listen(port, "127.0.0.1", () => console.log(`Servidor: http://127.0.0.1:${port}/`));
