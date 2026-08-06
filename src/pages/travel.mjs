import { business } from "../data/business.mjs";
import {
  buttonLink,
  faqList,
  pageHero,
  responsiveImage,
  sectionHeading,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export function render(ctx) {
  const travelFaq = business.faq.filter((_, index) => [3, 4, 6, 8, 9].includes(index));
  const content = `
  ${pageHero({
    ctx,
    eyebrow: "Microchip y viajes",
    title: "Identificación segura para que tu mascota viaje a tu lado",
    text: "Aplicación de microchip sin previa cita, lectura compatible con ISO 11784/11785, carnet o pasaporte veterinario y orientación para documentación nacional e internacional.",
    image: business.media.passport,
    imageAlt: "Mascota con carnet y documentación veterinaria para viaje",
    actions: [
      whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Quiero información sobre microchip y documentación para viajar con mi mascota. Destino: ",
        "Consultar por WhatsApp",
        "primary",
        "whatsapp_travel_hero"
      ),
      buttonLink({
        href: business.contact.mapDirectionsUrl,
        label: "Cómo llegar",
        variant: "secondary",
        iconName: "pin",
        external: true,
        track: "map_travel_hero"
      })
    ].join(""),
    stats: [
      { value: "Sin cita", label: "Aplicación de microchip" },
      { value: "ISO 11784/11785", label: "Compatibilidad de identificación" },
      { value: "Nacional e internacional", label: "Orientación documental" }
    ],
    objectPosition: "center"
  })}

  <section class="section" aria-labelledby="servicios-viaje-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Servicios de identificación",
        title: "Microchip, lectura y documentación clínica",
        text: "Te ayudamos a identificar a tu mascota y a organizar la información veterinaria que puede solicitarse para un traslado.",
        id: "servicios-viaje-title"
      })}
      <div class="travel-service-grid">
        ${business.travel.services
          .map(
            (service, index) => `<article class="travel-service-card">
              <span class="travel-service-card__number">${String(index + 1).padStart(2, "0")}</span>
              <span class="travel-service-card__icon">${icon(service.icon)}</span>
              <h3>${service.title}</h3>
              <p>${service.text}</p>
            </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="microchip-iso-title">
    <div class="container content-split">
      <div class="content-split__copy reveal">
        ${sectionHeading({
          eyebrow: "Identificación electrónica",
          title: "Microchip y lector compatibles con ISO 11784/11785",
          text: "La referencia ISO corresponde al sistema de identificación por radiofrecuencia del microchip y a su lectura. El carnet o pasaporte veterinario es el documento donde se integran los datos clínicos e identificativos.",
          id: "microchip-iso-title"
        })}
        <div class="check-list check-list--single">
          <span>${icon("check", "mini-icon")} Aplicación de microchip sin previa cita</span>
          <span>${icon("check", "mini-icon")} Lectura y comprobación del número</span>
          <span>${icon("check", "mini-icon")} Registro del número en la documentación clínica</span>
          <span>${icon("check", "mini-icon")} Orientación para conservar los datos actualizados</span>
        </div>
        <div class="notice notice--soft">${icon("info")}<p>Aunque no se requiere cita para aplicar el microchip, recomendamos confirmar existencia y horario por WhatsApp antes de acudir.</p></div>
        <div class="button-row">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero confirmar disponibilidad para aplicar o leer un microchip a mi mascota.",
            "Confirmar microchip",
            "primary",
            "whatsapp_microchip"
          )}
        </div>
      </div>
      <div class="travel-illustration reveal reveal--delay">
        <img src="${ctx.asset("assets/images/travel-pet.svg")}" width="760" height="560" alt="Ilustración de mascota, microchip y pasaporte veterinario" loading="lazy" decoding="async">
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="documentacion-viaje-title">
    <div class="container content-split content-split--reverse">
      <div class="content-split__copy reveal">
        ${sectionHeading({
          eyebrow: "Carnet, pasaporte y cartas",
          title: "Organiza la documentación antes del traslado",
          text: "Podemos emitir o actualizar documentación clínica y orientarte sobre los datos que suelen solicitarse. Los requisitos finales los determina la autoridad, el destino y la empresa de transporte.",
          id: "documentacion-viaje-title"
        })}
        <ul class="feature-list">
          <li>${icon("passport")}<span><strong>Carnet o pasaporte veterinario</strong>Concentra identificación, vacunas y datos clínicos relevantes.</span></li>
          <li>${icon("document")}<span><strong>Cartas clínicas</strong>Documentos nacionales o internacionales según la información solicitada y la valoración veterinaria.</span></li>
          <li>${icon("travel")}<span><strong>Revisión del destino</strong>Comparte país, estado, fecha, aerolínea o medio de transporte para orientar la preparación.</span></li>
        </ul>
        <div class="button-row">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Viajaré con mi mascota. Destino: ____. Fecha: ____. Medio de transporte: ____. Necesito orientación sobre documentos.",
            "Revisar mi viaje",
            "primary",
            "whatsapp_travel_documents"
          )}
        </div>
      </div>
      <div class="content-split__media reveal reveal--delay">
        <figure class="media-card media-card--feature">
          ${responsiveImage({
            ctx,
            image: business.media.passport,
            sizes: "(max-width: 960px) calc(100vw - 40px), 540px"
          })}
          <figcaption>Carnet y documentación veterinaria vinculados con la identificación de la mascota.</figcaption>
        </figure>
      </div>
    </div>
  </section>

  <section class="section section--travel" aria-labelledby="pasos-viaje-title">
    <div class="container travel-planning">
      <div>
        ${sectionHeading({
          eyebrow: "Planeación",
          title: "Información que conviene enviar por WhatsApp",
          text: "Con estos datos podemos darte una orientación inicial más precisa antes de la visita.",
          id: "pasos-viaje-title"
        })}
      </div>
      <ol class="travel-steps travel-steps--light">
        <li><span>1</span><div><strong>Destino y fecha</strong><p>País, estado o ciudad y día estimado de salida.</p></div></li>
        <li><span>2</span><div><strong>Medio de transporte</strong><p>Aerolínea, autobús, automóvil u otra modalidad.</p></div></li>
        <li><span>3</span><div><strong>Datos de la mascota</strong><p>Especie, edad, vacunas, microchip y documentos disponibles.</p></div></li>
        <li><span>4</span><div><strong>Requisitos recibidos</strong><p>Captura o enlace de las condiciones informadas por autoridad o transportista.</p></div></li>
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="aviso-viaje-title">
    <div class="container">
      <div class="notice notice--important">
        <span>${icon("shield")}</span>
        <div>
          <p class="eyebrow">Aviso importante</p>
          <h2 id="aviso-viaje-title">Los requisitos cambian según el destino</h2>
          <p>${business.travel.disclaimer}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="faq-viajes-title">
    <div class="container faq-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Preguntas frecuentes",
          title: "Antes de colocar el microchip o preparar documentos",
          text: "Confirma los requisitos con anticipación, especialmente para viajes internacionales.",
          id: "faq-viajes-title"
        })}
        <div class="faq-contact-card">
          ${icon("whatsapp")}
          <h3>Comparte tu destino</h3>
          <p>Indica fecha, medio de transporte y documentos actuales.</p>
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero preparar un viaje con mi mascota. Destino: ____. Fecha: ____.",
            "Enviar datos del viaje",
            "primary",
            "whatsapp_travel_faq"
          )}
        </div>
      </div>
      ${faqList(travelFaq)}
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Microchip y documentación</p><h2>Prepara la identificación de tu mascota con anticipación</h2><p>Escríbenos para confirmar existencia, horario y la documentación que necesitas revisar.</p></div>
      <div class="button-row">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero preparar la identificación y documentación de viaje de mi mascota.",
          "Iniciar consulta",
          "light",
          "whatsapp_travel_final"
        )}
      </div>
    </div>
  </section>`;

  return {
    title: "Microchip, pasaporte veterinario y viajes con mascotas",
    description:
      "Aplicación de microchip sin cita, lectura compatible ISO 11784/11785, carnet o pasaporte veterinario y orientación para viajes nacionales e internacionales en Centro Veterinario Zaragoza.",
    content,
    activePath: "microchip-y-viajes/",
    canonicalPath: "microchip-y-viajes/",
    breadcrumbs: [{ label: "Microchip y viajes", href: "microchip-y-viajes/" }],
    faqItems: travelFaq
  };
}
