// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createPinDeepLink,
  loadShortSharedPin,
  parseShortSharePath,
  readSharedPinCache,
  resolveSharedPin,
  writeSharedPinCache,
  type SharedPin,
} from './shortSharePin'

const NOW = Date.parse('2026-09-30T12:00:00.000Z')
const TOKEN = 'K7mQ2x9Babcd'
const EXPIRES_AT = NOW + 86_400_000
const PIN: SharedPin = {
  title: 'Furong Town',
  categoryId: 'location',
  latitude: 12.123456789,
  longitude: 34.123456789,
  city: '芙蓉镇',
  address: 'Furong Town, Hunan, Cina',
  price: '€20',
}
const SUCCESS_PAYLOAD = {
  ok: true,
  pin: {
    title: PIN.title,
    categoryId: PIN.categoryId,
    coord: {
      latitude: PIN.latitude,
      longitude: PIN.longitude,
    },
    city: PIN.city,
    address: PIN.address,
    price: PIN.price,
  },
  expiresAt: new Date(EXPIRES_AT).toISOString(),
}

function response(status: number, body: unknown): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response
}

beforeEach(() => {
  window.localStorage.clear()
})

describe('parseShortSharePath', () => {
  it('accepts /p/{id} with an exact 12-character URL-safe token', () => {
    expect(parseShortSharePath(`/p/${TOKEN}`)).toEqual({
      status: 'valid',
      link: { id: TOKEN },
    })
  })

  it.each([
    ['/p/K7mQ2x9Babc', '11 characters'],
    ['/p/K7mQ2x9Babcde', '13 characters'],
    ['/p/K7mQ2x9B4nR8tV3wY6zA1c', '22 characters'],
    ['/p/K7mQ2x9Babc!', 'unsupported character'],
    [`/p/?id=${TOKEN}&e=1793145600`, 'legacy query-string format'],
    ['/share-pin/', 'legacy share-pin route'],
  ])('rejects %s (%s)', (pathname) => {
    const parsedPath = new URL(pathname, 'https://poisave.com').pathname
    expect(parseShortSharePath(parsedPath)).toEqual({ status: 'invalid', errors: ['id'] })
  })
})

describe('shared pin resolver', () => {
  it('handles HTTP 200 and preserves coordinate precision', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(200, SUCCESS_PAYLOAD)) as unknown as typeof fetch
    const result = await resolveSharedPin(TOKEN, 'https://api.example.com/shared-pin', fetchImpl)

    expect(result.pin.latitude).toBe(12.123456789)
    expect(result.pin.longitude).toBe(34.123456789)
    expect(fetchImpl).toHaveBeenCalledWith(
      `https://api.example.com/shared-pin?id=${TOKEN}`,
      expect.objectContaining({ method: 'GET' }),
    )
  })

  it('maps HTTP 410 to unavailable', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(410, { ok: false, error: 'expired' })) as unknown as typeof fetch
    await expect(resolveSharedPin(TOKEN, '/resolver', fetchImpl)).rejects.toMatchObject({ code: 'unavailable' })
  })

  it('maps a failed request to a network error', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('offline')) as unknown as typeof fetch
    await expect(resolveSharedPin(TOKEN, '/resolver', fetchImpl)).rejects.toMatchObject({ code: 'network' })
  })

  it('rejects an invalid token without making an HTTP request', async () => {
    const fetchImpl = vi.fn() as unknown as typeof fetch
    await expect(resolveSharedPin('too-short', '/resolver', fetchImpl)).rejects.toMatchObject({ code: 'invalid-token' })
    expect(fetchImpl).not.toHaveBeenCalled()
  })
})

describe('shared pin cache', () => {
  it('uses a non-expired cached response', async () => {
    writeSharedPinCache(window.localStorage, TOKEN, PIN, EXPIRES_AT)
    const fetchImpl = vi.fn() as unknown as typeof fetch

    const result = await loadShortSharedPin({
      id: TOKEN,
      resolverUrl: '/resolver',
      storage: window.localStorage,
      fetchImpl,
      now: NOW,
    })

    expect(result).toEqual({ pin: PIN, source: 'cache' })
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('discards a cached response after the backend expiry', () => {
    writeSharedPinCache(window.localStorage, TOKEN, PIN, NOW - 1)
    expect(readSharedPinCache(window.localStorage, TOKEN, NOW)).toBeNull()
  })
})

describe('createPinDeepLink', () => {
  it('builds the final deep link without rounding coordinates', () => {
    const deepLink = createPinDeepLink(PIN)
    const params = new URLSearchParams(deepLink.split('?')[1])

    expect(deepLink.startsWith('poisave://pin?')).toBe(true)
    expect(Object.fromEntries(params)).toEqual({
      title: 'Furong Town',
      categoryId: 'location',
      lat: '12.123456789',
      lng: '34.123456789',
      city: '芙蓉镇',
      address: 'Furong Town, Hunan, Cina',
    })
  })
})
