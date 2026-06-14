import { RECAPTCHA_SITE_KEY } from './config'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

let recaptchaScriptPromise: Promise<void> | null = null

function loadRecaptchaScript() {
  if (!RECAPTCHA_SITE_KEY) return Promise.resolve()
  if (window.grecaptcha) return Promise.resolve()
  if (recaptchaScriptPromise) return recaptchaScriptPromise

  recaptchaScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}"]`,
    )

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('reCAPTCHA failed to load')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('reCAPTCHA failed to load'))
    document.head.appendChild(script)
  })

  return recaptchaScriptPromise
}

export async function getRecaptchaToken(action: string) {
  if (!RECAPTCHA_SITE_KEY) return ''

  await loadRecaptchaScript()

  return new Promise<string>((resolve, reject) => {
    window.grecaptcha?.ready(() => {
      window.grecaptcha
        ?.execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(reject)
    })
  })
}
