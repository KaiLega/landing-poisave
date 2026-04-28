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
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const activeSlide = slides[active]

  const goToPrevious = () => setActive((current) => wrapIndex(current - 1, slides.length))
  const goToNext = () => setActive((current) => wrapIndex(current + 1, slides.length))

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return

    const deltaX = event.changedTouches[0].clientX - touchStartX
    const swipeThreshold = 44

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX > 0) {
        goToPrevious()
      } else {
        goToNext()
      }
    }

    setTouchStartX(null)
  }

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, slides.length))
    }, 4300)

    return () => window.clearInterval(timer)
  }, [isPaused, slides.length])

  return (
    <div
      className="screenshots-shell"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setTouchStartX(null)}
    >
      <div className="carousel-copy--top carousel-copy">
        <h2 className="heading">See PoiSave in action</h2>
        <br />
        <span className="carousel-copy__eyebrow">{activeSlide.eyebrow}</span>
        <h3 className="carousel-copy__title">{activeSlide.title}</h3>
      </div>

      <div className="screenshots-stage">
        {[-2, -1, 0, 1, 2].map((offset) => {
          const slide = slides[wrapIndex(active + offset, slides.length)]
          return (
            <button
              type="button"
              key={`${slide.src}-${offset}`}
              className="carousel-slide"
              data-offset={offset}
              onClick={() => setActive(wrapIndex(active + offset, slides.length))}
              aria-label={`Show ${slide.title}`}
              aria-current={offset === 0 ? 'true' : undefined}
            >
              <img src={slide.src} alt={slide.alt} />
            </button>
          )
        })}
      </div>

      <div className="carousel-copy--bottom carousel-copy">
        <p className="carousel-copy__description">{activeSlide.description}</p>
      </div>

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-button--left carousel-button"
          onClick={goToPrevious}
          aria-label="Previous app preview"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="carousel-dots" aria-label="App preview navigation">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`carousel-dot${index === active ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
              aria-label={`Go App preview ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-button--right carousel-button"
          onClick={goToNext}
          aria-label="Next app preview"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
