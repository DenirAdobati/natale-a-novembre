# Natale a Novembre · Revisione della struttura (UX, conversione, mobile)

Ambito: struttura, gerarchia, CTA, form, accessibilità, dettagli tecnici. Il copy non viene toccato: dove un testo manca o è nel posto sbagliato lo segnalo e basta.
File analizzati: `index.html`, `css/style.css`, `js/main.js` (stato al 29/10/2026).

Ordine attuale: barra → conto alla rovescia (non fisso) → apertura → lettera → regalo → biglietto → form + P.S. → footer. **L'ordine va bene e va tenuto.** I problemi veri sono tre: la prima schermata non dice quando e dove, c'è una sola CTA ed è in fondo, e il form oggi "conferma" anche se non invia niente.

---

## PRIORITÀ ALTA

### A1. Il form mostra "Ci vediamo venerdì" ma non invia nulla
**Problema.** In `main.js` `FORM_ENDPOINT = ""`: il form valida, svuota i campi e mostra il messaggio di successo senza salvare niente. Se si pubblica così, le iscrizioni vanno perse e la cliente crede di essere confermata.
**Modifica.** Non pubblicare finché l'endpoint non è configurato. Intanto, con l'endpoint vuoto mostra un errore esplicito invece del successo:
```js
if (!FORM_ENDPOINT) throw new Error("Endpoint non configurato");
```
Se si usa Google Apps Script, `fetch` va fatto con `mode: "no-cors"` (la risposta è opaca, quindi `response.ok` non si può controllare) oppure tramite un servizio con CORS (Formspree, Netlify Forms).
**Motivo.** È l'unico punto in cui la pagina deve funzionare per forza.

### A2. Nella prima schermata mancano data, ora e luogo
**Problema.** Stima a 375×667 (Safari: circa 550px visibili): barra ~62px + conto alla rovescia ~71px + apertura ~420px. Si vedono il conto alla rovescia (numeri senza contesto), "Per te", il titolo e la frase introduttiva. **Data, ora e luogo compaiono solo nel biglietto, dopo 4-5 schermate.** Lo stesso succede a 390×844. Chi apre il link da WhatsApp di sera, con un minuto a disposizione, non capisce subito "quando" e "cosa devo fare".
**Modifica.** Aggiungi nell'apertura, sotto `.hero__lead`, una riga di dettagli e due azioni (vedi A3). Il testo esatto lo decide l'agente del copy, i dati sono questi:
```html
<p class="hero__when">
  <time datetime="2026-11-27T21:00+01:00">Venerdì 27 novembre · ore 21:00</time>
  <span>Beautrì · Cologno al Serio</span>
</p>
```
```css
.hero__when {
  display: flex; flex-direction: column; gap: 2px;
  font-size: 15px; font-weight: 600; color: var(--white);
}
.hero__when span { font-weight: 400; color: var(--pink-light); }
```
Riduci anche l'altezza dell'apertura, così la riga sta sopra la piega anche a 375×667: `.hero { padding: 24px 24px 48px; gap: 14px; }` e `.hero__for { font-size: 30px; }`.
**Motivo.** Cos'è, quando, dove e cosa fare sono le quattro risposte che servono nei primi 3 secondi. Il conto alla rovescia da solo non dice nemmeno a cosa si riferisce.

### A3. C'è una sola CTA ed è in fondo alla pagina
**Problema.** L'unico invito all'azione è il pulsante "Sì, ci sarò" dentro il form. Chi ha già deciso (succede spesso: l'invito arriva da una persona che conosce) deve scorrere lettera, regalo e biglietto. In più "leggila ↓" è un link in Caveat alto circa 29px: sotto la soglia di 44px.
**Modifica.** Aggiungi due CTA, senza urgenza:
1. **Apertura**: un pulsante principale per confermare e la lettera come link secondario.
```html
<div class="hero__actions">
  <a href="#iscrizione" class="btn btn--light">Conferma la tua presenza</a>
  <a href="#lettera" class="hand hero__more">oppure leggi prima la lettera ↓</a>
</div>
```
2. **Fine del biglietto**: subito dopo `.ticket__map`, dentro `.ticket`, oppure come ultimo elemento di `.ticket-wrap`.
```html
<a href="#iscrizione" class="btn ticket__cta">Conferma la tua presenza</a>
```
```css
/* .btn oggi vale solo per <button>: rendilo usabile anche sui link */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0 28px; text-decoration: none;
}
.btn--light { background: var(--yellow); color: var(--black); box-shadow: 0 10px 24px rgba(0,0,0,.25); }
.hero__actions { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 100%; max-width: 320px; }
.hero__actions .btn { width: 100%; }
.hero__more { display: inline-flex; align-items: center; min-height: 44px; padding: 0 12px; }
.ticket__cta { display: flex; margin: 0 24px 24px; }
```
Non serve un pulsante dopo la lettera: la lettera porta al regalo e il regalo porta al biglietto in meno di una schermata. Tre punti d'ingresso al form (apertura, biglietto, form) bastano. Di più sembrerebbe insistenza.
**Motivo.** Chi ha già deciso può confermare subito. Chi vuole leggere tutto trova il pulsante proprio quando ha in mano tutte le informazioni, cioè sul biglietto.

### A4. Dopo l'invio non c'è un vero stato di conferma
**Problema.** Dopo il successo il form si svuota e resta visibile. Il messaggio è una riga sotto il pulsante, che viene riattivato (`finally { button.disabled = false }`): così è facile inviare due volte. Se la persona riapre la pagina, non sa di aver già confermato.
**Modifica.**
- In caso di successo sostituisci il form con una scheda di conferma: messaggio, "Aggiungi al calendario" (A6) e un link per contattare lo studio (vedi Domande). Il P.S. resta sotto.
```html
<div class="rsvp__done" id="rsvp-done" hidden tabindex="-1">
  <!-- messaggio di conferma (copy) -->
  <a class="btn" href="assets/natale-a-novembre.ics" download>Aggiungi al calendario</a>
  <a class="ticket__map" href="GOOGLE_CAL_URL" target="_blank" rel="noopener">Google Calendar →</a>
</div>
```
```js
// nel ramo di successo
form.hidden = true;
const done = document.getElementById("rsvp-done");
done.hidden = false;
done.focus();
try { localStorage.setItem("nan-rsvp", "1"); } catch (e) {}
// riattiva il pulsante solo in caso di errore (sposta button.disabled = false nel catch)
```
- Al caricamento, se `localStorage` contiene `nan-rsvp`, mostra subito la scheda di conferma, con un link "Non sei tu? Compila di nuovo".
**Motivo.** Evita doppie iscrizioni, rassicura la persona e dà alla conferma un passo successivo utile (il calendario) invece di un vicolo cieco.

### A5. I campi del form a 15px fanno zoomare iOS
**Problema.** `.field input { font: 15px ... }`: su iPhone Safari zooma automaticamente su ogni campo sotto i 16px e la pagina resta zoomata dopo l'invio.
**Modifica.** `.field input { font: 16px var(--sans); }`
**Motivo.** Quasi tutto il traffico arriva da telefono. Lo zoom forzato è la prima causa di abbandono dei form su mobile.

### A6. Mancano "Aggiungi al calendario" e un indirizzo visibile
**Problema.** Il biglietto dice "Da noi, in studio · Cologno al Serio". L'indirizzo compare solo dentro il link di Maps. Manca il calendario, eppure è l'azione più utile per un evento fra quattro settimane.
**Modifica.**
- In "Dove" metti l'indirizzo come testo: `<dd><strong>Da noi, in studio</strong>Via Circonvallazione 8, Cologno al Serio</dd>` (è un dato, non copy).
- Usa un URL di Maps più robusto: `https://www.google.com/maps/search/?api=1&query=Beautr%C3%AC%2C%20Via%20Circonvallazione%208%2C%20Cologno%20al%20Serio%20BG`
- Crea `assets/natale-a-novembre.ics`:
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Beautri//Natale a Novembre//IT
BEGIN:VEVENT
UID:natale-a-novembre-2026@beautri.it
DTSTAMP:20261029T000000Z
DTSTART:20261127T200000Z
DTEND:20261127T230000Z
SUMMARY:Natale a Novembre · Beautrì
LOCATION:Beautrì, Via Circonvallazione 8, Cologno al Serio (BG)
DESCRIPTION:Serata su invito. Pandoro, panettone, un brindisi e il tuo regalo.
END:VEVENT
END:VCALENDAR
```
(21:00 ora italiana = 20:00 UTC; l'orario di fine è da confermare, vedi Domande.)
- Link Google Calendar:
`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Natale%20a%20Novembre%20%C2%B7%20Beautr%C3%AC&dates=20261127T200000Z/20261127T230000Z&location=Via%20Circonvallazione%208%2C%20Cologno%20al%20Serio%20BG`
- Metti i link nel biglietto (accanto o sotto "Apri in Maps") e nella scheda di conferma (A4). Su iPhone il file `.ics` apre direttamente Calendario.
**Motivo.** Il calendario è il miglior antidoto contro i "me ne sono dimenticata" a quattro settimane dall'evento.

### A7. Mancano i meta Open Graph: l'anteprima su WhatsApp sarà povera
**Problema.** Senza `og:image` WhatsApp mostra solo un link nudo, o il titolo con il logo piccolo. L'anteprima è la prima cosa che l'invitata vede, prima ancora di aprire la pagina.
**Modifica.** Nel `<head>`:
```html
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="Beautrì">
<meta property="og:title" content="Natale a Novembre · Sei invitata">
<meta property="og:description" content="Venerdì 27 novembre, ore 21:00, da Beautrì. Una serata su invito e un regalo con il tuo nome.">
<meta property="og:url" content="https://URL-DEFINITIVO/">
<meta property="og:image" content="https://URL-DEFINITIVO/assets/og-natale-a-novembre.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Natale a Novembre, invito Beautrì">
<meta name="twitter:card" content="summary_large_image">
```
Immagine: 1200×630 JPG, **sotto i 300 KB** (oltre quella soglia WhatsApp spesso non la mostra), URL **assoluto https**. Contenuto: fondo rosso #6e0d1b, "Natale a Novembre" in Poppins, il pacchetto giallo, la data. Testi chiave al centro, perché WhatsApp ritaglia l'immagine in quadrato in alcune viste. Titolo e descrizione li rifinisce l'agente del copy.
**Motivo.** L'anteprima del link è, di fatto, la busta dell'invito.

### A8. Firma della lettera: non rispetta il vincolo
**Problema.** Il vincolo dice "lettera firmata solo da Daniela". L'HTML invece apre con "siamo Daniela, Sabrina, Giada e Desirée" e firma "Daniela, Sabrina, Giada e Desirée · Il team Beautrì". Il P.S. firma "Daniela e il team".
**Modifica.** Lo segnalo all'agente del copy. Per la struttura basta che `.letter__sign` contenga una sola firma in `.hand` (nome di Daniela) e una riga di ruolo sotto. Il markup attuale va già bene.
**Motivo.** Vincolo del cliente. Una sola voce rende la lettera anche più personale.

---

## PRIORITÀ MEDIA

### M1. Validazione: messaggi per singolo campo e telefono senza controllo
**Problema.** C'è un solo messaggio generico. Il campo con l'errore si riconosce solo dal bordo rosso, cioè solo dal colore. Il telefono `type="tel"` senza `pattern` accetta qualsiasi testo, anche "a". Il focus non va sul primo campo sbagliato. Manca `aria-invalid`.
**Modifica.**
```html
<label class="field">
  <span>Telefono</span>
  <input type="tel" name="telefono" inputmode="tel" autocomplete="tel"
         pattern="^\+?[0-9\s]{8,15}$" required aria-describedby="err-telefono">
  <small class="field__error" id="err-telefono">Inserisci un numero valido, es. 333 123 4567</small>
</label>
```
```css
.field__error { display: none; font-size: 13px; font-weight: 500; color: #c41d31; }
.field.is-invalid .field__error { display: block; }
```
```js
// in validate()
input.setAttribute("aria-invalid", String(!ok));
// dopo il ciclo
form.querySelector("[aria-invalid=true]")?.focus();
```
Fai lo stesso per nome, email e privacy. Aggiungi `autocapitalize="words"` al nome e `inputmode="email"` all'email. Valida anche in uscita dal campo (`blur`), non solo all'invio.
**Motivo.** Errori chiari vicino al campo riducono gli abbandoni. Oggi chi usa uno screen reader non sa quale campo correggere.

### M2. La privacy non ha un link all'informativa
**Problema.** La checkbox chiede il consenso, ma non c'è un'informativa da leggere né il nome del titolare del trattamento. Per il GDPR il consenso deve essere informato.
**Modifica.** Nel testo della checkbox (il testo lo scrive il copy) aggiungi un link "informativa privacy" alla pagina privacy di beautri.it, oppure a un `<details>` sotto il form con titolare, finalità (gestione evento e promemoria), durata (cancellazione dopo l'evento). Nel footer, ragione sociale e P.IVA.
Rendi anche la riga della checkbox più facile da toccare:
```css
.check { min-height: 44px; padding: 8px 0; font-size: 13px; }
.check input { width: 22px; height: 22px; margin-top: 0; }
```
**Motivo.** Obbligo legale, e un po' di fiducia in più al momento di lasciare telefono ed email.

### M3. Gerarchia dei titoli incompleta
**Problema.** Struttura attuale: `h1` (apertura), `h2` (regalo), `h2` (form). La lettera (`article`) e il biglietto non hanno un titolo: "Biglietto d'invito" e "Natale a Novembre" sono `<p>`. Chi naviga per titoli salta proprio le due sezioni con il contenuto principale.
**Modifica.**
- Lettera: `<article class="letter" aria-labelledby="lettera-title">` con `<h2 id="lettera-title" class="sr-only">Una lettera per te</h2>`.
- Biglietto: `<p class="ticket__title">` diventa `<h2 class="ticket__title">` (lo stile resta, basta aggiungere `margin:0` e già c'è `h1,h2{margin:0}`).
- Le `section` vanno legate al loro titolo con `aria-labelledby`.
- Aggiungi l'utility:
```css
.sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
```
**Motivo.** Semantica corretta per screen reader e lettori di WhatsApp/Safari ("modalità lettura").

### M4. Conto alla rovescia: accessibilità e stato dopo l'evento
**Problema.**
- `role="timer"` senza nome accessibile: si sente "Mancano 29 giorni 03 ore…" senza sapere a cosa si riferisce.
- Sotto i 360px "Mancano" viene nascosto e restano solo i numeri.
- Dopo il 27 novembre il JS mostra "Ci siamo: è stasera!" per sempre, anche giorni dopo. Il form resta aperto anche a evento concluso.
**Modifica.**
```html
<div class="countdown" id="countdown" ... role="timer" aria-label="Conto alla rovescia per Natale a Novembre, venerdì 27 novembre ore 21:00">
```
```js
const end = target + 4 * 3600 * 1000; // fine serata stimata
if (diff <= 0) {
  countdown.classList.add(Date.now() < end ? "is-live" : "is-over");
  if (Date.now() >= end) document.getElementById("iscrizione")?.classList.add("is-closed");
  return;
}
```
Per `.is-over` serve un testo di chiusura (lo scrive il copy) e il form va nascosto. Con `prefers-reduced-motion` aggiorna i secondi ogni 60s o nascondi la cella dei secondi.
**Motivo.** Un evento finito che dice "è stasera!" sembra trascurato. Un timer senza nome confonde chi lo ascolta.

### M5. Testi troppo piccoli e un contrasto insufficiente
Contrasti verificati con i colori reali del CSS (WCAG 2.1):

| Elemento | Colori | Rapporto | Esito |
|---|---|---|---|
| `.rsvp__intro`, `.check` (grigio su crema) | #555 su #f8f6f2 | 6.9:1 | OK |
| `.letter__sign` (grigio su bianco) | #555 su #fff | 7.5:1 | OK |
| `.ticket__grid dt` | #6b6b6b su #fff | 5.3:1 | OK |
| `.hero__lead` (rosa su rosso) | #f3d6da su #6e0d1b | 8.9:1 | OK |
| `.hero__for` (rosa su rosso) | #ffd9de su #6e0d1b | 9.4:1 | OK |
| `.countdown__unit` | #ffd9de su #2a0a10 | 14.1:1 | OK |
| `.eyebrow` (giallo su rosso) | #f5c200 su #6e0d1b | 7.3:1 | OK |
| `.gift__hand` | #ff5a6a su #0a0a0a | 6.5:1 | OK |
| `.ps__sign` (oro su post-it) | #8a6a00 su #fff7cc | 4.7:1 | OK, al limite |
| **Errori (`--red`) su crema** | #e5243b su #f8f6f2 | **4.2:1** | **NO** (testo 12-14px) |
| **Bordo dei campi** | #d9d9d9 su #fff | **1.4:1** | **NO** (servono 3:1 per i componenti) |
| Riga tratteggiata del biglietto | #ecd5d8 su #fff | 1.4:1 | Decorativa, va bene |

**Modifica.**
```css
.field.is-invalid input { border-color: #c41d31; }
.check.is-invalid, .form__status.is-error { color: #c41d31; } /* ~5.6:1 su crema */
.field input { border-color: #8f8f8f; }                       /* ~3.3:1 su bianco */
.countdown__unit { font-size: 11px; }
.eyebrow { font-size: 13px; }
.ticket__label, .ticket__grid dt { font-size: 12px; }
.ticket__grid dd { font-size: 14px; }
.footer { font-size: 13px; }
```
**Motivo.** Contrasti a norma, e testi leggibili anche dalle clienti con presbiopia, che probabilmente sono buona parte del pubblico.

### M6. Mancano i focus visibili
**Problema.** `.btn`, `.ticket__map`, `.hero__more` non hanno uno stile `:focus-visible`, e il contorno di default si vede poco sul rosso. Il focus dei campi è un'ombra al 20% di opacità.
**Modifica.**
```css
a:focus-visible, button:focus-visible, input:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 3px;
}
.rsvp a:focus-visible, .rsvp button:focus-visible, .rsvp input:focus-visible,
.ticket a:focus-visible { outline-color: var(--red-deep); }
```
**Motivo.** Navigazione da tastiera e da switch, e un riscontro chiaro sul campo attivo.

### M7. Effetto hover "appiccicoso" sul pulsante da touch
**Problema.** Su mobile `.btn:hover { transform: translateY(-2px) }` resta attivo dopo il tocco.
**Modifica.** Racchiudi gli hover in `@media (hover: hover) { ... }` e aggiungi `.btn:active { transform: scale(.98); }`.
**Motivo.** Riscontro corretto sul touch.

### M8. Manca un contatto per chi non può venire o ha domande
**Problema.** Nessun telefono, link WhatsApp o email dello studio. Chi non può venire non ha un modo semplice per dirlo. Chi ha un dubbio (parcheggio, accompagnatore) deve cercare il numero altrove.
**Modifica.** Sotto il form, o nella scheda di conferma e nel footer:
```html
<p class="rsvp__alt">
  <a href="https://wa.me/39XXXXXXXXXX" class="ticket__map">Scrivici su WhatsApp</a>
</p>
```
Il testo di accompagnamento lo scrive il copy. Per il numero, vedi Domande.
**Motivo.** Un "no" detto è un dato utile quanto un "sì". Una domanda senza risposta, invece, rischia di diventare un'assenza.

---

## PRIORITÀ BASSA

### B1. Favicon e icona per la schermata Home
`<link rel="icon" href="assets/beautri-logo.png">` va bene (256×256). Aggiungi `<link rel="apple-touch-icon" href="assets/apple-touch-icon.png">`: 180×180, logo su fondo pieno, perché iOS rende nero lo sfondo trasparente.

### B2. `theme-color`
`#0a0a0a` coincide con la barra: va bene. Volendo, `<meta name="color-scheme" content="light">` evita che il browser in-app di WhatsApp/Android forzi la modalità scura sulle schede bianche.

### B3. Protezione antispam leggera
Aggiungi un campo esca nascosto (`<input type="text" name="website" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true">`) e scarta lato server gli invii che lo compilano. La pagina è `noindex`, ma il link può girare.

### B4. Fallback senza JavaScript
Il form non ha `action` né `method`: senza JS non succede niente. Se l'endpoint lo permette, imposta `action="ENDPOINT" method="post"`, così il JS lo migliora ma non è indispensabile.

### B5. Lunghezza della pagina
Stima su mobile: circa 6-7 schermate (lettera ~2, regalo ~1, biglietto ~1,3, form + P.S. ~2). È accettabile per una lettera. Con le CTA di A3 chi ha fretta non deve scorrerla tutta. Non serve accorciare la struttura.

### B6. Spaziature fra sezioni
Lettera (`padding-bottom: 72px`), regalo (`72/64`) e biglietto (`64`) sono coerenti. Sul rosso, fra lettera e regalo il passaggio al nero è netto e va bene. L'unico salto debole è l'eyebrow "La serata", che a 12px sopra una scheda bianca si perde: con M5 (13px) migliora.

### B7. Il P.S. dentro `.rsvp`
È nella posizione giusta: chiude dopo il form, come in ogni lettera. Due ritocchi:
- Dopo l'invio deve restare visibile (A4 nasconde solo il form, non il P.S.).
- `transform: rotate(1.5deg)` su testo Caveat 24px resta leggibile. Con `prefers-reduced-motion` non serve toglierlo, perché non è un'animazione.

### B8. Il regalo al centro: piccoli rinforzi strutturali
Il regalo è presente in apertura ("una da darti"), ha una sezione dedicata su fondo nero (il blocco visivo più forte della pagina), è citato nel biglietto, nel messaggio di conferma e nel P.S. **È già il filo conduttore.** Unico suggerimento: rendi il pacchetto SVG di `.gift__icon` un po' più grande sui telefoni larghi (`width: clamp(160px, 45vw, 200px)`) e, se si vuole, aggiungi una piccola animazione di "respiro" del fiocco, solo con `prefers-reduced-motion: no-preference`. Niente che riveli il contenuto.

---

## Riepilogo dell'ordine finale proposto

1. Barra (logo)
2. Conto alla rovescia (non fisso, con `aria-label`)
3. Apertura: "Per te" · titolo · frase · **data/ora/luogo** · **[Conferma la tua presenza]** · "leggi prima la lettera ↓"
4. Lettera (firma solo Daniela)
5. Regalo
6. Biglietto: quando · dove (indirizzo visibile) · cosa · per chi · Maps · **Calendario** · **[Conferma la tua presenza]**
7. Form (con errori per campo) → al successo **scheda di conferma** con calendario e contatto
8. P.S.
9. Footer (con contatto e link privacy)

---

## Domande per il cliente

1. **Accompagnatore.** L'invitata può portare qualcuno? Se sì, si aggiunge un campo "Vieni con qualcuno?" (Vengo da sola / Con una persona), e va chiarito se il regalo è solo per l'invitata. Se no, conviene scriverlo nel biglietto ("Per chi"), per evitare domande e sorprese.
2. **Email obbligatoria?** Oggi è obbligatoria. Se il promemoria parte su WhatsApp, l'email potrebbe essere facoltativa: un campo obbligatorio in meno vuol dire più conferme.
3. **Scadenza per confermare.** C'è una data reale entro cui serve la risposta (per i numeri, per preparare i regali)? Se sì, va scritta, perché è un'informazione e non pressione. Se no, niente scadenza.
4. **Orario di fine** della serata, per il file calendario (ora ho messo 21:00-24:00).
5. **Numero WhatsApp/telefono dello studio** da mostrare per domande e disdette.
6. **Logistica:** c'è parcheggio? Serve un'indicazione per l'ingresso serale (citofono, ingresso laterale)? Se sì, va nel biglietto sotto "Dove".
7. **Allergie o intolleranze** (pandoro e panettone contengono glutine, latte, uova): volete chiederlo nel form, con un campo facoltativo, o no?
8. **Servizio per le iscrizioni:** Google Sheet tramite Apps Script, Formspree o altro? Serve per configurare `FORM_ENDPOINT` (A1).
9. **URL definitivo** della pagina, necessario per `og:url` e `og:image` assoluti (A7).
10. **Informativa privacy:** c'è già una pagina su beautri.it da linkare, o se ne prepara una breve per l'evento?
11. **Firma:** la lettera oggi parla e firma a nome di tutte e quattro. Confermate che deve essere solo Daniela (come da vincolo)? È un intervento per l'agente del copy.
