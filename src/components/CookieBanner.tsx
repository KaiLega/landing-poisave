import React, { useEffect, useId, useRef, useState } from 'react'
import { Cookie as LinkIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import { useI18n } from '../i18n/I18nProvider'
import { COOKIE_CONSENT_STORAGE_KEY, notifyCookieConsentChange } from '../analytics'

export default function CookieBanner(){
  const { copy } = useI18n()
  const t = copy.cookieBanner
  const [visible, setVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [openDesc, setOpenDesc] = useState({
    necessary: false,
    experience: false,
    measurement: false,
    marketing: false
  })
  const [prefs, setPrefs] = useState({
    necessary: true,
    experience: false,
    measurement: false,
    marketing: false
  })
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const badgeRef = useRef<HTMLButtonElement | null>(null)
  const restoreFocusToBadgeRef = useRef(false)
  const dialogTitleId = useId()
  const dialogDescriptionId = useId()

  useEffect(() => {
    const existing = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (!existing) {
      setVisible(true)
    }
    setHasLoaded(true)
  }, [])

  useEffect(() => {
    if (!visible) return undefined

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null
    const previousOverflow = document.body.style.overflow
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    document.body.style.overflow = 'hidden'
    const focusFrame = window.requestAnimationFrame(() => headingRef.current?.focus())

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setVisible(false)
        return
      }

      if (event.key !== 'Tab') return

      const dialog = dialogRef.current
      if (!dialog) return

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector))
        .filter((element) => !element.hasAttribute('hidden'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (!restoreFocusToBadgeRef.current && previouslyFocused?.isConnected) {
        previouslyFocused.focus()
      }
    }
  }, [visible])

  useEffect(() => {
    if (visible || !hasLoaded || !restoreFocusToBadgeRef.current) return undefined

    const focusFrame = window.requestAnimationFrame(() => {
      badgeRef.current?.focus()
      restoreFocusToBadgeRef.current = false
    })

    return () => window.cancelAnimationFrame(focusFrame)
  }, [hasLoaded, visible])

  const handleChoice = (value: 'accepted' | 'declined') => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value)
    setVisible(false)
    notifyCookieConsentChange()
  }

  const handleSave = () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(prefs))
    setVisible(false)
    notifyCookieConsentChange()
  }

  const applyAll = (value: boolean) => {
    setPrefs({
      necessary: true,
      experience: value,
      measurement: value,
      marketing: value
    })
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value ? 'accepted' : 'declined')
    setVisible(false)
    notifyCookieConsentChange()
  }

  if (!visible) {
    return hasLoaded ? (
      <button
        ref={badgeRef}
        type="button"
        className="bottom-5 left-5 z-[70] fixed bg-slate-900 shadow-lg px-3 py-2 rounded-full font-semibold text-white text-xs uppercase tracking-[0.2em] cookie-badge"
        onClick={() => {
          restoreFocusToBadgeRef.current = true
          setVisible(true)
          setExpanded(false)
        }}
      >
        <span className="cookie-badge__label">Cookie</span>
        <span className="cookie-badge__icon" aria-hidden>
          <LinkIcon className="w-4 h-4" />
        </span>
      </button>
    ) : null
  }

  return (
    <div className="z-[60] fixed inset-0 bg-slate-900/70 backdrop-blur-sm">
      <div className="absolute inset-0 flex justify-center items-center p-4 overflow-y-auto">
        <div
          ref={dialogRef}
          className="bg-white shadow-2xl p-6 md:p-8 rounded-3xl w-full max-w-4xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
          aria-describedby={dialogDescriptionId}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <Link
                className="font-semibold text-slate-500 hover:text-slate-700 text-sm"
                to={ROUTES.cookies}
                onClick={() => setVisible(false)}
              >
                {t.fullPolicy}
              </Link>
              <h2
                ref={headingRef}
                id={dialogTitleId}
                className="font-bold text-slate-900 text-2xl md:text-3xl"
                tabIndex={-1}
              >
                {t.title}
              </h2>
            </div>
          </div>

          <p id={dialogDescriptionId} className="mt-4 text-slate-600 text-sm leading-relaxed">{t.intro}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="btn-outline btn" onClick={() => applyAll(false)}>
              {t.rejectAll}
            </button>
            <button className="btn btn-primary" onClick={() => applyAll(true)}>
              {t.acceptAll}
            </button>
            <button className="btn-outline btn" onClick={() => setExpanded(prev => !prev)}>
              {expanded ? t.hideDetails : t.showDetails}
            </button>
          </div>

          {expanded && (
            <div className="mt-8 pt-6 border-black/10 border-t">
            <h3 className="font-semibold text-slate-900 text-lg">{t.trackingTitle}</h3>
            <p className="mt-2 text-slate-600 text-sm leading-relaxed">{t.trackingIntro}</p>

            <div className="gap-4 grid mt-5">
              <div className="flex justify-between items-center p-4 border border-black/10 rounded-2xl">
                <div>
                  <p className="font-semibold text-slate-900">{t.categories.necessary.label}</p>
                  <button
                    className="text-slate-500 text-xs underline underline-offset-4"
                    onClick={() => setOpenDesc(prev => ({ ...prev, necessary: !prev.necessary }))}
                  >
                    {t.showDescription}
                  </button>
                  {openDesc.necessary && (
                    <p className="mt-2 text-slate-500 text-xs">{t.categories.necessary.description}</p>
                  )}
                </div>
                <span className="font-semibold text-slate-400 text-xs uppercase">{t.alwaysOn}</span>
              </div>

              <div className="flex justify-between items-center p-4 border border-black/10 rounded-2xl">
                <div>
                  <p className="font-semibold text-slate-900">{t.categories.experience.label}</p>
                  <button
                    className="text-slate-500 text-xs underline underline-offset-4"
                    onClick={() => setOpenDesc(prev => ({ ...prev, experience: !prev.experience }))}
                  >
                    {t.showDescription}
                  </button>
                  {openDesc.experience && (
                    <p className="mt-2 text-slate-500 text-xs">{t.categories.experience.description}</p>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={prefs.experience}
                  onChange={(e) => setPrefs(prev => ({ ...prev, experience: e.target.checked }))}
                />
              </div>

              <div className="flex justify-between items-center p-4 border border-black/10 rounded-2xl">
                <div>
                  <p className="font-semibold text-slate-900">{t.categories.measurement.label}</p>
                  <button
                    className="text-slate-500 text-xs underline underline-offset-4"
                    onClick={() => setOpenDesc(prev => ({ ...prev, measurement: !prev.measurement }))}
                  >
                    {t.showDescription}
                  </button>
                  {openDesc.measurement && (
                    <p className="mt-2 text-slate-500 text-xs">{t.categories.measurement.description}</p>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={prefs.measurement}
                  onChange={(e) => setPrefs(prev => ({ ...prev, measurement: e.target.checked }))}
                />
              </div>

              <div className="flex justify-between items-center p-4 border border-black/10 rounded-2xl">
                <div>
                  <p className="font-semibold text-slate-900">{t.categories.marketing.label}</p>
                  <button
                    className="text-slate-500 text-xs underline underline-offset-4"
                    onClick={() => setOpenDesc(prev => ({ ...prev, marketing: !prev.marketing }))}
                  >
                    {t.showDescription}
                  </button>
                  {openDesc.marketing && (
                    <p className="mt-2 text-slate-500 text-xs">{t.categories.marketing.description}</p>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs(prev => ({ ...prev, marketing: e.target.checked }))}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3 mt-6">
              <button className="btn-outline btn" onClick={() => handleChoice('declined')}>
                {t.rejectAll}
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {t.save}
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
