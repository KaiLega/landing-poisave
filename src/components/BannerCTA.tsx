import React from 'react'
import { Link } from 'react-router-dom'

type BannerCTAProps = {
  eyebrow?: string
  title: string
  description?: string
  buttonLabel: string
  to: string
}

export default function BannerCTA({
  eyebrow = 'Get early access',
  title,
  description,
  buttonLabel,
  to,
}: BannerCTAProps) {
  return (
    <section className="banner-cta coming-anim">
      <div className="banner-cta__glow" aria-hidden="true" />
      <div className="banner-cta__inner">
        <span className="banner-cta__eyebrow">{eyebrow}</span>
        <h2 className="banner-cta__title">{title}</h2>
        {description ? <p className="banner-cta__description">{description}</p> : null}
        <Link to={to} className="banner-cta__button">
          {buttonLabel}
        </Link>
      </div>
    </section>
  )
}
