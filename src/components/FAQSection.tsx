import React from 'react'
import FAQ from './FAQ'
import { useI18n } from '../i18n/I18nProvider'

type FAQItem = {
  q: string
  a: string
}

type FAQSectionProps = {
  items: FAQItem[]
}

export default function FAQSection({ items }: FAQSectionProps) {
  const { copy } = useI18n()
  const faq = copy.home.faq

  return (
    <section id="faq" className="section faq-section coming-anim">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">{faq.kicker}</span>
          <h2 className="heading">{faq.title}</h2>
        </div>

        <div className="mt-10">
          <FAQ items={items} />
        </div>
      </div>
    </section>
  )
}
