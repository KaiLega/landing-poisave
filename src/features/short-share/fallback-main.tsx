import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './NotFoundPage'
import ShortSharePinPage from './ShortSharePinPage'
import '../../styles.css'

const isSharedPinPath = window.location.pathname.startsWith('/p/')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isSharedPinPath ? <ShortSharePinPage /> : <NotFoundPage />}
  </React.StrictMode>,
)
