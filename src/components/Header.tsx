import React from 'react'

export default function Header(){
  const items = [
    {href:'#features', label:'Features'},
    {href:'#how', label:'How it works'},
    {href:'#screens', label:'Screens'},
    {href:'#faq', label:'FAQ'},
    {href:'#download', label:'Download'}
  ]
  return (
    <header className="fixed top-0 left-0 right-0 z-40 nav-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <img src="/img/logo.png" className="h-12 w-auto" alt="poisave" />
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {items.map(it => (
            <a key={it.href} href={it.href} className="text-slate-600 hover:text-slate-900">{it.label}</a>
          ))}
        </nav>
        <a className="btn btn-primary" href="#download">Get the app</a>
      </div>
    </header>
  )
}
