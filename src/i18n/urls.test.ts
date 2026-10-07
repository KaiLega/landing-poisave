import { describe, expect, it } from 'vitest'
import { getLanguageFromPathname, getLocalizedHashRoute, getLocalizedPath, getLocalizedUrl } from './urls'

describe('localized URLs', () => {
  it('keeps English on the root URL', () => {
    expect(getLocalizedPath('en')).toBe('/')
    expect(getLocalizedUrl('en')).toBe('https://poisave.com/')
  })

  it.each(['fr', 'it', 'de', 'es'] as const)('uses a static directory for %s', (language) => {
    expect(getLocalizedPath(language)).toBe(`/${language}/`)
    expect(getLocalizedUrl(language)).toBe(`https://poisave.com/${language}/`)
  })

  it('reads the language from a localized pathname', () => {
    expect(getLanguageFromPathname('/it/')).toBe('it')
    expect(getLanguageFromPathname('/de/')).toBe('de')
  })

  it('builds hash routes compatible with GitHub Pages', () => {
    expect(getLocalizedHashRoute('it', '/privacy-policy')).toBe('/it/#/privacy-policy')
    expect(getLocalizedHashRoute('en', '/terms-of-use')).toBe('/#/terms-of-use')
  })

  it('falls back to English for unrelated paths', () => {
    expect(getLanguageFromPathname('/')).toBe('en')
    expect(getLanguageFromPathname('/p/K7mQ2x9Babcd')).toBe('en')
  })
})
