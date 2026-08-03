import { business } from "../data/business.mjs";
import {
  breadcrumb,
  buttonLink,
  featureCard,
  pageHero,
  responsiveImage,
  sectionHeading,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export const page = {
  route: "nosotros/",
  output: "nosotros/index.html",
  title: "Conoce a Centro Veterinario Zaragoza",
  description:
    "Conoce a las MVZ. Paulina E. Ortiz Rivera y Jimena Núñez Pacheco, y el enfoque personalizado, profesional y empático de Centro Veterinario Zaragoza.",
  activePath: "nosotros/",
  breadcrumbs: [{ label: "Nosotros", href: "nosotros/" }]
};

export function render(ctx) {
  const actions = `${buttonLink({
    href: ctx.path("servicios/"),
    label: "Conocer servicios",
    variant: "primary",
    iconName: "arrow"
  })}${whatsappLink(
    ctx,
    "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita.",
    "Hablar con el equipo",
    "secondary",
    "whatsapp_about_hero"
  )}`;

  return `${breadcrumb(ctx, page.breadcrumbs)}
  ${pageHero({
    ctx,
    eyebrow: "Acerca de nosotros",
    title: "Compromiso, empatía y atención personalizada",
    text: "Tres años trabajando junto a ti para cuidar la salud, el bienestar y la calidad de vida de tu mascota.",
    image: "assets/images/team-care.svg",
    imageAlt: "Ilustración del equipo de Centro Veterinario Zaragoza con mascotas",
    actions,
    stats: [
      { value: "3 años", label: "Trabajando junto a ti" },
      { value: "2 MVZ", label: "Al frente del centro" },
      { value: "Integral", label: "Salud, cuidado y belleza" }
    ]
  })}

  <section class="section" aria-labelledby="story-title">
    <div class="container story-layout">
      <div class="story-layout__content">
        ${sectionHeading({
          eyebrow: "Nuestra forma de trabajar",
          title: "Cuidamos a tu mascota como parte importante de tu familia",
          text: "Centro Veterinario Zaragoza reúne servicios médicos, diagnósticos, estética y apoyo para viajes, siempre buscando ofrecer calidad y profesionalismo.",
          id: "story-title"
        })}
        <blockquote>“Previene, cuida y protege a quienes más amas.”</blockquote>
        <p>La atención se distingue por ser jovial, empática y personalizada, con un compromiso permanente de actualización.</p>
      </div>
      <div class="story-layout__visual">
        <img src="${ctx.asset("assets/images/clinic-community.svg")}" width="680" height="560" alt="Ilustración de una familia con sus mascotas frente al centro veterinario" loading="lazy">
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="values-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Lo que nos distingue",
        title: "Principios presentes en cada atención",
        text: "Una experiencia centrada en la mascota y en la confianza de su familia.",
        align: "center",
        id: "values-title"
      })}
      <div class="feature-grid">
        ${business.differentiators.map(featureCard).join("")}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="team-about-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Equipo profesional",
        title: "Conoce a quienes dirigen el centro",
        text: "Médicas Veterinarias Zootecnistas comprometidas con la atención cercana y profesional.",
        align: "center",
        id: "team-about-title"
      })}
      <div class="team-grid team-grid--large">
        ${business.owners
          .map((owner, index) => {
            const hasPhoto = Boolean(owner.photo);
            return `<article class="team-profile">
          <div class="team-profile__visual team-profile__visual--${index + 1}${hasPhoto ? " team-profile__visual--photo" : ""}">
            ${
              hasPhoto
                ? responsiveImage({
                    ctx,
                    image: owner.photo,
                    alt: "",
                    sizes: "(max-width: 480px) 115px, (max-width: 720px) 110px, 170px"
                  })
                : `<span>${owner.initials}</span>`
            }
            ${icon("paw", "team-profile__paw")}
          </div>
          <div><p class="eyebrow">Dirección médica</p><h3>${owner.name}</h3><p>${owner.role}</p><ul><li>${icon(
              "check"
            )} Atención personalizada</li><li>${icon("check")} Trato empático</li><li>${icon(
              "check"
            )} Actualización continua</li></ul></div>
        </article>`;
          })
          .join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="choice-title">
    <div class="container choice-panel">
      <div>
        <p class="eyebrow">Una opción integral</p>
        <h2 id="choice-title">Salud, belleza, cuidado y productos para consentir a quienes más amas</h2>
        <p>Encuentra una amplia variedad de servicios con el objetivo de brindar atención de calidad y profesionalismo.</p>
      </div>
      <div class="choice-panel__list">
        <span>${icon("stethoscope")}Servicios médicos</span>
        <span>${icon("ultrasound")}Diagnóstico</span>
        <span>${icon("sparkle")}Estética</span>
        <span>${icon("travel")}Apoyo para viajes</span>
      </div>
    </div>
  </section>

  <section class="final-cta">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Conoce nuestra atención</p><h2>Agenda una visita a Centro Veterinario Zaragoza</h2><p>Estamos en Ignacio Zaragoza, Venustiano Carranza, Ciudad de México.</p></div>
      ${whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Quiero agendar una visita para mi mascota.",
        "Agendar por WhatsApp",
        "light",
        "whatsapp_about_final"
      )}
    </div>
  </section>`;
}
