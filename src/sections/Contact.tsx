import { content, editorial, makeWhatsappUrl } from '../data/content';
import { contactMedia } from '../data/contact';
import styles from './Contact.module.css';

function SocialIcon({ name }: { name: 'WhatsApp' | 'Instagram' | 'TikTok' }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    {name === 'Instagram' ? <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1.15"/></>
      : name === 'TikTok' ? <path d="M16.7 2c.3 2.6 1.8 4.2 4.3 4.4v3.1a9.2 9.2 0 0 1-4.3-1.3v7.6a6.1 6.1 0 1 1-5.2-6v3.2a2.9 2.9 0 1 0 2.1 2.8V2Z"/>
      : <><path d="M20.4 3.6a11.1 11.1 0 0 0-17.5 13L1.4 23l6.5-1.5A11.1 11.1 0 0 0 20.4 3.6Zm-8 17a9 9 0 0 1-4.2-1.1l-.3-.2-3.8.9.9-3.7-.2-.4A9 9 0 1 1 12.4 20.6Z"/><path d="M9.1 6.7c-.2-.5-.4-.5-.8-.5h-.6c-.3 0-.7.1-.9.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3 1.3 3.2.2.2 2.2 3.4 5.4 4.7 2.7 1.1 3.2.9 3.8.8.6-.1 1.9-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4l-2.2-1.1c-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.5 8.5 0 0 1-2.5-1.5 9.8 9.8 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6Z"/></>}
  </svg>;
}
const contactUrl = makeWhatsappUrl('Olá, Pedro! Conheci seu trabalho pelo site e gostaria de saber mais sobre seus atendimentos.');
const networks = [{ name: 'WhatsApp' as const, href: contactUrl }, { name: 'Instagram' as const, href: content.instagram }, { name: 'TikTok' as const, href: content.tiktok }];

export default function Contact() {
  const portrait = contactMedia.portrait;
  return <><section className={styles.section} id="contato" aria-labelledby="contact-title">
    <div className={styles.canvas}>
      <div className={styles.label}><span>10 /</span><span>SEU PRÓXIMO CAPÍTULO</span></div>
      <span className={styles.signature} aria-label="OPedro">O<span>P</span><i aria-hidden="true"/></span>
      <h2 id="contact-title" className={styles.headline}><span>A transformação</span><span>começa com</span><em>uma decisão.</em></h2>
      <p className={styles.description}>{editorial.contact.text}</p>
      <div className={styles.actions}>
        <a className={styles.booking} href={contactUrl} target="_blank" rel="noopener noreferrer">Converse com Pedro <span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></svg></span></a>
        <nav className={styles.social} aria-label="Redes sociais">{networks.map(network => <a key={network.name} href={network.href} aria-label={network.name} target="_blank" rel="noopener noreferrer"><SocialIcon name={network.name}/></a>)}</nav>
      </div>
      {portrait && <figure className={styles.portrait}><img src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} loading="lazy" decoding="async" style={{ objectPosition: portrait.position || '50% 50%' }}/></figure>}
      <div className={styles.metadata}><p>PEDRO BARROS<br/>JOÃO PESSOA, PARAÍBA</p><a href={content.instagram} target="_blank" rel="noopener noreferrer">@pedrobarrosvisagista</a></div>
      <svg className={styles.curve} viewBox="0 0 1600 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M420 790 C650 1000 710 490 980 550 S1380 300 1640 390"/></svg>
    </div>
  </section><footer><a href="#inicio" className="wordmark" aria-label="OPedro, início">o<span>Pedro</span><sup>JP</sup></a><p>PEDRO BARROS / IMAGEM & IDENTIDADE</p><a href="#inicio">Voltar ao topo ↑</a><small>© {new Date().getFullYear()} OPedro · Pedro Barros</small></footer></>;
}
