import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import BackToTop from '../components/BackToTop'

export default function LegalLayout() {
  return (
    <div className="font-display">
      <Header forceSticky />
      <Outlet />
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
