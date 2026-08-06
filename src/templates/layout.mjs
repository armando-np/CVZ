import { business } from "../data/business.mjs";
import { consentBanner, escapeHtml, floatingActions, footer, header } from "./components.mjs";

function safeJson(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

const dayMap = {
  Lunes: "Monday",
  Martes: "Tuesday",
  Miércoles: "Wednesday",
  Jueves: "Thursday",
  Viernes: "Friday",
  Sábado: "Saturday",
  Domingo: "Sunday"
};

function schemaDays(days) {
  return days.map((day) => `https://schema.org/${dayMap[day]}`);
}

function localBusinessSchema(ctx) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VeterinaryCare",
        "@id": `${ctx.siteUrl}#veterinary-care`,
        name: business.name,
        alternateName: business.legalDisplayName,
        description: business.shortDescription,
        url: ctx.siteUrl,
        logo: ctx.absoluteAsset("assets/images/logo.png"),
        image: [
          ctx.absoluteAsset("assets/images/og-default.png"),
          ctx.absoluteAsset(business.media.paulina.src),
          ctx.absoluteAsset(business.media.banner.src)
        ],
        telephone: business.contact.phoneE164,
        slogan: business.slogan,
        hasMap: business.contact.mapSearchUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: business.contact.addressLine,
          addressLocality: business.contact.city,
          addressRegion: business.contact.region,
          postalCode: business.contact.postalCode,
          addressCountry: business.contact.countryCode
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Venustiano Carranza, Ciudad de México"
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: schemaDays(business.hours.clinic.days),
            opens: business.hours.clinic.opens,
            closes: business.hours.clinic.closes
          }
        ],
        department: {
          "@type": "LocalBusiness",
          name: `Estética animal — ${business.name}`,
          telephone: business.contact.phoneE164,
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: schemaDays(business.hours.grooming.days),
              opens: business.hours.grooming.opens,
              closes: business.hours.grooming.closes
            }
          ]
        },
        sameAs: [business.contact.instagram],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios veterinarios y de estética",
          itemListElement: [
            ...business.services.medical.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service.title }
            })),
            ...business.services.grooming.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service.title }
            }))
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${ctx.siteUrl}#website`,
        url: ctx.siteUrl,
        name: business.name,
        inLanguage: "es-MX",
        publisher: { "@id": `${ctx.siteUrl}#veterinary-care` }
      }
    ]
  };
}

function breadcrumbSchema(ctx, breadcrumbs = []) {
  if (!breadcrumbs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: ctx.pageUrl("")
      },
      ...breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: ctx.pageUrl(item.href)
      }))
    ]
  };
}

function faqSchema(faqItems = []) {
  if (!faqItems.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function layout({
  ctx,
  title,
  description,
  content,
  activePath = "",
  canonicalPath = "",
  image = "assets/images/og-default.png",
  imageAlt = "Centro Veterinario Zaragoza",
  breadcrumbs = [],
  faqItems = [],
  scripts = [],
  bodyClass = "",
  noindex = false
}) {
  const canonical = ctx.pageUrl(canonicalPath);
  const pageTitle = title.includes(business.name) ? title : `${title} | ${business.name}`;
  const schemas = [localBusinessSchema(ctx), breadcrumbSchema(ctx, breadcrumbs), faqSchema(faqItems)].filter(Boolean);
  const config = {
    ga4MeasurementId: ctx.ga4MeasurementId,
    pagePath: canonicalPath || "/",
    businessName: business.name,
    locale: "es-MX"
  };
  const imageType = image.endsWith(".webp") ? "image/webp" : "image/png";
  const assetVersion = "1.1.2";
  const versionedAsset = (assetPath) => `${ctx.asset(assetPath)}?v=${assetVersion}`;

  return `<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#1858b8">
  <meta name="color-scheme" content="light">
  <meta name="format-detection" content="telephone=no">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  ${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="es-MX" href="${canonical}">
  <link rel="icon" href="${ctx.asset("assets/icons/favicon.svg")}" type="image/svg+xml">
  <link rel="icon" href="${ctx.asset("assets/icons/icon-192.png")}" sizes="192x192" type="image/png">
  <link rel="apple-touch-icon" href="${ctx.asset("assets/icons/apple-touch-icon.png")}">
  <link rel="manifest" href="${ctx.asset("manifest.webmanifest")}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_MX">
  <meta property="og:site_name" content="${escapeHtml(business.name)}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ctx.absoluteAsset(image)}">
  <meta property="og:image:type" content="${imageType}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${ctx.absoluteAsset(image)}">
  <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}">
  ${ctx.googleSiteVerification ? `<meta name="google-site-verification" content="${escapeHtml(ctx.googleSiteVerification)}">` : ""}
  ${ctx.bingSiteVerification ? `<meta name="msvalidate.01" content="${escapeHtml(ctx.bingSiteVerification)}">` : ""}
  <link rel="stylesheet" href="${versionedAsset("assets/css/styles.css")}">
  ${schemas.map((schema) => `<script type="application/ld+json">${safeJson(schema)}</script>`).join("\n  ")}
  <script id="site-config" type="application/json">${safeJson(config)}</script>
  <script src="${versionedAsset("assets/js/analytics.js")}" defer></script>
  <script src="${versionedAsset("assets/js/main.js")}" defer></script>
  ${scripts.map((script) => `<script src="${versionedAsset(script)}" defer></script>`).join("\n  ")}
</head>
<body class="${bodyClass}">
  ${header(ctx, activePath)}
  <main id="contenido">${content}</main>
  ${footer(ctx)}
  ${floatingActions(ctx)}
  ${consentBanner(ctx)}
</body>
</html>`;
}
