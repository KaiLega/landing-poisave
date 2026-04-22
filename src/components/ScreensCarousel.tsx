import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = {
  src: string
  alt: string
  eyebrow: string
  title: string
  description: string
}

function wrapIndex(index: number, length: number) {
  return (index + length) % length
}

export default function ScreensCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0)
  const activeSlide = slides[active]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, slides.length))
    }, 4300)

    return () => window.clearInterval(timer)
  }, [slides.length])

  return (
    <div className="screenshots-shell">
      <div className="carousel-copy carousel-copy--top">
        <span className="carousel-copy__eyebrow">{activeSlide.eyebrow}</span>
        <h3 className="carousel-copy__title">{activeSlide.title}</h3>
      </div>

      <button
        type="button"
        className="carousel-button carousel-button--left"
        onClick={() => setActive((current) => wrapIndex(current - 1, slides.length))}
        aria-label="Previous screenshot"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="screenshots-stage">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const slide = slides[wrapIndex(active + offset, slides.length)]
          return (
            <div
              key={`${slide.src}-${offset}`}
              className="carousel-slide"
              data-offset={offset}
              aria-hidden={offset !== 0}
            >
              <img src={slide.src} alt={slide.alt} />
            </div>
          )
        })}
      </div>

      <button
        type="button"
        className="carousel-button carousel-button--right"
        onClick={() => setActive((current) => wrapIndex(current + 1, slides.length))}
        aria-label="Next screenshot"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="carousel-copy carousel-copy--bottom">
        <p className="carousel-copy__description">{activeSlide.description}</p>
      </div>

      <div className="carousel-dots" aria-label="Screenshots navigation">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`carousel-dot${index === active ? ' is-active' : ''}`}
            onClick={() => setActive(index)}
            aria-label={`Go to screenshot ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
