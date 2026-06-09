import React, { useEffect, useId, useRef, useState } from 'react'
import { languages } from '../i18n'
import { useI18n } from '../i18n/I18nProvider'
import type { LanguageCode } from '../i18n'

type LanguageSelectorProps = {
  variant?: 'header' | 'footer'
  isLight?: boolean
}

export default function LanguageSelector({ variant = 'header', isLight = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage, copy } = useI18n()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const listboxId = useId()
  const activeLanguage = languages.find((item) => item.code === language) ?? languages[0]

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const chooseLanguage = (code: LanguageCode) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={`language-selector language-selector--${variant}${isLight ? ' language-selector--light' : ''}${isOpen ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="language-selector__button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={copy.language.label}
        onClick={() => setIsOpen((current) => !current)}
      >
        <img className="language-selector__flag" src={activeLanguage.flagSrc} alt="" aria-hidden="true" />
        <span className="language-selector__text">
          {variant === 'header' ? activeLanguage.shortLabel : activeLanguage.label}
        </span>
        <span className="language-selector__chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div id={listboxId} className="language-selector__menu" role="listbox" aria-label={copy.language.label}>
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`language-selector__option${item.code === language ? ' is-selected' : ''}`}
              role="option"
              aria-selected={item.code === language}
              onClick={() => chooseLanguage(item.code)}
            >
              <img className="language-selector__flag" src={item.flagSrc} alt="" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
