import { business } from "../data/business.mjs";
import {
  breadcrumb,
  buttonLink,
  pageHero,
  sectionHeading,
  serviceCard,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

const faqItems = [
  {
    question: "¿Qué servicios de estética ofrecen?",
    answer: "Baño, deslanado, corte de uñas, estilismo canino y colorimetría."
  },
  business.faq[3],
  {
    question: "¿Cómo solicito una cotización?",
    answer:
      "Envía un mensaje por WhatsApp al 55 6815 7821 e indica el servicio que te interesa."
  }
];

export const page = {
  route: "estetica/",
  output: "estetica/index.html",
  title: "Estética canina en Venustiano Carranza",
  description:
    "Baño, deslanado, corte de uñas, estilismo canino y colorimetría en Centro Veterinario Zaragoza. Solicita cotización por WhatsApp.",
  activePath: "estetica/",
  breadcrumbs: [{ label: "Estética canina", href: "estetica/" }],
  faqItems
};

export function render(ctx) {
  const actions = `${whatsappLink(
    ctx,
    "Hola, Centro Veterinario Zaragoza. Quiero una cotización y cita para estética canina.",
    "Cotizar por WhatsApp",
    "primary",
    "whatsapp_grooming_hero"
  )}${buttonLink({
    href: ctx.path("contacto/"),
    label: "Ver ubicación",
    variant: "secondary",
    iconName: "pin"
  })}`;

  return `${breadcrumb(ctx, page.breadcrumbs)}
  ${pageHero({
    ctx,
    eyebrow: "Spa y estética canina",
    title: "Higiene, estilo y cuidado con un trato amable",
    text: "Servicios para consentir a tu mascota y mantener su presentación con atención personalizada.",
    image: "assets/images/grooming.svg",
    imageAlt: "Ilustración de estética canina en Centro Veterinario Zaragoza",
    actions,
    stats: [
      { value: "5", label: "Servicios de estética" },
      { value: "11:00–17:00", label: "Horario de atención" },
      { value: "Miércoles", label: "Día de descanso" }
    ]
  })}

  <section class="section" aria-labelledby="grooming-services-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Servicios disponibles",
        title: "Opciones para el cuidado estético de tu mascota",
        text: "Consulta disponibilidad y cotización antes de acudir.",
        align: "center",
        id: "grooming-services-title"
      })}
      <div class="service-grid service-grid--grooming">
        ${business.services.grooming.map((service) => serviceCard(service)).join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="grooming-process-title">
    <div class="container process-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Una cita sencilla",
          title: "Solicita el servicio en tres pasos",
          text: "El sitio prepara un mensaje para que puedas compartir la información básica por WhatsApp.",
          id: "grooming-process-title"
        })}
        <ol class="process-list">
          <li><span>1</span><div><h3>Elige el servicio</h3><p>Indica si buscas baño, deslanado, corte de uñas, estilismo o colorimetría.</p></div></li>
          <li><span>2</span><div><h3>Solicita cotización</h3><p>Envía tu mensaje y confirma disponibilidad directamente con el centro.</p></div></li>
          <li><span>3</span><div><h3>Confirma la cita</h3><p>Acude en el horario acordado para recibir el servicio.</p></div></li>
        </ol>
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero cotizar un servicio de estética canina. El servicio que me interesa es: ",
          "Iniciar cotización",
          "primary",
          "whatsapp_grooming_process"
        )}
      </div>
      <div class="process-visual">
        <img src="${ctx.asset("assets/images/grooming-care.svg")}" width="680" height="560" alt="Ilustración del cuidado de un perro en estética" loading="lazy">
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="grooming-hours-title">
    <div class="container hours-card">
      <div class="hours-card__icon">${icon("clock")}</div>
      <div>
        <p class="eyebrow">Horario de estética</p>
        <h2 id="grooming-hours-title">${business.hours.grooming.summary}</h2>
        <p>Descanso los miércoles. Confirma tu cita antes de acudir.</p>
      </div>
      ${buttonLink({
        href: ctx.path("contacto/"),
        label: "Solicitar cita",
        variant: "secondary",
        iconName: "calendar"
      })}
    </div>
  </section>

  <section class="section section--grooming-faq" aria-labelledby="grooming-faq-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Preguntas frecuentes",
        title: "Antes de solicitar estética",
        text: "Información básica sobre servicios, horarios y cotización.",
        align: "center",
        id: "grooming-faq-title"
      })}
      <div class="faq-list faq-list--narrow">
        ${faqItems
          .map(
            (item, index) => `<details class="faq-item"${index === 0 ? " open" : ""}><summary>${item.question}<span>${icon(
              "chevron",
              "faq-item__icon"
            )}</span></summary><div class="faq-item__answer"><p>${item.answer}</p></div></details>`
          )
          .join("")}
      </div>
    </div>
  </section>

  <section class="final-cta final-cta--grooming">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Cuidado y estilo</p><h2>Agenda la próxima visita de tu mascota</h2><p>Solicita cotización y confirma el horario por WhatsApp.</p></div>
      ${whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Quiero agendar un servicio de estética canina.",
        "Agendar estética",
        "light",
        "whatsapp_grooming_final"
      )}
    </div>
  </section>`;
}
