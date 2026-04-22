import React, { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'

export default function FAQ({items}:{items:{q:string,a:string}[]}){
  const [open, setOpen] = useState<number | null>(0)
  const columns = useMemo(
    () => [
      items.filter((_, index) => index % 2 === 0).map((item, order) => ({ ...item, index: order * 2 })),
      items.filter((_, index) => index % 2 === 1).map((item, order) => ({ ...item, index: order * 2 + 1 })),
    ],
    [items],
  )

  return (
    <div className="faq-grid">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="faq-column">
          {column.map((it) => {
            const isOpen = open === it.index

            return (
              <article key={it.index} className={`faq-card${isOpen ? ' is-open' : ''}`}>
                <button
                  onClick={()=>setOpen(isOpen ? null : it.index)}
                  className="faq-card__trigger"
                  type="button"
                >
                  <span className="faq-card__question">{it.q}</span>
                  <span className="faq-card__icon">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-card__answer">{it.a}</div>
                )}
              </article>
            )
          })}
        </div>
      ))}
    </div>
  )
}
