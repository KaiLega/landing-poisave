import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'

export default function TermsPage() {
  return (
    <section className="bg-slate-50 min-h-[70vh] section">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h1 className="heading">Terms of Use</h1>
          <p className="mt-3 subtle">Last updated: 24 April 2026</p>
        </div>

        <div className="space-y-5 mt-10 text-slate-700 text-sm leading-relaxed">
          <p>
            Welcome to <strong>PoiSave</strong> (“App”, “Service”), provided by <strong>Yuga Web</strong> (“we”, “us”, “our”).
            By downloading, accessing, or using PoiSave, you agree to these Terms of Use.
          </p>

          <p><strong>1. Description of the Service</strong></p>
          <p>
            PoiSave helps users save places discovered on social media, organize them on a personal map, and review or edit place information before saving.
            The Service may include both free and paid features.
          </p>

          <p><strong>2. Eligibility</strong></p>
          <p>
            You must be at least 13 years old, or the minimum legal age in your country, to use the Service. If you are under 18, you must have permission from a parent or legal guardian.
          </p>

          <p><strong>3. User Accounts</strong></p>
          <p>
            Some features may require an account. You agree to provide accurate information, keep your credentials secure, and remain responsible for activity performed through your account.
          </p>

          <p><strong>4. User Content</strong></p>
          <p>
            You may submit links, notes, saved places, categories, and related content. You retain ownership of your content, but you grant us a limited license to store and process it so the Service can function.
          </p>

          <p><strong>5. Third-Party Platforms</strong></p>
          <p>
            PoiSave may process links from third-party platforms such as Instagram or TikTok. We are not responsible for the availability, content, or accuracy of third-party services.
          </p>

          <p><strong>6. Free and Premium Features</strong></p>
          <p>
            PoiSave offers a free experience with usage limits and may offer premium features such as sync, customization, statistics, or expanded storage. Features may change over time.
          </p>

          <p><strong>7. Subscriptions and Payments</strong></p>
          <p>
            Premium subscriptions, if available, are billed through the Apple App Store or Google Play. Renewals, billing, and cancellations are handled through the relevant app store account.
          </p>
          <p>
            Subscriptions are subject to the terms and conditions of the Apple App Store or Google Play, depending on where the purchase is made.
          </p>
          <p>
            Prices, billing periods, and available plans may vary by country, platform, and store.
          </p>

          <p><strong>8. Privacy</strong></p>
          <p>
            Your use of the Service is also governed by our Privacy Policy. While we apply reasonable safeguards, no system can be guaranteed completely secure.
          </p>

          <p><strong>9. Service Availability</strong></p>
          <p>
            We may modify, suspend, or discontinue parts of the Service at any time, including for maintenance, improvements, or legal reasons. We are not liable for interruptions or data loss.
          </p>

          <p><strong>10. Prohibited Use</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Reverse engineer or misuse the app.</li>
            <li>Use the Service for unlawful purposes.</li>
            <li>Attempt to access data belonging to other users.</li>
            <li>Upload illegal, harmful, or rights-infringing content.</li>
          </ul>

          <p><strong>11. Termination</strong></p>
          <p>
            We may suspend or terminate access if these Terms are violated or if required by law. You may stop using the Service at any time.
          </p>

          <p><strong>12. Disclaimer and Limitation of Liability</strong></p>
          <p>
            The Service is provided “as is” and “as available”. To the maximum extent permitted by law, we are not liable for indirect damages, loss of data, or issues caused by third-party services.
          </p>

          <p><strong>13. Changes to These Terms</strong></p>
          <p>
            We may update these Terms from time to time. When relevant, we will update the date above or provide notice through the app or website.
          </p>

          <p><strong>14. Governing Law</strong></p>
          <p>These Terms are governed by the laws of Italy.</p>

          <p><strong>15. Account Deletion</strong></p>
          <p>
            You can request account deletion through the app or via the dedicated page at <Link className="text-brand-700 underline underline-offset-4" to={ROUTES.deleteAccount}>{ROUTES.deleteAccount}</Link>.
          </p>

          <p><strong>16. Contact</strong></p>
          <p>
            For questions about these Terms, contact us at <a className="text-brand-700 underline underline-offset-4" href="mailto:info@yugaweb.com">info@yugaweb.com</a>.
          </p>
          
        </div>

        <div className="mt-10 text-center">
          <Link to={ROUTES.home} className="btn btn-glass-brand">Back to home</Link>
        </div>
      </div>
    </section>
  )
}
