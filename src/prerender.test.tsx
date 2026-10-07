import { describe, expect, it } from 'vitest'
import { messages } from './i18n'
import { renderHome } from './prerender'

describe('localized pre-render', () => {
  it.each(['en', 'fr', 'it', 'de', 'es'] as const)('renders the %s homepage content', (language) => {
    const html = renderHome(language)

    expect(html).toContain(messages[language].home.hero.title)
    expect(html).toContain('<h1 class="hero-title">')
  })

  it('includes crawlable links to every language', () => {
    const html = renderHome('en')

    expect(html).toContain('href="/fr/"')
    expect(html).toContain('href="/it/"')
    expect(html).toContain('href="/de/"')
    expect(html).toContain('href="/es/"')
  })

  it('keeps navigation and legal links on the localized GitHub Pages entry point', () => {
    const html = renderHome('it')

    expect(html).toContain('href="/it/"')
    expect(html).toContain('href="/it/#/privacy-policy"')
    expect(html).toContain('href="/it/#/terms-of-use"')
    expect(html).not.toContain('href="/?section=')
    expect(html).not.toContain('href="/privacy-policy"')
  })
})
