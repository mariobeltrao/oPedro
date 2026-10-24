import { media } from '../data/media';
import { useState } from 'react';
import { motion } from 'motion/react';
import { editorial, serviceGroups, whatsappUrl } from '../data/content';
import { Arrow, Label, Media, Reveal } from '../components/UI';
export default function Services() {
  const [expanded, setExpanded] = useState(false);
  const group = (item: typeof serviceGroups[number]) => <div className="service-category" key={item.name}><h3>{item.name}</h3><ul>{item.items.map(name => <li key={name}>{name}</li>)}</ul></div>;
  return <section className="section services" id="servicos"><Reveal><Label number="06">SERVIÇOS</Label><div className="services-layout"><div><h2>{editorial.services.title}<br/><em>{editorial.services.emphasis}</em></h2><p className="body-copy">{editorial.services.subtitle}</p><a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Conversar sobre um atendimento <Arrow/></a><figure className="service-media"><Media {...media.service}/><figcaption>TÉCNICA / CORTE COM TESOURA</figcaption></figure></div><div>{serviceGroups.slice(0, 2).map(group)}<motion.div id="more-services" initial={false} animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }} style={{ overflow: 'hidden' }} inert={!expanded} aria-hidden={!expanded}>{serviceGroups.slice(2).map(group)}<p className="service-note">Realinhamento capilar é um procedimento próprio de Pedro, descrito como um processo progressivo que modifica a fibra capilar.</p></motion.div><button className="expand-button" aria-expanded={expanded} aria-controls="more-services" onClick={() => setExpanded(!expanded)}>{expanded ? 'Ver menos serviços −' : 'Ver todos os serviços +'}</button></div></div></Reveal></section>;
}
