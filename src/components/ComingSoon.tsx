import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Sparkles, Star } from 'lucide-react'

export default function ComingSoon(){
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState<{ id: number, x: number, y: number, angle: number, scale: number, opacity: number, size: number }[]>([])
  const frame = useRef<number>()
  const idRef = useRef(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (frame.current) cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY })
        const id = ++idRef.current
        const angle = Math.random() * 360
        const spread = Math.sqrt(Math.random()) * (50 + Math.random() * 80)
        const offsetX = Math.cos(angle * Math.PI / 180) * spread
        const offsetY = Math.sin(angle * Math.PI / 180) * spread
        const scale = 0.6 + Math.random() * 0.9
        const opacity = 0.5 + Math.random() * 0.5
        const size = 10 + Math.random() * 18
        setTrail(prev => [...prev.slice(-18), { id, x: e.clientX + offsetX, y: e.clientY + offsetY, angle, scale, opacity, size }])
        setTimeout(() => {
          setTrail(prev => prev.filter(item => item.id !== id))
        }, 700)
      })
    }
    window.addEventListener('pointermove', handle)
    return () => {
      window.removeEventListener('pointermove', handle)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-white flex flex-col coming-anim"
      style={{ ['--mx' as string]: `${pos.x}px`, ['--my' as string]: `${pos.y}px` }}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'radial-gradient(120px 120px at var(--mx) var(--my), rgba(255,255,255,0.16), transparent 65%)', transform: 'translateZ(0)' }}
      />
      <div className="pointer-events-none fixed inset-0 z-10">
        {trail.map(item => (
          <div
            key={item.id}
            className="cursor-star"
            style={{
              left: item.x,
              top: item.y,
              transform: `translate(-50%, -50%) rotate(${item.angle}deg)`,
              ['--s' as string]: item.scale,
              ['--o' as string]: item.opacity,
              width: `${item.size}px`,
              height: `${item.size}px`
            }}
          >
            <Star className="h-3 w-3" />
          </div>
        ))}
      </div>
      <header className="px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-lg font-semibold">
          <div className="h-11 w-11 rounded-2xl bg-white/15 flex items-center justify-center">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm uppercase tracking-[0.3em] text-white/70">PoiSave</span>
            <span>Coming Soon</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-sm text-white/80">
          <Sparkles className="h-4 w-4" />
          Stay tuned for the launch
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="max-w-3xl text-center space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
            <Sparkles className="h-4 w-4" />
            Soon on iOS & Android
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Stiamo arrivando con la nuova app</h1>
          <div className="flex justify-center">
            <img src="/img/poisave-logo-horizontal-light.png" alt="PoiSave" className="h-18 w-auto" />
          </div>
          
        </div>
      </main>
    </div>
  )
}
