import { FormEvent, useState } from 'react'
import { Mail } from 'lucide-react'
import { CONTACT_EMAIL_DOMAIN, CONTACT_EMAIL_USER, CONTACT_FORM_ENDPOINT } from '../config'
import { useI18n } from '../i18n/I18nProvider'
import { getRecaptchaToken } from '../recaptcha'

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactSection() {
  const { copy } = useI18n()
  const contact = copy.home.contact
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const contactEmail = `${CONTACT_EMAIL_USER}@${CONTACT_EMAIL_DOMAIN}`

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (String(formData.get('company') ?? '')) {
      return
    }

    const payload = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      recaptchaToken: '',
    }

    if (!CONTACT_FORM_ENDPOINT) {
      const subject = encodeURIComponent('PoiSave contact request')
      const body = encodeURIComponent(`${payload.message}\n\n${payload.name}\n${payload.email}`)
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')

    try {
      payload.recaptchaToken = await getRecaptchaToken('contact_form')

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Contact request failed')
      }

      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact-section section">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="contact-panel">
          <div className="contact-copy">
            <span className="section-kicker">{contact.kicker}</span>
            <h2 className="heading">{contact.title}</h2>
            <p className="section-lead">{contact.lead}</p>
            <button
              type="button"
              className="contact-mail"
              aria-label={`Email ${contactEmail}`}
              onClick={() => {
                window.location.href = `mailto:${contactEmail}`
              }}
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              <span className="contact-mail__address">
                <span>{CONTACT_EMAIL_USER}</span>
                <span aria-hidden="true">@</span>
                <span>{CONTACT_EMAIL_DOMAIN}</span>
              </span>
            </button>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="contact-form__trap" aria-hidden="true">
              <span>Company</span>
              <input name="company" type="text" tabIndex={-1} autoComplete="off" />
            </label>

            <label>
              <span>{contact.nameLabel}</span>
              <input name="name" type="text" placeholder={contact.namePlaceholder} autoComplete="name" required />
            </label>

            <label>
              <span>{contact.emailLabel}</span>
              <input name="email" type="email" placeholder={contact.emailPlaceholder} autoComplete="email" required />
            </label>

            <label>
              <span>{contact.messageLabel}</span>
              <textarea name="message" rows={5} placeholder={contact.messagePlaceholder} required />
            </label>

            <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? contact.sending : contact.submit}
            </button>

            {!CONTACT_FORM_ENDPOINT && <p className="contact-form__note">{contact.fallback}</p>}
            {status === 'success' && <p className="contact-form__status">{contact.success}</p>}
            {status === 'error' && <p className="contact-form__status contact-form__status--error">{contact.error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
