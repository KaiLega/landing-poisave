import React from 'react'
import SectionWaves from './SectionWaves'

type Highlight = {
  title: string
  desc: string
}

type DiscoverSectionProps = {
  highlights: Highlight[]
}

export default function DiscoverSection({ highlights }: DiscoverSectionProps) {
  return (
    <section id="features" className="section section-wave">
      <SectionWaves />
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">Discover faster</span>
          <h2 className="heading">A landing structure inspired by the reference, rebuilt around poisave.</h2>
          <p className="section-lead">
            The new home leans into a mobile-first app presentation: stronger hero, alternating feature bands and a screenshot carousel.
          </p>
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
