import { Ruler, Sofa, Hammer, Sparkles } from 'lucide-react'

// Unsplash helper: pass a photo id. Swap ids freely; <Img> falls back to a gradient if a URL fails.
const u = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const HERO = { room: u('photo-1618221195710-dd6b41faaea6', 1600) }
export const BEFORE_AFTER = { after: u('photo-1616486338812-3dadae4b4ace', 1600), before: u('photo-1616486338812-3dadae4b4ace', 1600) }
export const OFFER = {
  badge: 'عرض خاص',
  title: 'خصم 20% على التصميم الداخلي عند التعاقد على التشطيب',
  durationMs: ((2 * 24 + 14) * 60 + 35) * 60000,
  img: u('photo-1600566753086-00f18fb6b3ea', 1600),
}
export const NAV = [['الرئيسية', '#home'], ['نبذة عنا', '#about'], ['الخدمات', '#services'], ['الأعمال', '#work'], ['العروض', '#offers'], ['مناطق الخدمة', '#areas']]
export const SERVICES = [
  { id: 'design', icon: Ruler, title: 'تصميم داخلي', price: '4,500', text: 'مخططات ومجسمات ثلاثية الأبعاد تترجم ذوقك إلى مساحة متكاملة.', items: ['مجسمات 3D واقعية', 'لوحة خامات وألوان', 'مخططات تنفيذية'] },
  { id: 'finish', icon: Hammer, title: 'تشطيبات فاخرة', price: '950', text: 'تنفيذ دقيق بأيدي فنيين مدرّبين وإشراف هندسي يومي.', items: ['أعمال جبس ودهانات', 'أرضيات ورخام', 'ضمان على التنفيذ'] },
  { id: 'furnish', icon: Sofa, title: 'تأثيث وديكور', price: '3,000', text: 'قطع مختارة بعناية تكمل شخصية المكان وتناسب ميزانيتك.', items: ['اختيار الأثاث والإضاءة', 'ستائر وسجاد', 'تركيب وتنسيق نهائي'] },
  { id: 'consult', icon: Sparkles, title: 'استشارات هندسية', price: '350', text: 'جلسة مع مهندس معماري لمراجعة الفكرة والميزانية قبل البدء.', items: ['زيارة موقع أو جلسة عن بُعد', 'تقرير مكتوب', 'تقدير أولي للتكلفة'] },
]
export const CATS = [['all', 'الكل'], ['sakan', 'سكني'], ['commercial', 'تجاري'], ['modern', 'مودرن'], ['classic', 'كلاسيك']]
export const AREAS = ['الرياض', 'جدة', 'الشرقية', 'مكة المكرمة', 'المدينة المنورة', 'القصيم', 'أبها', 'تبوك']
export const SLOTS = ['09:00 ص', '11:00 ص', '01:00 م', '04:00 م', '06:00 م']

export const PROJECTS = [
  { id: 1, t: 'فيلا الياسمين', c: ['sakan', 'modern'], h: 320, img: u('photo-1618221195710-dd6b41faaea6'), desc: 'فيلا سكنية بلمسات مودرن دافئة — الرياض' },
  { id: 2, t: 'مكتب أفق', c: ['commercial', 'modern'], h: 240, img: u('photo-1497366216548-37526070297c'), desc: 'مقر شركة بمساحات عمل مفتوحة — جدة' },
  { id: 3, t: 'مجلس النخيل', c: ['sakan', 'classic'], h: 280, img: u('photo-1616486338812-3dadae4b4ace'), desc: 'مجلس بطابع كلاسيكي وتفاصيل ذهبية — القصيم' },
  { id: 4, t: 'مطعم دار الشام', c: ['commercial', 'classic'], h: 340, img: u('photo-1414235077428-338989a2e8c0'), desc: 'مطعم بأجواء دافئة وإضاءة مدروسة — الشرقية' },
  { id: 5, t: 'شقة الواحة', c: ['sakan', 'modern'], h: 230, img: u('photo-1502672260266-1c1ef2d93688'), desc: 'شقة عصرية بألوان هادئة — الرياض' },
  { id: 6, t: 'مطبخ الرخام', c: ['sakan', 'modern'], h: 300, img: u('photo-1556228453-efd6c1ff04f6'), desc: 'مطبخ بجزيرة رخامية وخزائن مخصصة — جدة' },
  { id: 7, t: 'جناح النوم الرئيسي', c: ['sakan', 'classic'], h: 260, img: u('photo-1631679706909-1844bbd07221'), desc: 'غرفة نوم فاخرة بخامات طبيعية — مكة المكرمة' },
  { id: 8, t: 'مساحة عمل لوكس', c: ['commercial', 'modern'], h: 320, img: u('photo-1497366811353-6870744d04b2'), desc: 'استوديو إبداعي بتصميم مفتوح — الرياض' },
]
