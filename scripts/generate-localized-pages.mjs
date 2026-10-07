import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const template = await readFile(resolve(root, 'index.html'), 'utf8')
const seo = JSON.parse(await readFile(resolve(root, 'src/i18n/seo.json'), 'utf8'))
const locales = {
  fr: 'fr_FR',
  it: 'it_IT',
  de: 'de_DE',
  es: 'es_ES',
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceMeta(html, selector, value) {
  const pattern = new RegExp(`(<meta ${selector} content=")[^"]*("\\s*/>)`)
  return html.replace(pattern, `$1${escapeHtml(value)}$2`)
}

for (const [language, ogLocale] of Object.entries(locales)) {
  const metadata = seo[language]
  const localizedUrl = `https://poisave.com/${language}/`
  let html = template
    .replace('<html lang="en">', `<html lang="${language}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${localizedUrl}" />`,
    )

  html = replaceMeta(html, 'name="description"', metadata.description)
  html = replaceMeta(html, 'property="og:title"', metadata.title)
  html = replaceMeta(html, 'property="og:description"', metadata.description)
  html = replaceMeta(html, 'property="og:url"', localizedUrl)
  html = replaceMeta(html, 'property="og:locale"', ogLocale)
  html = replaceMeta(html, 'name="twitter:title"', metadata.title)
  html = replaceMeta(html, 'name="twitter:description"', metadata.description)
  html = html
    .replace(
      /("description":\s*)"[^"]*"/,
      `$1${JSON.stringify(metadata.description)}`,
    )
    .replace(/("url":\s*)"https:\/\/poisave\.com\/"/, `$1"${localizedUrl}"`)

  const directory = resolve(root, language)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}
