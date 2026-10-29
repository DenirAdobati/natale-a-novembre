// Natale a Novembre — conto alla rovescia e form di iscrizione

// ---------- Conto alla rovescia ----------
// La data è assoluta (con fuso orario italiano), quindi il conteggio è
// lo stesso per tutti, ovunque si trovino. Si ricalcola ogni secondo
// dall'orologio, così non perde mai il passo.
const countdown = document.getElementById("countdown");

if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const cells = {};
  countdown.querySelectorAll("[data-unit]").forEach((el) => {
    cells[el.dataset.unit] = el;
  });
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const diff = target - Date.now();

    if (diff <= 0) {
      countdown.classList.add("is-live");
      return;
    }

    const s = Math.floor(diff / 1000);
    cells.giorni.textContent = Math.floor(s / 86400);
    cells.ore.textContent = pad(Math.floor((s % 86400) / 3600));
    cells.minuti.textContent = pad(Math.floor((s % 3600) / 60));
    cells.secondi.textContent = pad(s % 60);

    // riparte esattamente allo scoccare del secondo successivo
    setTimeout(tick, 1000 - (Date.now() % 1000));
  }

  tick();

  // Quando la barra si aggancia in alto le diamo un'ombra per staccarla dal contenuto
  const before = countdown.previousElementSibling;
  const updateStuck = () => {
    countdown.classList.toggle("is-stuck", before.getBoundingClientRect().bottom <= 0);
  };
  window.addEventListener("scroll", updateStuck, { passive: true });
  updateStuck();
}

// ---------- Form di iscrizione ----------

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
    input.closest(".field, .check")?.classList.toggle("is-invalid", !ok);
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
    setStatus("Che bello! Ci vediamo venerdì 27 novembre alle 21:00. Il tuo regalo ti aspetta ♡", "success");
  } catch (error) {
    setStatus("Si è verificato un errore. Riprova tra qualche istante.", "error");
  } finally {
    button.disabled = false;
  }
});
