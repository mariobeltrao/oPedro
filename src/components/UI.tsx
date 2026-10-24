import { motion } from 'motion/react';
import type { ReactNode } from 'react';
export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .7 }}>{children}</motion.div>;
}
export function Label({ number, children }: { number: string; children: ReactNode }) {
  return <div className="section-label"><span>{number} /</span>{children}</div>;
}
export function Media({ src, alt, className = '', label = 'Fotografia a adicionar', srcSet, sizes = '(max-width: 540px) 86vw, (max-width: 800px) 42vw, 40vw', width, height, position }: { src?: string; alt: string; className?: string; label?: string; srcSet?: string; sizes?: string; width?: number; height?: number; position?: string }) {
  return src ? <img className={`media ${className}`} src={src} alt={alt} srcSet={srcSet} sizes={srcSet ? sizes : undefined} width={width} height={height} style={position ? { objectPosition: position } : undefined} loading="lazy" decoding="async" /> : <div className={`media media-placeholder ${className}`} role="img" aria-label={`${alt} — material pendente`}><div className="placeholder-cross">+</div><span>{label}</span><small>Material original pendente</small></div>;
}
export function Arrow() { return <span aria-hidden="true">↗</span>; }
