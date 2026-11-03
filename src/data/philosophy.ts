export const philosophyFilm = {
  src: '/videos/media/video_cortado.mp4',
  poster: '/images/filosofia/video-cortado-poster.webp',
  width: 480,
  height: 856,
  position: '50% 50%',
};
// Fotografia real e seus recortes existentes; nenhum pixel foi alterado.
export const philosophyPhotograph = {
  src: '/images/filosofia/pedro-polo-marrom-1087.webp',
  srcSet: '/images/filosofia/pedro-polo-marrom-480.webp 480w, /images/filosofia/pedro-polo-marrom-800.webp 800w, /images/filosofia/pedro-polo-marrom-1087.webp 1087w',
  width: 1087,
  height: 1447,
  loading: 'lazy' as const,
  decoding: 'async' as const,
};
