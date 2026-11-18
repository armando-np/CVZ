import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const errors = [];
const warnings = [];

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

function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function findMeta(html, name, property = false) {
  const key = property ? "property" : "name";
  const regex = new RegExp(`<meta[^>]+${key}=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`, "i");
  const reverse = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+${key}=["']${name}["'][^>]*>`, "i");
  return html.match(regex)?.[1] || html.match(reverse)?.[1] || "";
}

function findLink(html, rel) {
  const tags = [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => match[0]);
  for (const tag of tags) {
    const relValue = tag.match(/\brel=["']([^"']+)["']/i)?.[1] || "";
    if (!relValue.split(/\s+/).includes(rel)) continue;
    return tag.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
  }
  return "";
}

function splitReference(reference) {
  const hashIndex = reference.indexOf("#");
  const queryIndex = reference.indexOf("?");
  let end = reference.length;
  if (hashIndex >= 0) end = Math.min(end, hashIndex);
  if (queryIndex >= 0) end = Math.min(end, queryIndex);
  const pathname = reference.slice(0, end);
  const fragment = hashIndex >= 0 ? reference.slice(hashIndex + 1) : "";
  return { pathname, fragment };
}

function normalizeInternalReference(reference, basePath, currentRelative = "index.html") {
  if (/^(?:https?:|mailto:|tel:|sms:|data:|javascript:|\/\/)/i.test(reference)) return null;
  const { pathname: rawPath, fragment: rawFragment } = splitReference(reference);
  let pathname = rawPath;
  let fragment = rawFragment;

  try {
    pathname = decodeURIComponent(pathname);
    fragment = decodeURIComponent(fragment);
  } catch {
    // Keep the original value so a later existence check can report the problem.
  }

  let local;
  if (!pathname) {
    local = currentRelative;
  } else if (pathname.startsWith("/")) {
    if (basePath && pathname.startsWith(`${basePath}/`)) local = pathname.slice(basePath.length + 1);
    else if (basePath && pathname === `${basePath}/`) local = "";
    else local = pathname.slice(1);
  } else {
    local = path.posix.normalize(path.posix.join(path.posix.dirname(currentRelative), pathname));
  }

  if (!local || local.endsWith("/")) local = `${local}index.html`;
  return { local, fragment };
}

function parseJsonBlocks(html, relative) {
  const blocks = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  if (!blocks.length) errors.push(`${relative}: falta JSON-LD.`);
  for (const [index, match] of blocks.entries()) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${relative}: JSON-LD ${index + 1} inválido: ${error.message}`);
    }
  }

  const config = html.match(/<script\b[^>]*id=["']site-config["'][^>]*>([\s\S]*?)<\/script>/i)?.[1];
  if (!config) {
    errors.push(`${relative}: falta la configuración del sitio.`);
  } else {
    try {
      JSON.parse(config);
    } catch (error) {
      errors.push(`${relative}: configuración JSON inválida: ${error.message}`);
    }
  }
}

try {
  await access(dist);
} catch {
  console.error("No existe dist/. Ejecuta npm run build antes de verificar.");
  process.exit(1);
}

let buildInfo;
try {
  buildInfo = JSON.parse(await readFile(path.join(dist, "site-build.json"), "utf8"));
} catch (error) {
  console.error(`No se pudo leer dist/site-build.json: ${error.message}`);
  process.exit(1);
}

const allFiles = await walk(dist);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const scriptFiles = [
  ...allFiles.filter((file) => file.endsWith(".js")),
  ...(await walk(path.join(root, "scripts"))).filter((file) => file.endsWith(".mjs")),
  ...(await walk(path.join(root, "src"))).filter((file) => file.endsWith(".mjs"))
];
const svgFiles = allFiles.filter((file) => file.endsWith(".svg"));
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const htmlByRelative = new Map();
const indexablePages = [];

for (const file of htmlFiles) {
  const relative = path.relative(dist, file).replaceAll(path.sep, "/");
  htmlByRelative.set(relative, await readFile(file, "utf8"));
}

for (const [relative, html] of htmlByRelative) {
  const title = stripTags(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
  const description = findMeta(html, "description");
  const canonical = findLink(html, "canonical");
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

  if (!/^<!doctype html>/i.test(html.trim())) errors.push(`${relative}: falta <!doctype html>.`);
  if (!/<html[^>]+lang=["']es-MX["']/i.test(html)) errors.push(`${relative}: falta lang="es-MX".`);
  if (!/<meta[^>]+charset=["']?utf-8/i.test(html)) errors.push(`${relative}: falta charset UTF-8.`);
  if (!/<meta[^>]+name=["']viewport["']/i.test(html)) errors.push(`${relative}: falta viewport.`);
  if (!title) errors.push(`${relative}: falta <title>.`);
  if (!description) errors.push(`${relative}: falta meta description.`);
  if (!canonical) errors.push(`${relative}: falta canonical.`);
  if (h1Count !== 1) errors.push(`${relative}: debe contener exactamente un H1; encontró ${h1Count}.`);
  if (/\{\{[^}]+\}\}|TU-USUARIO|TU-REPOSITORIO/i.test(html)) errors.push(`${relative}: contiene marcadores sin reemplazar.`);

  parseJsonBlocks(html, relative);

  for (const [name, property] of [
    ["og:title", true],
    ["og:description", true],
    ["og:url", true],
    ["og:image", true],
    ["twitter:card", false],
    ["twitter:title", false],
    ["twitter:description", false],
    ["twitter:image", false]
  ]) {
    if (!findMeta(html, name, property)) errors.push(`${relative}: falta ${name}.`);
  }

  const ogUrl = findMeta(html, "og:url", true);
  if (canonical && ogUrl && canonical !== ogUrl) errors.push(`${relative}: og:url no coincide con canonical.`);

  if (!noindex) {
    indexablePages.push(relative);
    if (title.length > 70) warnings.push(`${relative}: título largo (${title.length} caracteres).`);
    if (description.length < 80 || description.length > 160) {
      warnings.push(`${relative}: meta description de ${description.length} caracteres; conviene revisar el fragmento SEO.`);
    }
    if (titles.has(title)) errors.push(`${relative}: título duplicado con ${titles.get(title)}.`);
    else titles.set(title, relative);
    if (descriptions.has(description)) warnings.push(`${relative}: descripción duplicada con ${descriptions.get(description)}.`);
    else descriptions.set(description, relative);
    if (canonicals.has(canonical)) errors.push(`${relative}: canonical duplicado con ${canonicals.get(canonical)}.`);
    else canonicals.set(canonical, relative);
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const idSet = new Set();
  for (const id of ids) {
    if (idSet.has(id)) errors.push(`${relative}: id duplicado "${id}".`);
    idSet.add(id);
  }

  for (const attribute of ["aria-labelledby", "aria-describedby", "aria-controls"]) {
    const pattern = new RegExp(`\\b${attribute}=["']([^"']+)["']`, "gi");
    for (const match of html.matchAll(pattern)) {
      for (const referencedId of match[1].trim().split(/\s+/)) {
        if (referencedId && !idSet.has(referencedId)) {
          errors.push(`${relative}: ${attribute} referencia un id inexistente "${referencedId}".`);
        }
      }
    }
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    if (!/\balt=["'][^"']*["']/i.test(tag)) errors.push(`${relative}: imagen sin atributo alt: ${tag.slice(0, 120)}`);
    if (!/\bwidth=["']?\d+/i.test(tag) || !/\bheight=["']?\d+/i.test(tag)) {
      warnings.push(`${relative}: imagen sin width/height explícitos: ${tag.slice(0, 100)}`);
    }
  }

  for (const tag of html.match(/<iframe\b[^>]*>/gi) || []) {
    if (!/\btitle=["'][^"']+["']/i.test(tag)) errors.push(`${relative}: iframe sin título accesible.`);
  }

  for (const tag of html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || []) {
    const rel = tag.match(/\brel=["']([^"']+)["']/i)?.[1] || "";
    if (!rel.split(/\s+/).includes("noopener")) errors.push(`${relative}: enlace target="_blank" sin rel="noopener".`);
  }

  const references = [...html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const reference of references) {
    const parsed = normalizeInternalReference(reference, buildInfo.basePath, relative);
    if (!parsed) continue;
    const target = path.join(dist, parsed.local);
    try {
      const info = await stat(target);
      if (info.isDirectory()) await access(path.join(target, "index.html"));
    } catch {
      errors.push(`${relative}: referencia interna inexistente ${reference}`);
      continue;
    }

    if (parsed.fragment && parsed.local.endsWith(".html")) {
      const targetHtml = htmlByRelative.get(parsed.local);
      if (targetHtml && !new RegExp(`\\bid=["']${parsed.fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i").test(targetHtml)) {
        errors.push(`${relative}: el ancla ${reference} no existe en ${parsed.local}.`);
      }
    }
  }
}

for (const file of scriptFiles) {
  try {
    execFileSync(process.execPath, ["--check", file], { stdio: "pipe" });
  } catch (error) {
    errors.push(`${path.relative(root, file)}: JavaScript inválido: ${error.stderr?.toString() || error.message}`);
  }
}

for (const file of svgFiles) {
  const svg = await readFile(file, "utf8");
  if (!/<svg\b/i.test(svg) || !/<\/svg>\s*$/i.test(svg)) {
    errors.push(`${path.relative(dist, file)}: SVG incompleto o inválido.`);
  }
}

try {
  const manifest = JSON.parse(await readFile(path.join(dist, "manifest.webmanifest"), "utf8"));
  if (!manifest.name || !manifest.short_name || !manifest.start_url || !manifest.icons?.length) {
    errors.push("manifest.webmanifest: faltan campos esenciales.");
  }
  for (const item of manifest.icons || []) {
    const parsed = normalizeInternalReference(item.src, buildInfo.basePath, "manifest.webmanifest");
    if (!parsed) continue;
    try {
      await access(path.join(dist, parsed.local));
    } catch {
      errors.push(`manifest.webmanifest: icono inexistente ${item.src}`);
    }
  }
} catch (error) {
  errors.push(`manifest.webmanifest inválido: ${error.message}`);
}

try {
  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (new Set(locations).size !== locations.length) errors.push("sitemap.xml: contiene URL duplicadas.");
  if (locations.length !== indexablePages.length) {
    errors.push(`sitemap.xml: contiene ${locations.length} URL y se esperaban ${indexablePages.length}.`);
  }
  for (const location of locations) {
    if (!location.startsWith(buildInfo.siteUrl)) errors.push(`sitemap.xml: URL fuera del sitio ${location}`);
  }
} catch (error) {
  errors.push(`No se pudo validar sitemap.xml: ${error.message}`);
}

try {
  const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
  const expected = new URL("sitemap.xml", buildInfo.siteUrl).href;
  if (!robots.includes(`Sitemap: ${expected}`)) errors.push("robots.txt: referencia de sitemap incorrecta.");
} catch (error) {
  errors.push(`No se pudo validar robots.txt: ${error.message}`);
}

for (const required of [
  "index.html",
  "servicios/index.html",
  "estetica/index.html",
  "nosotros/index.html",
  "contacto/index.html",
  "privacidad/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "manifest.webmanifest",
  "assets/images/og-default.png",
  ".nojekyll"
]) {
  try {
    await access(path.join(dist, required));
  } catch {
    errors.push(`Falta archivo requerido: ${required}`);
  }
}

for (const file of allFiles) {
  const info = await stat(file);
  const relative = path.relative(dist, file).replaceAll(path.sep, "/");
  if (/\.(?:css|js)$/i.test(file) && info.size > 200_000) warnings.push(`${relative}: recurso mayor a 200 KB.`);
  if (/\.(?:png|webp|jpe?g)$/i.test(file) && info.size > 1_000_000) warnings.push(`${relative}: imagen mayor a 1 MB.`);
}

if (warnings.length) {
  console.warn("Advertencias:");
  for (const warning of [...new Set(warnings)]) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error("Verificación fallida:");
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Verificación correcta: ${htmlFiles.length} páginas HTML y ${allFiles.length} archivos totales.`);
