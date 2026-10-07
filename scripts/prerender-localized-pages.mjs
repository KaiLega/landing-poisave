import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createServer } from 'vite'

const root = resolve(import.meta.dirname, '..')
const pages = [
  { language: 'en', file: 'index.html' },
  { language: 'fr', file: 'fr/index.html' },
  { language: 'it', file: 'it/index.html' },
  { language: 'de', file: 'de/index.html' },
  { language: 'es', file: 'es/index.html' },
]

const server = await createServer({
  root,
  appType: 'custom',
  server: { middlewareMode: true },
})

try {
  const { renderHome } = await server.ssrLoadModule('/src/prerender.tsx')

  for (const page of pages) {
    const file = resolve(root, 'dist', page.file)
    const html = await readFile(file, 'utf8')
    const markup = renderHome(page.language)
    const output = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered="true">${markup}</div>`,
    )

    if (output === html) {
      throw new Error(`Unable to inject pre-rendered markup into ${page.file}`)
    }

    await writeFile(file, output)
  }
} finally {
  await server.close()
}
