import React, { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import SectionLink from './SectionLink'

export default function CollectorsSection() {
  const typingText = `Restaurant name
Example street 3, Rome
Cost: 20€
Restaurant with a view of the Colosseum, great for date nights or solo dinners. The carbonara is a must-try!`
  const [visibleChars, setVisibleChars] = useState(0)

  useEffect(() => {
    const typingDelay = 24
    const restartDelay = 2200

    if (visibleChars < typingText.length) {
      const timer = window.setTimeout(() => {
        setVisibleChars(current => current + 1)
      }, typingDelay)
      return () => window.clearTimeout(timer)
    }

    const resetTimer = window.setTimeout(() => {
      setVisibleChars(0)
    }, restartDelay)

    return () => window.clearTimeout(resetTimer)
  }, [visibleChars, typingText])

  return (
    <section className="section">
      <div className="items-center gap-10 grid lg:grid-cols-2 mx-auto px-4 max-w-6xl">
        <div className="collectors-demo split-showcase split-showcase--dark">
          <img src="/img/intro2b.png" alt="Poisave saved place details on mobile" />
          <div className="collectors-demo__typing" aria-hidden="true">
            <span className="collectors-demo__typing-text">{typingText.slice(0, visibleChars)}</span>
          </div>
        </div>

        <div>
          <span className="section-kicker">Built for collectors</span>
          <h2 className="heading">From saved posts to real plans, without losing them in chats, bookmarks or screenshots</h2>
          <p className="section-lead">
            Instead of leaving recommendations buried in chat threads, bookmarks or screenshots, you can collect them in one place and return when you need them.
          </p>

          <ul className="checklist">
            <li>
              <Check className="w-4 h-4" />
              Keep one source of truth for restaurants, cafes and travel spots.
            </li>
            <li>
              <Check className="w-4 h-4" />
              Review details before saving so the map stays clean.
            </li>
            <li>
              <Check className="w-4 h-4" />
              Open your saved places visually instead of hunting through links.
            </li>
          </ul>

          <SectionLink sectionId="download" className="inline-flex mt-8 btn btn-primary">
            Explore plans
            <ArrowRight className="ml-2 w-4 h-4" />
          </SectionLink>
        </div>
      </div>
    </section>
  )
}
