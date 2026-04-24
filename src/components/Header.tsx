import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionLink from './SectionLink'
import { ROUTES } from '../routes'

type HeaderProps = {
  forceSticky?: boolean
}

export default function Header({ forceSticky = false }: HeaderProps){
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = [
    {sectionId: 'features', label:'Features'},
    {sectionId: 'how', label:'How it works'},
    {sectionId: 'screens', label:'Screens'},
    {sectionId: 'faq', label:'FAQ'},
    {sectionId: 'download', label:'Download'}
  ]
  const showSticky = forceSticky || isScrolled
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${showSticky ? 'nav-blur border-b border-white/20' : 'border-b border-transparent bg-transparent'}`}>
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to={ROUTES.home} className="header-brand flex items-center gap-2 font-semibold">
          <img
            src={showSticky ? "/img/logo.png" : "/img/poisave-logo-horizontal-light.png"}
            className="header-brand__img"
            alt="poisave"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-base font-medium">
          {items.map(it => (
            <SectionLink
              key={it.sectionId}
              sectionId={it.sectionId}
              className={`transition-colors ${showSticky ? 'text-slate-700/85 hover:text-slate-950' : 'text-white hover:text-white'}`}
            >
              {it.label}
            </SectionLink>
          ))}
        </nav>
        <SectionLink sectionId="download" className={`btn header-cta ${showSticky ? 'btn-primary' : 'btn-glass text-white'}`}>Get the app</SectionLink>
      </div>
    </header>
  )
}
