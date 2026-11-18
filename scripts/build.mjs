import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { layout } from "../src/templates/layout.mjs";
import * as home from "../src/pages/home.mjs";
import * as services from "../src/pages/services.mjs";
import * as grooming from "../src/pages/grooming.mjs";
import * as about from "../src/pages/about.mjs";
import * as contact from "../src/pages/contact.mjs";
import * as privacy from "../src/pages/privacy.mjs";
import * as notFound from "../src/pages/not-found.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const publicDir = path.join(root, "public");
const config = JSON.parse(await readFile(path.join(root, "site.config.json"), "utf8"));
const pageModules = [home, services, grooming, about, contact, privacy, notFound];

function ensureTrailingSlash(value) {
  return value.endsWith("/") ? value : `${value}/`;
}

function inferGitHubPagesUrl() {
  const repository = process.env.GITHUB_REPOSITORY || "";
  if (!repository.includes("/")) return "";
  const [owner, repo] = repository.split("/");
  if (!owner || !repo) return "";
  return repo.toLowerCase() === `${owner.toLowerCase()}.github.io`
    ? `https://${owner}.github.io/`
    : `https://${owner}.github.io/${repo}/`;
}

function normalizeSiteUrl(value) {
  const candidate = value?.trim();
  if (!candidate) return "";
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  return ensureTrailingSlash(new URL(withProtocol).href);
}

const siteUrl =
  normalizeSiteUrl(process.env.SITE_URL) ||
  normalizeSiteUrl(config.siteUrl) ||
  normalizeSiteUrl(inferGitHubPagesUrl()) ||
  "http://localhost:4173/";

const site = new URL(siteUrl);
const basePath = site.pathname === "/" ? "" : site.pathname.replace(/\/$/, "");
const ga4MeasurementId = (process.env.GA4_MEASUREMENT_ID || config.ga4MeasurementId || "").trim();
const googleSiteVerification = (
  process.env.GOOGLE_SITE_VERIFICATION ||
  config.googleSiteVerification ||
  ""
).trim();
const bingSiteVerification = (
  process.env.BING_SITE_VERIFICATION ||
  config.bingSiteVerification ||
  ""
).trim();

function splitSuffix(target) {
  const match = String(target || "").match(/^([^?#]*)(.*)$/);
  return { pathname: match?.[1] || "", suffix: match?.[2] || "" };
}

function webPath(target = "") {
  if (/^(?:[a-z]+:)?\/\//i.test(target) || /^(?:mailto|tel|sms|data):/i.test(target)) return target;
  const { pathname: rawPath, suffix } = splitSuffix(target);
  const clean = rawPath.replace(/^\/+/, "");
  const prefix = basePath || "";
  const joined = clean ? `${prefix}/${clean}` : `${prefix}/`;
  return `${joined.replace(/\/+/g, "/")}${suffix}`;
}

function pageUrl(target = "") {
  const { pathname: rawPath, suffix } = splitSuffix(target);
  const clean = rawPath.replace(/^\/+/, "");
  return `${new URL(clean, siteUrl).href}${suffix}`;
}

const ctx = {
  siteUrl,
  basePath,
  ga4MeasurementId,
  googleSiteVerification,
  bingSiteVerification,
  path: webPath,
  asset: webPath,
  pageUrl,
  absoluteAsset: (target) => new URL(String(target).replace(/^\/+/, ""), siteUrl).href
};

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(publicDir, dist, { recursive: true });

for (const module of pageModules) {
  const meta = module.page;
  const html = layout({
    ctx,
    ...meta,
    canonicalPath: meta.route,
    content: module.render(ctx)
  });
  const outputPath = path.join(dist, meta.output);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

const indexablePages = pageModules
  .map((module) => module.page)
  .filter((page) => !page.noindex)
  .map((page) => ({
    loc: pageUrl(page.route),
    priority: page.route === "" ? "1.0" : page.route === "privacidad/" ? "0.3" : "0.8",
    changefreq: page.route === "" ? "weekly" : "monthly"
  }));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexablePages
  .map(
    (page) => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

const robots = `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap.xml", siteUrl).href}
`;
await writeFile(path.join(dist, "robots.txt"), robots, "utf8");

const manifest = {
  name: "Centro Veterinario Zaragoza",
  short_name: "Vet Zaragoza",
  description: "Atención veterinaria y estética canina en Venustiano Carranza, CDMX.",
  lang: "es-MX",
  start_url: webPath(""),
  scope: webPath(""),
  display: "standalone",
  background_color: "#f5f9ff",
  theme_color: "#1858b8",
  icons: [
    {
      src: webPath("assets/icons/icon-192.png"),
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: webPath("assets/icons/icon-512.png"),
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};
await writeFile(path.join(dist, "manifest.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

await writeFile(
  path.join(dist, "site-build.json"),
  `${JSON.stringify(
    {
      siteUrl,
      basePath,
      ga4Configured: /^G-[A-Z0-9]+$/i.test(ga4MeasurementId),
      generatedAt: new Date().toISOString(),
      pages: pageModules.map((module) => module.page.output)
    },
    null,
    2
  )}\n`,
  "utf8"
);

console.log(`Sitio generado en ${dist}`);
console.log(`URL base: ${siteUrl}`);
console.log(`Ruta base: ${basePath || "/"}`);
console.log(`Google Analytics: ${ga4MeasurementId ? "configurado" : "pendiente"}`);
