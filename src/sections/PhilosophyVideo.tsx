import { useEffect, useRef, useState } from 'react';
import { philosophyFilm } from '../data/philosophy';
import styles from './Philosophy.module.css';

function Icon({ kind }: { kind: 'play' | 'pause' | 'sound' | 'muted' }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {kind === 'play' ? <path d="m8 5 11 7-11 7Z"/> : kind === 'pause' ? <path d="M8 5v14M16 5v14"/>
      : <><path d="M11 5 6 9H3v6h3l5 4Z"/>{kind === 'muted' ? <path d="m16 9 5 6m0-6-5 6"/> : <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>}</>}
  </svg>;
}

export default function PhilosophyVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const operation = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [notice, setNotice] = useState('');
  function silenceOtherVideos() {
    document.querySelectorAll<HTMLVideoElement>('video').forEach(other => {
      if (other !== video.current && !other.paused && !other.muted) other.muted = true;
    });
  }
  async function play() {
    const element = video.current;
    if (!element) return;
    const current = ++operation.current;
    setNotice('');
    if (!element.muted) silenceOtherVideos();
    try {
      await element.play();
    } catch {
      if (operation.current !== current) return;
      element.muted = true;
      setMuted(true);
      try {
        await element.play();
        if (operation.current === current) setNotice('Áudio indisponível. O vídeo está sendo reproduzido sem som.');
      } catch {
        if (operation.current === current) setNotice('Não foi possível reproduzir o vídeo. Tente novamente.');
      }
    }
  }
  function togglePlayback() {
    if (!video.current) return;
    if (video.current.paused) void play();
    else { operation.current++; video.current.pause(); }
  }
  function toggleAudio() {
    const element = video.current;
    if (!element) return;
    setNotice('');
    element.muted = !element.muted;
    if (!element.muted) {
      if (!element.volume) element.volume = 1;
      if (!element.paused) void play();
    }
    setMuted(element.muted);
  }
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const pause = () => { operation.current++; element.pause(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < .2) pause();
    }, { threshold: [0, .2] });
    observer.observe(element);
    const visibility = () => { if (document.hidden) pause(); };
    const otherAudio = (event: Event) => {
      const other = event.target;
      if (other instanceof HTMLVideoElement && other !== element && !other.paused && !other.muted && !element.paused && !element.muted) element.muted = true;
    };
    document.addEventListener('visibilitychange', visibility);
    document.addEventListener('play', otherAudio, true);
    document.addEventListener('volumechange', otherAudio, true);
    return () => {
      pause(); observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      document.removeEventListener('play', otherAudio, true);
      document.removeEventListener('volumechange', otherAudio, true);
    };
  }, []);
  return <div className={styles.videoArea}>
    <div className={styles.videoFrame} style={{ aspectRatio: `${philosophyFilm.width} / ${philosophyFilm.height}` }}>
      <video ref={video} id="philosophy-video" src={philosophyFilm.src} poster={philosophyFilm.poster}
        width={philosophyFilm.width} height={philosophyFilm.height} preload="metadata" playsInline
        style={{ objectPosition: philosophyFilm.position }} aria-label="Pedro apresenta sua filosofia de imagem" aria-describedby="philosophy-video-status"
        onPlay={event => { setPlaying(true); if (!event.currentTarget.muted) silenceOtherVideos(); }}
        onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
        onVolumeChange={event => setMuted(event.currentTarget.muted || event.currentTarget.volume === 0)}
        onError={() => { setPlaying(false); setNotice('Vídeo indisponível no momento. Tente novamente mais tarde.'); }}/>
      {!playing && <button type="button" className={styles.posterPlay} aria-label="Iniciar vídeo da Filosofia" onClick={togglePlayback}><Icon kind="play"/></button>}
      <div className={styles.controls} role="group" aria-label="Controles do vídeo da Filosofia">
        <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pausar vídeo da Filosofia' : 'Reproduzir vídeo da Filosofia'}><Icon kind={playing ? 'pause' : 'play'}/></button>
        <span>{playing ? 'Em reprodução' : 'Assista com áudio'}</span>
        <button type="button" onClick={toggleAudio} aria-label={muted ? 'Ativar áudio da Filosofia' : 'Silenciar vídeo da Filosofia'} aria-pressed={!muted}><Icon kind={muted ? 'muted' : 'sound'}/></button>
      </div>
    </div>
    <p id="philosophy-video-status" className={styles.videoStatus} role="status" aria-live="polite">{notice}</p>
  </div>;
}
