import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

function associationFileHeaders(): Plugin {
  const setAssociationHeader = (
    request: { url?: string },
    response: { setHeader: (name: string, value: string) => void },
    next: () => void,
  ) => {
    if (request.url?.split('?')[0] === '/.well-known/apple-app-site-association') {
      response.setHeader('Content-Type', 'application/json')
    }
    next()
  }

  return {
    name: 'association-file-headers',
    configureServer(server) {
      server.middlewares.use(setAssociationHeader)
    },
    configurePreviewServer(server) {
      server.middlewares.use(setAssociationHeader)
    },
  }
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const resolverUrl = env.VITE_SHARED_PIN_RESOLVER_URL?.trim()

  if (command === 'build' && mode === 'production' && !resolverUrl) {
    throw new Error(
      'Missing VITE_SHARED_PIN_RESOLVER_URL: configure the shared-pin resolver before a production build.',
    )
  }

  return {
    plugins: [react(), associationFileHeaders()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          sharePin: resolve(__dirname, 'share-pin/index.html'),
          shortSharePin: resolve(__dirname, 'p/index.html'),
        },
      },
    },
  }
})
