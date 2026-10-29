# Natale a Novembre — Revisione copy n. 2

Regola di voce invariata: **io = Daniela** (lettera, regalo, form, P.S., conferma); **noi = solo lo studio/il team** ("l'abbiamo prodotto noi", "con noi"); parti pratiche neutre; genere neutro.
Date e orari verificati: venerdì 27 novembre 2026, ore 21:00 ovunque (hero, countdown, biglietto, spunta "Partecipo", conferma, link calendario 20:00–23:00 UTC = 21:00–24:00 ora italiana). Il 27/11/2026 è davvero un venerdì.

Restano invariati (già corretti): meta description, og:title, og:description, og:image:alt, apertura, nota "E adesso… il tuo regalo ↓", "si scarta il 27 ♡", biglietto (tranne "Dove"), calendario, campi del form, privacy, conferma, WhatsApp, footer.

---

## Testi che cambiano (in ordine di pagina)

| # | Sezione | Testo attuale (esatto) | Testo nuovo | Motivo |
|---|---|---|---|---|
| 1 | Countdown · a serata finita (`.countdown__over`) | Grazie a chi c'era ♡ | Serata conclusa ♡ | A serata finita compare anche la chiusura iscrizioni con la stessa frase: si ripeteva. Qui basta l'informazione, corta per la barra su mobile. |
| 2 | Lettera · par. 3 | Quest'anno è stato un anno di cambiamenti. Un anno importante, per me e per lo studio. Di quelli che ti fanno fermare e guardare indietro, per capire quanta strada hai fatto. | Questo è stato un anno di cambiamenti. Un anno importante, per me e per lo studio. Di quelli che mi hanno fatto fermare a guardare indietro, per capire quanta strada abbiamo fatto. | "Quest'anno… un anno… un anno": tolto un "anno". Il "ti/hai fatto" generico si confondeva con il "tu" del lettore: ora è Daniela che si ferma, e la strada è dello studio ("abbiamo"). |
| 3 | Lettera · par. 5 | Ogni chiacchierata in studio, ogni «come stai?» che diventava una storia, ogni volta che mi hai dato fiducia. Anche tu hai fatto parte di quest'anno. Del nostro cambiamento. | Ogni chiacchierata in studio, ogni «come stai?» che diventava una storia, ogni volta che mi hai dato fiducia. Hai fatto parte di quest'anno, e del nostro cambiamento. | "Anche tu" ripeteva il "c'eri anche tu" della riga sopra (e ne indeboliva il giallo). |
| 4 | Lettera · NUOVO paragrafo, subito dopo "…ho un **regalo** per te." | — | L'abbiamo prodotto noi, in studio, solo ed esclusivamente per questa occasione. Non sarà mai in vendita e, in questa forma, non lo produrremo mai più. | Richiesta cliente: creato solo per l'occasione, nostra produzione, mai in vendita, mai più prodotto così. Non svela cos'è. "Noi" = il team che l'ha fatto, coerente con la regola. Paragrafo a sé per respirare su mobile. |
| 5 | Lettera · par. "Allora…" | Allora mi sono chiesta: quale occasione migliore di una festa? Per farci gli auguri, per ringraziarti e per darti il tuo regalo. Di persona, con pandoro, panettone e un brindisi. Senza aspettare dicembre. | Allora mi sono chiesta: quale momento migliore di una festa? Per farci gli auguri e per dartelo di persona, con pandoro, panettone e un brindisi. Senza aspettare dicembre. | "Occasione" era appena stato usato nella frase nuova; "ringraziarti" e "il tuo regalo" ripetevano il paragrafo del grazie e quello del regalo. |
| 6 | Lettera · chiusura | Ti aspetto in studio, con le ragazze. | Ti aspetto in studio, con il mio team. | Richiesta cliente. |
| 7 | Pacco regalo · testo | Non ti dico cos'è. Te lo darò quella sera, di persona. | Non ti dico cos'è. Lo scoprirai quella sera. | "Di persona" e "te lo darò" sono già nella lettera, poche righe sopra. Più corto, più mistero. |
| 8 | Biglietto · Dove (`<strong>`) | Da noi, in studio Beautrì | Da noi, nello studio Beautrì | "In studio Beautrì" suona monco: serve la preposizione articolata. |
| 9 | Form · bottone | Conferma | Confermo | Stessa voce della spunta "Partecipo": parla chi compila. |
| 10 | JS · errore campi mancanti (main.js r. 113) | Manca qualcosa: scrivi nome e cognome e spunta «Partecipo». | Manca qualcosa: scrivi nome e cognome, poi spunta «Partecipo». | Tolta la doppia "e", si legge come un'istruzione in due passi. |
| 11 | JS · errore invio (main.js r. 140) | Qualcosa non è andato. Riprova tra un attimo. | Qualcosa è andato storto. Riprova tra un attimo o scrivimi su WhatsApp. | "Non è andato" è incompleto; si offre un'alternativa (il link WhatsApp è subito sotto). |
| 12 | P.S. · testo | Il regalo che riceverai non lo troverai da nessuna parte. Non si può comprare e non si può replicare. L'abbiamo creato in studio solo ed esclusivamente per questa occasione. Per dirti grazie. | Quello che scarterai il 27 lo avranno soltanto le persone in studio quella sera. Nessun altro, né ora né in futuro. È il mio modo per dirti che per me conti. | Ora creazione, produzione e "mai in vendita" sono nella lettera: il P.S. non li ripete, ma li traduce in ciò che significano per chi legge (pochissimi lo avranno, per sempre) e chiude sul legame, senza ripetere "grazie". |

Firma P.S. invariata: **— Daniela**

---

## Lettera finale (paragrafo per paragrafo)

1. *(handwritten, `.letter__hello`)* Ciao,
2. sono Daniela.
3. Ti scrivo una lettera, sì. Certe cose non stanno in un messaggio veloce.
4. Questo è stato un anno di cambiamenti. Un anno importante, per me e per lo studio. Di quelli che mi hanno fatto fermare a guardare indietro, per capire quanta strada abbiamo fatto.
5. E in questa strada `<mark>`c'eri anche tu`</mark>`.
6. Ogni chiacchierata in studio, ogni «come stai?» che diventava una storia, ogni volta che mi hai dato fiducia. Hai fatto parte di quest'anno, e del nostro cambiamento.
7. Per questo voglio dirti grazie. E non solo a parole: ho un `<strong>`regalo`</strong>` per te.
8. **(nuovo)** L'abbiamo prodotto noi, in studio, solo ed esclusivamente per questa occasione. Non sarà mai in vendita e, in questa forma, non lo produrremo mai più.
9. Allora mi sono chiesta: quale momento migliore di una festa? Per farci gli auguri e per dartelo di persona, con pandoro, panettone e un brindisi. Senza aspettare dicembre.
10. L'ho chiamata Natale a Novembre. È su invito, per poche persone. Tu sei una di queste.
11. Ti aspetto in studio, con il mio team.

Firma (invariata):
- Un abbraccio,
- *(handwritten)* Daniela

Evidenziazioni: solo un `<mark>` ("c'eri anche tu") e un `<strong>` ("regalo"). Nessun altro grassetto, nemmeno nel paragrafo nuovo.

---

## P.S. finale

**P.S.**
Quello che scarterai il 27 lo avranno soltanto le persone in studio quella sera. Nessun altro, né ora né in futuro. È il mio modo per dirti che per me conti.

*— Daniela*
