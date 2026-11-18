(() => {
  "use strict";

  const form = document.getElementById("appointment-form");
  if (!form) return;

  const dateInput = form.elements.preferredDate;
  const notesInput = form.elements.notes;
  const count = form.querySelector("[data-character-count]");
  const status = form.querySelector("[data-form-status]");

  function localIsoDate(date = new Date()) {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
  }

  if (dateInput) dateInput.min = localIsoDate();

  notesInput?.addEventListener("input", () => {
    if (count) count.textContent = String(notesInput.value.length);
  });

  function errorElement(name) {
    return form.querySelector(`[data-error-for="${name}"]`);
  }

  function clearErrors() {
    form.querySelectorAll(".field-error").forEach((element) => {
      element.textContent = "";
    });
    form.querySelectorAll("[aria-invalid='true']").forEach((element) => {
      element.removeAttribute("aria-invalid");
    });
    if (status) status.textContent = "";
  }

  function showError(field, message) {
    field.setAttribute("aria-invalid", "true");
    const error = errorElement(field.name);
    if (error) error.textContent = message;
  }

  function validate() {
    clearErrors();
    let valid = true;
    const requiredFields = ["ownerName", "petName", "species", "service", "preferredDate", "privacy"];
    const labels = {
      ownerName: "Escribe tu nombre.",
      petName: "Escribe el nombre de tu mascota.",
      species: "Selecciona la especie.",
      service: "Selecciona el servicio.",
      preferredDate: "Selecciona una fecha preferida.",
      privacy: "Debes aceptar el aviso para continuar."
    };

    for (const name of requiredFields) {
      const field = form.elements[name];
      const missing = field.type === "checkbox" ? !field.checked : !String(field.value || "").trim();
      if (missing) {
        showError(field, labels[name]);
        valid = false;
      }
    }

    if (dateInput?.value && dateInput.value < localIsoDate()) {
      showError(dateInput, "Selecciona una fecha de hoy en adelante.");
      valid = false;
    }

    if (!valid) {
      const firstInvalid = form.querySelector("[aria-invalid='true']");
      firstInvalid?.focus();
      if (status) status.textContent = "Revisa los campos marcados antes de continuar.";
    }
    return valid;
  }

  function displayDate(value) {
    if (!value) return "Por confirmar";
    const [year, month, day] = value.split("-").map(Number);
    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(new Date(year, month - 1, day));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;

    const data = new FormData(form);
    const lines = [
      "Hola, Centro Veterinario Zaragoza. Quiero solicitar una cita.",
      "",
      `Persona responsable: ${String(data.get("ownerName")).trim()}`,
      `Mascota: ${String(data.get("petName")).trim()}`,
      `Especie: ${String(data.get("species")).trim()}`,
      `Servicio: ${String(data.get("service")).trim()}`,
      `Fecha preferida: ${displayDate(String(data.get("preferredDate")))}`,
      `Horario preferido: ${String(data.get("preferredTime") || "Flexible")}`
    ];
    const notes = String(data.get("notes") || "").trim();
    if (notes) lines.push(`Notas: ${notes}`);
    lines.push("", "Entiendo que la cita queda sujeta a confirmación.");

    const number = form.dataset.whatsappNumber;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;

    window.trackEvent?.("generate_lead", {
      lead_source: "formulario_cita_whatsapp",
      service_requested: String(data.get("service")),
      species: String(data.get("species"))
    });

    if (status) status.textContent = "Abriendo WhatsApp para que revises y envíes tu solicitud.";
    window.open(url, "_blank", "noopener,noreferrer");
  });
})();
