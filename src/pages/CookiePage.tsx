import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'

export default function CookiePage() {
  return (
    <section className="bg-slate-50 min-h-[70vh] section">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h1 className="heading">Cookie Policy</h1>
          <p className="mt-3 subtle">Last updated: 24 April 2026</p>
        </div>

        <div className="space-y-5 mt-10 text-slate-700 text-sm leading-relaxed">
          <p>
            This Cookie Policy explains how <strong>Yuga Web</strong> uses cookies
            and similar technologies on the PoiSave website.
          </p>

          <p><strong>1. What are cookies?</strong></p>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help the website work correctly, remember preferences,
            and understand how visitors use the site.
          </p>

          <p><strong>2. Cookies we use</strong></p>

          <p><strong>Essential cookies</strong></p>
          <p>
            These cookies are necessary for the website to function properly and
            to remember your cookie preferences. They cannot be disabled through
            our cookie banner.
          </p>

          <p><strong>Analytics cookies</strong></p>
          <p>
            We may use Google Analytics 4 to understand how visitors use the
            website and improve performance. Analytics cookies are used only
            after your consent.
          </p>

          <p><strong>Advertising cookies</strong></p>
          <p>
            We do not use advertising or profiling cookies on this website.
          </p>

          <p><strong>3. Managing your preferences</strong></p>
          <p>
            You can update your cookie preferences at any time using the cookie
            badge in the bottom-left corner of the website.
          </p>

          <p><strong>4. Third-party services</strong></p>
          <p>
            If enabled with your consent, Google Analytics may process usage data
            according to Google’s own privacy and cookie policies.
          </p>

          <p><strong>5. Contact</strong></p>
          <p>
            If you have questions about this Cookie Policy, contact us at:{' '}
            <a className="text-brand-700 underline underline-offset-4" href="mailto:info@yugaweb.com">
              info@yugaweb.com
            </a>
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link to={ROUTES.home} className="btn btn-glass-brand">Back to home</Link>
        </div>
      </div>
    </section>
  )
}