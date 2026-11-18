import { business } from "../data/business.mjs";
import {
  buttonLink,
  faqList,
  mediaFigure,
  pageHero,
  sectionHeading,
  serviceCard,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export function render(ctx) {
  const groomingFaq = [
    {
      question: "¿Cuál es el horario de estética?",
      answer: "La estética atiende de jueves a martes, de 11:00 a 17:00 horas. El miércoles es día de descanso."
    },
    {
      question: "¿Necesito solicitar una cotización?",
      answer: "Sí. El precio depende del tamaño, condición del manto y servicio solicitado. Envía una fotografía por WhatsApp para recibir orientación."
    },
    {
      question: "¿Realizan colorimetría?",
      answer: "Sí, el servicio está disponible con valoración y cotización previa. La viabilidad se confirma según el estado del manto y la solicitud."
    },
    {
      question: "¿Qué debo informar antes de la cita?",
      answer: "Comenta el tamaño aproximado, raza o tipo de manto, servicio requerido y cualquier condición de salud o comportamiento relevante."
    }
  ];

  const content = `
  ${pageHero({
    ctx,
    eyebrow: "Estética y spa animal",
    title: "Higiene, estilismo y cuidado del manto",
    text: "Baño, deslanado, corte de uñas, estilismo canino y colorimetría con valoración y cotización previa.",
    image: business.media.grooming[0],
    imageAlt: "Resultado de un servicio de estética animal",
    actions: [
      whatsappLink(
        ctx,
        "Hola, Centro Veterinario Zaragoza. Quiero solicitar una cotización de estética para mi mascota.",
        "Solicitar cotización",
        "primary",
        "whatsapp_grooming_hero"
      ),
      buttonLink({
        href: `tel:${business.contact.phoneE164}`,
        label: "Llamar",
        variant: "secondary",
        iconName: "phone",
        track: "phone_grooming_hero"
      })
    ].join(""),
    stats: [
      { value: "Jue.–mar.", label: "Días de atención" },
      { value: "11:00–17:00", label: "Horario de estética" },
      { value: "Miércoles", label: "Día de descanso" }
    ],
    objectPosition: "center 35%"
  })}

  <section class="section section--grooming" aria-labelledby="servicios-estetica-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Servicios de estética",
        title: "Cuidado de acuerdo con el manto y las necesidades de tu mascota",
        text: "La selección del servicio y la cotización se confirman después de conocer el tamaño, el tipo de pelo y el resultado solicitado.",
        id: "servicios-estetica-title"
      })}
      <div class="service-grid service-grid--grooming">
        ${business.services.grooming.map((service) => serviceCard(service)).join("")}
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="galeria-estetica-title">
    <div class="container">
      <div class="split-heading">
        ${sectionHeading({
          eyebrow: "Trabajos realizados",
          title: "Galería de spa y estética animal",
          text: "Ejemplos reales de estilismo, recorte y acabado. El resultado final depende del tipo y condición del manto de cada mascota.",
          id: "galeria-estetica-title"
        })}
        <div class="split-heading__note">${icon("sparkle")}<p><strong>Cotización individual</strong>Envía una fotografía reciente por WhatsApp para recibir orientación sobre el servicio.</p></div>
      </div>
      <div class="media-gallery media-gallery--grooming">
        ${mediaFigure(ctx, business.media.grooming[0], "Estilismo y colorimetría en poodle", "media-card--portrait")}
        ${mediaFigure(ctx, business.media.grooming[1], "Antes y después: cuidado de manto blanco", "media-card--square")}
        ${mediaFigure(ctx, business.media.grooming[2], "Antes y después: estilismo de manto gris", "media-card--square")}
        ${mediaFigure(ctx, business.media.grooming[3], "Antes y después: arreglo de Pomerania", "media-card--wide")}
      </div>
      <div class="section-actions">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero una cotización de estética. El servicio que busco es: ",
          "Cotizar estética",
          "primary",
          "whatsapp_grooming_gallery"
        )}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="proceso-estetica-title">
    <div class="container content-split">
      <div class="content-split__copy reveal">
        ${sectionHeading({
          eyebrow: "Antes de acudir",
          title: "Información útil para preparar el servicio",
          text: "Comparte los datos básicos de tu mascota para que el equipo pueda orientarte sobre disponibilidad, duración y cotización.",
          id: "proceso-estetica-title"
        })}
        <ol class="travel-steps travel-steps--compact">
          <li><span>1</span><div><strong>Envía una fotografía</strong><p>Procura que se vea el cuerpo y el estado actual del manto.</p></div></li>
          <li><span>2</span><div><strong>Describe el servicio</strong><p>Baño, deslanado, corte, estilismo, uñas o colorimetría.</p></div></li>
          <li><span>3</span><div><strong>Confirma la cita</strong><p>Te indicaremos disponibilidad, horario y recomendaciones.</p></div></li>
        </ol>
        <div class="notice notice--soft">${icon("info")}<p>Informa cualquier condición de salud, sensibilidad, tratamiento o comportamiento que deba considerarse durante el manejo.</p></div>
      </div>
      <div class="content-split__media reveal reveal--delay">
        ${mediaFigure(ctx, business.media.grooming[1], "Transformación después de un servicio de estética")}
      </div>
    </div>
  </section>

  <section class="section section--grooming-faq" aria-labelledby="horario-estetica-title">
    <div class="container">
      <div class="hours-card">
        <span class="hours-card__icon">${icon("clock")}</span>
        <div>
          <p class="eyebrow">Horario de estética</p>
          <h2 id="horario-estetica-title">${business.hours.grooming.summary}</h2>
          <p>El miércoles es día de descanso. Confirma disponibilidad antes de trasladarte.</p>
        </div>
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero confirmar disponibilidad de estética animal.",
          "Confirmar horario",
          "primary",
          "whatsapp_grooming_hours"
        )}
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="faq-estetica-title">
    <div class="container faq-layout">
      <div>
        ${sectionHeading({
          eyebrow: "Preguntas frecuentes",
          title: "Cotización, horarios y preparación",
          text: "Las condiciones del servicio se confirman según cada mascota.",
          id: "faq-estetica-title"
        })}
        <div class="faq-contact-card">
          ${icon("whatsapp")}
          <h3>Solicita una cotización</h3>
          <p>Incluye una fotografía y el servicio de tu interés.</p>
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero cotizar estética para mi mascota. Adjunto fotografía y solicito: ",
            "Enviar solicitud",
            "primary",
            "whatsapp_grooming_faq"
          )}
        </div>
      </div>
      ${faqList(groomingFaq)}
    </div>
  </section>

  <section class="final-cta final-cta--grooming">
    <div class="container final-cta__inner">
      <div><p class="eyebrow eyebrow--light">Estética animal</p><h2>Agenda el cuidado del manto de tu mascota</h2><p>Envíanos una fotografía, el servicio que buscas y el día que prefieres.</p></div>
      <div class="button-row">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero agendar un servicio de estética para mi mascota.",
          "Agendar estética",
          "light",
          "whatsapp_grooming_final"
        )}
      </div>
    </div>
  </section>`;

  return {
    title: "Estética y spa animal en Venustiano Carranza",
    description:
      "Estética animal en Centro Veterinario Zaragoza: baño, deslanado, corte de uñas, estilismo y colorimetría. Galería real, horario y cotización por WhatsApp.",
    content,
    activePath: "estetica/",
    canonicalPath: "estetica/",
    breadcrumbs: [{ label: "Estética", href: "estetica/" }],
    faqItems: groomingFaq
  };
}
