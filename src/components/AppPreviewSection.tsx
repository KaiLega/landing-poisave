import React from 'react'
import ScreensCarousel from './ScreensCarousel'

type CarouselSlide = {
  src: string
  alt: string
  eyebrow: string
  title: string
  description: string
}

type AppPreviewSectionProps = {
  slides: CarouselSlide[]
}

export default function AppPreviewSection({ slides }: AppPreviewSectionProps) {
  return (
    <section id="app-preview" className="section screens-section">
      <div className="mx-auto px-4 max-w-6xl">
        <ScreensCarousel slides={slides} />
      </div>
    </section>
  )
}
