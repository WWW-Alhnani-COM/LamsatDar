import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Img from './Img'
import { HERO } from '../data/mockData'
import { btnGold, gold } from '../lib/ui'

// Room dimensions (px). The room is a real CSS-3D box seen from its open front:
// the mouse orbits the camera, scrolling dollies it deeper into the room.
const W = 620, H = 460, D = 560
const wall = 'absolute overflow-hidden'

export default function Hero({ onBook }) {
  const ref = useRef(null)
  const calm = useReducedMotion()
  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const rotY = useTransform(mx, v => v * 26)
  const rotX = useTransform(my, v => -v * 14)
  const dolly = useTransform(scrollYProgress, [0, 1], [0, calm ? 0 : 330])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const fade = useTransform(scrollYProgress, [0, .7], [1, 0])
  const glowX = useTransform(mx, v => `${50 + v * 30}%`)

  const onMove = e => {
    if (calm) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - .5)
    my.set((e.clientY - r.top) / r.height - .5)
  }

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative min-h-screen overflow-hidden bg-char pt-28 text-white">
      <motion.div style={{ left: glowX }} className="pointer-events-none absolute top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9 }} className="text-4xl font-bold leading-[1.35] sm:text-6xl">نحسّن أسلوب حياتك.. <br />بلمسة دار</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5, duration: .9 }} className="mt-6 max-w-md text-lg leading-8 text-white/70">تصاميم وديكورات تفوق الخيال مع تنفيذ احترافي ودقة في التفاصيل.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .9 }} className="mt-8 flex gap-3">
            <button onClick={onBook} className={btnGold}>احجز استشارتك</button>
            <a href="#work" className="rounded-full border border-white/25 px-6 py-3 text-sm transition hover:border-gold hover:text-gold">شاهد أعمالنا</a>
          </motion.div>
        </motion.div>

        <div aria-hidden className="relative h-[380px] overflow-hidden rounded-[2rem] border border-gold/30 lg:h-[540px]" style={{ perspective: 900 }}>
          <div className="absolute inset-0 origin-center scale-[.6] sm:scale-100" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div style={{ width: W, height: H, left: '50%', top: '50%', marginLeft: -W / 2, marginTop: -H / 2, position: 'absolute', transformStyle: 'preserve-3d', originX: .5, originY: .5, originZ: -D / 2, rotateX: rotX, rotateY: rotY, z: dolly }}>
              {/* back wall (photo) */}
              <div className={wall} style={{ width: W, height: H, transform: `translateZ(${-D}px)` }}>
                <Img src={HERO.room} alt="" loading="eager" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-char/60 via-transparent to-char/30" />
              </div>
              {/* floor / ceiling / side walls */}
              <div className={wall} style={{ width: W, height: D, left: 0, top: H - D / 2, transform: `translateZ(${-D / 2}px) rotateX(90deg)`, background: 'repeating-linear-gradient(90deg,#4a3a29 0 58px,#3b2d20 58px 60px)' }} />
              <div className={wall} style={{ width: W, height: D, left: 0, top: -D / 2, transform: `translateZ(${-D / 2}px) rotateX(-90deg)`, background: 'linear-gradient(#1f1e1b,#2b2924)' }} />
              <div className={wall} style={{ width: D, height: H, left: -D / 2, top: 0, transform: `translateZ(${-D / 2}px) rotateY(90deg)`, background: 'linear-gradient(90deg,#26241f,#3a352d)' }} />
              <div className={wall} style={{ width: D, height: H, left: W - D / 2, top: 0, transform: `translateZ(${-D / 2}px) rotateY(-90deg)`, background: 'linear-gradient(270deg,#26241f,#3a352d)' }} />
              {/* floating pendant lamp — sits mid-room for real depth parallax */}
              <div className="absolute" style={{ left: W * .55, top: 0, transform: 'translateZ(-260px)' }}>
                <div className="mx-auto h-40 w-px bg-gold/60" />
                <div className="h-10 w-10 -translate-x-[19px] rounded-full bg-gold shadow-[0_0_60px_20px_rgba(197,160,89,.55)]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.a href="#about" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} aria-label="انتقل للأسفل" className={`absolute bottom-6 left-1/2 -translate-x-1/2 ${gold}`}><ChevronDown size={32} /></motion.a>
    </section>
  )
}
