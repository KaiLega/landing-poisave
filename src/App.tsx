import React from 'react'
import { MapPin, Link as LinkIcon, Layers, ShieldCheck, Sparkles, Wand2 } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import Feature from './components/Feature'
import FAQ from './components/FAQ'

export default function App(){
  return (
    <div className="font-display">
      <Header />

      {/* HERO */}
      <section className="hero-grad pt-28 md:pt-36 pb-16 border-b border-black/5">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="heading">Turn social posts into map pins.</h1>
            <p className="mt-4 subtle text-lg">Paste a link from Instagram or TikTok and save it to your personal map. iOS and Android.</p>
            <div className="mt-8 flex gap-3">
              <a className="btn btn-primary" href="#download">Get the app</a>
              <a className="btn btn-outline" href="#how">See how it works</a>
            </div>
          </div>
          <div className="relative">
            <div className="card p-2">
              <img className="rounded-2xl w-full h-auto" src="/img/example.png" alt="poisave app" />
            </div>
            <div className="absolute -bottom-6 -right-4 rotate-2">
              <div className="card flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Pin saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="heading">Everything you need</h2>
            <p className="mt-3 subtle">Fast capture, smart dedupe, offline cache, and global maps.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature title="One-tap capture" desc="Paste a link, we handle the rest." icon={<LinkIcon className="h-6 w-6" />} />
            <Feature title="Smart de-dup" desc="Avoid duplicate places automatically." icon={<Layers className="h-6 w-6" />} />
            <Feature title="Private by default" desc="Your data stays on your device." icon={<ShieldCheck className="h-6 w-6" />} />
            <Feature title="Works worldwide" desc="From Rome to Tokyo, it just works." icon={<MapPin className="h-6 w-6" />} />
            <Feature title="Clean design" desc="Beautiful, modern interface." icon={<Sparkles className="h-6 w-6" />} />
            <Feature title="Automatic details" desc="Titles, categories, and more in seconds." icon={<Wand2 className="h-6 w-6" />} />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="heading">How it works</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="card">
              <span className="text-slate-400 font-semibold">1</span>
              <p className="mt-1">Paste a social post URL</p>
            </div>
            <div className="card">
              <span className="text-slate-400 font-semibold">2</span>
              <p className="mt-1">Edit details if you want</p>
            </div>
            <div className="card">
              <span className="text-slate-400 font-semibold">3</span>
              <p className="mt-1">Save to your map</p>
            </div>
          </div>
        </div>
      </section>

      {/* SCREENS */}
      <section id="screens" className="section">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="heading">Screens</h2>
            <p className="mt-3 subtle">A quick peek at the app UI.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <img className="card" src="/img/screen1.png" alt="" />
            <img className="card" src="/img/screen2.png" alt="" />
            <img className="card" src="/img/screen3.png" alt="" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section bg-slate-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="heading">FAQ</h2>
          </div>
          <div className="mt-10">
            <FAQ items={[
              {q:'Is it free?', a:'Yes, the core app is free. We may add pro features later.'},
              {q:'Does it work offline?', a:'Your saved places are cached. You can view them without a connection.'},
              {q:'Which platforms are supported?', a:'iOS and Android.'},
              {q:'How do I report an issue?', a:'Send feedback from the app settings.'},
            ]}/>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" className="section">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="heading">Get poisave</h2>
            <p className="mt-3 subtle">App Store and Google Play listings coming soon.</p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6">
            <img
              src="/img/apple/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
              className="h-14 md:h-16"
              alt="Download on the App Store"
            />
            <img
              src="/img/android/GetItOnGooglePlay_Badge_Web_color_English.svg"
              className="h-14 md:h-16"
              alt="Get it on Google Play"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
