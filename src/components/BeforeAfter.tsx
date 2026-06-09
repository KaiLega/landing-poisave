import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'

export default function BeforeAfterSection() {
  const [position, setPosition] = useState(50)
  const sectionRef = useRef<HTMLElement | null>(null)
  const hasAnimatedRef = useRef(false)
  const { copy } = useI18n()
  const beforeAfter = copy.home.beforeAfter

  const snapToNearest = () => {
    if (position < 25) {
        setPosition(0)
        return
    }

    if (position > 75) {
        setPosition(100)
        return
    }

    setPosition(50)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return

        hasAnimatedRef.current = true

        let dir = 1
        let current = 50

        const interval = window.setInterval(() => {
          current += dir * 0.5

          if (current > 65 || current < 35) {
            dir *= -1
          }

          setPosition(current)
        }, 30)

        window.setTimeout(() => {
          window.clearInterval(interval)
          setPosition(50)
        }, 2200)
      },
      {
        threshold: 0.35,
      },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">{beforeAfter.kicker}</span>
          <h2 className="heading">{beforeAfter.title}</h2>
          <p className="section-lead">{beforeAfter.lead}</p>
        </div>

        <div className="mt-12 before-after">
          <div className="before-after__layer before-after__layer--before">
            <img src="/img/before-after/before.png" alt={beforeAfter.beforeAlt} />
          </div>

          <div
            className="before-after__layer before-after__layer--after"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img src="/img/before-after/after.png" alt={beforeAfter.afterAlt} />
          </div>

          <div className="before-after__handle" style={{ left: `${position}%` }}>
            <span>↔</span>
          </div>

          <input
            className="before-after__range"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            onMouseUp={snapToNearest}
            onTouchEnd={snapToNearest}
            aria-label={beforeAfter.rangeLabel}
          />
        </div>

        <p className="before-after__closing">
          {beforeAfter.closing}
        </p>
      </div>
    </section>
  )
}
