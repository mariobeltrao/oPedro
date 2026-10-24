import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { navigation } from '../data/content';
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (e.key === 'Tab') {
        const elements = [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
        const first = elements[0], last = elements[elements.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const resize = () => { if (window.innerWidth > 800) setOpen(false); };
    window.addEventListener('keydown', key); window.addEventListener('resize', resize);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key); window.removeEventListener('resize', resize); };
  }, [open]);
  return <header className="header"><a className="wordmark" href="#inicio" aria-label="OPedro, início">o<span>Pedro</span><sup>JP</sup></a><nav className="desktop-nav" aria-label="Principal">{navigation.map(([name, id]) => <a key={id} href={`#${id}`}>{name}</a>)}</nav><a className="header-contact" href="#contato">Vamos conversar <span>↗</span></a><button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? 'Fechar −' : 'Menu +'}</button><AnimatePresence>{open && <motion.nav ref={panel} id="mobile-menu" className="mobile-nav" aria-label="Navegação móvel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{[...navigation, ['Contato', 'contato']].map(([name, id], i) => <a href={`#${id}`} key={id} onClick={() => { setOpen(false); toggle.current?.focus(); }}><small>0{i + 1}</small>{name}<span>↗</span></a>)}</motion.nav>}</AnimatePresence></header>;
}
