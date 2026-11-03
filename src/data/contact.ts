export type ContactPortrait = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position?: string;
};

// PNG aprovado preservado, incluindo seu desfoque e transparência originais.
export const contactMedia: { portrait?: ContactPortrait } = {
  portrait: {
    src: '/images/pedro-encerramento-recorte.png',
    alt: 'Retrato monocromático de Pedro Barros, com o olhar voltado para baixo e desfoque horizontal',
    width: 655,
    height: 778,
    position: '50% 50%',
  },
};
