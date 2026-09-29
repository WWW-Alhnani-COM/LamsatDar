import { useState } from 'react'

/** <img> with lazy loading and a gradient fallback when the URL fails. */
export default function Img({ src, alt = '', className = '', ...rest }) {
  const [bad, setBad] = useState(false)
  if (bad) return <div role="img" aria-label={alt} className={`${className} bg-gradient-to-br from-[#3a352d] to-[#8c7647]`} />
  return <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setBad(true)} className={className} {...rest} />
}
