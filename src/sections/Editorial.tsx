import Philosophy from './Philosophy';
import PedroAbout from './PedroAbout';
import { content, editorial } from '../data/content';
import { Label, Media, Reveal } from '../components/UI';
export function Manifesto() { return <Philosophy/>; }
export function About() {
  return <PedroAbout/>;
}
export function Space() {
  const copy = editorial.space;
  return <section className="section space" id="ambiente"><Reveal><div className="section-heading"><div><Label number="07">ESTÚDIO NOBLESSE</Label><h2>{copy.title}<br/><em>{copy.emphasis}</em></h2></div><div><p className="body-copy">{copy.text}</p><p className="pending-note">{copy.pending}</p></div></div><div className="space-grid"><Media {...content.space[0]} sizes="(max-width: 540px) 86vw, 52vw"/><Media {...content.space[1]} sizes="(max-width: 540px) 65vw, 32vw"/></div><div className="image-caption">ESTÚDIO NOBLESSE <span>JOÃO PESSOA / PARAÍBA</span></div></Reveal></section>;
}
