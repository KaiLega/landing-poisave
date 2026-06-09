import type { Messages } from '../types'
import en from './en'

const it: Messages = {
  ...en,
  seo: {
    title: 'PoiSave - Salva luoghi dai social sulla tua mappa',
    description: 'Salva ristoranti, bar e mete di viaggio da Instagram, TikTok e web in una sola mappa personale.',
  },
  language: {
    label: 'Seleziona lingua',
  },
  nav: {
    howItWorks: 'Come funziona',
    appPreview: 'Anteprima app',
    features: 'Funzioni',
    download: 'Download',
    faq: 'FAQ',
    getApp: 'Scarica l’app',
  },
  footer: {
    designedBy: 'Designed by Yuga Web',
    deleteAccount: 'Elimina account',
    terms: 'Termini di utilizzo',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
  },
  common: {
    backHome: 'Torna alla home',
    appStoreAlt: 'Scarica da App Store',
    googlePlayAlt: 'Disponibile su Google Play',
  },
  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      kicker: 'app mobile poisave',
      title: 'Salva luoghi da Instagram, TikTok e altri social sulla tua mappa personale',
      text: 'Trasforma i post social in pin sulla mappa, sistema i dettagli e organizza ristoranti, bar e mete di viaggio in un solo posto utile.',
      topCard: 'Incolla -> Modifica -> Salva',
      bottomCard: 'Luoghi salvati sulla mappa',
      availability: '* Disponibile per iOS e Android',
      benefits: [
        'Incolla link da Instagram, TikTok e altri social',
        'Sistema i dettagli prima di salvarli sulla mappa',
        'Non perdere più i luoghi salvati sui social',
      ],
    },
    discover: {
      ...en.home.discover,
      kicker: 'Salva luoghi dai social',
      title: 'Organizza ristoranti, bar e mete di viaggio sulla tua mappa personale',
      lead: 'PoiSave trasforma scoperte da Instagram, TikTok e web in punti di interesse che puoi trovare, modificare e pianificare in seguito.',
      highlights: [
        { title: 'Salva luoghi da Instagram e TikTok', desc: 'Incolla un link social e tieni ristoranti, bar o mete di viaggio sulla tua mappa.' },
        { title: 'Organizza ogni punto di interesse', desc: 'Aggiungi categorie, note e dettagli utili invece di perderli nei preferiti.' },
        { title: 'Pianifica da una mappa personale', desc: 'Confronta i luoghi salvati vicino a te e scegli dove andare senza cambiare app.' },
      ],
    },
    howItWorks: {
      ...en.home.howItWorks,
      kicker: 'Come funziona',
      title: 'Incolla un link, rifinisci i dettagli e conserva il luogo sulla tua mappa.',
      lead: 'Passa da un post social a un luogo salvato in tre passaggi rapidi, senza perdere le informazioni utili.',
      steps: [
        { ...en.home.howItWorks.steps[0], title: 'Incolla un link social', description: 'Inserisci un URL Instagram o TikTok e apri l’anteprima prima di salvare.' },
        { ...en.home.howItWorks.steps[1], title: 'Incolla una descrizione o carica uno screenshot', description: 'PoiSave estrae il testo utile e salva i dettagli necessari per creare il tuo punto di interesse.' },
        { ...en.home.howItWorks.steps[2], title: 'Vedi tutto sulla mappa', description: 'Apri lista e mappa per decidere dove andare con tutti i tuoi luoghi in un posto solo.' },
      ],
    },
    bannerCta: {
      eyebrow: 'Scarica PoiSave',
      title: 'Inizia a salvare luoghi dalle tue app social preferite',
      description: 'Usa PoiSave su iOS e Android per organizzare ristoranti, bar, idee di viaggio e post salvati sulla tua mappa personale.',
      buttonLabel: 'Scarica PoiSave',
    },
    beforeAfter: {
      ...en.home.beforeAfter,
      kicker: 'Prima / Dopo',
      title: 'Trasforma i luoghi salvati sui social in una mappa organizzata',
      lead: 'Trascina per vedere come PoiSave trasforma luoghi da Instagram, TikTok e web in pin organizzati da ritrovare facilmente.',
      rangeLabel: 'Confronta prima e dopo PoiSave',
      closing: 'Non perdere mai più un luogo salvato sui social.',
    },
    collectors: {
      ...en.home.collectors,
      typingText: `Nome ristorante
Via esempio 3, Roma
Costo: 20€
Ristorante con vista sul Colosseo, perfetto per una cena romantica o da soli. La carbonara è da provare!`,
      kicker: 'Pensata per chi colleziona luoghi',
      title: 'Dai post salvati ai piani reali, senza perderli tra chat, preferiti o screenshot',
      lead: 'Invece di lasciare consigli dispersi tra chat, preferiti o screenshot, puoi raccoglierli in un solo posto e ritrovarli quando servono.',
      bullets: [
        'Un’unica fonte per ristoranti, bar e mete di viaggio.',
        'Controlla i dettagli prima di salvare e mantieni la mappa pulita.',
        'Apri i luoghi salvati visivamente invece di cercare tra link.',
      ],
      button: 'Scopri i piani',
    },
    track: {
      ...en.home.track,
      kicker: 'Un posto, tutti i tuoi luoghi',
      title: 'Tieni tutti i tuoi luoghi preferiti in un solo posto',
      lead: 'Usa PoiSave come ponte tra scoperta e pianificazione. Weekend, city break e mappe food restano ordinati dall’inizio.',
    },
    features: {
      ...en.home.features,
      kicker: 'Funzioni principali',
      title: 'Salva e organizza luoghi con PoiSave',
      lead: 'Acquisizione rapida, deduplica intelligente, cache offline e mappe globali.',
      items: [
        { title: 'Cattura in un tap', desc: 'Incolla un link, PoiSave gestisce il resto.' },
        { title: 'Deduplica smart', desc: 'Evita automaticamente i luoghi duplicati.' },
        { title: 'Locale di default', desc: 'Usa l’app in locale oppure sincronizza con un account Premium.' },
        { title: 'Funziona ovunque', desc: 'Da Roma a Tokyo, funziona e basta.' },
        { title: 'Design pulito', desc: 'Interfaccia bella, veloce e moderna.' },
        { title: 'Dettagli automatici', desc: 'Titoli, categorie e altro in pochi secondi.' },
      ],
    },
    pricing: {
      ...en.home.pricing,
      kicker: 'Prezzi',
      title: 'Inizia gratis, passa a PoiSave Premium',
      lead: 'Salva luoghi gratis, poi sblocca salvataggi illimitati, cloud sync, niente pubblicità e personalizzazione avanzata della mappa.',
      monthly: 'Mensile',
      annual: 'Annuale',
      plans: [
        { ...en.home.pricing.plans[0], label: 'Perfetto per iniziare', description: 'Inizia a salvare i tuoi luoghi preferiti con l’esperienza base inclusa.', items: ['Fino a 50 luoghi salvati', 'Mappa e lista base', 'Archivio locale', 'Con pubblicità'] },
        { ...en.home.pricing.plans[1], label: 'Promo lancio', priceNote: 'al mese', description: 'Sblocca l’esperienza completa con sync, personalizzazione e strumenti avanzati.', items: ['Luoghi salvati illimitati', 'Niente pubblicità', 'Cloud sync', 'Statistiche avanzate', 'Personalizzazione mappa e pin'] },
      ],
    },
    faq: {
      ...en.home.faq,
      kicker: 'Supporto',
      items: [
        { q: 'PoiSave è gratis?', a: 'Sì. PoiSave offre un piano gratuito con cui puoi salvare fino a 50 luoghi. Puoi passare a Premium per salvataggi illimitati e funzioni aggiuntive.' },
        { q: 'Cosa include PoiSave Premium?', a: 'Premium include luoghi salvati illimitati, niente pubblicità, cloud sync tra dispositivi e funzioni avanzate per organizzare e personalizzare la mappa.' },
        { q: 'Come salvo luoghi da Instagram o TikTok?', a: 'Puoi incollare o condividere link da Instagram, TikTok o altre piattaforme. PoiSave estrae le informazioni utili e ti permette di rivederle prima di salvarle.' },
        { q: 'Esiste un’app per salvare luoghi dai social su una mappa?', a: 'Sì. PoiSave è progettata per salvare luoghi scoperti sui social e organizzarli automaticamente su una mappa personale.' },
        { q: 'Posso modificare un luogo prima di salvarlo?', a: 'Sì. Puoi rivedere e modificare titolo, categoria, posizione e altri dettagli prima di salvare un luogo.' },
        { q: 'Che tipo di luoghi posso salvare?', a: 'Puoi salvare ristoranti, bar, mete di viaggio, hotel, eventi, punti panoramici o qualunque luogo tu voglia ricordare.' },
        { q: 'PoiSave funziona offline?', a: 'Sì. I luoghi salvati restano sul dispositivo, quindi puoi consultarli anche senza internet. Alcune funzioni possono richiedere connessione.' },
        { q: 'Serve un account?', a: 'No. Puoi usare PoiSave in modalità ospite. Creare un account permette di sincronizzare i dati tra dispositivi.' },
        { q: 'I miei dati sono privati?', a: 'Sì. I dati vengono usati solo per fornire il servizio. Non vendiamo i tuoi dati.' },
        { q: 'Posso eliminare account e dati?', a: 'Sì. Puoi eliminare l’account dall’app o dalla pagina dedicata sul sito.' },
        { q: 'Su quali piattaforme è disponibile PoiSave?', a: 'PoiSave è disponibile su iOS e Android.' },
        { q: 'Come contatto il supporto?', a: 'Puoi contattarci dalle impostazioni dell’app o tramite i link sul sito.' },
      ],
    },
    carousel: {
      ...en.home.carousel,
      heading: 'Guarda PoiSave in azione',
      previousLabel: 'Anteprima precedente',
      nextLabel: 'Anteprima successiva',
      navigationLabel: 'Navigazione anteprima app',
      showLabel: 'Mostra',
      goToLabel: 'Vai all’anteprima',
      slides: [
        { ...en.home.carousel.slides[0], eyebrow: 'Mappa', title: 'Vedi tutti i luoghi salvati sulla mappa', description: 'Trasforma scoperte social in luoghi salvati.' },
        { ...en.home.carousel.slides[1], eyebrow: 'Note', title: 'Incolla una descrizione o scrivi la tua', description: 'Aggiungi i dettagli utili prima di salvare.' },
        { ...en.home.carousel.slides[2], eyebrow: 'Raccolte', title: 'Sfoglia i luoghi salvati', description: 'Filtra la lista senza cambiare app.' },
        { ...en.home.carousel.slides[3], eyebrow: 'Dettagli', title: 'Apri un pin e controlla i dettagli', description: 'Note, indirizzo e categoria a colpo d’occhio.' },
        { ...en.home.carousel.slides[4], eyebrow: 'Preferiti', title: 'Vedi cosa spicca', description: 'Aggiungi i luoghi che ami.' },
      ],
    },
  },
}

export default it
