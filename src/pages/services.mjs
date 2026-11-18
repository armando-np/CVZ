import { business } from "../data/business.mjs";
import {
  buttonLink,
  faqList,
  mediaFigure,
  pageHero,
  priceCard,
  promoBanner,
  responsiveImage,
  sectionHeading,
  serviceCard,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export function render(ctx) {
  const serviceFaq = business.faq.filter((_, index) => [0, 1, 2, 5, 6, 9].includes(index));
  const actions = [
    whatsappLink(
      ctx,
      "Hola, Centro Veterinario Zaragoza. Quiero información sobre un servicio veterinario y disponibilidad.",
      "Consultar disponibilidad",
      "primary",
      "whatsapp_services_hero"
    ),
    buttonLink({
      href: `tel:${business.contact.phoneE164}`,
      label: "Llamar al centro",
      variant: "secondary",
      iconName: "phone",
      track: "phone_services_hero"
    })
  ].join("");

  const content = `
  ${pageHero({
    ctx,
    eyebrow: "Servicios veterinarios",
    title: "Consulta, especialidad, diagnóstico y tratamiento",
    text: "Consulta general, especialidades con cita, ultrasonografía, laboratorio clínico, rayos X generales y dentales, cirugía, farmacia y apoyo para viajes.",
    image: business.media.ultrasoundConsult,
    imageAlt: "Estudio de ultrasonografía en Centro Veterinario Zaragoza",
    actions,
    stats: [
      { value: "$300", label: "Consulta médica general" },
      { value: "Con cita", label: "Especialidades y ultrasonografía" },
      { value: "Sin cita", label: "Aplicación de microchip" }
    ],
    objectPosition: "center 42%"
  })}

  <section class="section section--services" aria-labelledby="catalogo-servicios">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Atención integral",
        title: "Servicios disponibles",
        text: "La indicación de estudios, medicamentos y procedimientos se define con base en la valoración veterinaria. Confirma por WhatsApp los servicios que requieren cita o preparación.",
        id: "catalogo-servicios"
      })}
      <div class="service-grid service-grid--detailed">
        ${business.services.medical
          .map((service) => {
            const link = service.id === "microchip-viajes" ? ctx.path("microchip-y-viajes/") : `#${service.id}`;
            return serviceCard(service, { ctx, link });
          })
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft anchor-section" id="especialidades" aria-labelledby="especialidades-title">
    <div class="container content-split">
      <div class="content-split__media reveal">
        ${mediaFigure(ctx, business.media.ultrasoundConsult, "Atención veterinaria especializada con coordinación previa")}
      </div>
      <div class="content-split__copy reveal reveal--delay">
        ${sectionHeading({
          eyebrow: "Especialidades",
          title: "Atención especializada con agenda previa",
          text: "Consulta por WhatsApp las especialidades disponibles, fechas, horarios e indicaciones previas. La atención especializada se coordina según agenda.",
          id: "especialidades-title"
        })}
        <div class="button-row">
          ${whatsappLink(ctx, "Hola, Centro Veterinario Zaragoza. Quiero información sobre especialidades y disponibilidad de cita.", "Consultar especialidades", "primary", "whatsapp_specialties")}
        </div>
      </div>
    </div>
  </section>

  <section class="section anchor-section" id="diagnostico" aria-labelledby="diagnostico-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Diagnóstico",
        title: "Ultrasonografía, laboratorio y rayos X generales y dentales",
        text: "Los estudios complementan la evaluación médica. La preparación, el número de tomas y la entrega de resultados dependen del estudio indicado.",
        id: "diagnostico-title"
      })}

      <div class="diagnostic-sections">
        <article class="diagnostic-feature" id="ultrasonografia">
          <div class="diagnostic-feature__copy">
            <p class="eyebrow">Ultrasonografía</p>
            <h3>Estudio de imagen con agenda previa</h3>
            <p>Confirma por WhatsApp la disponibilidad y las indicaciones de preparación que correspondan al tipo de estudio solicitado.</p>
            <div class="badge-row"><span>${icon("calendar", "mini-icon")} Con cita</span><span>${icon("check", "mini-icon")} Precio de referencia: $1,500 MXN</span></div>
            ${whatsappLink(
              ctx,
              "Hola, Centro Veterinario Zaragoza. Quiero agendar una ultrasonografía y conocer las indicaciones de preparación.",
              "Agendar ultrasonografía",
              "secondary",
              "whatsapp_ultrasound"
            )}
          </div>
          <div class="diagnostic-feature__media">
            ${responsiveImage({
              ctx,
              image: business.media.ultrasoundPatient,
              sizes: "(max-width: 760px) calc(100vw - 28px), 420px"
            })}
          </div>
        </article>

        <article class="diagnostic-feature diagnostic-feature--reverse" id="laboratorio-clinico">
          <div class="diagnostic-feature__copy">
            <p class="eyebrow">Laboratorio clínico</p>
            <h3>Estudios indicados según la valoración médica</h3>
            <p>El laboratorio aporta información complementaria para el seguimiento clínico. Consulta disponibilidad, preparación y tiempo estimado de resultados.</p>
            <div class="badge-row"><span>${icon("lab", "mini-icon")} Apoyo diagnóstico</span><span>${icon("whatsapp", "mini-icon")} Información por WhatsApp</span></div>
            ${whatsappLink(
              ctx,
              "Hola, Centro Veterinario Zaragoza. Quiero información sobre estudios de laboratorio clínico para mi mascota.",
              "Consultar laboratorio",
              "secondary",
              "whatsapp_laboratory"
            )}
          </div>
          <div class="diagnostic-feature__media diagnostic-feature__media--portrait">
            ${responsiveImage({
              ctx,
              image: business.media.laboratory,
              sizes: "(max-width: 760px) calc(100vw - 28px), 420px"
            })}
          </div>
        </article>
      </div>

      <div class="radiography-block" id="radiografias">
        <div class="split-heading">
          ${sectionHeading({
            eyebrow: "Estudios radiográficos",
            title: "Rayos X generales y dentales",
            text: "Los estudios radiográficos generales tienen un precio de referencia de $950 MXN. Los rayos X dentales se cotizan de forma individual.",
            id: "radiografias-title"
          })}
          <div class="split-heading__note">${icon("info")}<p><strong>Privacidad del paciente</strong>Las versiones publicadas fueron recortadas para no mostrar nombres ni datos identificables.</p></div>
        </div>
        <div class="diagnostic-sections diagnostic-sections--xrays">
          <article class="diagnostic-feature">
            <div class="diagnostic-feature__copy">
              <p class="eyebrow">Rayos X generales</p>
              <h3>Estudios radiográficos generales · $950 MXN</h3>
              <p>La región, las proyecciones y cualquier preparación se determinan según la valoración y el estudio solicitado.</p>
            </div>
            <div class="diagnostic-feature__media">${responsiveImage({ ctx, image: business.media.xrayGeneralNew, sizes: "(max-width: 760px) calc(100vw - 28px), 420px" })}</div>
          </article>
          <article class="diagnostic-feature diagnostic-feature--reverse">
            <div class="diagnostic-feature__copy">
              <p class="eyebrow">Rayos X dentales</p>
              <h3>Radiografía dental con cotización individual</h3>
              <p>El costo varía por raza, talla, peso, patología dental y protocolo anestésico. Confirma por WhatsApp la valoración y preparación necesarias.</p>
            </div>
            <div class="diagnostic-feature__media">${responsiveImage({ ctx, image: business.media.xrayDental, sizes: "(max-width: 760px) calc(100vw - 28px), 420px" })}</div>
          </article>
        </div>
        <div class="media-gallery media-gallery--xrays">
          ${mediaFigure(ctx, business.media.xrays[0], "Proyección radiográfica frontal", "media-card--tall")}
          ${mediaFigure(ctx, business.media.xrays[1], "Proyección radiográfica lateral", "media-card--wide")}
          ${mediaFigure(ctx, business.media.xrays[2], "Estudio radiográfico de pelvis", "media-card--tall")}
        </div>
        <p class="media-disclaimer">Las imágenes muestran el servicio de radiografía y no incluyen interpretación clínica ni diagnóstico.</p>
        <div class="section-actions">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero información y disponibilidad para estudios radiográficos.",
            "Consultar radiografías",
            "primary",
            "whatsapp_xray"
          )}
        </div>
      </div>
    </div>
  </section>

  ${promoBanner(ctx)}

  <section class="section section--soft anchor-section" id="cirugia" aria-labelledby="cirugia-title">
    <div class="container content-split content-split--reverse">
      <div class="content-split__copy reveal">
        ${sectionHeading({
          eyebrow: "Cirugía",
          title: "Valoración y planeación prequirúrgica",
          text: "La evaluación y cotización prequirúrgica se ofrece sin costo con cita previa. El procedimiento se programa después de la valoración y de los estudios que se indiquen.",
          id: "cirugia-title"
        })}
        <div class="check-list">
          <span>${icon("check", "mini-icon")} Evaluación prequirúrgica sin costo</span>
          <span>${icon("check", "mini-icon")} Cita previa</span>
          <span>${icon("check", "mini-icon")} Cotización del procedimiento</span>
          <span>${icon("check", "mini-icon")} Indicaciones personalizadas</span>
        </div>
        <div class="button-row">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero agendar una evaluación y cotización prequirúrgica.",
            "Agendar evaluación",
            "primary",
            "whatsapp_surgery_section"
          )}
        </div>
      </div>
      <div class="content-split__media reveal reveal--delay">
        ${mediaFigure(ctx, business.media.surgery, "Equipo veterinario durante un procedimiento")}
      </div>
    </div>
  </section>

  <section class="section anchor-section" id="farmacia-veterinaria" aria-labelledby="farmacia-title">
    <div class="container">
      <div class="pharmacy-panel">
        <div class="pharmacy-panel__icon">${icon("pharmacy")}</div>
        <div class="pharmacy-panel__content">
          <p class="eyebrow">Farmacia veterinaria</p>
          <h2 id="farmacia-title">Solicita tu pedido y recibe una cotización por WhatsApp</h2>
          <p>${business.pharmacy.text}</p>
          <ul>
            ${business.pharmacy.notes.map((note) => `<li>${icon("check", "mini-icon")} ${note}</li>`).join("")}
          </ul>
        </div>
        <div class="pharmacy-panel__action">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar un producto de farmacia veterinaria. Producto o receta: ",
            "Solicitar cotización",
            "light",
            "whatsapp_pharmacy"
          )}
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="precios-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Precios de referencia",
        title: "Información para planear tu visita",
        text: "Confirma por WhatsApp el precio vigente, la disponibilidad y cualquier indicación previa.",
        id: "precios-title"
      })}
      <div class="price-grid">${business.prices.map(priceCard).join("")}</div>
      <p class="price-disclaimer">Los precios mostrados corresponden a la información actual del centro y pueden variar cuando se requieren estudios, medicamentos, materiales o procedimientos adicionales.</p>
    </div>
  </section>

  <section class="section" aria-labelledby="servicios-faq-title">
    <div class="container faq-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Antes de tu visita",
          title: "Preguntas sobre servicios y citas",
          text: "Para una respuesta específica sobre tu mascota, envía el motivo de atención por WhatsApp.",
          id: "servicios-faq-title"
        })}
        <div class="faq-contact-card">
          ${icon("whatsapp")}
          <h3>Confirma disponibilidad</h3>
          <p>Indica el servicio, el tipo de mascota y el motivo de atención.</p>
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero confirmar disponibilidad para el siguiente servicio: ",
            "Escribir por WhatsApp",
            "primary",
            "whatsapp_services_faq"
          )}
        </div>
      </div>
      ${faqList(serviceFaq)}
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Atención coordinada</p><h2>Cuéntanos qué servicio necesita tu mascota</h2><p>Te orientamos sobre disponibilidad, cita, preparación y datos necesarios para la visita.</p></div>
      <div class="button-row">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Necesito orientación para elegir o agendar un servicio.",
          "Solicitar orientación",
          "light",
          "whatsapp_services_final"
        )}
      </div>
    </div>
  </section>`;

  return {
    title: "Servicios veterinarios, especialidades, diagnóstico y farmacia",
    description:
      "Servicios de Centro Veterinario Zaragoza: consulta general, especialidades, ultrasonografía, laboratorio clínico, rayos X generales y dentales, cirugía, farmacia y apoyo para viajes en CDMX.",
    content,
    activePath: "servicios/",
    canonicalPath: "servicios/",
    breadcrumbs: [{ label: "Servicios", href: "servicios/" }],
    faqItems: serviceFaq
  };
}
