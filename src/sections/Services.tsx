import { useRef, useState } from 'react';
import { servicesCategories, servicesContactUrl } from '../data/services';
import type { ServiceCategory } from '../data/services';
import ServicesVideo from './ServicesVideo';
import type { ServicesVideoHandle } from './ServicesVideo';
import styles from './Services.module.css';

function CategoryIcon({ name }: { name: ServiceCategory['icon'] }) {
  return <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    {name === 'scissors' ? <><circle cx="8" cy="25" r="4"/><circle cx="24" cy="25" r="4"/><path d="M10 21 25 4 20 16M22 21 7 4 12 16M14 17l4 4"/></>
      : name === 'beard' ? <><path d="M6 10 9 5l7 2 7-2 3 5M7 12v7c0 6 5 9 9 11 4-2 9-5 9-11v-7M8 16l4-2 4 3 4-3 4 2M11 21l5 3 5-3"/></>
        : <><path d="M16 28C6 28 3 21 3 15c6 0 10 3 13 10M16 28c10 0 13-7 13-13-6 0-10 3-13 10M16 25C9 19 10 9 16 3c6 6 7 16 0 22Z"/><path d="M9 19C6 15 7 10 8 8l6 6M23 19c3-4 2-9 1-11l-6 6"/></>}
  </svg>;
}

function ServiceCard({ category, open, onToggle }: { category: ServiceCategory; open: boolean; onToggle: () => void }) {
  const panelId = `services-panel-${category.id}`;
  return <article className={styles.card} data-open={open}>
    <h3><button className={styles.categoryToggle} id={`services-toggle-${category.id}`} type="button"
      aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
      <CategoryIcon name={category.icon}/><span>{category.name}</span><i className={styles.indicator} aria-hidden="true">{open ? '−' : '+'}</i>
    </button></h3>
    <div id={panelId} role="region" aria-labelledby={`services-toggle-${category.id}`}
      className={styles.collapse} data-open={open} inert={!open} aria-hidden={!open}>
      <div className={styles.collapseInner}>
        <ul className={styles.items}>{category.items.map(item => <li key={item.name}>
          <span className={styles.serviceName}>{item.name}</span>
          <p className={styles.serviceDescription}>{item.description}</p>
        </li>)}</ul>
      </div>
    </div>
  </article>;
}

export default function Services() {
  const player = useRef<ServicesVideoHandle>(null);
  const [openCategories, setOpenCategories] = useState<string[]>([servicesCategories[0].id]);
  const allOpen = servicesCategories.every(category => openCategories.includes(category.id));
  const toggleCategory = (id: string) => setOpenCategories(current => current.includes(id) ? current.filter(value => value !== id) : [id]);
  return <section id="servicos" className={styles.section} aria-labelledby="services-title">
    <div className={styles.canvas}>
      <header className={styles.header}>
        <div className={styles.label}><span>06 /</span><span>SERVIÇOS</span></div>
        <span className={styles.signature} aria-label="OPedro">O<span>P</span><i aria-hidden="true"/></span>
      </header>
      <div className={styles.topContent}>
      <div className={styles.introduction}>
        <h2 id="services-title" className={styles.headline}>Técnica, cuidado<br/><em>e identidade.</em></h2>
        <p className={styles.subtitle}>Em cada detalhe, escolhas que consideram você.</p>
        <a className={styles.contact} href={servicesContactUrl} target="_blank" rel="noopener noreferrer">Conversar sobre um atendimento<span aria-hidden="true">↗</span></a>
      </div>
      <aside className={styles.process} aria-labelledby="services-process-title">
        <span className={styles.processLabel}>CONHEÇA O PROCESSO</span>
        <h3 id="services-process-title">A técnica por trás de cada escolha.</h3>
        <p>Uma explicação sobre o trabalho e os cuidados envolvidos no atendimento.</p>
        <button type="button" className={styles.processPlay} aria-controls="services-explanation-video" onClick={() => player.current?.playWithAudio()}>
          <span>Assista ao vídeo com áudio</span><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 10 7-10 7Z"/></svg></i>
        </button>
        <small>ENTENDA COMO CADA DETALHE FAZ A DIFERENÇA.</small>
        <svg className={styles.processCurve} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M260 -20C410 50 440 180 330 320"/></svg>
      </aside>
      </div>
      <div className={styles.content}>
        <figure className={styles.film}>
          <ServicesVideo ref={player}/>
          <figcaption>TÉCNICA / CORTE COM TESOURA</figcaption>
        </figure>
        <div className={styles.categories}>
          <div className={styles.cards}>{servicesCategories.map(category => <ServiceCard key={category.id}
            category={category} open={openCategories.includes(category.id)} onToggle={() => toggleCategory(category.id)}/>)}</div>
          <button className={styles.toggleAll} type="button" aria-expanded={allOpen}
            aria-controls={servicesCategories.map(category => `services-panel-${category.id}`).join(' ')}
            onClick={() => setOpenCategories(allOpen ? [] : servicesCategories.map(category => category.id))}>
            <span>{allOpen ? 'Recolher todos os serviços' : 'Ver todos os serviços'}</span><span aria-hidden="true">{allOpen ? '−' : '+'}</span>
          </button>
        </div>
      </div>
      <p className={styles.closing}>Mais que cortes e tratamentos.<br/>Uma experiência completa de<br/>imagem e bem-estar.</p>
    </div>
  </section>;
}
