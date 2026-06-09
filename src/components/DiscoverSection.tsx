import React from 'react'
import SectionWaves from './SectionWaves'
import { useI18n } from '../i18n/I18nProvider'

type Highlight = {
  title: string
  desc: string
}

type DiscoverSectionProps = {
  highlights: Highlight[]
}

export default function DiscoverSection({ highlights }: DiscoverSectionProps) {
  const { copy } = useI18n()
  const discover = copy.home.discover

  return (
    <section className="section section-wave">
      <SectionWaves />
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">{discover.kicker}</span>
          <h2 className="heading">{discover.title}</h2>
          <p className="section-lead">{discover.lead}</p>
        </div>

        <div className="gap-6 grid md:grid-cols-3 mt-12">
          {highlights.map((item) => (
            <article key={item.title} className="contrast-card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
