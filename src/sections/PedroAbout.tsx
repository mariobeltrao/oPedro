import { motion, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { aboutContent as copy } from '../data/about';
import type { EditorialImage } from '../data/media';
import styles from './PedroAbout.module.css';

function Photograph({ image, className, sizes }: { image: EditorialImage & { mobilePosition?: string }; className?: string; sizes: string }) {
  return <img className={className} src={image.src} srcSet={image.srcSet} sizes={sizes}
    width={image.width} height={image.height} alt={image.alt}
    style={{ '--photo-position': image.position, '--photo-mobile-position': image.mobilePosition ?? image.position } as CSSProperties}
    loading="lazy" decoding="async"/>;
}

export default function PedroAbout() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="sobre" className={styles.section} aria-labelledby="pedro-about-title">
      <motion.div className={styles.layout}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .1 }}
        transition={{ duration: reducedMotion ? 0 : .7 }}>
        <div className={styles.portraitPanel}>
          <Photograph image={copy.portrait} className={styles.portrait}
            sizes="(max-width: 767px) 92vw, (max-width: 1600px) 65vw, 1000px"/>
          <div className={styles.shade} aria-hidden="true"/>
          <div className={styles.copy}>
            <div className={styles.label}><span>03 /</span><span>PEDRO BARROS</span></div>
            <h2 id="pedro-about-title" className={styles.headline}>Um olhar.<em>Uma trajetória.</em></h2>
            <p className={styles.subtitle}>{copy.subtitle}</p>
            <div className={styles.biography}><p>{copy.text}</p><p>{copy.studies}</p></div>
          </div>
          <p className={styles.keywords}>{copy.keywords.map(word => <span key={word}>{word}</span>)}<i aria-hidden="true"/></p>
          <svg className={styles.curve} viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path d="M-20 390 C210 635 550 570 740 472 C890 395 860 210 1220 55"/>
          </svg>
        </div>
        <ol className={styles.timeline} aria-label="Marcos da trajetória profissional">
          {copy.timeline.map(item => <li key={item.value}>
            <Photograph image={item.image} className={styles.timelinePhoto}
              sizes="(max-width: 599px) 86vw, (max-width: 1600px) 29vw, 450px"/>
            <div className={styles.milestone}><strong>{item.value}</strong><i aria-hidden="true"/><span>{item.label}</span></div>
          </li>)}
        </ol>
        <div className={styles.technique}>
          <Photograph image={copy.technique.image} className={styles.tools}
            sizes="(max-width: 767px) 92vw, (max-width: 1600px) 42vw, 650px"/>
          <div className={styles.techniqueCopy}>
            <h3>{copy.technique.title}<br/>{copy.technique.emphasis}</h3>
            <p>{copy.technique.text}</p>
          </div>
          <a className={styles.arrow} href={copy.technique.href} aria-label={copy.technique.linkLabel}><span aria-hidden="true">↗</span></a>
        </div>
      </motion.div>
    </section>
  );
}
