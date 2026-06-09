import type { Messages } from '../types'
import en from './en'

const es: Messages = {
  ...en,
  seo: {
    title: 'PoiSave - Guarda lugares de redes sociales en tu mapa',
    description: 'Guarda restaurantes, cafeterías e ideas de viaje de Instagram, TikTok y la web en un mapa personal.',
  },
  language: { label: 'Seleccionar idioma' },
  nav: {
    howItWorks: 'Cómo funciona',
    appPreview: 'Vista app',
    features: 'Funciones',
    download: 'Descargar',
    faq: 'FAQ',
    getApp: 'Obtener app',
  },
  footer: {
    designedBy: 'Designed by Yuga Web',
    deleteAccount: 'Eliminar cuenta',
    terms: 'Términos de uso',
    privacy: 'Política de privacidad',
    cookies: 'Política de cookies',
  },
  common: {
    backHome: 'Volver al inicio',
    appStoreAlt: 'Descargar en App Store',
    googlePlayAlt: 'Disponible en Google Play',
  },
  home: {
    ...en.home,
    hero: {
      ...en.home.hero,
      kicker: 'app móvil poisave',
      title: 'Guarda lugares de Instagram, TikTok y más en tu mapa personal',
      text: 'Convierte posts sociales en pines del mapa, limpia los detalles y organiza restaurantes, cafeterías y viajes en un solo lugar útil.',
      topCard: 'Pegar -> Editar -> Guardar',
      bottomCard: 'Lugares guardados en tu mapa',
      availability: '* Disponible para iOS y Android',
      benefits: [
        'Pega enlaces de Instagram, TikTok y más',
        'Limpia los detalles antes de guardarlos',
        'No pierdas más lugares guardados en redes sociales',
      ],
    },
    discover: {
      ...en.home.discover,
      kicker: 'Guarda lugares de redes sociales',
      title: 'Organiza restaurantes, cafeterías y viajes en tu mapa personal',
      lead: 'PoiSave convierte descubrimientos de Instagram, TikTok y la web en puntos de interés que puedes encontrar, editar y planificar después.',
      highlights: [
        { title: 'Guarda lugares de Instagram y TikTok', desc: 'Pega un enlace social y guarda el restaurante, cafetería o destino en tu mapa.' },
        { title: 'Organiza cada punto de interés', desc: 'Añade categorías, notas y detalles útiles en lugar de perderlos en marcadores.' },
        { title: 'Planifica desde tu mapa personal', desc: 'Compara lugares cercanos y decide dónde ir sin cambiar de app.' },
      ],
    },
    howItWorks: {
      ...en.home.howItWorks,
      kicker: 'Cómo funciona',
      title: 'Pega un enlace, ajusta los detalles y guarda el lugar en tu mapa.',
      lead: 'Pasa de un post social a un lugar guardado en tres pasos rápidos, sin perder la información útil.',
      steps: [
        { ...en.home.howItWorks.steps[0], title: 'Pega un enlace social', description: 'Añade una URL de Instagram o TikTok y revisa la vista previa antes de guardar.' },
        { ...en.home.howItWorks.steps[1], title: 'Pega una descripción o sube una captura', description: 'PoiSave extrae el texto útil y guarda los detalles necesarios para crear tu punto de interés.' },
        { ...en.home.howItWorks.steps[2], title: 'Ve todo en tu mapa', description: 'Abre la lista y el mapa para decidir dónde ir con todos tus sitios en un solo lugar.' },
      ],
    },
    bannerCta: {
      eyebrow: 'Descargar PoiSave',
      title: 'Empieza a guardar lugares desde tus apps sociales favoritas',
      description: 'Usa PoiSave en iOS y Android para organizar restaurantes, cafeterías, ideas de viaje y posts guardados en tu mapa personal.',
      buttonLabel: 'Obtener PoiSave',
    },
    beforeAfter: {
      ...en.home.beforeAfter,
      title: 'Convierte lugares guardados en redes sociales en un mapa organizado',
      lead: 'Arrastra para ver cómo PoiSave convierte Instagram, TikTok y la web en pines organizados fáciles de encontrar.',
      rangeLabel: 'Comparar antes y después de PoiSave',
      closing: 'No vuelvas a perder un lugar guardado en redes sociales.',
    },
    collectors: {
      ...en.home.collectors,
      typingText: `Nombre del restaurante
Calle ejemplo 3, Roma
Precio: 20€
Restaurante con vistas al Coliseo, perfecto para una cita o una cena en solitario. ¡La carbonara es imprescindible!`,
      kicker: 'Creado para coleccionistas',
      title: 'De posts guardados a planes reales, sin perderlos en chats, marcadores o capturas',
      lead: 'Reúne recomendaciones en un solo lugar en vez de dejarlas enterradas en conversaciones, marcadores o capturas.',
      bullets: [
        'Una sola fuente para restaurantes, cafeterías y viajes.',
        'Revisa los detalles antes de guardar para mantener limpio el mapa.',
        'Abre tus lugares visualmente en lugar de buscar enlaces.',
      ],
      button: 'Ver planes',
    },
    track: {
      ...en.home.track,
      kicker: 'Un lugar, todos tus hallazgos',
      title: 'Controla todos tus lugares favoritos en un solo lugar',
      lead: 'PoiSave conecta descubrimiento y planificación. Tu lista de fin de semana, escapada o mapa foodie queda organizada desde el inicio.',
    },
    features: {
      ...en.home.features,
      kicker: 'Funciones clave',
      title: 'Guarda y organiza lugares con PoiSave',
      lead: 'Captura rápida, deduplicación inteligente, caché offline y mapas globales.',
      items: [
        { title: 'Captura en un toque', desc: 'Pega un enlace y PoiSave hace el resto.' },
        { title: 'Deduplicación inteligente', desc: 'Evita lugares duplicados automáticamente.' },
        { title: 'Local por defecto', desc: 'Usa la app localmente o sincroniza con Premium.' },
        { title: 'Funciona en todo el mundo', desc: 'De Roma a Tokio, simplemente funciona.' },
        { title: 'Diseño limpio', desc: 'Interfaz bonita, rápida y moderna.' },
        { title: 'Detalles automáticos', desc: 'Títulos, categorías y más en segundos.' },
      ],
    },
    pricing: {
      ...en.home.pricing,
      kicker: 'Precios',
      title: 'Empieza gratis, mejora a PoiSave Premium',
      lead: 'Guarda lugares gratis y desbloquea guardados ilimitados, sincronización cloud, sin anuncios y personalización avanzada del mapa.',
      monthly: 'Mensual',
      annual: 'Anual',
      plans: [
        { ...en.home.pricing.plans[0], label: 'Perfecto para empezar', description: 'Empieza a guardar tus lugares favoritos con la experiencia base incluida.', items: ['Guarda hasta 50 lugares', 'Mapa y lista básicos', 'Almacenamiento local', 'Con anuncios'] },
        { ...en.home.pricing.plans[1], label: 'Promoción de lanzamiento', priceNote: 'al mes', description: 'Desbloquea la experiencia completa con sync, personalización y herramientas avanzadas.', items: ['Lugares guardados ilimitados', 'Sin anuncios', 'Cloud sync', 'Estadísticas avanzadas', 'Personalización de mapa y pines'] },
      ],
    },
    carousel: {
      ...en.home.carousel,
      heading: 'Mira PoiSave en acción',
      previousLabel: 'Vista anterior',
      nextLabel: 'Vista siguiente',
      navigationLabel: 'Navegación de vistas de app',
      showLabel: 'Mostrar',
      goToLabel: 'Ir a la vista',
      slides: [
        { ...en.home.carousel.slides[0], eyebrow: 'Mapa', title: 'Ve todos tus lugares en el mapa', description: 'Convierte hallazgos sociales en lugares guardados.' },
        { ...en.home.carousel.slides[1], eyebrow: 'Notas', title: 'Pega una descripción o escribe la tuya', description: 'Añade los detalles antes de guardar.' },
        { ...en.home.carousel.slides[2], eyebrow: 'Colecciones', title: 'Explora tus lugares guardados', description: 'Filtra tu lista sin cambiar de app.' },
        { ...en.home.carousel.slides[3], eyebrow: 'Detalles', title: 'Abre un pin y revisa los detalles', description: 'Notas, dirección y categoría de un vistazo.' },
        { ...en.home.carousel.slides[4], eyebrow: 'Favoritos', title: 'Mira lo que destaca', description: 'Añade los lugares que te gustan.' },
      ],
    },
    faq: {
      ...en.home.faq,
      items: [
        { q: '¿PoiSave es gratis?', a: 'Sí. PoiSave ofrece un plan gratis para guardar hasta 50 lugares. Puedes mejorar a Premium para guardados ilimitados y más funciones.' },
        { q: '¿Qué incluye PoiSave Premium?', a: 'Premium incluye lugares ilimitados, sin anuncios, cloud sync entre dispositivos y funciones avanzadas para organizar y personalizar el mapa.' },
        { q: '¿Cómo guardo lugares de Instagram o TikTok?', a: 'Puedes pegar o compartir enlaces de Instagram, TikTok u otras plataformas. PoiSave extrae información útil y te deja revisarla antes de guardar.' },
        { q: '¿Hay una app para guardar lugares de redes sociales en un mapa?', a: 'Sí. PoiSave está diseñada para guardar lugares descubiertos en redes sociales y organizarlos en un mapa personal.' },
        { q: '¿Puedo editar un lugar antes de guardarlo?', a: 'Sí. Puedes revisar y editar título, categoría, ubicación y otros detalles antes de guardar.' },
        { q: '¿Qué tipo de lugares puedo guardar?', a: 'Restaurantes, cafeterías, viajes, hoteles, eventos, miradores o cualquier lugar que quieras recordar.' },
        { q: '¿PoiSave funciona offline?', a: 'Sí. Tus lugares se guardan localmente en el dispositivo. Algunas funciones pueden requerir conexión.' },
        { q: '¿Necesito una cuenta?', a: 'No. Puedes usar PoiSave como invitado. Crear una cuenta permite sincronizar datos entre dispositivos.' },
        { q: '¿Mis datos son privados?', a: 'Sí. Tus datos se usan solo para ofrecer el servicio. No los vendemos.' },
        { q: '¿Puedo borrar mi cuenta?', a: 'Sí. Puedes borrar tu cuenta desde la app o desde la página dedicada del sitio.' },
        { q: '¿En qué plataformas está disponible PoiSave?', a: 'PoiSave está disponible en iOS y Android.' },
        { q: '¿Cómo contacto con soporte?', a: 'Puedes contactar desde los ajustes de la app o mediante los enlaces del sitio.' },
      ],
    },
  },
}

export default es
