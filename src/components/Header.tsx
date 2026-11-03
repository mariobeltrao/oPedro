import { navigation } from '../data/content';
import { noblesseNavigation } from '../data/heroNavigation';
import styles from './Header.module.css';

function NavigationIcon({ section }: { section: string }) {
  if (section === '88-dias') return <span className={styles.days} aria-hidden="true">88</span>;
  if (section === 'ambiente') return <span className={styles.noblesse} aria-hidden="true">
    <img src={noblesseNavigation.symbolSrc} width="32" height="32" alt=""/>
  </span>;
  return <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    {section === 'sobre' ? <><circle cx="16" cy="9" r="5"/><path d="M6 28v-3a10 8 0 0 1 20 0v3"/></>
      : section === 'portfolio' ? <><path d="M17 7c0 7-3 10-10 10 7 0 10 3 10 10 0-7 3-10 10-10-7 0-10-3-10-10Z"/><path d="M6 3v6M3 6h6M26 24v5M23.5 26.5h5"/></>
        : <><circle cx="8" cy="24" r="4"/><circle cx="24" cy="24" r="4"/><path d="M11 21 24 5M21 21 8 5"/></>}
  </svg>;
}

export default function Header() {
  return <header className={`header ${styles.header}`}>
    <a className="wordmark" href="#inicio" aria-label="OPedro, início">o<span>Pedro</span><sup>JP</sup></a>
    <nav className={styles.navigation} aria-label="Principal">
      {navigation.map(([name, id]) => <a className={styles.item} key={id} href={`#${id}`} aria-label={id === 'sobre' ? 'O Pedro' : name} title={id === 'sobre' ? 'O Pedro' : name}>
        <span className={styles.iconFrame}><NavigationIcon section={id}/></span>
        <span className={styles.caption} aria-hidden="true"><i/>{id === 'sobre' ? 'O Pedro' : name}</span>
      </a>)}
    </nav>
    <a className={`header-contact ${styles.contact}`} href="#contato">Vamos conversar <span aria-hidden="true">↗</span></a>
  </header>;
}
