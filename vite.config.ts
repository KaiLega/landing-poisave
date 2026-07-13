import { defineConfig, type Plugin } from 'vite'
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

export default defineConfig({
  plugins: [react(), associationFileHeaders()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sharePin: resolve(__dirname, 'share-pin/index.html'),
      },
    },
  },
})
