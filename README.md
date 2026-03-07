# ♿ Asset Accessibility

**Widget di accessibilità web leggero, configurabile e conforme WCAG 2.1 AA — vanilla JavaScript, zero dipendenze.**

> ⚠️ **ATTENZIONE: Progetto in fase di sviluppo attivo.**
> Questo software è attualmente in fase alpha e **non è adatto all'uso in produzione** (_not suitable for production use_). Le API, le funzionalità e la struttura possono cambiare senza preavviso. L'utilizzo è a proprio rischio.

---

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0--alpha-orange.svg)
![Vanilla JS](https://img.shields.io/badge/vanilla-JavaScript-yellow.svg)
![WCAG 2.1 AA](https://img.shields.io/badge/WCAG-2.1%20AA-green.svg)

## Panoramica

**Asset Accessibility** è un widget di accessibilità web sviluppato da [Asset s.r.l.](https://www.assetroma.it), azienda che dal 1995 si occupa di prodotti, servizi e soluzioni per le esigenze di raccolta fondi di organizzazioni non profit.

Il widget consente ai visitatori di un sito web di personalizzare la propria esperienza di navigazione, intervenendo su dimensione del testo, contrasto, spaziatura, animazioni e molto altro — il tutto in tempo reale e senza ricaricare la pagina.

L'obiettivo è fornire uno strumento semplice da installare che aiuti i gestori di siti web ad avvicinarsi alla conformità con le normative vigenti in materia di accessibilità digitale, in particolare:

- **WCAG 2.1 Livello AA** (Web Content Accessibility Guidelines)
- **European Accessibility Act** — Direttiva (UE) 2019/882
- **D.Lgs. 82/2022** (recepimento italiano dell'EAA)
- **Legge Stanca** — Legge 9 gennaio 2004, n. 4

> ### ⚠️ Importante
>
> **L'installazione di un widget di accessibilità, da solo, non garantisce la piena conformità normativa.** La conformità richiede un approccio strutturato che includa analisi del codice, struttura semantica HTML, test manuali con tecnologie assistive e dichiarazione di accessibilità.
>
> Tuttavia, un widget come questo può essere un **valido supporto per lo sviluppatore**: offre all'utente finale strumenti di personalizzazione immediati (contrasto, dimensione testo, spaziatura, profili predefiniti) e aiuta a coprire diversi criteri WCAG 2.1 AA, facilitando il percorso verso la conformità e migliorando concretamente l'esperienza di navigazione per persone con disabilità visive, cognitive o motorie.

## Funzionalità

### Profili predefiniti

- **Accessibilità** — testo più grande, font leggibile, interlinea e spaziatura aumentate
- **Tema Scuro** — contrasto scuro e cursore grande
- **Ipovedente** — testo molto grande, contrasto elevato, cursore grande
- **ADHD** — riduzione distrazioni: saturazione bassa, animazioni ferme, immagini nascoste
- **Disabilità cognitiva** — layout semplificato: testo grande, interlinea ampia, no animazioni
- **Dislessia** — font leggibile, interlinea e spaziatura massime, allineamento a sinistra

I profili si attivano/disattivano con un click. Eventuali modifiche manuali disattivano il profilo attivo.

### Regolazione contenuti

- Dimensione testo (incremento / decremento)
- Carattere leggibile (Arial, Helvetica)
- Allineamento testo (sinistra, centro, destra)
- Altezza linea (regolabile in step percentuali)
- Spaziatura caratteri (regolabile in step percentuali)

### Regolazioni colore

- Tema a contrasto scuro
- Tema a contrasto chiaro
- Tema a contrasto elevato (sfondo nero, testo giallo)
- Modalità monocromatica (scala di grigi)
- Saturazione alta / bassa

### Altro

- Nascondi immagini (incluse background-image CSS) con visualizzazione dell'alt text al posto dell'immagine. Se l'alt text manca, viene mostrato un avviso in rosso ("Testo alternativo mancante", tradotto in tutte le lingue)
- Cursore grande
- Ferma tutte le animazioni
- Cambio lingua (IT, EN, FR, DE, ES)
- Dichiarazione di accessibilità (popup dedicata)
- Reset completo delle impostazioni

### Screen Reader e Tastiera

- `aria-live` region per annunci di ogni cambio di stato
- `role="dialog"` con `aria-modal` su pannello e dichiarazione
- `aria-expanded`, `aria-controls`, `aria-haspopup` sul trigger
- `aria-pressed` su profili, pill colore, allineamento
- `role="switch"` con `aria-checked` su tutti i toggle
- `aria-label` descrittivi su stepper (diminuisci/aumenta + nome controllo)
- Sezioni raggruppate con `role="group"` e `aria-labelledby`
- SVG decorativi con `aria-hidden="true"` e `focusable="false"`
- Focus trap completo (Tab / Shift+Tab cicla dentro il pannello)
- Focus automatico al primo controllo all'apertura, ritorno al trigger alla chiusura
- Escape chiude pannello o dichiarazione
- Annunci tradotti in tutte e 5 le lingue

### Sincronizzazione iframe

- Modalità `?mode=iframe` per sincronizzare le impostazioni in iframe contenuti nella pagina
- Comunicazione via `postMessage` con validazione dell'origin
- Polling automatico con timeout di 30 secondi
- Supporto multi-iframe (più iframe nella stessa pagina)
- Zero configurazione nell'iframe (basta il tag script)
- Supporto cross-origin con parametro `origin`

## Installazione

### CDN (consigliato)

Il modo più rapido — nessun download, nessun build tool:

```html
<script src="https://cdn.jsdelivr.net/gh/maurky/asset-access@latest/asset-accessibility.min.js"></script>
```

Per fissare una versione specifica (consigliato in produzione):

```html
<script src="https://cdn.jsdelivr.net/gh/maurky/asset-access@0.1.0-alpha/asset-accessibility.min.js"></script>
```

### Download manuale

Scarica `asset-accessibility.js` dal [repository GitHub](https://github.com/maurky/asset-access) e includilo nel tuo progetto:

```html
<script src="asset-accessibility.js"></script>
```

### Configurazione

Dopo aver incluso lo script, definisci l'oggetto di configurazione con almeno un contatto per le segnalazioni:

```html
<script>
  var AssetAccessibilityConfig = {
    contactEmail: "accessibilita@esempio.it",
    contactPhone: "+39 06 1234567",
    position: "bottom-right",
    buttonColor: "#1a56db",
  };
</script>
```

> **⚠️ Importante:** almeno uno tra `contactEmail` e `contactPhone` deve essere specificato. Se entrambi mancano, il widget non si avvia e viene stampato un errore in console.

Il widget si inizializza automaticamente al caricamento del DOM. Non è necessaria alcuna ulteriore chiamata. La dichiarazione di accessibilità viene generata automaticamente a partire dai contatti forniti; se si desidera un testo personalizzato, è possibile specificare `statementText`.

## Configurazione

| Parametro            | Tipo                  | Default          | Descrizione                                                                                                                                                      |
| -------------------- | --------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`contactEmail`**   | `string`              | —                | **Obbligatorio\*** — Email per segnalazioni sull'accessibilità                                                                                                   |
| **`contactPhone`**   | `string`              | —                | **Obbligatorio\*** — Telefono per segnalazioni sull'accessibilità                                                                                                |
| `position`           | `string`              | `'bottom-right'` | Posizione del pulsante: `bottom-right`, `bottom-left`, `bottom-center`, `top-right`, `top-left`                                                                  |
| `buttonColor`        | `string`              | `'#1a56db'`      | Colore HEX del pulsante e degli accenti nel pannello                                                                                                             |
| `buttonSize`         | `number`              | `56`             | Dimensione in pixel del pulsante trigger                                                                                                                         |
| `buttonIcon`         | `string`              | `'default'`      | `'default'` per l'icona inclusa, oppure una stringa SVG custom                                                                                                   |
| `lang`               | `string`              | _auto-detect_    | Lingua iniziale: `'it'`, `'en'`, `'fr'`, `'de'`, `'es'`. Se omesso, viene rilevata automaticamente dal browser.                                                  |
| `callback`           | `function`            | `null`           | Funzione di callback invocata a ogni interazione. Riceve un oggetto `{ action, detail, state, lang }`.                                                           |
| `agidDeclaration`    | `object`              | `null`           | Configurazione per generazione automatica della Dichiarazione AgID Allegato 1. Se presente, sovrascrive `statementText`. Vedi sezione dedicata.                  |
| `statementText`      | `object`              | _auto-generato_  | Oggetto con chiavi `it`, `en`, `fr`, `de`, `es`, ciascuna contenente l'HTML della dichiarazione. Se omesso, viene generato automaticamente dai contatti forniti. |
| `zIndex`             | `number`              | `999999`         | z-index del widget                                                                                                                                               |
| `iframeOrigins`      | `null\|string\|array` | `null`           | Origini accettate per iframe child. `null` = same-origin, `'*'` = qualsiasi, `['https://...']` = lista specifica.                                                |
| `preserveBackground` | `array`               | `[]`             | Selettori CSS esclusi dall'override del `background-color` nei contrasti. Es: `['.q-notifications__list', '.my-modal']`                                          |

> \* Almeno uno tra `contactEmail` e `contactPhone` deve essere specificato, altrimenti il widget non si avvia.

### Dichiarazione di Accessibilità AgID (Allegato 1)

Il parametro `agidDeclaration` genera automaticamente una dichiarazione conforme al modello AgID Allegato 1 (Linee Guida sull'Accessibilità degli Strumenti Informatici) per soggetti privati, ai sensi della L. 4/2004 e del D.Lgs. 82/2022 (EAA).

La dichiarazione viene prodotta in italiano (versione legale completa) e tradotta nelle altre 4 lingue supportate. Sovrascrive qualsiasi `statementText` manuale.

```javascript
var AssetAccessibilityConfig = {
  contactEmail: "accessibilita@esempio.it",
  contactPhone: "+39 06 1234567",
  agidDeclaration: {
    entityName: "Azienda s.r.l.",
    entityUrl: "https://www.esempio.it",
    entityType: "sito web", // 'sito web' | 'applicazione mobile'
    conformanceStatus: "partial", // 'full' | 'partial' | 'none'

    // ── Contenuti non accessibili ──────────────────────────────────
    // Commentare o rimuovere le voci non applicabili.
    // Se conformanceStatus è 'full', questa sezione viene ignorata.
    nonAccessibleContent: {
      // a) Inosservanza della legge 9 gennaio 2004, n. 4
      //    Elencare i casi di non conformità rispetto alla norma
      //    UNI CEI EN 301549 / WCAG 2.1 AA.
      nonConformities: [
        "Alcune immagini decorative non hanno un attributo alt vuoto (WCAG 1.1.1 - Contenuto non testuale)",
        "Il contrasto del testo in alcune sezioni è inferiore al rapporto 4.5:1 (WCAG 1.4.3 - Contrasto minimo)",
        "Alcuni campi dei moduli non hanno etichette associate in modo programmatico (WCAG 1.3.1 - Informazioni e relazioni)",
        "La navigazione tramite tastiera non è completamente garantita in tutte le pagine (WCAG 2.1.1 - Tastiera)",
        "Alcuni video non dispongono di sottotitoli o audiodescrizione (WCAG 1.2.2 / 1.2.5 - Sottotitoli / Audiodescrizione)",
        "Il focus della tastiera non è sempre visibile durante la navigazione (WCAG 2.4.7 - Focus visibile)",
        "Alcune tabelle di dati non utilizzano intestazioni th correttamente associate (WCAG 1.3.1)",
        "Il sito non presenta una skip navigation per saltare i blocchi ripetitivi (WCAG 2.4.1 - Salto dei blocchi)",
        "Alcuni messaggi di errore nei form non sono identificati in modo programmatico (WCAG 3.3.1 - Identificazione degli errori)",
        "La lingua di alcune sezioni in lingua straniera non è specificata con l'attributo lang (WCAG 3.1.2 - Lingua delle parti)",
      ],

      // b) Onere sproporzionato (art. 3-ter, legge 9 gennaio 2004, n. 4)
      //    Contenuti per i quali viene temporaneamente fatta valere la deroga,
      //    con indicazione delle motivazioni (dimensione organizzazione, costi,
      //    frequenza utilizzo, ecc.).
      disproportionateBurden: [
        "Il visualizzatore di mappe interattive utilizza una libreria di terze parti non accessibile; la sostituzione richiederebbe uno sviluppo custom con costi sproporzionati rispetto alla dimensione dell'organizzazione",
        "L'archivio storico di documenti PDF (precedenti al 2020) non è stato convertito in formato accessibile a causa del volume elevato di materiale; i nuovi documenti vengono pubblicati in formato accessibile",
        "Il configuratore 3D del prodotto utilizza una tecnologia WebGL che non supporta nativamente le tecnologie assistive; è disponibile una descrizione testuale alternativa",
      ],

      // c) Il contenuto non rientra nell'ambito della legislazione applicabile
      //    Contenuti esclusi dal campo di applicazione della Direttiva UE 2016/2102
      //    o della L. 4/2004 (es. contenuti di terze parti, formati di file legacy,
      //    contenuti intranet pubblicati prima del 23/09/2019, ecc.).
      outsideScope: [
        "Contenuti video trasmessi in live streaming (esclusi ai sensi dell'art. 1, comma 2, Direttiva UE 2016/2102)",
        "Documenti PDF pubblicati da terze parti e non prodotti dal soggetto erogatore",
        "Mappe online interattive, purché le informazioni essenziali siano fornite in formato digitale accessibile",
        "Contenuti di siti web e applicazioni web archiviati, non aggiornati né necessari per i procedimenti amministrativi in corso",
      ],

      // Alternative accessibili fornite per i contenuti non accessibili
      alternatives:
        'Per i contenuti non accessibili è possibile richiedere formati alternativi contattando il recapito indicato nella sezione Meccanismo di feedback. Le informazioni presenti nel visualizzatore mappe sono disponibili anche in formato tabellare accessibile nella pagina "Sedi e contatti".',
    },

    declarationDate: "2026-01-15", // Data prima redazione (YYYY-MM-DD)
    lastReviewDate: "2026-09-01", // Data ultimo riesame (YYYY-MM-DD)
    evaluationMethod: "self", // 'self' | 'third-party'
    evaluationDetails: "", // Dettagli aggiuntivi sulla valutazione
    technologies: ["HTML", "CSS", "JavaScript", "WAI-ARIA"],
    feedbackEmail: "", // Fallback su contactEmail se vuoto
    feedbackPhone: "", // Fallback su contactPhone se vuoto
    feedbackUrl: "", // URL modulo segnalazione online
    feedbackResponseTime: "30", // Giorni per risposta
    responsibleName: "Mario Rossi",
    responsibleRole: "Web Manager",
  },
};
```

**Struttura della dichiarazione generata** (conforme Allegato 1 AgID):

1. **Intestazione** — Impegno del soggetto erogatore all'accessibilità (L. 4/2004)
2. **Stato di conformità** — Conforme / Parzialmente conforme / Non conforme (UNI CEI EN 301549)
3. **Contenuti non accessibili** — Inosservanza, onere sproporzionato, contenuti fuori ambito, alternative accessibili
4. **Redazione della dichiarazione** — Data, metodologia (autovalutazione / terzi), tecnologie
5. **Meccanismo di feedback** — Contatti per segnalazioni accessibilità
6. **Procedura di attuazione** — Link ad AgID per reclami dopo 30 giorni senza risposta

> **Nota:** Per le PA, la dichiarazione ufficiale va compilata esclusivamente tramite il form AgID su <https://form.agid.gov.it>. Il generatore del widget è pensato per i soggetti privati che devono pubblicare una dichiarazione HTML o PDF basata sul modello Allegato 1.

### Callback

La funzione `callback` viene invocata a ogni interazione dell'utente con il widget. Riceve un oggetto con queste proprietà:

```javascript
var AssetAccessibilityConfig = {
  contactEmail: "accessibilita@esempio.it",
  callback: function (event) {
    console.log(event.action); // es. 'toggle', 'step', 'applyProfile', 'reset', ...
    console.log(event.detail); // es. { key: 'readableFont' } o { value: 'adhd' }
    console.log(event.state); // copia completa dello stato corrente
    console.log(event.lang); // lingua corrente ('it', 'en', ...)
  },
};
```

Azioni possibili: `openPanel`, `closePanel`, `changeLang`, `step`, `toggle`, `align`, `contrast`, `toggleMono`, `saturation`, `reset`, `applyProfile`, `showStatement`, `closeStatement`.

### Modalità iframe

Se la pagina contiene uno o più `<iframe>` di cui si ha accesso all'HTML, è possibile sincronizzare le impostazioni di accessibilità tra la pagina padre e gli iframe.

**Nell'iframe** — basta un tag script, senza alcuna configurazione:

```html
<script src="asset-accessibility.min.js?mode=iframe"></script>
```

Il widget non mostra alcun pulsante nell'iframe. Si limita ad applicare le stesse classi CSS e gli stessi stili della pagina padre.

**Nella pagina padre** — nessuna modifica necessaria se gli iframe sono **same-origin**. Per iframe cross-origin, specificare le origini accettate:

```javascript
var AssetAccessibilityConfig = {
  contactEmail: "accessibilita@esempio.it",
  iframeOrigins: ["https://altro-dominio.it"], // oppure '*' per accettare tutti
};
```

Per iframe cross-origin, specificare l'origin del padre nel tag script dell'iframe:

```html
<script src="asset-accessibility.js?mode=iframe&origin=https://padre.esempio.it"></script>
```

**Come funziona la sincronizzazione:**

1. L'iframe invia `aa-child-ready` al parent ogni 200ms via `postMessage`
2. Il parent, appena riceve il primo `aa-child-ready`, risponde con lo stato corrente e registra l'iframe
3. L'iframe smette di fare polling e applica lo stato ricevuto
4. A ogni cambio di stato (toggle, profilo, contrasto, reset...) il parent invia automaticamente l'aggiornamento a tutti gli iframe registrati
5. Se il parent si inizializza dopo l'iframe, risponderà al prossimo tick di polling
6. Timeout: dopo 30 secondi senza risposta l'iframe smette di fare polling

## Traduzioni

Il widget supporta 5 lingue, selezionabili ciclicamente dal pulsante nell'header del pannello:

| Codice | Lingua   |
| ------ | -------- |
| `it`   | Italiano |
| `en`   | English  |
| `fr`   | Français |
| `de`   | Deutsch  |
| `es`   | Español  |

I testi dell'interfaccia e della dichiarazione di accessibilità sono contenuti in un unico oggetto `i18n` all'interno dello script, facilmente estendibile:

```javascript
var i18n = {
  it: { panelTitle: "Accessibilità", fontSize: "Dimensione Testo" /* ... */ },
  en: { panelTitle: "Accessibility", fontSize: "Font Size" /* ... */ },
  fr: { panelTitle: "Accessibilité", fontSize: "Taille du Texte" /* ... */ },
  de: { panelTitle: "Barrierefreiheit", fontSize: "Schriftgröße" /* ... */ },
  es: { panelTitle: "Accesibilidad", fontSize: "Tamaño del Texto" /* ... */ },
};
```

Per aggiungere una nuova lingua è sufficiente aggiungere una chiave all'oggetto `i18n` e inserirla nell'array `LANGS`.

## Demo

Apri il file `demo.html` in un browser per vedere il widget in azione su una pagina di esempio con contenuti di prova (testo, immagini, link, animazioni).

```bash
# Clona il repository
git clone https://github.com/maurky/asset-access.git
cd asset-access

# Apri la demo nel browser
open demo.html
```

## Test

Il progetto include una test suite automatizzata con **104 test organizzati in 17 gruppi**. La suite gira direttamente nel browser — basta aprire `test.html`:

```bash
open test.html
```

I test coprono: inizializzazione, elementi DOM, attributi ARIA, pannello apri/chiudi, regolazione contenuti, colori, toggle, profili, reset, persistenza localStorage, lingue (i18n), callback, dichiarazione AgID, statement default, configurazione, annunci screen reader, integrità classi CSS.

## Struttura del progetto

```
asset-access/
├── asset-accessibility.js    # Widget completo (JS + CSS iniettato)
├── demo.html                 # Pagina demo con configurazione di esempio
├── iframe.html               # Pagina di test per modalità iframe child
├── test.html                 # Test suite automatizzata (104 test)
├── README.md                 # Questo file
└── LICENSE                   # Licenza MIT
```

## Compatibilità browser

| Browser | Versione minima |
| ------- | --------------- |
| Chrome  | 74+             |
| Firefox | 90+             |
| Safari  | 14.1+           |
| Edge    | 79+             |
| Opera   | 62+             |

Il widget è sviluppato in vanilla JavaScript ES6 (classi, arrow functions, template literals, optional chaining) e non richiede framework, librerie esterne o build tools.

> **Nota:** i contrasti forzano `background-color` esplicito su tutti gli elementi (uguale allo sfondo del tema) per garantire leggibilità e compatibilità con `position: fixed`. Monocromatico e saturazione usano `backdrop-filter` su un overlay. Browser senza supporto `backdrop-filter` (Firefox < 103) usano un fallback con `filter` su elementi diretti del body.

## Roadmap

- [x] Persistenza delle preferenze (localStorage)
- [x] Supporto lingue aggiuntive (francese, tedesco, spagnolo)
- [x] Profili di accessibilità predefiniti (Accessibilità, Tema Scuro, Ipovedente, ADHD, Disabilità Cognitiva, Dislessia)
- [x] Navigazione da tastiera completa nel pannello (focus trap, Tab/Shift+Tab, Escape)
- [x] Screen reader: attributi ARIA avanzati (live region, aria-modal, focus management)
- [x] Generatore automatico della dichiarazione di accessibilità AgID (Allegato 1)
- [x] Distribuzione via CDN (jsDelivr)
- [x] Test suite automatizzata (104 test, 17 gruppi)
- [x] Sincronizzazione iframe via `postMessage` (`?mode=iframe`)
- [ ] Documentazione API completa

## FAQ

### Perché alcuni testi del mio sito non si ridimensionano?

Il widget regola la dimensione del testo impostando `font-size` in percentuale sull'elemento `<html>` (es. `110%`, `120%`, ecc.). Questo funziona perché le unità relative — `rem`, `em`, `%` — scalano proporzionalmente rispetto al font-size del root.

Se alcuni testi non si ridimensionano, è perché nel CSS del sito la loro dimensione è espressa in **unità assolute** (`px`):

```css
/* ❌ Non scala con il widget */
h1 {
  font-size: 32px;
}
p {
  font-size: 14px;
}

/* ✅ Scala correttamente */
h1 {
  font-size: 2rem;
}
p {
  font-size: 0.875rem;
}
```

`px` è un valore fisso che non reagisce al cambio di `font-size` sull'`<html>`. Per rendere il sito completamente compatibile con il widget (e con le impostazioni di accessibilità del browser), è sufficiente convertire i `font-size` da `px` a `rem`:

| px   | rem (base 16px) |
| ---- | --------------- |
| 12px | 0.75rem         |
| 14px | 0.875rem        |
| 16px | 1rem            |
| 18px | 1.125rem        |
| 20px | 1.25rem         |
| 24px | 1.5rem          |
| 32px | 2rem            |

La formula è: **rem = px / 16**. Questo vale se il `font-size` base del browser è 16px (il default). La conversione va applicata solo ai `font-size`; le altre proprietà (`margin`, `padding`, `width`, ecc.) possono restare in `px` senza problemi.

### Perché l'altezza linea e la spaziatura caratteri non cambiano su alcuni elementi?

Il widget imposta `line-height` e `letter-spacing` come stile inline su `<body>`. Essendo proprietà CSS ereditabili, il valore si propaga a tutti gli elementi discendenti — **a meno che** un elemento non abbia già un proprio `line-height` o `letter-spacing` dichiarato nel CSS del sito. In quel caso la regola locale vince sull'ereditarietà:

```css
/* ❌ Blocca l'ereditarietà — il widget non ha effetto su questo elemento */
.card p {
  line-height: 1.4;
  letter-spacing: 0.5px;
}

/* ✅ Lascia ereditare dal body — il widget funziona */
.card p {
  line-height: inherit;
  letter-spacing: inherit;
}

/* ✅ Anche omettere la proprietà funziona — il valore viene ereditato dal body */
.card p {
  /* nessun line-height né letter-spacing dichiarato */
}
```

Questo è diverso dal problema dei `font-size` in `px`: lì il valore è assoluto e non reagisce alla percentuale sul root. Qui invece il meccanismo è l'**ereditarietà CSS**: qualsiasi dichiarazione esplicita su un elemento — anche senza `!important` — sovrascrive il valore ereditato dal `<body>`.

I componenti più comuni che presentano questo problema sono: reset CSS (come Normalize.css che imposta `line-height: 1.15` su `html`), framework UI (Bootstrap, Tailwind) che dichiarano `line-height` e `letter-spacing` su molte classi, e componenti custom con stili inline.

**Come verificare:** apri gli strumenti sviluppatore del browser, ispeziona l'elemento che non cambia e controlla nella scheda "Computed" se `line-height` e `letter-spacing` mostrano un valore ereditato da `body` oppure un valore dichiarato localmente. Se è locale, puoi rimuoverlo o sostituirlo con `inherit`.

### Perché attivando un contrasto il contenuto dell'iframe sparisce o diventa invisibile?

Quando il widget applica un tema di contrasto (scuro, chiaro o elevato), forza `background-color` su **tutti** gli elementi della pagina. Se all'interno dell'iframe c'è un framework come Vue.js (Quasar), React o Angular, è comune che il framework usi div wrapper a schermo intero (es. `.q-app`, `.q-layout`, `.q-page-container`) con `position: absolute` o `fixed`. Questi layer, ricevendo tutti lo stesso colore di sfondo opaco, si sovrappongono e nascondono il contenuto sottostante.

**Come diagnosticare** — apri la console dell'iframe e individua l'elemento che copre il contenuto:

```javascript
// Mostra gli elementi full-screen sovrapposti
document.querySelectorAll("*").forEach(function (el) {
  var s = getComputedStyle(el);
  if (
    (s.position === "fixed" || s.position === "absolute") &&
    el.offsetWidth > window.innerWidth * 0.8 &&
    el.offsetHeight > window.innerHeight * 0.8
  ) {
    console.log(
      el.tagName,
      el.className,
      "| z-index:",
      s.zIndex,
      "| bg:",
      s.backgroundColor,
    );
  }
});
```

**Come risolvere** — una volta identificata la classe colpevole, aggiungila al parametro `preserveBackground` nella configurazione del padre. Il widget escluderà quell'elemento (e i suoi discendenti) dall'override del `background-color`, sia nella pagina padre che negli iframe sincronizzati:

```javascript
var AssetAccessibilityConfig = {
  contactEmail: "accessibilita@esempio.it",
  preserveBackground: [".q-notifications__list", ".q-drawer__backdrop"],
};
```

Il parametro accetta un array di selettori CSS (classi, id, tag). Viene trasmesso automaticamente agli iframe via `postMessage`.

## Contribuire

Il progetto è in fase iniziale e ogni contributo è benvenuto. Se desideri collaborare:

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/nuova-funzione`)
3. Committa le modifiche (`git commit -m 'Aggiunge nuova funzione'`)
4. Pusha il branch (`git push origin feature/nuova-funzione`)
5. Apri una Pull Request

Per segnalazioni di bug o richieste di funzionalità, apri una [Issue](https://github.com/maurky/asset-access/issues).

## Riferimenti normativi

- [WCAG 2.1 — Traduzione italiana](https://www.w3.org/Translations/WCAG21-it/)
- [Linee guida AgID sull'accessibilità](https://www.agid.gov.it/it/design-servizi/accessibilita)
- [D.Lgs. 82/2022 — European Accessibility Act](https://www.gazzettaufficiale.it/eli/id/2022/06/21/22G00089/sg)
- [Legge 4/2004 — Legge Stanca](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2004-01-09;4)

## Licenza

Distribuito con licenza **MIT**. Vedi il file [LICENSE](LICENSE) per i dettagli.

## Autore

**[Asset s.r.l.](https://www.assetroma.it)**
Dal 1995, prodotti, servizi e soluzioni per le esigenze di raccolta fondi di organizzazioni non profit.

---

<p align="center">
  <sub>Made with ❤️ by <a href="https://www.assetroma.it">Asset s.r.l.</a></sub>
</p>
