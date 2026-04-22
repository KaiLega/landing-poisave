import React, { useEffect, useState } from 'react'

export default function Header(){
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items = [
    {href:'#features', label:'Features'},
    {href:'#how', label:'How it works'},
    {href:'#screens', label:'Screens'},
    {href:'#faq', label:'FAQ'},
    {href:'#download', label:'Download'}
  ]
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'nav-blur border-b border-white/20' : 'border-b border-transparent bg-transparent'}`}>
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#" className="header-brand flex items-center gap-2 font-semibold">
          <img
            src={isScrolled ? "/img/logo.png" : "/img/poisave-logo-horizontal-light.png"}
            className="header-brand__img"
            alt="poisave"
          />
        </a>
        <nav className="hidden md:flex items-center gap-7 text-base font-medium">
          {items.map(it => (
            <a
              key={it.href}
              href={it.href}
              className={`transition-colors ${isScrolled ? 'text-slate-700/85 hover:text-slate-950' : 'text-white hover:text-white'}`}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <a className={`btn header-cta ${isScrolled ? 'btn-primary' : 'btn-glass text-white'}`} href="#download">Get the app</a>
      </div>
    </header>
  )
}
