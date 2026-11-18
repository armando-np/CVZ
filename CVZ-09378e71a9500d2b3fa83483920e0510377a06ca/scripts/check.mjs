import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function localCandidates(htmlFile, reference) {
  if (!reference || /^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(reference)) return [];
  const clean = reference.split(/[?#]/)[0];
  if (!clean) return [];
  if (!clean.startsWith("/")) return [path.resolve(path.dirname(htmlFile), clean)];
  const direct = path.join(dist, clean.slice(1));
  const withoutProjectBase = clean.replace(/^\/[^/]+\//, "");
  const projectRelative = path.join(dist, withoutProjectBase);
  return direct === projectRelative ? [direct] : [direct, projectRelative];
}

await access(dist);
const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith(".html") && !path.basename(file).startsWith("google"));
const errors = [];

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  for (const required of ["<title>", 'meta name="description"', 'name="viewport"', '<main id="contenido"']) {
    if (!html.includes(required)) errors.push(`${path.relative(dist, htmlFile)}: falta ${required}`);
  }
  if (!html.includes('lang="es-MX"')) errors.push(`${path.relative(dist, htmlFile)}: idioma incorrecto`);
  if (!html.includes('application/ld+json')) errors.push(`${path.relative(dist, htmlFile)}: falta JSON-LD`);

  const attributes = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of attributes) {
    const candidates = localCandidates(htmlFile, reference);
    if (!candidates.length) continue;
    let found = false;
    for (const target of candidates) {
      let candidate = target;
      try {
        const targetStat = await stat(candidate);
        if (targetStat.isDirectory()) candidate = path.join(candidate, "index.html");
        await access(candidate);
        found = true;
        break;
      } catch {
        // Try the next candidate (for GitHub Pages project base paths).
      }
    }
    if (!found) errors.push(`${path.relative(dist, htmlFile)}: referencia rota ${reference}`);
  }
}

const requiredFiles = [
  "index.html",
  "servicios/index.html",
  "estetica/index.html",
  "microchip-y-viajes/index.html",
  "nosotros/index.html",
  "contacto/index.html",
  "privacidad/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "manifest.webmanifest",
  "assets/css/styles.css",
  "assets/js/main.js",
  "assets/js/analytics.js"
];
for (const file of requiredFiles) {
  try {
    await access(path.join(dist, file));
  } catch {
    errors.push(`Falta ${file}`);
  }
}

const imageFiles = files.filter((file) => /\.(?:webp|png|svg)$/i.test(file));
for (const image of imageFiles) {
  const size = (await stat(image)).size;
  if (size === 0) errors.push(`${path.relative(dist, image)} está vacío`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Comprobación correcta: ${htmlFiles.length} páginas HTML, ${imageFiles.length} imágenes y sin referencias locales rotas.`);
