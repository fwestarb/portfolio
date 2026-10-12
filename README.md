# Felipe Westarb — portfólio

Portfólio bilíngue de Felipe Westarb: estudante, 14 anos conforme outubro de 2026, cursando Tech Explores na Proway em Blumenau. Sites básicos, automações leves com IA e chatbots. Contato público: felipe.westarb@gmail.com.

## Versão editorial local

O visual foi refeito em 12/10/2026 por pedido do autor, inspirado em enricodeiana.design: fundo sólido, serifas em grande escala, imagens assimétricas, títulos sobrepostos, menu de tela inteira, faixas em movimento e parallax discreto. A árvore, WebGL e o vídeo anterior foram retirados da página. Publicação: https://fwestarb.github.io/portfolio/.

Informações, limites e links de ESP32 Tera, GhostReply e Projeto Câmera foram preservados. Cada projeto abre seus detalhes e três imagens. Demonstrações de desenho e fluxo Tera retiradas. Sequências reversíveis constroem visualmente imagens por 12 máscaras, títulos, palavras e linhas conforme a posição da rolagem nativa; um indicador discreto mostra o progresso. Nenhuma API é chamada pelo portfólio.

## Executar e testar

Node.js compatível com Vite 8. Ambiente verificado: Windows, Node 24 e Microsoft Edge.

```sh
npm ci
npm run dev -- --port 8811
npm test
npm run build -- --outDir preview-dist
```

Playwright usa Edge instalado no Windows; em outro ambiente, instale Chromium com `npx playwright install chromium`. PLAYWRIGHT_EXECUTABLE_PATH permite selecionar o executável. Os testes incluem navegação por teclado, retorno de foco, detalhes dos três projetos, imagens, idiomas, movimento, cinco larguras, revelação de texto, retirada das demonstrações e falha de imagem.

Build padrão gera docs, a pasta do site público anterior. Use preview-dist para conferir localmente sem alterar a versão publicada. Base relativa permite publicação em subdiretório.

## Conteúdo e recursos

- src/content.js: informações bilíngues e links dos projetos.
- src/project-media.js: imagens e legendas sobre a origem.
- src/Editorial.jsx: página e interações; src/styles.css: design e comportamento responsivo.
- Fontes Manrope e Cormorant Garamond locais, ambas SIL OFL.
- Fotos reais Tera; GhostReply combina captura anterior e exemplos; Câmera usa entradas sintéticas, identificadas em legenda.
- PT/EN persistente e animações sempre ativas, sem seletor de movimento. Diálogos com foco contido, Escape e página externa inerte.
- Sem formulário, backend ou chamadas de IA no portfólio. O site não afirma experiência profissional, clientes ou prêmios.

Especificação vigente: BRIEF.md. Créditos: THIRD-PARTY.md e public/credits.html. O design anterior tem backup externo recuperável. Evidências desta versão: verification/editorial.

## English

Bilingual personal portfolio for Felipe Westarb, a technology student presenting three personal projects and clearly scoped services. Redesigned in an editorial style inspired by enricodeiana.design, using original code, local open-license typography and his own project media. The former tree/WebGL experience has been removed from the page. Published at https://fwestarb.github.io/portfolio/.

Project details retain evidence and limitations. The drawing canvas and Tera workflow demos were removed. Word reveals, image transitions and a progress indicator follow native scrolling. The interface includes persistent language preference and always-active motion, keyboard-accessible dialogs and responsive layouts.

## Acabamento final

Lenis 1.3.26 para rolagem suavizada, integrado ao ticker GSAP. Máscaras sequenciais, parallax reduzido, botões magnéticos, indicador seguindo o ponteiro, curvas SVG construídas ao rolar e refração SVG leve na foto Tera em desktop. Toque mantém scroll nativo. Diálogos pausam a página sem bloquear sua própria rolagem. Sem seletor de movimento, conforme solicitação explícita do autor. Nove testes automatizados incluem estado ativo mesmo com preferência antiga desligada, roda do mouse, SVG, pausa/reversão e diálogos.

Publicação em GitHub Pages: https://fwestarb.github.io/portfolio/. O build público fica em docs; o código-fonte permanece em src. Para atualizar, executar os testes, gerar npm run build, revisar e enviar a alteração ao repositório.
