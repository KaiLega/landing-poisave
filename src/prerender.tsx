import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import type { LanguageCode } from './i18n'

export function renderHome(language: LanguageCode) {
  const originalConsoleError = console.error

  // React Router uses layout effects that are intentionally skipped in static HTML.
  console.error = (message?: unknown, ...details: unknown[]) => {
    if (typeof message === 'string' && message.includes('useLayoutEffect does nothing on the server')) return
    originalConsoleError(message, ...details)
  }

  try {
    return renderToString(
      <React.StrictMode>
        <I18nProvider initialLanguage={language}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </I18nProvider>
      </React.StrictMode>,
    )
  } finally {
    console.error = originalConsoleError
  }
}
