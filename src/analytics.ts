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
    __poisaveGaInitialized?: boolean
  }
}

let hasLoadedGoogleAnalytics = typeof window !== 'undefined' && window.__poisaveGaInitialized === true

function getStoredConsent() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
}

export function isAnalyticsDebugMode() {
  if (typeof window === 'undefined') return false

  const params = new URLSearchParams(window.location.search)

  return params.get('ga_debug') === '1' || params.has('gtm_debug')
}

export function hasMeasurementConsent() {
  if (isAnalyticsDebugMode()) return true

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
  window.__poisaveGaInitialized = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args)
  }

  const existingScript = document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`)

  if (!existingScript) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
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
    debug_mode: isAnalyticsDebugMode(),
  })
}
