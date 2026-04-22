import React, { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  Link as LinkIcon,
  Layers,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import Feature from './components/Feature'
import FAQ from './components/FAQ'
import ComingSoon from './components/ComingSoon'
import { COMING_SOON } from './config'
import CookieBanner from './components/CookieBanner'
import PrivacyPolicy from './components/PrivacyPolicy'
import CookiePolicy from './components/CookiePolicy'
import ScreensCarousel from './components/ScreensCarousel'
import TrackShowcase from './components/TrackShowcase'
import SectionWaves from './components/SectionWaves'
import BannerCTA from './components/BannerCTA'
import HowItWorksSection from './components/HowItWorksSection'

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
    <div className="font-display bg-white text-slate-900">
      <Header />

      <div className="hero-discover-stack">
        <section className="hero-seven">
          <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <div className="hero-visual order-2 lg:order-1">
              <div className="hero-img">
                <img src="/img/intro/intro1.png" alt="Poisave mobile app preview" />
              </div>
              <div className="hero-floating-card hero-floating-card--top">Paste. Preview. Save.</div>
              <div className="hero-floating-card hero-floating-card--bottom">
                <MapPin className="h-4 w-4" />
                128 places saved
              </div>
            </div>

            <div className="hero-copy order-1 lg:order-2">
              <span className="section-kicker section-kicker--light">poisave mobile app</span>
              <h1 className="hero-title">More than your map app</h1>
              <p className="hero-text">
                Save the places you discover on social media, clean up the details, and organize them inside a map that is finally useful.
              </p>

              <ul className="hero-benefits">
                {heroBenefits.map((item) => (
                  <li key={item}>
                    <Check className="h-4 w-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="hero-stores-badge">
                <a href="#download" className="store">
                  <img
                    className="appstore-original"
                    src="/img/apple/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                    alt="Download on the App Store"
                  />
                </a>

                <a href="#download" className="store">
                  <img
                    className="googleplay-original"
                    src="/img/android/GetItOnGooglePlay_Badge_Web_color_English.svg"
                    alt="Get it on Google Play"
                  />
                </a>

                <span className="os-version">* Available for iOS and Android</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section section-wave">
          <SectionWaves />
          <div className="mx-auto max-w-6xl px-4">
            <div className="section-copy section-copy--center">
              <span className="section-kicker">Discover faster</span>
              <h2 className="heading">A landing structure inspired by the reference, rebuilt around poisave.</h2>
              <p className="section-lead">
                The new home leans into a mobile-first app presentation: stronger hero, alternating feature bands and a screenshot carousel.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {quickHighlights.map((item) => (
                <article key={item.title} className="contrast-card">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <HowItWorksSection steps={workflowSteps} />

      <BannerCTA
        eyebrow="Join the launch"
        title="Ready to turn saved posts into real places?"
        description="Get on the list and be the first to try poisave when the public launch opens."
        buttonLabel="Get the app"
        href="#download"
      />

      <section className="section">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="split-showcase split-showcase--dark">
            <img src="/img/intro/intro2.png" alt="Poisave saved place details on mobile" />
          </div>

          <div>
            <span className="section-kicker">Built for collectors</span>
            <h2 className="heading">From saved posts to real plans, without the chaos.</h2>
            <p className="section-lead">
              Instead of leaving recommendations buried in chat threads, bookmarks or screenshots, you can collect them in one place and return when you need them.
            </p>

            <ul className="checklist">
              <li>
                <Check className="h-4 w-4" />
                Keep one source of truth for restaurants, cafes and travel spots.
              </li>
              <li>
                <Check className="h-4 w-4" />
                Review details before saving so the map stays clean.
              </li>
              <li>
                <Check className="h-4 w-4" />
                Open your saved places visually instead of hunting through links.
              </li>
            </ul>

            <a className="btn btn-primary mt-8 inline-flex" href="#download">
              Explore plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="screens" className="section screens-section">
        <div className="mx-auto max-w-6xl px-4">
          <div className="section-copy section-copy--center">
            <span className="section-kicker">App preview</span>
            <h2 className="heading">Awesome Screenshots</h2>
            <p className="section-lead">
              A centered carousel replaces the old static grid and matches the direction of the theme reference much more closely.
            </p>
          </div>

          <ScreensCarousel slides={carouselSlides} />
        </div>
      </section>

      <TrackShowcase variant={TRACK_SHOWCASE_VARIANT} />

      <section className="section">
        <div className="mx-auto max-w-6xl px-4">
          <div className="section-copy section-copy--center">
            <span className="section-kicker">Everything you need</span>
            <h2 className="heading">Everything you need</h2>
            <p className="section-lead">Fast capture, smart dedupe, offline cache, and global maps.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Feature title="One-tap capture" desc="Paste a link, we handle the rest." icon={<LinkIcon className="h-6 w-6" />} />
            <Feature title="Smart de-dup" desc="Avoid duplicate places automatically." icon={<Layers className="h-6 w-6" />} />
            <Feature title="Private by default" desc="Your data stays on your device." icon={<ShieldCheck className="h-6 w-6" />} />
            <Feature title="Works worldwide" desc="From Rome to Tokyo, it just works." icon={<MapPin className="h-6 w-6" />} />
            <Feature title="Clean design" desc="Beautiful, modern interface." icon={<Sparkles className="h-6 w-6" />} />
            <Feature title="Automatic details" desc="Titles, categories, and more in seconds." icon={<Wand2 className="h-6 w-6" />} />
          </div>
        </div>
      </section>

      <section id="download" className="section bg-lightgrey">
        <div className="mx-auto max-w-6xl px-4">
          <div className="section-copy section-copy--center">
            <span className="section-kicker">Pricing</span>
            <h2 className="heading">Go Premium. Be Happy</h2>
            <p className="section-lead">
              Keep the two-plan structure simple for now: a free starting point and a premium tier for heavier usage.
            </p>
          </div>

          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className={`plan-card${plan.featured ? ' plan-card--featured' : ''}`}>
                <div className="plan-card__topline">{plan.label}</div>
                <div className="plan-card__head">
                  <div>
                    <h3>{plan.name}</h3>
                    <p>{plan.description}</p>
                  </div>
                  <div className="plan-card__price">{plan.price}</div>
                </div>

                <ul className="plan-card__list">
                  {plan.items.map((item) => (
                    <li key={item}>
                      <Check className="h-4 w-4" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a href="#faq" className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} mt-8 inline-flex`}>
                  {plan.featured ? 'Join premium waitlist' : 'Start with free'}
                </a>
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

      <section id="faq" className="section faq-section coming-anim">
        <div className="mx-auto max-w-6xl px-4">
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
