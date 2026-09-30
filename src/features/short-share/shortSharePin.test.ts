// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinDeepLink } from '../../sharePin'
import {
  loadShortSharedPin,
  parseShortShareQuery,
  readSharedPinCache,
  resolveSharedPin,
  writeSharedPinCache,
  type ShortShareLink,
} from './shortSharePin'

const NOW = Date.parse('2026-09-29T12:00:00.000Z')
const LINK: ShortShareLink = {
  id: 'K7mQ2x9B4nR8tV3wY6zA1c',
  expiresAt: NOW + 86_400_000,
}
const PIN = {
  title: 'Furong Town',
  categoryId: 'location',
  latitude: 28.76733999999999,
  longitude: 109.97484,
  city: '芙蓉镇',
  address: 'Furong Town, Yongshun County, Hunan, Cina',
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
    price: null,
  },
  expiresAt: new Date(LINK.expiresAt).toISOString(),
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

describe('parseShortShareQuery', () => {
  it('accepts an exact 22-character URL-safe token and Unix expiry', () => {
    const result = parseShortShareQuery('?id=K7mQ2x9B4nR8tV3wY6zA1c&e=1793145600', NOW)

    expect(result).toEqual({
      status: 'valid',
      link: {
        id: 'K7mQ2x9B4nR8tV3wY6zA1c',
        expiresAt: 1_793_145_600_000,
      },
    })
  })

  it.each([
    ['', ['id', 'e']],
    ['?id=K7mQ2x9B4nR8tV3wY6zA%3C&e=1793145600', ['id']],
    ['?id=K7mQ2x9B4nR8tV3wY6zA1&e=1793145600', ['id']],
    ['?id=K7mQ2x9B4nR8tV3wY6zA1cd&e=1793145600', ['id']],
    ['?id=K7mQ2x9B4nR8tV3wY6zA1c&e=tomorrow', ['e']],
    ['?id=short&e=1793145600', ['id']],
  ])('rejects missing or malformed parameters in %s', (search, errors) => {
    expect(parseShortShareQuery(search, NOW)).toEqual({ status: 'invalid', errors })
  })
})

describe('shared pin resolver', () => {
  it('validates a successful response and preserves coordinate precision', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(200, SUCCESS_PAYLOAD)) as unknown as typeof fetch
    const result = await resolveSharedPin(LINK.id, 'https://api.example.com/shared-pin', fetchImpl)

    expect(result.pin.latitude).toBe(28.76733999999999)
    expect(result.pin.longitude).toBe(109.97484)
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://api.example.com/shared-pin?id=K7mQ2x9B4nR8tV3wY6zA1c',
      expect.objectContaining({ method: 'GET' }),
    )

    const deepLink = createPinDeepLink(result.pin)
    const params = new URLSearchParams(deepLink.split('?')[1])
    expect(params.get('lat')).toBe('28.76733999999999')
    expect(params.get('lng')).toBe('109.97484')
  })

  it('maps HTTP 410 to the same unavailable error', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(response(410, { ok: false, error: 'expired' })) as unknown as typeof fetch

    await expect(resolveSharedPin(LINK.id, '/resolver', fetchImpl)).rejects.toMatchObject({ code: 'unavailable' })
  })

  it('reports a network error without exposing implementation details', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error('offline')) as unknown as typeof fetch

    await expect(resolveSharedPin(LINK.id, '/resolver', fetchImpl)).rejects.toMatchObject({ code: 'network' })
  })
})

describe('shared pin cache', () => {
  it('uses a valid cached pin without calling the resolver', async () => {
    writeSharedPinCache(window.localStorage, LINK, PIN, LINK.expiresAt)
    const fetchImpl = vi.fn() as unknown as typeof fetch

    const result = await loadShortSharedPin({
      link: LINK,
      resolverUrl: '/resolver',
      storage: window.localStorage,
      fetchImpl,
      now: NOW,
    })

    expect(result).toEqual({ pin: PIN, source: 'cache' })
    expect(fetchImpl).not.toHaveBeenCalled()
  })

  it('discards an expired cache entry', () => {
    writeSharedPinCache(window.localStorage, LINK, PIN, NOW - 1)

    expect(readSharedPinCache(window.localStorage, LINK, NOW)).toBeNull()
    expect(window.localStorage.length).toBe(0)
  })
})

describe('deep-link construction', () => {
  it('encodes untrusted values as parameters instead of executable URL content', () => {
    const deepLink = createPinDeepLink({
      ...PIN,
      title: 'Town&admin=true',
      address: '<script>alert(1)</script>',
      price: '€10',
    })
    const params = new URLSearchParams(deepLink.split('?')[1])

    expect(deepLink.startsWith('poisave://pin?')).toBe(true)
    expect(params.get('title')).toBe('Town&admin=true')
    expect(params.get('address')).toBe('<script>alert(1)</script>')
    expect(params.get('admin')).toBeNull()
  })
})
