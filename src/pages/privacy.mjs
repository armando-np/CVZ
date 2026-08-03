import { business } from "../data/business.mjs";
import { breadcrumb, sectionHeading } from "../templates/components.mjs";

export const page = {
  route: "privacidad/",
  output: "privacidad/index.html",
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad y uso de analítica del sitio web de Centro Veterinario Zaragoza.",
  activePath: "",
  breadcrumbs: [{ label: "Aviso de privacidad", href: "privacidad/" }]
};

export function render(ctx) {
  return `${breadcrumb(ctx, page.breadcrumbs)}
  <section class="legal-hero">
    <div class="container">
      <p class="eyebrow">Privacidad</p>
      <h1>Aviso de privacidad del sitio web</h1>
      <p>Información sobre el formulario de citas, WhatsApp y el uso opcional de analítica.</p>
    </div>
  </section>
  <section class="section legal-section">
    <div class="container legal-layout">
      <aside class="legal-nav" aria-label="Contenido del aviso">
        <strong>En esta página</strong>
        <a href="#responsable">Responsable</a>
        <a href="#formulario">Formulario de citas</a>
        <a href="#analytics">Analítica y cookies</a>
        <a href="#terceros">Servicios de terceros</a>
        <a href="#derechos">Contacto y derechos</a>
      </aside>
      <article class="legal-content">
        <p class="legal-updated">Última actualización: 3 de agosto de 2026</p>
        <section id="responsable">
          <h2>1. Responsable del sitio</h2>
          <p><strong>${business.name}</strong>, con domicilio en ${business.contact.fullAddress}, es responsable de la información publicada en este sitio.</p>
        </section>
        <section id="formulario">
          <h2>2. Formulario para solicitar citas</h2>
          <p>El formulario de la página de contacto funciona únicamente como una herramienta para preparar un mensaje. Los datos escritos no se almacenan en una base de datos ni se envían a un servidor de este sitio.</p>
          <p>Al presionar “Continuar en WhatsApp”, el navegador abre WhatsApp con el mensaje preparado. El envío final depende de la persona usuaria y queda sujeto a las condiciones y políticas de WhatsApp.</p>
          <p>Evita incluir información sensible que no sea necesaria para solicitar la cita. La confirmación de disponibilidad se realiza directamente por WhatsApp o por teléfono.</p>
        </section>
        <section id="analytics">
          <h2>3. Analítica y almacenamiento local</h2>
          <p>El sitio puede utilizar Google Analytics cuando el identificador correspondiente ha sido configurado por el propietario y la persona visitante acepta la analítica.</p>
          <p>La preferencia de aceptación o rechazo se guarda en el almacenamiento local del navegador para no solicitarla en cada visita. Si se rechaza, el sitio no carga la etiqueta de Google Analytics.</p>
          <p>Puedes cambiar tu decisión mediante el enlace “Preferencias de analítica” disponible al final de cada página.</p>
        </section>
        <section id="terceros">
          <h2>4. Enlaces y servicios de terceros</h2>
          <p>Este sitio contiene enlaces a WhatsApp, Instagram y Google Maps. Al abrirlos, se aplican las políticas y condiciones de las plataformas correspondientes.</p>
          <p>El mapa incrustado puede realizar solicitudes a Google cuando se carga la sección de ubicación.</p>
        </section>
        <section id="derechos">
          <h2>5. Contacto y solicitudes relacionadas con privacidad</h2>
          <p>Para realizar una consulta relacionada con este aviso, comunícate al teléfono o WhatsApp <a href="tel:${business.contact.phoneE164}">${business.contact.phoneDisplay}</a>.</p>
          <p>Este aviso puede actualizarse para reflejar cambios en el funcionamiento del sitio o en los servicios utilizados.</p>
        </section>
      </article>
    </div>
  </section>`;
}
