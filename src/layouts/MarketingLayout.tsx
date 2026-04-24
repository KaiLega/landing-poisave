import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

export default function MarketingLayout() {
  return (
    <div className="bg-white font-display text-slate-900">
      <Header />
      <Outlet />
      <Footer />
      <CookieBanner />
    </div>
  )
}
