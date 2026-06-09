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

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (isLanguageCode(saved)) return saved

  const browserLanguage = window.navigator.language.split('-')[0]
  if (isLanguageCode(browserLanguage)) return browserLanguage

  return defaultLanguage
}

function updateMetaDescription(description: string) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')

  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
  }

  meta.content = description
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage)
  const copy = messages[language]

  useEffect(() => {
    document.documentElement.lang = language
    document.title = copy.seo.title
    updateMetaDescription(copy.seo.description)
    window.localStorage.setItem(STORAGE_KEY, language)
  }, [copy.seo.description, copy.seo.title, language])

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
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
