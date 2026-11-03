import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { content, editorial } from '../data/content';

export default function Hero() {
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [source, setSource] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [audioPending, setAudioPending] = useState(false);
  const [audioNotice, setAudioNotice] = useState('');
  const audioOperation = useRef(0);
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced !== false) { setSource(''); return; }
    const query = window.matchMedia('(max-width: 800px)');
    const select = () => {
      audioOperation.current += 1;
      setIsMuted(true);
      setAudioPending(false);
      setAudioNotice('');
      setReady(false);
      setFailed(false);
      setSource(query.matches ? content.heroVideoMobile : content.heroVideo);
    };
    select();
    query.addEventListener('change', select);
    return () => query.removeEventListener('change', select);
  }, [reduced]);

  useEffect(() => {
    const element = video.current;
    if (!element || !stage.current || !source || failed) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || paused) element.pause();
      else void element.play().catch(() => {
        if (video.current !== element) return;
        // Safari pode bloquear a retomada com som fora de um gesto do usuário.
        // A falha de áudio não deve retirar o vídeo da Hero.
        if (!element.muted) {
          element.muted = true;
          setIsMuted(true);
          setAudioNotice('Áudio indisponível. O vídeo continua sem som.');
          void element.play().catch(() => { setFailed(true); });
        } else setFailed(true);
      });
    });
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, [source, paused, failed]);

  async function toggleAudio() {
    const element = video.current;
    if (!element || audioPending) return;
    const operation = ++audioOperation.current;
    setAudioNotice('');

    if (!element.muted) {
      element.muted = true;
      setIsMuted(true);
      return;
    }

    const wasPlaying = !element.paused;
    setAudioPending(true);
    try {
      // Mutação e play acontecem no próprio clique, antes de qualquer await:
      // mantém a ativação de usuário necessária ao Safari/macOS/iOS.
      element.muted = false;
      setIsMuted(false);
      if (wasPlaying) await element.play();
      if (element.muted) throw new Error('Audio activation blocked');
    } catch {
      if (operation !== audioOperation.current || video.current !== element) return;
      element.muted = true;
      setIsMuted(true);
      setAudioNotice('Áudio indisponível. O vídeo continua sem som.');
      if (wasPlaying) void element.play().catch(() => { /* Mantém o controle de reprodução disponível. */ });
    } finally {
      if (operation === audioOperation.current && video.current === element) setAudioPending(false);
    }
  }

  return (
    <section className="hero hero-fullscreen" id="inicio" aria-labelledby="hero-title">
      <div ref={stage} className="hero-backdrop" aria-hidden="true">
        <img className="hero-backdrop-poster" src={content.heroPoster} srcSet="/images/media/hero-poster-480.webp 480w, /images/media/hero-poster-960.webp 960w, /images/media/hero-poster-1440.webp 1440w" sizes="100vw" width="1440" height="2560" alt="" fetchPriority="high"/>
        {source && !failed && <video ref={video} key={source} className={`hero-backdrop-video ${ready ? 'is-ready' : ''}`} src={source} autoPlay muted={isMuted} loop playsInline preload="metadata" poster={content.heroPoster} onVolumeChange={event => { if (video.current === event.currentTarget) setIsMuted(event.currentTarget.muted); }} onCanPlay={() => setReady(true)} onError={() => setFailed(true)}/>}
        <div className="hero-scrim"/>
      </div>

      <motion.div className="hero-copy" initial={{ opacity: 0, y: reduced ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
        <p className="eyebrow"><span className="status-dot"/> OPEDRO · VISAGISMO</p>
        <h1 id="hero-title"><span>{editorial.hero.title}</span><em>{editorial.hero.emphasis}</em></h1>
      </motion.div>

      <div className="hero-lower">
        <div className="hero-actions">
          <p className="hero-subtitle">{editorial.hero.subtitle}</p>
          <p className="hero-support">{editorial.hero.support}</p>
          <a className="hero-work-link" href="#portfolio">Conheça o trabalho de Pedro Barros <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-fullscreen-foot">
          <a href="#filosofia" className="hero-scroll"><span className="scroll-line"/> Descubra um novo olhar</a>
          <span className="hero-location">JOÃO PESSOA, PB <span className="coordinate">/ BRASIL</span></span>
          {source && !failed ? <div className="hero-media-controls">
            <button className="film-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Reproduzir vídeo' : 'Pausar vídeo'} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>
            <button type="button" className="hero-audio-toggle" onClick={() => { void toggleAudio(); }} disabled={!ready || audioPending} aria-label={isMuted ? 'Ativar áudio do vídeo' : 'Desativar áudio do vídeo'} title={isMuted ? 'Ativar áudio' : 'Desativar áudio'} aria-pressed={!isMuted} aria-busy={audioPending} aria-describedby={audioNotice ? 'hero-audio-status' : undefined}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M11 5 6 9H3v6h3l5 4V5Z"/>
                {isMuted ? <path d="m16 9 5 6m0-6-5 6"/> : <><path d="M15 8a6 6 0 0 1 0 8"/><path d="M18 5a10 10 0 0 1 0 14"/></>}
              </svg>
            </button>
          </div> : <span className="film-static-note">{failed ? 'Vídeo indisponível · imagem de apresentação' : 'Imagem de apresentação'}</span>}
        </div>
        <span id="hero-audio-status" className="hero-audio-status" role="status" aria-live="polite" aria-atomic="true">{audioNotice}</span>
      </div>
    </section>
  );
}
