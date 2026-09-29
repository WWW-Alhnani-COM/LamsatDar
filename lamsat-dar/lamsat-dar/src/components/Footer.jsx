import { Phone, Clock, MapPin, MessageCircle } from 'lucide-react'
import { NAV } from '../data/mockData'
import { gold } from '../lib/ui'

export default function Footer() {
  const wa = import.meta.env.VITE_WHATSAPP || '966500000000'
  return (<>
    <footer className="bg-[#141311] px-5 pb-8 pt-16 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
        <div><div className="text-xl font-semibold text-white">لمسة دار</div><p className="mt-3 max-w-xs leading-7">تصميم وتنفيذ وتأثيث بمعايير فاخرة في أنحاء المملكة.</p></div>
        <div><h4 className="mb-3 text-white">روابط سريعة</h4><ul className="space-y-2">{NAV.map(([l, h]) => <li key={h}><a href={h} className="hover:text-gold">{l}</a></li>)}</ul></div>
        <div className="space-y-3"><h4 className="text-white">تواصل معنا</h4><p className="flex items-center gap-2"><Phone size={16} className={gold} /><span dir="ltr">+966 50 000 0000</span></p><p className="flex items-center gap-2"><Clock size={16} className={gold} />السبت – الخميس: 9 ص – 9 م</p><p className="flex items-center gap-2"><MapPin size={16} className={gold} />الرياض، المملكة العربية السعودية</p></div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-sm">© {new Date().getFullYear()} لمسة دار. جميع الحقوق محفوظة.</p>
    </footer>
    <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer" aria-label="واتساب" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl">
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-60" /><MessageCircle className="relative" />
    </a>
  </>)
}
