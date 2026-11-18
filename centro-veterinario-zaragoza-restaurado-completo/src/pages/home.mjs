import { business } from "../data/business.mjs";
import {
  buttonLink,
  faqList,
  featureCard,
  locationPanel,
  priceCard,
  promoBanner,
  responsiveImage,
  sectionHeading,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export const page = {
  route: "",
  output: "index.html",
  title: "Veterinaria en Venustiano Carranza",
  description:
    "Consulta general, cardiología con cita, imagen, laboratorio, cirugía, farmacia, grooming y apoyo para viaje en Ignacio Zaragoza, CDMX.",
  activePath: "",
  faqItems: business.faq
};

export function render(ctx) {
  const homeServices = [
    { title: "Consulta general", text: "Valoración médica", icon: "stethoscope", href: ctx.path("servicios/#consulta-general") },
    { title: "Cardiología", text: "Previa cita", icon: "heart", href: ctx.path("contacto/") },
    { title: "Imagen", text: "Ultrasonografía y rayos X", icon: "xray", href: ctx.path("servicios/#diagnostico") },
    { title: "Laboratorio", text: "Apoyo diagnóstico", icon: "lab", href: ctx.path("servicios/#laboratorio-clinico") },
    { title: "Cirugía", text: "Evaluación prequirúrgica", icon: "surgery", href: ctx.path("servicios/#cirugia") },
    { title: "Farmacia", text: "Productos y apoyo para el cuidado", icon: "pharmacy", href: ctx.path("contacto/") },
    { title: "Grooming", text: "Baño, estilo y cuidado", icon: "sparkle", href: ctx.path("estetica/") },
    { title: "Apoyo documental para viaje", text: "Documentación y chip", icon: "travel", href: ctx.path("servicios/#viajes") }
  ];
  const whatsapp = whatsappLink(
    ctx,
    "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita.",
    "Agendar por WhatsApp",
    "primary",
    "whatsapp_hero"
  );

  return `<section class="home-hero">
    <div class="home-hero__pattern" aria-hidden="true"></div>
    <div class="container home-hero__grid">
      <div class="home-hero__content reveal">
        <p class="eyebrow">Centro veterinario en Venustiano Carranza</p>
        <h1>Cuidado médico y bienestar para quienes más amas</h1>
        <p class="home-hero__lead">${business.description}</p>
        <div class="button-row">
          ${whatsapp}
          ${buttonLink({
            href: `tel:${business.contact.phoneE164}`,
            label: "Llamar ahora",
            variant: "secondary",
            iconName: "phone",
            track: "phone_hero"
          })}
        </div>
        <div class="hero-proof" aria-label="Información destacada">
          <div><strong>$300 MXN</strong><span>Consulta general</span></div>
          <div><strong>Sin costo</strong><span>Evaluación prequirúrgica</span></div>
          <div><strong>3 años</strong><span>Trabajando junto a ti</span></div>
        </div>
      </div>
      <div class="home-hero__visual reveal reveal--delay">
        <div class="hero-visual-card hero-visual-card--photo">
          ${responsiveImage({
            ctx,
            image: business.media.banner,
            className: "hero-visual-card__image",
            sizes: "(max-width: 960px) calc(100vw - 40px), 540px",
            loading: "eager",
            fetchPriority: "high"
          })}
          <div class="floating-card floating-card--one">${icon("stethoscope")}<span><strong>Atención integral</strong>Salud y diagnóstico</span></div>
          <div class="floating-card floating-card--two">${icon("sparkle")}<span><strong>Grooming</strong>Cuidado y estilo</span></div>
        </div>
      </div>
    </div>
    <div class="container home-hero__quickbar">
      <a href="${ctx.path("servicios/")}">${icon("stethoscope")}<span><strong>Servicios médicos</strong>Consulta, imagen y cirugía</span>${icon("arrow", "quickbar__arrow")}</a>
      <a href="${ctx.path("estetica/")}">${icon("sparkle")}<span><strong>Grooming</strong>Baño, deslanado y estilismo</span>${icon("arrow", "quickbar__arrow")}</a>
      <a href="${ctx.path("contacto/")}">${icon("calendar")}<span><strong>Agenda sencilla</strong>Prepara tu solicitud por WhatsApp</span>${icon("arrow", "quickbar__arrow")}</a>
    </div>
  </section>

  <section class="section section--services" aria-labelledby="services-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Servicios",
        title: "Lo esencial para la salud y bienestar de tu mascota",
        text: "Consulta el servicio que necesitas y contáctanos para confirmar disponibilidad o cita.",
        align: "center",
        id: "services-title"
      })}
      <div class="home-service-summary">
        ${homeServices
          .map(
            (service) => `<a class="home-service-summary__item" href="${service.href}">
              <span class="home-service-summary__icon">${icon(service.icon)}</span>
              <span><strong>${service.title}</strong><small>${service.text}</small></span>
              ${icon("arrow", "home-service-summary__arrow")}
            </a>`
          )
          .join("")}
      </div>
      <div class="section-actions">
        ${buttonLink({
          href: ctx.path("servicios/"),
          label: "Ver servicios veterinarios",
          variant: "secondary",
          iconName: "arrow"
        })}
      </div>
    </div>
  </section>

  ${promoBanner(ctx)}

  <section class="section section--soft" aria-labelledby="prices-title">
    <div class="container">
      <div class="split-heading">
        ${sectionHeading({
          eyebrow: "Precios transparentes",
          title: "Costos de referencia para servicios frecuentes",
          text: "Confirma disponibilidad y cualquier indicación previa al agendar.",
          id: "prices-title"
        })}
        <div class="split-heading__note">${icon("shield")}<p><strong>Agenda informada</strong>Recibe orientación directa antes de tu visita.</p></div>
      </div>
      <div class="price-grid">
        ${business.prices.map(priceCard).join("")}
      </div>
      <p class="price-disclaimer">Precios expresados en pesos mexicanos y sujetos a confirmación directa con el centro.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="why-title">
    <div class="container why-grid">
      <div class="why-visual reveal">
        <div class="illustration-shell">
          <img src="${ctx.asset("assets/images/clinic-care.svg")}" width="680" height="560" alt="Ilustración de atención veterinaria cercana y profesional" loading="lazy">
        </div>
      </div>
      <div class="why-content">
        ${sectionHeading({
          eyebrow: "Por qué elegirnos",
          title: "Profesionalismo con un trato cercano",
          text: "Un equipo comprometido con ofrecer una experiencia clara, respetuosa y personalizada.",
          id: "why-title"
        })}
        <div class="feature-list">
          ${business.differentiators.map(featureCard).join("")}
        </div>
      </div>
    </div>
  </section>

  <section class="section section--grooming" aria-labelledby="grooming-title">
    <div class="container grooming-feature">
      <div class="grooming-feature__content">
        ${sectionHeading({
          eyebrow: "Grooming",
          title: "Cuidado que también se nota",
          text: "Baño, deslanado, corte de uñas, estilismo canino y colorimetría con atención amable.",
          id: "grooming-title"
        })}
        <ul class="check-list">
          ${business.services.grooming
            .map((service) => `<li>${icon("check")}<span>${service.title}</span></li>`)
            .join("")}
        </ul>
        <div class="button-row">
          ${buttonLink({
            href: ctx.path("estetica/"),
            label: "Conocer grooming",
            variant: "primary",
            iconName: "arrow"
          })}
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar una cotización para grooming.",
            "Pedir cotización",
            "secondary",
            "whatsapp_grooming_home"
          )}
        </div>
        <p class="hours-pill">${icon("clock")} ${business.hours.grooming.summary}</p>
      </div>
      <div class="grooming-feature__visual">
        <img src="${ctx.asset("assets/images/grooming.svg")}" width="680" height="560" alt="Ilustración de un perro durante un servicio de grooming" loading="lazy">
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="team-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Nuestro equipo",
        title: "Médicas veterinarias comprometidas con tu mascota",
        text: "Centro Veterinario Zaragoza es dirigido por profesionales que combinan atención personalizada, empatía y actualización continua.",
        align: "center",
        id: "team-title"
      })}
      <div class="team-grid">
        ${business.owners
          .map((owner) => {
            const avatar = owner.photo?.avatar;
            return `<article class="team-card">
          <div class="team-card__avatar${avatar ? " team-card__avatar--photo" : ""}">
            ${
              avatar
                ? responsiveImage({ ctx, image: avatar, alt: "", sizes: "78px" })
                : `<span>${owner.initials}</span>`
            }
            ${icon("paw", "team-card__paw")}
          </div>
          <div><h3>${owner.name}</h3><p>${owner.role}</p></div>
        </article>`;
          })
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="location-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Ubicación y horarios",
        title: "Estamos en la colonia Ignacio Zaragoza",
        text: "Consulta el mapa, revisa nuestros horarios y agenda antes de tu visita.",
        id: "location-title"
      })}
      ${locationPanel(ctx)}
    </div>
  </section>

  <section class="section" aria-labelledby="faq-title">
    <div class="container faq-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Preguntas frecuentes",
          title: "Información para planear tu visita",
          text: "Respuestas rápidas sobre precios, horarios, ubicación y citas.",
          id: "faq-title"
        })}
        <div class="faq-contact-card">
          ${icon("whatsapp")}
          <div><strong>¿Necesitas confirmar algo?</strong><p>Escríbenos y recibe atención directa.</p></div>
          <a href="https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
            "Hola, Centro Veterinario Zaragoza. Tengo una pregunta antes de agendar."
          )}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_faq">Abrir WhatsApp</a>
        </div>
      </div>
      ${faqList()}
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div>
        <p class="eyebrow eyebrow--light">Tu mascota, nuestra pasión</p>
        <h2>Da el siguiente paso para cuidar su salud y bienestar</h2>
        <p>Solicita información, confirma disponibilidad y agenda por WhatsApp.</p>
      </div>
      <div class="button-row">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero agendar una cita para mi mascota.",
          "Agendar ahora",
          "light",
          "whatsapp_final"
        )}
        ${buttonLink({
          href: ctx.path("contacto/"),
          label: "Ver contacto",
          variant: "outline-light",
          iconName: "arrow"
        })}
      </div>
    </div>
  </section>`;
}
