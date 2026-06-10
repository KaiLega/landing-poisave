import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { COOKIE_CONSENT_CHANGE_EVENT, hasMeasurementConsent, trackPageView, updateAnalyticsConsent } from '../analytics'

export default function Analytics() {
  const location = useLocation()
  const pagePath = `${location.pathname}${location.search}`

  useEffect(() => {
    trackPageView(pagePath)
  }, [pagePath])

  useEffect(() => {
    const handleConsentChange = () => {
      if (hasMeasurementConsent()) {
        trackPageView(pagePath)
        return
      }

      updateAnalyticsConsent(false)
    }

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange)
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, handleConsentChange)
  }, [pagePath])

  return null
}
