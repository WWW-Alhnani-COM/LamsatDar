import { useState, useEffect } from 'react'
import Img from './Img'
import { OFFER } from '../data/mockData'
import { btnGold } from '../lib/ui'

export default function Offers({ onBook }) {
  const [end] = useState(() => Date.now() + OFFER.durationMs), [left, setLeft] = useState(end - Date.now())
  useEffect(() => { const t = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000); return () => clearInterval(t) }, [end])
  const p = n => String(n).padStart(2, '0'), d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24, m = Math.floor(left / 6e4) % 60, s = Math.floor(left / 1e3) % 60
  return (
    <section id="offers" className="mx-auto max-w-7xl px-5 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-char p-8 text-white sm:p-14">
        <Img src={OFFER.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" /><div className="absolute -start-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <span className="relative rounded-full bg-gold px-4 py-1 text-sm font-medium text-char">{OFFER.badge}</span>
        <h2 className="relative mt-6 max-w-xl text-3xl font-bold leading-snug sm:text-5xl">{OFFER.title}</h2>
        <p className="relative mt-4 text-white/70">ينتهي العرض خلال:</p>
        <div className="relative mt-3 flex gap-3" dir="ltr">{[[d, 'يوم'], [h, 'ساعة'], [m, 'دقيقة'], [s, 'ثانية']].map(([v, l]) => <div key={l} className="w-20 rounded-xl border border-white/15 bg-white/5 py-3 text-center"><div className="text-3xl font-semibold text-gold">{p(v)}</div><div className="text-xs text-white/60">{l}</div></div>)}</div>
        <button onClick={onBook} className={`${btnGold} relative mt-8`}>استفد من العرض الآن</button>
      </div>
    </section>
  )
}
