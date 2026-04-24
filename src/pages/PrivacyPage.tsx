import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../routes'

export default function PrivacyPage() {
  return (
    <section className="bg-slate-50 min-h-[70vh] section">
      <div className="mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h1 className="heading">Privacy Policy</h1>
          <p className="mt-3 subtle">Last updated: 24 April 2026</p>
        </div>

        <div className="space-y-5 mt-10 text-slate-700 text-sm leading-relaxed">
          <p>
            This Privacy Policy explains how <strong>PoiSave</strong> (“App”, “Service”), operated by <strong>Yuga Web</strong> (“we”, “us”, “our”), collects, uses, and protects your personal data.
          </p>

          <p><strong>1. Data Controller</strong></p>
          <p>
            Yuga Web, Italy<br />
            Email: <a className="text-brand-700 underline underline-offset-4" href="mailto:info@yugaweb.com">info@yugaweb.com</a>
          </p>

          <p><strong>2. Data We Collect</strong></p>
          <p>We may collect and process the following types of data:</p>

          <p><strong>Account Data</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Email address</li>
            <li>Profile name</li>
            <li>Authentication provider (Email, Apple, Google)</li>
          </ul>

          <p><strong>User Content</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Saved places (POIs): title, category, description, address, coordinates</li>
            <li>Links to social posts</li>
            <li>Optional data such as price or notes</li>
          </ul>

          <p><strong>Preferences</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Language</li>
            <li>Theme</li>
            <li>App settings</li>
            <li>Consent choices</li>
          </ul>

          <p><strong>Technical and Usage Data</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>App interactions</li>
            <li>Diagnostics and crash reports</li>
            <li>Device identifiers (non-directly identifying)</li>
          </ul>

          <p><strong>Location Data</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Approximate location (used to center the map and suggest nearby places)</li>
          </ul>

          <p><strong>Images and Screenshots</strong></p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Only processed if you explicitly choose OCR or attachments</li>
            <li>Text extraction is performed on-device</li>
          </ul>

          <p><strong>3. How We Use Data and Legal Bases</strong></p>
          <p>If you are in the European Economic Area (EEA), we process your data for the following purposes and legal bases:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li><strong>Provide the Service</strong> – to save, manage and sync places. Legal basis: performance of a contract.</li>
            <li><strong>Authentication and security</strong> – to create accounts, sign users in, prevent abuse and keep the Service secure. Legal basis: contract and legitimate interest.</li>
            <li><strong>Analytics and product improvement</strong> – to understand app usage and improve features. Legal basis: legitimate interest.</li>
            <li><strong>Marketing communications</strong> – only if you opt in. Legal basis: consent.</li>
            <li><strong>Advertising</strong> – to display ads to free users. Legal basis: legitimate interest or consent where required.</li>
          </ul>

          <p><strong>4. Data Sharing</strong></p>
          <p>We do not sell your personal data.</p>
          <p>We may share data with trusted third-party providers:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li><strong>Firebase (Google)</strong> – authentication, database, analytics</li>
            <li><strong>Google Places API</strong> – place information</li>
            <li><strong>Apple / Google Sign-In</strong> – authentication</li>
            <li><strong>AdMob (Google)</strong> – advertising</li>
            <li><strong>Apple App Store / Google Play</strong> – payments and subscriptions</li>
          </ul>
          <p>These providers process data according to their own privacy policies.</p>

          <p><strong>5. Data Retention</strong></p>
          <p>We retain data only as long as necessary:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Account and POI data → until account deletion</li>
            <li>Local device data → until removed or app uninstalled</li>
            <li>Analytics data → retained for a limited period (e.g. up to 14 months) for product improvement</li>
          </ul>

          <p><strong>6. International Transfers</strong></p>
          <p>Your data may be processed outside the European Economic Area (EEA).</p>
          <p>We ensure appropriate safeguards, such as:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Standard contractual clauses (SCCs)</li>
            <li>Trusted providers with adequate protections</li>
          </ul>

          <p><strong>7. Your Rights</strong></p>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Access your data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Restrict processing</li>
            <li>Object to processing</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time, where processing is based on consent</li>
          </ul>
          <p>You also have the right to lodge a complaint with your local data protection authority.</p>
          <p>
            You can exercise your rights by contacting us at{' '}
            <a className="text-brand-700 underline underline-offset-4" href="mailto:info@yugaweb.com">info@yugaweb.com</a>.
          </p>

          <p><strong>8. Account Deletion</strong></p>
          <p>You can request deletion of your account and associated data:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Directly from within the app (if available)</li>
            <li>
              Or via:{' '}
              <Link className="text-brand-700 underline underline-offset-4" to={ROUTES.deleteAccount}>{ROUTES.deleteAccount}</Link>
            </li>
          </ul>
          <p>Once processed:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Your account will be permanently deleted</li>
            <li>Your saved data will be removed</li>
            <li>Some data may be retained temporarily for legal or security reasons</li>
          </ul>

          <p><strong>9. Children’s Privacy</strong></p>
          <p>
            PoiSave is not intended for children under 13 (or 14 where required by local law). We do not knowingly collect data from children.
          </p>

          <p><strong>10. Security</strong></p>
          <p>
            We implement reasonable technical and organizational measures to protect your data. However, no system is completely secure.
          </p>

          <p><strong>11. Advertising</strong></p>
          <p>The app may display ads to free users.</p>
          <p>Ad providers may collect:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Device identifiers (such as Advertising ID or IDFA)</li>
            <li>Interaction data</li>
          </ul>
          <p>This is used to deliver and measure ads, in accordance with applicable laws. Where required, we ask for consent before using data for personalized advertising.</p>

          <p><strong>12. Changes to This Policy</strong></p>
          <p>We may update this Privacy Policy from time to time.</p>
          <p>We will notify users by:</p>
          <ul className="space-y-2 pl-5 list-disc">
            <li>Updating the “Last updated” date</li>
            <li>Or through the app when necessary</li>
          </ul>

          <p><strong>13. Contact</strong></p>
          <p>
            If you have questions about this policy:
            <br />
            Email:{' '}
            <a className="text-brand-700 underline underline-offset-4" href="mailto:info@yugaweb.com">info@yugaweb.com</a>
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link to={ROUTES.home} className="btn btn-glass-brand">Back to home</Link>
        </div>
      </div>
    </section>
  )
}
