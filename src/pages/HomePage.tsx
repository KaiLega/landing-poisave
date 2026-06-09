import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import TrackShowcase from '../components/TrackShowcase'
import BannerCTA from '../components/BannerCTA'
import HowItWorksSection from '../components/HowItWorksSection'
import HeroSection from '../components/HeroSection'
import DiscoverSection from '../components/DiscoverSection'
import CollectorsSection from '../components/CollectorsSection'
import FeaturesOverviewSection from '../components/FeaturesOverviewSection'
import PricingSection from '../components/PricingSection'
import { toSectionPath } from '../routes'
import BeforeAfter from '../components/BeforeAfter'
import AppPreviewSection from '../components/AppPreviewSection'
import FAQSection from '../components/FAQSection'
import { useI18n } from '../i18n/I18nProvider'

const TRACK_SHOWCASE_VARIANT: 'bleed' | 'panel' = 'bleed'

export default function HomePage() {
  const location = useLocation()
  const { copy } = useI18n()
  const home = copy.home

  useEffect(() => {
    const section = new URLSearchParams(location.search).get('section')
    if (!section) return

    requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.search])

  return (
    <>
      <div className="hero-discover-stack">
        <HeroSection benefits={home.hero.benefits} />
        <DiscoverSection highlights={home.discover.highlights} />
      </div>

      <HowItWorksSection steps={home.howItWorks.steps} />

      <BannerCTA
        eyebrow={home.bannerCta.eyebrow}
        title={home.bannerCta.title}
        description={home.bannerCta.description}
        to={toSectionPath('download')}
        buttonLabel={home.bannerCta.buttonLabel}
      />

      <BeforeAfter />

      <CollectorsSection />

      <AppPreviewSection slides={home.carousel.slides} />

      <TrackShowcase variant={TRACK_SHOWCASE_VARIANT} />

      <FeaturesOverviewSection />

      <PricingSection plans={home.pricing.plans} />

      <FAQSection items={home.faq.items} />
    </>
  )
}
