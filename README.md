# ♿ Asset Accessibility

**Widget di accessibilità web leggero, configurabile e conforme WCAG 2.1 AA — vanilla JavaScript, zero dipendenze.**

> ⚠️ **ATTENZIONE: Progetto in fase di sviluppo attivo.**
> Questo software è attualmente in fase alpha e **non è adatto all'uso in produzione** (_not suitable for production use_). Le API, le funzionalità e la struttura possono cambiare senza preavviso. L'utilizzo è a proprio rischio.

---

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)
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

> **Nota:** l'installazione di un widget di accessibilità, da solo, non garantisce la piena conformità normativa. È necessario un approccio strutturato che includa analisi del codice, struttura semantica, test manuali e dichiarazione di accessibilità.

## Funzionalità

### Profili predefiniti

- **Accessibilità** — testo più grande, font leggibile, interlinea e spaziatura aumentate
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

- Nascondi immagini (incluse background-image CSS)
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

## Installazione

Includi lo script nel tuo sito e definisci l'oggetto di configurazione con almeno un contatto per le segnalazioni:

```html
<!-- 1. Carica lo script -->
<script src="asset-accessibility.js"></script>

<!-- 2. Configura (contactEmail e/o contactPhone sono OBBLIGATORI) -->
<script>
  var AssetAccessibilityConfig = {
    contactEmail: "accessibilita@esempio.it",
    contactPhone: "+39 02 1234567",
    position: "bottom-right",
    buttonColor: "#1a56db",
  };
</script>
```

> **⚠️ Importante:** almeno uno tra `contactEmail` e `contactPhone` deve essere specificato. Se entrambi mancano, il widget non si avvia e viene stampato un errore in console.

Il widget si inizializza automaticamente al caricamento del DOM. Non è necessaria alcuna ulteriore chiamata. La dichiarazione di accessibilità viene generata automaticamente a partire dai contatti forniti; se si desidera un testo personalizzato, è possibile specificare `statementText`.

## Configurazione

| Parametro          | Tipo       | Default          | Descrizione                                                                                                                                                      |
| ------------------ | ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`contactEmail`** | `string`   | —                | **Obbligatorio\*** — Email per segnalazioni sull'accessibilità                                                                                                   |
| **`contactPhone`** | `string`   | —                | **Obbligatorio\*** — Telefono per segnalazioni sull'accessibilità                                                                                                |
| `position`         | `string`   | `'bottom-right'` | Posizione del pulsante: `bottom-right`, `bottom-left`, `bottom-center`, `top-right`, `top-left`                                                                  |
| `buttonColor`      | `string`   | `'#1a56db'`      | Colore HEX del pulsante e degli accenti nel pannello                                                                                                             |
| `buttonSize`       | `number`   | `56`             | Dimensione in pixel del pulsante trigger                                                                                                                         |
| `buttonIcon`       | `string`   | `'default'`      | `'default'` per l'icona inclusa, oppure una stringa SVG custom                                                                                                   |
| `lang`             | `string`   | _auto-detect_    | Lingua iniziale: `'it'`, `'en'`, `'fr'`, `'de'`, `'es'`. Se omesso, viene rilevata automaticamente dal browser.                                                  |
| `callback`         | `function` | `null`           | Funzione di callback invocata a ogni interazione. Riceve un oggetto `{ action, detail, state, lang }`.                                                           |
| `statementText`    | `object`   | _auto-generato_  | Oggetto con chiavi `it`, `en`, `fr`, `de`, `es`, ciascuna contenente l'HTML della dichiarazione. Se omesso, viene generato automaticamente dai contatti forniti. |
| `zIndex`           | `number`   | `999999`         | z-index del widget                                                                                                                                               |

> \* Almeno uno tra `contactEmail` e `contactPhone` deve essere specificato, altrimenti il widget non si avvia.

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

Azioni possibili: `openPanel`, `closePanel`, `toggleLang`, `step`, `toggle`, `align`, `contrast`, `toggleMono`, `saturation`, `reset`, `applyProfile`, `showStatement`, `closeStatement`.

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
git clone https://github.com/asset-srl/asset-accessibility.git
cd asset-accessibility

# Apri la demo nel browser
open demo.html
```

## Struttura del progetto

```
asset-accessibility/
├── asset-accessibility.js    # Widget completo (JS + CSS iniettato)
├── demo.html                 # Pagina demo con configurazione di esempio
├── README.md                 # Questo file
└── LICENSE                   # Licenza MIT
```

## Compatibilità browser

| Browser | Versione minima |
| ------- | --------------- |
| Chrome  | 60+             |
| Firefox | 60+             |
| Safari  | 12+             |
| Edge    | 79+             |
| Opera   | 47+             |

Il widget è sviluppato in vanilla JavaScript (ES5-compatibile) e non richiede framework, librerie esterne o build tools.

## Roadmap

- [x] Persistenza delle preferenze (localStorage)
- [x] Supporto lingue aggiuntive (francese, tedesco, spagnolo)
- [x] Profili di accessibilità predefiniti (Accessibilità, Ipovedente, ADHD, Disabilità Cognitiva, Dislessia)
- [x] Navigazione da tastiera completa nel pannello (focus trap, Tab/Shift+Tab, Escape)
- [x] Screen reader: attributi ARIA avanzati (live region, aria-modal, focus management)
- [ ] Generatore automatico della dichiarazione di accessibilità AgID
- [ ] Distribuzione via CDN e pacchetto npm
- [ ] Test suite automatizzata
- [ ] Documentazione API completa

## Contribuire

Il progetto è in fase iniziale e ogni contributo è benvenuto. Se desideri collaborare:

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/nuova-funzione`)
3. Committa le modifiche (`git commit -m 'Aggiunge nuova funzione'`)
4. Pusha il branch (`git push origin feature/nuova-funzione`)
5. Apri una Pull Request

Per segnalazioni di bug o richieste di funzionalità, apri una [Issue](https://github.com/asset-srl/asset-accessibility/issues).

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
