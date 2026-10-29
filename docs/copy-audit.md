# Copy audit: Natale a Novembre (Beautrì)

Revisione indipendente di `index.html`, `js/main.js`, `assets/natale-a-novembre.ics`.
Date e orari verificati: il 27/11/2026 è venerdì; 21:00 ora italiana = 20:00Z (CET) in .ics, Google e Outlook; fine 00:00 coerente tra countdown e calendari. Nessuna incongruenza di data/ora.

Le due modifiche già richieste dal cliente («con il mio team» e la nuova frase sul regalo nella lettera) sono date per acquisite: qui segnalo solo quello che ne consegue.

---

## Gravità ALTA

### 1. P.S.: doppione della nuova frase della lettera
- **Dove:** P.S. in fondo alla sezione iscrizione
- **Attuale:** «Il regalo che riceverai non lo troverai da nessuna parte. Non si può comprare e non si può replicare. L'abbiamo creato in studio solo ed esclusivamente per questa occasione. Per dirti grazie.»
- **Problema:** quando nella lettera entrerà la frase «creato solo per questa occasione, di produzione dello studio, mai in vendita, mai più prodotto in questa forma», il P.S. ripeterà gli stessi quattro concetti quasi parola per parola (creato in studio = di produzione dello studio; non si può comprare = mai in vendita; non si può replicare = mai più prodotto; solo per questa occasione). Altri difetti: «solo ed esclusivamente» è un pleonasmo; «Per dirti grazie» è il terzo «grazie» della pagina.
- **Correzione:** il P.S. non deve più spiegare il regalo, ma chiudere con una battuta breve e personale. Per esempio:
  «P.S. Non provare a indovinare cos'è: non ci arriveresti. Lo scopri il 27, insieme a noi.»
  In alternativa si elimina il P.S. Se il cliente vuole tenere il testo attuale, la frase nuova va tolta dalla lettera: le due versioni non devono convivere.

### 2. Lettera: il regalo compare tre volte in pochi paragrafi
- **Dove:** Lettera, paragrafi 6–7 (con l'aggiunta del cliente)
- **Attuale:** «…ho un **regalo** per te.» / «Per farci gli auguri, per ringraziarti e per darti il tuo regalo.»
- **Problema:** il regalo è già nominato in due paragrafi di fila. Con la frase nuova si arriva a tre, e la lettera prende il tono di una scheda prodotto. Anche «ringraziarti» ripete «dirti grazie» della riga sopra.
- **Correzione:** mettere la frase nuova subito dopo «ho un regalo per te.» e alleggerire il paragrafo seguente:
  «Allora mi sono chiesta: quale occasione migliore di una festa? Per farci gli auguri e per dartelo di persona, con pandoro, panettone e un brindisi. Senza aspettare dicembre.»

### 3. Lettera: un «tu» generico che si confonde con il lettore
- **Dove:** Lettera, paragrafo 3
- **Attuale:** «Di quelli che ti fanno fermare e guardare indietro, per capire quanta strada hai fatto.»
- **Problema:** il «tu» impersonale («hai fatto») arriva subito prima di «E in questa strada c'eri anche tu», dove «tu» è il lettore. Così sembra che sia il lettore ad aver fatto strada. In più la voce di Daniela dovrebbe restare in prima persona.
- **Correzione:** «Di quelli che ti fanno fermare a guardare indietro, per capire quanta strada ho fatto.» (oppure «…quanta strada abbiamo fatto», se si intende lo studio).

---

## Gravità MEDIA

### 4. «ti aspetta / ti aspetto» ripetuto troppe volte
- **Dove:** og:description, letter («Ti aspetto in studio»), sezione regalo, biglietto, iscrizione, conferma
- **Attuale:** «un regalo che ti aspetta» (og) · «Ti aspetto in studio» · «C'è un regalo che ti aspetta.» · «Cosa ti aspetta» · «Ti aspetto!» · «Il tuo regalo ti aspetta ♡»
- **Problema:** sei occorrenze dello stesso verbo; tre sono frasi identiche sul regalo. Da telefono si leggono una dopo l'altra.
- **Correzione:**
  - Conferma: «Il tuo regalo ti aspetta ♡» → «Ho già messo da parte il tuo regalo ♡»
  - og:description: «Una serata su invito e un regalo che ti aspetta.» → «Una serata su invito, un brindisi e un regalo pensato per te.»
  - Biglietto: «Cosa ti aspetta» → «Cosa c'è»
  - Restano «C'è un regalo che ti aspetta.» (sezione regalo), «Ti aspetto in studio» (lettera) e «Ti aspetto!» (iscrizione).

### 5. Countdown: «1 giorni»
- **Dove:** Conto alla rovescia (HTML riga 46, JS `tick()`)
- **Attuale:** etichetta fissa «giorni» (anche «ore»)
- **Problema:** il 26 novembre il countdown mostrerà «1 giorni», un errore grammaticale visibile proprio nel giorno in cui arriva il promemoria del calendario.
- **Correzione:** al singolare usare «giorno» e «ora» (lo deve gestire chi sviluppa in `main.js`). Nel frattempo, in alternativa, abbreviare in «gg» / «h».

### 6. Biglietto: «Da noi, in studio Beautrì»
- **Dove:** Biglietto d'invito, «Dove»
- **Attuale:** «Da noi, in studio Beautrì»
- **Problema:** «in studio Beautrì» non è idiomatico: manca l'articolo («nello studio») o va costruito con «da». «Da noi» va bene come «noi» dello studio, ma il risultato è ridondante.
- **Correzione:** «In studio, da Beautrì» (riga sotto invariata: «Via Circonvallazione 8, Cologno al Serio (BG)»).

### 7. Messaggio di errore di rete
- **Dove:** `main.js`, errore di invio
- **Attuale:** «Qualcosa non è andato. Riprova tra un attimo.»
- **Problema:** «non è andato» è monco (ci si aspetta «a buon fine»). Inoltre non offre un'alternativa se l'errore si ripete.
- **Correzione:** «Qualcosa è andato storto. Riprova tra un attimo, o scrivimi su WhatsApp.»

### 8. «Non sei tu? Compila di nuovo»
- **Dove:** Conferma dopo l'invio
- **Attuale:** «Non sei tu? Compila di nuovo»
- **Problema:** il pulsante serve a far confermare un'altra persona invitata dallo stesso telefono (per esempio una coppia), ma «Non sei tu?» sembra un controllo di accesso e confonde.
- **Correzione:** «Devi confermare anche per un'altra persona invitata? Compila di nuovo»

### 9. Doppia conferma: casella «Partecipo» più pulsante «Conferma»
- **Dove:** Form
- **Attuale:** casella obbligatoria «**Partecipo** Venerdì 27 novembre, ore 21:00» + pulsante «Conferma»
- **Problema:** chi compila il form ha già deciso di partecipare. La casella obbligatoria è un passaggio in più e porta all'errore «Spunta «Partecipo» per confermare.». Sono due azioni per dire la stessa cosa.
- **Correzione (testo):** se la casella resta, il pulsante deve dire cosa succede: «Conferma» → «Sì, ci sarò». Meglio ancora togliere la casella (decisione di chi sviluppa) e lasciare la data come riepilogo sopra il pulsante: «Venerdì 27 novembre, ore 21:00».

### 10. Lettera: «anno» ripetuto e «anche tu» doppio
- **Dove:** Lettera, paragrafi 3–5
- **Attuale:** «Quest'anno è stato un anno di cambiamenti. Un anno importante…» / «E in questa strada c'eri anche tu.» / «…Anche tu hai fatto parte di quest'anno.»
- **Problema:** «anno» compare tre volte in due frasi (quattro con «quest'anno» al paragrafo 5). «Anche tu» ripete «c'eri anche tu» di due righe prima. L'elenco «Ogni chiacchierata…, ogni…, ogni…» resta senza verbo prima del punto.
- **Correzione:**
  - «Quest'anno è stato un anno di cambiamenti. Importante, per me e per lo studio.»
  - «Ogni chiacchierata in studio, ogni «come stai?» che diventava una storia, ogni volta che mi hai dato fiducia: così hai fatto parte di quest'anno. Del nostro cambiamento.»

### 11. «E adesso… il tuo regalo ↓» promette uno svelamento che non c'è
- **Dove:** Nota scritta a mano accanto alla foto di Daniela
- **Attuale:** «E adesso… il tuo regalo ↓»
- **Problema:** fa pensare che sotto si veda il regalo, e la sezione dopo dice «Non ti dico cos'è». La piccola delusione è voluta solo in parte.
- **Correzione:** «E il regalo?… ↓» oppure «Ah, il regalo… ↓»

### 12. Sezione regalo: «quella sera» è vago e «di persona» è un doppione
- **Dove:** Sezione regalo, card
- **Attuale:** «Non ti dico cos'è. Te lo darò quella sera, di persona.»
- **Problema:** «quella sera» non dice quale sera (la data arriva solo più sotto). «di persona» c'è già nella lettera.
- **Correzione:** «Non ti dico cos'è. Te lo do io, la sera del 27.»

---

## Gravità BASSA

### 13. «Grazie a chi c'era ♡» ripetuto nello stesso schermo
- **Dove:** Countdown (stato concluso) + `rsvp__closed`
- **Attuale:** «Grazie a chi c'era ♡» / «Le iscrizioni sono chiuse. Grazie a chi c'era ♡»
- **Problema:** a evento finito le due frasi compaiono insieme. «Iscrizioni» è burocratico e la pagina parla sempre di «conferma».
- **Correzione:** countdown invariato; `rsvp__closed` → «Le conferme sono chiuse. È stata una bella serata.»

### 14. Intro del form
- **Dove:** Iscrizione
- **Attuale:** «Dimmi solo che ci sei: ci vuole un minuto.»
- **Problema:** «ci sei / ci vuole» suona male; l'evento è futuro.
- **Correzione:** «Dimmi solo che ci sarai: bastano pochi secondi.»

### 15. Errore generico di validazione
- **Dove:** `main.js`, validazione
- **Attuale:** «Manca qualcosa: scrivi nome e cognome e spunta «Partecipo».»
- **Problema:** il doppio «e» appesantisce. Il messaggio elenca tutti i campi anche se ne manca uno solo. Le virgolette annidate «…«Partecipo».» chiudono in modo confuso.
- **Correzione:** «Manca qualcosa: controlla i campi segnati.» (gli errori dei singoli campi sono già chiari: «Scrivi il tuo nome.» ecc.)

### 16. Meta description: troppo lunga e troppo generica
- **Dove:** `<meta name="description">`
- **Attuale:** «Daniela ti invita a Natale a Novembre: una serata privata per farci gli auguri, dirti grazie e darti un regalo speciale. Venerdì 27 novembre, ore 21:00, da Beautrì.»
- **Problema:** circa 170 caratteri, quindi viene tagliata nelle anteprime. «regalo speciale» è una formula generica.
- **Correzione:** «Daniela ti invita a Natale a Novembre: auguri, un brindisi e un regalo per te. Venerdì 27 novembre, ore 21:00, da Beautrì.»

### 17. og:title: maiuscola dopo il punto mediano
- **Dove:** `og:title`
- **Attuale:** «Natale a Novembre · Un invito per te»
- **Problema:** dopo «·» le altre occorrenze riprendono in minuscolo («Natale a Novembre · Beautrì» ha la maiuscola solo perché è un nome proprio).
- **Correzione:** «Natale a Novembre · un invito per te», oppure, più personale: «Natale a Novembre · Daniela ti invita».

### 18. Punteggiatura delle date non uniforme
- **Dove:** aria-label del countdown
- **Attuale:** «…venerdì 27 novembre ore 21:00»
- **Problema:** altrove si scrive sempre «27 novembre, ore 21:00».
- **Correzione:** «…venerdì 27 novembre, ore 21:00»

### 19. Nome dell'evento nella lettera senza segnalazione
- **Dove:** Lettera
- **Attuale:** «L'ho chiamata Natale a Novembre.»
- **Problema:** nel corpo del testo il nome della serata si confonde con la frase.
- **Correzione:** «L'ho chiamata «Natale a Novembre».» Coerente con le «» usate nel resto della pagina.

### 20. Calendari: dettagli incompleti
- **Dove:** link Outlook, file .ics
- **Attuale:** Outlook senza descrizione; .ics e link senza CAP e senza contatto.
- **Problema:** chi usa Outlook non trova «Pandoro, panettone, un brindisi. E il tuo regalo.». Senza CAP la navigazione verso l'indirizzo può essere meno precisa.
- **Correzione:** aggiungere al link Outlook `body=` con lo stesso testo di Google. Nella LOCATION di .ics, Google e Outlook usare «Beautrì, Via Circonvallazione 8, 24055 Cologno al Serio (BG)» (verificare il CAP). Nella DESCRIPTION del .ics si può aggiungere «Per domande: WhatsApp 331 334 8233». L'allarme «Domani sera: Natale a Novembre da Beautrì» va bene (TRIGGER -P1D).

### 21. «Promesso: ne vale la pena.»
- **Dove:** Sezione regalo, riga a mano
- **Problema:** «ne vale la pena» suggerisce uno sforzo o un costo da ripagare ed è vicino al linguaggio promozionale.
- **Correzione:** «Promesso: ti piacerà.» oppure «Fidati di me.»

### 22. Logo del footer letto due volte
- **Dove:** Footer
- **Attuale:** `alt="Beautrì"` seguito dal testo «Beautrì»
- **Problema:** lo screen reader legge «Beautrì Beautrì».
- **Correzione:** `alt=""` (come nella barra in alto).

### 23. Apostrofi dritti
- **Dove:** tutta la pagina (c'eri, d'invito, cos'è, L'ho, chi c'era)
- **Problema:** sono coerenti tra loro ma tipograficamente dritti ('), mentre le virgolette sono già quelle tipografiche (« »).
- **Correzione (facoltativa):** usare l'apostrofo tipografico (’) ovunque.

---

## Sezioni OK

- **Barra superiore:** OK.
- **Apertura (hero):** OK («Ho una cosa da dirti. E una da darti.» funziona e non svela niente).
- **Firme:** «Un abbraccio, Daniela» e «— Daniela» sono coerenti.
- **Genere:** OK in tutta la pagina, salvo «con le ragazze», che il cliente sta già cambiando. «Tu sei una di queste» concorda con «persone» ed è neutro.
- **Tono:** nessun termine commerciale («acquista», «offerta»), nessuna urgenza finta. Il countdown è legato a una data reale.
- **Nome:** «Beautrì» è sempre scritto con la ì, compresi gli URL codificati (%C3%AC).
- **Date e orari:** coerenti ovunque (hero, countdown, biglietto, casella Partecipo, conferma, og, .ics, Google, Outlook).
- **Etichette e messaggi dei singoli campi:** «Nome», «Cognome», «Scrivi il tuo nome.», «Scrivi il tuo cognome.», «Invio in corso…» OK.
- **Privacy e WhatsApp:** OK.
- **Footer:** testi OK (solo il punto 22, che riguarda l'accessibilità).
