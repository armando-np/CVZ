(() => {
  "use strict";

  const form = document.querySelector("[data-appointment-form]");
  if (!form) return;

  const whatsappNumber = "525568157821";
  const status = form.querySelector("[data-form-status]");
  const dateInput = form.querySelector("[data-min-today]");

  if (dateInput) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
  }

  function showError(fieldName, visible) {
    const field = form.elements.namedItem(fieldName);
    const error = form.querySelector(`[data-error-for="${fieldName}"]`);
    if (field instanceof HTMLElement) field.setAttribute("aria-invalid", String(visible));
    if (error) error.hidden = !visible;
  }

  function validate() {
    const data = new FormData(form);
    const checks = {
      personName: String(data.get("personName") || "").trim().length > 0,
      service: String(data.get("service") || "").trim().length > 0,
      message: String(data.get("message") || "").trim().length > 0,
      privacy: data.get("privacy") === "on"
    };
    Object.entries(checks).forEach(([name, valid]) => showError(name, !valid));
    const firstInvalid = Object.keys(checks).find((name) => !checks[name]);
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus();
      return false;
    }
    return true;
  }

  form.addEventListener("input", (event) => {
    const name = event.target?.name;
    if (name) showError(name, false);
  });
  form.addEventListener("change", (event) => {
    const name = event.target?.name;
    if (name) showError(name, false);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) {
      if (status) status.textContent = "Revisa los campos marcados antes de continuar.";
      return;
    }

    const data = new FormData(form);
    const lines = [
      "Hola, Centro Veterinario Zaragoza. Quiero solicitar atención.",
      "",
      `Nombre: ${String(data.get("personName") || "").trim()}`,
      `Mascota: ${String(data.get("petName") || "No indicado").trim() || "No indicado"}`,
      `Tipo de mascota: ${String(data.get("petType") || "No indicado").trim() || "No indicado"}`,
      `Servicio: ${String(data.get("service") || "").trim()}`,
      `Fecha preferida: ${String(data.get("preferredDate") || "Por confirmar").trim() || "Por confirmar"}`,
      `Motivo o información: ${String(data.get("message") || "").trim()}`,
      "",
      "Entiendo que la fecha y el servicio quedan sujetos a confirmación por WhatsApp."
    ];
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

    window.cvzTrack?.("appointment_request", { channel: "whatsapp" });
    if (status) status.textContent = "Abriendo WhatsApp para que revises y envíes el mensaje…";

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup && status) {
      status.innerHTML = `Tu navegador bloqueó la nueva ventana. <a href="${url}" target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>.`;
    }
  });
})();
