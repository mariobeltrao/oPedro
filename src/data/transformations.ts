export type TransformationFilm = {
  id: string;
  label: string;
  src?: string;
  poster?: string;
  description: string;
};

// Adicione src (e, opcionalmente, poster) para substituir cada reserva pelo vídeo.
// Os registros atuais de portfólio permanecem preservados nos assets originais.
export const transformationFilms: TransformationFilm[] = [
  { id: '01', label: 'Transformação 01', description: 'Do primeiro olhar a uma nova expressão.' },
  { id: '02', label: 'Transformação 02', description: 'Escolhas que revelam identidade.' },
  { id: '03', label: 'Transformação 03', description: 'Uma imagem construída em cada detalhe.' },
];
