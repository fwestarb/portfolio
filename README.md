# Felipe Westarb — portfólio

[Site / Website](https://fwestarb.github.io/portfolio/) · [GitHub](https://github.com/fwestarb)

## Português

Portfólio pessoal em português e inglês, com foco em sites básicos, automações leves de IA e chatbots. Felipe tem 14 anos (informação fornecida em outubro de 2026) e está cursando Tech Explores na Proway em Blumenau. Contato público: felipe.westarb@gmail.com.

Apresenta ESP32 Tera, GhostReply e Projeto Câmera com links, tecnologias, verificações e limitações. A imagem da Tera é uma fotografia do protótipo; a do GhostReply é uma captura real anterior com base vazia; a do Câmera foi produzida pelo código usando dados sintéticos. Não são anunciados clientes nem experiência profissional não comprovada.

### Desenvolvimento

Requer Node.js compatível com Vite 8 (20.19+ ou 22.12+).

```sh
npm ci
npm run dev
npm run build
```

O build gera `docs/`. GitHub Pages publica a branch `main`, pasta `/docs`. As fontes, imagens e scripts usam caminhos relativos, permitindo hospedagem em subdiretório.

### Interações e limites

- Escultura 3D procedural original em Three.js, com reação ao ponteiro, estrutura/superfície e limite de 30 quadros por segundo. Pausa fora da tela e com a aba oculta; resolução limitada a 1,5 vezes a densidade base.
- Movimento reduzido e controle de animações oferecem uma composição estática. A ausência de WebGL também tem alternativa estática.
- Quadro de desenho funciona com mouse/toque. Não reconhece gestos da câmera.
- Fluxo de IA é uma visualização didática; não faz chamadas à API.
- Português/inglês persistem localmente. Contato usa e-mail e cópia para área de transferência, sem formulário ou servidor.
- Fontes do Google exigem conexão; há fontes de fallback. O pacote 3D é carregado separadamente e supera o aviso de tamanho de 500 kB do Vite.

### Verificação

`tools/test_site.cjs` usa Playwright com Microsoft Edge. O relatório em `verification/TESTE-SITE.json` documenta as interações, quatro larguras de tela, alternativas sem efeitos e erros JavaScript. Capturas na mesma pasta foram revisadas visualmente. Os testes do portfólio não repetem testes físicos de hardware nem validam APIs dos outros projetos.

O conteúdo editável está em `src/content.js` e os dados confirmados em `content.confirmed.json`. Reexecute o build depois de editar. Atualize a idade manualmente quando necessário.

## English

Personal bilingual portfolio focused on basic websites, lightweight AI automation and chatbots. Felipe is 14 (provided in October 2026) and is taking Tech Explores at Proway in Blumenau. Public contact: felipe.westarb@gmail.com.

Includes ESP32 Tera, GhostReply and Camera Project with honest implementation details and limitations. The camera image uses synthetic input; the other images show the real prototype and an earlier real extension capture.

Run `npm ci`, `npm run dev` and `npm run build`. GitHub Pages serves `main:/docs`. The original 3D scene has pointer interaction and static fallbacks. The drawing canvas is real browser interaction; the AI workflow is an educational visualization without API calls. Automated browser checks are recorded under `verification/`; physical hardware and external project services are outside their scope.

## Créditos / Credits

See [THIRD-PARTY.md](THIRD-PARTY.md) for dependencies, fonts and component licenses. Reference websites informed composition only; their source, images and personal biographies were not copied.
