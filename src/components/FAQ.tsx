import React, { useId, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

export default function FAQ({items}:{items:{q:string,a:string}[]}){
  const [open, setOpen] = useState<number | null>(0)
  const idPrefix = useId()

  return (
    <div className="faq-grid">
      {items.map((item, index) => {
        const isOpen = open === index
        const triggerId = `${idPrefix}-trigger-${index}`
        const answerId = `${idPrefix}-answer-${index}`

        return (
          <article key={item.q} className={`faq-card${isOpen ? ' is-open' : ''}`}>
            <button
              id={triggerId}
              onClick={() => setOpen(isOpen ? null : index)}
              className="faq-card__trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
            >
              <span className="faq-card__question">{item.q}</span>
              <span className="faq-card__icon" aria-hidden="true">
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div
              id={answerId}
              className="faq-card__answer"
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
            >
              {item.a}
            </div>
          </article>
        )
      })}
    </div>
  )
}
