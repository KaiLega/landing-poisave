import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import BackToTop from '../components/BackToTop'
import SkipLink from '../components/SkipLink'

export default function LegalLayout() {
  return (
    <div className="font-display">
      <SkipLink />
      <Header forceSticky />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </div>
  )
}
