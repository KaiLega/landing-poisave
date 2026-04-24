import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ScreensCarousel from '../components/ScreensCarousel'
import TrackShowcase from '../components/TrackShowcase'
import BannerCTA from '../components/BannerCTA'
import HowItWorksSection from '../components/HowItWorksSection'
import HeroSection from '../components/HeroSection'
import DiscoverSection from '../components/DiscoverSection'
import CollectorsSection from '../components/CollectorsSection'
import FeaturesOverviewSection from '../components/FeaturesOverviewSection'
import PricingSection from '../components/PricingSection'
import FAQ from '../components/FAQ'
import { toSectionPath } from '../routes'

const heroBenefits = [
  'Paste links from Instagram, TikTok and more',
  'Clean up details before saving',
  'Build your map for future trips',
]

const quickHighlights = [
  {
    title: 'Save from social',
    desc: 'Turn inspiring posts into places you can actually revisit later.',
  },
  {
    title: 'Organize faster',
    desc: 'Keep all your discoveries in one clean map instead of scattered bookmarks.',
  },
  {
    title: 'Plan visually',
    desc: 'See saved spots side by side and decide where to go next in seconds.',
  },
]

const workflowSteps = [
  {
    index: '01',
    title: 'Paste a social link',
    description: 'Drop in an Instagram or TikTok URL and open the preview before saving anything.',
    image: '/img/intro/intro1.png',
    alt: 'Poisave quick save screen',
  },
  {
    index: '02',
    title: 'Review the details',
    description: 'Check the title, location and category so the saved place stays clean and useful later.',
    image: '/img/intro/intro2.png',
    alt: 'Poisave place detail review screen',
  },
  {
    index: '03',
    title: 'See everything on your map',
    description: 'Open the saved list and map view to decide where to go next with all your spots in one place.',
    image: '/img/intro/intro3.png',
    alt: 'Poisave saved places map screen',
  },
]

const faqItems = [
  {
    q: 'Is PoiSave free?',
    a: 'Yes. PoiSave offers a free plan where you can save up to 50 places. You can upgrade to Premium for unlimited saves and additional features.'
  },
  {
    q: 'What does PoiSave Premium include?',
    a: 'PoiSave Premium includes unlimited saved places, no ads, cloud sync across devices, and advanced features to organize and customize your map.'
  },
  {
    q: 'How can I save places from Instagram or TikTok?',
    a: 'You can paste or share links from Instagram, TikTok, or other platforms. PoiSave extracts useful information and lets you review it before saving it on your map.'
  },
  {
    q: 'Is there an app to save places from social media on a map?',
    a: 'Yes. PoiSave is designed to help you save places discovered on social media and organize them automatically on a personal map.'
  },
  {
    q: 'Can I edit a place before saving it?',
    a: 'Yes. You can review and edit the title, category, location, and other details before saving a place.'
  },
  {
    q: 'What kind of places can I save?',
    a: 'You can save any place: restaurants, cafes, travel spots, hotels, events, viewpoints, or any location you want to remember.'
  },
  {
    q: 'Does PoiSave work offline?',
    a: 'Yes. Your saved places are stored locally on your device, so you can view them even without an internet connection. Some features may require connectivity.'
  },
  {
    q: 'Do I need an account to use PoiSave?',
    a: 'No. You can use PoiSave in guest mode. Creating an account allows you to sync your data and access it from multiple devices.'
  },
  {
    q: 'Is my data safe and private?',
    a: 'Yes. Your data is private and used only to provide the service. We do not sell your data. You can read more in our Privacy Policy.'
  },
  {
    q: 'Can I delete my account and data?',
    a: 'Yes. You can delete your account at any time from the app or through the account deletion page on the website.'
  },
  {
    q: 'Which platforms is PoiSave available on?',
    a: 'PoiSave is available on iOS and Android devices.'
  },
  {
    q: 'How do I contact support?',
    a: 'You can contact us from the app settings or through the support links available on the website.'
  }
]

const carouselSlides = [
  {
    src: '/img/intro/intro1.png',
    alt: 'Poisave home map',
    eyebrow: 'Capture faster',
    title: 'Paste a link and preview before saving',
    description: 'The entry screen keeps the save flow immediate, so discoveries from social apps turn into structured places in seconds.',
  },
  {
    src: '/img/intro/intro2.png',
    alt: 'Poisave saved place detail',
    eyebrow: 'Refine details',
    title: 'Clean up the information before it hits your map',
    description: 'Titles, categories and locations stay editable, which keeps the saved collection useful instead of becoming another messy archive.',
  },
  {
    src: '/img/intro/intro3.png',
    alt: 'Poisave personal map',
    eyebrow: 'Plan visually',
    title: 'Open your places on a map built for decisions',
    description: 'The mapped overview helps you compare nearby spots and turn random inspiration into an actual weekend plan.',
  },
  {
    src: '/img/intro/intro4.png',
    alt: 'Poisave saved items list',
    eyebrow: 'Browse collections',
    title: 'Review your saved places in one clear list',
    description: 'Lists and filters give you another way to scan what you saved, without needing to jump between apps or screenshots.',
  },
  {
    src: '/img/intro/intro5.png',
    alt: 'Poisave app collection view',
    eyebrow: 'Stay organized',
    title: 'Keep categories and views tidy as the map grows',
    description: 'The product is designed to scale from a few saved spots to a personal archive of restaurants, cafes and future trips.',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '€0',
    label: 'Perfect to start',
    description: 'Start saving your favorite places with the core experience included.',
    items: ['Save up to 50 places', 'Basic map and saved list', 'Local storage', 'Ads supported'],
    featured: false,
  },
  {
    name: 'Premium',
    price: 'Coming soon',
    label: 'For power users',
    description: 'Unlock the full experience with sync, customization and advanced tools.',
    items: ['Unlimited saved places', 'No ads', 'Cloud sync', 'Advanced stats', 'Map and pin customization'],
    featured: true,
  },
]

const TRACK_SHOWCASE_VARIANT: 'bleed' | 'panel' = 'bleed'

export default function HomePage() {
  const location = useLocation()

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
        <HeroSection benefits={heroBenefits} />
        <DiscoverSection highlights={quickHighlights} />
      </div>

      <HowItWorksSection steps={workflowSteps} />

      <BannerCTA
        eyebrow="Join the launch"
        title="Ready to turn saved posts into real places?"
        description="Get on the list and be the first to try poisave when the public launch opens."
        to={toSectionPath('download')}
        buttonLabel="Get the app"
      />

      <CollectorsSection />

      <section id="screens" className="section screens-section">
        <div className="mx-auto px-4 max-w-6xl">
          <ScreensCarousel slides={carouselSlides} />
        </div>
      </section>

      <TrackShowcase variant={TRACK_SHOWCASE_VARIANT} />

      <FeaturesOverviewSection />

      <PricingSection plans={pricingPlans} />

      <section id="faq" className="section faq-section coming-anim">
        <div className="mx-auto px-4 max-w-6xl">
          <div className="section-copy section-copy--center">
            <span className="section-kicker">Support</span>
            <h2 className="heading">FAQ</h2>
          </div>

          <div className="mt-10">
            <FAQ items={faqItems} />
          </div>
        </div>
      </section>
    </>
  )
}
