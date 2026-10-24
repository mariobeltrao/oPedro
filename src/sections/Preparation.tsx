import { editorial, whatsappUrl } from '../data/content';
import { Arrow, Label, Reveal } from '../components/UI';
export function Mentoring() {
  const copy = editorial.mentoring;
  return <section className="section mentoring" id="mentorias"><Reveal><Label number="08">MENTORIAS & CONSULTORIAS</Label><div className="secondary-layout"><div><h2>{copy.title}<br/><em>{copy.emphasis}</em></h2><p className="body-copy">{copy.text}</p></div><div><ul className="mentoring-list">{copy.offerings.map((item, i) => <li key={item}><small>0{i + 1}</small><span>{item}</span></li>)}</ul><p className="pending-note">{copy.note}</p><a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Consultar disponibilidade <Arrow/></a></div></div></Reveal></section>;
}
export function PreConsultation() {
  const copy = editorial.preconsultation;
  return <section className="section preparation" id="pre-consulta"><Reveal><Label number="09">PRÉ-CONSULTA / EM DESENVOLVIMENTO</Label><div className="secondary-layout"><div><h2>{copy.title}<br/><em>{copy.emphasis}</em></h2><p className="body-copy">{copy.text}</p></div><div className="preparation-preview"><span className="eyebrow">PRÉVIA DOS TEMAS</span><ul>{copy.topics.map((topic, i) => <li key={topic}><span>0{i + 1}</span>{topic}</li>)}</ul><p className="pending-note">{copy.note}</p></div></div></Reveal></section>;
}
