import React, { useEffect, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import SectionLink from './SectionLink'
import { useI18n } from '../i18n/I18nProvider'

export default function CollectorsSection() {
  const { copy } = useI18n()
  const collectors = copy.home.collectors
  const typingText = collectors.typingText
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
          <img src="/img/intro2b.png" alt={collectors.imageAlt} />
          <div className="collectors-demo__typing" aria-hidden="true">
            <span className="collectors-demo__typing-text">{typingText.slice(0, visibleChars)}</span>
          </div>
        </div>

        <div>
          <span className="section-kicker">{collectors.kicker}</span>
          <h2 className="heading">{collectors.title}</h2>
          <p className="section-lead">{collectors.lead}</p>

          <ul className="checklist">
            {collectors.bullets.map((bullet) => (
              <li key={bullet}>
                <Check className="w-4 h-4" />
                {bullet}
              </li>
            ))}
          </ul>

          <SectionLink sectionId="download" className="inline-flex mt-8 btn btn-primary">
            {collectors.button}
            <ArrowRight className="ml-2 w-4 h-4" />
          </SectionLink>
        </div>
      </div>
    </section>
  )
}
