import { useCallback, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import TransformationRoute from './TransformationRoute';
import { transformationFilms } from '../data/transformations';
import styles from './Portfolio.module.css';

export default function Portfolio() {
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(() => transformationFilms.map(() => false));
  const reveal = useCallback((index: number) => setRevealed(previous => {
    if (previous[index]) return previous;
    return previous.map((active, item) => active || item === index);
  }), []);

  return (
    <section id="portfolio" className={styles.section} aria-labelledby="transformations-title">
      <div className={styles.layout}>
        <header className={styles.header}>
          <div>
            <div className={styles.label}><span>04 /</span><span>TRANSFORMAÇÕES</span></div>
            <h2 id="transformations-title" className={styles.headline}>Cada transformação<br/><em>revela um percurso.</em></h2>
            <p className={styles.subtitle}>Do antes ao resultado, cada detalhe faz parte da construção da imagem.</p>
          </div>
          <span className={styles.signature} aria-label="OPedro">O<span>P</span><i aria-hidden="true"/></span>
        </header>
        <div ref={stage} className={styles.stage}>
          <TransformationRoute stage={stage} cards={cards} onReveal={reveal}/>
          {transformationFilms.map((film, index) => {
            const active = !!reducedMotion || revealed[index];
            return <figure key={film.id} ref={element => { cards.current[index] = element; }}
              className={styles.film} data-state={active ? 'revealed' : 'locked'}>
              <div className={styles.screen}>
                {active && film.src ? <video src={film.src} poster={film.poster} controls playsInline preload="none" aria-label={film.label}/>
                  : <div className={styles.placeholder}>
                    <span className={styles.screenNumber} aria-hidden="true">{film.id}</span>
                    <span className={styles.symbol} aria-hidden="true">{active ? <svg viewBox="0 0 24 24"><path d="m9 6 9 6-9 6Z"/></svg> : <span>·</span>}</span>
                    <span className={styles.availability}>VÍDEO EM BREVE</span>
                  </div>}
              </div>
              <figcaption>
                <div className={styles.filmLabel}><span>{film.label}</span><span className={styles.state}>{active ? 'Etapa revelada' : 'A revelar'}</span></div>
                <p>{film.description}</p>
              </figcaption>
            </figure>;
          })}
          <span className={styles.endnote}>CADA IMAGEM, UM NOVO CAPÍTULO.<i aria-hidden="true"/></span>
        </div>
      </div>
    </section>
  );
}
