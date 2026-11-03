import { motion, useReducedMotion } from 'motion/react';
import { philosophyPhotograph as photograph } from '../data/philosophy';
import PhilosophyVideo from './PhilosophyVideo';
import styles from './Philosophy.module.css';

export default function Philosophy() {
  const reducedMotion = useReducedMotion();
  return (
    <section id="filosofia" className={styles.section} aria-labelledby="philosophy-title">
      <motion.div className={styles.canvas}
        initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: .12 }} transition={{ duration: reducedMotion ? 0 : .7 }}>
        <div className={styles.label}><span>02 /</span><span>FILOSOFIA</span></div>
        <h2 id="philosophy-title" className={styles.headline}>
          <span>Não se trata</span><span>apenas de</span><em>mudar o visual.</em>
        </h2>
        <p className={styles.description}>É sobre identidade, presença e propósito. Cada detalhe constrói uma versão mais consciente de quem você é.</p>
        <PhilosophyVideo/>
        <div className={styles.collage} role="group" aria-label="Pedro e os detalhes do atendimento">
          <figure className={styles.mainPhotograph}>
            <div className={styles.photographFrame} aria-hidden="true"><img {...photograph} sizes="(max-width: 767px) 60vw, 24vw" alt=""/></div>
            <img {...photograph} className={styles.photographSubject} sizes="(max-width: 767px) 60vw, 24vw"
              alt="Pedro de polo marrom, máscara e luvas durante um atendimento"/>
          </figure>
          <figure className={styles.detailPhotograph}>
            <img {...photograph} sizes="(max-width: 767px) 65vw, 30vw" alt="Detalhe da barba do cliente e das mãos de Pedro durante o atendimento"/>
          </figure>
        </div>
        <p className={styles.expression} aria-label="Imagem é uma forma de expressão">
          <span>IMAGEM</span><span>É UMA</span><span>FORMA</span><span>DE</span><span>EXPRESSÃO</span><i aria-hidden="true"/>
        </p>
        <div className={styles.editorialFooter}><p>DE FORA<br/>PARA DENTRO.</p><span>(01)</span><i aria-hidden="true"/></div>
        <svg className={styles.curve} viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M770 -20 C900 350 760 650 500 780 S100 950 -40 990"/>
        </svg>
      </motion.div>
    </section>
  );
}
