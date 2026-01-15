import React from 'react'

export default function PrivacyPolicy(){
  return (
    <section className="section bg-slate-50 min-h-[70vh]">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h1 className="heading">Privacy Policy</h1>
          <p className="mt-3 subtle">Last updated: 20 December 2024</p>
        </div>
        <div className="mt-10 space-y-5 text-slate-700 text-sm leading-relaxed">
          <p><strong>Titolare del trattamento:</strong> Yuga Web, Roma. Contatto: info@yugaweb.com.</p>
          <p>Questo sito è informativo e non prevede registrazione o moduli di raccolta dati.</p>
          <p>Se ci contatti via email, utilizziamo i tuoi dati solo per rispondere alla richiesta. Non vendiamo i tuoi dati.</p>
          <p><strong>Dati tecnici:</strong> il provider di hosting può trattare IP, dispositivo e browser per motivi di sicurezza e performance.</p>
          <p><strong>Analytics:</strong> utilizziamo Google Analytics 4 per misurare il traffico e migliorare il sito, solo previo consenso. I dati possono essere trattati fuori dallo SEE (es. Stati Uniti) con adeguate garanzie.</p>
          <p><strong>Base giuridica:</strong> legittimo interesse per sicurezza/operatività essenziale; consenso per i cookie di misurazione.</p>
          <p><strong>Conservazione:</strong> i dati analytics vengono conservati per un periodo limitato come configurato in GA4.</p>
          <p><strong>Diritti dell’interessato:</strong> puoi richiedere accesso, rettifica, cancellazione, limitazione o opposizione scrivendo a info@yugaweb.com.</p>
        </div>
        <div className="mt-10 text-center">
          <a href="/#/" className="btn btn-outline">Back to home</a>
        </div>
      </div>
    </section>
  )
}
