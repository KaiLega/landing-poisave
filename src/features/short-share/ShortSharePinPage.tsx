import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Download, LoaderCircle, MapPin, Navigation } from 'lucide-react'
import { createMapUrl, createPinDeepLink, formatCategory, type SharedPin } from '../../sharePin'
import {
  loadShortSharedPin,
  parseShortShareQuery,
  SharedPinResolverError,
  type ShortShareLink,
} from './shortSharePin'

const APP_STORE_URL = 'https://apps.apple.com/it/app/poisave/id6758574842'
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.yugaweb.poisave'

type ShortSharePinPageProps = {
  search?: string
  resolverUrl?: string
  now?: () => number
  fetchImpl?: typeof fetch
  storage?: Storage
}

type ViewState =
  | { status: 'ready' }
  | { status: 'loading' }
  | { status: 'resolved'; pin: SharedPin }
  | { status: 'error'; unavailable: boolean }

export default function ShortSharePinPage({
  search = window.location.search,
  resolverUrl = import.meta.env.VITE_SHARED_PIN_RESOLVER_URL ?? '',
  now = Date.now,
  fetchImpl = fetch,
  storage = window.localStorage,
}: ShortSharePinPageProps) {
  const parsed = parseShortShareQuery(search, now())

  if (parsed.status === 'invalid') return <InvalidLink />
  if (parsed.status === 'expired') return <ExpiredLink />

  return (
    <ValidLink
      link={parsed.link}
      resolverUrl={resolverUrl}
      now={now}
      fetchImpl={fetchImpl}
      storage={storage}
    />
  )
}

function ValidLink({
  link,
  resolverUrl,
  now,
  fetchImpl,
  storage,
}: {
  link: ShortShareLink
  resolverUrl: string
  now: () => number
  fetchImpl: typeof fetch
  storage: Storage
}) {
  const [view, setView] = useState<ViewState>({ status: 'ready' })

  const handleResolve = async () => {
    setView({ status: 'loading' })

    try {
      const result = await loadShortSharedPin({
        link,
        resolverUrl,
        storage,
        fetchImpl,
        now: now(),
      })
      setView({ status: 'resolved', pin: result.pin })
    } catch (error) {
      setView({
        status: 'error',
        unavailable: error instanceof SharedPinResolverError && error.code === 'unavailable',
      })
    }
  }

  if (view.status === 'resolved') return <ResolvedPin pin={view.pin} />

  return (
    <PageFrame labelledBy="short-share-title">
      <div className="share-pin-card__icon" aria-hidden="true">
        <MapPin />
      </div>
      <span className="share-pin-kicker">Condiviso con PoiSave</span>
      <h1 id="short-share-title">Un POI è stato condiviso con te</h1>

      {view.status === 'error' ? (
        <div className="share-pin-status" role="alert">
          <p>
            {view.unavailable
              ? 'Questo link è scaduto o non è più disponibile.'
              : 'Non è stato possibile recuperare il luogo. Controlla la connessione e riprova.'}
          </p>
          {!view.unavailable && (
            <button type="button" className="btn btn-primary" onClick={handleResolve}>
              Riprova
            </button>
          )}
          {view.unavailable && <HomeLink />}
        </div>
      ) : (
        <>
          <p className="share-pin-message">Aprilo con PoiSave e salvalo sulla tua mappa.</p>
          <button
            type="button"
            className="btn btn-primary share-pin-view-button"
            onClick={handleResolve}
            disabled={view.status === 'loading'}
          >
            {view.status === 'loading' ? (
              <>
                <LoaderCircle className="share-pin-spinner" aria-hidden="true" />
                Caricamento…
              </>
            ) : 'Apri in PoiSave'}
          </button>
          <p className="share-pin-privacy-note">
            Il contenuto condiviso è una copia immutabile. Il link resta attivo per 30 giorni e i dettagli vengono richiesti solo dopo la tua conferma.
          </p>
        </>
      )}
    </PageFrame>
  )
}

function ResolvedPin({ pin }: { pin: SharedPin }) {
  return (
    <PageFrame labelledBy="resolved-pin-title">
      <div className="share-pin-card__icon" aria-hidden="true">
        <MapPin />
      </div>
      <span className="share-pin-kicker">Condiviso con PoiSave</span>
      <h1 id="resolved-pin-title">{pin.title}</h1>
      <p className="share-pin-category">{formatCategory(pin.categoryId)}</p>

      {pin.city && <p className="share-pin-city">{pin.city}</p>}
      {pin.address && (
        <p className="share-pin-location">
          <Navigation aria-hidden="true" />
          <span>{pin.address}</span>
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

      <StoreLinks />
    </PageFrame>
  )
}

function InvalidLink() {
  return (
    <PageFrame labelledBy="invalid-link-title" invalid>
      <span className="share-pin-kicker">Link non valido</span>
      <h1 id="invalid-link-title">Non riusciamo ad aprire questo link</h1>
      <p>Il collegamento è incompleto o non valido. Chiedi a chi lo ha condiviso di inviarlo nuovamente.</p>
      <HomeLink />
    </PageFrame>
  )
}

function ExpiredLink() {
  return (
    <PageFrame labelledBy="expired-link-title" invalid>
      <span className="share-pin-kicker">Link scaduto</span>
      <h1 id="expired-link-title">Questo link non è più disponibile</h1>
      <p>I link ai luoghi condivisi restano attivi per 30 giorni. Chiedi a chi lo ha condiviso di crearne uno nuovo.</p>
      <HomeLink />
    </PageFrame>
  )
}

function HomeLink() {
  return <a className="btn btn-primary" href="/">Vai a PoiSave</a>
}

function StoreLinks() {
  return (
    <div className="share-pin-download share-pin-download--stores">
      <Download aria-hidden="true" />
      <div>
        <strong>Non hai ancora PoiSave?</strong>
        <div className="share-pin-store-links">
          <a href={APP_STORE_URL} target="_blank" rel="noreferrer">App Store</a>
          <a href={GOOGLE_PLAY_URL} target="_blank" rel="noreferrer">Google Play</a>
        </div>
      </div>
    </div>
  )
}

function PageFrame({
  labelledBy,
  invalid = false,
  children,
}: {
  labelledBy: string
  invalid?: boolean
  children: ReactNode
}) {
  return (
    <main className="share-pin-page">
      <header className="share-pin-header">
        <a href="/" aria-label="Vai alla home di PoiSave">
          <img src="/img/logo.png" alt="PoiSave" />
        </a>
      </header>
      <section className="share-pin-shell" aria-labelledby={labelledBy}>
        <article className={`share-pin-card${invalid ? ' share-pin-card--invalid' : ''}`}>
          {children}
        </article>
      </section>
    </main>
  )
}
