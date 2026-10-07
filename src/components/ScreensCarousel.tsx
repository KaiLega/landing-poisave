import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion'

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
  const [isHovered, setIsHovered] = useState(false)
  const [hasFocusWithin, setHasFocusWithin] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const { copy } = useI18n()
  const carousel = copy.home.carousel
  const activeSlide = slides[active]
  const prefersReducedMotion = usePrefersReducedMotion()
  const isPaused = isHovered || hasFocusWithin || prefersReducedMotion

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setHasFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHasFocusWithin(false)
        }
      }}
      onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => setTouchStartX(null)}
    >
      <div className="carousel-copy--top carousel-copy">
        <h2 className="heading">{carousel.heading}</h2>
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
              aria-label={`${carousel.showLabel} ${slide.title}`}
              aria-current={offset === 0 ? 'true' : undefined}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                width="1149"
                height="2086"
                loading="lazy"
                decoding="async"
              />
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
          aria-label={carousel.previousLabel}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="carousel-dots" aria-label={carousel.navigationLabel}>
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`carousel-dot${index === active ? ' is-active' : ''}`}
              onClick={() => setActive(index)}
              aria-label={`${carousel.goToLabel} ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-button--right carousel-button"
          onClick={goToNext}
          aria-label={carousel.nextLabel}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
