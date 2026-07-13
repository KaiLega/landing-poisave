import { describe, expect, it } from 'vitest'
import { createPinDeepLink, parseSharedPin } from './sharePin'

describe('parseSharedPin', () => {
  it('parses all supported fields', () => {
    const result = parseSharedPin('?title=Beach%20Club&categoryId=resort&lat=4.22&lng=118.68&city=Malaysia&address=Semporna&price=%E2%82%AC20')

    expect(result).toEqual({
      valid: true,
      pin: {
        title: 'Beach Club',
        categoryId: 'resort',
        latitude: 4.22,
        longitude: 118.68,
        city: 'Malaysia',
        address: 'Semporna',
        price: '€20',
      },
    })
  })

  it.each([
    ['?title=&lat=4&lng=10', 'title'],
    ['?title=Place&lat=text&lng=10', 'lat'],
    ['?title=Place&lat=91&lng=10', 'lat'],
    ['?title=Place&lat=4&lng=-181', 'lng'],
  ])('rejects invalid query %s', (search, field) => {
    const result = parseSharedPin(search)

    expect(result.valid).toBe(false)
    if (!('errors' in result)) throw new Error('Expected an invalid shared pin')
    expect(result.errors).toContain(field)
  })
})

describe('createPinDeepLink', () => {
  it('preserves supported optional parameters and encodes values', () => {
    const result = parseSharedPin('?title=Caf%C3%A8%20Roma&categoryId=coffee_shop&lat=41.9&lng=12.5&city=Roma&address=Via%20Roma%201&price=%E2%82%AC10')

    if (!result.valid) throw new Error('Expected a valid shared pin')

    const deepLink = createPinDeepLink(result.pin)
    const params = new URLSearchParams(deepLink.split('?')[1])

    expect(deepLink.startsWith('poisave://pin?')).toBe(true)
    expect(Object.fromEntries(params)).toEqual({
      title: 'Cafè Roma',
      categoryId: 'coffee_shop',
      lat: '41.9',
      lng: '12.5',
      city: 'Roma',
      address: 'Via Roma 1',
      price: '€10',
    })
  })
})
