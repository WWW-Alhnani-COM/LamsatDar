import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'
import { SERVICES } from '../data/mockData'
import { btnGold, gold } from '../lib/ui'

export default function Services({ onBook }) {
  const [open, setOpen] = useState('design')
  return (
    <section id="services" className="mx-auto max-w-7xl px-5 py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">خدمات تغطي رحلة بيتك كاملة</h2>
      <p className="mt-3 max-w-lg text-char/60">اختر خدمة واحدة أو اجمعها في باقة. الأسعار تبدأ من الأرقام التالية وتُحدد نهائيًا بعد المعاينة.</p>
      <div className="mt-12 grid gap-4 lg:grid-cols-4">
        {SERVICES.map(s => { const on = open === s.id, Icon = s.icon; return (
          <motion.div layout key={s.id} onClick={() => setOpen(s.id)} className={`cursor-pointer rounded-2xl p-6 transition-colors ${on ? 'bg-char text-white lg:col-span-2' : 'bg-white hover:bg-white/70'}`}>
            <div className="flex items-start justify-between"><Icon className={on ? 'text-gold' : 'text-char/70'} size={28} /><span className={`text-sm ${on ? 'text-gold' : 'text-char/50'}`}>يبدأ من {s.price} ر.س</span></div>
            <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
            <AnimatePresence>{on && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <p className="mt-3 leading-7 text-white/70">{s.text}</p>
                <ul className="mt-4 space-y-2">{s.items.map(it => <li key={it} className="flex items-center gap-2 text-sm"><Check size={16} className={gold} />{it}</li>)}</ul>
                <button onClick={() => onBook(s.id)} className={`${btnGold} mt-6`}>اطلب هذه الخدمة</button>
              </motion.div>)}
            </AnimatePresence>
          </motion.div>) })}
      </div>
    </section>
  )
}
