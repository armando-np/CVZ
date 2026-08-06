import { business } from "../data/business.mjs";
import { buttonLink, whatsappLink } from "../templates/components.mjs";

export function render(ctx) {
  const content = `
  <section class="not-found">
    <div class="container not-found__grid">
      <div>
        <p class="not-found__code">404</p>
        <h1>Esta página no está disponible</h1>
        <p>El enlace pudo cambiar o la dirección está incompleta. Regresa al inicio o escríbenos por WhatsApp para solicitar información.</p>
        <div class="button-row">
          ${buttonLink({ href: ctx.path(""), label: "Volver al inicio", variant: "primary", iconName: "arrow" })}
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Quiero solicitar información.",
            "Escribir por WhatsApp",
            "secondary",
            "whatsapp_404"
          )}
        </div>
      </div>
      <img src="${ctx.asset("assets/images/travel-pet.svg")}" width="760" height="560" alt="Ilustración de una mascota" decoding="async">
    </div>
  </section>`;

  return {
    title: `Página no encontrada | ${business.name}`,
    description: "La página solicitada no está disponible.",
    content,
    activePath: "",
    canonicalPath: "404.html",
    noindex: true,
    bodyClass: "page-not-found"
  };
}
