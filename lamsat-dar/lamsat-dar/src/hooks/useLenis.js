import { useEffect } from 'react'
import Lenis from 'lenis'

/** Smooth page scroll. Also routes in-page #anchors through Lenis. Skipped for reduced motion. */
export default function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    let raf
    const loop = t => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]'), id = a?.getAttribute('href')
      const el = id && id.length > 1 && document.querySelector(id)
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -64 }) }
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy() }
  }, [])
}
