// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ShortSharePinPage from './ShortSharePinPage'

const NOW = Date.parse('2026-09-29T12:00:00.000Z')
const FUTURE_EXPIRY_SECONDS = Math.floor(NOW / 1000) + 86_400
const TOKEN = 'K7mQ2x9B4nR8tV3wY6zA1c'
const VALID_SEARCH = `?id=${TOKEN}&e=${FUTURE_EXPIRY_SECONDS}`

function response(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response
}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})

describe('ShortSharePinPage', () => {
  it('shows an expired state without calling the API', () => {
    const fetchImpl = vi.fn() as unknown as typeof fetch
    const expired = Math.floor(NOW / 1000) - 1

    render(
      <ShortSharePinPage
        search={`?id=${TOKEN}&e=${expired}`}
        now={() => NOW}
        resolverUrl="/resolver"
        fetchImpl={fetchImpl}
      />,
    )

    expect(screen.getByText('Link scaduto')).toBeInTheDocument()
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('does not resolve a valid link until the explicit button click', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(200, {
      ok: true,
      pin: {
        title: 'Furong Town',
        categoryId: 'location',
        coord: {
          latitude: 28.76733999999999,
          longitude: 109.97484,
        },
        city: '芙蓉镇',
        address: 'Hunan, Cina',
        price: null,
      },
      expiresAt: new Date(NOW + 86_400_000).toISOString(),
    })) as unknown as typeof fetch

    render(
      <ShortSharePinPage
        search={VALID_SEARCH}
        now={() => NOW}
        resolverUrl="/resolver"
        fetchImpl={fetchImpl}
      />,
    )

    expect(screen.getByRole('heading', { name: 'Un POI è stato condiviso con te' })).toBeInTheDocument()
    expect(fetchImpl).not.toHaveBeenCalled()
    expect(screen.getByRole('img', { name: 'PoiSave' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Apri in PoiSave' }))

    await waitFor(() => expect(screen.getByRole('heading', { name: 'Furong Town' })).toBeInTheDocument())
    expect(fetchImpl).toHaveBeenCalledTimes(1)
    expect(screen.getByText('芙蓉镇')).toBeInTheDocument()
    expect(screen.getByText('Hunan, Cina')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Apri in PoiSave/i })).toHaveAttribute(
      'href',
      expect.stringContaining('lat=28.76733999999999'),
    )
  })
})
