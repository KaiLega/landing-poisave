import type { SharedPin } from '../../sharePin'

const SHARED_PIN_ID_PATTERN = /^[A-Za-z0-9_-]{22}$/

export type ShortShareLink = {
  id: string
  expiresAt: number
}

export type ShortShareParseResult =
  | { status: 'valid'; link: ShortShareLink }
  | { status: 'expired'; link: ShortShareLink }
  | { status: 'invalid'; errors: Array<'id' | 'e'> }

type CachedSharedPin = {
  pin: SharedPin
  expiresAt: number
}

export class SharedPinResolverError extends Error {
  constructor(
    public readonly code: 'configuration' | 'unavailable' | 'network' | 'invalid-response',
    message: string,
  ) {
    super(message)
    this.name = 'SharedPinResolverError'
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function optionalString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function isValidCoordinate(value: unknown, min: number, max: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= min && value <= max
}

function normalizeCachedPin(value: unknown): SharedPin | null {
  if (!isRecord(value)) return null

  const title = typeof value.title === 'string' ? value.title.trim() : ''
  const categoryId = typeof value.categoryId === 'string' ? value.categoryId.trim() : ''
  const latitude = value.latitude
  const longitude = value.longitude

  if (
    !title
    || !isValidCoordinate(latitude, -90, 90)
    || !isValidCoordinate(longitude, -180, 180)
  ) {
    return null
  }

  return {
    title,
    categoryId,
    latitude,
    longitude,
    city: optionalString(value.city),
    address: optionalString(value.address),
    price: optionalString(value.price),
  }
}

function cacheKey(link: ShortShareLink) {
  return `poisave:shared-pin:${link.id}:${link.expiresAt}`
}

function toSharedPin(payload: unknown): { pin: SharedPin; expiresAt: number } | null {
  if (!isRecord(payload) || payload.ok !== true || !isRecord(payload.pin)) return null

  const { pin } = payload
  if (!isRecord(pin.coord)) return null

  const title = typeof pin.title === 'string' ? pin.title.trim() : ''
  const categoryId = typeof pin.categoryId === 'string' ? pin.categoryId.trim() : ''
  const latitude = pin.coord.latitude
  const longitude = pin.coord.longitude
  const expiresAt = typeof payload.expiresAt === 'string' ? Date.parse(payload.expiresAt) : Number.NaN

  if (
    !title
    || !isValidCoordinate(latitude, -90, 90)
    || !isValidCoordinate(longitude, -180, 180)
    || !Number.isFinite(expiresAt)
  ) {
    return null
  }

  return {
    pin: {
      title,
      categoryId,
      latitude,
      longitude,
      city: optionalString(pin.city),
      address: optionalString(pin.address),
      price: optionalString(pin.price),
    },
    expiresAt,
  }
}

export function parseShortShareQuery(
  search: string | URLSearchParams,
  now = Date.now(),
): ShortShareParseResult {
  const params = typeof search === 'string'
    ? new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    : search
  const id = params.get('id')?.trim() ?? ''
  const rawExpiry = params.get('e')?.trim() ?? ''
  const expirySeconds = /^\d+$/.test(rawExpiry) ? Number(rawExpiry) : Number.NaN
  const errors: Array<'id' | 'e'> = []

  if (!SHARED_PIN_ID_PATTERN.test(id)) errors.push('id')
  if (!Number.isSafeInteger(expirySeconds) || expirySeconds <= 0) errors.push('e')

  if (errors.length > 0) return { status: 'invalid', errors }
  const expiresAt = expirySeconds * 1000
  if (!Number.isSafeInteger(expiresAt)) return { status: 'invalid', errors: ['e'] }

  const link = { id, expiresAt }
  return now >= link.expiresAt ? { status: 'expired', link } : { status: 'valid', link }
}

export function readSharedPinCache(
  storage: Storage,
  link: ShortShareLink,
  now = Date.now(),
): SharedPin | null {
  try {
    const rawValue = storage.getItem(cacheKey(link))
    if (!rawValue) return null

    const cached = JSON.parse(rawValue) as unknown
    if (!isRecord(cached) || typeof cached.expiresAt !== 'number' || !Number.isFinite(cached.expiresAt) || cached.expiresAt <= now) {
      storage.removeItem(cacheKey(link))
      return null
    }

    const pin = normalizeCachedPin(cached.pin)
    if (!pin) {
      storage.removeItem(cacheKey(link))
      return null
    }

    return pin
  } catch {
    return null
  }
}

export function writeSharedPinCache(
  storage: Storage,
  link: ShortShareLink,
  pin: SharedPin,
  resolverExpiresAt: number,
) {
  const cached: CachedSharedPin = {
    pin,
    expiresAt: Math.min(link.expiresAt, resolverExpiresAt),
  }

  try {
    storage.setItem(cacheKey(link), JSON.stringify(cached))
  } catch {
    // Storage can be unavailable in private browsing or under a strict quota.
  }
}

export async function resolveSharedPin(
  id: string,
  resolverUrl: string,
  fetchImpl: typeof fetch = fetch,
): Promise<{ pin: SharedPin; expiresAt: number }> {
  if (!resolverUrl.trim()) {
    throw new SharedPinResolverError('configuration', 'Shared pin resolver is not configured')
  }

  const baseUrl = typeof window === 'undefined' ? 'http://localhost' : window.location.origin
  const url = new URL(resolverUrl, baseUrl)
  url.searchParams.set('id', id)

  let response: Response
  try {
    response = await fetchImpl(url.toString(), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new SharedPinResolverError('network', 'Unable to reach the shared pin resolver')
  }

  if (response.status === 410) {
    throw new SharedPinResolverError('unavailable', 'Shared pin is unavailable')
  }
  if (!response.ok) {
    throw new SharedPinResolverError('network', `Shared pin resolver returned ${response.status}`)
  }

  let payload: unknown
  try {
    payload = await response.json()
  } catch {
    throw new SharedPinResolverError('invalid-response', 'Shared pin resolver returned invalid JSON')
  }

  const normalized = toSharedPin(payload)
  if (!normalized) {
    throw new SharedPinResolverError('invalid-response', 'Shared pin resolver returned an invalid payload')
  }

  return normalized
}

export async function loadShortSharedPin(options: {
  link: ShortShareLink
  resolverUrl: string
  storage: Storage
  fetchImpl?: typeof fetch
  now?: number
}) {
  const now = options.now ?? Date.now()
  if (now >= options.link.expiresAt) {
    throw new SharedPinResolverError('unavailable', 'Shared pin is unavailable')
  }

  const cached = readSharedPinCache(options.storage, options.link, now)
  if (cached) return { pin: cached, source: 'cache' as const }

  const resolved = await resolveSharedPin(options.link.id, options.resolverUrl, options.fetchImpl)
  if (resolved.expiresAt <= now) {
    throw new SharedPinResolverError('unavailable', 'Shared pin is unavailable')
  }

  writeSharedPinCache(options.storage, options.link, resolved.pin, resolved.expiresAt)
  return { pin: resolved.pin, source: 'network' as const }
}
