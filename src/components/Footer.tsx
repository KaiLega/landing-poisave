import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import SectionLink from './SectionLink'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="border-black/5 border-t">
      <div className="flex md:flex-row flex-col justify-between items-center gap-4 mx-auto px-4 py-10 max-w-6xl text-slate-600 text-sm">
        <div className="flex items-center gap-2">
          <img src="/img/logo.png" className="h-6" alt="" />
          <span>© {year}</span> <a className="credit-link" href="https://yugaweb.com">Designed by Yuga Web</a>
        </div>
        <div className="flex items-center gap-4">
          <SectionLink sectionId="features">Features</SectionLink>
          <SectionLink sectionId="faq">FAQ</SectionLink>
          <SectionLink sectionId="download">Download</SectionLink>
          <Link to={ROUTES.deleteAccount}>Delete account</Link>
          <Link to={ROUTES.terms}>Terms of Use</Link>
          <Link to={ROUTES.privacy}>Privacy Policy</Link>
          <Link to={ROUTES.cookies}>Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}
