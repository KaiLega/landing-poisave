import React from 'react'
import { Check, MapPin } from 'lucide-react'
import SectionLink from './SectionLink'
import { useI18n } from '../i18n/I18nProvider'

type HeroSectionProps = {
  benefits: string[]
}

export default function HeroSection({ benefits }: HeroSectionProps) {
  const { copy } = useI18n()
  const hero = copy.home.hero

  return (
    <section className="hero-seven">
      <div className="items-center gap-12 grid lg:grid-cols-[0.9fr_1.1fr] mx-auto px-4 max-w-6xl">
        <div className="order-2 lg:order-1 hero-visual">
          <div className="hero-img">
            <img src="/img/intro/intro1.png" alt={hero.imageAlt} />
            <div className="hero-floating-card--top hero-floating-card">
              <span>{hero.topCard}</span>
            </div>

            <div className="hero-floating-card--bottom hero-floating-card">
              <MapPin className="w-4 h-4 text-purple-600" />
              <span>{hero.bottomCard}</span>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 hero-copy">
          <span className="section-kicker section-kicker--light">{hero.kicker}</span>
          <h1 className="hero-title">{hero.title}</h1>
          <p className="hero-text">{hero.text}</p>

          <ul className="hero-benefits">
            {benefits.map((item) => (
              <li key={item}>
                <Check className="w-4 h-4" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="hero-stores-badge">
            <SectionLink sectionId="download" className="store">
              <img
                className="appstore-original"
                src="/img/apple/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                alt={copy.common.appStoreAlt}
              />
            </SectionLink>

            <SectionLink sectionId="download" className="store">
              <img
                className="googleplay-original"
                src="/img/android/GetItOnGooglePlay_Badge_Web_color_English.svg"
                alt={copy.common.googlePlayAlt}
              />
            </SectionLink>

            <span className="os-version">{hero.availability}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
