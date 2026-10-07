// @vitest-environment jsdom

import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { COOKIE_CONSENT_STORAGE_KEY } from '../analytics'
import { I18nProvider } from '../i18n/I18nProvider'
import CookieBanner from './CookieBanner'

function renderBanner() {
  return render(
    <I18nProvider initialLanguage="en">
      <MemoryRouter>
        <CookieBanner />
      </MemoryRouter>
    </I18nProvider>,
  )
}

describe('CookieBanner accessibility', () => {
  afterEach(() => {
    cleanup()
  })

  beforeEach(() => {
    localStorage.clear()
  })

  it('opens as a modal dialog and moves focus to its heading', async () => {
    renderBanner()

    const dialog = await screen.findByRole('dialog')
    const heading = screen.getByRole('heading', { name: 'Your privacy preferences' })

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    await waitFor(() => expect(heading).toHaveFocus())
  })

  it('closes with Escape and restores focus to the opener', async () => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'accepted')
    renderBanner()

    const opener = await screen.findByRole('button', { name: 'Cookie' })
    opener.focus()
    fireEvent.click(opener)
    await screen.findByRole('dialog')

    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cookie' })).toHaveFocus())
  })
})
