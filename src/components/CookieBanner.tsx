import React, { useEffect, useState } from 'react'
import { Cookie as LinkIcon } from 'lucide-react'

const STORAGE_KEY = 'poisave_cookie_consent'
const LANG_KEY = 'poisave_cookie_lang'

type Lang = 'it' | 'en'

const copy = {
  it: {
    title: 'Le tue preferenze relative alla privacy',
    intro:
      'Questo pannello ti permette di esprimere alcune preferenze relative al trattamento delle tue informazioni personali. ' +
      'Puoi rivedere e modificare le tue scelte in qualsiasi momento accedendo al presente pannello tramite l’apposito link. ' +
      'Per rifiutare il tuo consenso alle attività di trattamento descritte di seguito, disattiva i singoli comandi o utilizza il pulsante “Rifiuta tutto” e conferma di voler salvare le scelte effettuate.',
    fullPolicy: 'Visualizza Cookie Policy completa',
    trackingTitle: 'Le tue preferenze relative al consenso per le tecnologie di tracciamento',
    trackingIntro:
      'Le opzioni disponibili in questa sezione ti permettono di personalizzare le preferenze relative al consenso per qualsiasi tecnologia di tracciamento utilizzata per le finalità descritte di seguito. ' +
      'Per ottenere ulteriori informazioni in merito all’utilità e al funzionamento di tali strumenti di tracciamento, fai riferimento alla cookie policy. ' +
      'Tieni presente che il rifiuto del consenso per una finalità particolare può rendere le relative funzioni non disponibili.',
    rejectAll: 'Rifiuta tutto',
    acceptAll: 'Accetta tutto',
    save: 'Salva e continua',
    categories: {
      necessary: {
        label: 'Necessari',
        description: 'Cookie tecnici necessari per il funzionamento del sito e per salvare le preferenze.'
      },
      experience: {
        label: 'Esperienza',
        description: 'Cookie che migliorano l’esperienza utente (es. preferenze di lingua e UI).'
      },
      measurement: {
        label: 'Misurazione',
        description: 'Cookie di misurazione (Google Analytics 4) per analisi aggregate e miglioramento del sito.'
      },
      marketing: {
        label: 'Marketing',
        description: 'Cookie per contenuti personalizzati e campagne di marketing (non attivi sul sito).'
      }
    },
    showDescription: 'Mostra descrizione'
  },
  en: {
    title: 'Your privacy preferences',
    intro:
      'This panel allows you to express some preferences related to the processing of your personal information. ' +
      'You can review and update your choices at any time using the dedicated link. ' +
      'To refuse consent for the processing activities described below, disable individual toggles or use the “Reject all” button and confirm to save your choices.',
    fullPolicy: 'View full Cookie Policy',
    trackingTitle: 'Your preferences for tracking technologies',
    trackingIntro:
      'The options in this section let you customize your consent for any tracking technology used for the purposes described below. ' +
      'For more information on how these tools work, refer to the cookie policy. ' +
      'Please note that refusing consent for a specific purpose may make related features unavailable.',
    rejectAll: 'Reject all',
    acceptAll: 'Accept all',
    save: 'Save and continue',
    categories: {
      necessary: {
        label: 'Necessary',
        description: 'Essential cookies required for the site to function and to store preferences.'
      },
      experience: {
        label: 'Experience',
        description: 'Cookies that improve the user experience (e.g. language and UI preferences).'
      },
      measurement: {
        label: 'Measurement',
        description: 'Measurement cookies (Google Analytics 4) for aggregated analytics and site improvements.'
      },
      marketing: {
        label: 'Marketing',
        description: 'Cookies for personalized content and marketing campaigns (not used on this site).'
      }
    },
    showDescription: 'Show description'
  }
} as const

export default function CookieBanner(){
  const [visible, setVisible] = useState(false)
  const [lang, setLang] = useState<Lang>('it')
  const [consent, setConsent] = useState<string | null>(null)
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

  useEffect(() => {
    const existing = localStorage.getItem(STORAGE_KEY)
    if (!existing) {
      setVisible(true)
    }
    setConsent(existing)
    const savedLang = localStorage.getItem(LANG_KEY) as Lang | null
    if (savedLang) {
      setLang(savedLang)
    }
  }, [])

  const handleChoice = (value: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
    setVisible(false)
  }

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
    setConsent('custom')
    setVisible(false)
  }

  const applyAll = (value: boolean) => {
    setPrefs({
      necessary: true,
      experience: value,
      measurement: value,
      marketing: value
    })
    localStorage.setItem(STORAGE_KEY, value ? 'accepted' : 'declined')
    setConsent(value ? 'accepted' : 'declined')
    setVisible(false)
  }

  const t = copy[lang]

  if (!visible) {
    return consent ? (
      <button
        className="bottom-5 left-5 z-[70] fixed bg-slate-900 shadow-lg px-3 py-2 rounded-full font-semibold text-white text-xs uppercase tracking-[0.2em] cookie-badge"
        onClick={() => {
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
        <div className="bg-white shadow-2xl p-6 md:p-8 rounded-3xl w-full max-w-4xl">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <a
                className="font-semibold text-slate-500 hover:text-slate-700 text-sm"
                href="/#/cookies"
                onClick={() => setVisible(false)}
              >
                {t.fullPolicy}
              </a>
              <h2 className="font-bold text-slate-900 text-2xl md:text-3xl">{t.title}</h2>
            </div>
            <div className="flex gap-2">
              <button
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${lang === 'it' ? 'border-slate-900 text-slate-900' : 'border-slate-300 text-slate-500'}`}
                onClick={() => {
                  setLang('it')
                  localStorage.setItem(LANG_KEY, 'it')
                }}
              >
                IT
              </button>
              <button
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${lang === 'en' ? 'border-slate-900 text-slate-900' : 'border-slate-300 text-slate-500'}`}
                onClick={() => {
                  setLang('en')
                  localStorage.setItem(LANG_KEY, 'en')
                }}
              >
                EN
              </button>
            </div>
          </div>

          <p className="mt-4 text-slate-600 text-sm leading-relaxed">{t.intro}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <button className="btn-outline btn" onClick={() => applyAll(false)}>
              {t.rejectAll}
            </button>
            <button className="btn btn-primary" onClick={() => applyAll(true)}>
              {t.acceptAll}
            </button>
            <button className="btn-outline btn" onClick={() => setExpanded(prev => !prev)}>
              {expanded ? 'Nascondi dettagli' : 'Mostra dettagli'}
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
                <span className="font-semibold text-slate-400 text-xs uppercase">Always on</span>
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
