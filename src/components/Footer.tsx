import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import SectionLink from './SectionLink'
import LanguageSelector from './LanguageSelector'
import { useI18n } from '../i18n/I18nProvider'

export default function Footer(){
  const year = new Date().getFullYear()
  const { copy } = useI18n()

  return (
    <footer className="border-black/5 border-t">
      <div className="footer-shell">
        <div className="footer-brand">
          <img src="/img/logo.png" className="h-6" alt="" />
          <span>© {year}</span> <a className="credit-link" href="https://yugaweb.com">{copy.footer.designedBy}</a>
        </div>

        <div className="footer-nav">
          <div className="footer-links">
            <SectionLink sectionId="how-it-works">{copy.nav.howItWorks}</SectionLink>
            <SectionLink sectionId="download">{copy.nav.download}</SectionLink>
            <SectionLink sectionId="faq">{copy.nav.faq}</SectionLink>
            <Link to={ROUTES.deleteAccount}>{copy.footer.deleteAccount}</Link>
          </div>

          <div className="footer-links footer-links--legal">
            <Link to={ROUTES.terms}>{copy.footer.terms}</Link>
            <Link to={ROUTES.privacy}>{copy.footer.privacy}</Link>
            <Link to={ROUTES.cookies}>{copy.footer.cookies}</Link>
            <LanguageSelector variant="footer" />
          </div>
        </div>
      </div>
    </footer>
  )
}
