import React from 'react'
import FAQ from './FAQ'

type FAQItem = {
  q: string
  a: string
}

type FAQSectionProps = {
  items: FAQItem[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  return (
    <section id="faq" className="section faq-section coming-anim">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">Support</span>
          <h2 className="heading">FAQ</h2>
        </div>

        <div className="mt-10">
          <FAQ items={items} />
        </div>
      </div>
    </section>
  )
}
