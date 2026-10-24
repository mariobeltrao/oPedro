export type EditorialImage = {
  src: string;
  alt: string;
  srcSet: string;
  width: number;
  height: number;
  position?: string;
  caption?: string;
};
// Quadros extraídos dos vídeos reais; a rastreabilidade está em docs/MIDIAS.md.
export function frame(name: string, alt: string, position = '50% 35%', caption?: string): EditorialImage {
  return {
    src: `/images/media/${name}-960.webp`,
    srcSet: [480, 960, 1440].map(width => `/images/media/${name}-${width}.webp ${width}w`).join(', '),
    width: 960, height: 1707, alt, position, caption,
  };
}
export const media = {
  portrait: frame('pedro', 'Pedro Barros concentrado durante um atendimento', '50% 23%'),
  consultation: frame('atendimento', 'Pedro trabalhando no cabelo de um cliente no estúdio', '50% 35%'),
  service: frame('corte-tesoura', 'Detalhe do corte com tesoura e pente', '50% 52%'),
  before: frame('antes', 'Perfil do cliente antes do corte, com o cabelo preso em uma mecha', '50% 35%'),
  after: frame('depois', 'Perfil do mesmo cliente após o corte, com os cachos finalizados', '50% 35%'),
  portfolio: [
    frame('resultado-frente', 'Corte finalizado visto de frente e em três quartos', '50% 32%', 'FORMA / VISTA FRONTAL'),
    frame('depois', 'Acabamento lateral e textura dos cachos após o corte', '50% 32%', 'TEXTURA / PERFIL'),
  ],
  space: [
    frame('noblesse-ambiente', 'Vista do espaço de atendimento, espelhos e iluminação com Pedro trabalhando', '50% 42%'),
    frame('noblesse-atendimento', 'Reflexos e detalhes do espaço durante um atendimento', '50% 38%'),
  ],
};
