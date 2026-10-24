import { media } from './media';
// Conteúdo informado pelo profissional. Mídias e dados pendentes permanecem vazios.
export const content = {
  heroVideo: '/videos/media/hero.mp4', heroVideoMobile: '/videos/media/hero-mobile.mp4',
  heroPoster: '/images/media/hero-poster-1440.webp', portrait: media.portrait.src,
  whatsapp: '5583999887783',
  instagram: 'https://www.instagram.com/pedrobarrosvisagista/',
  tiktok: 'https://www.tiktok.com/@pedrobarrosvisagista',
  whatsappMessage: 'Olá, Pedro! Conheci seu trabalho pelo site e gostaria de saber mais sobre os atendimentos.',
  portfolio: media.portfolio,
  space: media.space,
  beforeAfter: { before: media.before.src, after: media.after.src, beforeSrcSet: media.before.srcSet, afterSrcSet: media.after.srcSet, alt: 'Corte e finalização do mesmo cliente, em registros do atendimento' },
};
export const navigation = [['Sobre', 'sobre'], ['Transformações', 'portfolio'], ['88 Dias', '88-dias'], ['Serviços', 'servicos'], ['Noblesse', 'ambiente']];
export const makeWhatsappUrl = (message: string) => `https://wa.me/${content.whatsapp}?text=${encodeURIComponent(message)}`;
export const whatsappUrl = makeWhatsappUrl(content.whatsappMessage);
export const programUrl = makeWhatsappUrl('Olá, Pedro! Conheci a Consultoria de Imagem de 88 Dias pelo site e gostaria de saber como funciona.');
export const editorial = {
  hero: { title: 'Sua imagem', emphasis: 'comunica.', subtitle: 'Descubra o que ela pode dizer sobre você.', support: 'Visagismo, identidade e transformação de imagem com Pedro Barros.' },
  manifesto: { title: 'Não se trata apenas de', emphasis: 'mudar o visual.', text: 'Trata-se de entender o que a sua imagem comunica e construir uma expressão mais consciente da sua personalidade. Cada escolha — do corte às cores, das proporções à textura — pode fazer parte de uma identidade visual construída com intenção.', highlight: 'De fora para dentro. Com personalidade e propósito.' },
  about: { title: 'Pedro Barros.', subtitle: 'Desde 2015, explorando as possibilidades da imagem.', text: 'Visagista especializado em transformação de imagem masculina em João Pessoa. Sua formação reúne três cursos de barbeiro, formação em visagismo e cursos técnicos de química capilar.', studies: 'Seus estudos passam por texturas e cortes afro, química e tratamentos capilares, couro cabeludo e pele, técnicas com tesoura, coloração e visagismo.', approach: 'Seu olhar para o corte considera o comportamento do cabelo seco, molhado, arrumado ou mais despojado, buscando versatilidade e durabilidade visual no dia a dia.', duration: 'Pedro relata que alguns resultados podem manter boa aparência por até dois meses, conforme as características e os cuidados de cada pessoa. Essa duração não é uma garantia.' },
  milestones: [{ value: '2015', label: 'Início da formação' }, { value: '2016', label: 'Primeira barbearia' }, { value: '4 turmas', label: 'Formação de barbeiros' }],
  portfolio: { title: 'Cada imagem conta', emphasis: 'uma história.', text: 'Transformações pensadas para valorizar características, personalidade e identidade.' },
  services: { title: 'Técnica, cuidado', emphasis: 'e identidade.', subtitle: 'Em cada detalhe, escolhas que consideram você.' },
  space: { title: 'Um espaço para', emphasis: 'a sua experiência.', text: 'É no Estúdio Noblesse, em João Pessoa, que acontecem os encontros presenciais da Consultoria de Imagem de 88 Dias.', pending: 'Registros reais do espaço durante o atendimento. Endereço e informações oficiais serão adicionados em breve.' },
  mentoring: { title: 'Conhecimento que', emphasis: 'também transforma.', text: 'Experiência técnica, visão criativa e conhecimento compartilhado para quem deseja evoluir na profissão.', offerings: ['Mentoria para barbeiros', 'Mentoria em produção de vídeos e filmagem para barbeiros', 'Consultoria online'], note: 'Formatos, condições e disponibilidade serão confirmados com Pedro. A apresentação destas atividades não indica contratação imediata.' },
  preconsultation: { title: 'Antes do encontro,', emphasis: 'um olhar para você.', text: 'Uma futura preparação personalizada para conversar sobre sua imagem, sua rotina e suas expectativas.', topics: ['Objetivos e imagem que deseja transmitir', 'Características e rotina capilar', 'Preferências de estilo e referências visuais', 'Expectativas para o atendimento', 'Cuidados e manutenção do visual'], note: 'Pré-consulta em desenvolvimento. As perguntas definitivas serão definidas posteriormente. Esta prévia não coleta, envia ou armazena dados pessoais.' },
  contact: { title: 'A transformação começa', emphasis: 'com uma decisão.', text: 'Descubra novas possibilidades para a sua imagem.' },
};
export const serviceGroups = [
  { name: 'Cortes e visagismo', items: ['Corte com técnicas de visagismo', 'Corte na tesoura', 'Corte simples'] },
  { name: 'Barba', items: ['Barba com harmonização', 'Barbaterapia'] },
  { name: 'Tratamentos capilares', items: ['Reconstrução capilar', 'Nutrição capilar', 'Tratamentos para queda capilar', 'Cuidados relacionados à calvície', 'Realinhamento capilar'] },
  { name: 'Coloração', items: ['Coloração capilar'] },
];
export const program = {
  title: '88 dias para construir', emphasis: 'uma nova imagem.', subtitle: 'Uma experiência de transformação visual que conecta aparência, personalidade e propósito.',
  introduction: 'Um acompanhamento personalizado para homens que desejam compreender e direcionar a maneira como sua imagem é percebida. Ao longo de 88 dias e 14 etapas, a análise e a construção visual avançam progressivamente, considerando objetivos pessoais, características físicas e personalidade.',
  pillars: [{ value: '88', label: 'dias de acompanhamento' }, { value: '14', label: 'etapas de construção e aperfeiçoamento' }, { value: 'Uma', label: 'nova percepção sobre a própria imagem' }],
  themes: [
    { title: 'Identidade e arquétipos', text: 'Identificação do arquétipo atual e definição de um direcionamento visual relacionado à personalidade e aos objetivos do cliente.' },
    { title: 'Rosto e expressão', text: 'Análise dos traços faciais, pontos de destaque, proporções e possibilidades de valorização por meio do cabelo, barba e acabamento.' },
    { title: 'Cabelo e barba', text: 'Planejamento de cortes, texturas e formas de apresentação com base nas características individuais e na imagem desejada.' },
    { title: 'Cores e coloração pessoal', text: 'Análise das cores que harmonizam com as características do cliente e podem contribuir para a construção de sua imagem.' },
    { title: 'Silhueta e proporções', text: 'Orientação sobre modelagens e proporções de vestuário considerando a estrutura corporal.' },
    { title: 'Cuidados capilares', text: 'Avaliação do cabelo e couro cabeludo, incluindo recursos de ampliação quando utilizados no atendimento, além de orientações de cuidado.' },
  ],
  steps: [
    { title: 'Primeira consultoria', text: 'Conhecer a pessoa, seus objetivos e sua percepção sobre a própria imagem.' },
    { title: 'Construção do direcionamento', text: 'Identificar características, potencialidades e propostas visuais.' },
    { title: 'Acompanhamento', text: 'Desenvolver e ajustar diferentes aspectos da imagem ao longo das 14 etapas.' },
    { title: 'Evolução', text: 'Consolidar aprendizados e escolhas visuais mais conscientes.' },
  ],
  processNote: 'Uma visão conceitual do processo. Estes quatro momentos não substituem o protocolo de 14 etapas.',
  scheduling: 'Os encontros acontecem no Estúdio Noblesse, conforme agendamento e condições do programa. Consulte Pedro sobre a organização dos encontros e as condições do acompanhamento.',
  closingFrom: 'De qual corte eu preciso?', closingTo: 'O que eu quero que a minha imagem comunique?', cta: 'Conhecer a experiência de 88 dias',
};
