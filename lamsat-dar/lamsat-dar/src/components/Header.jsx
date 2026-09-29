import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NAV } from '../data/mockData'
import { btnGold, gold } from '../lib/ui'

export default function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-char/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#home" className="text-lg font-semibold text-white">لمسة دار <span className={`${gold} text-sm font-light`}>| Lamsat Dar</span></a>
        <nav className="hidden gap-7 lg:flex">{NAV.map(([l, h]) => <a key={h} href={h} className="text-sm text-white/70 transition hover:text-gold">{l}</a>)}</nav>
        <button onClick={onBook} className={`${btnGold} hidden lg:inline-flex`}>احجز استشارتك</button>
        <button aria-label="القائمة" className="text-white lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
      </div>
      <AnimatePresence>{open && (
        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: .35 }} data-lenis-prevent className="fixed inset-y-0 end-0 start-0 z-50 flex h-screen flex-col bg-char p-6 lg:hidden" style={{ insetInlineStart: 0 }}>
          <button aria-label="إغلاق" className="self-start text-white" onClick={() => setOpen(false)}><X /></button>
          <nav className="mt-10 flex flex-col gap-6">{NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="text-2xl text-white">{l}</a>)}</nav>
          <button onClick={() => { setOpen(false); onBook() }} className={`${btnGold} mt-auto`}>احجز استشارتك</button>
        </motion.div>)}
      </AnimatePresence>
    </header>
  )
}
