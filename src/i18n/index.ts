import de from './locales/de'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import it from './locales/it'
import type { LanguageCode, LanguageOption, LegalDocument, LegalSection, Messages } from './types'

export const defaultLanguage: LanguageCode = 'en'

export const languages: LanguageOption[] = [
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '🇬🇧', flagSrc: '/img/flags/en.svg' },
  { code: 'fr', label: 'Français', shortLabel: 'FR', flag: '🇫🇷', flagSrc: '/img/flags/fr.svg' },
  { code: 'it', label: 'Italiano', shortLabel: 'IT', flag: '🇮🇹', flagSrc: '/img/flags/it.svg' },
  { code: 'de', label: 'Deutsch', shortLabel: 'DE', flag: '🇩🇪', flagSrc: '/img/flags/de.svg' },
  { code: 'es', label: 'Español', shortLabel: 'ES', flag: '🇪🇸', flagSrc: '/img/flags/es.svg' },
]

export const messages: Record<LanguageCode, Messages> = {
  en,
  fr,
  it,
  de,
  es,
}

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return languages.some((language) => language.code === value)
}

export type { LanguageCode, LanguageOption, LegalDocument, LegalSection, Messages }
