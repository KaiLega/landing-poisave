import React from 'react'
import { Check, MapPin } from 'lucide-react'
import SectionLink from './SectionLink'

type HeroSectionProps = {
  benefits: string[]
}

export default function HeroSection({ benefits }: HeroSectionProps) {
  return (
    <section className="hero-seven">
      <div className="items-center gap-12 grid lg:grid-cols-[0.9fr_1.1fr] mx-auto px-4 max-w-6xl">
        <div className="order-2 lg:order-1 hero-visual">
          <div className="hero-img">
            <img src="/img/intro/intro1.png" alt="Poisave mobile app preview" />
          </div>
          <div className="hero-floating-card--top hero-floating-card">
            Paste → Edit → Save
          </div>
          <div className="hero-floating-card--bottom hero-floating-card">
            <MapPin className="w-4 h-4 text-purple-600" />
            Places saved to your map
          </div>
        </div>

        <div className="order-1 lg:order-2 hero-copy">
          <span className="section-kicker section-kicker--light">poisave mobile app</span>
          <h1 className="hero-title">More than your map app</h1>
          <p className="hero-text">
            Save the places you discover on social media, clean up the details, and organize them inside a map that is finally useful.
          </p>

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
                alt="Download on the App Store"
              />
            </SectionLink>

            <SectionLink sectionId="download" className="store">
              <img
                className="googleplay-original"
                src="/img/android/GetItOnGooglePlay_Badge_Web_color_English.svg"
                alt="Get it on Google Play"
              />
            </SectionLink>

            <span className="os-version">* Available for iOS and Android</span>
          </div>
        </div>
      </div>
    </section>
  )
}
