import { business } from "../data/business.mjs";
import {
  breadcrumb,
  buttonLink,
  faqList,
  pageHero,
  priceCard,
  promoBanner,
  responsiveImage,
  sectionHeading,
  serviceCard,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

const faqItems = [business.faq[0], business.faq[1], business.faq[2], business.faq[5]];

export const page = {
  route: "servicios/",
  output: "servicios/index.html",
  title: "Servicios veterinarios en CDMX",
  description:
    "Consulta general, especialidades, ultrasonografía, laboratorio clínico, rayos X generales y dentales, cirugía y apoyo para viajes en CDMX.",
  activePath: "servicios/",
  breadcrumbs: [{ label: "Servicios", href: "servicios/" }],
  faqItems
};

export function render(ctx) {
  const actions = `${whatsappLink(
    ctx,
    "Hola, Centro Veterinario Zaragoza. Quiero información sobre sus servicios médicos y agendar una cita.",
    "Consultar disponibilidad",
    "primary",
    "whatsapp_services_hero"
  )}${buttonLink({
    href: `tel:${business.contact.phoneE164}`,
    label: "Llamar",
    variant: "secondary",
    iconName: "phone",
    track: "phone_services"
  })}`;

  return `${breadcrumb(ctx, page.breadcrumbs)}
  ${pageHero({
    ctx,
    eyebrow: "Servicios médicos veterinarios",
    title: "Atención integral para cada etapa del cuidado",
    text: "Consulta general, especialidades, diagnóstico por imagen, laboratorio, cirugía y servicios complementarios con atención personalizada.",
    image: "assets/images/services-veterinary.svg",
    imageAlt: "Ilustración de servicios veterinarios y diagnóstico",
    actions,
    stats: [
      { value: "$300", label: "Consulta general" },
      { value: "$900", label: "Ultrasonografía" },
      { value: "$900", label: "Radiografías · 2 tomas" }
    ]
  })}

  <section class="section" aria-labelledby="medical-services-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Oferta médica",
        title: "Servicios para valorar, diagnosticar y acompañar",
        text: "Selecciona un servicio para conocer la información disponible y comunícate para confirmar agenda.",
        align: "center",
        id: "medical-services-title"
      })}
      <div class="service-grid service-grid--detailed">
        ${business.services.medical.map((service) => serviceCard(service, { ctx })).join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" id="diagnostico" aria-labelledby="diagnostic-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Diagnóstico",
        title: "Ultrasonografía, laboratorio y rayos X",
        text: "Estudios para complementar la valoración clínica, incluyendo radiografía general y radiografía dental.",
        align: "center",
        id: "diagnostic-title"
      })}
      <div class="diagnostic-showcase">
        <div class="diagnostic-gallery" aria-label="Ejemplos de estudios radiográficos">
          <figure class="diagnostic-media-card">
            ${responsiveImage({
              ctx,
              image: business.media.xrayGeneral,
              sizes: "(max-width: 720px) calc(100vw - 40px), 540px"
            })}
            <figcaption><strong>Rayos X generales</strong><span>Estudio radiográfico veterinario general.</span></figcaption>
          </figure>
          <figure class="diagnostic-media-card">
            ${responsiveImage({
              ctx,
              image: business.media.xrayDental,
              sizes: "(max-width: 720px) calc(100vw - 40px), 540px"
            })}
            <figcaption><strong>Rayos X dentales</strong><span>Imagen radiográfica para valoración odontológica.</span></figcaption>
          </figure>
        </div>
        <div class="info-stack info-stack--diagnostic">
          <article>${icon("ultrasound")}<div><h3>Ultrasonografía</h3><p>Ultrasonografía abdominal general disponible con agenda previa.</p><strong>$900 MXN</strong></div></article>
          <article>${icon("lab")}<div><h3>Laboratorio clínico</h3><p>Consulta los estudios disponibles y las indicaciones correspondientes.</p><a href="https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
            "Hola, Centro Veterinario Zaragoza. Quiero información sobre estudios de laboratorio clínico."
          )}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_lab">Solicitar información ${icon("arrow", "mini-icon")}</a></div></article>
          <article>${icon("xray")}<div><h3>Rayos X generales</h3><p>Estudios radiográficos generales para complementar la evaluación médica.</p><strong>$900 MXN · 2 tomas</strong></div></article>
          <article>${icon("xray")}<div><h3>Rayos X dentales</h3><p>Radiografía dental para apoyar la valoración de piezas y estructuras dentales. Solicita disponibilidad y cotización.</p></div></article>
        </div>
      </div>
    </div>
  </section>

  ${promoBanner(ctx)}

  <section class="section" aria-labelledby="prices-services-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Costos publicados",
        title: "Precios de referencia",
        text: "Confirma disponibilidad, agenda y cualquier preparación necesaria directamente con el centro.",
        align: "center",
        id: "prices-services-title"
      })}
      <div class="price-grid">
        ${business.prices.map(priceCard).join("")}
      </div>
      <p class="price-disclaimer">Precios en MXN. La información final se confirma al momento de solicitar la cita.</p>
    </div>
  </section>

  <section class="section section--travel" id="viajes" aria-labelledby="travel-title">
    <div class="container travel-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Viajes con mascotas",
          title: "Cartas y chips para viaje nacional e internacional",
          text: "Solicita orientación sobre disponibilidad y agenda. Los requisitos pueden depender del destino y del trámite que necesites.",
          id: "travel-title"
        })}
        <div class="travel-points">
          <span>${icon("travel")}<strong>Viaje nacional</strong></span>
          <span>${icon("travel")}<strong>Viaje internacional</strong></span>
          <span>${icon("calendar")}<strong>Atención con agenda</strong></span>
        </div>
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero información sobre cartas y chips para viajar con mi mascota.",
          "Consultar trámite de viaje",
          "primary",
          "whatsapp_travel"
        )}
      </div>
      <img src="${ctx.asset("assets/images/travel-pet.svg")}" width="680" height="560" alt="Ilustración de una mascota preparada para viajar" loading="lazy">
    </div>
  </section>

  <section class="section" aria-labelledby="services-faq-title">
    <div class="container faq-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Antes de agendar",
          title: "Preguntas frecuentes sobre servicios",
          text: "Información básica para solicitar atención y confirmar costos.",
          id: "services-faq-title"
        })}
      </div>
      ${faqList(faqItems)}
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Atención personalizada</p><h2>Cuéntanos qué necesita tu mascota</h2><p>Te orientamos para elegir el servicio y preparar tu solicitud de cita.</p></div>
      ${whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Necesito orientación para elegir un servicio y agendar.",
        "Hablar por WhatsApp",
        "light",
        "whatsapp_services_final"
      )}
    </div>
  </section>`;
}
