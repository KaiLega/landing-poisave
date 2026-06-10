import { GA_MEASUREMENT_ID } from './config'

export const COOKIE_CONSENT_STORAGE_KEY = 'poisave_cookie_consent'
export const COOKIE_CONSENT_CHANGE_EVENT = 'poisave:cookie-consent-change'

type CookiePreferences = {
  measurement?: boolean
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let hasLoadedGoogleAnalytics = false

function getStoredConsent() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
}

export function hasMeasurementConsent() {
  const storedConsent = getStoredConsent()

  if (storedConsent === 'accepted') return true
  if (storedConsent === 'declined' || !storedConsent) return false

  try {
    const preferences = JSON.parse(storedConsent) as CookiePreferences
    return preferences.measurement === true
  } catch {
    return false
  }
}

export function notifyCookieConsentChange() {
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT))
}

export function updateAnalyticsConsent(isGranted: boolean) {
  if (!window.gtag) return

  window.gtag('consent', 'update', {
    analytics_storage: isGranted ? 'granted' : 'denied',
  })
}

export function loadGoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || hasLoadedGoogleAnalytics) return

  hasLoadedGoogleAnalytics = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
  })
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
  })
}

export function trackPageView(path: string) {
  if (!hasMeasurementConsent()) {
    updateAnalyticsConsent(false)
    return
  }

  loadGoogleAnalytics()
  updateAnalyticsConsent(true)

  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: path,
  })
}
