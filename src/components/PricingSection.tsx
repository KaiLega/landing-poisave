import React from 'react'
import { Check } from 'lucide-react'

type PricingPlan = {
  name: string
  price: string
  originalPrice?: string
  yearlyPrice?: string
  yearlyOriginalPrice?: string
  priceNote?: string
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
          <h2 className="heading">Start free, upgrade to PoiSave Premium</h2>
          <p className="section-lead">
            Save places for free, then unlock unlimited saved places, cloud sync, no ads and advanced map customization.
          </p>
        </div>

        <div className="gap-6 grid lg:grid-cols-2 mt-12">
          {plans.map((plan) => (
            <article key={plan.name} className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}>
              <div className="plan-card__topline">{plan.label}</div>
              <div className="plan-card__body">
                <div className="plan-card__copy">
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>

                  <ul className="plan-card__list">
                    {plan.items.map((item) => (
                      <li key={item}>
                        <Check className="w-4 h-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-card__price">
                  {(plan.originalPrice || plan.priceNote || plan.yearlyPrice) && (
                    <div className="plan-card__price-row">
                      <span className="plan-card__price-term">Monthly</span>
                      {plan.originalPrice && <span className="plan-card__price-original">{plan.originalPrice}</span>}
                    </div>
                  )}
                  <span className="plan-card__price-current">{plan.price}</span>
                  {plan.priceNote && <small>{plan.priceNote}</small>}

                  {plan.yearlyPrice && (
                    <div className="plan-card__price-yearly">
                      <span className="plan-card__price-term">Annual</span>
                      <strong>{plan.yearlyPrice}</strong>
                      {plan.yearlyOriginalPrice && <del>{plan.yearlyOriginalPrice}</del>}
                    </div>
                  )}
                </div>
              </div>
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
