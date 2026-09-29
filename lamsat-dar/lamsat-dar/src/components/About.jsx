import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView, animate } from 'framer-motion'

function Counter({ to, prefix = '', suffix = '', label }) {
  const ref = useRef(null), inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => { if (inView) { const c = animate(0, to, { duration: 2, onUpdate: n => setV(Math.round(n)) }); return () => c.stop() } }, [inView, to])
  return <div ref={ref}><div className="text-5xl font-bold text-gold" dir="ltr">{prefix}{v}{suffix}</div><div className="mt-2 text-white/70">{label}</div></div>
}
export default function About() {
  const ref = useRef(null), [i, setI] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', p => setI(Math.min(2, Math.floor(p * 3))))
  const words = [['فخامة', 'خامات مختارة من أرقى الموردين، وتفاصيل تُشعرك بالفرق منذ اللمسة الأولى.'], ['عمليّة', 'كل مساحة مصممة لتخدم روتينك اليومي، فالجمال الحقيقي هو ما تعيش فيه براحة.'], ['دقّة للتفاصيل', 'من مقاس المقبض إلى زاوية الإضاءة، نراجع كل تفصيل قبل التنفيذ وبعده.']]
  return (
    <section id="about" ref={ref} className="relative h-[300vh] bg-char text-white">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-5">
        <div className="mx-auto w-full max-w-5xl">
          <p className="mb-6 text-white/50">نبذة عنا</p>
          <div className="flex gap-3 text-3xl font-bold sm:text-6xl">{['فخامة،', 'عمليّة،', 'ودقّة للتفاصيل'].map((w, k) => <motion.span key={k} animate={{ opacity: k === i ? 1 : .2, color: k === i ? '#C5A059' : '#fff' }} transition={{ duration: .5 }}>{w}</motion.span>)}</div>
          <AnimatePresence mode="wait"><motion.p key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-8 max-w-xl text-lg leading-8 text-white/75">{words[i][1]}</motion.p></AnimatePresence>
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            <Counter to={150} prefix="+" label="مشروع مكتمل" /><Counter to={99} suffix="%" label="نسبة الرضا" /><Counter to={8} prefix="+" label="سنوات خبرة" />
          </div>
        </div>
      </div>
    </section>
  )
}
