import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Img from './Img'
import BeforeAfterSlider from './BeforeAfterSlider'
import { CATS, PROJECTS } from '../data/mockData'

export default function Portfolio() {
  const [f, setF] = useState('all'), [sel, setSel] = useState(null)
  const list = PROJECTS.filter(p => f === 'all' || p.c.includes(f))
  return (
    <section id="work" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5">
        <h2 className="text-3xl font-bold sm:text-4xl">أعمال نفخر بها</h2>
        <div className="mt-8 flex flex-wrap gap-2" role="tablist">{CATS.map(([k, l]) => <button key={k} role="tab" aria-selected={f === k} onClick={() => setF(k)} className={`rounded-full px-5 py-2 text-sm transition ${f === k ? 'bg-char text-white' : 'bg-sand hover:bg-sand/60'}`}>{l}</button>)}</div>
        <motion.div layout className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence>{list.map(p => (
            <motion.button layout key={p.id} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .95 }} onClick={() => setSel(p)} style={{ height: p.h }} className={`group relative mb-4 block w-full overflow-hidden rounded-2xl bg-char/10 text-start`}>
              <Img src={p.img} alt={p.t} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white transition group-hover:pb-7">{p.t}</span>
            </motion.button>))}</AnimatePresence>
        </motion.div>
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2"><h3 className="text-2xl font-semibold">من المساحة القديمة إلى الجديدة</h3><p className="mt-3 leading-7 text-char/60">اسحب المقبض الذهبي لترى التحول في صالة معيشة أعدنا تصميمها بالكامل خلال ستة أسابيع.</p></div>
          <div className="lg:col-span-3"><BeforeAfterSlider /></div>
        </div>
      </div>
      <AnimatePresence>{sel && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSel(null)} role="dialog" aria-modal="true" data-lenis-prevent className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-5">
          <motion.div initial={{ scale: .92 }} animate={{ scale: 1 }} exit={{ scale: .92 }} onClick={e => e.stopPropagation()} className="w-full max-w-3xl overflow-hidden rounded-2xl bg-sand">
            <Img src={sel.img} alt={sel.t} className="h-72 w-full object-cover sm:h-96" />
            <div className="flex items-center justify-between p-5"><div><h3 className="text-xl font-semibold">{sel.t}</h3><p className="text-sm text-char/60">{sel.desc}</p></div><button aria-label="إغلاق" onClick={() => setSel(null)}><X /></button></div>
          </motion.div>
        </motion.div>)}
      </AnimatePresence>
    </section>
  )
}
