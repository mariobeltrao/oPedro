import Header from './components/Header';
import Hero from './sections/Hero';
import { About, Manifesto, Space } from './sections/Editorial';
import Portfolio from './sections/Portfolio';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Program from './sections/Program';
import { Mentoring, PreConsultation } from './sections/Preparation';
export default function App() { return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo"><Hero/><Manifesto/><About/><Portfolio/><Program/><Services/><Space/><Mentoring/><PreConsultation/><Contact/></main></>; }
