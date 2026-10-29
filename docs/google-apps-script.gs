/**
 * Natale a Novembre — raccolta iscrizioni su Google Sheet
 *
 * Come si usa:
 * 1. Nel foglio Google: Estensioni → Apps Script, incolla questo codice e salva.
 * 2. Esegui il deployment → Nuovo deployment → tipo "App web":
 *    - Esegui come: Me
 *    - Chi può accedere: Chiunque
 * 3. Copia l'URL dell'app web e mettilo in FORM_ENDPOINT dentro js/main.js.
 *
 * Ogni iscrizione diventa una riga nel foglio "Iscrizioni".
 */

const SHEET_NAME = "Iscrizioni";
const HEADERS = ["Data e ora", "Nome", "Cognome", "Partecipa"];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // campo esca compilato = invio automatico (spam): lo ignoriamo
  if (p.website) return reply_({ ok: true });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    sheet.appendRow([new Date(), clean_(p.nome), clean_(p.cognome), p.partecipo ? "Sì" : ""]);
  } finally {
    lock.releaseLock();
  }
  return reply_({ ok: true });
}

// Aprendo l'URL nel browser si vede solo che lo script è attivo
function doGet() {
  return reply_({ ok: true, info: "Natale a Novembre: raccolta iscrizioni attiva" });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

// Testo pulito e corto; un testo che inizia con = + - @ non diventa una formula
function clean_(value) {
  const text = String(value || "").trim().slice(0, 100);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function reply_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
