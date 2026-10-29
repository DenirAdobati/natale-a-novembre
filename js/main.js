// Natale a Novembre — gestione del form di iscrizione

// TODO: inserire l'URL del servizio che raccoglie le iscrizioni
// (es. Google Apps Script, Formspree, Netlify Forms...). Finché è vuoto
// il form valida i campi e mostra il messaggio di conferma senza inviare nulla.
const FORM_ENDPOINT = "";

const form = document.getElementById("rsvp-form");
const status = form.querySelector(".form__status");

function setStatus(message, type) {
  status.textContent = message;
  status.className = "form__status" + (type ? " is-" + type : "");
}

function validate() {
  let valid = true;
  form.querySelectorAll("input[required]").forEach((input) => {
    const ok = input.type === "checkbox" ? input.checked : input.checkValidity();
    input.closest(".field")?.classList.toggle("is-invalid", !ok);
    if (!ok) valid = false;
  });
  return valid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validate()) {
    setStatus("Controlla i campi obbligatori e accetta il trattamento dei dati.", "error");
    return;
  }

  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  setStatus("Invio in corso…");

  try {
    if (FORM_ENDPOINT) {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
    }
    form.reset();
    setStatus("Grazie! La tua presenza è confermata. Ti aspettiamo ✦", "success");
  } catch (error) {
    setStatus("Si è verificato un errore. Riprova tra qualche istante.", "error");
  } finally {
    button.disabled = false;
  }
});
