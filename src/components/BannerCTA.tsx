import React from 'react'

type BannerCTAProps = {
  eyebrow?: string
  title: string
  description?: string
  buttonLabel: string
  href: string
}

export default function BannerCTA({
  eyebrow = 'Get early access',
  title,
  description,
  buttonLabel,
  href,
}: BannerCTAProps) {
  return (
    <section className="banner-cta coming-anim">
      <div className="banner-cta__glow" aria-hidden="true" />
      <div className="banner-cta__inner">
        <span className="banner-cta__eyebrow">{eyebrow}</span>
        <h2 className="banner-cta__title">{title}</h2>
        {description ? <p className="banner-cta__description">{description}</p> : null}
        <a href={href} className="banner-cta__button">
          {buttonLabel}
        </a>
      </div>
    </section>
  )
}
