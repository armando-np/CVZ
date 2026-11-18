import { business } from "../data/business.mjs";
import { buttonLink, whatsappLink } from "../templates/components.mjs";

export function render(ctx) {
  const content = `
  <section class="legal-hero">
    <div class="container">
      <p class="eyebrow">Información del sitio</p>
      <h1>Aviso de privacidad</h1>
      <p>Este aviso describe el funcionamiento técnico de la página de Centro Veterinario Zaragoza y los canales externos que utiliza.</p>
    </div>
  </section>

  <section class="section">
    <div class="container legal-layout">
      <nav class="legal-nav" aria-label="Contenido del aviso">
        <strong>Contenido</strong>
        <a href="#responsable">Responsable</a>
        <a href="#datos">Datos y formulario</a>
        <a href="#whatsapp">WhatsApp y llamadas</a>
        <a href="#analytics">Google Analytics</a>
        <a href="#maps">Google Maps</a>
        <a href="#imagenes">Imágenes clínicas</a>
        <a href="#derechos">Derechos y contacto</a>
      </nav>

      <article class="legal-content">
        <p class="legal-updated">Última actualización técnica: agosto de 2026.</p>

        <section id="responsable">
          <h2>1. Responsable y ubicación</h2>
          <p>La página corresponde a <strong>${business.name}</strong>, con domicilio de atención en ${business.contact.fullAddress}.</p>
          <p>Para consultas relacionadas con esta página puedes comunicarte al <a href="tel:${business.contact.phoneE164}">${business.contact.phoneDisplay}</a> o por WhatsApp.</p>
        </section>

        <section id="datos">
          <h2>2. Formulario de solicitud</h2>
          <p>El formulario de contacto solicita nombre, datos básicos de la mascota, servicio de interés, fecha preferida y una descripción del motivo de atención.</p>
          <p>La página no envía esos datos a una base de datos ni a un servidor propio. Al presionar el botón, el navegador prepara un texto y abre WhatsApp para que la persona revise y decida si envía el mensaje.</p>
          <p>No incluyas información innecesaria o especialmente sensible en el formulario. La atención médica y el tratamiento del expediente clínico se gestionan directamente con el centro, fuera de esta página estática.</p>
        </section>

        <section id="whatsapp">
          <h2>3. WhatsApp, teléfono e Instagram</h2>
          <p>Los botones de WhatsApp, llamada e Instagram abren servicios externos. Su uso queda sujeto a las condiciones y políticas de cada proveedor y a la configuración del dispositivo.</p>
          <p>La página mide únicamente el tipo de botón seleccionado cuando existe consentimiento de analítica; no envía a Google Analytics el nombre de la persona, el nombre de la mascota ni el contenido del mensaje.</p>
        </section>

        <section id="analytics">
          <h2>4. Google Analytics 4</h2>
          <p>La etiqueta de Google Analytics 4 se carga únicamente después de que la persona acepta la analítica en el banner de preferencias. La decisión se guarda en el almacenamiento local del navegador.</p>
          <p>Si se acepta, el sitio puede registrar páginas vistas y acciones generales de contacto, como clics en WhatsApp, teléfono, Instagram o mapa. La configuración evita incluir en los eventos los textos escritos en formularios.</p>
          <p>La preferencia puede cambiarse con el botón <strong>Preferencias de analítica</strong> que aparece en el pie de página.</p>
        </section>

        <section id="maps">
          <h2>5. Google Maps</h2>
          <p>La página de contacto incluye un mapa incrustado y enlaces de indicaciones para ${business.contact.fullAddress}. Al interactuar con el mapa, Google puede procesar información conforme a sus propias políticas.</p>
          <p>El mapa se carga desde Google y puede recibir información técnica básica, como dirección IP, navegador y dispositivo.</p>
        </section>

        <section id="imagenes">
          <h2>6. Fotografías e imágenes clínicas</h2>
          <p>Las fotografías del equipo, pacientes, procedimientos, estética y diagnóstico se utilizan para mostrar los servicios del centro. Las radiografías publicadas se prepararon para no mostrar nombres ni datos identificables de pacientes.</p>
          <p>Las imágenes del sitio no constituyen un diagnóstico, una consulta ni una recomendación médica para otros pacientes.</p>
        </section>

        <section id="derechos">
          <h2>7. Consultas, correcciones y retiro de contenido</h2>
          <p>Para solicitar información sobre el uso de datos en los canales del centro, corregir datos de contacto o reportar una imagen, comunícate al ${business.contact.phoneDisplay}.</p>
          <div class="button-row">
            ${whatsappLink(
              ctx,
              "Hola, Centro Veterinario Zaragoza. Tengo una consulta relacionada con privacidad o contenido del sitio.",
              "Contactar por WhatsApp",
              "primary",
              "whatsapp_privacy"
            )}
            ${buttonLink({
              href: `tel:${business.contact.phoneE164}`,
              label: "Llamar",
              variant: "secondary",
              iconName: "phone",
              track: "phone_privacy"
            })}
          </div>
        </section>

        <section>
          <h2>8. Alcance del aviso</h2>
          <p>Este texto es un aviso funcional relacionado con el comportamiento técnico actual de la página. No sustituye la revisión jurídica de las prácticas administrativas, clínicas o laborales del establecimiento.</p>
        </section>
      </article>
    </div>
  </section>`;

  return {
    title: "Aviso de privacidad",
    description:
      "Aviso de privacidad y funcionamiento técnico del sitio de Centro Veterinario Zaragoza: formulario, WhatsApp, Google Analytics, Google Maps e imágenes.",
    content,
    activePath: "",
    canonicalPath: "privacidad/",
    breadcrumbs: [{ label: "Aviso de privacidad", href: "privacidad/" }]
  };
}
