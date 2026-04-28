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
    <section className="section section-wave">
      <SectionWaves />
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">Save places from social media</span>
          <h2 className="heading">Organize restaurants, cafes and travel spots on your personal map</h2>
          <p className="section-lead">
            PoiSave helps you turn Instagram, TikTok and web discoveries into saved points of interest you can find, edit and plan from later.
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
