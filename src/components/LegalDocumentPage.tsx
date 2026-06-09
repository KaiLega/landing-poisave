import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'
import type { LegalDocument } from '../i18n/types'
import { useI18n } from '../i18n/I18nProvider'
import { LEGAL_LAST_UPDATED } from '../config'

type LegalDocumentPageProps = {
  legalDocument: LegalDocument
}

const dateLocales = {
  en: 'en-GB',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
  es: 'es-ES',
} as const

function renderText(text: string) {
  const parts = text.split(/(info@yugaweb\.com|support@yugaweb\.com|\/delete-account|https:\/\/poisave\.com\/#\/delete-account|https:\/\/www\.apple\.com\/legal\/internet-services\/itunes\/dev\/stdeula\/)/g)

  return parts.map((part, index) => {
    if (part === 'info@yugaweb.com' || part === 'support@yugaweb.com') {
      return (
        <a key={`${part}-${index}`} className="text-brand-700 underline underline-offset-4" href={`mailto:${part}`}>
          {part}
        </a>
      )
    }

    if (part === '/delete-account') {
      return (
        <Link key={`${part}-${index}`} className="text-brand-700 underline underline-offset-4" to={ROUTES.deleteAccount}>
          {part}
        </Link>
      )
    }

    if (part.startsWith('https://')) {
      return (
        <a key={`${part}-${index}`} className="text-brand-700 underline underline-offset-4" href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      )
    }

    return part
  })
}

export default function LegalDocumentPage({ legalDocument }: LegalDocumentPageProps) {
  const { copy, language } = useI18n()
  const lastUpdated = new Intl.DateTimeFormat(dateLocales[language], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${LEGAL_LAST_UPDATED}T00:00:00`))

  return (
    <section className="bg-slate-50 min-h-[70vh] section">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h1 className="heading">{legalDocument.title}</h1>
          <p className="mt-3 subtle">{copy.legal.lastUpdatedLabel}: {lastUpdated}</p>
        </div>

        <div className="space-y-6 mt-10 text-slate-700 text-sm leading-relaxed legal-document">
          {legalDocument.intro?.map((paragraph) => (
            <p key={paragraph}>{renderText(paragraph)}</p>
          ))}

          {legalDocument.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="font-bold text-slate-900 text-base">{section.title}</h2>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{renderText(paragraph)}</p>
              ))}

              {section.bullets && (
                <ul className="space-y-2 pl-5 list-disc">
                  {section.bullets.map((item) => (
                    <li key={item}>{renderText(item)}</li>
                  ))}
                </ul>
              )}

              {section.ordered && (
                <ol className="space-y-2 pl-5 list-decimal">
                  {section.ordered.map((item) => (
                    <li key={item}>{renderText(item)}</li>
                  ))}
                </ol>
              )}

              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="space-y-2">
                  <h3 className="font-semibold text-slate-900">{subsection.title}</h3>

                  {subsection.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{renderText(paragraph)}</p>
                  ))}

                  {subsection.bullets && (
                    <ul className="space-y-2 pl-5 list-disc">
                      {subsection.bullets.map((item) => (
                        <li key={item}>{renderText(item)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to={ROUTES.home} className="btn btn-glass-brand">{copy.common.backHome}</Link>
        </div>
      </div>
    </section>
  )
}
