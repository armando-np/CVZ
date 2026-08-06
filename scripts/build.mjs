import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { layout } from "../src/templates/layout.mjs";
import * as home from "../src/pages/home.mjs";
import * as services from "../src/pages/services.mjs";
import * as grooming from "../src/pages/grooming.mjs";
import * as travel from "../src/pages/travel.mjs";
import * as about from "../src/pages/about.mjs";
import * as contact from "../src/pages/contact.mjs";
import * as privacy from "../src/pages/privacy.mjs";
import * as notFound from "../src/pages/not-found.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const config = JSON.parse(await readFile(path.join(root, "site.config.json"), "utf8"));

function normalizeSiteUrl(value) {
  const trimmed = String(value || "").trim();
  return trimmed ? `${trimmed.replace(/\/+$/, "")}/` : "";
}

const repository = process.env.GITHUB_REPOSITORY || "";
const repositoryName = repository.split("/")[1] || "";
const isUserSite = repositoryName.toLowerCase().endsWith(".github.io");
const configuredSiteUrl = normalizeSiteUrl(process.env.SITE_URL || config.siteUrl);
const inferredSiteUrl = repository
  ? `https://${repository.split("/")[0]}.github.io/${isUserSite ? "" : `${repositoryName}/`}`
  : "http://127.0.0.1:4173/";
const siteUrl = configuredSiteUrl || inferredSiteUrl;
const basePath = new URL(siteUrl).pathname.replace(/\/+$/, "/");

function joinBase(relative = "") {
  const clean = String(relative).replace(/^\/+/, "");
  return `${basePath}${clean}`.replace(/\/{2,}/g, "/");
}

const ctx = {
  siteUrl,
  basePath,
  ga4MeasurementId: process.env.GA4_MEASUREMENT_ID || config.ga4MeasurementId || "",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || config.googleSiteVerification || "",
  bingSiteVerification: process.env.BING_SITE_VERIFICATION || config.bingSiteVerification || "",
  path: joinBase,
  asset: joinBase,
  pageUrl(relative = "") {
    return new URL(joinBase(relative), new URL(siteUrl).origin).toString();
  },
  absoluteAsset(relative) {
    return new URL(joinBase(relative), new URL(siteUrl).origin).toString();
  }
};

const pages = [
  { route: "", module: home },
  { route: "servicios/", module: services },
  { route: "estetica/", module: grooming },
  { route: "microchip-y-viajes/", module: travel },
  { route: "nosotros/", module: about },
  { route: "contacto/", module: contact },
  { route: "privacidad/", module: privacy }
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, "public"), dist, { recursive: true });

for (const page of pages) {
  const destination = path.join(dist, page.route, "index.html");
  await mkdir(path.dirname(destination), { recursive: true });
  const pageData = page.module.render(ctx);
  await writeFile(destination, layout({ ctx, ...pageData }), "utf8");
}

const notFoundData = notFound.render(ctx);
await writeFile(path.join(dist, "404.html"), layout({ ctx, ...notFoundData }), "utf8");

const manifest = {
  name: "Centro Veterinario Zaragoza",
  short_name: "CV Zaragoza",
  description: "Atención veterinaria, diagnóstico, cirugía, estética y apoyo para viajes en Venustiano Carranza, CDMX.",
  lang: "es-MX",
  start_url: basePath,
  scope: basePath,
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#1858b8",
  icons: [
    { src: joinBase("assets/icons/icon-192.png"), sizes: "192x192", type: "image/png" },
    { src: joinBase("assets/icons/icon-512.png"), sizes: "512x512", type: "image/png" }
  ]
};
await writeFile(path.join(dist, "manifest.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
  .map((page) => `  <url><loc>${ctx.pageUrl(page.route)}</loc></url>`)
  .join("\n")}\n</urlset>\n`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${ctx.pageUrl("sitemap.xml")}\n`,
  "utf8"
);

console.log(`Sitio generado en ${dist}`);
console.log(`URL base: ${siteUrl}`);
