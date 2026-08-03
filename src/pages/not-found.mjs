import { business } from "../data/business.mjs";
import { buttonLink, whatsappLink } from "../templates/components.mjs";

export const page = {
  route: "404.html",
  output: "404.html",
  title: "Página no encontrada",
  description: "La página solicitada no existe en el sitio de Centro Veterinario Zaragoza.",
  activePath: "",
  noindex: true
};

export function render(ctx) {
  return `<section class="not-found">
    <div class="container not-found__grid">
      <div>
        <p class="not-found__code">404</p>
        <p class="eyebrow">Página no encontrada</p>
        <h1>Esta ruta no lleva a la veterinaria</h1>
        <p>La dirección puede estar incompleta o la página pudo cambiar. Regresa al inicio o comunícate con nosotros.</p>
        <div class="button-row">
          ${buttonLink({ href: ctx.path(""), label: "Volver al inicio", variant: "primary", iconName: "arrow" })}
          ${whatsappLink(
            ctx,
            "Hola, Centro Veterinario Zaragoza. Necesito ayuda para encontrar información en su sitio.",
            "Abrir WhatsApp",
            "secondary",
            "whatsapp_404"
          )}
        </div>
      </div>
      <img src="${ctx.asset("assets/images/404-pet.svg")}" width="680" height="560" alt="Ilustración de una mascota buscando la página correcta">
    </div>
  </section>`;
}
