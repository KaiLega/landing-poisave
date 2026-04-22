import React, { useState } from 'react'

type Step = {
  index: string
  title: string
  description: string
  image: string
  alt: string
}

export default function HowItWorksSection({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const activeStep = steps[active] ?? steps[0]

  return (
    <section id="how" className="section section-flatgrey">
      <div className="mx-auto max-w-6xl px-4">
        <div className="how-it-works">
          <div className="how-it-works__content">
            <span className="section-kicker">How it works</span>
            <h2 className="heading">Paste a link, refine the details, and keep the place on your map.</h2>
            <p className="section-lead">
              Move from a social post to a saved place in three quick steps, without losing the useful details along the way.
            </p>

            <div className="how-it-works__steps">
              {steps.map((step, index) => {
                const isActive = active === index

                return (
                  <button
                    key={step.index}
                    type="button"
                    className={`how-step${isActive ? ' is-active' : ''}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                  >
                    <span className="how-step__index">{step.index}</span>
                    <span className="how-step__body">
                      <span className="how-step__title">{step.title}</span>
                      <span className="how-step__description">{step.description}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="how-it-works__visual">
            <div className="how-it-works__frame">
              <img src={activeStep.image} alt={activeStep.alt} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
