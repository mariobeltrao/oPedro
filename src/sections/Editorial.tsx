import { media } from '../data/media';
import { content, editorial } from '../data/content';
import { Label, Media, Reveal } from '../components/UI';
export function Manifesto() {
  const copy = editorial.manifesto;
  return <section className="visagism section manifesto" id="filosofia"><Reveal><Label number="02">FILOSOFIA</Label><div className="visagism-heading"><h2>{copy.title}<br/><em>{copy.emphasis}</em></h2><span className="asterisk" aria-hidden="true">✳</span></div><div className="visagism-bottom"><p className="large-copy">{copy.highlight}</p><p className="body-copy">{copy.text}</p></div></Reveal></section>;
}
export function About() {
  const copy = editorial.about;
  return <section className="section about" id="sobre"><Reveal className="about-copy"><Label number="03">PEDRO BARROS</Label><h2>Um olhar.<br/><em>Uma trajetória.</em></h2><p className="about-intro">{copy.subtitle}</p><p className="body-copy">{copy.text}</p><p className="body-copy">{copy.studies}</p><div className="milestones">{editorial.milestones.map(item => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div><details className="editorial-detail"><summary>Uma técnica para diferentes formas de usar</summary><p className="body-copy">{copy.approach}</p><p className="pending-note">{copy.duration}</p></details><a className="text-link" href="#portfolio">Conheça as transformações <span>↗</span></a></Reveal><Reveal className="portrait-wrap"><Media {...media.portrait}/><span className="image-caption">PEDRO BARROS / IMAGEM & IDENTIDADE</span><span className="portrait-word">O olhar.</span></Reveal></section>;
}
export function Space() {
  const copy = editorial.space;
  return <section className="section space" id="ambiente"><Reveal><div className="section-heading"><div><Label number="07">ESTÚDIO NOBLESSE</Label><h2>{copy.title}<br/><em>{copy.emphasis}</em></h2></div><div><p className="body-copy">{copy.text}</p><p className="pending-note">{copy.pending}</p></div></div><div className="space-grid"><Media {...content.space[0]} sizes="(max-width: 540px) 86vw, 52vw"/><Media {...content.space[1]} sizes="(max-width: 540px) 65vw, 32vw"/></div><div className="image-caption">ESTÚDIO NOBLESSE <span>JOÃO PESSOA / PARAÍBA</span></div></Reveal></section>;
}
