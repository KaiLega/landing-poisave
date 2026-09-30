import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

function sharedPinRewrite(): Plugin {
  const rewriteSharedPin = (
    request: { url?: string },
    _response: unknown,
    next: () => void,
  ) => {
    if (request.url) {
      const url = new URL(request.url, 'http://localhost')
      if (/^\/p\/[^/]+\/?$/.test(url.pathname)) {
        request.url = `/p/index.html${url.search}`
      }
    }
    next()
  }

  return {
    name: 'shared-pin-rewrite',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(rewriteSharedPin)
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewriteSharedPin)
    },
  }
}

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
    plugins: [sharedPinRewrite(), react(), associationFileHeaders()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          shortSharePin: resolve(__dirname, 'p/index.html'),
          notFound: resolve(__dirname, '404.html'),
        },
      },
    },
  }
})
