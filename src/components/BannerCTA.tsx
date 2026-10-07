import React from 'react'
import SectionLink from './SectionLink'

type BannerCTAProps = {
  eyebrow?: string
  title: string
  description?: string
  buttonLabel: string
  sectionId: string
}

export default function BannerCTA({
  eyebrow = 'Get early access',
  title,
  description,
  buttonLabel,
  sectionId,
}: BannerCTAProps) {
  return (
    <section className="banner-cta coming-anim">
      <div className="banner-cta__glow" aria-hidden="true" />
      <div className="banner-cta__inner">
        <span className="banner-cta__eyebrow">{eyebrow}</span>
        <h2 className="banner-cta__title">{title}</h2>
        {description ? <p className="banner-cta__description">{description}</p> : null}
        <SectionLink sectionId={sectionId} className="banner-cta__button">
          {buttonLabel}
        </SectionLink>
      </div>
    </section>
  )
}
