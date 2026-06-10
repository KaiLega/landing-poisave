import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLanguage, isLanguageCode, messages } from './index'
import type { LanguageCode, Messages } from './types'

type I18nContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  copy: Messages
}

const STORAGE_KEY = 'poisave-language'

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return defaultLanguage

  const urlLanguage = new URLSearchParams(window.location.search).get('lang')
  if (isLanguageCode(urlLanguage)) return urlLanguage

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (isLanguageCode(saved)) return saved

  const browserLanguage = window.navigator.language.split('-')[0]
  if (isLanguageCode(browserLanguage)) return browserLanguage

  return defaultLanguage
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage)
  const copy = messages[language]

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage)

    if (typeof window === 'undefined') return

    const url = new URL(window.location.href)

    if (nextLanguage === defaultLanguage) {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', nextLanguage)
    }

    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(STORAGE_KEY, language)
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
