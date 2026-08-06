import { business } from "../data/business.mjs";
import {
  buttonLink,
  featureCard,
  mediaFigure,
  pageHero,
  responsiveImage,
  sectionHeading,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export function render(ctx) {
  const content = `
  ${pageHero({
    ctx,
    eyebrow: "Nosotros",
    title: "Un equipo comprometido con la salud de tu mascota",
    text: "Centro Veterinario Zaragoza reúne atención clínica, diagnóstico, cirugía, farmacia, estética y apoyo para viajes con un trato claro y cercano.",
    image: business.media.paulina,
    imageAlt: "MVZ. Paulina E. Ortiz Rivera con un paciente canino",
    actions: [
      whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita.",
        "Agendar una cita",
        "primary",
        "whatsapp_about_hero"
      ),
      buttonLink({ href: ctx.path("servicios/"), label: "Ver servicios", variant: "secondary", iconName: "arrow" })
    ].join(""),
    stats: [
      { value: "3 años", label: "Trabajando junto a ti" },
      { value: "Atención integral", label: "Clínica, diagnóstico y cuidado" },
      { value: "Venustiano Carranza", label: "Servicio veterinario local" }
    ],
    objectPosition: "center 36%"
  })}

  <section class="section" aria-labelledby="equipo-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Médicas veterinarias",
        title: "Conoce al equipo",
        text: "Atención profesional, comunicación directa con las familias y seguimiento de acuerdo con las necesidades de cada paciente.",
        align: "center",
        id: "equipo-title"
      })}
      <div class="team-grid team-grid--large">
        ${business.owners
          .map(
            (owner, index) => `<article class="team-profile">
              <div class="team-profile__visual team-profile__visual--photo${index ? " team-profile__visual--2" : ""}">
                ${responsiveImage({
                  ctx,
                  image: owner.photo,
                  alt: owner.photo.alt,
                  sizes: "(max-width: 480px) 150px, 170px"
                })}
                <span class="team-profile__paw">${icon("paw")}</span>
              </div>
              <div>
                <p class="eyebrow">Equipo médico</p>
                <h3>${owner.name}</h3>
                <p>${owner.role}</p>
                <ul>
                  <li>${icon("check")} Atención veterinaria con orientación clara</li>
                  <li>${icon("check")} Trato respetuoso para pacientes y tutores</li>
                  <li>${icon("check")} Trabajo coordinado con los servicios del centro</li>
                </ul>
              </div>
            </article>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="paulina-title">
    <div class="container content-split">
      <div class="content-split__media reveal">
        ${mediaFigure(ctx, business.media.paulina, "MVZ. Paulina E. Ortiz Rivera con un paciente")}
      </div>
      <div class="content-split__copy reveal reveal--delay">
        ${sectionHeading({
          eyebrow: "Atención cercana",
          title: "MVZ. Paulina E. Ortiz Rivera",
          text: "Parte del equipo médico de Centro Veterinario Zaragoza, con participación en la atención cotidiana de pacientes y en la orientación a sus familias.",
          id: "paulina-title"
        })}
        <div class="feature-list">
          <div>${icon("stethoscope")}<span><strong>Valoración veterinaria</strong>Atención clínica de acuerdo con el motivo de consulta.</span></div>
          <div>${icon("heart")}<span><strong>Trato empático</strong>Manejo cuidadoso y comunicación directa.</span></div>
          <div>${icon("document")}<span><strong>Orientación</strong>Indicaciones y seguimiento explicados de forma clara.</span></div>
        </div>
        <div class="button-row">
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar una cita veterinaria.",
            "Solicitar cita",
            "primary",
            "whatsapp_paulina_about"
          )}
        </div>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="forma-trabajo-title">
    <div class="container story-layout">
      <div class="story-layout__content reveal">
        ${sectionHeading({
          eyebrow: "Nuestra forma de trabajar",
          title: "Cuidado profesional desde la consulta hasta el seguimiento",
          text: "Buscamos que cada familia comprenda el motivo de la valoración, los estudios sugeridos y las siguientes acciones del plan de atención.",
          id: "forma-trabajo-title"
        })}
        <div class="check-list check-list--single">
          <span>${icon("check", "mini-icon")} Escucha del motivo de consulta</span>
          <span>${icon("check", "mini-icon")} Exploración y valoración veterinaria</span>
          <span>${icon("check", "mini-icon")} Explicación de estudios o procedimientos</span>
          <span>${icon("check", "mini-icon")} Indicaciones y seguimiento</span>
        </div>
      </div>
      <div class="story-layout__visual reveal reveal--delay">
        ${mediaFigure(ctx, business.media.paulinaProcedure, "Atención de un paciente felino durante un procedimiento veterinario")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="diferenciadores-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Lo que nos guía",
        title: "Principios de atención",
        text: "El sitio conserva los valores definidos para Centro Veterinario Zaragoza: cercanía, actualización y servicios integrales.",
        align: "center",
        id: "diferenciadores-title"
      })}
      <div class="feature-grid">
        ${business.differentiators.map((feature, index) => featureCard(feature, index)).join("")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="instalaciones-title">
    <div class="container choice-panel">
      <div>
        <p class="eyebrow">Un solo centro</p>
        <h2 id="instalaciones-title">Servicios clínicos y de cuidado en la misma ubicación</h2>
        <p>Consulta, cardiología, imagen, laboratorio, cirugía, farmacia, microchip, documentación para viajes y estética animal.</p>
      </div>
      <div class="choice-panel__list">
        <span>${icon("stethoscope")} Clínica veterinaria</span>
        <span>${icon("ultrasound")} Diagnóstico</span>
        <span>${icon("pharmacy")} Farmacia</span>
        <span>${icon("scissors")} Estética animal</span>
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Conoce nuestra atención</p><h2>Visítanos en C. 33 161</h2><p>Estamos en la colonia Ignacio Zaragoza, alcaldía Venustiano Carranza, Ciudad de México.</p></div>
      <div class="button-row">
        ${buttonLink({
          href: business.contact.mapDirectionsUrl,
          label: "Abrir indicaciones",
          variant: "light",
          iconName: "pin",
          external: true,
          track: "map_about_final"
        })}
      </div>
    </div>
  </section>`;

  return {
    title: "Nuestro equipo veterinario",
    description:
      "Conoce a la MVZ. Paulina E. Ortiz Rivera y a la MVZ. Jimena Núñez Pacheco, equipo de Centro Veterinario Zaragoza en Venustiano Carranza, CDMX.",
    content,
    activePath: "nosotros/",
    canonicalPath: "nosotros/",
    breadcrumbs: [{ label: "Nosotros", href: "nosotros/" }]
  };
}
