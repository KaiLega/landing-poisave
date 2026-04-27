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
import BeforeAfter from '../components/BeforeAfter'

const heroBenefits = [
  'Paste links from Instagram, TikTok and more',
  'Clean up details before saving them on your map',
  'Stop losing places you save on social media',
]

const quickHighlights = [
  {
    title: 'Save places from Instagram and TikTok',
    desc: 'Paste a social link and keep the restaurant, cafe or travel spot on your map.',
  },
  {
    title: 'Organize every point of interest',
    desc: 'Add categories, notes and useful details instead of losing places in bookmarks.',
  },
  {
    title: 'Plan from a personal map',
    desc: 'Compare saved places nearby and choose where to go next without switching apps.',
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
    title: 'Paste a description or upload a screenshot',
    description: 'PoiSave extracts the useful text and saves the details needed to create your point of interest.',
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
    alt: 'PoiSave map with saved place pins',
    eyebrow: 'Map overview',
    title: 'See all your saved places on the map',
    description: 'Turn social finds into saved places in seconds.',
  },
  {
    src: '/img/intro/intro2.png',
    alt: 'PoiSave form for pasting a video description',
    eyebrow: 'Custom notes',
    title: 'Paste a description or write your own',
    description: 'Add the details you need before saving.',
  },
  {
    src: '/img/intro/intro3.png',
    alt: 'PoiSave saved POIs list',
    eyebrow: 'Browse collections',
    title: 'Browse your saved places',
    description: 'Filter your list without switching apps.',
  },
  {
    src: '/img/intro/intro4.png',
    alt: 'PoiSave POI callout with place details',
    eyebrow: 'Place details',
    title: 'Open a pin and check the details',
    description: 'Review notes, address and category at a glance.',
  },
  {
    src: '/img/intro/intro5.png',
    alt: 'PoiSave stats screen',
    eyebrow: 'Community picks',
    title: 'See what stands out',
    description: 'See what others like and add the places you love.',
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
    price: '€1.99',
    originalPrice: '€3.99',
    yearlyPrice: '€19.99',
    yearlyOriginalPrice: '€39.99',
    priceNote: 'per month',
    label: 'Launch promo',
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
        eyebrow="Download PoiSave"
        title="Start saving places from your favorite social apps"
        description="Get PoiSave on iOS and Android to organize restaurants, cafes, travel ideas and saved posts on your personal map."
        to={toSectionPath('download')}
        buttonLabel="Get PoiSave"
      />

      <BeforeAfter />
      
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
