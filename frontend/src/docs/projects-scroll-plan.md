# Plano completo - Section Projects com Scroll Builder

## Objetivo
Construir uma experiencia de portfolio onde cada projeto e montado em etapas conforme o usuario rola a pagina. A section trava no viewport durante o scroll interno, mostrando o site sendo construido dentro de um mockup de browser.

## Ideia central
Criar um "site builder" animado por scroll:
- Cada projeto ocupa um segmento de scroll igual.
- Dentro do mockup, o site aparece por fases (navbar, hero, conteudo, CTA).
- Um seletor no topo permite pular direto para qualquer projeto.
- Uma sidebar mostra progresso e informacoes do projeto ativo.

## Onde foi implementado
Section projects do dev-landing:
- frontend/src/app/modules/dev-landing/pages/projects/projects.component.ts
- frontend/src/app/modules/dev-landing/pages/projects/projects.component.html
- frontend/src/app/modules/dev-landing/pages/projects/projects.component.scss

Ajuste extra no hero para remover alerta de alvo GSAP inexistente:
- frontend/src/app/modules/dev-landing/pages/hero/hero.component.ts

## Stack e ferramentas
- Angular standalone component
- GSAP + ScrollTrigger + ScrollToPlugin
- CSS custom properties para progresso e temas

## Estrutura criada
### Componentes visuais
- Projects section com container fixo (pin)
- Selector com pills (tab horizontal)
- Mockup de browser com blocos de imagem (slices)
- Sidebar com progresso vertical e infos

### Dados
Quatro projetos fixos:
- Portfolio Pessoal
- Banda Aurah
- Instituto Motiro
- Traveler Website

Cada projeto tem:
- titulo, descricao curta, ano, tecnologias, link
- tema visual (surface, accent, glow)
- slices com imagens e posicionamento

## Como funciona o scroll
1. A section e fixada com ScrollTrigger (pin).
2. A rolagem total e dividida em 4 segmentos.
3. O progresso interno vai de 0 a 1 para cada segmento.
4. Cada segmento revela as 4 fases (0-25, 25-50, 50-75, 75-100).
5. Ao mudar o segmento, o mockup faz um fade/blur suave.

## Ponto de travamento (pin)
A logica de pin e aplicada no container do mockup:
- trigger: projectsPin
- start: top top
- end: window.innerHeight * projetos
- scrub: true

Isso garante que o scroll trava quando a section chega no topo da viewport e libera no final do ultimo projeto.

## Fases do builder (por projeto)
As fases sao calculadas com base em activeSegmentProgress:
- 0 a 25%: Navbar
- 25 a 50%: Hero
- 50 a 75%: Conteudo
- 75 a 100%: CTA

Cada bloco usa:
- opacity = fase
- translateY = 24px -> 0

## Ajuste manual dos cortes (slices)
Cada slice recebe:
- image: screenshot
- position: background-position manual
- size: background-size (padrao cover)

Exemplo:
- Navbar: center 8%
- Hero: center 32%
- Conteudo: center 62%
- CTA: center 90%

Isso evita cortes ruins e simula a construcao por blocos.

## Seletor de projetos
- Botao para cada projeto
- Clique executa gsap.to(window, scrollTo)
- Mantem o pill ativo com classe

## Sidebar
- Progress bar dinamica
- Infos do projeto ativo
- Chips de tecnologias
- Link externo

## Acessibilidade
- Respeita prefers-reduced-motion
- Quando reduzido, mantem conteudo visivel sem animar

## Pontos corrigidos durante a execucao
- Ajuste do pin para travar o scroll corretamente
- Adicao de altura minima na section para garantir espaco do pin
- Remocao de animacao GSAP sem alvo no hero (alerta no console)

## Resultado
A section projects agora funciona como um builder:
- Scroll trava na section
- Cada projeto e construindo em 4 fases
- O usuario pode pular entre projetos
- Sidebar atualiza com progresso e infos

## Proximos ajustes sugeridos
- Refinar manualmente o position de cada slice
- Padronizar screenshots para altura e foco
- Ajustar as transicoes (easing/duracao) conforme a sensacao desejada
