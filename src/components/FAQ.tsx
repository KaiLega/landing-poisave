import React, { useState } from 'react'

export default function FAQ({items}:{items:{q:string,a:string}[]}){
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="border border-black/10 rounded-2xl overflow-hidden">
          <button onClick={()=>setOpen(open===i?null:i)} className="w-full text-left px-5 py-4 font-medium bg-white">
            {it.q}
          </button>
          {open===i && (
            <div className="px-5 pb-5 text-slate-600">{it.a}</div>
          )}
        </div>
      ))}
    </div>
  )
}