import type { Messages } from '../types'
import en from './en'

const de: Messages = {
  ...en,
  seo: {
    title: 'PoiSave - Orte aus Social Media auf deiner Karte speichern',
    description: 'Speichere Restaurants, Cafés und Reiseideen aus Instagram, TikTok und dem Web auf einer persönlichen Karte.',
  },
  language: { label: 'Sprache auswählen' },
  nav: {
    howItWorks: 'So funktioniert es',
    appPreview: 'App-Vorschau',
    features: 'Funktionen',
    download: 'Download',
    faq: 'FAQ',
    getApp: 'App holen',
  },
  footer: {
    designedBy: 'Designed by Yuga Web',
    deleteAccount: 'Konto löschen',
    terms: 'Nutzungsbedingungen',
    privacy: 'Datenschutzerklärung',
    cookies: 'Cookie-Richtlinie',
  },
  common: {
    backHome: 'Zurück zur Startseite',
    appStoreAlt: 'Im App Store laden',
    googlePlayAlt: 'Bei Google Play verfügbar',
  },
  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      kicker: 'poisave mobile app',
      title: 'Speichere Orte von Instagram, TikTok und mehr auf deiner persönlichen Karte',
      text: 'Verwandle Social Posts in Karten-Pins, bereinige die Details und organisiere Restaurants, Cafés und Reiseziele an einem nützlichen Ort.',
      topCard: 'Einfügen -> Bearbeiten -> Speichern',
      bottomCard: 'Orte auf deiner Karte gespeichert',
      availability: '* Verfügbar für iOS und Android',
      benefits: [
        'Links aus Instagram, TikTok und mehr einfügen',
        'Details vor dem Speichern bereinigen',
        'Gespeicherte Orte aus Social Media nicht mehr verlieren',
      ],
    },
    discover: {
      ...en.home.discover,
      kicker: 'Orte aus Social Media speichern',
      title: 'Organisiere Restaurants, Cafés und Reiseziele auf deiner persönlichen Karte',
      lead: 'PoiSave macht aus Instagram-, TikTok- und Web-Funden gespeicherte Points of Interest, die du später finden, bearbeiten und planen kannst.',
      highlights: [
        { title: 'Orte aus Instagram und TikTok speichern', desc: 'Füge einen Social-Link ein und behalte Restaurant, Café oder Reiseziel auf deiner Karte.' },
        { title: 'Jeden Point of Interest organisieren', desc: 'Füge Kategorien, Notizen und nützliche Details hinzu statt sie in Lesezeichen zu verlieren.' },
        { title: 'Von deiner persönlichen Karte planen', desc: 'Vergleiche gespeicherte Orte in der Nähe und entscheide ohne App-Wechsel.' },
      ],
    },
    howItWorks: {
      ...en.home.howItWorks,
      kicker: 'So funktioniert es',
      title: 'Link einfügen, Details verfeinern und den Ort auf deiner Karte behalten.',
      lead: 'In drei schnellen Schritten vom Social Post zum gespeicherten Ort, ohne nützliche Details zu verlieren.',
      steps: [
        { ...en.home.howItWorks.steps[0], title: 'Social-Link einfügen', description: 'Füge eine Instagram- oder TikTok-URL ein und öffne die Vorschau vor dem Speichern.' },
        { ...en.home.howItWorks.steps[1], title: 'Beschreibung einfügen oder Screenshot hochladen', description: 'PoiSave extrahiert nützlichen Text und speichert die Details für deinen Point of Interest.' },
        { ...en.home.howItWorks.steps[2], title: 'Alles auf der Karte sehen', description: 'Öffne Liste und Karte, um mit allen Spots an einem Ort zu entscheiden, wohin es geht.' },
      ],
    },
    bannerCta: {
      eyebrow: 'PoiSave herunterladen',
      title: 'Speichere Orte aus deinen liebsten Social Apps',
      description: 'Nutze PoiSave auf iOS und Android, um Restaurants, Cafés, Reiseideen und gespeicherte Posts auf deiner Karte zu organisieren.',
      buttonLabel: 'PoiSave holen',
    },
    beforeAfter: {
      ...en.home.beforeAfter,
      title: 'Verwandle gespeicherte Social-Media-Orte in eine organisierte Karte',
      lead: 'Ziehe den Regler und sieh, wie PoiSave Funde aus Instagram, TikTok und dem Web in organisierte Karten-Pins verwandelt.',
      rangeLabel: 'Vorher und Nachher mit PoiSave vergleichen',
      closing: 'Verliere nie wieder einen auf Social Media gespeicherten Ort.',
    },
    collectors: {
      ...en.home.collectors,
      typingText: `Restaurantname
Beispielstraße 3, Rom
Kosten: 20€
Restaurant mit Blick auf das Kolosseum, ideal für ein Date oder ein Solo-Dinner. Die Carbonara muss man probieren!`,
      kicker: 'Für Sammler gebaut',
      title: 'Von gespeicherten Posts zu echten Plänen, ohne Chaos in Chats, Lesezeichen oder Screenshots',
      lead: 'Sammle Empfehlungen an einem Ort, statt sie in Chats, Lesezeichen oder Screenshots zu verlieren.',
      bullets: [
        'Eine Quelle für Restaurants, Cafés und Reiseziele.',
        'Details prüfen, bevor du speicherst, damit die Karte sauber bleibt.',
        'Gespeicherte Orte visuell öffnen statt Links zu suchen.',
      ],
      button: 'Pläne ansehen',
    },
    track: {
      ...en.home.track,
      kicker: 'Ein Ort, alle deine Funde',
      title: 'Verfolge alle Lieblingsorte an einem Ort',
      lead: 'PoiSave verbindet Entdeckung und Planung. Wochenendlisten, City-Trips und Food Maps bleiben von Anfang an strukturiert.',
    },
    features: {
      ...en.home.features,
      kicker: 'Kernfunktionen',
      title: 'Orte mit PoiSave speichern und organisieren',
      lead: 'Schnelle Erfassung, intelligente Duplikat-Erkennung, Offline-Cache und globale Karten.',
      items: [
        { title: 'Einfügen mit einem Tap', desc: 'Link einfügen, PoiSave erledigt den Rest.' },
        { title: 'Smarte Duplikate', desc: 'Doppelte Orte automatisch vermeiden.' },
        { title: 'Lokal zuerst', desc: 'Lokal nutzen oder mit Premium synchronisieren.' },
        { title: 'Weltweit nutzbar', desc: 'Von Rom bis Tokio funktioniert es einfach.' },
        { title: 'Klares Design', desc: 'Schöne, schnelle und moderne Oberfläche.' },
        { title: 'Automatische Details', desc: 'Titel, Kategorien und mehr in Sekunden.' },
      ],
    },
    pricing: {
      ...en.home.pricing,
      kicker: 'Preise',
      title: 'Kostenlos starten, auf PoiSave Premium upgraden',
      lead: 'Speichere kostenlos Orte und schalte dann unbegrenzte Orte, Cloud-Sync, keine Werbung und erweiterte Kartenanpassung frei.',
      monthly: 'Monatlich',
      annual: 'Jährlich',
      plans: [
        { ...en.home.pricing.plans[0], label: 'Perfekt zum Start', description: 'Starte mit der Basisversion und speichere deine Lieblingsorte.', items: ['Bis zu 50 Orte speichern', 'Basis-Karte und Liste', 'Lokaler Speicher', 'Mit Werbung'] },
        { ...en.home.pricing.plans[1], label: 'Launch-Angebot', priceNote: 'pro Monat', description: 'Schalte Synchronisierung, Anpassung und erweiterte Werkzeuge frei.', items: ['Unbegrenzt gespeicherte Orte', 'Keine Werbung', 'Cloud-Sync', 'Erweiterte Statistiken', 'Karten- und Pin-Anpassung'] },
      ],
    },
    carousel: {
      ...en.home.carousel,
      heading: 'PoiSave in Aktion',
      previousLabel: 'Vorherige App-Vorschau',
      nextLabel: 'Nächste App-Vorschau',
      navigationLabel: 'Navigation der App-Vorschau',
      showLabel: 'Anzeigen',
      goToLabel: 'Zur App-Vorschau',
      slides: [
        { ...en.home.carousel.slides[0], eyebrow: 'Karte', title: 'Alle gespeicherten Orte auf der Karte sehen', description: 'Social-Funde in Sekunden speichern.' },
        { ...en.home.carousel.slides[1], eyebrow: 'Notizen', title: 'Beschreibung einfügen oder selbst schreiben', description: 'Wichtige Details vor dem Speichern ergänzen.' },
        { ...en.home.carousel.slides[2], eyebrow: 'Sammlungen', title: 'Gespeicherte Orte durchsuchen', description: 'Liste filtern ohne App-Wechsel.' },
        { ...en.home.carousel.slides[3], eyebrow: 'Details', title: 'Pin öffnen und Details prüfen', description: 'Notizen, Adresse und Kategorie auf einen Blick.' },
        { ...en.home.carousel.slides[4], eyebrow: 'Favoriten', title: 'Sehen, was heraussticht', description: 'Lieblingsorte schnell hinzufügen.' },
      ],
    },
    faq: {
      ...en.home.faq,
      items: [
        { q: 'Ist PoiSave kostenlos?', a: 'Ja. Mit dem kostenlosen Plan kannst du bis zu 50 Orte speichern. Premium bietet unbegrenzte Speicherungen und weitere Funktionen.' },
        { q: 'Was enthält PoiSave Premium?', a: 'Premium enthält unbegrenzt gespeicherte Orte, keine Werbung, Cloud-Sync und erweiterte Funktionen zur Kartenanpassung.' },
        { q: 'Wie speichere ich Orte aus Instagram oder TikTok?', a: 'Du kannst Links aus Instagram, TikTok oder anderen Plattformen einfügen oder teilen. PoiSave extrahiert nützliche Informationen vor dem Speichern.' },
        { q: 'Gibt es eine App, um Orte aus Social Media auf einer Karte zu speichern?', a: 'Ja. PoiSave speichert Orte aus Social Media und organisiert sie auf deiner persönlichen Karte.' },
        { q: 'Kann ich einen Ort vor dem Speichern bearbeiten?', a: 'Ja. Titel, Kategorie, Standort und weitere Details können vor dem Speichern geprüft und bearbeitet werden.' },
        { q: 'Welche Orte kann ich speichern?', a: 'Restaurants, Cafés, Reiseziele, Hotels, Events, Aussichtspunkte oder jeden Ort, den du wiederfinden möchtest.' },
        { q: 'Funktioniert PoiSave offline?', a: 'Ja. Gespeicherte Orte liegen lokal auf deinem Gerät. Einige Funktionen benötigen eine Verbindung.' },
        { q: 'Brauche ich ein Konto?', a: 'Nein. Du kannst PoiSave als Gast nutzen. Ein Konto ermöglicht Synchronisierung zwischen Geräten.' },
        { q: 'Sind meine Daten privat?', a: 'Ja. Deine Daten werden nur für den Dienst genutzt. Wir verkaufen sie nicht.' },
        { q: 'Kann ich mein Konto löschen?', a: 'Ja. Du kannst dein Konto jederzeit in der App oder über die Website löschen.' },
        { q: 'Auf welchen Plattformen gibt es PoiSave?', a: 'PoiSave ist für iOS und Android verfügbar.' },
        { q: 'Wie erreiche ich den Support?', a: 'Über die App-Einstellungen oder die Links auf der Website.' },
      ],
    },
  },
}

export default de
