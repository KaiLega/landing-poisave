import { ArrowUpRight, Download, MapPin, Navigation } from 'lucide-react'
import { createMapUrl, createPinDeepLink, formatCategory, parseSharedPin } from '../sharePin'

const APP_STORE_URL = 'https://apps.apple.com/it/app/poisave/id6758574842'

type SharePinPageProps = {
  search?: string
}

export default function SharePinPage({ search = window.location.search }: SharePinPageProps) {
  const result = parseSharedPin(search)

  if (!result.valid) {
    return (
      <main className="share-pin-page">
        <ShareHeader />
        <section className="share-pin-shell" aria-labelledby="invalid-pin-title">
          <div className="share-pin-card share-pin-card--invalid">
            <span className="share-pin-kicker">Link non valido</span>
            <h1 id="invalid-pin-title">Non riusciamo ad aprire questo luogo</h1>
            <p>Il link è incompleto oppure contiene coordinate non valide. Chiedi a chi lo ha condiviso di inviarlo nuovamente.</p>
            <a className="btn btn-primary" href="/">Vai a PoiSave</a>
          </div>
        </section>
      </main>
    )
  }

  const { pin } = result
  const location = pin.address || pin.city

  return (
    <main className="share-pin-page">
      <ShareHeader />
      <section className="share-pin-shell" aria-labelledby="shared-pin-title">
        <article className="share-pin-card">
          <div className="share-pin-card__icon" aria-hidden="true">
            <MapPin />
          </div>
          <span className="share-pin-kicker">Condiviso con PoiSave</span>
          <h1 id="shared-pin-title">{pin.title}</h1>
          <p className="share-pin-category">{formatCategory(pin.categoryId)}</p>

          {location && (
            <p className="share-pin-location">
              <Navigation aria-hidden="true" />
              <span>{location}</span>
            </p>
          )}

          {pin.price && <p className="share-pin-price">{pin.price}</p>}

          <div className="share-pin-actions">
            <a className="btn btn-primary" href={createPinDeepLink(pin)}>
              Apri in PoiSave
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="btn btn-outline" href={createMapUrl(pin)} target="_blank" rel="noreferrer">
              Vedi sulla mappa
              <MapPin aria-hidden="true" />
            </a>
          </div>

          <div className="share-pin-download">
            <Download aria-hidden="true" />
            <div>
              <strong>Non hai ancora PoiSave?</strong>
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer">Scarica l’app dall’App Store</a>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

function ShareHeader() {
  return (
    <header className="share-pin-header">
      <a href="/" aria-label="Vai alla home di PoiSave">
        <img src="/img/logo.png" alt="PoiSave" />
      </a>
    </header>
  )
}
