export type LanguageCode = 'en' | 'fr' | 'it' | 'de' | 'es'

export type LanguageOption = {
  code: LanguageCode
  label: string
  shortLabel: string
  flag: string
  flagSrc: string
}

export type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  ordered?: string[]
  subsections?: {
    title: string
    paragraphs?: string[]
    bullets?: string[]
  }[]
}

export type LegalDocument = {
  title: string
  intro?: string[]
  sections: LegalSection[]
}

export type Messages = {
  seo: {
    title: string
    description: string
  }
  language: {
    label: string
  }
  nav: {
    howItWorks: string
    appPreview: string
    features: string
    download: string
    faq: string
    getApp: string
  }
  footer: {
    designedBy: string
    deleteAccount: string
    terms: string
    privacy: string
    cookies: string
  }
  common: {
    backHome: string
    appStoreAlt: string
    googlePlayAlt: string
  }
  legal: {
    lastUpdatedLabel: string
    privacy: LegalDocument
    terms: LegalDocument
    cookies: LegalDocument
    deleteAccount: LegalDocument
  }
  home: {
    hero: {
      imageAlt: string
      kicker: string
      title: string
      text: string
      topCard: string
      bottomCard: string
      availability: string
      benefits: string[]
    }
    discover: {
      kicker: string
      title: string
      lead: string
      highlights: { title: string; desc: string }[]
    }
    howItWorks: {
      kicker: string
      title: string
      lead: string
      steps: {
        index: string
        title: string
        description: string
        image: string
        alt: string
      }[]
    }
    bannerCta: {
      eyebrow: string
      title: string
      description: string
      buttonLabel: string
    }
    beforeAfter: {
      kicker: string
      title: string
      lead: string
      beforeAlt: string
      afterAlt: string
      rangeLabel: string
      closing: string
    }
    collectors: {
      typingText: string
      imageAlt: string
      kicker: string
      title: string
      lead: string
      bullets: string[]
      button: string
    }
    carousel: {
      heading: string
      previousLabel: string
      nextLabel: string
      navigationLabel: string
      showLabel: string
      goToLabel: string
      slides: {
        src: string
        alt: string
        eyebrow: string
        title: string
        description: string
      }[]
    }
    track: {
      imageAlt: string
      kicker: string
      title: string
      lead: string
    }
    features: {
      kicker: string
      title: string
      lead: string
      items: { title: string; desc: string }[]
    }
    pricing: {
      kicker: string
      title: string
      lead: string
      monthly: string
      annual: string
      plans: {
        name: string
        price: string
        originalPrice?: string
        yearlyPrice?: string
        yearlyOriginalPrice?: string
        priceNote?: string
        label: string
        description: string
        items: string[]
        featured: boolean
      }[]
    }
    faq: {
      kicker: string
      title: string
      items: { q: string; a: string }[]
    }
  }
}
