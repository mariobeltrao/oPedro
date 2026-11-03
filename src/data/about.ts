import { editorial } from './content';
import { frame, media } from './media';

// Fotos ilustrativas da trajetória, sem atribuir datas aos registros atuais.
// Trocar a imagem principal e seu ponto focal aqui preserva toda a composição.
export const aboutContent = {
  portrait: { ...media.portrait, position: '100% 0%', mobilePosition: '50% 0%' },
  timeline: [
    {
      ...editorial.milestones[0],
      image: {
        src: '/images/filosofia/pedro-polo-marrom-800.webp',
        srcSet: '/images/filosofia/pedro-polo-marrom-480.webp 480w, /images/filosofia/pedro-polo-marrom-800.webp 800w, /images/filosofia/pedro-polo-marrom-1087.webp 1087w',
        width: 1087, height: 1447,
        alt: 'Pedro de máscara, concentrado em um atendimento', position: '50% 22%',
      },
    },
    { ...editorial.milestones[1], image: frame('atendimento', 'Pedro trabalhando no cabelo de um cliente', '50% 18%') },
    { ...editorial.milestones[2], image: { ...media.portrait, position: '50% 5%' } },
  ],
  subtitle: editorial.about.subtitle,
  text: 'Pedro Barros atua com transformação de imagem masculina em João Pessoa. Sua formação reúne três cursos de barbeiro, formação em visagismo e cursos técnicos de química capilar.',
  studies: editorial.about.studies,
  keywords: ['VISAGISMO', 'TÉCNICA', 'FORMAÇÃO', 'TRANSFORMAÇÃO'],
  technique: {
    image: { ...media.service, position: '50% 45%' },
    title: 'Uma técnica',
    emphasis: 'para diferentes formas de usar.',
    text: 'Seco, molhado, arrumado ou mais despojado — cada corte é pensado para acompanhar a sua rotina e a rotina de cada pessoa.',
    href: '#portfolio',
    linkLabel: 'Conheça as transformações de Pedro Barros',
  },
};
