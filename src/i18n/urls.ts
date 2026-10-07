import { defaultLanguage, isLanguageCode } from './index'
import type { LanguageCode } from './types'

export const SITE_URL = 'https://poisave.com'

export function getLocalizedPath(language: LanguageCode) {
  return language === defaultLanguage ? '/' : `/${language}/`
}

export function getLocalizedUrl(language: LanguageCode) {
  return `${SITE_URL}${getLocalizedPath(language)}`
}

export function getLocalizedHashRoute(language: LanguageCode, route: string) {
  return `${getLocalizedPath(language)}#${route}`
}

export function getLanguageFromPathname(pathname: string): LanguageCode {
  const segment = pathname.split('/').filter(Boolean)[0]
  return isLanguageCode(segment) ? segment : defaultLanguage
}
