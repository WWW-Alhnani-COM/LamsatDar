import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { AREAS } from '../data/mockData'

export default function ServiceAreas() {
  return (
    <section id="areas" className="mx-auto max-w-7xl px-5 pb-24">
      <h2 className="text-3xl font-bold sm:text-4xl">مناطق الخدمة</h2>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">{AREAS.map(a => <motion.div whileHover={{ y: -4 }} key={a} className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-white p-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold"><MapPin size={18} /></span>{a}</motion.div>)}</div>
    </section>
  )
}
