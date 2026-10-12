# Portfólio — Felipe Westarb

## Direção vigente: editorial, 12/10/2026

Pedido do autor: refazer o visual para ficar muito parecido com https://enricodeiana.design/, manter as informações pessoais/projetos e algumas cores da Tera, abandonar o design anterior e a árvore. Esta direção substitui as exigências visuais de árvore, shaders, carrossel 3D e vídeos da especificação anterior.

## Referência e interpretação

Consultadas visualmente a abertura, apresentação, projetos, laboratório, contato, página Sobre e abertura móvel. A referência usa grafite sólido, texto claro, fontes serifadas expressivas em escala grande, imagens assimétricas, títulos sobrepostos, faixas em movimento e navegação discreta.

Implementação própria: grafite esverdeado #1d2321, texto claro #e5e1d3, verde #b2c79b, Manrope e Cormorant Garamond OFL locais. Sem copiar o código, imagens, fontes comerciais, marcas, prêmios ou textos do autor da referência. Textos e links alheios ao portfólio vistos na referência não são usados.

## Conteúdo preservado

Felipe Westarb, 14 anos conforme outubro de 2026. Tech Explores na Proway em Blumenau; não inferir residência. Serviços simples: sites, automações leves com IA e chatbots. Contato: felipe.westarb@gmail.com. GitHub fwestarb. PT/EN.

ESP32 Tera, GhostReply e Projeto Câmera, com fotografias/capturas existentes, origem identificada, tecnologias, objetivo, implementação, resultados registrados, limitações, site e código. Não inventar clientes, experiência, prêmios, métricas ou novas funcionalidades.

## Estrutura e comportamento

- Abertura tipográfica de tela cheia, entrada coordenada do texto e link para projetos.
- Apresentação curta; três imagens amplas em posições alternadas e títulos sobrepostos. Detalhes em diálogo, três imagens por projeto.
- Desenho e fluxo “Por dentro da Tera” removidos por pedido do autor. Faixa tipográfica entre projetos e apresentação, vinculada à rolagem.
- Sobre e formação. Lista de conhecimentos e serviços, em lugar de prêmios.
- Contato tipográfico, mailto, cópia de e-mail, GitHub e créditos.
- Menu de tela inteira com foco contido, Escape e retorno do foco. Diálogos tornam a página externa inerte.
- Entrada da abertura; saída suave das linhas ao rolar; revelação de palavras da apresentação e títulos; parallax de mídia; abertura das máscaras de imagens; entrada de linhas de conhecimentos/serviços; faixa tipográfica e indicador de progresso vinculados à rolagem. Sem seções fixadas artificialmente ou captura da roda do mouse. Sem WebGL, árvore, vídeo antigo ou áudio automático.
- Animações sempre ativas por pedido explícito do autor; sem controle para desativar. Preferências anteriores de movimento não são consultadas. Idioma continua persistente.

## Critérios de verificação

Build de produção isolado; testes de conteúdo, diálogos/imagens/foco, menu, PT/EN, cinco larguras, animações sempre ativas, remoção das demonstrações, revelação de texto e falha de imagem. Capturas desktop e móvel, revisão de contraste e ajuste das imagens em diálogo. Testar também caminhos relativos em subdiretório.

## Publicação

Versão local para avaliação. Não executar push/deploy nem alterar a pasta docs publicada nesta etapa. Backup da versão anterior verificado em portfolio-direcao-visual; arquivos antigos arquivados fora do projeto.

## Refinamento solicitado: construção procedural pela rolagem

As composições dos projetos agora são sequências reversíveis: imagem revelada por 12 máscaras em grade, enquadramento se estabiliza, nome se forma por recorte e descrição aparece. Palavras dos textos e linhas divisórias progridem conforme a posição da página. Ao parar de rolar, a sequência para; ao voltar, regride. O conteúdo é pré-definido; “geração” descreve a construção visual, não texto gerado por IA.

Pesquisa: Codrops Sticky Grid Scroll, On-Scroll Perspective Grid Animations e documentação GSAP ScrollTrigger. Implementação própria, sem copiar imagens ou código dos exemplos e sem dependência adicional.

## Acabamento final antes do deploy

Pedido vigente: movimentos sempre ativos, remover seletor e tornar a animação mais limpa/fluida. Lenis sincronizado com o ticker GSAP; toque mantém comportamento nativo. Amplitudes menores, máscaras em ordem contínua e enquadramento sem rotação. Botões magnéticos e indicação de abertura seguindo o ponteiro; linhas vetoriais desenhadas/moldadas pela rolagem; refração SVG discreta na fotografia Tera apenas em ponteiro fino. Prints GhostReply/Câmera permanecem sem distorção.

Menu/detalhes pausam a rolagem da página enquanto o diálogo pode rolar normalmente. Recursos e eventos são destruídos ao desmontar. Não há novo WebGL renderer ou loop de shader permanente. SVG displacement é um filtro, não um shader GLSL. Sem publicação nesta etapa.

## Publicação autorizada

O autor autorizou o deploy no GitHub neste chat. Gerar docs, publicar no repositório fwestarb/portfolio e validar https://fwestarb.github.io/portfolio/ após a atualização do GitHub Pages. Esta autorização substitui as restrições de publicação das etapas anteriores.
