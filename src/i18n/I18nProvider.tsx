import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLanguage, isLanguageCode, messages } from './index'
import type { LanguageCode, Messages } from './types'
import { getLanguageFromPathname, getLocalizedPath } from './urls'

type I18nContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  copy: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return defaultLanguage

  const urlLanguage = new URLSearchParams(window.location.search).get('lang')
  if (isLanguageCode(urlLanguage)) return urlLanguage

  return getLanguageFromPathname(window.location.pathname)
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage)
  const copy = messages[language]

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage)

    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)

    url.pathname = getLocalizedPath(nextLanguage)
    url.searchParams.delete('lang')
    window.location.assign(`${url.pathname}${url.search}${url.hash}`)
  }

  useEffect(() => {
    document.documentElement.lang = language

    const url = new URL(window.location.href)
    const legacyLanguage = url.searchParams.get('lang')
    if (!isLanguageCode(legacyLanguage)) return

    url.pathname = getLocalizedPath(legacyLanguage)
    url.searchParams.delete('lang')
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }, [language])

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      copy,
    }),
    [copy, language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }

  return context
}
