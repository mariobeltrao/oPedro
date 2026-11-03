import { makeWhatsappUrl } from './content';
import { media } from './media';

// Derivado H.264 do vídeo real; original HEVC preservado na pasta de origem.
export const serviceFilm: { src?: string; poster: typeof media.service; position: string } = {
  src: '/videos/media/explicacao.mp4',
  poster: {
    src: '/images/services/explicacao-poster-960.webp',
    srcSet: '/images/services/explicacao-poster-480.webp 480w, /images/services/explicacao-poster-960.webp 960w, /images/services/explicacao-poster-1440.webp 1440w',
    width: 960, height: 1707, alt: 'Pedro apresenta seu trabalho no vídeo explicativo',
  },
  position: '50% 50%',
};
export const servicesContactUrl = makeWhatsappUrl('Olá, Pedro! Conheci seus serviços pelo site e gostaria de conversar sobre um atendimento de corte, visagismo, barba ou cuidados capilares.');
export type ServiceCategory = { id: string; name: string; icon: 'scissors' | 'beard' | 'care'; items: { name: string; description: string }[] };
export const servicesCategories: ServiceCategory[] = [
  { id: 'cuts', name: 'Cortes e visagismo', icon: 'scissors', items: [
    { name: 'Corte com técnicas de visagismo', description: 'Corte pensado para valorizar seus traços, proporções e a imagem que você deseja comunicar.' },
    { name: 'Corte na tesoura', description: 'Acabamento mais preciso e natural, com atenção ao caimento, à textura e ao movimento dos fios.' },
    { name: 'Corte simples', description: 'Uma proposta prática e bem executada para manter o visual alinhado no dia a dia.' },
    { name: 'Realinhamento capilar', description: 'Procedimento voltado ao comportamento dos fios, trabalhando sua estrutura de forma progressiva e controlada.' },
  ] },
  { id: 'beard', name: 'Barba', icon: 'beard', items: [
    { name: 'Barba com harmonização', description: 'Desenho e ajuste da barba considerando formato do rosto, proporções e presença visual.' }, { name: 'Barbaterapia', description: 'Cuidado completo para barba e pele, unindo bem-estar, tratamento e finalização refinada.' },
  ] },
  { id: 'care', name: 'Tratamentos', icon: 'care', items: [
    { name: 'Reconstrução capilar', description: 'Tratamento para fortalecer os fios e recuperar a estrutura capilar após danos e desgastes.' }, { name: 'Nutrição capilar', description: 'Reposição de nutrientes e lipídios para devolver maciez, brilho e controle ao cabelo.' }, { name: 'Coloração capilar', description: 'Aplicação de cor com direcionamento estético, respeitando tom de pele, estilo e intenção visual.' },
    { name: 'Tratamentos relacionados à queda capilar', description: 'Cuidados voltados à saúde do couro cabeludo e à melhora do ambiente para o crescimento dos fios.' }, { name: 'Cuidados relacionados à calvície', description: 'Abordagem orientada para entender o quadro, acompanhar a evolução e definir os melhores cuidados.' },
  ] },
];
