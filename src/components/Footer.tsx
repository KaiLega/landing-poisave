import React from 'react'

export default function Footer(){
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-black/5">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <img src="/img/logo.png" className="h-6" alt="" />
          <span>© {year}</span> <a className="credit-link" href="https://yugaweb.com">Designed by Yuga Web</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features">Features</a>
          <a href="#faq">FAQ</a>
          <a href="#download">Download</a>
          <a href="/#/privacy">Privacy</a>
          <a href="/#/cookies">Cookie</a>
        </div>
      </div>
    </footer>
  )
}
