/**
 * Asset Accessibility v1.0.0-alpha
 * Lightweight WCAG 2.1 AA accessibility widget — Vanilla JS, zero dependencies
 * Supports European Accessibility Act (EAA) / Italian D.Lgs. 82/2022
 *
 * Copyright (C) 2026 Asset s.r.l.
 * Licensed under the GNU General Public License v3.0 (GPL-3.0)
 * See LICENSE file for details.
 *
 * ⚠️  WARNING: This software is under active development and is NOT yet
 *    suitable for production use. APIs and features may change without notice.
 *
 * USAGE:
 * <script src="asset-accessibility.js"></script>
 * <script>
 *   var AssetAccessibilityConfig = {
 *     contactEmail: 'accessibilita@esempio.it',  // REQUIRED (email and/or phone)
 *     contactPhone: '+39 02 1234567',             // REQUIRED (email and/or phone)
 *     position: 'bottom-right',
 *     buttonColor: '#1a56db',
 *     buttonIcon: 'default',
 *     lang: 'it',                                 // auto-detected from browser if omitted
 *     callback: function(e) { console.log(e); },  // optional
 *     statementText: { it: '...', en: '...' }
 *   };
 * </script>
 */
(function () {
  'use strict';

  /* ───────────────────────────────────────────
     TRANSLATIONS
  ─────────────────────────────────────────── */
  var i18n = {
    it: {
      panelTitle: 'Accessibilità',
      sectionProfiles: 'Profili',
      profileAccessibility: 'Accessibilità',
      profileVisuallyImpaired: 'Ipovedente',
      profileAdhd: 'ADHD',
      profileCognitive: 'Disabilità Cognitiva',
      profileDyslexia: 'Dislessia',
      sectionContent: 'Regolazione Contenuti',
      fontSize: 'Dimensione Testo',
      readableFont: 'Carattere Leggibile',
      textAlign: 'Allinea Testo',
      alignLeft: 'Sinistra',
      alignCenter: 'Centro',
      alignRight: 'Destra',
      lineHeight: 'Altezza Linea',
      letterSpacing: 'Spaziatura Caratteri',
      sectionColor: 'Regolazioni Colore',
      contrastDark: 'Contrasto Scuro',
      contrastLight: 'Contrasto Chiaro',
      contrastHigh: 'Contrasto Elevato',
      monochrome: 'Monocromatico',
      saturationHigh: 'Saturazione Alta',
      saturationLow: 'Saturazione Bassa',
      sectionOther: 'Altro',
      hideImages: 'Nascondi Immagini',
      cursorSize: 'Cursore Grande',
      stopAnimations: 'Ferma Animazioni',
      resetAll: 'Ripristina Tutto',
      statement: 'Dichiarazione',
      statementTitle: 'Dichiarazione di Accessibilità',
      closeStatement: 'Chiudi',
      close: 'Chiudi',
      on: 'ON',
      off: 'OFF',
    },
    en: {
      panelTitle: 'Accessibility',
      sectionProfiles: 'Profiles',
      profileAccessibility: 'Accessibility',
      profileVisuallyImpaired: 'Visually Impaired',
      profileAdhd: 'ADHD',
      profileCognitive: 'Cognitive Disability',
      profileDyslexia: 'Dyslexia',
      sectionContent: 'Content Settings',
      fontSize: 'Font Size',
      readableFont: 'Readable Font',
      textAlign: 'Text Alignment',
      alignLeft: 'Left',
      alignCenter: 'Center',
      alignRight: 'Right',
      lineHeight: 'Line Height',
      letterSpacing: 'Letter Spacing',
      sectionColor: 'Color Settings',
      contrastDark: 'Dark Contrast',
      contrastLight: 'Light Contrast',
      contrastHigh: 'High Contrast',
      monochrome: 'Monochrome',
      saturationHigh: 'High Saturation',
      saturationLow: 'Low Saturation',
      sectionOther: 'Other',
      hideImages: 'Hide Images',
      cursorSize: 'Large Cursor',
      stopAnimations: 'Stop Animations',
      resetAll: 'Reset All',
      statement: 'Statement',
      statementTitle: 'Accessibility Statement',
      closeStatement: 'Close',
      close: 'Close',
      on: 'ON',
      off: 'OFF',
    },
    fr: {
      panelTitle: 'Accessibilité',
      sectionProfiles: 'Profils',
      profileAccessibility: 'Accessibilité',
      profileVisuallyImpaired: 'Malvoyant',
      profileAdhd: 'TDAH',
      profileCognitive: 'Handicap Cognitif',
      profileDyslexia: 'Dyslexie',
      sectionContent: 'Réglages du Contenu',
      fontSize: 'Taille du Texte',
      readableFont: 'Police Lisible',
      textAlign: 'Alignement du Texte',
      alignLeft: 'Gauche',
      alignCenter: 'Centre',
      alignRight: 'Droite',
      lineHeight: 'Hauteur de Ligne',
      letterSpacing: 'Espacement des Lettres',
      sectionColor: 'Réglages des Couleurs',
      contrastDark: 'Contraste Sombre',
      contrastLight: 'Contraste Clair',
      contrastHigh: 'Contraste Élevé',
      monochrome: 'Monochrome',
      saturationHigh: 'Saturation Haute',
      saturationLow: 'Saturation Basse',
      sectionOther: 'Autres',
      hideImages: 'Masquer les Images',
      cursorSize: 'Grand Curseur',
      stopAnimations: 'Arrêter les Animations',
      resetAll: 'Tout Réinitialiser',
      statement: 'Déclaration',
      statementTitle: 'Déclaration d\'Accessibilité',
      closeStatement: 'Fermer',
      close: 'Fermer',
      on: 'ON',
      off: 'OFF',
    },
    de: {
      panelTitle: 'Barrierefreiheit',
      sectionProfiles: 'Profile',
      profileAccessibility: 'Barrierefreiheit',
      profileVisuallyImpaired: 'Sehbehindert',
      profileAdhd: 'ADHS',
      profileCognitive: 'Kognitive Behinderung',
      profileDyslexia: 'Legasthenie',
      sectionContent: 'Inhaltseinstellungen',
      fontSize: 'Schriftgröße',
      readableFont: 'Lesbare Schrift',
      textAlign: 'Textausrichtung',
      alignLeft: 'Links',
      alignCenter: 'Mitte',
      alignRight: 'Rechts',
      lineHeight: 'Zeilenhöhe',
      letterSpacing: 'Zeichenabstand',
      sectionColor: 'Farbeinstellungen',
      contrastDark: 'Dunkler Kontrast',
      contrastLight: 'Heller Kontrast',
      contrastHigh: 'Hoher Kontrast',
      monochrome: 'Monochrom',
      saturationHigh: 'Hohe Sättigung',
      saturationLow: 'Niedrige Sättigung',
      sectionOther: 'Sonstiges',
      hideImages: 'Bilder Ausblenden',
      cursorSize: 'Großer Cursor',
      stopAnimations: 'Animationen Stoppen',
      resetAll: 'Alles Zurücksetzen',
      statement: 'Erklärung',
      statementTitle: 'Erklärung zur Barrierefreiheit',
      closeStatement: 'Schließen',
      close: 'Schließen',
      on: 'AN',
      off: 'AUS',
    },
    es: {
      panelTitle: 'Accesibilidad',
      sectionProfiles: 'Perfiles',
      profileAccessibility: 'Accesibilidad',
      profileVisuallyImpaired: 'Discapacidad Visual',
      profileAdhd: 'TDAH',
      profileCognitive: 'Discapacidad Cognitiva',
      profileDyslexia: 'Dislexia',
      sectionContent: 'Ajustes de Contenido',
      fontSize: 'Tamaño del Texto',
      readableFont: 'Fuente Legible',
      textAlign: 'Alineación del Texto',
      alignLeft: 'Izquierda',
      alignCenter: 'Centro',
      alignRight: 'Derecha',
      lineHeight: 'Altura de Línea',
      letterSpacing: 'Espaciado de Letras',
      sectionColor: 'Ajustes de Color',
      contrastDark: 'Contraste Oscuro',
      contrastLight: 'Contraste Claro',
      contrastHigh: 'Contraste Alto',
      monochrome: 'Monocromático',
      saturationHigh: 'Saturación Alta',
      saturationLow: 'Saturación Baja',
      sectionOther: 'Otros',
      hideImages: 'Ocultar Imágenes',
      cursorSize: 'Cursor Grande',
      stopAnimations: 'Detener Animaciones',
      resetAll: 'Restablecer Todo',
      statement: 'Declaración',
      statementTitle: 'Declaración de Accesibilidad',
      closeStatement: 'Cerrar',
      close: 'Cerrar',
      on: 'ON',
      off: 'OFF',
    },
  };

  /* ── Supported languages (cycle order) ── */
  var LANGS = ['it', 'en', 'fr', 'de', 'es'];

  /* ───────────────────────────────────────────
     ACCESSIBILITY PROFILES
  ─────────────────────────────────────────── */
  var PROFILES = {
    accessibility: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2"/><path d="M7 8.5h10"/><path d="M12 8.5v5"/><path d="M9 20l3-6.5 3 6.5"/></svg>',
      state: {
        fontSizeStep: 2,
        readableFont: true,
        lineHeight: 2,
        letterSpacing: 2,
        textAlign: '',
        contrastMode: '',
        monochrome: false,
        saturation: '',
        hideImages: false,
        bigCursor: false,
        stopAnimations: false,
      },
    },
    visuallyImpaired: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      state: {
        fontSizeStep: 4,
        readableFont: true,
        lineHeight: 2,
        letterSpacing: 1,
        textAlign: '',
        contrastMode: 'high',
        monochrome: false,
        saturation: '',
        hideImages: false,
        bigCursor: true,
        stopAnimations: false,
      },
    },
    adhd: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M21 3l-1.5 1.5"/><path d="M18 2l.5 2"/><path d="M22 6l-2 .5"/></svg>',
      state: {
        fontSizeStep: 1,
        readableFont: true,
        lineHeight: 2,
        letterSpacing: 1,
        textAlign: '',
        contrastMode: '',
        monochrome: false,
        saturation: 'low',
        hideImages: true,
        bigCursor: false,
        stopAnimations: true,
      },
    },
    cognitive: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
      state: {
        fontSizeStep: 2,
        readableFont: true,
        lineHeight: 3,
        letterSpacing: 2,
        textAlign: '',
        contrastMode: '',
        monochrome: false,
        saturation: 'low',
        hideImages: false,
        bigCursor: false,
        stopAnimations: true,
      },
    },
    dyslexia: {
      icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h13"/><path d="M8 3v4"/><path d="M14 3v4"/></svg>',
      state: {
        fontSizeStep: 1,
        readableFont: true,
        lineHeight: 3,
        letterSpacing: 3,
        textAlign: 'left',
        contrastMode: '',
        monochrome: false,
        saturation: '',
        hideImages: false,
        bigCursor: false,
        stopAnimations: true,
      },
    },
  };

  /* ───────────────────────────────────────────
     DEFAULT CONFIG
  ─────────────────────────────────────────── */
  var defaults = {
    position: 'bottom-right', // bottom-right | bottom-left | bottom-center | top-right | top-left
    buttonColor: '#1a56db',
    buttonSize: 56,
    buttonIcon: 'default', // 'default' or SVG string
    lang: navigator.languages
      .map(function (l) { return l.split('-')[0]; })
      .find(function (l) { return LANGS.indexOf(l) !== -1; }) || 'en',
    contactEmail: '',  // REQUIRED: at least one of contactEmail / contactPhone
    contactPhone: '',  // REQUIRED: at least one of contactEmail / contactPhone
    statementText: null, // auto-generated from contacts if not provided
    callback: null, // function(action, state) — called on every UI interaction
    zIndex: 999999,
  };

  /* ── Build default statement from contact info ── */
  function buildDefaultStatement(cfg) {
    var email = cfg.contactEmail || '';
    var phone = cfg.contactPhone || '';

    /* Build contact lines per language */
    var phoneLabels = { it: 'Telefono', en: 'Phone', fr: 'Téléphone', de: 'Telefon', es: 'Teléfono' };
    var contacts = {};
    for (var l = 0; l < LANGS.length; l++) {
      var lang = LANGS[l];
      var c = '';
      if (email) c += 'Email: <strong>' + email + '</strong>';
      if (email && phone) c += '<br>';
      if (phone) c += phoneLabels[lang] + ': <strong>' + phone + '</strong>';
      contacts[lang] = c;
    }

    return {
      it: '<p>Questo sito è stato progettato per essere accessibile al maggior numero possibile di utenti, in conformità con le linee guida WCAG 2.1 livello AA e con il D.Lgs. 82/2022 (European Accessibility Act).</p>' +
        '<p><strong>Contatti per segnalazioni sull\'accessibilità:</strong><br>' + contacts.it + '</p>' +
        '<p>In caso di risposta mancata o insoddisfacente entro 30 giorni, è possibile rivolgersi al Difensore Civico per il Digitale presso AgID.</p>',
      en: '<p>This website has been designed to be accessible to as many users as possible, in compliance with WCAG 2.1 Level AA guidelines and the European Accessibility Act (D.Lgs. 82/2022).</p>' +
        '<p><strong>Accessibility contacts:</strong><br>' + contacts.en + '</p>' +
        '<p>If no satisfactory response is received within 30 days, you may contact the Digital Civic Defender at AgID.</p>',
      fr: '<p>Ce site a été conçu pour être accessible au plus grand nombre d\'utilisateurs, conformément aux directives WCAG 2.1 niveau AA et à l\'European Accessibility Act (D.Lgs. 82/2022).</p>' +
        '<p><strong>Contacts pour signalements sur l\'accessibilité :</strong><br>' + contacts.fr + '</p>' +
        '<p>En cas de réponse absente ou insatisfaisante dans un délai de 30 jours, vous pouvez contacter le Défenseur Civique du Numérique auprès de l\'AgID.</p>',
      de: '<p>Diese Website wurde so gestaltet, dass sie für möglichst viele Nutzer zugänglich ist, in Übereinstimmung mit den WCAG 2.1 Level AA Richtlinien und dem European Accessibility Act (D.Lgs. 82/2022).</p>' +
        '<p><strong>Kontakte für Barrierefreiheit-Meldungen:</strong><br>' + contacts.de + '</p>' +
        '<p>Bei fehlender oder unbefriedigender Antwort innerhalb von 30 Tagen können Sie sich an den Digitalen Bürgerbeauftragten bei AgID wenden.</p>',
      es: '<p>Este sitio web ha sido diseñado para ser accesible al mayor número posible de usuarios, en conformidad con las directrices WCAG 2.1 nivel AA y el European Accessibility Act (D.Lgs. 82/2022).</p>' +
        '<p><strong>Contactos para reportes de accesibilidad:</strong><br>' + contacts.es + '</p>' +
        '<p>En caso de respuesta ausente o insatisfactoria en un plazo de 30 días, puede dirigirse al Defensor Cívico Digital en AgID.</p>',
    };
  }

  /* ───────────────────────────────────────────
     MERGE CONFIG
  ─────────────────────────────────────────── */
  function mergeDeep(target, source) {
    var out = Object.assign({}, target);
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (
          source[key] &&
          typeof source[key] === 'object' &&
          !Array.isArray(source[key])
        ) {
          out[key] = mergeDeep(target[key] || {}, source[key]);
        } else {
          out[key] = source[key];
        }
      }
    }
    return out;
  }

  /* ───────────────────────────────────────────
     ICONS (inline SVG)
  ─────────────────────────────────────────── */
  var icons = {
    accessibility:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2"/><path d="M7 8.5h10"/><path d="M12 8.5v5"/><path d="M9 20l3-6.5 3 6.5"/></svg>',
    close:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    reset:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    alignLeft:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',
    alignCenter:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    alignRight:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>',
  };

  /* ───────────────────────────────────────────
     LOCAL STORAGE KEY
  ─────────────────────────────────────────── */
  var STORAGE_KEY = 'asset-accessibility-prefs';

  /* ───────────────────────────────────────────
     MAIN CLASS
  ─────────────────────────────────────────── */
  function AssetAccessibility(mergedConfig) {
    this.cfg = mergedConfig;
    this.lang = this.cfg.lang;
    this.isOpen = false;
    this.statementOpen = false;

    // Default state
    this.state = {
      activeProfile: '', // '' | accessibility | visuallyImpaired | adhd | cognitive | dyslexia
      fontSizeStep: 0, // -3 to +5
      readableFont: false,
      textAlign: '', // '' | left | center | right
      lineHeight: 0, // 0 to 5 steps (+20% each)
      letterSpacing: 0, // 0 to 5 steps
      contrastMode: '', // '' | dark | light | high
      monochrome: false,
      saturation: '', // '' | high | low
      hideImages: false,
      bigCursor: false,
      stopAnimations: false,
    };

    // Restore persisted preferences
    this._loadState();

    this._injectStyles();
    this._buildDOM();
    this._applyState();
    this._bindEvents();
  }

  var proto = AssetAccessibility.prototype;

  /* ─── t() helper ─── */
  proto.t = function (key) {
    return (i18n[this.lang] && i18n[this.lang][key]) || key;
  };

  /* ───────────────────────────────────────────
     CSS
  ─────────────────────────────────────────── */
  proto._injectStyles = function () {
    var cfg = this.cfg;
    var pos = cfg.position;
    var isCenter = pos === 'bottom-center';

    var btnBottom = pos.indexOf('bottom') > -1 ? '20px' : 'auto';
    var btnTop = pos.indexOf('top') > -1 ? '20px' : 'auto';
    var btnRight = isCenter ? 'auto' : (pos.indexOf('right') > -1 ? '20px' : 'auto');
    var btnLeft = isCenter ? '50%' : (pos.indexOf('left') > -1 ? '20px' : 'auto');
    var btnTransform = isCenter ? 'translateX(-50%)' : 'none';

    var panelBottom = pos.indexOf('bottom') > -1 ? (cfg.buttonSize + 30) + 'px' : 'auto';
    var panelTop = pos.indexOf('top') > -1 ? (cfg.buttonSize + 30) + 'px' : 'auto';
    var panelRight = isCenter ? 'auto' : (pos.indexOf('right') > -1 ? '20px' : 'auto');
    var panelLeft = isCenter ? '50%' : (pos.indexOf('left') > -1 ? '20px' : 'auto');
    var panelTransform = isCenter ? 'translateX(-50%)' : 'none';

    var css = '\n' +
      '/* ===== Asset Accessibility ===== */\n' +
      '#aa-trigger{position:fixed;bottom:' + btnBottom + ';top:' + btnTop + ';right:' + btnRight + ';left:' + btnLeft + ';transform:' + btnTransform + ';width:' + cfg.buttonSize + 'px;height:' + cfg.buttonSize + 'px;border-radius:50%;background:' + cfg.buttonColor + ';color:#fff;border:none;cursor:pointer;z-index:' + cfg.zIndex + ';display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.25);transition:transform .2s ease,box-shadow .2s ease;padding:0;}\n' +
      '#aa-trigger:hover{transform:' + (isCenter ? 'translateX(-50%) ' : '') + 'scale(1.08);box-shadow:0 6px 24px rgba(0,0,0,.35);}\n' +
      '#aa-trigger:focus-visible{outline:3px solid ' + cfg.buttonColor + ';outline-offset:3px;}\n' +
      '#aa-trigger svg{width:28px;height:28px;}\n' +
      '#aa-panel{position:fixed;bottom:' + panelBottom + ';top:' + panelTop + ';right:' + panelRight + ';left:' + panelLeft + ';transform:' + panelTransform + ';width:320px;max-width:calc(100vw - 40px);max-height:50vh;background:#fff;border-radius:16px;z-index:' + (cfg.zIndex + 1) + ';box-shadow:0 12px 48px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}\n' +
      '#aa-panel.aa-visible{display:flex;animation:aa-slideIn .25s ease;}\n' +
      '@keyframes aa-slideIn{from{opacity:0;transform:' + (isCenter ? 'translateX(-50%) ' : '') + 'translateY(12px);}to{opacity:1;transform:' + (isCenter ? 'translateX(-50%) ' : '') + 'translateY(0);}}\n' +
      '#aa-panel *{box-sizing:border-box;margin:0;}\n' +

      /* Header */
      '.aa-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #e5e7eb;flex-shrink:0;background:#f8f9fb;}\n' +
      '.aa-header-title{font-size:15px;font-weight:700;color:#111827;display:flex;align-items:center;gap:8px;}\n' +
      '.aa-header-title svg{width:20px;height:20px;color:' + cfg.buttonColor + ';}\n' +
      '.aa-header-actions{display:flex;align-items:center;gap:4px;}\n' +
      '.aa-hdr-btn{width:32px;height:32px;border-radius:8px;border:none;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6b7280;transition:all .15s;}\n' +
      '.aa-hdr-btn:hover{background:#e5e7eb;color:#111827;}\n' +
      '.aa-hdr-btn:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:1px;}\n' +
      '.aa-hdr-btn svg{width:16px;height:16px;}\n' +
      '.aa-hdr-btn.aa-lang-btn{font-size:11px;font-weight:700;width:auto;padding:0 8px;text-transform:uppercase;color:#6b7280;}\n' +
      '.aa-hdr-btn.aa-lang-btn:hover{color:' + cfg.buttonColor + ';}\n' +

      /* Scrollable body */
      '.aa-body{overflow-y:auto;padding:0rem 0.5rem;flex:1;}\n' +
      '.aa-body::-webkit-scrollbar{width:5px;}\n' +
      '.aa-body::-webkit-scrollbar-track{background:transparent;}\n' +
      '.aa-body::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:10px;}\n' +

      /* Section */
      '.aa-section-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#9ca3af;padding:10px 0 4px;}\n' +

      /* Row */
      '.aa-row{display:flex;align-items:center;justify-content:space-between;padding:0;min-height:40px;}\n' +
      '.aa-row-label{font-size:13px;color:#374151;font-weight:500;}\n' +
      '.aa-row-controls{display:flex;align-items:center;gap:4px;}\n' +

      /* Stepper buttons (+ / -) */
      '.aa-step-btn{width:30px;height:30px;border-radius:8px;border:1px solid #d1d5db;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#374151;transition:all .15s;}\n' +
      '.aa-step-btn:hover{border-color:' + cfg.buttonColor + ';color:' + cfg.buttonColor + ';background:#eff6ff;}\n' +
      '.aa-step-btn:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:1px;}\n' +
      '.aa-step-btn svg{width:14px;height:14px;}\n' +
      '.aa-step-value{min-width:34px;text-align:center;font-size:12px;font-weight:700;color:#111827;}\n' +

      /* Toggle */
      '.aa-toggle{position:relative;width:44px;height:24px;border-radius:12px;background:#d1d5db;cursor:pointer;border:none;transition:background .2s;flex-shrink:0;}\n' +
      '.aa-toggle::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .2s;box-shadow:0 1px 3px rgba(0,0,0,.15);}\n' +
      '.aa-toggle.aa-on{background:' + cfg.buttonColor + ';}\n' +
      '.aa-toggle.aa-on::after{transform:translateX(20px);}\n' +
      '.aa-toggle:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:2px;}\n' +

      /* Align buttons */
      '.aa-align-group{display:flex;gap:2px;}\n' +
      '.aa-align-btn{width:32px;height:30px;border-radius:6px;border:1px solid #d1d5db;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6b7280;transition:all .15s;}\n' +
      '.aa-align-btn:hover{border-color:' + cfg.buttonColor + ';color:' + cfg.buttonColor + ';}\n' +
      '.aa-align-btn.aa-active{background:' + cfg.buttonColor + ';border-color:' + cfg.buttonColor + ';color:#fff;}\n' +
      '.aa-align-btn:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:1px;}\n' +
      '.aa-align-btn svg{width:16px;height:16px;}\n' +

      /* Color mode pills */
      '.aa-pills{display:flex;flex-wrap:wrap;gap:6px;padding:4px 0 8px;}\n' +
      '.aa-pill{font-size:11px;font-weight:600;padding:6px 12px;border-radius:20px;border:1px solid #d1d5db;background:#fff;color:#374151;cursor:pointer;transition:all .15s;white-space:nowrap;}\n' +
      '.aa-pill:hover{border-color:' + cfg.buttonColor + ';color:' + cfg.buttonColor + ';}\n' +
      '.aa-pill.aa-active{background:' + cfg.buttonColor + ';border-color:' + cfg.buttonColor + ';color:#fff;}\n' +
      '.aa-pill:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:1px;}\n' +

      /* Profile cards */
      '.aa-profiles{display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:4px 0 8px;}\n' +
      '.aa-profile-card{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 6px;border-radius:10px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;transition:all .15s;text-align:center;}\n' +
      '.aa-profile-card:hover{border-color:' + cfg.buttonColor + ';background:#f0f5ff;}\n' +
      '.aa-profile-card.aa-active{background:' + cfg.buttonColor + ';border-color:' + cfg.buttonColor + ';color:#fff;}\n' +
      '.aa-profile-card.aa-active svg{stroke:#fff;}\n' +
      '.aa-profile-card:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:1px;}\n' +
      '.aa-profile-card svg{width:22px;height:22px;color:#6b7280;flex-shrink:0;}\n' +
      '.aa-profile-card.aa-active svg{color:#fff;}\n' +
      '.aa-profile-card-label{font-size:10px;font-weight:600;line-height:1.2;color:#374151;}\n' +
      '.aa-profile-card.aa-active .aa-profile-card-label{color:#fff;}\n' +

      /* Footer */
      '.aa-footer{border-top:1px solid #e5e7eb;padding:10px 16px;display:flex;gap:8px;flex-shrink:0;background:#f8f9fb;}\n' +
      '.aa-footer-btn{flex:1;padding:8px;border-radius:10px;border:none;cursor:pointer;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .15s;}\n' +
      '.aa-footer-btn:focus-visible{outline:2px solid ' + cfg.buttonColor + ';outline-offset:1px;}\n' +
      '.aa-footer-btn svg{width:14px;height:14px;}\n' +
      '.aa-btn-reset{background:#fee2e2;color:#dc2626;}\n' +
      '.aa-btn-reset:hover{background:#fecaca;}\n' +
      '.aa-btn-statement{background:#e0e7ff;color:' + cfg.buttonColor + ';}\n' +
      '.aa-btn-statement:hover{background:#c7d2fe;}\n' +

      /* Statement overlay */
      '#aa-statement-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:' + (cfg.zIndex + 10) + ';display:none;align-items:center;justify-content:center;padding:20px;}\n' +
      '#aa-statement-overlay.aa-visible{display:flex;animation:aa-fadeIn .2s ease;}\n' +
      '@keyframes aa-fadeIn{from{opacity:0;}to{opacity:1;}}\n' +
      '#aa-statement-box{background:#fff;border-radius:16px;max-width:560px;width:100%;max-height:70vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.25);}\n' +
      '#aa-statement-box .aa-stmt-header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e5e7eb;}\n' +
      '#aa-statement-box .aa-stmt-header h3{font-size:16px;font-weight:700;color:#111827;}\n' +
      '#aa-statement-box .aa-stmt-body{padding:20px;overflow-y:auto;font-size:14px;line-height:1.7;color:#374151;}\n' +
      '#aa-statement-box .aa-stmt-body p{margin-bottom:12px;}\n' +

      /* Utility classes applied to <html> */
      '.aa-readable-font,.aa-readable-font *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-box):not(#aa-statement-box *):not(.fa):not(.fas):not(.far):not(.fal):not(.fat):not(.fad):not(.fab):not(.fa-brands):not(.fa-solid):not(.fa-regular):not(.fa-light):not(.fa-thin):not(.fa-duotone):not(.material-icons):not(.material-symbols-outlined){font-family:Arial,Helvetica,sans-serif!important;}\n' +
      '.aa-align-left,.aa-align-left *:not(#aa-panel):not(#aa-panel *){text-align:left!important;}\n' +
      '.aa-align-center,.aa-align-center *:not(#aa-panel):not(#aa-panel *){text-align:center!important;}\n' +
      '.aa-align-right,.aa-align-right *:not(#aa-panel):not(#aa-panel *){text-align:right!important;}\n' +
      '.aa-hide-images img:not(#aa-panel img){opacity:0!important;}\n' +
      '.aa-hide-images *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *){background-image:none!important;}\n' +
      '.aa-stop-animations,.aa-stop-animations *{animation:none!important;transition:none!important;}\n' +
      '.aa-big-cursor,.aa-big-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'white\' stroke-width=\'1\'%3E%3Cpath d=\'M5 3l14 8-6 1.5L10 19z\'/%3E%3C/svg%3E") 4 2,auto!important;}\n' +

      /* Contrast themes */
      '.aa-contrast-dark:not(#aa-panel):not(#aa-panel *){background-color:#1a1a2e!important;color:#e0e0e0!important;}\n' +
      '.aa-contrast-dark a:not(#aa-panel a){color:#7eb8ff!important;}\n' +
      'html.aa-contrast-dark{background:#1a1a2e!important;}\n' +
      'html.aa-contrast-dark body{background:#1a1a2e!important;color:#e0e0e0!important;}\n' +
      'html.aa-contrast-dark body *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *){background-color:transparent!important;color:#e0e0e0!important;border-color:#444!important;}\n' +
      'html.aa-contrast-dark a:not(#aa-panel a){color:#7eb8ff!important;}\n' +

      'html.aa-contrast-light{background:#fff!important;}\n' +
      'html.aa-contrast-light body{background:#fff!important;color:#111!important;}\n' +
      'html.aa-contrast-light body *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *){background-color:transparent!important;color:#111!important;border-color:#ccc!important;}\n' +

      'html.aa-contrast-high{background:#000!important;}\n' +
      'html.aa-contrast-high body{background:#000!important;color:#ff0!important;}\n' +
      'html.aa-contrast-high body *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *){background-color:transparent!important;color:#ff0!important;border-color:#ff0!important;}\n' +
      'html.aa-contrast-high a:not(#aa-panel a){color:#0ff!important;}\n' +

      'html.aa-monochrome body>*:not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay){filter:grayscale(100%)!important;}\n' +
      'html.aa-saturation-high body>*:not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay){filter:saturate(200%)!important;}\n' +
      'html.aa-saturation-low body>*:not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay){filter:saturate(40%)!important;}\n' +

      '/* end widget styles */\n';

    var style = document.createElement('style');
    style.setAttribute('data-aw', 'true');
    style.textContent = css;
    document.head.appendChild(style);
    this._styleEl = style;
  };

  /* ───────────────────────────────────────────
     DOM
  ─────────────────────────────────────────── */
  proto._buildDOM = function () {
    var self = this;

    /* ── Trigger Button ── */
    var btn = document.createElement('button');
    btn.id = 'aa-trigger';
    btn.setAttribute('aria-label', this.t('panelTitle'));
    btn.setAttribute('title', this.t('panelTitle'));
    btn.innerHTML =
      this.cfg.buttonIcon === 'default'
        ? icons.accessibility
        : this.cfg.buttonIcon;
    document.body.appendChild(btn);
    this._btn = btn;

    /* ── Panel ── */
    var panel = document.createElement('div');
    panel.id = 'aa-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', this.t('panelTitle'));
    document.body.appendChild(panel);
    this._panel = panel;

    /* ── Statement Overlay ── */
    var stmtOv = document.createElement('div');
    stmtOv.id = 'aa-statement-overlay';
    stmtOv.innerHTML =
      '<div id="aa-statement-box">' +
      '<div class="aa-stmt-header"><h3 class="aa-stmt-title">' +
      this.t('statementTitle') +
      '</h3><button class="aa-hdr-btn aa-stmt-close" aria-label="' +
      this.t('close') +
      '">' +
      icons.close +
      '</button></div>' +
      '<div class="aa-stmt-body"></div></div>';
    document.body.appendChild(stmtOv);
    this._stmtOverlay = stmtOv;

    this._renderPanel();
  };

  /* ─── Render panel contents ─── */
  proto._renderPanel = function () {
    var self = this;
    var s = this.state;

    var html = '';

    /* Header */
    html +=
      '<div class="aa-header">' +
      '<span class="aa-header-title">' +
      icons.accessibility +
      ' ' +
      this.t('panelTitle') +
      '</span>' +
      '<div class="aa-header-actions">' +
      '<button class="aa-hdr-btn aa-lang-btn" data-action="toggleLang">' +
      LANGS[(LANGS.indexOf(this.lang) + 1) % LANGS.length].toUpperCase() +
      '</button>' +
      '<button class="aa-hdr-btn" data-action="closePanel" aria-label="' +
      this.t('close') +
      '">' +
      icons.close +
      '</button>' +
      '</div></div>';

    /* Body */
    html += '<div class="aa-body">';

    /* ─ Profiles section ─ */
    html += '<div class="aa-section-label">' + this.t('sectionProfiles') + '</div>';
    html += '<div class="aa-profiles">';
    var profileKeys = ['accessibility', 'visuallyImpaired', 'adhd', 'cognitive', 'dyslexia'];
    var profileI18nKeys = ['profileAccessibility', 'profileVisuallyImpaired', 'profileAdhd', 'profileCognitive', 'profileDyslexia'];
    for (var p = 0; p < profileKeys.length; p++) {
      var pKey = profileKeys[p];
      var isActive = s.activeProfile === pKey;
      html +=
        '<button class="aa-profile-card' + (isActive ? ' aa-active' : '') +
        '" data-action="applyProfile" data-value="' + pKey + '" aria-pressed="' + isActive + '">' +
        PROFILES[pKey].icon +
        '<span class="aa-profile-card-label">' + this.t(profileI18nKeys[p]) + '</span>' +
        '</button>';
    }
    html += '</div>';

    /* ─ Content section ─ */
    html +=
      '<div class="aa-section-label">' + this.t('sectionContent') + '</div>';

    // Font size stepper
    html += this._rowStepper('fontSize', s.fontSizeStep, '%');

    // Readable font toggle
    html += this._rowToggle('readableFont', s.readableFont);

    // Text align
    html +=
      '<div class="aa-row"><span class="aa-row-label">' +
      this.t('textAlign') +
      '</span><div class="aa-align-group">' +
      '<button class="aa-align-btn' +
      (s.textAlign === 'left' ? ' aa-active' : '') +
      '" data-action="align" data-value="left" aria-label="' +
      this.t('alignLeft') +
      '">' +
      icons.alignLeft +
      '</button>' +
      '<button class="aa-align-btn' +
      (s.textAlign === 'center' ? ' aa-active' : '') +
      '" data-action="align" data-value="center" aria-label="' +
      this.t('alignCenter') +
      '">' +
      icons.alignCenter +
      '</button>' +
      '<button class="aa-align-btn' +
      (s.textAlign === 'right' ? ' aa-active' : '') +
      '" data-action="align" data-value="right" aria-label="' +
      this.t('alignRight') +
      '">' +
      icons.alignRight +
      '</button>' +
      '</div></div>';

    // Line height stepper
    html += this._rowStepper('lineHeight', s.lineHeight, '%');

    // Letter spacing stepper
    html += this._rowStepper('letterSpacing', s.letterSpacing, '%');

    /* ─ Color section ─ */
    html +=
      '<div class="aa-section-label">' + this.t('sectionColor') + '</div>';
    html += '<div class="aa-pills">';
    var modes = ['contrastDark', 'contrastLight', 'contrastHigh'];
    var modeVals = ['dark', 'light', 'high'];
    for (var i = 0; i < modes.length; i++) {
      html +=
        '<button class="aa-pill' +
        (s.contrastMode === modeVals[i] ? ' aa-active' : '') +
        '" data-action="contrast" data-value="' +
        modeVals[i] +
        '">' +
        this.t(modes[i]) +
        '</button>';
    }
    html +=
      '<button class="aa-pill' +
      (s.monochrome ? ' aa-active' : '') +
      '" data-action="toggleMono">' +
      this.t('monochrome') +
      '</button>';
    html +=
      '<button class="aa-pill' +
      (s.saturation === 'high' ? ' aa-active' : '') +
      '" data-action="saturation" data-value="high">' +
      this.t('saturationHigh') +
      '</button>';
    html +=
      '<button class="aa-pill' +
      (s.saturation === 'low' ? ' aa-active' : '') +
      '" data-action="saturation" data-value="low">' +
      this.t('saturationLow') +
      '</button>';
    html += '</div>';

    /* ─ Other section ─ */
    html +=
      '<div class="aa-section-label">' + this.t('sectionOther') + '</div>';
    html += this._rowToggle('hideImages', s.hideImages);
    html += this._rowToggle('cursorSize', s.bigCursor);
    html += this._rowToggle('stopAnimations', s.stopAnimations);

    html += '</div>'; // .aa-body

    /* Footer */
    html +=
      '<div class="aa-footer">' +
      '<button class="aa-footer-btn aa-btn-reset" data-action="reset">' +
      icons.reset +
      ' ' +
      this.t('resetAll') +
      '</button>' +
      '<button class="aa-footer-btn aa-btn-statement" data-action="showStatement">' +
      icons.doc +
      ' ' +
      this.t('statement') +
      '</button>' +
      '</div>';

    /* Preserve scroll position */
    var body = this._panel.querySelector('.aa-body');
    var scrollPos = body ? body.scrollTop : 0;

    this._panel.innerHTML = html;

    /* Restore scroll position */
    var newBody = this._panel.querySelector('.aa-body');
    if (newBody) newBody.scrollTop = scrollPos;
  };

  /* ─── Helper: stepper row ─── */
  proto._rowStepper = function (key, value, suffix) {
    var display;
    if (key === 'fontSize') {
      display = (value >= 0 ? '+' : '') + value * 10 + suffix;
    } else {
      display = '+' + value * 20 + suffix;
    }
    return (
      '<div class="aa-row"><span class="aa-row-label">' +
      this.t(key) +
      '</span><div class="aa-row-controls">' +
      '<button class="aa-step-btn" data-action="step" data-key="' +
      key +
      '" data-dir="-1">' +
      icons.minus +
      '</button>' +
      '<span class="aa-step-value">' +
      display +
      '</span>' +
      '<button class="aa-step-btn" data-action="step" data-key="' +
      key +
      '" data-dir="1">' +
      icons.plus +
      '</button></div></div>'
    );
  };

  /* ─── Helper: toggle row ─── */
  proto._rowToggle = function (key, active) {
    var stateKey;
    if (key === 'readableFont') stateKey = 'readableFont';
    else if (key === 'hideImages') stateKey = 'hideImages';
    else if (key === 'cursorSize') stateKey = 'bigCursor';
    else if (key === 'stopAnimations') stateKey = 'stopAnimations';
    return (
      '<div class="aa-row"><span class="aa-row-label">' +
      this.t(key) +
      '</span>' +
      '<button class="aa-toggle' +
      (active ? ' aa-on' : '') +
      '" data-action="toggle" data-key="' +
      stateKey +
      '" role="switch" aria-checked="' +
      !!active +
      '" aria-label="' +
      this.t(key) +
      '"></button></div>'
    );
  };

  /* ───────────────────────────────────────────
     CALLBACK
  ─────────────────────────────────────────── */
  proto._fireCallback = function (action, detail) {
    if (typeof this.cfg.callback === 'string') {
      this.cfg.callback = window[this.cfg.callback]
    }
    if (typeof this.cfg.callback !== 'function') return;
    try {
      this.cfg.callback({
        action: action,
        detail: detail || null,
        state: JSON.parse(JSON.stringify(this.state)),
        lang: this.lang,
      });
    } catch (e) {
      console.warn('[Asset Accessibility] Callback error:', e);
    }
  };

  /* ───────────────────────────────────────────
     EVENTS
  ─────────────────────────────────────────── */
  proto._bindEvents = function () {
    var self = this;

    this._btn.addEventListener('click', function () {
      self.isOpen ? self._closePanel() : self._openPanel();
      self._fireCallback(self.isOpen ? 'openPanel' : 'closePanel');
    });

    this._panel.addEventListener('click', function (e) {
      var target = e.target.closest('[data-action]');
      if (!target) return;
      var action = target.getAttribute('data-action');

      switch (action) {
        case 'closePanel':
          self._closePanel();
          break;
        case 'toggleLang':
          var idx = LANGS.indexOf(self.lang);
          self.lang = LANGS[(idx + 1) % LANGS.length];
          self._saveState();
          self._renderPanel();
          self._updateStatementOverlay();
          break;
        case 'step':
          self._handleStep(
            target.getAttribute('data-key'),
            parseInt(target.getAttribute('data-dir'))
          );
          break;
        case 'toggle':
          self._handleToggle(target.getAttribute('data-key'));
          break;
        case 'align':
          self._handleAlign(target.getAttribute('data-value'));
          break;
        case 'contrast':
          self._handleContrast(target.getAttribute('data-value'));
          break;
        case 'toggleMono':
          self.state.activeProfile = '';
          self.state.monochrome = !self.state.monochrome;
          if (self.state.monochrome) self.state.saturation = '';
          self._applyState();
          self._renderPanel();
          break;
        case 'saturation':
          self.state.activeProfile = '';
          var val = target.getAttribute('data-value');
          self.state.saturation = self.state.saturation === val ? '' : val;
          if (self.state.saturation) self.state.monochrome = false;
          self._applyState();
          self._renderPanel();
          break;
        case 'reset':
          self._resetAll();
          break;
        case 'applyProfile':
          self._applyProfile(target.getAttribute('data-value'));
          break;
        case 'showStatement':
          self._showStatement();
          break;
      }

      /* Fire callback for every panel interaction */
      self._fireCallback(action, {
        key: target.getAttribute('data-key') || undefined,
        value: target.getAttribute('data-value') || undefined,
      });
    });

    /* Statement overlay */
    this._stmtOverlay.addEventListener('click', function (e) {
      if (
        e.target === self._stmtOverlay ||
        e.target.closest('.aa-stmt-close')
      ) {
        self._closeStatement();
        self._fireCallback('closeStatement');
      }
    });

    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (self.statementOpen) {
          self._closeStatement();
          self._fireCallback('closeStatement');
        } else if (self.isOpen) {
          self._closePanel();
          self._fireCallback('closePanel');
        }
      }
    });
  };

  /* ─── Action handlers ─── */
  proto._handleStep = function (key, dir) {
    this.state.activeProfile = '';
    if (key === 'fontSize') {
      this.state.fontSizeStep = Math.max(
        -3,
        Math.min(5, this.state.fontSizeStep + dir)
      );
    } else if (key === 'lineHeight') {
      this.state.lineHeight = Math.max(
        0,
        Math.min(5, this.state.lineHeight + dir)
      );
    } else if (key === 'letterSpacing') {
      this.state.letterSpacing = Math.max(
        0,
        Math.min(5, this.state.letterSpacing + dir)
      );
    }
    this._applyState();
    this._renderPanel();
  };

  proto._handleToggle = function (key) {
    this.state.activeProfile = '';
    this.state[key] = !this.state[key];
    this._applyState();
    this._renderPanel();
  };

  proto._handleAlign = function (val) {
    this.state.activeProfile = '';
    this.state.textAlign = this.state.textAlign === val ? '' : val;
    this._applyState();
    this._renderPanel();
  };

  proto._handleContrast = function (val) {
    this.state.activeProfile = '';
    this.state.contrastMode = this.state.contrastMode === val ? '' : val;
    this._applyState();
    this._renderPanel();
  };

  proto._applyProfile = function (key) {
    /* Toggle off if same profile is already active */
    if (this.state.activeProfile === key) {
      this._resetAll();
      return;
    }
    var profile = PROFILES[key];
    if (!profile) return;

    /* Copy profile state into current state */
    var ps = profile.state;
    for (var k in ps) {
      if (ps.hasOwnProperty(k)) {
        this.state[k] = ps[k];
      }
    }
    this.state.activeProfile = key;
    this._applyState();
    this._renderPanel();
  };

  /* ───────────────────────────────────────────
     PERSISTENCE (localStorage)
  ─────────────────────────────────────────── */
  proto._saveState = function () {
    try {
      var data = { state: this.state, lang: this.lang };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      /* localStorage non disponibile o pieno — silenzio */
    }
  };

  proto._loadState = function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data && data.state) {
        for (var key in this.state) {
          if (this.state.hasOwnProperty(key) && data.state.hasOwnProperty(key)) {
            this.state[key] = data.state[key];
          }
        }
      }
      if (data && data.lang) {
        this.lang = data.lang;
      }
    } catch (e) {
      /* JSON malformato o localStorage non disponibile — usa defaults */
    }
  };

  proto._clearState = function () {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* silenzio */
    }
  };

  /* ───────────────────────────────────────────
     APPLY STATE TO PAGE
  ─────────────────────────────────────────── */
  proto._applyState = function () {
    var html = document.documentElement;
    var s = this.state;

    /* Font size */
    if (s.fontSizeStep !== 0) {
      var pct = 100 + s.fontSizeStep * 10;
      html.style.fontSize = pct + '%';
    } else {
      html.style.fontSize = '';
    }

    /* Line height */
    if (s.lineHeight > 0) {
      document.body.style.lineHeight = 1.5 + s.lineHeight * 0.3 + '';
    } else {
      document.body.style.lineHeight = '';
    }

    /* Letter spacing */
    if (s.letterSpacing > 0) {
      document.body.style.letterSpacing = s.letterSpacing * 0.5 + 'px';
    } else {
      document.body.style.letterSpacing = '';
    }

    /* Class toggles */
    var classes = {
      'aa-readable-font': s.readableFont,
      'aa-align-left': s.textAlign === 'left',
      'aa-align-center': s.textAlign === 'center',
      'aa-align-right': s.textAlign === 'right',
      'aa-contrast-dark': s.contrastMode === 'dark',
      'aa-contrast-light': s.contrastMode === 'light',
      'aa-contrast-high': s.contrastMode === 'high',
      'aa-monochrome': s.monochrome,
      'aa-saturation-high': s.saturation === 'high',
      'aa-saturation-low': s.saturation === 'low',
      'aa-hide-images': s.hideImages,
      'aa-big-cursor': s.bigCursor,
      'aa-stop-animations': s.stopAnimations,
    };

    for (var cls in classes) {
      if (classes[cls]) {
        html.classList.add(cls);
      } else {
        html.classList.remove(cls);
      }
    }

    /* Persist */
    this._saveState();
  };

  /* ───────────────────────────────────────────
     PANEL OPEN / CLOSE
  ─────────────────────────────────────────── */
  proto._openPanel = function () {
    this._panel.classList.add('aa-visible');
    this.isOpen = true;
    this._btn.setAttribute('aria-expanded', 'true');
  };
  proto._closePanel = function () {
    this._panel.classList.remove('aa-visible');
    this.isOpen = false;
    this._btn.setAttribute('aria-expanded', 'false');
  };

  /* ───────────────────────────────────────────
     STATEMENT
  ─────────────────────────────────────────── */
  proto._showStatement = function () {
    this._updateStatementOverlay();
    this._stmtOverlay.classList.add('aa-visible');
    this.statementOpen = true;
  };
  proto._closeStatement = function () {
    this._stmtOverlay.classList.remove('aa-visible');
    this.statementOpen = false;
  };
  proto._updateStatementOverlay = function () {
    var titleEl = this._stmtOverlay.querySelector('.aa-stmt-title');
    var bodyEl = this._stmtOverlay.querySelector('.aa-stmt-body');
    var st = this.cfg.statementText || {};
    titleEl.textContent = this.t('statementTitle');
    bodyEl.innerHTML = st[this.lang] || st.en || st.it || '';
  };

  /* ───────────────────────────────────────────
     RESET
  ─────────────────────────────────────────── */
  proto._resetAll = function () {
    this.state = {
      activeProfile: '',
      fontSizeStep: 0,
      readableFont: false,
      textAlign: '',
      lineHeight: 0,
      letterSpacing: 0,
      contrastMode: '',
      monochrome: false,
      saturation: '',
      hideImages: false,
      bigCursor: false,
      stopAnimations: false,
    };
    this._clearState();
    this._applyState();
    this._renderPanel();
  };

  /* ───────────────────────────────────────────
     INIT ON DOM READY
  ─────────────────────────────────────────── */
  function init() {
    var userCfg = window.AssetAccessibilityConfig || {};

    /* ── Validate required contact fields ── */
    var hasEmail = userCfg.contactEmail && typeof userCfg.contactEmail === 'string' && userCfg.contactEmail.trim() !== '';
    var hasPhone = userCfg.contactPhone && typeof userCfg.contactPhone === 'string' && userCfg.contactPhone.trim() !== '';

    if (!hasEmail && !hasPhone) {
      console.error(
        '[Asset Accessibility] ERRORE: configurazione mancante.\n' +
        'È obbligatorio specificare almeno uno tra "contactEmail" e "contactPhone" in AssetAccessibilityConfig.\n\n' +
        'Esempio:\n' +
        '  var AssetAccessibilityConfig = {\n' +
        '    contactEmail: "accessibilita@esempio.it",\n' +
        '    contactPhone: "+39 06 1234567"\n' +
        '  };\n\n' +
        'Il widget non verrà caricato.'
      );
      return;
    }

    /* ── Auto-generate statementText from contacts if not provided ── */
    var merged = mergeDeep(defaults, userCfg);
    if (!merged.statementText) {
      merged.statementText = buildDefaultStatement(merged);
    }

    window._aaInstance = new AssetAccessibility(merged);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
