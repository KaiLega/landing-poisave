import React from 'react'
import { Link as LinkIcon, Layers, MapPin, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import Feature from './Feature'
import { useI18n } from '../i18n/I18nProvider'

const icons = [
  <LinkIcon className="w-6 h-6" />,
  <Layers className="w-6 h-6" />,
  <ShieldCheck className="w-6 h-6" />,
  <MapPin className="w-6 h-6" />,
  <Sparkles className="w-6 h-6" />,
  <Wand2 className="w-6 h-6" />,
]

export default function FeaturesOverviewSection() {
  const { copy } = useI18n()
  const features = copy.home.features

  return (
    <section id="features" className="section">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">{features.kicker}</span>
          <h2 className="heading">{features.title}</h2>
          <p className="section-lead">{features.lead}</p>
        </div>

        <div className="gap-6 grid md:grid-cols-2 xl:grid-cols-3 mt-10">
          {features.items.map((item, index) => (
            <Feature key={item.title} title={item.title} desc={item.desc} icon={icons[index]} />
          ))}
        </div>
      </div>
    </section>
  )
}
