# Hero e sistema tipográfico

## Composição fullscreen — correção atual

Hero em `100svh` em todos os breakpoints, com vídeo absoluto cobrindo toda a largura e altura em `object-fit: cover`, sem colunas, cards ou margens. Cabeçalho transparente sobre o vídeo. A fonte e a paleta permanecem as mesmas do refinamento tipográfico.

A headline fica na faixa superior esquerda e o subtítulo, apoio, CTA e indicador ficam na faixa inferior. Essa distribuição deixa o centro mais livre para as legendas incorporadas. O overlay é um gradiente leve nas extremidades, transparente no centro; não há blur. O menu móvel abre em painel opaco com Escape e controle de foco; ao fechar, a composição fullscreen continua no mesmo lugar.

O controle de reprodução fica no canto inferior, fora da região central de leitura. Pausa manual, pausa fora de vista, poster e preferência por movimento reduzido permanecem implementados.

O material é a mesma montagem completa de `hero.mp4.mov` (aproximadamente 55,8 segundos), nas versões web H.264 já existentes. Não houve remoção, duplicação ou edição das legendas. Os arquivos de vídeo não foram modificados nesta etapa. O original continua em `/Users/beltrao/Documents/oPedro/public/videos/hero.mp4.mov`.

### Compromissos do vídeo vertical em cover

- O refinamento atual usa variáveis de foco superiores por breakpoint para priorizar rosto/olhos, mantendo `50% 48%` no mobile. Valores e limites em [ENQUADRAMENTO.md](ENQUADRAMENTO.md).
- Nos desktops 16:9, aproximadamente 68% da altura do arquivo 9:16 fica fora do enquadramento. A janela prioriza agora a região superior; títulos, legendas e elementos mais baixos podem ficar parcial ou totalmente cortados.
- Em 390×844, aproximadamente 18% da largura do arquivo fica fora do enquadramento; linhas longas próximas às bordas podem ser cortadas. Em 375×667, a proporção é praticamente a do original.
- Legendas gravadas na imagem não podem ser reposicionadas por CSS. O espaço central livre reduz conflitos, mas não garante a leitura integral de todas as legendas de todos os quadros.
- A prioridade desta composição é manter o background fullscreen solicitado, documentando os recortes em vez de reintroduzir contain ou layout dividido.

## Fonte temporária e licença

Não foram encontrados WOFF, WOFF2, OTF ou TTF da Bringbold Nineties, nem licença de uso web dessa família. As duas imagens em `oPedro/public/tipografia` foram utilizadas apenas como referência visual.

A alternativa adotada é **Fraunces**, e não Bringbold Nineties. Fonte variável de títulos com formas orgânicas, contraste e versões normal/itálica. Arquivos obtidos do repositório oficial:

- https://github.com/google/fonts/tree/main/ofl/fraunces
- https://github.com/google/fonts/blob/main/ofl/fraunces/OFL.txt

A licença SIL Open Font License 1.1 acompanha os arquivos em `public/fonts/Fraunces-OFL.txt`. Os arquivos oficiais TTF foram convertidos para WOFF2, mantendo os glifos e eixos. Não há requisições para provedores externos de fontes durante o uso do site.

- `public/fonts/fraunces-variable.woff2`: normal, pesos 100–900.
- `public/fonts/fraunces-variable-italic.woff2`: itálica, pesos 100–900.
- `src/styles/typography.css`: font-face, variáveis de família, escala fluida, pesos, espaçamento e funções tipográficas.
- `src/styles/hero.css`: composição e breakpoints específicos da primeira seção.

Display: Hero, títulos de todas as seções, número 88, marcos, pilares e frases editoriais. Interface: Arial/Helvetica/sans-serif nos parágrafos, menu, serviços, botões, legendas e contato. `font-display: swap` nas duas faces; preload somente da face normal.

Para substituir futuramente pela Bringbold autorizada: adicionar os arquivos e sua licença, registrar as faces reais em `typography.css`, atualizar `--font-display` e o preload de `index.html`, e rever as métricas nos breakpoints abaixo. Não basta renomear os arquivos de Fraunces.

## Validação da correção fullscreen

TypeScript e build de produção aprovados. No navegador integrado, vídeo e Hero medidos com a mesma posição, largura e altura nas seis resoluções:

| Viewport | Hero e vídeo ocupam toda a tela | Cover | Sem overflow horizontal |
| --- | --- | --- | --- |
| 1920 × 1080 | Sim | Sim | Sim |
| 1440 × 900 | Sim | Sim | Sim |
| 1366 × 768 | Sim | Sim | Sim |
| 768 × 1024 | Sim | Sim | Sim |
| 390 × 844 | Sim | Sim | Sim |
| 375 × 667 | Sim | Sim | Sim |

Inspeção visual das resoluções solicitadas, com vídeo em reprodução em diferentes momentos. Nenhum título ultrapassou seu bloco nas medidas realizadas. Arquivos do filme e sistema tipográfico preservados. O preenchimento utiliza cover, sem esticar ou deformar o arquivo.

Limitações: viewports simulados em navegador, sem aparelho físico e sem revisão humana quadro a quadro dos 56 segundos. Movimentos ou legendas fora da região central continuam sujeitos aos recortes descritos acima. Falha de rede e movimento reduzido não foram simulados nesta etapa.

Menu móvel e navegação até Transformações verificados. CTA da Hero confirmado em `#portfolio`; pausa e retomada do vídeo testadas. Console sem erros na inspeção final. Foram observados diferentes momentos da reprodução, incluindo a legenda central “Cada detalhe importa”, livre dos textos HTML na captura final em 1440×900. Não foi declarada leitura integral de todas as legendas.
