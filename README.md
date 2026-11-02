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

## Design Lock — versão atual

Atualização solicitada em 01/11/2026: preserva a identidade editorial e acrescenta ondas WebGL na abertura, retícula na Tera, expansão de imagens com GSAP Flip, menu com prévias, mostruários React para GhostReply/Câmera e galeria com miniaturas/ampliação. Rótulos mobile maiores e máscaras tipográficas ajustadas. Sem envio de mensagens, acesso à câmera ou chamada de IA.

Paper Shaders 0.0.82 fica em um chunk sob demanda; efeitos são desmontados fora da região visível e mantêm fallback sem WebGL/perda de contexto. A retícula substitui a refração SVG anterior. React/GSAP/Lenis continuam como base; não há Motion ou React Bits Pro adicional. A animação ativa segue a preferência explícita registrada no BRIEF.

`npm test` cobre navegação, idiomas/cinco larguras, foco e diálogos, movimento/scroll, mostruários, ampliação, shaders reais e fallback/context loss, clipboard e falha de imagem. A execução WebGL automatizada usa SwiftShader; não equivale a benchmark de dispositivos físicos.

Build de produção: `npm run build` gera docs para GitHub Pages. Para uma conferência local sem alterar docs, use `npm run build -- --outDir preview-dist`. Créditos em THIRD-PARTY.md e public/credits.html.
