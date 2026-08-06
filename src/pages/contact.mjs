import { business, serviceOptions } from "../data/business.mjs";
import {
  buttonLink,
  locationPanel,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export function render(ctx) {
  const content = `
  <section class="contact-hero">
    <div class="container contact-hero__grid">
      <div class="contact-hero__content reveal">
        <p class="eyebrow">Contacto y citas</p>
        <h1>Cuéntanos qué atención necesita tu mascota</h1>
        <p>Completa el formulario para preparar un mensaje de WhatsApp. Tus datos no se envían ni se almacenan en este sitio.</p>
        <div class="contact-methods">
          <a href="https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar información y agendar una cita."
          )}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_contact_method">
            <span>${icon("whatsapp")}</span><div><strong>WhatsApp</strong><small>${business.contact.phoneDisplay}</small></div>${icon("arrow", "contact-method__arrow")}
          </a>
          <a href="tel:${business.contact.phoneE164}" data-track="phone_contact_method">
            <span>${icon("phone")}</span><div><strong>Llamada</strong><small>${business.contact.phoneDisplay}</small></div>${icon("arrow", "contact-method__arrow")}
          </a>
          <a href="${business.contact.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" data-track="map_contact_method">
            <span>${icon("pin")}</span><div><strong>Cómo llegar</strong><small>${business.contact.addressLine}</small></div>${icon("external", "contact-method__arrow")}
          </a>
        </div>
        <div class="info-stack">
          <div>${icon("clock")}<span><strong>Clínica</strong>${business.hours.clinic.summary}</span></div>
          <div>${icon("scissors")}<span><strong>Estética</strong>${business.hours.grooming.summary}; descanso miércoles</span></div>
        </div>
      </div>

      <div class="appointment-card reveal reveal--delay">
        <div class="appointment-card__heading">
          <span>${icon("calendar")}</span>
          <div><p class="eyebrow">Solicitud de atención</p><h2>Preparar mensaje de WhatsApp</h2><p>Completa los datos necesarios. Podrás revisar el texto antes de enviarlo.</p></div>
        </div>
        <form class="form-grid" data-appointment-form novalidate>
          <div class="field">
            <label for="person-name">Tu nombre <span aria-hidden="true">*</span></label>
            <input id="person-name" name="personName" type="text" autocomplete="name" required maxlength="80">
            <p class="field-error" data-error-for="personName" hidden>Escribe tu nombre.</p>
          </div>
          <div class="field">
            <label for="pet-name">Nombre de tu mascota</label>
            <input id="pet-name" name="petName" type="text" autocomplete="off" maxlength="80">
          </div>
          <div class="field field--full">
            <label for="service">Servicio de interés <span aria-hidden="true">*</span></label>
            <select id="service" name="service" required>
              <option value="">Selecciona una opción</option>
              ${serviceOptions.map((service) => `<option value="${service}">${service}</option>`).join("")}
            </select>
            <p class="field-error" data-error-for="service" hidden>Selecciona el servicio.</p>
          </div>
          <div class="field">
            <label for="preferred-date">Fecha preferida</label>
            <input id="preferred-date" name="preferredDate" type="date" data-min-today>
          </div>
          <div class="field">
            <label for="pet-type">Tipo de mascota</label>
            <select id="pet-type" name="petType">
              <option value="">Selecciona</option>
              <option>Perro</option>
              <option>Gato</option>
              <option>Otra</option>
            </select>
          </div>
          <div class="field field--full">
            <label for="message">Motivo o información relevante <span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" rows="5" required maxlength="800" placeholder="Describe brevemente el motivo de atención, síntomas, servicio o destino del viaje."></textarea>
            <p class="field-error" data-error-for="message" hidden>Describe brevemente lo que necesitas.</p>
          </div>
          <div class="field field--full checkbox-field">
            <input id="privacy" name="privacy" type="checkbox" required>
            <label for="privacy">He leído el <a href="${ctx.path("privacidad/")}" target="_blank">aviso de privacidad</a> y entiendo que el formulario abrirá WhatsApp. <span aria-hidden="true">*</span></label>
            <p class="field-error field-error--checkbox" data-error-for="privacy" hidden>Debes aceptar para continuar.</p>
          </div>
          <div class="field field--full">
            <button class="button button--primary button--full" type="submit"><span>Continuar en WhatsApp</span>${icon("whatsapp", "button__icon")}</button>
            <p class="form-status" data-form-status role="status" aria-live="polite"></p>
          </div>
        </form>
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="ubicacion-contacto-title">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Dirección oficial</p>
        <h2 id="ubicacion-contacto-title">Centro Veterinario Zaragoza en Google Maps</h2>
        <p class="section-heading__text">${business.contact.fullAddress}. Usa el botón de indicaciones para iniciar la ruta desde tu ubicación.</p>
      </div>
      ${locationPanel(ctx)}
    </div>
  </section>

  <section class="section" aria-labelledby="horarios-contacto-title">
    <div class="container hours-detail">
      <div class="hours-detail__intro">
        <p class="eyebrow">Horarios</p>
        <h2 id="horarios-contacto-title">Planea tu visita</h2>
        <p>Los servicios con cita y la existencia de farmacia o microchip deben confirmarse por WhatsApp.</p>
      </div>
      <article class="hours-detail__card">
        <span>${icon("stethoscope")}</span>
        <h3>Clínica veterinaria</h3>
        <p>${business.hours.clinic.summary}</p>
        <small>Domingo: sin horario de clínica publicado.</small>
      </article>
      <article class="hours-detail__card">
        <span>${icon("scissors")}</span>
        <h3>Estética animal</h3>
        <p>${business.hours.grooming.summary}</p>
        <small>Descanso: miércoles.</small>
      </article>
    </div>
  </section>

  <section class="contact-secondary-cta">
    <div class="container contact-secondary-cta__inner">
      <div class="contact-secondary-cta__copy"><p class="eyebrow eyebrow--light">Atención directa</p><h2>También puedes escribirnos sin llenar el formulario</h2><p>Incluye el servicio, el nombre de tu mascota y una descripción breve.</p></div>
      <div class="button-row">
        ${whatsappLink(
          ctx,
          "Hola, Centro Veterinario Zaragoza. Quiero solicitar información. Servicio: ____. Motivo: ____.",
          "Abrir WhatsApp",
          "light",
          "whatsapp_contact_final"
        )}
        ${buttonLink({
          href: business.contact.mapSearchUrl,
          label: "Ver ubicación",
          variant: "outline-light",
          iconName: "pin",
          external: true,
          track: "map_contact_final"
        })}
      </div>
    </div>
  </section>`;

  return {
    title: "Contacto, citas y ubicación",
    description:
      "Contacta a Centro Veterinario Zaragoza. Teléfono y WhatsApp 55 6815 7821. Dirección: C. 33 161, Ignacio Zaragoza, Venustiano Carranza, C.P. 15000, CDMX.",
    content,
    activePath: "contacto/",
    canonicalPath: "contacto/",
    breadcrumbs: [{ label: "Contacto", href: "contacto/" }],
    scripts: ["assets/js/appointment.js"]
  };
}
