# Continuidade do OPedro

Estado consolidado em 3 de novembro de 2026. Este documento descreve os refinamentos mais recentes; os relatos de validação da V1/V2 no README são históricos.

## Executar e validar

Stack: React 19, TypeScript, Vite 6, Motion e CSS Modules, sem biblioteca de componentes.
Use Node.js 20.19+ ou 22.12+ e pnpm. O lockfile faz parte do projeto.

```sh
pnpm install
pnpm dev
pnpm build
```

O comando `dev` imprime a URL local. Para escolher a porta usada nas últimas prévias:

```sh
pnpm dev --host 127.0.0.1 --port 5175
```

`pnpm build` executa a verificação TypeScript e gera `dist/`. Não há suíte de testes automatizados configurada no package.json. A pasta `dist/`, dependências e arquivos `.env` não são versionados. A branch de continuidade é `main`; confirme sempre o commit atual ao começar.

## Estado atual e arquivos principais

- Hero: vídeo fullscreen com enquadramento por breakpoint e controles de áudio/reprodução. `src/sections/Hero.tsx`, `src/styles/hero.css`.
- Navegação: cinco ícones, legendas por interação e símbolo Noblesse transparente. `src/components/Header.tsx`, `Header.module.css`, `src/data/heroNavigation.ts`.
- Filosofia: vídeo vertical com poster, controles, pausa por visibilidade e coordenação de áudio; colagem com recorte de Pedro. `src/sections/Philosophy.tsx`, `PhilosophyVideo.tsx`, `Philosophy.module.css`, `src/data/philosophy.ts`.
- Pedro Barros: composição editorial, marcos profissionais e faixa técnica. `src/sections/PedroAbout.tsx` e `src/data/about.ts`.
- Transformações: três placeholders pretos, sem vídeos definitivos. Percurso responsivo pelo scroll, gota nas bordas, linha e marcador invisíveis dentro dos cards. `src/sections/Portfolio.tsx`, `TransformationRoute.tsx`, `transformationRouteGeometry.ts`, `Portfolio.module.css`, `src/data/transformations.ts`.
- Serviços: vídeo explicativo, controles e categorias expansíveis. `src/sections/Services.tsx`, `ServicesVideo.tsx`, `Services.module.css`, `src/data/services.ts`.
- Contato: CTA WhatsApp, ícones sociais, curva editorial e PNG aprovado de Pedro à direita; no mobile, retrato abaixo dos ícones. `src/sections/Contact.tsx`, `Contact.module.css`, `src/data/contact.ts`. Rodapé original preservado.
- Ordem das seções: `src/App.tsx`. Textos gerais: `src/data/content.ts`. Tipografia: `src/styles/typography.css`.

## Mídias e identidade

As mídias necessárias para rodar a versão atual estão em `public/` e são versionadas. O PNG `public/images/pedro-encerramento-recorte.png` foi copiado sem alterações do arquivo aprovado. Não recriar o rosto nem substituir por outra fotografia. O desfoque e a transparência já pertencem ao asset.

O script histórico `scripts/prepare_media.py` utiliza originais que ficam fora do repositório no computador do autor. Não é necessário executá-lo para rodar o site. Não suponha que caminhos absolutos antigos do README existam em outra máquina.

Fraunces normal/itálica local é a fonte temporária aprovada na implementação. A Bringbold Nineties ainda depende de arquivos e licença web autorizados. Consulte `public/fonts/README.md` e a licença incluída.

## Restrições de continuidade

- Fazer somente a alteração solicitada; preservar as demais seções, navegação, paleta e tipografia.
- Manter textos, links e botões em HTML, nunca como uma captura da página inteira.
- Usar mídia real aprovada. Não inventar arquivos, depoimentos, serviços, dados profissionais ou pares de antes/depois.
- Transformações permanece com três placeholders até receber os vídeos definitivos. A geometria inclui trechos internos invisíveis para manter a continuidade do scroll.
- Preservar os originais das mídias. Não alterar características físicas dos retratos.
- Não adicionar bibliotecas ou refatorações globais para ajustes locais.
- Não enviar mensagens pelo WhatsApp ou redes ao testar os links.

## Validação mais recente e limites

O build TypeScript/Vite foi executado com sucesso antes deste envio. Nos refinamentos anteriores houve inspeção visual no navegador, controles de vídeo, scroll reverso do percurso e verificações em larguras de 320 a 1920px. Os resultados de uma etapa não substituem os testes necessários após novas mudanças.

Não há confirmação de teste em iPhone/iPad físico ou de todos os comportamentos em Safari. Emulação de viewport não equivale a aparelho real. Não declarar testes que não foram executados.

Continuam pendentes os vídeos definitivos de Transformações e conteúdos profissionais que exigem confirmação: endereço oficial, detalhamento das 14 etapas dos 88 dias, condições de agendamento, depoimentos autorizados, disponibilidade de mentorias e futura infraestrutura da pré-consulta. A pré-consulta atual não coleta nem envia dados.

## Prompt de retomada sugerido

> Continue o projeto OPedro a partir da branch main deste repositório. Leia README.md e docs/CONTINUIDADE.md, confira o commit atual e inspecione os arquivos da seção envolvida antes de editar. Execute o projeto e faça apenas esta mudança: [descrever a tarefa]. Preserve todas as outras seções, mídias aprovadas, textos e identidade visual. Ao concluir, valide no navegador, execute o build e informe os arquivos alterados e as limitações encontradas.
