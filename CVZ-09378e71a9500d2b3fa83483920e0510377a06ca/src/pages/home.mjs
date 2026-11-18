import { business } from "../data/business.mjs";
import {
  buttonLink,
  faqList,
  featureCard,
  locationPanel,
  mediaFigure,
  promoBanner,
  responsiveImage,
  sectionHeading,
  serviceCard,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export function render(ctx) {
  const featuredServices = [
    business.services.medical.find((item) => item.id === "consulta-general"),
    business.services.medical.find((item) => item.id === "cardiologia"),
    business.services.medical.find((item) => item.id === "ultrasonografia"),
    business.services.medical.find((item) => item.id === "laboratorio-clinico"),
    business.services.medical.find((item) => item.id === "cirugia"),
    business.services.medical.find((item) => item.id === "microchip-viajes")
  ];
  const homeFaq = business.faq.filter((_, index) => [0, 2, 3, 5, 6, 8].includes(index));

  const content = `
  <section class="home-hero">
    <div class="home-hero__pattern" aria-hidden="true"></div>
    <div class="container home-hero__grid">
      <div class="home-hero__content reveal">
        <p class="eyebrow">Atención veterinaria en Venustiano Carranza</p>
        <h1>Salud, diagnóstico y cuidado integral para tu mascota</h1>
        <p class="home-hero__lead">Consulta, cardiología con cita, ultrasonografía, laboratorio, rayos X, cirugía, farmacia veterinaria, estética y apoyo documental para viajar.</p>
        <div class="button-row">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita.",
            "Agendar por WhatsApp",
            "primary",
            "whatsapp_home_hero"
          )}
          ${buttonLink({
            href: business.contact.mapDirectionsUrl,
            label: "Cómo llegar",
            variant: "secondary",
            iconName: "pin",
            external: true,
            track: "map_home_hero"
          })}
        </div>
        <div class="hero-proof" aria-label="Información destacada">
          <div><strong>Consulta $300</strong><span>Valoración médica general</span></div>
          <div><strong>Diagnóstico</strong><span>Ultrasonido, laboratorio y radiografías</span></div>
          <div><strong>Atención integral</strong><span>Clínica, farmacia, estética y viajes</span></div>
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
          <div class="floating-card floating-card--one">${icon("heart")}<span><strong>Trato cercano</strong>Cuidado con respeto y paciencia</span></div>
          <div class="floating-card floating-card--two">${icon("clock")}<span><strong>Lun.–sáb.</strong>10:00 a 18:00</span></div>
        </div>
      </div>
    </div>
    <div class="container home-hero__quickbar" aria-label="Servicios de acceso rápido">
      <a href="${ctx.path("servicios/#cardiologia")}">
        ${icon("cardiology")}<span><strong>Cardiología</strong>Con cita previa por WhatsApp</span>${icon("arrow", "quickbar__arrow")}
      </a>
      <a href="${ctx.path("microchip-y-viajes/")}">
        ${icon("chip")}<span><strong>Microchip</strong>Aplicación sin previa cita</span>${icon("arrow", "quickbar__arrow")}
      </a>
      <a href="${ctx.path("servicios/#farmacia-veterinaria")}">
        ${icon("pharmacy")}<span><strong>Farmacia veterinaria</strong>Pedido, receta y cotización</span>${icon("arrow", "quickbar__arrow")}
      </a>
    </div>
  </section>

  <section class="section section--services" aria-labelledby="servicios-destacados">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Servicios veterinarios",
        title: "Atención coordinada para cada etapa",
        text: "Integramos consulta, diagnóstico, procedimientos, farmacia y documentación de viaje. La disponibilidad de los servicios con cita se confirma por WhatsApp.",
        id: "servicios-destacados"
      })}
      <div class="service-grid">
        ${featuredServices
          .map((service) => {
            const link = service.id === "microchip-viajes" ? ctx.path("microchip-y-viajes/") : ctx.path(`servicios/#${service.id}`);
            return serviceCard(service, { ctx, link });
          })
          .join("")}
      </div>
      <div class="section-actions">
        ${buttonLink({
          href: ctx.path("servicios/"),
          label: "Ver todos los servicios",
          variant: "secondary",
          iconName: "arrow"
        })}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="diagnostico-real">
    <div class="container">
      <div class="split-heading">
        ${sectionHeading({
          eyebrow: "Diagnóstico",
          title: "Imagen y laboratorio dentro de tu plan de atención",
          text: "Los estudios se realizan como apoyo a la valoración clínica y se indican según las necesidades de cada paciente.",
          id: "diagnostico-real"
        })}
        <div class="split-heading__note">${icon("info")}<p><strong>Interpretación profesional</strong>Las imágenes del sitio son ilustrativas del servicio y no constituyen un diagnóstico.</p></div>
      </div>
      <div class="home-feature-grid">
        <article class="photo-feature photo-feature--portrait reveal">
          ${responsiveImage({
            ctx,
            image: business.media.ultrasoundConsult,
            sizes: "(max-width: 760px) calc(100vw - 28px), 48vw"
          })}
          <div><p class="eyebrow">Ultrasonografía</p><h3>Evaluación por imagen con cita</h3><p>Confirma indicaciones de preparación y disponibilidad antes del estudio.</p></div>
        </article>
        <article class="photo-feature photo-feature--portrait reveal reveal--delay">
          ${responsiveImage({
            ctx,
            image: business.media.laboratory,
            sizes: "(max-width: 760px) calc(100vw - 28px), 48vw"
          })}
          <div><p class="eyebrow">Laboratorio clínico</p><h3>Apoyo diagnóstico para decisiones médicas</h3><p>Estudios solicitados de acuerdo con la valoración del paciente.</p></div>
        </article>
      </div>
    </div>
  </section>

  ${promoBanner(ctx)}

  <section class="section section--travel" aria-labelledby="viajar-identificado">
    <div class="container travel-layout travel-layout--photo">
      <div class="travel-photo reveal">
        ${responsiveImage({
          ctx,
          image: business.media.passport,
          sizes: "(max-width: 960px) calc(100vw - 40px), 520px"
        })}
      </div>
      <div class="reveal reveal--delay">
        ${sectionHeading({
          eyebrow: "Microchip y documentación",
          title: "Identificación segura para que tu mascota viaje a tu lado",
          text: "Aplicación de microchip sin previa cita, lectura compatible con ISO 11784/11785, carnet o pasaporte veterinario y apoyo con cartas para viajes nacionales e internacionales.",
          id: "viajar-identificado"
        })}
        <ul class="travel-points">
          <li>${icon("chip")}<span><strong>Microchip y lectura</strong>Identificación individual y comprobación del número.</span></li>
          <li>${icon("passport")}<span><strong>Carnet o pasaporte</strong>Documentación clínica concentrada para el paciente.</span></li>
          <li>${icon("document")}<span><strong>Orientación documental</strong>Revisión de lo solicitado por destino o transportista.</span></li>
        </ul>
        <div class="button-row">
          ${buttonLink({
            href: ctx.path("microchip-y-viajes/"),
            label: "Ver información para viajes",
            variant: "light",
            iconName: "arrow"
          })}
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero información sobre microchip, carnet o documentación para viajar con mi mascota.",
            "Consultar por WhatsApp",
            "outline-light",
            "whatsapp_travel_home"
          )}
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="estetica-resultados">
    <div class="container">
      <div class="content-split content-split--reverse">
        <div class="content-split__copy reveal">
          ${sectionHeading({
            eyebrow: "Estética y spa animal",
            title: "Higiene, estilismo y cuidado del manto",
            text: "Baño, deslanado, corte de uñas, estilismo y colorimetría con valoración y cotización según el servicio.",
            id: "estetica-resultados"
          })}
          <div class="check-list">
            <span>${icon("check", "mini-icon")} Atención de jueves a martes</span>
            <span>${icon("check", "mini-icon")} Horario de 11:00 a 17:00</span>
            <span>${icon("check", "mini-icon")} Miércoles: descanso</span>
            <span>${icon("check", "mini-icon")} Cotización por WhatsApp</span>
          </div>
          <div class="button-row">
            ${buttonLink({ href: ctx.path("estetica/"), label: "Ver galería de estética", variant: "secondary", iconName: "arrow" })}
          </div>
        </div>
        <div class="content-split__media reveal reveal--delay">
          ${mediaFigure(ctx, business.media.grooming[2], "Resultado de un servicio de estilismo animal")}
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="equipo-cvz">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Nuestro equipo",
        title: "Atención profesional con trato cercano",
        text: "Conoce a las médicas veterinarias que forman parte de Centro Veterinario Zaragoza.",
        align: "center",
        id: "equipo-cvz"
      })}
      <div class="team-grid team-grid--photo-cards">
        ${business.owners
          .map(
            (owner) => `<article class="team-card team-card--photo">
              <span class="team-card__avatar team-card__avatar--photo">
                ${responsiveImage({ ctx, image: owner.photo.avatar, alt: "" })}
              </span>
              <span class="team-card__paw">${icon("paw")}</span>
              <div><h3>${owner.name}</h3><p>${owner.role}</p></div>
            </article>`
          )
          .join("")}
      </div>
      <div class="section-actions">
        ${buttonLink({ href: ctx.path("nosotros/"), label: "Conocer al equipo", variant: "secondary", iconName: "arrow" })}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="ubicacion-cvz">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Ubicación",
        title: "Encuéntranos en la colonia Ignacio Zaragoza",
        text: business.contact.fullAddress,
        id: "ubicacion-cvz"
      })}
      ${locationPanel(ctx)}
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="preguntas-frecuentes">
    <div class="container faq-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Preguntas frecuentes",
          title: "Información antes de acudir",
          text: "Consulta horarios, citas, microchip, farmacia y ubicación. Para confirmar disponibilidad, escríbenos por WhatsApp.",
          id: "preguntas-frecuentes"
        })}
        <div class="faq-contact-card">
          ${icon("whatsapp")}
          <h3>¿Tienes otra pregunta?</h3>
          <p>Envíanos un mensaje con el servicio que necesitas.</p>
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Tengo una pregunta sobre sus servicios.",
            "Escribir por WhatsApp",
            "primary",
            "whatsapp_faq_home"
          )}
        </div>
      </div>
      ${faqList(homeFaq)}
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Estamos para orientarte</p><h2>Agenda la atención que tu mascota necesita</h2><p>Describe brevemente el motivo de consulta y te ayudamos a confirmar el servicio y la disponibilidad.</p></div>
      <div class="button-row">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero agendar atención para mi mascota.",
          "Agendar por WhatsApp",
          "light",
          "whatsapp_final_home"
        )}
      </div>
    </div>
  </section>`;

  return {
    title: "Veterinaria, diagnóstico, estética y viajes en CDMX",
    description:
      "Centro Veterinario Zaragoza en C. 33 161, Venustiano Carranza. Consulta, cardiología, ultrasonido, laboratorio, rayos X, farmacia, estética, microchip y documentación para viajes.",
    content,
    activePath: "",
    canonicalPath: "",
    faqItems: homeFaq
  };
}
