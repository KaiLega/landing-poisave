import React, { useEffect, useId, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import SectionLink from './SectionLink'
import { ROUTES } from '../routes'
import LanguageSelector from './LanguageSelector'
import { useI18n } from '../i18n/I18nProvider'

type HeaderProps = {
  forceSticky?: boolean
}

export default function Header({ forceSticky = false }: HeaderProps){
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuId = useId()
  const { copy } = useI18n()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined

    const closeOnResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', closeOnResize)
    return () => window.removeEventListener('resize', closeOnResize)
  }, [isMobileMenuOpen])

  const items = [
    {sectionId: 'how-it-works', label: copy.nav.howItWorks},
    {sectionId: 'app-preview', label: copy.nav.appPreview},
    {sectionId: 'features', label: copy.nav.features},
    {sectionId: 'download', label: copy.nav.download},
    {sectionId: 'faq', label: copy.nav.faq}
  ]
  const showSticky = forceSticky || isScrolled || isMobileMenuOpen
  const mobileLinkClass = 'mobile-nav__link'
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${showSticky ? 'nav-blur border-b border-white/20' : 'border-b border-transparent bg-transparent'}`}>
      <div className="flex justify-between items-center mx-auto px-4 max-w-6xl h-16">
        <Link
          to={ROUTES.home}
          className="flex items-center gap-2 font-semibold header-brand"
          onClick={(event) => {
            if (location.pathname !== ROUTES.home) return

            event.preventDefault()
            scrollToTop()
          }}
        >
          <img
            src={showSticky ? "/img/logo.png" : "/img/poisave-logo-horizontal-light.png"}
            className="header-brand__img"
            alt="poisave"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-medium text-base">
          {items.map(it => (
            <SectionLink
              key={it.sectionId}
              sectionId={it.sectionId}
              className={`transition-colors ${showSticky ? 'text-slate-700/85 hover:text-slate-950' : 'text-white hover:text-white'}`}
            >
              {it.label}
            </SectionLink>
          ))}
          <LanguageSelector isLight={!showSticky} />
        </nav>
        <SectionLink sectionId="download" className={`btn header-cta ${showSticky ? 'btn-primary' : 'btn-glass text-white'}`}>{copy.nav.getApp}</SectionLink>
        <button
          type="button"
          className={`mobile-menu-button ${showSticky ? 'text-slate-800' : 'text-white'}`}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls={mobileMenuId}
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id={mobileMenuId} className="mobile-nav md:hidden">
          <nav className="mobile-nav__panel" aria-label="Mobile navigation">
            {items.map((item) => (
              <SectionLink
              key={item.sectionId}
              sectionId={item.sectionId}
              className={mobileLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
                {item.label}
            </SectionLink>
            ))}
            <div className="mobile-nav__footer">
              <LanguageSelector variant="footer" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
