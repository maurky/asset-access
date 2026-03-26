/**
 * Asset Accessibility v0.1.0-alpha (ES6)
 * Lightweight WCAG 2.1 AA accessibility widget — Vanilla JS, zero dependencies
 * Supports European Accessibility Act (EAA) / Italian D.Lgs. 82/2022
 *
 * Copyright (C) 2026 Asset s.r.l. — https://www.assetroma.it
 * Licensed under the MIT License — See LICENSE file for details.
 * Repository: https://github.com/maurky/asset-access
 *
 * Browser support: Chrome 74+, Firefox 90+, Safari 14.1+, Edge 79+
 *
 * ⚠️  WARNING: This software is under active development and is NOT yet
 *    suitable for production use. APIs and features may change without notice.
 *
 * USAGE:
 * <script src="asset-accessibility.js"></script>
 * <script>
 *   const AssetAccessibilityConfig = {
 *     contactEmail: 'accessibilita@esempio.it',
 *     contactPhone: '+39 06 1234567',
 *     callback: (e) => console.log(e),
 *   };
 * </script>
 *
 * Iframe: <script src="asset-accessibility.js?mode=iframe"></script>
 */
(function () {
  'use strict';

  /* ───────────────────────────────────────────
     TRANSLATIONS
  ─────────────────────────────────────────── */
  const i18n = {
    it: {
      panelTitle: 'Accessibilità',
      sectionProfiles: 'Profili',
      profileAccessibility: 'Accessibilità',
      profileDarkTheme: 'Tema Scuro',
      profileMotor: 'Motoria',
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
      altTextMissing: 'Testo alternativo mancante',
      cursorSize: 'Cursore Grande',
      stopAnimations: 'Ferma Animazioni',
      keyboardNav: 'Navigazione Tastiera',
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
      navBarFocus: 'Focus su',
      navBarHint: 'Tasti: H titoli, M menu, F form, B pulsanti, G immagini, T tabelle, L liste, I aree · Shift+lettera = precedente',
    },
    en: {
      panelTitle: 'Accessibility',
      sectionProfiles: 'Profiles',
      profileAccessibility: 'Accessibility',
      profileDarkTheme: 'Dark Theme',
      profileMotor: 'Motor',
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
      altTextMissing: 'Alternate text missing',
      cursorSize: 'Large Cursor',
      stopAnimations: 'Stop Animations',
      keyboardNav: 'Keyboard Navigation',
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
      navBarFocus: 'Focus on',
      navBarHint: 'Keys: H headings, M menu, F forms, B buttons, G graphics, T tables, L lists, I landmarks · Shift+key = previous',
    },
    fr: {
      panelTitle: 'Accessibilité',
      sectionProfiles: 'Profils',
      profileAccessibility: 'Accessibilité',
      profileDarkTheme: 'Thème Sombre',
      profileMotor: 'Motrice',
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
      altTextMissing: 'Texte alternatif manquant',
      cursorSize: 'Grand Curseur',
      stopAnimations: 'Arrêter les Animations',
      keyboardNav: 'Navigation au Clavier',
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
      navBarFocus: 'Focus sur',
      navBarHint: 'Touches : H titres, M menu, F formulaires, B boutons, G images, T tableaux, L listes, I zones · Maj+touche = précédent',
    },
    de: {
      panelTitle: 'Barrierefreiheit',
      sectionProfiles: 'Profile',
      profileAccessibility: 'Barrierefreiheit',
      profileDarkTheme: 'Dunkles Thema',
      profileMotor: 'Motorisch',
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
      altTextMissing: 'Alternativtext fehlt',
      cursorSize: 'Großer Cursor',
      stopAnimations: 'Animationen Stoppen',
      keyboardNav: 'Tastaturnavigation',
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
      navBarFocus: 'Fokus auf',
      navBarHint: 'Tasten: H Überschriften, M Menü, F Formulare, B Schaltflächen, G Grafiken, T Tabellen, L Listen, I Bereiche · Umschalt+Taste = vorheriges',
    },
    es: {
      panelTitle: 'Accesibilidad',
      sectionProfiles: 'Perfiles',
      profileAccessibility: 'Accesibilidad',
      profileDarkTheme: 'Tema Oscuro',
      profileMotor: 'Motora',
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
      altTextMissing: 'Texto alternativo faltante',
      cursorSize: 'Cursor Grande',
      stopAnimations: 'Detener Animaciones',
      keyboardNav: 'Navegación por Teclado',
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
      navBarFocus: 'Foco en',
      navBarHint: 'Teclas: H títulos, M menú, F formularios, B botones, G gráficos, T tablas, L listas, I áreas · Mayús+tecla = anterior',
    },
  }

  /* ── Supported languages (cycle order) ── */
  const LANGS = ['it', 'en', 'fr', 'de', 'es'];
  const LANG_NAMES = { it: 'Italiano', en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español' };

  /* ───────────────────────────────────────────
     ACCESSIBILITY PROFILES
  ─────────────────────────────────────────── */
  const PROFILES = {
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
        keyboardNav: false,
      },
    },
    darkTheme: {
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      state: {
        fontSizeStep: 0,
        readableFont: false,
        lineHeight: 0,
        letterSpacing: 0,
        textAlign: '',
        contrastMode: 'dark',
        monochrome: false,
        saturation: '',
        hideImages: false,
        bigCursor: true,
        stopAnimations: false,
        keyboardNav: false,
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
        keyboardNav: false,
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
        keyboardNav: false,
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
        keyboardNav: false,
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
        keyboardNav: false,
      },
    },
    motorDisability: {
      icon: '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M6 12h.01"/><path d="M10 12h.01"/><path d="M14 12h.01"/><path d="M18 12h.01"/><path d="M8 16h8"/></svg>',
      state: {
        fontSizeStep: 0,
        readableFont: false,
        lineHeight: 0,
        letterSpacing: 0,
        textAlign: '',
        contrastMode: '',
        monochrome: false,
        saturation: '',
        hideImages: false,
        bigCursor: true,
        stopAnimations: true,
        keyboardNav: true,
      },
    },
  }

  /* ───────────────────────────────────────────
     DEFAULT CONFIG
  ─────────────────────────────────────────── */
  const DEFAULTS = {
    position: 'bottom-right', // bottom-right | bottom-left | bottom-center | top-right | top-left
    buttonColor: '#1a56db',
    buttonSize: 56,
    buttonIcon: 'default', // 'default' or SVG string
    lang: navigator.languages
      .map((l) => l.split('-')[0])
      .find((l) => LANGS.includes(l)) || 'en',
    contactEmail: '',  // REQUIRED: at least one of contactEmail / contactPhone
    contactPhone: '',  // REQUIRED: at least one of contactEmail / contactPhone
    statementText: null, // auto-generated from contacts if not provided
    agidDeclaration: null, // AgID declaration config (overrides statementText) — see README
    callback: null, // function or string (global function name) — called on every UI interaction
    iframeOrigins: null, // null = same-origin only, ['https://...'] or '*' to accept cross-origin iframes
    preserveBackground: [], // CSS selectors excluded from contrast background override, e.g. ['.q-notifications__list']
    keyboardNavBarPosition: 'bottom', // 'top' | 'bottom' — position of the keyboard nav status bar
    keyboardNavEnhancedTab: false, // true = add tabindex="0" to elements with onclick/role but no tabindex
    keyboardNavButtons: [], // additional CSS selectors for B shortcut, e.g. ['.btn', 'a.cta']
    zIndex: 999999,
  }

  /* ── Build default statement from contact info ── */
  const buildDefaultStatement = (cfg) => {
    const email = cfg.contactEmail || '';
    const phone = cfg.contactPhone || '';

    /* Build contact lines per language */
    const phoneLabels = { it: 'Telefono', en: 'Phone', fr: 'Téléphone', de: 'Telefon', es: 'Teléfono' };
    const contacts = {};
    for (let l = 0; l < LANGS.length; l++) {
      let lang = LANGS[l];
      let c = '';
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
  const buildAgidDeclaration = (cfg) => {
    let a = cfg.agidDeclaration;
    if (!a) return null;

    /* ── Defaults ── */
    const entity = a.entityName || '';
    const url = a.entityUrl || '';
    const targetType = a.entityType || 'sito web'; // 'sito web' | 'applicazione mobile'
    const status = a.conformanceStatus || 'partial'; // 'full' | 'partial' | 'none'
    const nc = a.nonAccessibleContent || {};
    const nonConf = nc.nonConformities || [];
    const burden = nc.disproportionateBurden || [];
    const outside = nc.outsideScope || [];
    const alternatives = nc.alternatives || '';
    const declDate = a.declarationDate || new Date().toISOString().slice(0, 10);
    const reviewDate = a.lastReviewDate || '';
    const evalMethod = a.evaluationMethod || 'self'; // 'self' | 'third-party'
    const evalDetails = a.evaluationDetails || '';
    const techs = a.technologies || ['HTML', 'CSS', 'JavaScript', 'WAI-ARIA'];
    const fbEmail = a.feedbackEmail || cfg.contactEmail || '';
    const fbPhone = a.feedbackPhone || cfg.contactPhone || '';
    const fbUrl = a.feedbackUrl || '';
    const fbResponseDays = a.feedbackResponseTime || '30';
    const respName = a.responsibleName || '';
    const respRole = a.responsibleRole || '';

    /* ── Helpers ── */
    const esc = (s) => { return (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
    const fmtDate = (d) => {
      if (!d) return '';
      let parts = d.split('-');
      if (parts.length === 3) return parts[2] + '/' + parts[1] + '/' + parts[0];
      return d;
    }
    const list = (arr) => {
      if (!arr || !arr.length) return '';
      let h = '<ul style="margin:8px 0;padding-left:20px;">';
      for (let i = 0; i < arr.length; i++) h += '<li>' + esc(arr[i]) + '</li>';
      return h + '</ul>';
    }

    /* ── Status labels per language ── */
    const statusLabels = {
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

    const evalLabels = {
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
    const contactBlock = (lang) => {
      let phoneL = { it: 'Telefono', en: 'Phone', fr: 'Téléphone', de: 'Telefon', es: 'Teléfono' };
      let h = '';
      if (fbEmail) h += 'Email: <a href="mailto:' + esc(fbEmail) + '">' + esc(fbEmail) + '</a><br>';
      if (fbPhone) h += phoneL[lang] + ': <strong>' + esc(fbPhone) + '</strong><br>';
      if (fbUrl) h += 'Online: <a href="' + esc(fbUrl) + '" target="_blank" rel="noopener">' + esc(fbUrl) + '</a><br>';
      if (respName) {
        let respL = { it: 'Responsabile', en: 'Contact person', fr: 'Responsable', de: 'Verantwortliche Person', es: 'Responsable' };
        h += respL[lang] + ': <strong>' + esc(respName) + '</strong>';
        if (respRole) h += ' (' + esc(respRole) + ')';
        h += '<br>';
      }
      return h;
    }

    /* ────────────────────────────────────────────
       ITALIAN (official version — Allegato 1 AgID)
    ──────────────────────────────────────────── */
    let it = '';
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
    const buildLang = (lang) => {
      let sLabel = (statusLabels[status] || statusLabels.partial)[lang];
      let eLabel = (evalLabels[evalMethod] || evalLabels.self)[lang];
      let h = '<div style="font-size:14px;line-height:1.6;">';

      let headings = {
        en: { cs: 'Compliance Status', nc: 'Non-Accessible Content', rd: 'Preparation of this Declaration', fb: 'Feedback Mechanism', pa: 'Enforcement Procedure' },
        fr: { cs: 'État de conformité', nc: 'Contenus non accessibles', rd: 'Rédaction de la déclaration', fb: 'Mécanisme de retour d\'information', pa: 'Procédure de mise en œuvre' },
        de: { cs: 'Konformitätsstatus', nc: 'Nicht barrierefreie Inhalte', rd: 'Erstellung dieser Erklärung', fb: 'Feedback-Mechanismus', pa: 'Durchsetzungsverfahren' },
        es: { cs: 'Estado de conformidad', nc: 'Contenidos no accesibles', rd: 'Redacción de la declaración', fb: 'Mecanismo de retroalimentación', pa: 'Procedimiento de aplicación' },
      };
      let hd = headings[lang] || headings.en;

      let intro = {
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
      let enforce = {
        en: 'If no satisfactory response is received within 30 days, you may file a complaint with AgID (Italian Digital Agency) via the ',
        fr: 'En cas de réponse absente ou insatisfaisante dans un délai de 30 jours, vous pouvez adresser une réclamation à l\'AgID via le ',
        de: 'Wenn innerhalb von 30 Tagen keine zufriedenstellende Antwort erfolgt, können Sie eine Beschwerde bei der AgID einreichen über den ',
        es: 'En caso de falta de respuesta o respuesta insatisfactoria dentro de los 30 días, puede presentar una reclamación a AgID a través del ',
      };
      let linkLabel = {
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
  const mergeDeep = (target, source) => {
    const out = Object.assign({}, target);
    for (let key in source) {
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
  const ICONS = {
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
  }

  /* ───────────────────────────────────────────
     DOM HELPERS (CSP-safe — no innerHTML)
  ─────────────────────────────────────────── */
  const _el = (tag, attrs = {}, ...children) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'className') e.className = v;
      else if (k === 'textContent') e.textContent = v;
      else e.setAttribute(k, v);
    }
    for (const c of children) {
      if (typeof c === 'string') e.append(c);
      else if (c) e.appendChild(c);
    }
    return e;
  };

  const _svg = (svgString) => {
    const doc = new DOMParser().parseFromString(svgString, 'image/svg+xml');
    return document.importNode(doc.documentElement, true);
  };

  /* ───────────────────────────────────────────
     SHARED CSS CONSTANTS & BUILDERS
  ─────────────────────────────────────────── */

  /* Icon-font :not() chain — reused in readable-font rules */
  const CSS_ICON_EXCL = ':not(.fa):not(.fas):not(.far):not(.fal):not(.fat):not(.fad):not(.fab):not(.fa-brands):not(.fa-solid):not(.fa-regular):not(.fa-light):not(.fa-thin):not(.fa-duotone):not(.material-icons):not(.material-symbols-outlined)';

  /* Utility rules identical in parent and iframe child */
  const CSS_SHARED =
    '.aa-img-wrap{position:relative;display:inline-block;width:100%;}\n' +
    '.aa-alt-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;word-break:break-word;border:2px dashed #9ca3af;border-radius:4px;background:rgba(243,244,246,0.9);color:#374151;font-style:italic;pointer-events:none;z-index:1;}\n' +
    '.aa-alt-label.aa-alt-missing{color:#dc2626;border-color:#fca5a5;background:rgba(254,242,242,0.9);}\n' +
    '.aa-stop-animations,.aa-stop-animations *{animation:none!important;transition:none!important;}\n' +
    '.aa-big-cursor,.aa-big-cursor *{cursor:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\' fill=\'black\' stroke=\'white\' stroke-width=\'1\'%3E%3Cpath d=\'M5 3l14 8-6 1.5L10 19z\'/%3E%3C/svg%3E") 4 2,auto!important;}\n' +
    /* Keyboard navigation — enhanced focus ring */
    'html.aa-keyboard-nav *:focus{outline:3px solid #1a56db!important;outline-offset:2px!important;box-shadow:0 0 0 6px rgba(26,86,219,0.25)!important;}\n' +
    'html.aa-keyboard-nav *:focus:not(:focus-visible){outline:none!important;box-shadow:none!important;}\n' +
    /* Status bar */
    '#aa-nav-bar{position:fixed;left:0;right:0;z-index:999997;display:none;align-items:center;gap:12px;padding:8px 16px;background:rgba(17,24,39,0.92);color:#f3f4f6;font-size:13px;font-family:system-ui,-apple-system,sans-serif;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);}\n' +
    '#aa-nav-bar.aa-nav-top{top:0;}#aa-nav-bar.aa-nav-bottom{bottom:0;}\n' +
    'html.aa-keyboard-nav #aa-nav-bar{display:flex;}\n' +
    '#aa-nav-bar .aa-nav-focus{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;}\n' +
    '#aa-nav-bar .aa-nav-focus .aa-nav-tag{display:inline-block;padding:1px 6px;border-radius:4px;background:#374151;color:#9ca3af;font-size:11px;font-weight:400;margin-right:6px;text-transform:uppercase;}\n' +
    '#aa-nav-bar .aa-nav-hint{color:#9ca3af;font-size:11px;white-space:nowrap;}\n' +
    '#aa-nav-bar .aa-nav-hint kbd{display:inline-block;padding:1px 5px;border:1px solid #6b7280;border-radius:3px;background:#1f2937;color:#e5e7eb;font-size:11px;font-family:inherit;margin:0 1px;}\n';

  /* Contrast theme definitions */
  const CONTRAST_THEMES = [
    { mode: 'dark', bg: '#1a1a2e', fg: '#e0e0e0', bc: '#444', lc: '#7eb8ff', bb: '#7eb8ff' },
    { mode: 'light', bg: '#fff', fg: '#111', bc: '#ccc', lc: null, bb: '#111' },
    { mode: 'high', bg: '#000', fg: '#ff0', bc: '#ff0', lc: '#0ff', bb: '#ff0' },
  ];

  /**
   * Build contrast CSS rules (shared by parent and iframe child).
   * @param {string} elExcl   :not() for body * selector (e.g. ':not(#aa-panel)...')
   * @param {string} linkExcl :not() for link color (e.g. ':not(#aa-panel a)')
   * @param {Object} bdrExcl  per-element :not() for border rules { a, button, select, role }
   * @param {string} pbx      preserveBackground :not() chain
   */
  const _buildContrastCSS = (elExcl, linkExcl, bdrExcl, pbx) => {
    let css = '';
    for (const t of CONTRAST_THEMES) {
      const m = 'html.aa-contrast-' + t.mode;
      css += m + '{background:' + t.bg + '!important;}\n';
      css += m + ' body{background:' + t.bg + '!important;color:' + t.fg + '!important;}\n';
      css += m + ' body *' + elExcl + pbx + '{background-color:' + t.bg + '!important;color:' + t.fg + '!important;border-color:' + t.bc + '!important;}\n';
      if (t.lc) css += m + ' a' + linkExcl + '{color:' + t.lc + '!important;}\n';
      /* Interactive element borders */
      const sels = [
        'a' + (bdrExcl.a || ''),
        'button' + (bdrExcl.button || ''),
        'input[type="submit"]', 'input[type="button"]',
        'select' + (bdrExcl.select || ''),
        '[role="button"]' + (bdrExcl.role || ''),
      ];
      css += sels.map((s) => m + ' body ' + s).join(',') +
        '{border:1px solid ' + t.bb + '!important;}\n';
    }
    return css;
  };

  /**
   * Build filter overlay + monochrome/saturation CSS.
   * @param {number} zIndex   z-index for overlay
   * @param {string} bodyExcl :not() chain for fallback body>* selectors
   */
  const _buildFilterCSS = (zIndex, bodyExcl) =>
    '#aa-filter-overlay{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:' + zIndex + ';}\n' +
    'html.aa-monochrome #aa-filter-overlay{backdrop-filter:grayscale(100%);-webkit-backdrop-filter:grayscale(100%);}\n' +
    'html.aa-saturation-high #aa-filter-overlay{backdrop-filter:saturate(200%);-webkit-backdrop-filter:saturate(200%);}\n' +
    'html.aa-saturation-low #aa-filter-overlay{backdrop-filter:saturate(40%);-webkit-backdrop-filter:saturate(40%);}\n' +
    '@supports not (backdrop-filter:grayscale(100%)){' +
    'html.aa-monochrome body>*' + bodyExcl + '{filter:grayscale(100%)!important;}' +
    'html.aa-saturation-high body>*' + bodyExcl + '{filter:saturate(200%)!important;}' +
    'html.aa-saturation-low body>*' + bodyExcl + '{filter:saturate(40%)!important;}' +
    '}\n';

  /* Widget-element exclusion string (parent only) */
  const WX_PANEL = ':not(#aa-panel):not(#aa-panel *)';
  const WX_ALL = WX_PANEL + ':not(#aa-trigger):not(#aa-statement-overlay):not(#aa-statement-overlay *)';
  const WX_FILTER = ':not(#aa-filter-overlay)';

  /* Border exclusion map (parent only) */
  const BDR_PARENT = {
    a: ':not(#aa-panel a):not(#aa-statement-overlay a)',
    button: ':not(#aa-panel button):not(#aa-trigger):not(#aa-statement-overlay button)',
    select: ':not(.aa-lang-select)',
    role: ':not(#aa-panel [role="button"])',
  };

  /* ───────────────────────────────────────────
     LOCAL STORAGE KEY
  ─────────────────────────────────────────── */
  const STORAGE_KEY = 'asset-accessibility-prefs';

  /* ───────────────────────────────────────────
     MAIN CLASS
  ─────────────────────────────────────────── */
  const PROFILE_I18N = {
    accessibility: 'profileAccessibility',
    darkTheme: 'profileDarkTheme',
    visuallyImpaired: 'profileVisuallyImpaired',
    adhd: 'profileAdhd',
    cognitive: 'profileCognitive',
    dyslexia: 'profileDyslexia',
    motorDisability: 'profileMotor',
  }

  /* ── Keyboard navigation shortcut map ── */
  const KBD_SHORTCUTS = {
    h: 'h1,h2,h3,h4,h5,h6',
    m: 'nav,[role="navigation"]',
    f: 'form,input:not([type="hidden"]),select,textarea',
    b: 'button,[role="button"],input[type="submit"],input[type="button"]',
    g: 'img,svg[role="img"],[role="img"],figure',
    t: 'table,[role="table"],[role="grid"]',
    l: 'ul,ol,[role="list"]',
    i: 'main,header,footer,aside,section,[role="main"],[role="banner"],[role="contentinfo"],[role="complementary"],[role="region"]',
  };

  class AssetAccessibility {
    constructor(mergedConfig) {
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
        keyboardNav: false,
      };

      // Restore persisted preferences
      this._loadState();

      this._injectStyles();
      this._buildDOM();
      this._applyState();
      this._bindEvents();
      this._listenForIframes();
    }


    /* ─── t() helper ─── */
    t(key) {
      return i18n[this.lang]?.[key] ?? key;
    }

    /* ───────────────────────────────────────────
       CSS
    ─────────────────────────────────────────── */
    _injectStyles() {
      const cfg = this.cfg;
      const pos = cfg.position;
      const isCenter = pos === 'bottom-center';

      const btnBottom = pos.indexOf('bottom') > -1 ? '20px' : 'auto';
      const btnTop = pos.indexOf('top') > -1 ? '20px' : 'auto';
      const btnRight = isCenter ? 'auto' : (pos.indexOf('right') > -1 ? '20px' : 'auto');
      const btnLeft = isCenter ? '50%' : (pos.indexOf('left') > -1 ? '20px' : 'auto');
      const btnTransform = isCenter ? 'translateX(-50%)' : 'none';

      const panelBottom = pos.indexOf('bottom') > -1 ? (cfg.buttonSize + 30) + 'px' : 'auto';
      const panelTop = pos.indexOf('top') > -1 ? (cfg.buttonSize + 30) + 'px' : 'auto';
      const panelRight = isCenter ? 'auto' : (pos.indexOf('right') > -1 ? '20px' : 'auto');
      const panelLeft = isCenter ? '50%' : (pos.indexOf('left') > -1 ? '20px' : 'auto');
      const panelTransform = isCenter ? 'translateX(-50%)' : 'none';

      /* Build :not() exclusions from preserveBackground config */
      let pbx = '';
      if (cfg.preserveBackground && cfg.preserveBackground.length) {
        for (let pb = 0; pb < cfg.preserveBackground.length; pb++) {
          let sel = cfg.preserveBackground[pb];
          pbx += ':not(' + sel + '):not(' + sel + ' *)';
        }
      }

      const css = '\n' +
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
        '.aa-readable-font,.aa-readable-font *' + WX_PANEL + ':not(#aa-trigger):not(#aa-statement-box):not(#aa-statement-box *)' + CSS_ICON_EXCL + '{font-family:Arial,Helvetica,sans-serif!important;}\n' +
        '.aa-align-left,.aa-align-left *' + WX_PANEL + '{text-align:left!important;}\n' +
        '.aa-align-center,.aa-align-center *' + WX_PANEL + '{text-align:center!important;}\n' +
        '.aa-align-right,.aa-align-right *' + WX_PANEL + '{text-align:right!important;}\n' +
        '.aa-hide-images img:not(#aa-panel img){opacity:0!important;}\n' +
        '.aa-hide-images *' + WX_ALL + ':not(.aa-alt-label){background-image:none!important;}\n' +
        CSS_SHARED +

        /* Contrast themes */
        _buildContrastCSS(WX_ALL + WX_FILTER, ':not(#aa-panel a)', BDR_PARENT, pbx) +

        /* Monochrome & saturation */
        _buildFilterCSS(cfg.zIndex - 1, ':not(#aa-panel):not(#aa-trigger):not(#aa-statement-overlay):not(#aa-filter-overlay)') +

        '/* end widget styles */\n';

      const style = document.createElement('style');
      style.setAttribute('data-aw', 'true');
      style.textContent = css;
      document.head.appendChild(style);
      this._styleEl = style;
    }

    /* ───────────────────────────────────────────
       DOM
    ─────────────────────────────────────────── */
    _buildDOM() {

      /* ── Screen Reader Live Region ── */
      const live = document.createElement('div');
      live.id = 'aa-live-region';
      live.setAttribute('role', 'status');
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      live.style.cssText = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      document.body.appendChild(live);
      this._liveRegion = live;

      /* ── Filter Overlay (for grayscale / saturation without breaking position:fixed) ── */
      const filterOv = document.createElement('div');
      filterOv.id = 'aa-filter-overlay';
      filterOv.setAttribute('aria-hidden', 'true');
      document.body.appendChild(filterOv);

      /* ── Trigger Button ── */
      const btn = document.createElement('button');
      btn.id = 'aa-trigger';
      btn.setAttribute('aria-label', this.t('srOpenPanel'));
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-controls', 'aa-panel');
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('title', this.t('panelTitle'));
      btn.innerHTML =
        this.cfg.buttonIcon === 'default'
          ? ICONS.accessibility
          : this.cfg.buttonIcon;
      document.body.appendChild(btn);
      this._btn = btn;

      /* ── Panel ── */
      const panel = document.createElement('div');
      panel.id = 'aa-panel';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-labelledby', 'aa-panel-title');
      document.body.appendChild(panel);
      this._panel = panel;

      /* ── Statement Overlay ── */
      const stmtOv = document.createElement('div');
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
        ICONS.close +
        '</button></div>' +
        '<div class="aa-stmt-body"></div></div>';
      document.body.appendChild(stmtOv);
      this._stmtOverlay = stmtOv;

      this._renderPanel();
    }

    /* ─── Render panel contents ─── */
    _renderPanel() {
      let s = this.state;

      let html = '';

      /* Header */
      html +=
        '<div class="aa-header">' +
        '<span class="aa-header-title" id="aa-panel-title">' +
        ICONS.accessibility +
        ' ' +
        this.t('panelTitle') +
        '</span>' +
        '<div class="aa-header-actions">' +
        '<select class="aa-lang-select" data-action="changeLang" aria-label="' +
        this.t('srChangeLang') + '">' +
        ((currentLang) => {
          let opts = '';
          for (let li = 0; li < LANGS.length; li++) {
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
        ICONS.close +
        '</button>' +
        '</div></div>';

      /* Body */
      html += '<div class="aa-body">';

      /* ─ Profiles section ─ */
      html += '<div class="aa-section-label" id="aa-sec-profiles">' + this.t('sectionProfiles') + '</div>';
      html += '<div class="aa-profiles" role="group" aria-labelledby="aa-sec-profiles">';
      const profileKeys = ['accessibility', 'darkTheme', 'visuallyImpaired', 'adhd', 'cognitive', 'dyslexia', 'motorDisability'];
      const profileI18nKeys = ['profileAccessibility', 'profileDarkTheme', 'profileVisuallyImpaired', 'profileAdhd', 'profileCognitive', 'profileDyslexia', 'profileMotor'];
      for (let p = 0; p < profileKeys.length; p++) {
        const pKey = profileKeys[p];
        const isActive = s.activeProfile === pKey;
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
        ICONS.alignLeft +
        '</button>' +
        '<button class="aa-align-btn' +
        (s.textAlign === 'center' ? ' aa-active' : '') +
        '" data-action="align" data-value="center" aria-label="' +
        this.t('alignCenter') +
        '" aria-pressed="' + (s.textAlign === 'center') + '">' +
        ICONS.alignCenter +
        '</button>' +
        '<button class="aa-align-btn' +
        (s.textAlign === 'right' ? ' aa-active' : '') +
        '" data-action="align" data-value="right" aria-label="' +
        this.t('alignRight') +
        '" aria-pressed="' + (s.textAlign === 'right') + '">' +
        ICONS.alignRight +
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
      const modes = ['contrastDark', 'contrastLight', 'contrastHigh'];
      const modeVals = ['dark', 'light', 'high'];
      for (let i = 0; i < modes.length; i++) {
        const mActive = s.contrastMode === modeVals[i];
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
      html += this._rowToggle('keyboardNav', s.keyboardNav);
      html += '</div>';

      html += '</div>'; // .aa-body

      /* Footer */
      html +=
        '<div class="aa-footer">' +
        '<button class="aa-footer-btn aa-btn-reset" data-action="reset">' +
        ICONS.reset +
        ' ' +
        this.t('resetAll') +
        '</button>' +
        '<button class="aa-footer-btn aa-btn-statement" data-action="showStatement">' +
        ICONS.doc +
        ' ' +
        this.t('statement') +
        '</button>' +
        '</div>';

      /* Preserve scroll position */
      const body = this._panel.querySelector('.aa-body');
      const scrollPos = body ? body.scrollTop : 0;

      this._panel.innerHTML = html;

      /* Restore scroll position */
      const newBody = this._panel.querySelector('.aa-body');
      if (newBody) newBody.scrollTop = scrollPos;
    }

    /* ─── Helper: stepper row ─── */
    _rowStepper(key, value, suffix) {
      let display;
      if (key === 'fontSize') {
        display = (value >= 0 ? '+' : '') + value * 10 + suffix;
      } else {
        display = '+' + value * 20 + suffix;
      }
      const label = this.t(key);
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
        ICONS.minus +
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
        ICONS.plus +
        '</button></div></div>'
      );
    }

    /* ─── Helper: toggle row ─── */
    _rowToggle(key, active) {
      let stateKey;
      if (key === 'readableFont') stateKey = 'readableFont';
      else if (key === 'hideImages') stateKey = 'hideImages';
      else if (key === 'cursorSize') stateKey = 'bigCursor';
      else if (key === 'stopAnimations') stateKey = 'stopAnimations';
      else if (key === 'keyboardNav') stateKey = 'keyboardNav';
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
    }

    /* ───────────────────────────────────────────
       CALLBACK
    ─────────────────────────────────────────── */
    _fireCallback(action, detail) {
      const cb = typeof this.cfg.callback === 'string'
        ? window[this.cfg.callback]
        : this.cfg.callback;
      if (typeof cb !== 'function') return;
      try {
        cb({
          action,
          detail: detail || null,
          state: JSON.parse(JSON.stringify(this.state)),
          lang: this.lang,
        });
      } catch (e) {
        console.warn('[Asset Accessibility] Callback error:', e);
      }
    }

    /* ───────────────────────────────────────────
       SCREEN READER ANNOUNCE
    ─────────────────────────────────────────── */
    _announce(msg) {
      if (!this._liveRegion) return;
      this._liveRegion.textContent = '';
      /* Small delay to ensure screen readers pick up the change */
      setTimeout(() => {
        this._liveRegion.textContent = msg;
      }, 50);
    }

    /* ───────────────────────────────────────────
       EVENTS
    ─────────────────────────────────────────── */
    _bindEvents() {

      this._btn.addEventListener('click', () => {
        this.isOpen ? this._closePanel() : this._openPanel();
        this._fireCallback(this.isOpen ? 'openPanel' : 'closePanel');
      });

      this._panel.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;
        const action = target.getAttribute('data-action');

        switch (action) {
          case 'closePanel':
            this._closePanel();
            break;
          case 'step':
            this._handleStep(
              target.getAttribute('data-key'),
              parseInt(target.getAttribute('data-dir'))
            );
            break;
          case 'toggle':
            this._handleToggle(target.getAttribute('data-key'));
            break;
          case 'align':
            this._handleAlign(target.getAttribute('data-value'));
            break;
          case 'contrast':
            this._handleContrast(target.getAttribute('data-value'));
            break;
          case 'toggleMono':
            this.state.activeProfile = '';
            this.state.monochrome = !this.state.monochrome;
            if (this.state.monochrome) this.state.saturation = '';
            this._applyState();
            this._renderPanel();
            this._announce(this.t('monochrome') + ': ' + (this.state.monochrome ? this.t('srActivated') : this.t('srDeactivated')));
            break;
          case 'saturation':
            this.state.activeProfile = '';
            let val = target.getAttribute('data-value');
            let satLabel = val === 'high' ? this.t('saturationHigh') : this.t('saturationLow');
            this.state.saturation = this.state.saturation === val ? '' : val;
            if (this.state.saturation) this.state.monochrome = false;
            this._applyState();
            this._renderPanel();
            this._announce(satLabel + ': ' + (this.state.saturation === val ? this.t('srActivated') : this.t('srDeactivated')));
            break;
          case 'reset':
            this._resetAll();
            this._announce(this.t('srResetDone'));
            break;
          case 'applyProfile':
            this._applyProfile(target.getAttribute('data-value'));
            break;
          case 'showStatement':
            this._showStatement();
            break;
        }

        /* Fire callback for every panel interaction */
        this._fireCallback(action, {
          key: target.getAttribute('data-key') || undefined,
          value: target.getAttribute('data-value') || undefined,
        });
      });

      /* Language dropdown */
      this._panel.addEventListener('change', (e) => {
        if (e.target.classList.contains('aa-lang-select')) {
          this.lang = e.target.value;
          this._saveState();
          this._renderPanel();
          this._updateStatementOverlay();
          this._announce(this.t('srChangeLang') + ': ' + LANG_NAMES[this.lang]);
          this._fireCallback('changeLang', { value: this.lang });
        }
      });

      /* Statement overlay */
      this._stmtOverlay.addEventListener('click', (e) => {
        if (
          e.target === this._stmtOverlay ||
          e.target.closest('.aa-stmt-close')
        ) {
          this._closeStatement();
          this._fireCallback('closeStatement');
        }
      });

      /* Escape key + Focus trap */
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.statementOpen) {
            this._closeStatement();
            this._fireCallback('closeStatement');
          } else if (this.isOpen) {
            this._closePanel();
            this._fireCallback('closePanel');
          }
          return;
        }

        /* Focus trap: Tab / Shift+Tab */
        if (e.key === 'Tab') {
          let container = null;
          if (this.statementOpen) container = this._stmtOverlay.querySelector('#aa-statement-box');
          else if (this.isOpen) container = this._panel;
          if (!container) return;

          let focusable = container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
          if (!focusable.length) return;
          let first = focusable[0];
          let last = focusable[focusable.length - 1];

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
    }

    /* ─── Action handlers ─── */
    _handleStep(key, dir) {
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
    }

    _handleToggle(key) {
      this.state.activeProfile = '';
      this.state[key] = !this.state[key];
      /* Map state key back to i18n key for announcement */
      const labelMap = { readableFont: 'readableFont', hideImages: 'hideImages', bigCursor: 'cursorSize', stopAnimations: 'stopAnimations', keyboardNav: 'keyboardNav' };
      const label = this.t(labelMap[key] || key);
      this._applyState();
      this._renderPanel();
      this._announce(label + ': ' + (this.state[key] ? this.t('srActivated') : this.t('srDeactivated')));
    }

    _handleAlign(val) {
      this.state.activeProfile = '';
      this.state.textAlign = this.state.textAlign === val ? '' : val;
      const alignMap = { left: 'alignLeft', center: 'alignCenter', right: 'alignRight' };
      this._applyState();
      this._renderPanel();
      this._announce(this.t('textAlign') + ': ' + (this.state.textAlign ? this.t(alignMap[this.state.textAlign]) : this.t('srDeactivated')));
    }

    _handleContrast(val) {
      this.state.activeProfile = '';
      this.state.contrastMode = this.state.contrastMode === val ? '' : val;
      const contrastMap = { dark: 'contrastDark', light: 'contrastLight', high: 'contrastHigh' };
      this._applyState();
      this._renderPanel();
      this._announce(
        this.state.contrastMode
          ? this.t(contrastMap[this.state.contrastMode]) + ': ' + this.t('srActivated')
          : this.t(contrastMap[val]) + ': ' + this.t('srDeactivated')
      );
    }

    _applyProfile(key) {
      /* Toggle off if same profile is already active */
      if (this.state.activeProfile === key) {
        this._resetAll();
        this._announce(this.t(PROFILE_I18N[key]) + ': ' + this.t('srProfileDeactivated'));
        return;
      }
      let profile = PROFILES[key];
      if (!profile) return;

      /* Copy profile state into current state */
      let ps = profile.state;
      for (let k in ps) {
        if (ps.hasOwnProperty(k)) {
          this.state[k] = ps[k];
        }
      }
      this.state.activeProfile = key;
      this._applyState();
      this._renderPanel();
      this._announce(this.t(PROFILE_I18N[key]) + ': ' + this.t('srProfileActivated'));
    }

    /* ───────────────────────────────────────────
       PERSISTENCE (localStorage)
    ─────────────────────────────────────────── */
    _saveState() {
      try {
        let data = { state: this.state, lang: this.lang };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        /* localStorage non disponibile o pieno — silenzio */
      }
    }

    _loadState() {
      try {
        let raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        let data = JSON.parse(raw);
        if (data && data.state) {
          for (let key in this.state) {
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
    }

    _clearState() {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        /* silenzio */
      }
    }

    /* ───────────────────────────────────────────
       IFRAME PARENT: listen for children & broadcast
    ─────────────────────────────────────────── */
    _listenForIframes() {
      const allowed = this.cfg.iframeOrigins; // null | '*' | ['https://...']
      console.log('[AA parent] Ascolto per iframe children. iframeOrigins:', allowed, '| location.origin:', location.origin);
      window.addEventListener('message', (e) => {
        if (e.data?.type !== 'aa-child-ready') return;
        console.log('[AA parent] Ricevuto aa-child-ready da origin:', e.origin);
        /* Validate origin */
        let ok = false;
        if (allowed === '*') {
          ok = true;
        } else if (Array.isArray(allowed)) {
          ok = allowed.indexOf(e.origin) !== -1 || e.origin === location.origin;
        } else {
          /* Default: same-origin only */
          ok = e.origin === location.origin;
        }
        if (!ok) {
          console.warn('[AA parent] Origin rifiutato:', e.origin);
          return;
        }
        /* Avoid registering the same source twice */
        const src = e.source;
        for (let i = 0; i < this._iframeChildren.length; i++) {
          if (this._iframeChildren[i].source === src) {
            console.log('[AA parent] Iframe già registrato, reinvio stato.');
            this._sendStateTo(src, e.origin);
            return;
          }
        }
        console.log('[AA parent] Nuovo iframe registrato. Totale:', this._iframeChildren.length + 1);
        this._iframeChildren.push({ source: src, origin: e.origin });
        this._sendStateTo(src, e.origin);
      });
    }

    _sendStateTo(targetWindow, origin) {
      try {
        console.log('[AA parent] Invio stato a iframe, origin:', origin, '| state keys:', Object.keys(this.state).length);
        targetWindow.postMessage({
          type: 'aa-state-update',
          state: JSON.parse(JSON.stringify(this.state)),
          preserveBackground: this.cfg.preserveBackground || [],
          altTextMissing: this.t('altTextMissing'),
          keyboardNavBarPosition: this.cfg.keyboardNavBarPosition || 'bottom',
          keyboardNavButtons: this.cfg.keyboardNavButtons || [],
          navBarHint: this._buildHintHTML(),
          navBarFocusLabel: this.t('navBarFocus'),
        }, origin);
      } catch (e) {
        console.error('[AA parent] Errore invio a iframe:', e.message);
      }
    }

    _broadcastState() {
      let alive = [];
      for (let i = 0; i < this._iframeChildren.length; i++) {
        let child = this._iframeChildren[i];
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
    }

    /* ───────────────────────────────────────────
       APPLY STATE TO PAGE
    ─────────────────────────────────────────── */
    _applyState() {
      let html = document.documentElement;
      let s = this.state;

      /* Font size */
      if (s.fontSizeStep !== 0) {
        let pct = 100 + s.fontSizeStep * 10;
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
      let classes = {
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
        'aa-keyboard-nav': s.keyboardNav,
      };

      for (let cls in classes) {
        if (classes[cls]) {
          html.classList.add(cls);
        } else {
          html.classList.remove(cls);
        }
      }

      /* Alt text overlays */
      if (s.hideImages) {
        this._showAltLabels();
      } else {
        this._hideAltLabels();
      }

      /* Keyboard navigation */
      if (s.keyboardNav) {
        this._enableKeyboardNav();
      } else {
        this._disableKeyboardNav();
      }

      /* Persist */
      this._saveState();

      /* Broadcast to iframe children */
      this._broadcastState();
    }

    /* ───────────────────────────────────────────
       PANEL OPEN / CLOSE
    ─────────────────────────────────────────── */
    _openPanel() {
      this._panel.classList.add('aa-visible');
      this.isOpen = true;
      this._btn.setAttribute('aria-expanded', 'true');
      this._btn.setAttribute('aria-label', this.t('srClosePanel'));
      /* Focus first interactive element in panel */
      setTimeout(() => {
        let first = this._panel.querySelector('button, [tabindex]');
        if (first) first.focus();
      }, 100);
    };
    _closePanel() {
      this._panel.classList.remove('aa-visible');
      this.isOpen = false;
      this._btn.setAttribute('aria-expanded', 'false');
      this._btn.setAttribute('aria-label', this.t('srOpenPanel'));
      this._btn.focus();
    }

    /* ───────────────────────────────────────────
       STATEMENT
    ─────────────────────────────────────────── */
    _showStatement() {
      this._updateStatementOverlay();
      this._stmtOverlay.classList.add('aa-visible');
      this.statementOpen = true;
      /* Focus close button in statement */
      setTimeout(() => {
        let closeBtn = this._stmtOverlay.querySelector('.aa-stmt-close');
        if (closeBtn) closeBtn.focus();
      }, 100);
    };
    _closeStatement() {
      this._stmtOverlay.classList.remove('aa-visible');
      this.statementOpen = false;
      /* Return focus to statement button in panel */
      let stmtBtn = this._panel.querySelector('[data-action="showStatement"]');
      if (stmtBtn) stmtBtn.focus();
    };
    _updateStatementOverlay() {
      let titleEl = this._stmtOverlay.querySelector('.aa-stmt-title');
      let bodyEl = this._stmtOverlay.querySelector('.aa-stmt-body');
      let st = this.cfg.statementText || {};
      titleEl.textContent = this.t('statementTitle');
      bodyEl.innerHTML = st[this.lang] || st.en || st.it || '';
    }

    /* ───────────────────────────────────────────
       RESET
    ─────────────────────────────────────────── */
    _resetAll() {
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
        keyboardNav: false,
      };
      this._clearState();
      this._applyState();
      this._renderPanel();
    }

    /* ───────────────────────────────────────────
       KEYBOARD NAVIGATION METHODS
    ─────────────────────────────────────────── */
    _enableKeyboardNav() {
      if (this._kbActive) return;
      this._kbActive = true;

      /* ── Status bar ── */
      if (!this._navBar) {
        const bar = document.createElement('div');
        bar.id = 'aa-nav-bar';
        bar.setAttribute('aria-hidden', 'true');
        const pos = this.cfg.keyboardNavBarPosition === 'top' ? 'aa-nav-top' : 'aa-nav-bottom';
        bar.className = pos;

        const focusSpan = document.createElement('span');
        focusSpan.className = 'aa-nav-focus';
        focusSpan.textContent = '—';

        const hintSpan = document.createElement('span');
        hintSpan.className = 'aa-nav-hint';
        hintSpan.innerHTML = this._buildHintHTML();

        bar.appendChild(focusSpan);
        bar.appendChild(hintSpan);
        document.body.appendChild(bar);
        this._navBar = bar;
        this._navFocus = focusSpan;
        this._navHint = hintSpan;
      }

      /* ── Enhanced tab (optional) ── */
      if (this.cfg.keyboardNavEnhancedTab) {
        this._enhancedTabEls = [];
        document.querySelectorAll('[role="button"],[role="link"],[role="tab"],[role="menuitem"],[role="option"],[onclick]').forEach((el) => {
          if (!el.closest('#aa-panel,#aa-trigger,#aa-statement-overlay') &&
            el.tabIndex < 0 && !el.getAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
            el.setAttribute('data-aa-tabindex', 'true');
            this._enhancedTabEls.push(el);
          }
        });
      }

      /* ── Build effective shortcut map (merge keyboardNavButtons into B) ── */
      this._kbMap = Object.assign({}, KBD_SHORTCUTS);
      if (this.cfg.keyboardNavButtons && this.cfg.keyboardNavButtons.length) {
        this._kbMap.b = this._kbMap.b + ',' + this.cfg.keyboardNavButtons.join(',');
      }

      /* ── Shortcut listener ── */
      this._kbShortcutHandler = (e) => {
        /* Skip if inside text input or with non-shift modifiers */
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;
        /* Skip if panel or statement is open */
        if (this.isOpen || this.statementOpen) return;

        const key = e.key.toLowerCase();
        const selector = this._kbMap[key];
        if (!selector) return;

        e.preventDefault();
        this._jumpTo(selector, e.shiftKey ? -1 : 1);
      };
      document.addEventListener('keydown', this._kbShortcutHandler);

      /* ── Focus tracker ── */
      this._kbFocusHandler = () => {
        this._updateNavBar();
      };
      document.addEventListener('focusin', this._kbFocusHandler);
    }

    _disableKeyboardNav() {
      if (!this._kbActive) return;
      this._kbActive = false;

      /* Remove shortcut listener */
      if (this._kbShortcutHandler) {
        document.removeEventListener('keydown', this._kbShortcutHandler);
        this._kbShortcutHandler = null;
      }
      this._kbMap = null;

      /* Remove focus tracker */
      if (this._kbFocusHandler) {
        document.removeEventListener('focusin', this._kbFocusHandler);
        this._kbFocusHandler = null;
      }

      /* Remove enhanced tab */
      if (this._enhancedTabEls) {
        for (const el of this._enhancedTabEls) {
          el.removeAttribute('tabindex');
          el.removeAttribute('data-aa-tabindex');
        }
        this._enhancedTabEls = null;
      }

      /* Remove status bar */
      if (this._navBar) {
        this._navBar.remove();
        this._navBar = null;
        this._navFocus = null;
        this._navHint = null;
      }

      /* Remove temporary tabindex on non-focusable elements */
      document.querySelectorAll('[data-aa-temp-focus]').forEach((el) => {
        el.removeAttribute('tabindex');
        el.removeAttribute('data-aa-temp-focus');
      });
    }

    _jumpTo(selector, dir) {
      const all = Array.from(document.querySelectorAll(selector)).filter(
        (el) => !el.closest('#aa-panel,#aa-trigger,#aa-statement-overlay,#aa-nav-bar') &&
          !el.disabled && !el.hidden && el.offsetParent !== null
      );
      if (!all.length) return;

      /* Find current position */
      const current = document.activeElement;
      let idx = -1;
      for (let i = 0; i < all.length; i++) {
        if (all[i] === current || all[i].contains(current)) {
          idx = i;
          break;
        }
      }
      /* Jump forward or backward (cycle) */
      const next = all[((idx + dir) % all.length + all.length) % all.length];

      /* Ensure focusable */
      if (next.tabIndex < 0 && !next.getAttribute('tabindex')) {
        next.setAttribute('tabindex', '-1');
        next.setAttribute('data-aa-temp-focus', 'true');
      }
      next.focus();
      next.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    _updateNavBar() {
      if (!this._navFocus) return;
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) {
        this._navFocus.textContent = '—';
        return;
      }
      const tag = el.tagName.toLowerCase();
      const text = (el.getAttribute('aria-label') || el.textContent || '').trim().substring(0, 60);
      this._navFocus.innerHTML = '';

      const tagSpan = document.createElement('span');
      tagSpan.className = 'aa-nav-tag';
      tagSpan.textContent = tag;
      this._navFocus.appendChild(tagSpan);
      this._navFocus.appendChild(document.createTextNode(
        (this.t('navBarFocus') + ' ') + (text || '#' + (el.id || '…'))
      ));
    }

    _buildHintHTML() {
      const keys = Object.keys(KBD_SHORTCUTS);
      return keys.map((k) => '<kbd>' + k.toUpperCase() + '</kbd>').join(' ');
    }

    /* ───────────────────────────────────────────
       ALT TEXT OVERLAY (when images are hidden)
    ─────────────────────────────────────────── */
    _showAltLabels() {
      const missingText = this.t('altTextMissing');
      document.querySelectorAll('img:not(#aa-panel img):not(#aa-statement-overlay img)').forEach((img) => {
        if (img.closest('.aa-img-wrap')) return; // already wrapped

        const wrap = document.createElement('span');
        wrap.className = 'aa-img-wrap';

        const label = document.createElement('span');
        label.className = 'aa-alt-label';
        const alt = (img.getAttribute('alt') ?? '').trim();
        if (alt) {
          label.textContent = alt;
        } else {
          label.textContent = missingText;
          label.classList.add('aa-alt-missing');
        }

        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
        wrap.appendChild(label);
      });
    }

    _hideAltLabels() {
      document.querySelectorAll('.aa-img-wrap').forEach((wrap) => {
        const img = wrap.querySelector('img');
        if (img) {
          wrap.parentNode.insertBefore(img, wrap);
        }
        wrap.remove();
      });
    }

  } /* end class AssetAccessibility */

  /* ───────────────────────────────────────────
     IFRAME CHILD MODE
  ─────────────────────────────────────────── */
  class IframeChild {
    constructor(allowedOrigin) {
      this._origin = allowedOrigin || location.origin;
      this._pollTimer = null;
      this._pollTimeout = null;
      this._ready = false;
      this._pbInjected = false;
      this._altTextMissing = 'Alternate text missing';
      this._kbActive = false;
      this._navBarPosition = 'bottom';
      this._navBarHint = '';
      this._navBarFocusLabel = 'Focus on';
      this._keyboardNavButtons = [];
      this.state = null;

      console.log('[AA iframe] Modalità iframe attivata. Origin target:', this._origin);

      this._injectStyles();
      this._createOverlay();
      this._listenForParent();
      this._startPolling();
    }

    _injectStyles() {
      /* Utility CSS — injected once, never changes */
      const css = '\n/* ===== Asset Accessibility (iframe child) ===== */\n' +
        '.aa-readable-font,.aa-readable-font *' + CSS_ICON_EXCL + '{font-family:Arial,Helvetica,sans-serif!important;}\n' +
        '.aa-align-left,.aa-align-left *{text-align:left!important;}\n' +
        '.aa-align-center,.aa-align-center *{text-align:center!important;}\n' +
        '.aa-align-right,.aa-align-right *{text-align:right!important;}\n' +
        '.aa-hide-images img{opacity:0!important;}\n' +
        '.aa-hide-images *:not(.aa-alt-label){background-image:none!important;}\n' +
        CSS_SHARED +
        _buildFilterCSS(999998, ':not(#aa-filter-overlay)') +
        '/* end iframe utility styles */\n';

      const style = document.createElement('style');
      style.setAttribute('data-aw', 'iframe');
      style.textContent = css;
      document.head.appendChild(style);

      /* Inject contrast CSS separately (may be re-injected with exclusions) */
      this._injectContrastCSS([]);
    }

    _injectContrastCSS(preserveBackground) {
      /* Remove existing contrast stylesheet if any */
      const old = document.querySelector('style[data-aw="iframe-contrast"]');
      if (old) old.remove();

      /* Build :not() exclusions */
      let pbx = '';
      if (preserveBackground && preserveBackground.length) {
        for (let i = 0; i < preserveBackground.length; i++) {
          let sel = preserveBackground[i];
          pbx += ':not(' + sel + '):not(' + sel + ' *)';
        }
      }

      const css = '/* iframe contrast themes */\n' +
        _buildContrastCSS(WX_FILTER, '', {}, pbx);

      const style = document.createElement('style');
      style.setAttribute('data-aw', 'iframe-contrast');
      style.textContent = css;
      document.head.appendChild(style);

      if (preserveBackground.length) {
        console.log('[AA iframe] Contrasto CSS ri-iniettato con preserveBackground:', preserveBackground.join(', '));
      }
    }

    _createOverlay() {
      let ov = document.createElement('div');
      ov.id = 'aa-filter-overlay';
      ov.setAttribute('aria-hidden', 'true');
      document.body.appendChild(ov);
    }

    _applyState(s) {
      console.log('[AA iframe] Applico stato:', JSON.stringify(s));
      this.state = s;
      let html = document.documentElement;

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
      let classes = {
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
        'aa-keyboard-nav': s.keyboardNav,
      };
      for (let cls in classes) {
        if (classes[cls]) html.classList.add(cls);
        else html.classList.remove(cls);
      }

      /* Alt text overlays */
      if (s.hideImages) {
        this._showAltLabels();
      } else {
        this._hideAltLabels();
      }

      /* Keyboard navigation */
      if (s.keyboardNav) {
        this._enableKeyboardNav();
      } else {
        this._disableKeyboardNav();
      }
    }

    _listenForParent() {
      window.addEventListener('message', (e) => {
        console.log('[AA iframe] message ricevuto:', e.data?.type, 'da origin:', e.origin);
        if (e.data?.type !== 'aa-state-update') return;
        /* Validate origin */
        if (this._origin !== '*' && e.origin !== this._origin) {
          console.warn('[AA iframe] Origin rifiutato:', e.origin, '(atteso:', this._origin + ')');
          return;
        }
        console.log('[AA iframe] Stato ricevuto dal parent, applico...');
        this._ready = true;
        this._stopPolling();

        /* Re-inject contrast CSS with preserveBackground exclusions (once) */
        if (e.data.preserveBackground && e.data.preserveBackground.length && !this._pbInjected) {
          this._injectContrastCSS(e.data.preserveBackground);
          this._pbInjected = true;
        }

        /* Store translated alt-missing label from parent */
        if (e.data.altTextMissing) {
          this._altTextMissing = e.data.altTextMissing;
        }

        /* Store keyboard nav config from parent */
        if (e.data.keyboardNavBarPosition) this._navBarPosition = e.data.keyboardNavBarPosition;
        if (e.data.keyboardNavButtons) this._keyboardNavButtons = e.data.keyboardNavButtons;
        if (e.data.navBarHint) this._navBarHint = e.data.navBarHint;
        if (e.data.navBarFocusLabel) this._navBarFocusLabel = e.data.navBarFocusLabel;

        this._applyState(e.data.state);
      });
    }

    _startPolling() {
      const started = Date.now();
      const INTERVAL = 200;
      const TIMEOUT = 30000;

      console.log('[AA iframe] Avvio polling verso parent. Origin:', this._origin, '| location.origin:', location.origin);

      this._pollTimer = setInterval(() => {
        if (this._ready || (Date.now() - started) > TIMEOUT) {
          this._stopPolling();
          if (!this._ready) {
            console.warn('[AA iframe] Timeout: nessuna risposta dal parent dopo 30s.');
          }
          return;
        }
        try {
          console.log('[AA iframe] Invio aa-child-ready a parent, targetOrigin:', this._origin);
          window.parent.postMessage({ type: 'aa-child-ready' }, this._origin);
        } catch (e) {
          console.error('[AA iframe] Errore postMessage:', e.message);
          this._stopPolling();
        }
      }, INTERVAL);
    }

    _showAltLabels() {
      const missingText = this._altTextMissing;
      document.querySelectorAll('img').forEach((img) => {
        if (img.closest('.aa-img-wrap')) return;

        const wrap = document.createElement('span');
        wrap.className = 'aa-img-wrap';

        const label = document.createElement('span');
        label.className = 'aa-alt-label';
        const alt = (img.getAttribute('alt') ?? '').trim();
        if (alt) {
          label.textContent = alt;
        } else {
          label.textContent = missingText;
          label.classList.add('aa-alt-missing');
        }

        img.parentNode.insertBefore(wrap, img);
        wrap.appendChild(img);
        wrap.appendChild(label);
      });
    }

    _hideAltLabels() {
      document.querySelectorAll('.aa-img-wrap').forEach((wrap) => {
        const img = wrap.querySelector('img');
        if (img) wrap.parentNode.insertBefore(img, wrap);
        wrap.remove();
      });
    }

    /* ── Keyboard Navigation (iframe child) ── */
    _enableKeyboardNav() {
      if (this._kbActive) return;
      this._kbActive = true;

      /* Status bar */
      if (!this._navBar) {
        const bar = document.createElement('div');
        bar.id = 'aa-nav-bar';
        bar.setAttribute('aria-hidden', 'true');
        bar.className = this._navBarPosition === 'top' ? 'aa-nav-top' : 'aa-nav-bottom';

        const focusSpan = document.createElement('span');
        focusSpan.className = 'aa-nav-focus';
        focusSpan.textContent = '—';

        const hintSpan = document.createElement('span');
        hintSpan.className = 'aa-nav-hint';
        hintSpan.innerHTML = this._navBarHint || Object.keys(KBD_SHORTCUTS).map((k) => '<kbd>' + k.toUpperCase() + '</kbd>').join(' ');

        bar.appendChild(focusSpan);
        bar.appendChild(hintSpan);
        document.body.appendChild(bar);
        this._navBar = bar;
        this._navFocus = focusSpan;
      }

      /* Build effective shortcut map (merge keyboardNavButtons into B) */
      this._kbMap = Object.assign({}, KBD_SHORTCUTS);
      if (this._keyboardNavButtons && this._keyboardNavButtons.length) {
        this._kbMap.b = this._kbMap.b + ',' + this._keyboardNavButtons.join(',');
      }

      /* Shortcut listener */
      this._kbShortcutHandler = (e) => {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return;

        const key = e.key.toLowerCase();
        const selector = this._kbMap[key];
        if (!selector) return;

        e.preventDefault();
        this._jumpTo(selector, e.shiftKey ? -1 : 1);
      };
      document.addEventListener('keydown', this._kbShortcutHandler);

      /* Focus tracker */
      this._kbFocusHandler = () => { this._updateNavBar(); };
      document.addEventListener('focusin', this._kbFocusHandler);
    }

    _disableKeyboardNav() {
      if (!this._kbActive) return;
      this._kbActive = false;

      if (this._kbShortcutHandler) {
        document.removeEventListener('keydown', this._kbShortcutHandler);
        this._kbShortcutHandler = null;
      }
      this._kbMap = null;
      if (this._kbFocusHandler) {
        document.removeEventListener('focusin', this._kbFocusHandler);
        this._kbFocusHandler = null;
      }
      if (this._navBar) {
        this._navBar.remove();
        this._navBar = null;
        this._navFocus = null;
      }
      document.querySelectorAll('[data-aa-temp-focus]').forEach((el) => {
        el.removeAttribute('tabindex');
        el.removeAttribute('data-aa-temp-focus');
      });
    }

    _jumpTo(selector, dir) {
      const all = Array.from(document.querySelectorAll(selector)).filter(
        (el) => !el.closest('#aa-nav-bar') &&
          !el.disabled && !el.hidden && el.offsetParent !== null
      );
      if (!all.length) return;
      const current = document.activeElement;
      let idx = -1;
      for (let i = 0; i < all.length; i++) {
        if (all[i] === current || all[i].contains(current)) { idx = i; break; }
      }
      const next = all[((idx + dir) % all.length + all.length) % all.length];
      if (next.tabIndex < 0 && !next.getAttribute('tabindex')) {
        next.setAttribute('tabindex', '-1');
        next.setAttribute('data-aa-temp-focus', 'true');
      }
      next.focus();
      next.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }

    _updateNavBar() {
      if (!this._navFocus) return;
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) {
        this._navFocus.textContent = '—';
        return;
      }
      const tag = el.tagName.toLowerCase();
      const text = (el.getAttribute('aria-label') || el.textContent || '').trim().substring(0, 60);
      this._navFocus.innerHTML = '';
      const tagSpan = document.createElement('span');
      tagSpan.className = 'aa-nav-tag';
      tagSpan.textContent = tag;
      this._navFocus.appendChild(tagSpan);
      this._navFocus.appendChild(document.createTextNode(
        (this._navBarFocusLabel || 'Focus on') + ' ' + (text || '#' + (el.id || '…'))
      ));
    }

    _stopPolling() {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    }
  } /* end class IframeChild */

  /* ───────────────────────────────────────────
     DETECT MODE FROM SCRIPT TAG
  ─────────────────────────────────────────── */
  const getScriptParams = () => {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
      const src = scripts[i].src || '';
      if (src.indexOf('asset-accessibility') !== -1) {
        const match = src.match(/[?&]mode=iframe/);
        if (match) {
          const originMatch = src.match(/[?&]origin=([^&]+)/);
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
  const init = () => {
    const params = getScriptParams();
    console.log('[AA] Mode rilevato:', params.mode, params.mode === 'iframe' ? '| origin: ' + params.origin : '');

    /* ── IFRAME CHILD MODE ── */
    if (params.mode === 'iframe') {
      window._aaIframeChild = new IframeChild(params.origin);
      return;
    }

    /* ── PARENT MODE (default) ── */
    const userCfg = window.AssetAccessibilityConfig || {};

    /* ── Validate required contact fields ── */
    const hasEmail = userCfg.contactEmail && typeof userCfg.contactEmail === 'string' && userCfg.contactEmail.trim() !== '';
    const hasPhone = userCfg.contactPhone && typeof userCfg.contactPhone === 'string' && userCfg.contactPhone.trim() !== '';

    if (!hasEmail && !hasPhone) {
      console.error(
        '[Asset Accessibility] ERRORE: configurazione mancante.\n' +
        'È obbligatorio specificare almeno uno tra "contactEmail" e "contactPhone" in AssetAccessibilityConfig.\n\n' +
        'Esempio:\n' +
        '  let AssetAccessibilityConfig = {\n' +
        '    contactEmail: "accessibilita@esempio.it",\n' +
        '    contactPhone: "+39 06 1234567"\n' +
        '  };\n\n' +
        'Il widget non verrà caricato.'
      );
      return;
    }

    /* ── Auto-generate statementText from contacts if not provided ── */
    const merged = mergeDeep(DEFAULTS, userCfg);

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
