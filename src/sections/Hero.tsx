import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, editorial } from '../data/content';
export default function Hero() {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [source, setSource] = useState('');
  const video = useRef<HTMLVideoElement>(null);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    if (reduced !== false) { setSource(''); return; }
    const query = window.matchMedia('(max-width: 800px)');
    const select = () => { setReady(false); setFailed(false); setSource(query.matches ? content.heroVideoMobile : content.heroVideo); };
    select(); query.addEventListener('change', select);
    return () => query.removeEventListener('change', select);
  }, [reduced]);
  useEffect(() => {
    const element = video.current;
    if (!element || !hero.current || !source || failed) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || paused) element.pause();
      else void element.play().catch(() => { setFailed(true); });
    });
    observer.observe(hero.current);
    return () => observer.disconnect();
  }, [source, paused, failed]);
  return <section ref={hero} className="hero hero-with-media" id="inicio" aria-labelledby="hero-title">
    <div className="hero-art" aria-hidden="true"><div className="sculpture"/><div className="art-orbit"/></div>
    <img className="hero-background" src={content.heroPoster} srcSet="/images/media/hero-poster-480.webp 480w, /images/media/hero-poster-960.webp 960w, /images/media/hero-poster-1440.webp 1440w" sizes="(max-width: 800px) 100vw, 100vh" width="1440" height="2560" alt="" fetchPriority="high"/>
    {source && !failed && <video ref={video} key={source} className={`hero-background hero-video ${ready ? 'is-ready' : ''}`} src={source} autoPlay muted loop playsInline preload="metadata" poster={content.heroPoster} aria-hidden="true" onCanPlay={() => setReady(true)} onError={() => setFailed(true)}/>}
    <div className="hero-overlay"/>
    <div className="hero-side">IMAGEM É PRESENÇA.</div>
    <motion.div className="hero-content" initial={{ opacity: 0, y: reduced ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .15 }}><p className="eyebrow"><span className="status-dot"/> OPEDRO · VISAGISMO</p><h1 id="hero-title">{editorial.hero.title}<br/><em>{editorial.hero.emphasis}</em></h1><div className="hero-bottom"><p>{editorial.hero.subtitle}<span className="hero-support">{editorial.hero.support}</span></p><a className="circle-link" href="#portfolio" aria-label="Conheça o trabalho de Pedro Barros">↘</a></div></motion.div>
    <div className="hero-foot"><a href="#filosofia"><span className="scroll-line"/> Descubra um novo olhar</a><span>JOÃO PESSOA, PB <span className="coordinate">/ BRASIL</span></span></div>
    {source && !failed && <button className="video-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Reproduzir vídeo' : 'Pausar vídeo'} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>}
  </section>;
}
