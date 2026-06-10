import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { defaultLanguage, languages } from '../i18n'
import { ROUTES } from '../routes'
import type { LanguageCode } from '../i18n'

const SITE_URL = 'https://poisave.com/'
const SITE_NAME = 'PoiSave'
const DEFAULT_IMAGE = `${SITE_URL}img/poisave-icon.png`
const LOCALES: Record<LanguageCode, string> = {
  en: 'en_GB',
  fr: 'fr_FR',
  it: 'it_IT',
  de: 'de_DE',
  es: 'es_ES',
}

function getLocalizedUrl(language: LanguageCode) {
  if (language === defaultLanguage) return SITE_URL

  return `${SITE_URL}?lang=${language}`
}

function getLegalDescription(intro: string[] | undefined, fallback: string) {
  return intro?.[0] ?? fallback
}

function upsertMeta(selector: string, attribute: 'content' | 'href', value: string, create: () => HTMLElement) {
  let element = document.querySelector<HTMLElement>(selector)

  if (!element) {
    element = create()
    document.head.appendChild(element)
  }

  element.setAttribute(attribute, value)
}

function upsertNameMeta(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, 'content', content, () => {
    const meta = document.createElement('meta')
    meta.name = name
    return meta
  })
}

function upsertPropertyMeta(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, 'content', content, () => {
    const meta = document.createElement('meta')
    meta.setAttribute('property', property)
    return meta
  })
}

function upsertCanonical(href: string) {
  upsertMeta('link[rel="canonical"]', 'href', href, () => {
    const link = document.createElement('link')
    link.rel = 'canonical'
    return link
  })
}

function upsertAlternate(hreflang: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)

  if (!link) {
    link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = hreflang
    document.head.appendChild(link)
  }

  link.href = href
}

export default function Seo() {
  const location = useLocation()
  const { copy, language } = useI18n()

  useEffect(() => {
    const path = location.pathname
    const legalPages: Record<string, { title: string; description: string }> = {
      [ROUTES.privacy]: {
        title: copy.legal.privacy.title,
        description: getLegalDescription(copy.legal.privacy.intro, copy.seo.description),
      },
      [ROUTES.cookies]: {
        title: copy.legal.cookies.title,
        description: getLegalDescription(copy.legal.cookies.intro, copy.seo.description),
      },
      [ROUTES.terms]: {
        title: copy.legal.terms.title,
        description: getLegalDescription(copy.legal.terms.intro, copy.seo.description),
      },
      [ROUTES.deleteAccount]: {
        title: copy.legal.deleteAccount.title,
        description: getLegalDescription(copy.legal.deleteAccount.intro, copy.seo.description),
      },
    }

    const page = legalPages[path]
    const title = page ? `${page.title} | ${SITE_NAME}` : copy.seo.title
    const description = page?.description ?? copy.seo.description
    const canonicalUrl = path === ROUTES.home ? getLocalizedUrl(language) : SITE_URL

    document.title = title
    upsertNameMeta('description', description)
    upsertCanonical(canonicalUrl)
    upsertPropertyMeta('og:type', 'website')
    upsertPropertyMeta('og:site_name', SITE_NAME)
    upsertPropertyMeta('og:title', title)
    upsertPropertyMeta('og:description', description)
    upsertPropertyMeta('og:url', canonicalUrl)
    upsertPropertyMeta('og:image', DEFAULT_IMAGE)
    upsertPropertyMeta('og:locale', LOCALES[language])
    upsertNameMeta('twitter:card', 'summary')
    upsertNameMeta('twitter:title', title)
    upsertNameMeta('twitter:description', description)
    upsertNameMeta('twitter:image', DEFAULT_IMAGE)

    languages.forEach((item) => {
      upsertAlternate(item.code, getLocalizedUrl(item.code))
    })
    upsertAlternate('x-default', SITE_URL)
  }, [copy, language, location.pathname])

  return null
}
