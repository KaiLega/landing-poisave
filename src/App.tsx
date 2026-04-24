import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ComingSoon from './components/ComingSoon'
import { COMING_SOON } from './config'
import MarketingLayout from './layouts/MarketingLayout'
import LegalLayout from './layouts/LegalLayout'
import HomePage from './pages/HomePage'
import PrivacyPage from './pages/PrivacyPage'
import CookiePage from './pages/CookiePage'
import TermsPage from './pages/TermsPage'
import DeleteAccountPage from './pages/DeleteAccountPage'
import { ROUTES } from './routes'

export default function App() {
  if (COMING_SOON) {
    return <ComingSoon />
  }

  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path={ROUTES.home} element={<HomePage />} />
      </Route>

      <Route element={<LegalLayout />}>
        <Route path={ROUTES.privacy} element={<PrivacyPage />} />
        <Route path={ROUTES.cookies} element={<CookiePage />} />
        <Route path={ROUTES.terms} element={<TermsPage />} />
        <Route path={ROUTES.deleteAccount} element={<DeleteAccountPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
    </Routes>
  )
}
