// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ShortSharePinPage from './ShortSharePinPage'

const NOW = Date.parse('2026-09-30T12:00:00.000Z')
const TOKEN = 'K7mQ2x9Babcd'
const PATHNAME = `/p/${TOKEN}`

function response(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response
}

function successfulPayload() {
  return {
    ok: true,
    pin: {
      title: 'Furong Town',
      categoryId: 'location',
      coord: {
        latitude: 12.123456789,
        longitude: 34.123456789,
      },
      city: '芙蓉镇',
      address: 'Hunan, Cina',
      price: null,
    },
    expiresAt: new Date(NOW + 86_400_000).toISOString(),
  }
}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('ShortSharePinPage', () => {
  it('renders a direct /p/{id} refresh without resolving on initial load', () => {
    const fetchImpl = vi.fn() as unknown as typeof fetch

    render(
      <ShortSharePinPage
        pathname={PATHNAME}
        now={() => NOW}
        resolverUrl="/resolver"
        fetchImpl={fetchImpl}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Un POI è stato condiviso con te' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Apri in PoiSave' })).toBeInTheDocument()
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('renders the HTTP 200 response after explicit interaction', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(200, successfulPayload())) as unknown as typeof fetch

    render(
      <ShortSharePinPage
        pathname={PATHNAME}
        now={() => NOW}
        resolverUrl="/resolver"
        fetchImpl={fetchImpl}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Apri in PoiSave' }))

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Furong Town' })).toBeInTheDocument())
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('link', { name: /Apri in PoiSave/i })).toHaveAttribute(
      'href',
      expect.stringContaining('lat=12.123456789'),
    )
  })

  it('shows the expired state for HTTP 410', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(410, { ok: false, error: 'expired' })) as unknown as typeof fetch

    render(
      <ShortSharePinPage
        pathname={PATHNAME}
        now={() => NOW}
        resolverUrl="/resolver"
        fetchImpl={fetchImpl}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Apri in PoiSave' }))

    expect(await screen.findByText('Link scaduto')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Questo link non è più disponibile.' })).toBeInTheDocument()
  })

  it('shows a retry action after a network error', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('offline')) as unknown as typeof fetch

    render(
      <ShortSharePinPage
        pathname={PATHNAME}
        now={() => NOW}
        resolverUrl="/resolver"
        fetchImpl={fetchImpl}
      />,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Apri in PoiSave' }))

    expect(await screen.findByRole('button', { name: 'Riprova' })).toBeInTheDocument()
  })
})
