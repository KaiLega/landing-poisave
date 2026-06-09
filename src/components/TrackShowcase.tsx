import React from 'react'
import SectionLink from './SectionLink'
import { useI18n } from '../i18n/I18nProvider'

type TrackShowcaseProps = {
  variant?: 'bleed' | 'panel'
}

export default function TrackShowcase({ variant = 'bleed' }: TrackShowcaseProps) {
  const { copy } = useI18n()
  const track = copy.home.track

  return (
    <section className={`section goal-band goal-band--${variant}`}>
      <div className={`goal-band__inner goal-band__inner--${variant}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="goal-band__grid">
            <div className={`goal-band__device goal-band__device--${variant}`}>
              <img src="/img/intro/intro3.png" alt={track.imageAlt} />
            </div>

            <div className={`goal-band__content goal-band__content--${variant}`}>
              <span className="section-kicker">{track.kicker}</span>
              <h2 className="heading">{track.title}</h2>
              <p className="section-lead">{track.lead}</p>

              <div className="goal-band__stores">
                <SectionLink sectionId="download" className="store store--soft">
                  <img
                    src="/img/apple/appstore-tra-white.png"
                    alt={copy.common.appStoreAlt}
                  />
                </SectionLink>

                <SectionLink sectionId="download" className="store store--soft">
                  <img
                    src="/img/android/googleplay-tra-white.png"
                    alt={copy.common.googlePlayAlt}
                  />
                </SectionLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
