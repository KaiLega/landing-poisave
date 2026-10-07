import React from 'react'
import { ROUTES } from '../routes'
import SectionLink from './SectionLink'
import LanguageSelector from './LanguageSelector'
import { useI18n } from '../i18n/I18nProvider'
import { getLocalizedHashRoute } from '../i18n/urls'

export default function Footer(){
  const year = new Date().getFullYear()
  const { copy, language } = useI18n()

  return (
    <footer className="border-black/5 border-t">
      <div className="footer-shell">
        <div className="footer-brand">
          <img src="/img/logo.png" className="h-6" alt="" width="600" height="180" loading="lazy" decoding="async" />
          <span>© {year}</span> <a className="credit-link" href="https://yugaweb.com">{copy.footer.designedBy}</a>
        </div>

        <div className="footer-nav">
          <div className="footer-links">
            <SectionLink sectionId="how-it-works">{copy.nav.howItWorks}</SectionLink>
            <SectionLink sectionId="download">{copy.nav.download}</SectionLink>
            <SectionLink sectionId="faq">{copy.nav.faq}</SectionLink>
            <a href={getLocalizedHashRoute(language, ROUTES.deleteAccount)}>{copy.footer.deleteAccount}</a>
          </div>

          <div className="footer-links footer-links--legal">
            <a href={getLocalizedHashRoute(language, ROUTES.terms)}>{copy.footer.terms}</a>
            <a href={getLocalizedHashRoute(language, ROUTES.privacy)}>{copy.footer.privacy}</a>
            <a href={getLocalizedHashRoute(language, ROUTES.cookies)}>{copy.footer.cookies}</a>
            <LanguageSelector variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
