import { business, serviceOptions } from "../data/business.mjs";
import {
  breadcrumb,
  buttonLink,
  locationPanel,
  sectionHeading,
  whatsappLink
} from "../templates/components.mjs";
import { icon } from "../templates/icons.mjs";

export const page = {
  route: "contacto/",
  output: "contacto/index.html",
  title: "Contacto y citas",
  description:
    "Solicita una cita por WhatsApp, llama al 55 6815 7821 o visita Centro Veterinario Zaragoza en Calle 33 #161, Ignacio Zaragoza, Venustiano Carranza, CDMX.",
  activePath: "contacto/",
  breadcrumbs: [{ label: "Contacto", href: "contacto/" }],
  scripts: ["assets/js/appointment.js"]
};

export function render(ctx) {
  return `${breadcrumb(ctx, page.breadcrumbs)}
  <section class="contact-hero">
    <div class="container contact-hero__grid">
      <div class="contact-hero__content">
        <p class="eyebrow">Contacto y citas</p>
        <h1>Cuéntanos qué necesita tu mascota</h1>
        <p>Completa el formulario y prepararemos un mensaje para enviarlo por WhatsApp. También puedes llamarnos o visitarnos.</p>
        <div class="contact-methods">
          <a href="https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar una cita."
          )}" target="_blank" rel="noopener noreferrer" data-track="whatsapp_contact_direct">${icon(
            "whatsapp"
          )}<span><strong>WhatsApp</strong>${business.contact.phoneDisplay}</span>${icon("arrow", "contact-method__arrow")}</a>
          <a href="tel:${business.contact.phoneE164}" data-track="phone_contact">${icon(
            "phone"
          )}<span><strong>Teléfono</strong>${business.contact.phoneDisplay}</span>${icon("arrow", "contact-method__arrow")}</a>
          <a href="${business.contact.mapDirectionsUrl}" target="_blank" rel="noopener noreferrer" data-track="map_contact">${icon(
            "pin"
          )}<span><strong>Dirección</strong>${business.contact.addressLine}, ${business.contact.neighborhood}</span>${icon(
            "external",
            "contact-method__arrow"
          )}</a>
        </div>
      </div>
      <div class="appointment-card">
        <div class="appointment-card__heading">
          <span>${icon("calendar")}</span>
          <div><p class="eyebrow">Solicitud de cita</p><h2>Prepara tu mensaje</h2><p>No se envían datos a un servidor; al finalizar se abrirá WhatsApp.</p></div>
        </div>
        <form id="appointment-form" class="appointment-form" data-whatsapp-number="${business.contact.whatsappNumber}" novalidate>
          <div class="form-grid">
            <label class="field"><span>Tu nombre *</span><input type="text" name="ownerName" autocomplete="name" required maxlength="80" placeholder="Nombre de la persona responsable" aria-describedby="ownerName-error"><small class="field-error" id="ownerName-error" data-error-for="ownerName"></small></label>
            <label class="field"><span>Nombre de tu mascota *</span><input type="text" name="petName" required maxlength="60" placeholder="Ej. Luna" aria-describedby="petName-error"><small class="field-error" id="petName-error" data-error-for="petName"></small></label>
            <label class="field"><span>Especie *</span><select name="species" required aria-describedby="species-error"><option value="">Selecciona una opción</option><option>Perro</option><option>Gato</option><option>Otra</option></select><small class="field-error" id="species-error" data-error-for="species"></small></label>
            <label class="field"><span>Servicio *</span><select name="service" required aria-describedby="service-error"><option value="">Selecciona un servicio</option>${serviceOptions
              .map((option) => `<option>${option}</option>`)
              .join("")}</select><small class="field-error" id="service-error" data-error-for="service"></small></label>
            <label class="field"><span>Fecha preferida *</span><input type="date" name="preferredDate" required aria-describedby="preferredDate-error"><small class="field-error" id="preferredDate-error" data-error-for="preferredDate"></small></label>
            <label class="field"><span>Horario preferido</span><select name="preferredTime"><option value="Flexible">Flexible</option><option>Mañana</option><option>Tarde</option></select></label>
            <label class="field field--full"><span>Notas adicionales</span><textarea name="notes" rows="4" maxlength="500" placeholder="Describe brevemente qué necesitas o cualquier dato relevante para la solicitud." aria-describedby="notes-count"></textarea><small id="notes-count"><span data-character-count>0</span>/500 caracteres</small></label>
          </div>
          <label class="checkbox-field"><input type="checkbox" name="privacy" required aria-describedby="privacy-error"><span>Acepto que el mensaje se prepare para enviarlo por WhatsApp y he leído el <a href="${ctx.path(
            "privacidad/"
          )}" target="_blank" rel="noopener">aviso de privacidad</a>. *</span></label>
          <small class="field-error field-error--checkbox" id="privacy-error" data-error-for="privacy"></small>
          <button class="button button--primary button--full" type="submit"><span>Continuar en WhatsApp</span>${icon(
            "whatsapp",
            "button__icon"
          )}</button>
          <p class="form-status" role="status" aria-live="polite" data-form-status></p>
        </form>
      </div>
    </div>
  </section>

  <section class="section section--soft" aria-labelledby="visit-title">
    <div class="container">
      ${sectionHeading({
        eyebrow: "Planea tu visita",
        title: "Ubicación, horarios y contacto directo",
        text: "Confirma disponibilidad antes de acudir, especialmente para estudios, cirugía, estética y trámites de viaje.",
        id: "visit-title"
      })}
      ${locationPanel(ctx)}
    </div>
  </section>

  <section class="section" aria-labelledby="hours-detail-title">
    <div class="container hours-detail">
      <div class="hours-detail__intro">
        ${sectionHeading({
          eyebrow: "Horarios de atención",
          title: "Dos áreas, horarios claros",
          text: "Revisa el horario correspondiente al servicio que buscas.",
          id: "hours-detail-title"
        })}
      </div>
      <article class="hours-detail__card">${icon("stethoscope")}<div><p class="eyebrow">Clínica</p><h3>Lunes a sábado</h3><strong>10:00–18:00</strong><p>Consulta médica y servicios veterinarios.</p></div></article>
      <article class="hours-detail__card">${icon("sparkle")}<div><p class="eyebrow">Estética</p><h3>Jueves a martes</h3><strong>11:00–17:00</strong><p>Descanso los miércoles.</p></div></article>
    </div>
  </section>

  <section class="contact-secondary-cta">
    <div class="container contact-secondary-cta__inner">
      <div>${icon("phone")}<span><strong>¿Prefieres llamar?</strong>Habla directamente al ${business.contact.phoneDisplay}</span></div>
      ${buttonLink({
        href: `tel:${business.contact.phoneE164}`,
        label: "Llamar ahora",
        variant: "light",
        iconName: "phone",
        track: "phone_contact_final"
      })}
    </div>
  </section>`;
}
