import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

export default function LegalLayout() {
  return (
    <div className="font-display">
      <Header forceSticky />
      <Outlet />
      <Footer />
      <CookieBanner />
    </div>
  )
}
