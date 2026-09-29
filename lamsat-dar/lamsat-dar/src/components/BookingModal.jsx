import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, UploadCloud, X, ArrowLeft, ArrowRight } from 'lucide-react'
import { SERVICES, SLOTS, AREAS } from '../data/mockData'
import { btnGold, gold } from '../lib/ui'

const STEPS = ['الخدمة', 'الموعد والتفاصيل', 'بيانات المكان', 'البيانات الشخصية']
function Wizard({ preset, onClose }) {
  const [step, setStep] = useState(0), [done, setDone] = useState(false), [err, setErr] = useState('')
  const [f, setF] = useState({ service: preset || '', date: '', slot: '', notes: '', files: [], name: '', phone: '', city: '' })
  const [drag, setDrag] = useState(false)
  useEffect(() => { const k = e => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  useEffect(() => { if (preset) setF(x => ({ ...x, service: preset })) }, [preset])
  const days = Array.from({ length: 14 }, (_, k) => { const d = new Date(); d.setDate(d.getDate() + k + 1); return d })
  const set = (k, v) => { setF(x => ({ ...x, [k]: v })); setErr('') }
  const addFiles = list => set('files', [...f.files, ...Array.from(list)].slice(0, 8))
  const valid = [f.service, f.date && f.slot, true, f.name.trim() && /^[0-9+\s]{9,15}$/.test(f.phone) && f.city][step]
  const next = async () => {
    if (!valid) return setErr(['اختر الخدمة للمتابعة', 'اختر التاريخ والوقت للمتابعة', '', 'أدخل الاسم ورقم جوال صحيح والمدينة'][step])
    if (step < 3) return setStep(step + 1)
    const ep = import.meta.env.VITE_BOOKING_ENDPOINT
    if (ep) try { await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, files: f.files.map(x => x.name) }) }) } catch { return setErr('تعذّر الإرسال، حاول مرة أخرى') }
    setDone(true)
  }
  const inp = 'w-full rounded-xl border border-char/15 bg-white px-4 py-3 outline-none focus:border-gold'
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label="حجز استشارة" data-lenis-prevent className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 30, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30 }} onClick={e => e.stopPropagation()} className="relative my-auto w-full max-w-2xl rounded-3xl bg-sand p-6 text-char sm:p-8">
        <button aria-label="إغلاق" onClick={onClose} className="absolute end-5 top-5"><X /></button>
        <h2 className="text-2xl font-bold sm:text-3xl">احجز استشارتك</h2>
        {done ? (
          <div className="mt-8 rounded-3xl bg-white p-10 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold text-char"><Check size={32} /></div><h3 className="mt-6 text-2xl font-semibold">تم استلام طلبك يا {f.name}</h3><p className="mt-2 text-char/70">سنتواصل معك على {f.phone} لتأكيد موعد {f.date} خلال ساعات.</p><button onClick={onClose} className={`${btnGold} mt-6`}>إغلاق</button></div>
        ) : (<>
          <ol className="mt-8 flex gap-2">{STEPS.map((s, k) => <li key={s} className="flex-1"><div className={`h-1 rounded-full ${k <= step ? 'bg-gold' : 'bg-char/15'}`} /><span className={`mt-2 block text-xs sm:text-sm ${k === step ? 'text-gold' : 'text-char/50'}`}>{s}</span></li>)}</ol>
          <div className="mt-6">
            <AnimatePresence mode="wait"><motion.div key={step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: .25 }}>
              {step === 0 && <div className="grid gap-3 sm:grid-cols-2">{SERVICES.map(s => { const Icon = s.icon, on = f.service === s.id; return <button key={s.id} onClick={() => set('service', s.id)} className={`flex items-center gap-3 rounded-2xl border p-4 text-start transition ${on ? 'border-gold bg-white shadow-md' : 'border-char/10 bg-white/60 hover:border-gold/50'}`}><Icon className={gold} /><span className="flex-1 font-medium">{s.title}</span>{on && <Check size={18} className={gold} />}</button> })}</div>}
              {step === 1 && <div><div className="flex gap-2 overflow-x-auto pb-2">{days.map(d => { const v = d.toISOString().slice(0, 10), on = f.date === v; return <button key={v} onClick={() => set('date', v)} className={`min-w-[72px] rounded-2xl border p-3 text-center transition ${on ? 'border-gold bg-char text-white' : 'border-char/10 bg-white'}`}><div className="text-xs opacity-70">{d.toLocaleDateString('ar-SA', { weekday: 'short' })}</div><div className="text-xl font-semibold">{d.toLocaleDateString('ar-SA', { day: 'numeric' })}</div><div className="text-xs opacity-70">{d.toLocaleDateString('ar-SA', { month: 'short' })}</div></button> })}</div>
                <div className="mt-5 flex flex-wrap gap-2">{SLOTS.map(t => <button key={t} onClick={() => set('slot', t)} className={`rounded-full border px-4 py-2 text-sm transition ${f.slot === t ? 'border-gold bg-gold text-char' : 'border-char/15 bg-white'}`}>{t}</button>)}</div></div>}
              {step === 2 && <div><label onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={e => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files) }} className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed p-10 text-center transition ${drag ? 'border-gold bg-gold/10' : 'border-char/20 bg-white'}`}><UploadCloud className={gold} size={32} /><span>اسحب صور المكان أو المخططات هنا، أو اضغط للاختيار</span><input type="file" multiple accept="image/*,.pdf" className="sr-only" onChange={e => addFiles(e.target.files)} /></label>
                {f.files.length > 0 && <ul className="mt-3 space-y-1 text-sm">{f.files.map((x, k) => <li key={k} className="flex items-center justify-between rounded-lg bg-white px-3 py-2"><span className="truncate">{x.name}</span><button aria-label="حذف" onClick={() => set('files', f.files.filter((_, j) => j !== k))}><X size={16} /></button></li>)}</ul>}
                <textarea value={f.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="ملاحظات: المساحة، الميزانية، الأسلوب المفضل..." className={`${inp} mt-4`} /></div>}
              {step === 3 && <div className="grid gap-3 sm:grid-cols-2"><input className={inp} placeholder="الاسم الكامل" value={f.name} onChange={e => set('name', e.target.value)} /><input className={inp} dir="ltr" inputMode="tel" placeholder="05xxxxxxxx" value={f.phone} onChange={e => set('phone', e.target.value)} /><select className={`${inp} sm:col-span-2`} value={f.city} onChange={e => set('city', e.target.value)}><option value="">اختر المدينة</option>{AREAS.map(a => <option key={a}>{a}</option>)}</select></div>}
            </motion.div></AnimatePresence>
            {err && <p role="alert" className="mt-4 text-sm text-red-700">{err}</p>}
            <div className="mt-8 flex justify-between"><button disabled={!step} onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm disabled:opacity-30"><ArrowRight size={16} />السابق</button><button onClick={next} className={btnGold}>{step === 3 ? 'تأكيد الحجز' : 'التالي'}{step < 3 && <ArrowLeft size={16} />}</button></div>
          </div>
        </>)}
      </motion.div>
    </motion.div>
  )
}


export default function BookingModal({ open, preset, onClose }) {
  return <AnimatePresence>{open && <Wizard key="wizard" preset={preset} onClose={onClose} />}</AnimatePresence>
}
