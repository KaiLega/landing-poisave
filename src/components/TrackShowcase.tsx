import React from 'react'

type TrackShowcaseProps = {
  variant?: 'bleed' | 'panel'
}

export default function TrackShowcase({ variant = 'bleed' }: TrackShowcaseProps) {
  return (
    <section className={`section goal-band goal-band--${variant}`}>
      <div className={`goal-band__inner goal-band__inner--${variant}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="goal-band__grid">
            <div className={`goal-band__device goal-band__device--${variant}`}>
              <img src="/img/intro/intro3.png" alt="Poisave collections on mobile" />
            </div>

            <div className={`goal-band__content goal-band__content--${variant}`}>
              <span className="section-kicker">One place, all your finds</span>
              <h2 className="heading">Track all your favorite places in one place</h2>
              <p className="section-lead">
                Use poisave as the layer between discovery and planning. Your next weekend list, city break or food map stays structured from the start.
              </p>

              <div className="goal-band__stores">
                <a href="#download" className="store store--soft">
                  <img
                    src="/img/apple/appstore-tra-white.png"
                    alt="Download on the App Store"
                  />
                </a>

                <a href="#download" className="store store--soft">
                  <img
                    src="/img/android/googleplay-tra-white.png"
                    alt="Get it on Google Play"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
