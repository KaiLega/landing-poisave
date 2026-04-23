import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FAQ from './components/FAQ'
import ComingSoon from './components/ComingSoon'
import { COMING_SOON } from './config'
import CookieBanner from './components/CookieBanner'
import PrivacyPolicy from './components/PrivacyPolicy'
import CookiePolicy from './components/CookiePolicy'
import ScreensCarousel from './components/ScreensCarousel'
import TrackShowcase from './components/TrackShowcase'
import BannerCTA from './components/BannerCTA'
import HowItWorksSection from './components/HowItWorksSection'
import HeroSection from './components/HeroSection'
import DiscoverSection from './components/DiscoverSection'
import CollectorsSection from './components/CollectorsSection'
import FeaturesOverviewSection from './components/FeaturesOverviewSection'
import PricingSection from './components/PricingSection'

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

const premiumFeatures = [
  'Unlimited saved places',
  'Smart collections and categories',
  'Priority support and new releases first',
]

const faqItems = [
  { q: 'Is it free?', a: 'Yes. You can start with the free plan and upgrade later if you need more space and premium tools.' },
  { q: 'Does it work offline?', a: 'Saved places stay cached on your device so you can still review them while travelling.' },
  { q: 'Which platforms are supported?', a: 'Poisave is designed for iOS and Android.' },
  { q: 'How do I report an issue?', a: 'Use the feedback area in the app settings or contact the team from the support links.' },
  { q: 'Can I edit a saved place before keeping it?', a: 'Yes. The flow is built around reviewing titles, categories and locations before the place lands on your map.' },
  { q: 'Do you support only restaurants?', a: 'No. You can save cafes, viewpoints, hotels and any other place you want to revisit later.' },
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
    description: 'Save the links you discover online and keep your first collections tidy.',
    items: ['Core save flow', 'Basic place editing', 'Access on your device'],
    featured: false,
  },
  {
    name: 'Premium',
    price: 'Coming soon',
    label: 'For power users',
    description: 'Unlock more control for frequent travellers, food hunters and city collectors.',
    items: premiumFeatures,
    featured: true,
  },
]

const TRACK_SHOWCASE_VARIANT: 'bleed' | 'panel' = 'bleed'

export default function App() {
  const getRoute = () => window.location.hash.replace(/^#\/?/, '')
  const [route, setRoute] = useState(getRoute())

  useEffect(() => {
    const handler = () => setRoute(getRoute())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  if (COMING_SOON) {
    return <ComingSoon />
  }

  if (route === 'privacy') {
    return (
      <div className="font-display">
        <Header />
        <PrivacyPolicy />
        <Footer />
        <CookieBanner />
      </div>
    )
  }

  if (route === 'cookies') {
    return (
      <div className="font-display">
        <Header />
        <CookiePolicy />
        <Footer />
        <CookieBanner />
      </div>
    )
  }

  return (
    <div className="bg-white font-display text-slate-900">
      <Header />

      <div className="hero-discover-stack">
        <HeroSection benefits={heroBenefits} />
        <DiscoverSection highlights={quickHighlights} />
      </div>

      <HowItWorksSection steps={workflowSteps} />

      <BannerCTA
        eyebrow="Join the launch"
        title="Ready to turn saved posts into real places?"
        description="Get on the list and be the first to try poisave when the public launch opens."
        buttonLabel="Get the app"
        href="#download"
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

      <Footer />
      <CookieBanner />
    </div>
  )
}
