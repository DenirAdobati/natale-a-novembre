// Natale a Novembre — conto alla rovescia e form di iscrizione

// ---------- Conto alla rovescia ----------
// La data è assoluta (con fuso orario italiano), quindi il conteggio è
// lo stesso per tutti, ovunque si trovino. Si ricalcola ogni secondo
// dall'orologio, così non perde mai il passo.
const countdown = document.getElementById("countdown");

if (countdown) {
  const target = new Date(countdown.dataset.target).getTime();
  const end = new Date(countdown.dataset.end).getTime();
  const cells = {};
  countdown.querySelectorAll("[data-unit]").forEach((el) => {
    cells[el.dataset.unit] = el;
  });
  const pad = (n) => String(n).padStart(2, "0");

  function tick() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      // serata in corso, poi conclusa: dopo la fine chiudiamo anche le iscrizioni
      const over = now >= end;
      countdown.classList.add(over ? "is-over" : "is-live");
      document.getElementById("iscrizione")?.classList.toggle("is-closed", over);
      if (!over) setTimeout(tick, end - now);
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
}

// ---------- Form di iscrizione ----------

// URL dell'app web Google Apps Script che scrive le iscrizioni nel foglio Google
// (il codice dello script è in docs/google-apps-script.gs). Finché è vuoto
// il form mostra la conferma senza inviare nulla.
// Foglio: "Natale a Novembre – Iscrizioni" sul Google Drive di boss.beautri@gmail.com
const FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbzs9wLkdgjaTG-3bdFy1ZUar-1ucDX7Uf-Z_fzU6Jd_g3lZct5wtkYIdHgtr-Sz1S_q/exec";
const STORAGE_KEY = "nan-rsvp";

const form = document.getElementById("rsvp-form");
const status = form.querySelector(".form__status");
const done = document.getElementById("rsvp-done");

function setStatus(message, type) {
  status.textContent = message;
  status.className = "form__status" + (type ? " is-" + type : "");
}

function checkField(input) {
  const ok = input.type === "checkbox" ? input.checked : input.checkValidity();
  input.closest(".field, .check")?.classList.toggle("is-invalid", !ok);
  input.setAttribute("aria-invalid", String(!ok));
  return ok;
}

function validate() {
  let valid = true;
  form.querySelectorAll("input[required]").forEach((input) => {
    if (!checkField(input)) valid = false;
  });
  form.querySelector("[aria-invalid=true]")?.focus();
  return valid;
}

// controlla un campo appena lo si lascia (la casella appena la si tocca),
// ma solo dopo che è stato toccato
form.querySelectorAll("input[required]").forEach((input) => {
  if (input.type === "checkbox") {
    input.addEventListener("change", () => checkField(input));
    return;
  }
  input.addEventListener("blur", () => {
    if (input.value) checkField(input);
  });
});

function showDone() {
  form.hidden = true;
  done.hidden = false;
}

// chi ha già confermato da questo telefono rivede subito la conferma
try {
  if (localStorage.getItem(STORAGE_KEY)) showDone();
} catch (e) {}

document.getElementById("rsvp-again").addEventListener("click", () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  done.hidden = true;
  form.hidden = false;
  form.querySelector("button[type=submit]").disabled = false;
  setStatus("");
  form.querySelector("input").focus();
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validate()) {
    setStatus("Manca qualcosa: scrivi nome e cognome e spunta «Partecipo».", "error");
    return;
  }

  // campo esca compilato = invio automatico, lo ignoriamo
  if (form.elements.website.value) return;

  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  setStatus("Invio in corso…");

  try {
    if (FORM_ENDPOINT) {
      // Google Apps Script non permette di leggere la risposta da un altro sito
      // (mode "no-cors"): se la richiesta parte senza errori di rete la diamo per buona.
      await fetch(FORM_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(new FormData(form)),
      });
    }
    form.reset();
    setStatus("");
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch (e) {}
    showDone();
    done.focus();
  } catch (error) {
    setStatus("Qualcosa non è andato. Riprova tra un attimo.", "error");
    button.disabled = false;
  }
});
