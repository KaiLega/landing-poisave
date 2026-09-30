export default function NotFoundPage() {
  return (
    <main className="share-pin-page">
      <header className="share-pin-header">
        <a href="/" aria-label="Vai alla home di PoiSave">
          <img src="/img/logo.png" alt="PoiSave" />
        </a>
      </header>
      <section className="share-pin-shell" aria-labelledby="not-found-title">
        <article className="share-pin-card share-pin-card--invalid">
          <span className="share-pin-kicker">404</span>
          <h1 id="not-found-title">Pagina non trovata</h1>
          <p>La pagina richiesta non esiste.</p>
          <a className="btn btn-primary" href="/">Vai a PoiSave</a>
        </article>
      </section>
    </main>
  )
}
