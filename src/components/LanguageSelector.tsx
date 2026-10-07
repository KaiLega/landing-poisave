import React, { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { languages } from '../i18n'
import { useI18n } from '../i18n/I18nProvider'
import { getLocalizedHashRoute, getLocalizedPath } from '../i18n/urls'
import { ROUTES } from '../routes'

type LanguageSelectorProps = {
  variant?: 'header' | 'footer'
  isLight?: boolean
}

export default function LanguageSelector({ variant = 'header', isLight = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language, copy } = useI18n()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const listboxId = useId()
  const activeLanguage = languages.find((item) => item.code === language) ?? languages[0]
  const location = useLocation()

  const getLanguageHref = (code: (typeof languages)[number]['code']) => {
    if (location.pathname === ROUTES.home) return getLocalizedPath(code)
    return getLocalizedHashRoute(code, `${location.pathname}${location.search}`)
  }

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

  return (
    <div
      ref={rootRef}
      className={`language-selector language-selector--${variant}${isLight ? ' language-selector--light' : ''}${isOpen ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="language-selector__button"
        aria-haspopup="menu"
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

      <div
        id={listboxId}
        className="language-selector__menu"
        role="menu"
        aria-label={copy.language.label}
        hidden={!isOpen}
      >
        {languages.map((item) => (
          <a
            key={item.code}
            href={getLanguageHref(item.code)}
            className={`language-selector__option${item.code === language ? ' is-selected' : ''}`}
            role="menuitem"
            aria-current={item.code === language ? 'page' : undefined}
            hrefLang={item.code}
            lang={item.code}
            onClick={() => setIsOpen(false)}
          >
            <img className="language-selector__flag" src={item.flagSrc} alt="" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
