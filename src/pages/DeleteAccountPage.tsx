import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'

export default function DeleteAccountPage() {
  return (
    <section className="section bg-slate-50 min-h-[70vh]">
      <div className="mx-auto max-w-4xl px-4">
        <div className="text-center">
          <h1 className="heading">Delete Account</h1>
          <p className="mt-3 subtle">How to permanently delete your PoiSave account and associated data.</p>
        </div>

        <div className="mt-10 space-y-5 text-slate-700 text-sm leading-relaxed">
          <p>
            If you want to delete your PoiSave account and all related personal data, you can do it directly from inside the app.
          </p>

          <p><strong>Steps to delete your account:</strong></p>

          <ol className="list-decimal space-y-2 pl-5">
            <li>Open the app and sign in to your account.</li>
            <li>Go to the account section.</li>
            <li>Tap <strong>Delete account</strong> and confirm the request.</li>
          </ol>

          <p>
            Alternatively, you can request account deletion by contacting us at <a className="text-brand-700 underline underline-offset-4" href="mailto:support@yugaweb.com">support@yugaweb.com</a>.
          </p>

          <p><strong>When you request account deletion:</strong></p>

          <ul className="list-disc space-y-2 pl-5">
            <li>Your account will be permanently deleted.</li>
            <li>Your saved places and personal data will be removed.</li>
            <li>Some data may be retained temporarily where required for legal, fraud-prevention, or security reasons.</li>
          </ul>

          <p>Deletion requests are processed within 7 days.</p>
        </div>

        <div className="mt-10 text-center">
          <Link to={ROUTES.home} className="btn btn-glass-brand">Back to home</Link>
        </div>
      </div>
    </section>
  )
}
