import React from 'react'
import { Check } from 'lucide-react'
import SectionLink from './SectionLink'

type PricingPlan = {
  name: string
  price: string
  label: string
  description: string
  items: string[]
  featured: boolean
}

type PricingSectionProps = {
  plans: PricingPlan[]
}

export default function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section id="download" className="bg-lightgrey section">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">Pricing</span>
          <h2 className="heading">Go Premium. Be Happy</h2>
          <p className="section-lead">
            Keep the two-plan structure simple for now: a free starting point and a premium tier for heavier usage.
          </p>
        </div>

        <div className="gap-6 grid lg:grid-cols-2 mt-12">
          {plans.map((plan) => (
            <article key={plan.name} className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}>
              <div className="plan-card__topline">{plan.label}</div>
              <div className="plan-card__head">
                <div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                <div className="plan-card__price">{plan.price}</div>
              </div>

              <ul className="plan-card__list">
                {plan.items.map((item) => (
                  <li key={item}>
                    <Check className="w-4 h-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <SectionLink sectionId="faq" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} mt-8 inline-flex`}>
                {plan.featured ? 'Join premium waitlist' : 'Start with free'}
              </SectionLink>
            </article>
          ))}
        </div>

        <div className="store-row">
          <img
            src="/img/apple/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
            className="store-row__badge"
            alt="Download on the App Store"
          />
          <img
            src="/img/android/GetItOnGooglePlay_Badge_Web_color_English.svg"
            className="store-row__badge"
            alt="Get it on Google Play"
          />
        </div>
      </div>
    </section>
  )
}
