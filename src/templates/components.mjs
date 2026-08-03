import { business, navigation } from "../data/business.mjs";
import { icon } from "./icons.mjs";

export function responsiveImage({
  ctx,
  image,
  alt,
  className = "",
  sizes = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority = ""
}) {
  if (!image?.src) return "";

  const srcset = Array.isArray(image.srcset)
    ? image.srcset.map((source) => `${ctx.asset(source.src)} ${source.width}w`).join(", ")
    : "";
  const attributes = [
    `src="${ctx.asset(image.src)}"`,
    `width="${image.width}"`,
    `height="${image.height}"`,
    `alt="${alt ?? image.alt ?? ""}"`,
    `decoding="${decoding}"`
  ];

  if (className) attributes.push(`class="${className}"`);
  if (srcset) attributes.push(`srcset="${srcset}"`);
  if (sizes && srcset) attributes.push(`sizes="${sizes}"`);
  if (loading) attributes.push(`loading="${loading}"`);
  if (fetchPriority) attributes.push(`fetchpriority="${fetchPriority}"`);

  return `<img ${attributes.join(" ")}>`;
}

export function buttonLink({
  href,
  label,
  variant = "primary",
  iconName = "arrow",
  external = false,
  track = "",
  className = ""
}) {
  const attrs = [
    `href="${href}"`,
    `class="button button--${variant}${className ? ` ${className}` : ""}"`
  ];
  if (external) attrs.push('target="_blank"', 'rel="noopener noreferrer"');
  if (track) attrs.push(`data-track="${track}"`);
  return `<a ${attrs.join(" ")}><span>${label}</span>${icon(iconName, "button__icon")}</a>`;
}

export function whatsappLink(ctx, message, label = "Agendar por WhatsApp", variant = "primary", track = "whatsapp") {
  const href = `https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  return buttonLink({
    href,
    label,
    variant,
    iconName: "whatsapp",
    external: true,
    track
  });
}

export function sectionHeading({ eyebrow = "", title, text = "", align = "left", id = "" }) {
  return `<div class="section-heading section-heading--${align}">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <h2${id ? ` id="${id}"` : ""}>${title}</h2>
    ${text ? `<p class="section-heading__text">${text}</p>` : ""}
  </div>`;
}

export function serviceCard(service, { compact = false, ctx = null } = {}) {
  const hasMedia = Boolean(ctx && service.image);
  const media = hasMedia
    ? `<div class="service-card__media">
        ${responsiveImage({
          ctx,
          image: service.image,
          sizes: "(max-width: 720px) calc(100vw - 28px), (max-width: 960px) 50vw, 320px"
        })}
        <span class="service-card__media-icon">${icon(service.icon)}</span>
      </div>`
    : `<span class="service-card__icon">${icon(service.icon)}</span>`;

  return `<article class="service-card${compact ? " service-card--compact" : ""}${hasMedia ? " service-card--with-media" : ""}" id="${service.id}">
    ${media}
    <div class="service-card__body">
      <h3>${service.title}</h3>
      <p>${service.short}</p>
    </div>
  </article>`;
}

export function priceCard(item) {
  return `<article class="price-card">
    <div class="price-card__top">
      <h3>${item.service}</h3>
      <p class="price-card__price">${item.price}${item.currency ? `<span>${item.currency}</span>` : ""}</p>
    </div>
    <p class="price-card__note">${icon("check", "mini-icon")} ${item.note}</p>
  </article>`;
}

export function featureCard(feature, index = 0) {
  const icons = ["user", "sparkle", "heart", "shield"];
  return `<article class="feature-card">
    <span class="feature-card__icon">${icon(icons[index % icons.length])}</span>
    <h3>${feature.title}</h3>
    <p>${feature.text}</p>
  </article>`;
}

export function faqList(items = business.faq) {
  return `<div class="faq-list">
    ${items
      .map(
        (item, index) => `<details class="faq-item"${index === 0 ? " open" : ""}>
      <summary>${item.question}<span>${icon("chevron", "faq-item__icon")}</span></summary>
      <div class="faq-item__answer"><p>${item.answer}</p></div>
    </details>`
      )
      .join("")}
  </div>`;
}

export function breadcrumb(ctx, items) {
  const links = [
    `<a href="${ctx.path("")}">Inicio</a>`,
    ...items.map((item, index) => {
      const isLast = index === items.length - 1;
      return isLast
        ? `<span aria-current="page">${item.label}</span>`
        : `<a href="${ctx.path(item.href)}">${item.label}</a>`;
    })
  ];
  return `<nav class="breadcrumb" aria-label="Migas de pan">${links
    .map((entry, index) => `${index ? icon("chevron", "breadcrumb__icon") : ""}${entry}`)
    .join("")}</nav>`;
}

export function pageHero({ ctx, eyebrow, title, text, image, imageAlt = "", actions = "", stats = [] }) {
  return `<section class="page-hero">
    <div class="container page-hero__grid">
      <div class="page-hero__content reveal">
        ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
        <h1>${title}</h1>
        <p class="page-hero__lead">${text}</p>
        ${actions ? `<div class="button-row">${actions}</div>` : ""}
        ${
          stats.length
            ? `<div class="page-hero__stats">${stats
                .map(
                  (stat) => `<div><strong>${stat.value}</strong><span>${stat.label}</span></div>`
                )
                .join("")}</div>`
            : ""
        }
      </div>
      <div class="page-hero__visual reveal reveal--delay">
        <div class="illustration-shell illustration-shell--page">
          <img src="${ctx.asset(image)}" width="680" height="560" alt="${imageAlt}" decoding="async" fetchpriority="high">
        </div>
      </div>
    </div>
  </section>`;
}

export function locationPanel(ctx, { compact = false } = {}) {
  return `<div class="location-panel${compact ? " location-panel--compact" : ""}">
    <div class="location-panel__details">
      <div class="contact-detail">
        <span>${icon("pin")}</span>
        <div><strong>Visítanos</strong><p>${business.contact.fullAddress}</p></div>
      </div>
      <div class="contact-detail">
        <span>${icon("clock")}</span>
        <div><strong>Horarios</strong><p>Clínica: ${business.hours.clinic.summary}<br>Estética: ${business.hours.grooming.summary}</p></div>
      </div>
      <div class="contact-detail">
        <span>${icon("phone")}</span>
        <div><strong>Teléfono y WhatsApp</strong><p><a href="tel:${business.contact.phoneE164}" data-track="phone">${business.contact.phoneDisplay}</a></p></div>
      </div>
      <div class="button-row">
        ${buttonLink({
          href: business.contact.mapDirectionsUrl,
          label: "Cómo llegar",
          variant: "secondary",
          iconName: "external",
          external: true,
          track: "map"
        })}
        ${buttonLink({
          href: ctx.path("contacto/"),
          label: "Solicitar cita",
          variant: "primary",
          iconName: "calendar"
        })}
      </div>
    </div>
    <div class="map-frame">
      <iframe
        src="${business.contact.mapEmbedUrl}"
        title="Mapa de Centro Veterinario Zaragoza"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen></iframe>
    </div>
  </div>`;
}

export function promoBanner(ctx) {
  return `<section class="promo-banner" aria-labelledby="promo-title">
    <div class="container promo-banner__inner">
      <div class="promo-banner__media">
        ${responsiveImage({
          ctx,
          image: business.media.surgery,
          sizes: "(max-width: 720px) calc(100vw - 28px), 190px"
        })}
        <span>${icon("surgery")}</span>
      </div>
      <div>
        <p class="eyebrow eyebrow--light">Agenda previa</p>
        <h2 id="promo-title">Evaluación y cotización prequirúrgica sin costo</h2>
        <p>Escríbenos para confirmar disponibilidad y preparar tu cita.</p>
      </div>
      ${whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Quiero agendar una evaluación y cotización prequirúrgica.",
        "Agendar valoración",
        "light",
        "whatsapp_prequirurgica"
      )}
    </div>
  </section>`;
}

export function header(ctx, activePath = "") {
  const nav = navigation
    .map((item) => {
      const active = item.href === activePath;
      return `<a href="${ctx.path(item.href)}"${active ? ' aria-current="page"' : ""}>${item.label}</a>`;
    })
    .join("");

  return `<a class="skip-link" href="#contenido">Saltar al contenido</a>
  <div class="utility-bar">
    <div class="container utility-bar__inner">
      <span>${icon("clock", "mini-icon")} Clínica: ${business.hours.clinic.summary}</span>
      <a href="${business.contact.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" data-track="map">${icon(
        "pin",
        "mini-icon"
      )} ${business.contact.neighborhood}, ${business.contact.borough}</a>
    </div>
  </div>
  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="brand" href="${ctx.path("")}" aria-label="${business.name}, inicio">
        <img src="${ctx.asset("assets/images/logo.webp")}" width="86" height="70" alt="" decoding="async">
        <span><strong>${business.name}</strong><small>${business.slogan}</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Navegación principal">${nav}</nav>
      <div class="header-actions">
        <a class="header-phone" href="tel:${business.contact.phoneE164}" data-track="phone" aria-label="Llamar al ${business.contact.phoneDisplay}">${icon(
          "phone"
        )}<span>${business.contact.phoneDisplay}</span></a>
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita.",
          "Agendar cita",
          "primary",
          "whatsapp_header"
        )}
      </div>
      <button class="menu-button" type="button" aria-controls="mobile-menu" aria-expanded="false" data-menu-button>
        <span class="sr-only">Abrir menú</span>
        <span data-menu-icon-open>${icon("menu")}</span>
        <span data-menu-icon-close hidden>${icon("close")}</span>
      </button>
    </div>
    <nav class="mobile-nav" id="mobile-menu" aria-label="Navegación móvil" hidden data-mobile-menu>
      <div class="container">${nav}
        <a class="mobile-nav__phone" href="tel:${business.contact.phoneE164}" data-track="phone">${icon("phone")} ${business.contact.phoneDisplay}</a>
      </div>
    </nav>
  </header>`;
}

export function footer(ctx) {
  return `<footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__brand">
        <a class="brand brand--footer" href="${ctx.path("")}">
          <img src="${ctx.asset("assets/images/logo.webp")}" width="86" height="70" alt="" loading="lazy">
          <span><strong>${business.name}</strong><small>${business.slogan}</small></span>
        </a>
        <p>${business.description}</p>
        <a class="social-link" href="${business.contact.instagram}" target="_blank" rel="noopener noreferrer" data-track="instagram">${icon(
          "instagram"
        )}<span>@centro_veterinario_zaragoza</span></a>
      </div>
      <div>
        <h2>Explora</h2>
        <ul>${navigation
          .map((item) => `<li><a href="${ctx.path(item.href)}">${item.label}</a></li>`)
          .join("")}</ul>
      </div>
      <div>
        <h2>Servicios</h2>
        <ul>
          <li><a href="${ctx.path("servicios/#consulta-general")}">Consulta general</a></li>
          <li><a href="${ctx.path("servicios/#ultrasonografia")}">Ultrasonografía</a></li>
          <li><a href="${ctx.path("servicios/#radiografias")}">Radiografías</a></li>
          <li><a href="${ctx.path("estetica/")}">Estética canina</a></li>
          <li><a href="${ctx.path("servicios/#viajes")}">Cartas y chips de viaje</a></li>
        </ul>
      </div>
      <div>
        <h2>Contacto</h2>
        <ul class="footer-contact">
          <li>${icon("phone", "mini-icon")} <a href="tel:${business.contact.phoneE164}" data-track="phone">${business.contact.phoneDisplay}</a></li>
          <li>${icon("pin", "mini-icon")} <a href="${business.contact.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" data-track="map">${business.contact.addressLine}, ${business.contact.neighborhood}</a></li>
          <li>${icon("clock", "mini-icon")} ${business.hours.clinic.summary}</li>
        </ul>
      </div>
    </div>
    <div class="container site-footer__bottom">
      <p>© <span data-current-year>${new Date().getFullYear()}</span> ${business.name}. Todos los derechos reservados.</p>
      <div><a href="${ctx.path("privacidad/")}">Aviso de privacidad</a><button type="button" class="footer-cookie-button" data-open-consent>Preferencias de analítica</button></div>
    </div>
  </footer>`;
}

export function floatingActions(ctx) {
  const message = "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita.";
  return `<div class="floating-actions" aria-label="Acciones rápidas">
    <a class="floating-whatsapp" href="https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
      message
    )}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_floating" aria-label="Agendar cita por WhatsApp">
      ${icon("whatsapp")}<span>WhatsApp</span>
    </a>
  </div>`;
}

export function consentBanner(ctx) {
  return `<aside class="consent-banner" id="analytics-consent" hidden aria-labelledby="consent-title" aria-describedby="consent-description">
    <div class="consent-banner__icon">${icon("cookie")}</div>
    <div class="consent-banner__content">
      <h2 id="consent-title">Preferencias de analítica</h2>
      <p id="consent-description">Usamos Google Analytics únicamente con tu autorización para entender cómo se utiliza el sitio. No es necesario aceptar para navegar o agendar.</p>
      <a href="${ctx.path("privacidad/")}">Consulta el aviso de privacidad</a>
    </div>
    <div class="consent-banner__actions">
      <button class="button button--ghost" type="button" data-consent="reject">Rechazar</button>
      <button class="button button--primary" type="button" data-consent="accept">Aceptar analítica</button>
    </div>
  </aside>`;
}
