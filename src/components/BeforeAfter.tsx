import { useId, useState } from 'react';
type Props = { before: string; after: string; beforeSrcSet?: string; afterSrcSet?: string; alt: string };
export default function BeforeAfter({ before, after, beforeSrcSet, afterSrcSet, alt }: Props) {
  const [position, setPosition] = useState(50); const id = useId();
  return <div className="comparison"><img src={after} srcSet={afterSrcSet} sizes="(max-width: 540px) 86vw, 640px" width="960" height="1707" alt={`${alt}, depois`} loading="lazy" decoding="async"/><img className="comparison-before" src={before} srcSet={beforeSrcSet} sizes="(max-width: 540px) 86vw, 640px" width="960" height="1707" alt={`${alt}, antes`} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }} loading="lazy" decoding="async"/><div className="comparison-line" style={{ left: `${position}%` }}><span>↔</span></div><div className="comparison-labels"><span>Antes</span><span>Depois</span></div><label className="sr-only" htmlFor={id}>Comparar antes e depois</label><input id={id} type="range" min="0" max="100" value={position} aria-valuetext={`${position}% da imagem de antes visível`} onChange={e => setPosition(Number(e.target.value))}/></div>;
}
