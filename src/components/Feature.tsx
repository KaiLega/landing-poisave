import React from 'react'

export default function Feature({title, desc, icon}:{title:string, desc:string, icon:React.ReactNode}){
  return (
    <div className="card h-full">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-accent-500 to-brand-500 text-white">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-slate-600">{desc}</p>
        </div>
      </div>
    </div>
  )
}