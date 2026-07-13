export type SharedPin = {
  title: string
  categoryId: string
  latitude: number
  longitude: number
  city?: string
  address?: string
  price?: string
}

export type SharedPinParseResult =
  | { valid: true; pin: SharedPin }
  | { valid: false; errors: string[] }

function optionalValue(params: URLSearchParams, key: string) {
  const value = params.get(key)?.trim()
  return value || undefined
}

function parseCoordinate(value: string | null) {
  if (!value?.trim()) return undefined

  const coordinate = Number(value)
  return Number.isFinite(coordinate) ? coordinate : undefined
}

export function parseSharedPin(search: string | URLSearchParams): SharedPinParseResult {
  const params = typeof search === 'string'
    ? new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
    : search
  const title = params.get('title')?.trim() ?? ''
  const latitude = parseCoordinate(params.get('lat'))
  const longitude = parseCoordinate(params.get('lng'))
  const errors: string[] = []

  if (!title) errors.push('title')
  if (latitude === undefined || latitude < -90 || latitude > 90) errors.push('lat')
  if (longitude === undefined || longitude < -180 || longitude > 180) errors.push('lng')

  if (errors.length > 0 || latitude === undefined || longitude === undefined) {
    return { valid: false, errors }
  }

  return {
    valid: true,
    pin: {
      title,
      categoryId: params.get('categoryId')?.trim() ?? '',
      latitude,
      longitude,
      city: optionalValue(params, 'city'),
      address: optionalValue(params, 'address'),
      price: optionalValue(params, 'price'),
    },
  }
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
  if (pin.price) params.set('price', pin.price)

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
