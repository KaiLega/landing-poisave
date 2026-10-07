import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { I18nProvider } from './i18n/I18nProvider'
import './styles.css'

const root = document.getElementById('root')!

// Replace the static SEO snapshot with the interactive HashRouter application.
if (root.dataset.prerendered === 'true') {
  root.replaceChildren()
  delete root.dataset.prerendered
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <I18nProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </I18nProvider>
  </React.StrictMode>
)
