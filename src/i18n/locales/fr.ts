import type { Messages } from '../types'
import en from './en'

const fr: Messages = {
  ...en,
  seo: {
    title: 'PoiSave - Enregistrez les lieux des réseaux sociaux sur votre carte',
    description: 'Enregistrez restaurants, cafés et idées de voyage depuis Instagram, TikTok et le web sur une carte personnelle.',
  },
  language: { label: 'Choisir la langue' },
  nav: {
    howItWorks: 'Fonctionnement',
    appPreview: 'Aperçu app',
    features: 'Fonctionnalités',
    download: 'Télécharger',
    faq: 'FAQ',
    getApp: 'Obtenir l’app',
  },
  footer: {
    designedBy: 'Designed by Yuga Web',
    deleteAccount: 'Supprimer le compte',
    terms: 'Conditions d’utilisation',
    privacy: 'Politique de confidentialité',
    cookies: 'Politique cookies',
  },
  common: {
    backHome: 'Retour à l’accueil',
    appStoreAlt: 'Télécharger dans l’App Store',
    googlePlayAlt: 'Disponible sur Google Play',
  },
  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      kicker: 'application mobile poisave',
      title: 'Enregistrez les lieux trouvés sur Instagram, TikTok et ailleurs sur votre carte',
      text: 'Transformez les posts sociaux en repères sur la carte, corrigez les détails et organisez restaurants, cafés et voyages au même endroit.',
      topCard: 'Coller -> Modifier -> Enregistrer',
      bottomCard: 'Lieux enregistrés sur votre carte',
      availability: '* Disponible sur iOS et Android',
      benefits: [
        'Collez des liens depuis Instagram, TikTok et plus',
        'Nettoyez les détails avant de les enregistrer',
        'Ne perdez plus les lieux sauvegardés sur les réseaux',
      ],
    },
    discover: {
      ...en.home.discover,
      kicker: 'Enregistrer depuis les réseaux',
      title: 'Organisez restaurants, cafés et idées de voyage sur votre carte personnelle',
      lead: 'PoiSave transforme vos découvertes Instagram, TikTok et web en points d’intérêt faciles à retrouver, modifier et planifier.',
      highlights: [
        { title: 'Enregistrer depuis Instagram et TikTok', desc: 'Collez un lien social et gardez le restaurant, café ou spot de voyage sur votre carte.' },
        { title: 'Organiser chaque point d’intérêt', desc: 'Ajoutez catégories, notes et détails utiles au lieu de les perdre dans les favoris.' },
        { title: 'Planifier depuis votre carte', desc: 'Comparez les lieux proches et choisissez où aller sans changer d’app.' },
      ],
    },
    howItWorks: {
      ...en.home.howItWorks,
      kicker: 'Fonctionnement',
      title: 'Collez un lien, ajustez les détails et gardez le lieu sur votre carte.',
      lead: 'Passez d’un post social à un lieu enregistré en trois étapes rapides, sans perdre les informations utiles.',
      steps: [
        { ...en.home.howItWorks.steps[0], title: 'Collez un lien social', description: 'Ajoutez une URL Instagram ou TikTok et ouvrez l’aperçu avant d’enregistrer.' },
        { ...en.home.howItWorks.steps[1], title: 'Collez une description ou importez une capture', description: 'PoiSave extrait le texte utile et conserve les détails nécessaires au point d’intérêt.' },
        { ...en.home.howItWorks.steps[2], title: 'Tout voir sur la carte', description: 'Ouvrez la liste et la carte pour décider où aller avec tous vos spots au même endroit.' },
      ],
    },
    bannerCta: {
      eyebrow: 'Télécharger PoiSave',
      title: 'Commencez à enregistrer des lieux depuis vos apps sociales préférées',
      description: 'Utilisez PoiSave sur iOS et Android pour organiser restaurants, cafés, idées de voyage et posts sauvegardés sur votre carte.',
      buttonLabel: 'Obtenir PoiSave',
    },
    beforeAfter: {
      ...en.home.beforeAfter,
      title: 'Transformez les lieux sauvegardés sur les réseaux en une carte organisée',
      lead: 'Faites glisser pour voir comment PoiSave transforme Instagram, TikTok et le web en repères organisés.',
      rangeLabel: 'Comparer avant et après PoiSave',
      closing: 'Ne perdez plus jamais un lieu sauvegardé sur les réseaux.',
    },
    collectors: {
      ...en.home.collectors,
      typingText: `Nom du restaurant
Rue exemple 3, Rome
Prix : 20€
Restaurant avec vue sur le Colisée, parfait pour un dîner en solo ou à deux. La carbonara vaut le détour !`,
      kicker: 'Pour les collectionneurs',
      title: 'Des posts sauvegardés aux vrais plans, sans les perdre dans chats, favoris ou captures',
      lead: 'Rassemblez vos recommandations au même endroit au lieu de les laisser dispersées dans des conversations ou captures.',
      bullets: [
        'Une seule source pour restaurants, cafés et voyages.',
        'Vérifiez les détails avant d’enregistrer pour garder une carte propre.',
        'Retrouvez vos lieux visuellement au lieu de chercher des liens.',
      ],
      button: 'Voir les offres',
    },
    track: {
      ...en.home.track,
      kicker: 'Un endroit, toutes vos trouvailles',
      title: 'Suivez tous vos lieux préférés au même endroit',
      lead: 'PoiSave relie découverte et planification. Week-ends, city breaks et cartes food restent structurés dès le départ.',
    },
    features: {
      ...en.home.features,
      kicker: 'Fonctions clés',
      title: 'Enregistrez et organisez vos lieux avec PoiSave',
      lead: 'Capture rapide, dédoublonnage intelligent, cache hors ligne et cartes mondiales.',
      items: [
        { title: 'Capture en un geste', desc: 'Collez un lien, PoiSave s’occupe du reste.' },
        { title: 'Dédoublonnage intelligent', desc: 'Évitez automatiquement les lieux en double.' },
        { title: 'Local par défaut', desc: 'Utilisez l’app localement ou synchronisez avec un compte Premium.' },
        { title: 'Fonctionne partout', desc: 'De Rome à Tokyo, ça fonctionne simplement.' },
        { title: 'Design clair', desc: 'Une interface belle, rapide et moderne.' },
        { title: 'Détails automatiques', desc: 'Titres, catégories et plus encore en quelques secondes.' },
      ],
    },
    pricing: {
      ...en.home.pricing,
      kicker: 'Tarifs',
      title: 'Commencez gratuitement, passez à PoiSave Premium',
      lead: 'Enregistrez gratuitement, puis débloquez les lieux illimités, la synchronisation cloud, zéro publicité et la personnalisation avancée.',
      monthly: 'Mensuel',
      annual: 'Annuel',
      plans: [
        { ...en.home.pricing.plans[0], label: 'Parfait pour commencer', description: 'Commencez à enregistrer vos lieux favoris avec l’expérience de base incluse.', items: ['Jusqu’à 50 lieux enregistrés', 'Carte et liste de base', 'Stockage local', 'Avec publicité'] },
        { ...en.home.pricing.plans[1], label: 'Promo de lancement', priceNote: 'par mois', description: 'Débloquez l’expérience complète avec synchronisation, personnalisation et outils avancés.', items: ['Lieux enregistrés illimités', 'Sans publicité', 'Synchronisation cloud', 'Statistiques avancées', 'Personnalisation carte et pins'] },
      ],
    },
    faq: {
      ...en.home.faq,
      kicker: 'Support',
      items: [
        { q: 'PoiSave est-il gratuit ?', a: 'Oui. PoiSave propose un plan gratuit permettant d’enregistrer jusqu’à 50 lieux. Vous pouvez passer à Premium pour des enregistrements illimités et plus de fonctions.' },
        { q: 'Que comprend PoiSave Premium ?', a: 'Premium inclut les lieux illimités, zéro publicité, la synchronisation cloud entre appareils et des fonctions avancées pour organiser et personnaliser votre carte.' },
        { q: 'Comment enregistrer des lieux depuis Instagram ou TikTok ?', a: 'Collez ou partagez des liens depuis Instagram, TikTok ou d’autres plateformes. PoiSave extrait les informations utiles et vous laisse les vérifier avant l’enregistrement.' },
        { q: 'Existe-t-il une app pour enregistrer les lieux des réseaux sur une carte ?', a: 'Oui. PoiSave est conçue pour enregistrer les lieux découverts sur les réseaux sociaux et les organiser sur une carte personnelle.' },
        { q: 'Puis-je modifier un lieu avant de l’enregistrer ?', a: 'Oui. Vous pouvez vérifier et modifier le titre, la catégorie, la position et d’autres détails avant d’enregistrer un lieu.' },
        { q: 'Quels types de lieux puis-je enregistrer ?', a: 'Restaurants, cafés, spots de voyage, hôtels, événements, points de vue ou tout autre lieu que vous voulez retrouver.' },
        { q: 'PoiSave fonctionne-t-il hors ligne ?', a: 'Oui. Vos lieux sont stockés localement sur l’appareil. Certaines fonctions peuvent nécessiter une connexion.' },
        { q: 'Ai-je besoin d’un compte ?', a: 'Non. Vous pouvez utiliser PoiSave en mode invité. Un compte permet de synchroniser les données entre appareils.' },
        { q: 'Mes données sont-elles privées ?', a: 'Oui. Vos données servent uniquement à fournir le service. Nous ne les vendons pas.' },
        { q: 'Puis-je supprimer mon compte ?', a: 'Oui. Vous pouvez supprimer votre compte depuis l’app ou via la page dédiée du site.' },
        { q: 'Sur quelles plateformes PoiSave est-il disponible ?', a: 'PoiSave est disponible sur iOS et Android.' },
        { q: 'Comment contacter le support ?', a: 'Vous pouvez nous contacter depuis les réglages de l’app ou via les liens du site.' },
      ],
    },
    carousel: {
      ...en.home.carousel,
      heading: 'Voyez PoiSave en action',
      previousLabel: 'Aperçu précédent',
      nextLabel: 'Aperçu suivant',
      navigationLabel: 'Navigation des aperçus',
      showLabel: 'Afficher',
      goToLabel: 'Aller à l’aperçu',
      slides: [
        { ...en.home.carousel.slides[0], eyebrow: 'Carte', title: 'Voyez tous vos lieux sur la carte', description: 'Transformez vos découvertes sociales en lieux enregistrés.' },
        { ...en.home.carousel.slides[1], eyebrow: 'Notes', title: 'Collez une description ou écrivez la vôtre', description: 'Ajoutez les détails utiles avant d’enregistrer.' },
        { ...en.home.carousel.slides[2], eyebrow: 'Collections', title: 'Parcourez vos lieux enregistrés', description: 'Filtrez votre liste sans changer d’app.' },
        { ...en.home.carousel.slides[3], eyebrow: 'Détails', title: 'Ouvrez un pin et vérifiez les détails', description: 'Notes, adresse et catégorie en un coup d’œil.' },
        { ...en.home.carousel.slides[4], eyebrow: 'Favoris', title: 'Repérez ce qui compte', description: 'Ajoutez les lieux que vous aimez.' },
      ],
    },
  },
}

export default fr
