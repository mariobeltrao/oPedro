import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { serviceFilm } from '../data/services';
import styles from './Services.module.css';

export type ServicesVideoHandle = { playWithAudio: () => void };

function MediaIcon({ kind }: { kind: 'play' | 'pause' | 'sound' | 'muted' }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {kind === 'play' ? <path d="m8 5 11 7-11 7Z"/>
      : kind === 'pause' ? <><path d="M8 5v14M16 5v14"/></>
        : <><path d="M11 5 6 9H3v6h3l5 4Z"/>{kind === 'muted' ? <path d="m16 9 5 6m0-6-5 6"/> : <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>}</>}
  </svg>;
}

export default forwardRef<ServicesVideoHandle>(function ServicesVideo(_, ref) {
  const video = useRef<HTMLVideoElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const waitingForView = useRef(false);
  const graceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const operation = useRef(0);
  const userStarted = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState('');

  function stopWaiting() {
    waitingForView.current = false;
    clearTimeout(graceTimer.current);
  }
  function silenceHero() {
    const hero = document.querySelector<HTMLVideoElement>('#inicio video');
    if (hero && !hero.muted) hero.muted = true;
  }
  async function start(scrollToVideo = false) {
    const element = video.current;
    if (!element) return;
    const current = ++operation.current;
    userStarted.current = true;
    setNotice('');
    stopWaiting();
    if (scrollToVideo) {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < 0 || bounds.bottom > window.innerHeight) {
        waitingForView.current = true;
        // A reprodução começa no gesto; a pausa automática aguarda apenas o scroll até o player.
        graceTimer.current = setTimeout(() => {
          waitingForView.current = false;
          const rect = element.getBoundingClientRect();
          const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
          if (visible < Math.min(rect.height, window.innerHeight) * .2) { operation.current++; element.pause(); }
        }, 1500);
        container.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
    element.muted = false;
    if (element.volume === 0) element.volume = 1;
    setMuted(false);
    silenceHero();
    try {
      await element.play();
    } catch {
      if (operation.current !== current || video.current !== element) return;
      // Uma recusa de áudio não impede assistir à explicação silenciosamente.
      element.muted = true;
      setMuted(true);
      try {
        await element.play();
        if (operation.current !== current) return;
        setNotice('O áudio não pôde ser ativado. O vídeo está sem som.');
      } catch {
        setNotice('Não foi possível reproduzir o vídeo. Tente novamente.');
        stopWaiting();
      }
    }
  }
  function togglePlayback() {
    const element = video.current;
    if (!element) return;
    if (!element.paused) {
      operation.current++;
      stopWaiting();
      element.pause();
    } else if (!userStarted.current) {
      void start();
    } else {
      setNotice('');
      if (!element.muted) silenceHero();
      void element.play().catch(() => setNotice('Não foi possível retomar o vídeo. Tente novamente.'));
    }
  }
  function toggleAudio() {
    const element = video.current;
    if (!element) return;
    setNotice('');
    const enableSound = element.muted;
    const current = operation.current;
    element.muted = !enableSound;
    if (enableSound) {
      if (element.volume === 0) element.volume = 1;
      if (!element.paused) {
        silenceHero();
        void element.play().catch(() => {
          if (operation.current !== current) return;
          element.muted = true;
          setMuted(true);
          setNotice('O áudio não pôde ser ativado. O vídeo continua sem som.');
          void element.play().catch(() => {});
        });
      }
    }
    setMuted(element.muted);
  }
  useImperativeHandle(ref, () => ({ playWithAudio: () => { void start(true); } }));

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .2) stopWaiting();
      else if (!waitingForView.current) { operation.current++; element.pause(); }
    }, { threshold: [0, .2] });
    observer.observe(element);
    const visibility = () => { if (document.hidden) { operation.current++; stopWaiting(); element.pause(); } };
    const otherMedia = (event: Event) => {
      const other = event.target;
      if (other instanceof HTMLVideoElement && other !== element && other.closest('#inicio') && !other.paused && !other.muted && !element.paused) {
        element.muted = true;
      }
    };
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('volumechange', otherMedia, true);
    document.addEventListener('play', otherMedia, true);
    return () => {
      operation.current++;
      observer.disconnect();
      stopWaiting();
      element.pause();
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('volumechange', otherMedia, true);
      document.removeEventListener('play', otherMedia, true);
    };
  }, []);

  return <div>
    <div ref={container} className={styles.filmFrame}>
      <video ref={video} id="services-explanation-video" src={serviceFilm.src} poster={serviceFilm.poster.src}
        playsInline preload="none" style={{ objectPosition: serviceFilm.position }}
        aria-label="Pedro explica a técnica e os cuidados no atendimento" aria-describedby="services-video-status"
        onPlay={event => { setPlaying(true); if (!event.currentTarget.muted) silenceHero(); }}
        onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
        onVolumeChange={event => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
        onError={() => { setPlaying(false); setNotice('Vídeo indisponível no momento. Tente novamente mais tarde.'); }}/>
      {!playing && <button className={styles.posterPlay} type="button" onClick={togglePlayback} aria-label={userStarted.current && muted ? 'Retomar explicação sem áudio' : 'Reproduzir explicação com áudio'}><MediaIcon kind="play"/></button>}
      <div className={styles.playerControls} role="group" aria-label="Controles do vídeo explicativo">
        <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pausar explicação' : 'Reproduzir explicação'}><MediaIcon kind={playing ? 'pause' : 'play'}/></button>
        <span>{playing ? 'Em reprodução' : 'Assista com áudio'}</span>
        <button type="button" onClick={toggleAudio} aria-label={muted ? 'Ativar áudio da explicação' : 'Silenciar explicação'} aria-pressed={!muted}><MediaIcon kind={muted ? 'muted' : 'sound'}/></button>
      </div>
    </div>
    <p id="services-video-status" className={styles.videoStatus} role="status" aria-live="polite">{notice}</p>
  </div>;
});
