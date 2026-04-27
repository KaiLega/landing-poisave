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
        <div className="flex md:flex-row flex-col items-center gap-3 md:gap-4">
          <div className="flex items-center gap-4">
            <SectionLink sectionId="how-it-works">How it Works</SectionLink>
            <SectionLink sectionId="download">Download</SectionLink>       
            <SectionLink sectionId="faq">FAQ</SectionLink>     
            <Link to={ROUTES.deleteAccount}>Delete account</Link>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <Link to={ROUTES.terms}>Terms of Use</Link>
            <Link to={ROUTES.privacy}>Privacy Policy</Link>
            <Link to={ROUTES.cookies}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
