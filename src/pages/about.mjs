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
    eyebrow: "Nosotras",
    title: "Un equipo comprometido con la salud de tu mascota",
    text: "Centro Veterinario Zaragoza reúne atención clínica, diagnóstico, cirugía, farmacia, grooming y apoyo para viajes con un trato claro y cercano.",
    image: business.media.team,
    imageAlt: "MVZ. Jimena Núñez Pacheco y MVZ. Paulina E. Ortiz Rivera en Centro Veterinario Zaragoza",
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
    title: "Nosotras | Equipo veterinario",
    description:
      "Conoce a la MVZ. Jimena Núñez Pacheco y a la MVZ. Paulina E. Ortiz Rivera, equipo de Centro Veterinario Zaragoza en Venustiano Carranza, CDMX.",
    content,
    activePath: "nosotros/",
    canonicalPath: "nosotros/",
    breadcrumbs: [{ label: "Nosotras", href: "nosotros/" }]
  };
}
