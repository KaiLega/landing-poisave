const SHARED_PIN_TOKEN_PATTERN = /^[A-Za-z0-9_-]{12}$/

export type SharedPin = {
  title: string
  categoryId: string
  latitude: number
  longitude: number
  city?: string
  address?: string
  price?: string
}

export type ShortShareLink = {
  id: string
}

export type ShortShareParseResult =
  | { status: 'valid'; link: ShortShareLink }
  | { status: 'invalid'; errors: ['id'] }

type CachedSharedPin = {
  pin: SharedPin
  expiresAt: number
}

export class SharedPinResolverError extends Error {
  constructor(
    public readonly code: 'configuration' | 'invalid-token' | 'unavailable' | 'network' | 'invalid-response',
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

function normalizePin(value: unknown): SharedPin | null {
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

function normalizeResolverPayload(payload: unknown): { pin: SharedPin; expiresAt: number } | null {
  if (!isRecord(payload) || payload.ok !== true || !isRecord(payload.pin) || !isRecord(payload.pin.coord)) {
    return null
  }

  const pin = normalizePin({
    title: payload.pin.title,
    categoryId: payload.pin.categoryId,
    latitude: payload.pin.coord.latitude,
    longitude: payload.pin.coord.longitude,
    city: payload.pin.city,
    address: payload.pin.address,
    price: payload.pin.price,
  })
  const expiresAt = typeof payload.expiresAt === 'string' ? Date.parse(payload.expiresAt) : Number.NaN

  return pin && Number.isFinite(expiresAt) ? { pin, expiresAt } : null
}

function cacheKey(id: string) {
  return `poisave:shared-pin:${id}`
}

export function parseShortSharePath(pathname: string): ShortShareParseResult {
  const match = /^\/p\/([^/]+)\/?$/.exec(pathname)
  const id = match?.[1] ?? ''

  return SHARED_PIN_TOKEN_PATTERN.test(id)
    ? { status: 'valid', link: { id } }
    : { status: 'invalid', errors: ['id'] }
}

export function readSharedPinCache(storage: Storage, id: string, now = Date.now()): SharedPin | null {
  try {
    const rawValue = storage.getItem(cacheKey(id))
    if (!rawValue) return null

    const cached = JSON.parse(rawValue) as unknown
    if (
      !isRecord(cached)
      || typeof cached.expiresAt !== 'number'
      || !Number.isFinite(cached.expiresAt)
      || cached.expiresAt <= now
    ) {
      storage.removeItem(cacheKey(id))
      return null
    }

    const pin = normalizePin(cached.pin)
    if (!pin) {
      storage.removeItem(cacheKey(id))
      return null
    }

    return pin
  } catch {
    return null
  }
}

export function writeSharedPinCache(storage: Storage, id: string, pin: SharedPin, expiresAt: number) {
  const cached: CachedSharedPin = { pin, expiresAt }

  try {
    storage.setItem(cacheKey(id), JSON.stringify(cached))
  } catch {
    // Storage can be unavailable in private browsing or under a strict quota.
  }
}

export async function resolveSharedPin(
  id: string,
  resolverUrl: string,
  fetchImpl: typeof fetch = fetch,
): Promise<{ pin: SharedPin; expiresAt: number }> {
  if (!SHARED_PIN_TOKEN_PATTERN.test(id)) {
    throw new SharedPinResolverError('invalid-token', 'Shared pin token is invalid')
  }
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

  const normalized = normalizeResolverPayload(payload)
  if (!normalized) {
    throw new SharedPinResolverError('invalid-response', 'Shared pin resolver returned an invalid payload')
  }

  return normalized
}

export async function loadShortSharedPin(options: {
  id: string
  resolverUrl: string
  storage: Storage
  fetchImpl?: typeof fetch
  now?: number
}) {
  const now = options.now ?? Date.now()
  const cached = readSharedPinCache(options.storage, options.id, now)
  if (cached) return { pin: cached, source: 'cache' as const }

  const resolved = await resolveSharedPin(options.id, options.resolverUrl, options.fetchImpl)
  if (resolved.expiresAt <= now) {
    throw new SharedPinResolverError('unavailable', 'Shared pin is unavailable')
  }

  writeSharedPinCache(options.storage, options.id, resolved.pin, resolved.expiresAt)
  return { pin: resolved.pin, source: 'network' as const }
}

export function createPinDeepLink(pin: SharedPin) {
  const params = new URLSearchParams({
    title: pin.title,
    categoryId: pin.categoryId,
    lat: String(pin.latitude),
    lng: String(pin.longitude),
  })

  if (pin.city) params.set('city', pin.city)
  if (pin.address) params.set('address', pin.address)

  return `poisave://pin?${params.toString()}`
}

export function createMapUrl(pin: SharedPin) {
  const query = encodeURIComponent(`${pin.latitude},${pin.longitude}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function formatCategory(categoryId: string) {
  if (!categoryId) return 'Luogo salvato'

  return categoryId
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
