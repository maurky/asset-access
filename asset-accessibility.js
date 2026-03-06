/**
 * Asset Accessibility v0.1.0-alpha
 * Lightweight WCAG 2.1 AA accessibility widget — Vanilla JS, zero dependencies
 * Supports European Accessibility Act (EAA) / Italian D.Lgs. 82/2022
 *
 * Copyright (C) 2026 Asset s.r.l. — https://www.assetroma.it
 * Licensed under the MIT License — See LICENSE file for details.
 * Repository: https://github.com/maurky/asset-access
 *
 * ⚠️  WARNING: This software is under active development and is NOT yet
 *    suitable for production use. APIs and features may change without notice.
 *
 * USAGE:
 * <script src="asset-accessibility.js"></script>
 * <script>
 *   var AssetAccessibilityConfig = {
 *     contactEmail: 'accessibilita@esempio.it',  // REQUIRED (email and/or phone)
 *     contactPhone: '+39 06 1234567',             // REQUIRED (email and/or phone)
 *     position: 'bottom-right',
 *     buttonColor: '#1a56db',
 *     buttonIcon: 'default',
 *     lang: 'it',                                 // auto-detected from browser if omitted
 *     callback: function(e) { console.log(e); },  // optional
 *     agidDeclaration: {                           // optional — generates AgID Allegato 1 declaration
 *       entityName: 'Azienda s.r.l.',
 *       entityUrl: 'https://www.esempio.it',
 *       conformanceStatus: 'partial',              // 'full' | 'partial' | 'none'
 *       declarationDate: '2026-01-15',
 *       feedbackEmail: 'accessibilita@esempio.it'
 *     },
 *     statementText: { it: '...', en: '...' }
 *   };
 * </script>
 *
 * Inside iframes (no config needed):
 *   <script src="asset-accessibility.js?mode=iframe"></script>
 *   <script src="asset-accessibility.js?mode=iframe&origin=https://parent.example.com"></script>
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
      srOpenPanel: 'Apri pannello accessibilità',
      srClosePanel: 'Chiudi pannello accessibilità',
      srDecrease: 'Diminuisci',
      srIncrease: 'Aumenta',
      srCurrentValue: 'Valore attuale',
      srChangeLang: 'Cambia lingua',
      srActivated: 'attivato',
      srDeactivated: 'disattivato',
      srProfileActivated: 'Profilo attivato',
      srProfileDeactivated: 'Profilo disattivato',
      srResetDone: 'Tutte le impostazioni sono state ripristinate',
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
      srOpenPanel: 'Open accessibility panel',
      srClosePanel: 'Close accessibility panel',
      srDecrease: 'Decrease',
      srIncrease: 'Increase',
      srCurrentValue: 'Current value',
      srChangeLang: 'Change language',
      srActivated: 'activated',
      srDeactivated: 'deactivated',
      srProfileActivated: 'Profile activated',
      srProfileDeactivated: 'Profile deactivated',
      srResetDone: 'All settings have been reset',
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
      srOpenPanel: 'Ouvrir le panneau d\'accessibilité',
      srClosePanel: 'Fermer le panneau d\'accessibilité',
      srDecrease: 'Diminuer',
      srIncrease: 'Augmenter',
      srCurrentValue: 'Valeur actuelle',
      srChangeLang: 'Changer de langue',
      srActivated: 'activé',
      srDeactivated: 'désactivé',
      srProfileActivated: 'Profil activé',
      srProfileDeactivated: 'Profil désactivé',
      srResetDone: 'Tous les paramètres ont été réinitialisés',
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
      srOpenPanel: 'Barrierefreiheitspanel öffnen',
      srClosePanel: 'Barrierefreiheitspanel schließen',
      srDecrease: 'Verringern',
      srIncrease: 'Erhöhen',
      srCurrentValue: 'Aktueller Wert',
      srChangeLang: 'Sprache wechseln',
      srActivated: 'aktiviert',
      srDeactivated: 'deaktiviert',
      srProfileActivated: 'Profil aktiviert',
      srProfileDeactivated: 'Profil deaktiviert',
      srResetDone: 'Alle Einstellungen wurden zurückgesetzt',
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
      srOpenPanel: 'Abrir panel de accesibilidad',
      srClosePanel: 'Cerrar panel de accesibilidad',
      srDecrease: 'Disminuir',
      srIncrease: 'Aumentar',
      srCurrentValue: 'Valor actual',
      srChangeLang: 'Cambiar idioma',
      srActivated: 'activado',
      srDeactivated: 'desactivado',
      srProfileActivated: 'Perfil activado',
      srProfileDeactivated: 'Perfil desactivado',
      srResetDone: 'Todos los ajustes han sido restablecidos',
    },
  };

  /* ── Supported languages (cycle order) ── */
  var LANGS = ['it', 'en', 'fr', 'de', 'es'];
  var LANG_NAMES = { it: 'Italiano', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español' };

  /* ───────────────────────────────────────────
     ACCESSIBILITY PROFILES
  ─────────────────────────────────────────── */
  var PROFILES = {
    accessibility: {
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2"/><path d="M7 8.5h10"/><path d="M12 8.5v5"/><path d="M9 20l3-6.5 3 6.5"/></svg>',
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
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
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
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M21 3l-1.5 1.5"/><path d="M18 2l.5 2"/><path d="M22 6l-2 .5"/></svg>',
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
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>',
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
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M4 12h10"/><path d="M4 17h13"/><path d="M8 3v4"/><path d="M14 3v4"/></svg>',
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
    agidDeclaration: null, // AgID declaration config (overrides statementText) — see README
    callback: null, // function(action, state) — called on every UI interaction
    iframeOrigins: null, // null = same-origin only, ['https://...'] or '*' to accept cross-origin iframes
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

  /* ── Build AgID-compliant declaration (Allegato 1) ── */
  function buildAgidDeclaration(cfg) {
    var a = cfg.agidDeclaration;
    if (!a) return null;

    /* ── Defaults ── */
    var entity = a.entityName || '';
    var url = a.entityUrl || '';
    var targetType = a.entityType || 'sito web'; // 'sito web' | 'applicazione mobile'
    var status = a.conformanceStatus || 'partial'; // 'full' | 'partial' | 'none'
    var nc = a.nonAccessibleContent || {};
    var nonConf = nc.nonConformities || [];
    var burden = nc.disproportionateBurden || [];
    var outside = nc.outsideScope || [];
    var alternatives = nc.alternatives || '';
    var declDate = a.declarationDate || new Date().toISOString().slice(0, 10);
    var reviewDate = a.lastReviewDate || '';
    var evalMethod = a.evaluationMethod || 'self'; // 'self' | 'third-party'
    var evalDetails = a.evaluationDetails || '';
    var techs = a.technologies || ['HTML', 'CSS', 'JavaScript', 'WAI-ARIA'];
    var fbEmail = a.feedbackEmail || cfg.contactEmail || '';
    var fbPhone = a.feedbackPhone || cfg.contactPhone || '';
    var fbUrl = a.feedbackUrl || '';
    var fbResponseDays = a.feedbackResponseTime || '30';
    var respName = a.responsibleName || '';
    var respRole = a.responsibleRole || '';

    /* ── Helpers ── */
    function esc(s) { return (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    function fmtDate(d) {
      if (!d) return '';
      var parts = d.split('-');
      if (parts.length === 3) return parts[2] + '/' + parts[1] + '/' + parts[0];
      return d;
    }
    function list(arr) {
      if (!arr || !arr.length) return '';
      var h = '<ul style="margin:8px 0;padding-left:20px;">';
      for (var i = 0; i < arr.length; i++) h += '<li>' + esc(arr[i]) + '</li>';
      return h + '</ul>';
    }

    /* ── Status labels per language ── */
    var statusLabels = {
      full: {
        it: 'pienamente conforme',
        en: 'fully compliant',
        fr: 'entièrement conforme',
        de: 'vollständig konform',
        es: 'plenamente conforme',
      },
      partial: {
        it: 'parzialmente conforme',
        en: 'partially compliant',
        fr: 'partiellement conforme',
        de: 'teilweise konform',
        es: 'parcialmente conforme',
      },
      none: {
        it: 'non conforme',
        en: 'non-compliant',
        fr: 'non conforme',
        de: 'nicht konform',
        es: 'no conforme',
      },
    };

    var evalLabels = {
      self: {
        it: 'autovalutazione effettuata direttamente dal soggetto erogatore',
        en: 'self-assessment carried out directly by the service provider',
        fr: 'auto-évaluation effectuée directement par le fournisseur de services',
        de: 'Selbstbewertung, die direkt vom Dienstleister durchgeführt wurde',
        es: 'autoevaluación realizada directamente por el proveedor del servicio',
      },
      'third-party': {
        it: 'valutazione effettuata da terzi',
        en: 'third-party evaluation',
        fr: 'évaluation réalisée par des tiers',
        de: 'Bewertung durch Dritte',
        es: 'evaluación realizada por terceros',
      },
    };

    /* ── Contact block builder ── */
    function contactBlock(lang) {
      var phoneL = { it: 'Telefono', en: 'Phone', fr: 'Téléphone', de: 'Telefon', es: 'Teléfono' };
      var h = '';
      if (fbEmail) h += 'Email: <a href="mailto:' + esc(fbEmail) + '">' + esc(fbEmail) + '</a><br>';
      if (fbPhone) h += phoneL[lang] + ': <strong>' + esc(fbPhone) + '</strong><br>';
      if (fbUrl) h += 'Online: <a href="' + esc(fbUrl) + '" target="_blank" rel="noopener">' + esc(fbUrl) + '</a><br>';
      if (respName) {
        var respL = { it: 'Responsabile', en: 'Contact person', fr: 'Responsable', de: 'Verantwortliche Person', es: 'Responsable' };
        h += respL[lang] + ': <strong>' + esc(respName) + '</strong>';
        if (respRole) h += ' (' + esc(respRole) + ')';
        h += '<br>';
      }
      return h;
    }

    /* ────────────────────────────────────────────
       ITALIAN (official version — Allegato 1 AgID)
    ──────────────────────────────────────────── */
    var it = '';
    it += '<div style="font-size:14px;line-height:1.6;">';

    /* 1. Intestazione */
    it += '<p><strong>' + esc(entity) + '</strong> si impegna a rendere ';
    it += targetType === 'applicazione mobile' ? 'la propria applicazione mobile' : 'il proprio sito web';
    if (url) it += ' <a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(url) + '</a>';
    it += ' accessibile, conformemente alla legge 9 gennaio 2004, n. 4.</p>';

    /* 2. Stato di conformità */
    it += '<h4 style="margin:16px 0 8px;">Stato di conformità</h4>';
    it += '<p>';
    if (status === 'full') {
      it += 'Questo ' + esc(targetType) + ' è <strong>pienamente conforme</strong> ai requisiti previsti dall\'allegato A alla norma UNI CEI EN 301549 in attuazione della Direttiva UE 2016/2102.';
    } else if (status === 'partial') {
      it += 'Questo ' + esc(targetType) + ' è <strong>parzialmente conforme</strong> ai requisiti previsti dall\'allegato A alla norma UNI CEI EN 301549 in attuazione della Direttiva UE 2016/2102, a causa delle non conformità elencate di seguito.';
    } else {
      it += 'Questo ' + esc(targetType) + ' <strong>non è conforme</strong> ai requisiti previsti dall\'allegato A alla norma UNI CEI EN 301549 in attuazione della Direttiva UE 2016/2102, per i motivi elencati di seguito.';
    }
    it += '</p>';

    /* 3. Contenuti non accessibili */
    if (status !== 'full' && (nonConf.length || burden.length || outside.length)) {
      it += '<h4 style="margin:16px 0 8px;">Contenuti non accessibili</h4>';

      if (nonConf.length) {
        it += '<p><strong>a) Inosservanza della legge 9 gennaio 2004, n. 4:</strong></p>';
        it += list(nonConf);
      }
      if (burden.length) {
        it += '<p><strong>b) Onere sproporzionato (art. 3-ter, legge 9 gennaio 2004, n. 4):</strong></p>';
        it += list(burden);
      }
      if (outside.length) {
        it += '<p><strong>c) Il contenuto non rientra nell\'ambito della legislazione applicabile:</strong></p>';
        it += list(outside);
      }
      if (alternatives) {
        it += '<p><strong>Alternative accessibili:</strong> ' + esc(alternatives) + '</p>';
      }
    }

    /* 4. Redazione della dichiarazione */
    it += '<h4 style="margin:16px 0 8px;">Redazione della dichiarazione di accessibilità</h4>';
    it += '<p>La presente dichiarazione è stata redatta il <strong>' + fmtDate(declDate) + '</strong>.';
    if (reviewDate) {
      it += ' Ultimo riesame: <strong>' + fmtDate(reviewDate) + '</strong>.';
    }
    it += '</p>';
    it += '<p>La dichiarazione è stata redatta sulla base di una <strong>' + (evalLabels[evalMethod] || evalLabels.self).it + '</strong>.';
    if (evalDetails) it += ' ' + esc(evalDetails);
    it += '</p>';
    if (techs.length) {
      it += '<p>Tecnologie utilizzate per la realizzazione del ' + esc(targetType) + ': ' + techs.map(esc).join(', ') + '.</p>';
    }

    /* 5. Meccanismo di feedback */
    it += '<h4 style="margin:16px 0 8px;">Meccanismo di feedback e recapiti</h4>';
    it += '<p>Per segnalare eventuali problemi di accessibilità di questo ' + esc(targetType) + ', è possibile contattare:</p>';
    it += '<p>' + contactBlock('it') + '</p>';
    it += '<p>Il soggetto erogatore risponderà alla segnalazione entro ' + esc(fbResponseDays) + ' giorni.</p>';

    /* 6. Procedura di attuazione */
    it += '<h4 style="margin:16px 0 8px;">Procedura di attuazione</h4>';
    it += '<p>In caso di risposta insoddisfacente o di mancata risposta, nel termine di trenta giorni, alla notifica ';
    it += 'o alla richiesta, l\'interessato può inoltrare una segnalazione all\'AgID, tramite il ';
    it += '<a href="https://www.agid.gov.it/it/design-servizi/accessibilita" target="_blank" rel="noopener">link dedicato sul sito AgID</a>.</p>';

    it += '</div>';

    /* ────────────────────────────────────────────
       OTHER LANGUAGES (simplified but complete)
    ──────────────────────────────────────────── */
    function buildLang(lang) {
      var sLabel = (statusLabels[status] || statusLabels.partial)[lang];
      var eLabel = (evalLabels[evalMethod] || evalLabels.self)[lang];
      var h = '<div style="font-size:14px;line-height:1.6;">';

      var headings = {
        en: { cs: 'Compliance Status', nc: 'Non-Accessible Content', rd: 'Preparation of this Declaration', fb: 'Feedback Mechanism', pa: 'Enforcement Procedure' },
        fr: { cs: 'État de conformité', nc: 'Contenus non accessibles', rd: 'Rédaction de la déclaration', fb: 'Mécanisme de retour d\'information', pa: 'Procédure de mise en œuvre' },
        de: { cs: 'Konformitätsstatus', nc: 'Nicht barrierefreie Inhalte', rd: 'Erstellung dieser Erklärung', fb: 'Feedback-Mechanismus', pa: 'Durchsetzungsverfahren' },
        es: { cs: 'Estado de conformidad', nc: 'Contenidos no accesibles', rd: 'Redacción de la declaración', fb: 'Mecanismo de retroalimentación', pa: 'Procedimiento de aplicación' },
      };
      var hd = headings[lang] || headings.en;

      var intro = {
        en: ' is committed to making its ' + (targetType === 'applicazione mobile' ? 'mobile application' : 'website') + ' accessible, in accordance with Italian Law No. 4 of 9 January 2004.',
        fr: ' s\'engage à rendre ' + (targetType === 'applicazione mobile' ? 'son application mobile' : 'son site web') + ' accessible, conformément à la loi italienne n° 4 du 9 janvier 2004.',
        de: ' verpflichtet sich, ' + (targetType === 'applicazione mobile' ? 'seine mobile Anwendung' : 'seine Website') + ' barrierefrei zu gestalten, gemäß dem italienischen Gesetz Nr. 4 vom 9. Januar 2004.',
        es: ' se compromete a hacer accesible ' + (targetType === 'applicazione mobile' ? 'su aplicación móvil' : 'su sitio web') + ', de conformidad con la Ley italiana n.° 4 del 9 de enero de 2004.',
      };

      /* Intro */
      h += '<p><strong>' + esc(entity) + '</strong>' + intro[lang];
      if (url) h += ' <a href="' + esc(url) + '" target="_blank" rel="noopener">' + esc(url) + '</a>';
      h += '</p>';

      /* Compliance */
      h += '<h4 style="margin:16px 0 8px;">' + hd.cs + '</h4>';
      h += '<p>' + esc(entity) + ': <strong>' + sLabel + '</strong> (UNI CEI EN 301549 / WCAG 2.1 AA).</p>';

      /* Non-accessible content */
      if (status !== 'full' && (nonConf.length || burden.length || outside.length)) {
        h += '<h4 style="margin:16px 0 8px;">' + hd.nc + '</h4>';
        if (nonConf.length) h += list(nonConf);
        if (burden.length) h += list(burden);
        if (outside.length) h += list(outside);
        if (alternatives) h += '<p>' + esc(alternatives) + '</p>';
      }

      /* Declaration info */
      h += '<h4 style="margin:16px 0 8px;">' + hd.rd + '</h4>';
      h += '<p>' + fmtDate(declDate) + '. ' + eLabel + '.';
      if (reviewDate) h += ' (' + fmtDate(reviewDate) + ')';
      h += '</p>';

      /* Feedback */
      h += '<h4 style="margin:16px 0 8px;">' + hd.fb + '</h4>';
      h += '<p>' + contactBlock(lang) + '</p>';

      /* Enforcement */
      h += '<h4 style="margin:16px 0 8px;">' + hd.pa + '</h4>';
      var enforce = {
        en: 'If no satisfactory response is received within 30 days, you may file a complaint with AgID (Italian Digital Agency) via the ',
        fr: 'En cas de réponse absente ou insatisfaisante dans un délai de 30 jours, vous pouvez adresser une réclamation à l\'AgID via le ',
        de: 'Wenn innerhalb von 30 Tagen keine zufriedenstellende Antwort erfolgt, können Sie eine Beschwerde bei der AgID einreichen über den ',
        es: 'En caso de falta de respuesta o respuesta insatisfactoria dentro de los 30 días, puede presentar una reclamación a AgID a través del ',
      };
      var linkLabel = {
        en: 'dedicated link on the AgID website',
        fr: 'lien dédié sur le site de l\'AgID',
        de: 'entsprechenden Link auf der AgID-Website',
        es: 'enlace dedicado en el sitio web de AgID',
      };
      h += '<p>' + enforce[lang] + '<a href="https://www.agid.gov.it/it/design-servizi/accessibilita" target="_blank" rel="noopener">' + linkLabel[lang] + '</a>.</p>';

      h += '</div>';
      return h;
    }

    return {
      it: it,
      en: buildLang('en'),
      fr: buildLang('fr'),
      de: buildLang('de'),
      es: buildLang('es'),
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
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.5" r="2"/><path d="M7 8.5h10"/><path d="M12 8.5v5"/><path d="M9 20l3-6.5 3 6.5"/></svg>',
    close:
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    plus: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus:
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    reset:
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
    lang: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>',
    doc: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    alignLeft:
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>',
    alignCenter:
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    alignRight:
      '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>',
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
    this._iframeChildren = []; // tracked iframe windows for broadcasting

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
    this._listenForIframes();
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
      '.aa-lang-select{font-size:12px;font-weight:600;height:28px;padding:0 24px 0 8px;border:1px solid #e5e7eb;border-radius:6px;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%276%27 fill=%27none%27%3E%3Cpath d=%27M1 1l4 4 4-4%27 stroke=%27%236b7280%27 stroke-width=%271.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") no-repeat right 8px center;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#374151;cursor:pointer;font-family:inherit;outline:none;}\n' +
      '.aa-lang-select:hover{border-color:' + cfg.buttonColor + ';color:' + cfg.buttonColor + ';}\n' +
      '.aa-lang-select:focus-visible{border-color:' + cfg.buttonColor + ';box-shadow:0 0 0 2px ' + cfg.buttonColor + '33;}\n' +

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

      /* Contrast themes — explicit background matching the theme color */
      'html.aa-contrast-dark{background:#1a1a2e!important;}\n' +
      'html.aa-contrast-dark body{background:#1a1a2e!important;color:#e0e0e0!important;}\n' +
      'html.aa-contrast-dark body *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *):not(#aa-filter-overlay){background-color:#1a1a2e!important;color:#e0e0e0!important;border-color:#444!important;}\n' +
      'html.aa-contrast-dark a:not(#aa-panel a){color:#7eb8ff!important;}\n' +

      'html.aa-contrast-light{background:#fff!important;}\n' +
      'html.aa-contrast-light body{background:#fff!important;color:#111!important;}\n' +
      'html.aa-contrast-light body *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *):not(#aa-filter-overlay){background-color:#fff!important;color:#111!important;border-color:#ccc!important;}\n' +

      'html.aa-contrast-high{background:#000!important;}\n' +
      'html.aa-contrast-high body{background:#000!important;color:#ff0!important;}\n' +
      'html.aa-contrast-high body *:not(#aa-panel):not(#aa-panel *):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *):not(#aa-filter-overlay){background-color:#000!important;color:#ff0!important;border-color:#ff0!important;}\n' +
      'html.aa-contrast-high a:not(#aa-panel a){color:#0ff!important;}\n' +

      /* Monochrome & saturation: backdrop-filter overlay to preserve position:fixed */
      '#aa-filter-overlay{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:' + (cfg.zIndex - 1) + ';}\n' +
      'html.aa-monochrome #aa-filter-overlay{backdrop-filter:grayscale(100%);-webkit-backdrop-filter:grayscale(100%);}\n' +
      'html.aa-saturation-high #aa-filter-overlay{backdrop-filter:saturate(200%);-webkit-backdrop-filter:saturate(200%);}\n' +
      'html.aa-saturation-low #aa-filter-overlay{backdrop-filter:saturate(40%);-webkit-backdrop-filter:saturate(40%);}\n' +

      /* Fallback for older browsers without backdrop-filter */
      '@supports not (backdrop-filter:grayscale(100%)){' +
      'html.aa-monochrome body>*:not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-filter-overlay){filter:grayscale(100%)!important;}' +
      'html.aa-saturation-high body>*:not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-filter-overlay){filter:saturate(200%)!important;}' +
      'html.aa-saturation-low body>*:not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-filter-overlay){filter:saturate(40%)!important;}' +
      '}\n' +

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

    /* ── Screen Reader Live Region ── */
    var live = document.createElement('div');
    live.id = 'aa-live-region';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    live.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(live);
    this._liveRegion = live;

    /* ── Filter Overlay (for grayscale / saturation without breaking position:fixed) ── */
    var filterOv = document.createElement('div');
    filterOv.id = 'aa-filter-overlay';
    filterOv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(filterOv);

    /* ── Trigger Button ── */
    var btn = document.createElement('button');
    btn.id = 'aa-trigger';
    btn.setAttribute('aria-label', this.t('srOpenPanel'));
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'aa-panel');
    btn.setAttribute('aria-haspopup', 'dialog');
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
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-labelledby', 'aa-panel-title');
    document.body.appendChild(panel);
    this._panel = panel;

    /* ── Statement Overlay ── */
    var stmtOv = document.createElement('div');
    stmtOv.id = 'aa-statement-overlay';
    stmtOv.setAttribute('role', 'dialog');
    stmtOv.setAttribute('aria-modal', 'true');
    stmtOv.setAttribute('aria-labelledby', 'aa-stmt-title-id');
    stmtOv.innerHTML =
      '<div id="aa-statement-box">' +
      '<div class="aa-stmt-header"><h3 class="aa-stmt-title" id="aa-stmt-title-id">' +
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
      '<span class="aa-header-title" id="aa-panel-title">' +
      icons.accessibility +
      ' ' +
      this.t('panelTitle') +
      '</span>' +
      '<div class="aa-header-actions">' +
      '<select class="aa-lang-select" data-action="changeLang" aria-label="' +
      this.t('srChangeLang') + '">' +
      (function (currentLang) {
        var opts = '';
        for (var li = 0; li < LANGS.length; li++) {
          opts += '<option value="' + LANGS[li] + '"' +
            (LANGS[li] === currentLang ? ' selected' : '') +
            '>' + LANG_NAMES[LANGS[li]] + '</option>';
        }
        return opts;
      })(this.lang) +
      '</select>' +
      '<button class="aa-hdr-btn" data-action="closePanel" aria-label="' +
      this.t('srClosePanel') +
      '">' +
      icons.close +
      '</button>' +
      '</div></div>';

    /* Body */
    html += '<div class="aa-body">';

    /* ─ Profiles section ─ */
    html += '<div class="aa-section-label" id="aa-sec-profiles">' + this.t('sectionProfiles') + '</div>';
    html += '<div class="aa-profiles" role="group" aria-labelledby="aa-sec-profiles">';
    var profileKeys = ['accessibility', 'visuallyImpaired', 'adhd', 'cognitive', 'dyslexia'];
    var profileI18nKeys = ['profileAccessibility', 'profileVisuallyImpaired', 'profileAdhd', 'profileCognitive', 'profileDyslexia'];
    for (var p = 0; p < profileKeys.length; p++) {
      var pKey = profileKeys[p];
      var isActive = s.activeProfile === pKey;
      html +=
        '<button class="aa-profile-card' + (isActive ? ' aa-active' : '') +
        '" data-action="applyProfile" data-value="' + pKey +
        '" aria-pressed="' + isActive +
        '" aria-label="' + this.t(profileI18nKeys[p]) + (isActive ? ', ' + this.t('srActivated') : '') + '">' +
        PROFILES[pKey].icon +
        '<span class="aa-profile-card-label">' + this.t(profileI18nKeys[p]) + '</span>' +
        '</button>';
    }
    html += '</div>';

    /* ─ Content section ─ */
    html +=
      '<div class="aa-section-label" id="aa-sec-content">' + this.t('sectionContent') + '</div>';
    html += '<div role="group" aria-labelledby="aa-sec-content">';

    // Font size stepper
    html += this._rowStepper('fontSize', s.fontSizeStep, '%');

    // Readable font toggle
    html += this._rowToggle('readableFont', s.readableFont);

    // Text align
    html +=
      '<div class="aa-row"><span class="aa-row-label">' +
      this.t('textAlign') +
      '</span><div class="aa-align-group" role="group" aria-label="' + this.t('textAlign') + '">' +
      '<button class="aa-align-btn' +
      (s.textAlign === 'left' ? ' aa-active' : '') +
      '" data-action="align" data-value="left" aria-label="' +
      this.t('alignLeft') +
      '" aria-pressed="' + (s.textAlign === 'left') + '">' +
      icons.alignLeft +
      '</button>' +
      '<button class="aa-align-btn' +
      (s.textAlign === 'center' ? ' aa-active' : '') +
      '" data-action="align" data-value="center" aria-label="' +
      this.t('alignCenter') +
      '" aria-pressed="' + (s.textAlign === 'center') + '">' +
      icons.alignCenter +
      '</button>' +
      '<button class="aa-align-btn' +
      (s.textAlign === 'right' ? ' aa-active' : '') +
      '" data-action="align" data-value="right" aria-label="' +
      this.t('alignRight') +
      '" aria-pressed="' + (s.textAlign === 'right') + '">' +
      icons.alignRight +
      '</button>' +
      '</div></div>';

    // Line height stepper
    html += this._rowStepper('lineHeight', s.lineHeight, '%');

    // Letter spacing stepper
    html += this._rowStepper('letterSpacing', s.letterSpacing, '%');

    html += '</div>'; // close content group

    /* ─ Color section ─ */
    html +=
      '<div class="aa-section-label" id="aa-sec-color">' + this.t('sectionColor') + '</div>';
    html += '<div class="aa-pills" role="group" aria-labelledby="aa-sec-color">';
    var modes = ['contrastDark', 'contrastLight', 'contrastHigh'];
    var modeVals = ['dark', 'light', 'high'];
    for (var i = 0; i < modes.length; i++) {
      var mActive = s.contrastMode === modeVals[i];
      html +=
        '<button class="aa-pill' +
        (mActive ? ' aa-active' : '') +
        '" data-action="contrast" data-value="' +
        modeVals[i] +
        '" aria-pressed="' + mActive + '">' +
        this.t(modes[i]) +
        '</button>';
    }
    html +=
      '<button class="aa-pill' +
      (s.monochrome ? ' aa-active' : '') +
      '" data-action="toggleMono" aria-pressed="' + !!s.monochrome + '">' +
      this.t('monochrome') +
      '</button>';
    html +=
      '<button class="aa-pill' +
      (s.saturation === 'high' ? ' aa-active' : '') +
      '" data-action="saturation" data-value="high" aria-pressed="' + (s.saturation === 'high') + '">' +
      this.t('saturationHigh') +
      '</button>';
    html +=
      '<button class="aa-pill' +
      (s.saturation === 'low' ? ' aa-active' : '') +
      '" data-action="saturation" data-value="low" aria-pressed="' + (s.saturation === 'low') + '">' +
      this.t('saturationLow') +
      '</button>';
    html += '</div>';

    /* ─ Other section ─ */
    html +=
      '<div class="aa-section-label" id="aa-sec-other">' + this.t('sectionOther') + '</div>';
    html += '<div role="group" aria-labelledby="aa-sec-other">';
    html += this._rowToggle('hideImages', s.hideImages);
    html += this._rowToggle('cursorSize', s.bigCursor);
    html += this._rowToggle('stopAnimations', s.stopAnimations);
    html += '</div>';

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
    var label = this.t(key);
    return (
      '<div class="aa-row" role="group" aria-label="' + label + '">' +
      '<span class="aa-row-label">' +
      label +
      '</span><div class="aa-row-controls">' +
      '<button class="aa-step-btn" data-action="step" data-key="' +
      key +
      '" data-dir="-1" aria-label="' +
      this.t('srDecrease') + ' ' + label +
      '">' +
      icons.minus +
      '</button>' +
      '<span class="aa-step-value" aria-live="polite" aria-label="' +
      this.t('srCurrentValue') + ': ' + display +
      '">' +
      display +
      '</span>' +
      '<button class="aa-step-btn" data-action="step" data-key="' +
      key +
      '" data-dir="1" aria-label="' +
      this.t('srIncrease') + ' ' + label +
      '">' +
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
     SCREEN READER ANNOUNCE
  ─────────────────────────────────────────── */
  proto._announce = function (msg) {
    if (!this._liveRegion) return;
    this._liveRegion.textContent = '';
    var self = this;
    /* Small delay to ensure screen readers pick up the change */
    setTimeout(function () {
      self._liveRegion.textContent = msg;
    }, 50);
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
          self._announce(self.t('monochrome') + ': ' + (self.state.monochrome ? self.t('srActivated') : self.t('srDeactivated')));
          break;
        case 'saturation':
          self.state.activeProfile = '';
          var val = target.getAttribute('data-value');
          var satLabel = val === 'high' ? self.t('saturationHigh') : self.t('saturationLow');
          self.state.saturation = self.state.saturation === val ? '' : val;
          if (self.state.saturation) self.state.monochrome = false;
          self._applyState();
          self._renderPanel();
          self._announce(satLabel + ': ' + (self.state.saturation === val ? self.t('srActivated') : self.t('srDeactivated')));
          break;
        case 'reset':
          self._resetAll();
          self._announce(self.t('srResetDone'));
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

    /* Language dropdown */
    this._panel.addEventListener('change', function (e) {
      if (e.target.classList.contains('aa-lang-select')) {
        self.lang = e.target.value;
        self._saveState();
        self._renderPanel();
        self._updateStatementOverlay();
        self._announce(self.t('srChangeLang') + ': ' + LANG_NAMES[self.lang]);
        self._fireCallback('changeLang', { value: self.lang });
      }
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

    /* Escape key + Focus trap */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (self.statementOpen) {
          self._closeStatement();
          self._fireCallback('closeStatement');
        } else if (self.isOpen) {
          self._closePanel();
          self._fireCallback('closePanel');
        }
        return;
      }

      /* Focus trap: Tab / Shift+Tab */
      if (e.key === 'Tab') {
        var container = null;
        if (self.statementOpen) container = self._stmtOverlay.querySelector('#aa-statement-box');
        else if (self.isOpen) container = self._panel;
        if (!container) return;

        var focusable = container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
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
    /* Map state key back to i18n key for announcement */
    var labelMap = { readableFont: 'readableFont', hideImages: 'hideImages', bigCursor: 'cursorSize', stopAnimations: 'stopAnimations' };
    var label = this.t(labelMap[key] || key);
    this._applyState();
    this._renderPanel();
    this._announce(label + ': ' + (this.state[key] ? this.t('srActivated') : this.t('srDeactivated')));
  };

  proto._handleAlign = function (val) {
    this.state.activeProfile = '';
    this.state.textAlign = this.state.textAlign === val ? '' : val;
    var alignMap = { left: 'alignLeft', center: 'alignCenter', right: 'alignRight' };
    this._applyState();
    this._renderPanel();
    this._announce(this.t('textAlign') + ': ' + (this.state.textAlign ? this.t(alignMap[this.state.textAlign]) : this.t('srDeactivated')));
  };

  proto._handleContrast = function (val) {
    this.state.activeProfile = '';
    this.state.contrastMode = this.state.contrastMode === val ? '' : val;
    var contrastMap = { dark: 'contrastDark', light: 'contrastLight', high: 'contrastHigh' };
    this._applyState();
    this._renderPanel();
    this._announce(
      this.state.contrastMode
        ? this.t(contrastMap[this.state.contrastMode]) + ': ' + this.t('srActivated')
        : this.t(contrastMap[val]) + ': ' + this.t('srDeactivated')
    );
  };

  var PROFILE_I18N = {
    accessibility: 'profileAccessibility',
    visuallyImpaired: 'profileVisuallyImpaired',
    adhd: 'profileAdhd',
    cognitive: 'profileCognitive',
    dyslexia: 'profileDyslexia',
  };

  proto._applyProfile = function (key) {
    /* Toggle off if same profile is already active */
    if (this.state.activeProfile === key) {
      this._resetAll();
      this._announce(this.t(PROFILE_I18N[key]) + ': ' + this.t('srProfileDeactivated'));
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
    this._announce(this.t(PROFILE_I18N[key]) + ': ' + this.t('srProfileActivated'));
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
     IFRAME PARENT: listen for children & broadcast
  ─────────────────────────────────────────── */
  proto._listenForIframes = function () {
    var self = this;
    var allowed = this.cfg.iframeOrigins; // null | '*' | ['https://...']
    window.addEventListener('message', function (e) {
      if (!e.data || e.data.type !== 'aa-child-ready') return;
      /* Validate origin */
      var ok = false;
      if (allowed === '*') {
        ok = true;
      } else if (Array.isArray(allowed)) {
        ok = allowed.indexOf(e.origin) !== -1 || e.origin === location.origin;
      } else {
        /* Default: same-origin only */
        ok = e.origin === location.origin;
      }
      if (!ok) return;
      /* Avoid registering the same source twice */
      var src = e.source;
      for (var i = 0; i < self._iframeChildren.length; i++) {
        if (self._iframeChildren[i].source === src) {
          self._sendStateTo(src, e.origin);
          return;
        }
      }
      self._iframeChildren.push({ source: src, origin: e.origin });
      self._sendStateTo(src, e.origin);
    });
  };

  proto._sendStateTo = function (targetWindow, origin) {
    try {
      targetWindow.postMessage({
        type: 'aa-state-update',
        state: JSON.parse(JSON.stringify(this.state)),
      }, origin);
    } catch (e) {
      /* iframe may have been removed — ignore */
    }
  };

  proto._broadcastState = function () {
    var alive = [];
    for (var i = 0; i < this._iframeChildren.length; i++) {
      var child = this._iframeChildren[i];
      try {
        if (child.source && !child.source.closed) {
          this._sendStateTo(child.source, child.origin);
          alive.push(child);
        }
      } catch (e) {
        /* cross-origin or removed — drop it */
      }
    }
    this._iframeChildren = alive;
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

    /* Broadcast to iframe children */
    this._broadcastState();
  };

  /* ───────────────────────────────────────────
     PANEL OPEN / CLOSE
  ─────────────────────────────────────────── */
  proto._openPanel = function () {
    this._panel.classList.add('aa-visible');
    this.isOpen = true;
    this._btn.setAttribute('aria-expanded', 'true');
    this._btn.setAttribute('aria-label', this.t('srClosePanel'));
    /* Focus first interactive element in panel */
    var self = this;
    setTimeout(function () {
      var first = self._panel.querySelector('button, [tabindex]');
      if (first) first.focus();
    }, 100);
  };
  proto._closePanel = function () {
    this._panel.classList.remove('aa-visible');
    this.isOpen = false;
    this._btn.setAttribute('aria-expanded', 'false');
    this._btn.setAttribute('aria-label', this.t('srOpenPanel'));
    this._btn.focus();
  };

  /* ───────────────────────────────────────────
     STATEMENT
  ─────────────────────────────────────────── */
  proto._showStatement = function () {
    this._updateStatementOverlay();
    this._stmtOverlay.classList.add('aa-visible');
    this.statementOpen = true;
    /* Focus close button in statement */
    var self = this;
    setTimeout(function () {
      var closeBtn = self._stmtOverlay.querySelector('.aa-stmt-close');
      if (closeBtn) closeBtn.focus();
    }, 100);
  };
  proto._closeStatement = function () {
    this._stmtOverlay.classList.remove('aa-visible');
    this.statementOpen = false;
    /* Return focus to statement button in panel */
    var stmtBtn = this._panel.querySelector('[data-action="showStatement"]');
    if (stmtBtn) stmtBtn.focus();
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
     IFRAME CHILD MODE
  ─────────────────────────────────────────── */
  function IframeChild(allowedOrigin) {
    this._origin = allowedOrigin || location.origin;
    this._pollTimer = null;
    this._pollTimeout = null;
    this._ready = false;
    this.state = null;

    this._injectStyles();
    this._createOverlay();
    this._listenForParent();
    this._startPolling();
  }

  IframeChild.prototype._injectStyles = function () {
    /* Inject only the utility CSS that affects page appearance.
       Widget UI styles (#aa-trigger, #aa-panel, etc.) are excluded. */
    var css = '\n/* ===== Asset Accessibility (iframe child) ===== */\n' +

      /* Readable font */
      '.aa-readable-font,.aa-readable-font *:not(.fa):not(.fas):not(.far):not(.fal):not(.fat):not(.fad):not(.fab):not(.fa-brands):not(.fa-solid):not(.fa-regular):not(.fa-light):not(.fa-thin):not(.fa-duotone):not(.material-icons):not(.material-symbols-outlined){font-family:Arial,Helvetica,sans-serif!important;}\n' +

      /* Text align */
      '.aa-align-left,.aa-align-left *{text-align:left!important;}\n' +
      '.aa-align-center,.aa-align-center *{text-align:center!important;}\n' +
      '.aa-align-right,.aa-align-right *{text-align:right!important;}\n' +

      /* Hide images */
      '.aa-hide-images img{opacity:0!important;}\n' +
      '.aa-hide-images *{background-image:none!important;}\n' +

      /* Stop animations */
      '.aa-stop-animations,.aa-stop-animations *{animation:none!important;transition:none!important;}\n' +

      /* Big cursor */
      '.aa-big-cursor,.aa-big-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'white\' stroke-width=\'1\'%3E%3Cpath d=\'M5 3l14 8-6 1.5L10 19z\'/%3E%3C/svg%3E") 4 2,auto!important;}\n' +

      /* Contrast themes */
      'html.aa-contrast-dark{background:#1a1a2e!important;}\n' +
      'html.aa-contrast-dark body{background:#1a1a2e!important;color:#e0e0e0!important;}\n' +
      'html.aa-contrast-dark body *:not(#aa-filter-overlay){background-color:#1a1a2e!important;color:#e0e0e0!important;border-color:#444!important;}\n' +
      'html.aa-contrast-dark a{color:#7eb8ff!important;}\n' +

      'html.aa-contrast-light{background:#fff!important;}\n' +
      'html.aa-contrast-light body{background:#fff!important;color:#111!important;}\n' +
      'html.aa-contrast-light body *:not(#aa-filter-overlay){background-color:#fff!important;color:#111!important;border-color:#ccc!important;}\n' +

      'html.aa-contrast-high{background:#000!important;}\n' +
      'html.aa-contrast-high body{background:#000!important;color:#ff0!important;}\n' +
      'html.aa-contrast-high body *:not(#aa-filter-overlay){background-color:#000!important;color:#ff0!important;border-color:#ff0!important;}\n' +
      'html.aa-contrast-high a{color:#0ff!important;}\n' +

      /* Monochrome / saturation overlay */
      '#aa-filter-overlay{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999998;}\n' +
      'html.aa-monochrome #aa-filter-overlay{backdrop-filter:grayscale(100%);-webkit-backdrop-filter:grayscale(100%);}\n' +
      'html.aa-saturation-high #aa-filter-overlay{backdrop-filter:saturate(200%);-webkit-backdrop-filter:saturate(200%);}\n' +
      'html.aa-saturation-low #aa-filter-overlay{backdrop-filter:saturate(40%);-webkit-backdrop-filter:saturate(40%);}\n' +

      /* Fallback */
      '@supports not (backdrop-filter:grayscale(100%)){' +
      'html.aa-monochrome body>*:not(#aa-filter-overlay){filter:grayscale(100%)!important;}' +
      'html.aa-saturation-high body>*:not(#aa-filter-overlay){filter:saturate(200%)!important;}' +
      'html.aa-saturation-low body>*:not(#aa-filter-overlay){filter:saturate(40%)!important;}' +
      '}\n' +

      '/* end iframe child styles */\n';

    var style = document.createElement('style');
    style.setAttribute('data-aw', 'iframe');
    style.textContent = css;
    document.head.appendChild(style);
  };

  IframeChild.prototype._createOverlay = function () {
    var ov = document.createElement('div');
    ov.id = 'aa-filter-overlay';
    ov.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ov);
  };

  IframeChild.prototype._applyState = function (s) {
    this.state = s;
    var html = document.documentElement;

    /* Font size */
    html.style.fontSize = s.fontSizeStep !== 0
      ? (100 + s.fontSizeStep * 10) + '%' : '';

    /* Line height */
    document.body.style.lineHeight = s.lineHeight > 0
      ? (1.5 + s.lineHeight * 0.3) + '' : '';

    /* Letter spacing */
    document.body.style.letterSpacing = s.letterSpacing > 0
      ? (s.letterSpacing * 0.5) + 'px' : '';

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
      if (classes[cls]) html.classList.add(cls);
      else html.classList.remove(cls);
    }
  };

  IframeChild.prototype._listenForParent = function () {
    var self = this;
    window.addEventListener('message', function (e) {
      if (!e.data || e.data.type !== 'aa-state-update') return;
      /* Validate origin */
      if (self._origin !== '*' && e.origin !== self._origin) return;
      self._ready = true;
      self._stopPolling();
      self._applyState(e.data.state);
    });
  };

  IframeChild.prototype._startPolling = function () {
    var self = this;
    var started = Date.now();
    var INTERVAL = 200;
    var TIMEOUT = 30000;

    this._pollTimer = setInterval(function () {
      if (self._ready || (Date.now() - started) > TIMEOUT) {
        self._stopPolling();
        if (!self._ready) {
          console.warn('[Asset Accessibility iframe] Timeout: nessuna risposta dal parent dopo 30s.');
        }
        return;
      }
      try {
        console.warn('[Asset Accessibility iframe] POLL.');
        window.parent.postMessage({ type: 'aa-child-ready' }, self._origin);
      } catch (e) {
        /* cross-origin or no parent — stop */
        self._stopPolling();
      }
    }, INTERVAL);
  };

  IframeChild.prototype._stopPolling = function () {
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
  };

  /* ───────────────────────────────────────────
     DETECT MODE FROM SCRIPT TAG
  ─────────────────────────────────────────── */
  function getScriptParams() {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || '';
      if (src.indexOf('asset-accessibility') !== -1) {
        var match = src.match(/[?&]mode=iframe/);
        if (match) {
          var originMatch = src.match(/[?&]origin=([^&]+)/);
          return {
            mode: 'iframe',
            origin: originMatch ? decodeURIComponent(originMatch[1]) : location.origin,
          };
        }
      }
    }
    return { mode: 'parent' };
  }

  /* ───────────────────────────────────────────
     INIT ON DOM READY
  ─────────────────────────────────────────── */
  function init() {
    var params = getScriptParams();

    /* ── IFRAME CHILD MODE ── */
    if (params.mode === 'iframe') {
      window._aaIframeChild = new IframeChild(params.origin);
      return;
    }

    /* ── PARENT MODE (default) ── */
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

    /* AgID declaration takes priority over statementText */
    if (merged.agidDeclaration) {
      merged.statementText = buildAgidDeclaration(merged);
    } else if (!merged.statementText) {
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
