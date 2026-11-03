# Foco visual da Hero

## Ajuste realizado

Mudança restrita ao enquadramento em `src/styles/hero.css`. Vídeo, JSX, layout dos textos, menu, CTA, overlay, paleta e sistema tipográfico permanecem os mesmos.

Amostras do filme em intervalos de quatro segundos (0 a 52 s) foram examinadas. Nas cenas individuais de Pedro, incluindo 0, 8, 12, 16, 24, 32 e 48 s, os olhos aparecem predominantemente no terço superior. O recorte central anterior descartava essa região em telas horizontais.

O alinhamento agora utiliza `--hero-focus-x` e `--hero-focus-y`, compartilhados pelo vídeo e pelo poster. Não foi necessário adicionar escala, transformações, dependências ou lógica JavaScript. `position: absolute`, `inset: 0`, `100% × 100%`, `object-fit: cover` e a Hero de `100svh` foram preservados.

## Breakpoints

| Viewport conferido | Object-position | Intenção |
| --- | --- | --- |
| 1920 × 1080 | 50% 3% | Recuperar o terço superior descartado pelo recorte widescreen |
| 1440 × 900 | 50% 4% | Manter rosto e olhos em notebook mais alto |
| 1366 × 768 | 50% 2% | Proteger os olhos nas cenas em que estão próximos ao topo |
| 1024 × 768 | 50% 0% | Preservar o topo no tablet horizontal |
| 768 × 1024 | 50% 8% | Aproveitar a maior área vertical visível |
| 390 × 844 | 50% 48% | Manter o enquadramento mobile já aprovado |
| 375 × 667 | 50% 48% | Manter a proporção próxima do original |

Esses percentuais são alinhamentos de `object-position` sobre o excesso de tamanho produzido por `cover`. Não são coordenadas percentuais dos olhos no arquivo.

## Validação

- TypeScript sem erros e build de produção aprovado.
- Nos sete viewports, o retângulo do vídeo coincide com o da Hero, com `cover`, sem transformações e sem overflow horizontal.
- Inspeção visual em desktop widescreen, notebooks, tablet horizontal e mobile, com o filme em reprodução.
- Comparação do recorte anterior (50% vertical) com o superior (3%) sobre os mesmos quadros de 0, 8 e 48 s: a nova janela mantém os olhos que antes ficavam fora da área visível.
- Os textos e demais seções não foram reposicionados nesta etapa.

## Compromissos e limites

A prioridade passou da região central de legendas para os olhos de Pedro. Em desktop, partes inferiores da cena e legendas incorporadas podem ficar fora da tela. As legendas continuam intactas no arquivo: não foram removidas ou duplicadas.

O vídeo contém closes, cenas sem o rosto e montagens em três faixas. Um foco fixo por breakpoint não acompanha cada corte do filme nem consegue mostrar todos os rostos simultaneamente. Também não recupera áreas que já estavam fora do quadro original. O ajuste melhora o enquadramento nas cenas individuais examinadas, sem garantir rosto completo e todas as legendas em todos os instantes.

Não houve rastreamento facial automático, revisão humana quadro a quadro ou teste em aparelho físico. O arquivo vertical continua sujeito ao recorte inerente ao fullscreen horizontal.
