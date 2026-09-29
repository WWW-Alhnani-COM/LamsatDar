import { useState, useRef, useCallback } from 'react'
import { GripVertical } from 'lucide-react'
import Img from './Img'
import { BEFORE_AFTER } from '../data/mockData'

export default function BeforeAfterSlider() {
  const box = useRef(null), [pos, setPos] = useState(50)
  const move = useCallback(x => { const r = box.current.getBoundingClientRect(); setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))) }, [])
  const down = e => { e.currentTarget.setPointerCapture(e.pointerId); move(e.clientX) }
  return (
    <div ref={box} dir="ltr" onPointerDown={down} onPointerMove={e => e.buttons && move(e.clientX)} className="relative h-72 cursor-ew-resize select-none overflow-hidden rounded-2xl sm:h-[420px]" style={{ touchAction: 'pan-y' }}>
      <div className="absolute inset-0 flex items-end p-4"><Img src={BEFORE_AFTER.after} alt="بعد التنفيذ" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" /><span className="relative rounded-full bg-char/80 px-3 py-1 text-xs text-white">بعد</span></div>
      <div className="absolute inset-0 flex items-end p-4" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}><Img src={BEFORE_AFTER.before} alt="قبل التنفيذ" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale brightness-[.55] contrast-90" /><span className="relative rounded-full bg-white/90 px-3 py-1 text-xs">قبل</span></div>
      <div className="absolute inset-y-0 w-0.5 bg-gold" style={{ left: `${pos}%` }}>
        <button role="slider" aria-label="مقارنة قبل وبعد" aria-valuenow={Math.round(pos)} aria-valuemin={0} aria-valuemax={100} onKeyDown={e => { if (e.key === 'ArrowLeft') setPos(p => Math.max(0, p - 4)); if (e.key === 'ArrowRight') setPos(p => Math.min(100, p + 4)) }} className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-char shadow-lg"><GripVertical size={20} /></button>
      </div>
    </div>
  )
}
