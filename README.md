# OPedro — Pedro Barros / V2

Revisão de conteúdo, narrativa e disposição sobre a V1 existente. React, TypeScript, Vite, Motion e CSS próprio. Paleta, fontes locais, assinatura OPedro, componentes de mídia e animações preservados.

## Executar localmente

Com Node.js 20.19+ ou 22.12+ e pnpm:

```sh
pnpm install
pnpm dev
```

Abra o endereço exibido no terminal. `pnpm build` verifica TypeScript e gera `dist/`; `pnpm preview` serve a versão de produção. O carregador runner do Vite foi mantido.

## Narrativa

1. Hero: Sua imagem comunica.
2. Manifesto: personalidade e intenção.
3. Pedro Barros: formação, marcos de 2015 e 2016, quatro turmas e técnica.
4. Transformações: galeria preparada para trabalhos reais e comparador condicional.
5. Consultoria de Imagem de 88 Dias: seção comercial principal, seis temas expansíveis, pilares, visão conceitual do processo e CTA próprio.
6. Serviços: cinco opções iniciais em Cortes e visagismo / Barba; expansão para Tratamentos capilares / Coloração. Sem preços.
7. Estúdio Noblesse: local dos encontros presenciais, sem presumir propriedade ou parceria.
8. Mentorias e consultorias: disponibilidade e condições a confirmar.
9. Pré-consulta: prévia dos temas, sem formulário de envio, coleta ou armazenamento.
10. Contato: WhatsApp e redes oficiais fornecidos pelo usuário.

## Organização e edição

- `src/data/content.ts`: textos institucionais, marcos, temas e processo dos 88 dias, serviços, contatos e mídia.
- `src/sections/Program.tsx`: experiência principal.
- `src/sections/Preparation.tsx`: mentorias e pré-consulta.
- Demais seções existentes reutilizadas e ajustadas em `src/sections/`.
- `src/components/`: navegação acessível, comparador antes/depois e elementos reutilizáveis.
- `src/styles/global.css`: estilos originais mais ajustes de composição V2.

Os CTAs usam `https://wa.me/5583999887783` com mensagens codificadas. A consultoria tem mensagem específica. Instagram e TikTok apontam para `pedrobarrosvisagista`.

## Integração audiovisual

Mídias localizadas em `/Users/beltrao/Documents/oPedro/public/videos`. Os originais foram preservados nessa pasta. A aplicação continua neste projeto, em `/Users/beltrao/Documents/ChatGPT/OPedro`.

A Hero utiliza versões H.264 de `hero.mp4.mov`, com poster estático, seleção responsiva, pausa manual e fallback. Nove quadros de vídeos reais substituem os placeholders nas seções Sobre, Transformações, 88 Dias, Serviços e Noblesse. As imagens possuem três variantes WebP, dimensões reservadas e lazy loading abaixo da dobra. O comparador foi ativado com registros do mesmo cliente antes e depois.

Inventário de todos os 34 vídeos, dimensões, durações, tamanhos, arquivos utilizados por seção e motivos para não usar os demais: [docs/MIDIAS.md](docs/MIDIAS.md). O script `scripts/prepare_media.py` permite gerar os derivados novamente, sem alterar os originais.

Permanecem pendentes: endereço oficial e autorização da identidade da Noblesse; detalhamento das 14 etapas e condições exatas dos agendamentos; depoimentos autorizados; formatos e disponibilidade das mentorias; perguntas finais e futura infraestrutura de privacidade da pré-consulta. A marca, as fontes e a paleta foram preservadas.

## Validação da V2

- TypeScript sem erros e build de produção concluído.
- Dez seções conferidas no navegador integrado, na ordem solicitada.
- Navegação do menu até 88 Dias verificada.
- Tema Identidade e arquétipos expandido, com texto exibido.
- Botão Ver todos os serviços expandido, revelando os seis serviços adicionais e a nota sobre realinhamento.
- Inspeção visual desktop da abertura da consultoria de 88 dias.
- Destinos e mensagens dos CTAs conferidos na árvore de acessibilidade, sem enviar mensagens.
- Tentativa de acessar Instagram e TikTok pela ferramenta web bloqueada por restrições de acesso das plataformas. Os links seguem os identificadores fornecidos; existência pública e conteúdo dos perfis não foram confirmados.
- Responsividade preservada e ajustada em CSS; inspeção visual móvel completa da V2 e reprodução das mídias reais ainda pendentes.

## Validação da integração audiovisual

- TypeScript e build de produção aprovados.
- Vídeo H.264 carregado e em reprodução no navegador; pausa e retomada manuais conferidas.
- Versão móvel de 720×1280 selecionada em viewport de 390 px; versão desktop de 1080×1920 em 1280 px.
- Dez instâncias de imagem carregadas, sem falhas, após percorrer a página; nenhum erro de console observado.
- Comparador alterado por teclado (seta/End) e ponteiro em viewport móvel.
- Sem overflow horizontal observado em 320, 390, 768 e 1280 px.
- Enquadramentos da Hero e do comparador e galeria Noblesse inspecionados em viewport móvel; composição desktop da Hero também revisada.
- Movimento reduzido e falha de vídeo implementados com poster; simulação destes estados e teste em aparelho físico com toque ainda não realizados. Viewport móvel não equivale a teste em dispositivo real.
