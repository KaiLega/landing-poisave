import React from 'react'
import { Link as LinkIcon, Layers, MapPin, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import Feature from './Feature'

export default function FeaturesOverviewSection() {
  return (
    <section className="section">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">Core features</span>
          <h2 className="heading">Save and organize places with PoiSave</h2>
          <p className="section-lead">Fast capture, smart dedupe, offline cache, and global maps.</p>
        </div>

        <div className="gap-6 grid md:grid-cols-2 xl:grid-cols-3 mt-10">
          <Feature title="One-tap capture" desc="Paste a link, PoiSave handles the rest." icon={<LinkIcon className="w-6 h-6" />} />
          <Feature title="Smart de-dup" desc="Avoid duplicate places automatically." icon={<Layers className="w-6 h-6" />} />
          <Feature title="Local-first by default" desc="Use the app locally, or sync your places with a Premium account." icon={<ShieldCheck className="w-6 h-6" />} />
          <Feature title="Works worldwide" desc="From Rome to Tokyo, it just works." icon={<MapPin className="w-6 h-6" />} />
          <Feature title="Clean design" desc="Beautiful, fast and modern interface." icon={<Sparkles className="w-6 h-6" />} />
          <Feature title="Automatic details" desc="Titles, categories, and more in seconds." icon={<Wand2 className="w-6 h-6" />} />
        </div>
      </div>
    </section>
  )
}
