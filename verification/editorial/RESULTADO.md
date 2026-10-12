# Verificação — versão editorial

Data: 12/10/2026. Referência vigente: BRIEF.md, atualizada conforme o pedido mais recente do autor.

## Conferência do pedido

| Pedido | Implementação |
| --- | --- |
| Estilo próximo de enricodeiana.design | Abertura centrada com serifas grandes, fundo sólido, imagens assimétricas, títulos sobrepostos, faixas contínuas, contato em grande escala e menu de tela inteira. |
| Usar informações anteriores | Nome, idade datada, formação, e-mail, GitHub, serviços e três projetos preservados em PT/EN. |
| Algumas cores da Tera | Grafite esverdeado, verde discreto e texto claro. |
| Abandonar árvore/design anterior | Nova página Editorial; árvore, shaders, carrossel 3D e vídeo anterior fora da página e do build atual. Bibliotecas 3D retiradas das dependências. |
| Ler referência | Inspeção visual desktop/móvel; abertura, projetos, laboratório, contato, introdução e página Sobre. |

## Verificações executadas

- Build Vite de produção em preview-dist: sucesso, 25 módulos. JS 362,87 kB / gzip 122,89 kB; CSS 20,25 kB / gzip 4,97 kB. Não há renderer WebGL.
- npm test: sete testes aprovados em 9,4 segundos.
- Nove imagens dentro dos detalhes dos três projetos carregam; tabs, links, Escape e foco verificados.
- Menu em tela móvel contém foco, deixa o fundo inerte, fecha por Escape e navega ao contato.
- Idioma inglês persiste; idade, Proway, links e limitações permanecem.
- Preferência do sistema e escolha explícita de movimento verificadas. Conteúdo disponível sem animação.
- Cinco larguras (320, 390, 768, 1440, 1920), em PT e EN: sem overflow horizontal ou títulos de projetos cortados.
- Quadro desenha com ponteiro e limpa pixels; fluxo muda etapa e descrição. Nenhuma API é executada por essas demonstrações.
- Imagem interrompida de propósito: mensagem legível e links continuam disponíveis.
- Clipboard do navegador: recebeu exatamente felipe.westarb@gmail.com; confirmação apareceu. Links mailto conferidos, sem envio de mensagem.
- Inspeção visual separada em Edge: abertura, projetos, laboratório, diálogos, menu, contato e versão móvel.
- Rotas do build sob /portfolio/ simuladas no navegador com encaminhamento local: fonte e imagem carregadas, sem recursos HTTP >=400. Não substitui teste em uma publicação real no GitHub Pages.
- Sem erros JavaScript observados na sessão local.
- git diff --name-only -- docs: vazio. Nenhum commit, push, deploy ou alteração do perfil.

## Correções encontradas durante QA

- Restauração de foco executada após remover inert do fundo.
- Imagem vertical no diálogo passou a respeitar a área definida, mostrando a captura completa em vez de ampliá-la/cortá-la.
- Contraste do título GhostReply melhorado escurecendo o fundo da apresentação. Cabeçalho sólido impede sobreposição ilegível ao rolar.
- Teste de imagens aguarda a conclusão real do carregamento.

## Evidências

desktop.png, mobile.png, project.png, mobile-project.png, details.png, contact.png, playground.png e about.png nesta pasta. Capturas posteriores ao build são locais.

## Limites

Mobile foi emulado em Edge; não houve ensaio em telefone físico. Sem avaliação de Core Web Vitals em usuários reais. A comparação visual foi feita por composição e comportamento, não por igualdade de pixels: fontes abertas e imagens do próprio Felipe substituem recursos da referência. Os projetos de IA/hardware não foram reexecutados nesta tarefa; resultados anteriores são apresentados com seus limites.

## Recuperação

Backup ZIP íntegro, 116 arquivos: C:\Projetos\portfolio-direcao-visual\portfolio-antes-editorial-2026-10-12.zip. Teste CRC sem erro. Código/mídia antigos arquivados em arquivo-design-anterior-2026-10-12, fora do projeto. Uma cópia local src/vendor permanece inativa e não é importada ou distribuída pelo build; a tentativa de mover a pasta foi negada pelo Windows.

## Atualização: animações de rolagem e remoção das demonstrações

Pedido subsequente do autor: retirar desenho e “Por dentro da Tera”; acrescentar animações de texto e rolagem. Ambas as demonstrações e o título de laboratório foram retirados. Faixa tipográfica de áreas de trabalho substitui a seção.

Implementados: revelação por palavras (apresentação, Sobre, conhecimentos, serviços, contato); movimento das linhas da abertura ao sair da tela; parallax de imagens; expansão das máscaras das imagens; títulos acompanhando rolagem; entrada das linhas de conhecimentos/serviços; faixa ligada à posição da página; indicador de progresso. GSAP matchMedia reduz as amplitudes no celular. Rolagem continua nativa, sem pinning ou captura do scroll.

Verificação: sete testes passaram, incluindo a ausência das duas demonstrações, mudança real de transformação das palavras após rolar, indicador de progresso e restauração estática ao reduzir movimento. Build aprovado. Revisão visual desktop e móvel emulado, sem erros JavaScript observados. Corrigido o espaço entre palavras dos textos divididos durante a inspeção visual. Novas capturas: scroll-about.png e scroll-mobile-contact.png.

Pesquisa técnica: documentação oficial de ScrollTrigger e gsap.matchMedia — https://gsap.com/docs/v3/Plugins/ScrollTrigger/ e https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/ . Nenhuma biblioteca adicional instalada. Versão continua local; docs publicada permanece intacta.

## Refinamento procedural

Pesquisados Codrops Sticky Grid Scroll e On-Scroll Perspective Grid Animations, além de GSAP ScrollTrigger. Implementação própria de composição visual por progresso: 12 máscaras por imagem, enquadramento gradual, recorte dos títulos, formação das palavras e desenho das divisórias. As sequências são reversíveis; o progresso segue a posição de rolagem, com suavização curta. Nenhuma geração de conteúdo remoto.

Oito testes aprovados (24,4 s), incluindo novo ensaio específico em desktop e celular emulado: estado inicial, construção intermediária, pausa sem avanço, estado final e reversão ao rolar para cima. Build aprovado. Movimento reduzido remove as máscaras e restaura o texto sem transformações. Evidências: procedural-middle.png, procedural-complete.png e procedural-text.png. Sem publicação.

Referências: https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/ ; https://tympanus.net/codrops/2023/08/03/on-scroll-perspective-grid-animations/ ; https://gsap.com/docs/v3/Plugins/ScrollTrigger/ .

## Versão final antes do deploy

Pedido: movimento mais limpo/fluido, sempre ativo, sem seletor. A preferência antiga fw-motion e a preferência do sistema não controlam mais esta versão, conforme decisão explícita do autor.

Lenis 1.3.26 sincronizado com GSAP; suavização sem duas filas independentes de requestAnimationFrame. Toque permanece nativo. Amplitudes menores, enquadramento sem rotação, máscaras sequenciais com sine.inOut e atraso reduzido. Recursos de ponteiro só são instalados para mouse/ponteiro fino.

Novos efeitos: botões magnéticos com quickTo; indicação de abrir projeto acompanha o ponteiro dentro da imagem; curvas vetoriais desenhadas e deformadas pelo progresso da página; refração SVG (feTurbulence/feDisplacementMap) de até 5 px na fotografia Tera, somente em desktop e durante interação. Prints de interfaces permanecem sem distorção. Não é shader GLSL e não reintroduz WebGL.

Nove testes aprovados em 22,1 s. Incluem animação ativa mesmo com preferência antiga desligada, layout de cinco larguras em PT/EN, detalhes e nove imagens, foco, menu, roda do mouse suavizada, pausa/reversão da composição, refração e rolagem independente do diálogo. Sessão visual adicional mediu deslocamento da indicação e do botão magnético, revisou desktop/móvel e rotas de produção sob /portfolio/ com encaminhamento local. Sem erro JavaScript observado. No build atual: 28 módulos, JS 383,53 kB / gzip 128,53 kB; CSS 22,34 kB / gzip 5,52 kB.

Build em preview-dist. ZIP de distribuição verificado por CRC e SHA256, fora do repositório: C:\Projetos\portfolio-direcao-visual\portfolio-editorial-pronto-deploy.zip. Manifesto em DEPLOY-READY.json. Capturas final-desktop.png, final-mobile.png e final-ribbon.png.

Especificação, README e créditos atualizados. A pasta docs publicada permaneceu intacta; nenhum push/deploy. Pronto para a etapa de publicação e validação real no GitHub Pages. Mobile foi emulado, sem teste em aparelho físico ou métricas de campo.
