import React from 'react'
import { Link as LinkIcon, Layers, MapPin, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import Feature from './Feature'

export default function FeaturesOverviewSection() {
  return (
    <section className="section">
      <div className="mx-auto px-4 max-w-6xl">
        <div className="section-copy section-copy--center">
          <span className="section-kicker">Everything you need</span>
          <h2 className="heading">Everything you need</h2>
          <p className="section-lead">Fast capture, smart dedupe, offline cache, and global maps.</p>
        </div>

        <div className="gap-6 grid md:grid-cols-2 xl:grid-cols-3 mt-10">
          <Feature title="One-tap capture" desc="Paste a link, we handle the rest." icon={<LinkIcon className="w-6 h-6" />} />
          <Feature title="Smart de-dup" desc="Avoid duplicate places automatically." icon={<Layers className="w-6 h-6" />} />
          <Feature title="Private by default" desc="Your data stays on your device." icon={<ShieldCheck className="w-6 h-6" />} />
          <Feature title="Works worldwide" desc="From Rome to Tokyo, it just works." icon={<MapPin className="w-6 h-6" />} />
          <Feature title="Clean design" desc="Beautiful, modern interface." icon={<Sparkles className="w-6 h-6" />} />
          <Feature title="Automatic details" desc="Titles, categories, and more in seconds." icon={<Wand2 className="w-6 h-6" />} />
        </div>
      </div>
    </section>
  )
}
