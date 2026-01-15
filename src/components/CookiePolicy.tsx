import React from 'react'

export default function CookiePolicy(){
  return (
    <section className="section bg-slate-50 min-h-[70vh]">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h1 className="heading">Cookie Policy</h1>
          <p className="mt-3 subtle">Uso dei cookie e tecnologie di tracciamento.</p>
        </div>
        <div className="mt-10 space-y-5 text-slate-700 text-sm leading-relaxed">
          <p>Utilizziamo cookie tecnici necessari al corretto funzionamento del sito e per memorizzare le preferenze di consenso.</p>
          <p>Utilizziamo cookie di misurazione (Google Analytics 4) solo dopo il consenso, per comprendere come viene usato il sito e migliorarne le prestazioni.</p>
          <p>Non utilizziamo cookie di profilazione o pubblicitari.</p>
          <p>Puoi aggiornare le tue preferenze in qualsiasi momento tramite il badge in basso a sinistra.</p>
        </div>
        <div className="mt-10 text-center">
          <a href="/#/" className="btn btn-outline">Back to home</a>
        </div>
      </div>
    </section>
  )
}
