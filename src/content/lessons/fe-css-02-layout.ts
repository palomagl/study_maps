import type { Lesson } from "@/content/types";

/** Front-end · Fase 1 · Etapa "Estilo com CSS" · aula 2. */
export const cssFlexboxGridResponsividade: Lesson = {
  id: "fe-css-02-layout",
  slug: "flexbox-grid-responsividade",
  title: "Flexbox, Grid e responsividade",
  summary:
    "As duas ferramentas de layout do CSS moderno e como fazer a página se adaptar de um celular a um monitor grande.",
  estimatedMinutes: 35,
  status: "available",

  learningObjectives: [
    "Decidir quando usar Flexbox (uma dimensão) e quando usar Grid (duas dimensões)",
    "Alinhar e distribuir itens com justify-content e align-items",
    "Criar uma grade responsiva com grid-template-columns e repeat/minmax",
    "Escrever media queries mobile-first e explicar por que começar pelo menor",
    "Usar unidades relativas (%, rem, fr, min(), clamp()) no lugar de pixels fixos",
  ],

  content: [
    {
      type: "paragraph",
      text: "Posicionar caixas na tela já foi a parte mais dolorida do CSS. Hoje há duas ferramentas feitas para isso: **Flexbox**, para distribuir itens ao longo de **uma linha ou coluna**, e **Grid**, para montar **grades de linhas e colunas** ao mesmo tempo. Some a isso as **media queries** e você tem layouts que funcionam em qualquer tela.",
    },
    {
      type: "callout",
      variant: "analogy",
      title: "Uma analogia",
      text: "Flexbox é organizar livros numa **prateleira**: eles se distribuem ao longo dela. Grid é montar uma **estante** inteira, com prateleiras e divisórias — você define a grade e encaixa os itens nas células.",
    },

    { type: "heading", text: "Flexbox: uma dimensão" },
    {
      type: "paragraph",
      text: "Você aplica `display: flex` no **container**; os **filhos diretos** viram itens flex e se alinham ao longo do eixo principal (por padrão, horizontal).",
    },
    {
      type: "code",
      language: "css",
      code: `.barra {
  display: flex;
  justify-content: space-between; /* distribui no eixo principal */
  align-items: center;           /* alinha no eixo cruzado      */
  gap: 16px;                      /* espaço entre os itens       */
}`,
    },
    {
      type: "list",
      items: [
        "**`justify-content`** — posiciona os itens no eixo principal: `flex-start`, `center`, `space-between`, `space-around`, `space-evenly`.",
        "**`align-items`** — alinha no eixo cruzado: `stretch` (padrão), `center`, `flex-start`, `flex-end`.",
        "**`flex-direction: column`** — vira o eixo principal para a vertical.",
        "**`flex-wrap: wrap`** — deixa os itens quebrarem para a linha de baixo quando não cabem.",
        "**`gap`** — espaço entre itens, sem precisar de margens.",
      ],
    },
    {
      type: "example",
      title: "Centralizar de verdade",
      text: "O velho problema de 'centralizar uma div' hoje é isto:",
      code: {
        language: "css",
        code: `.tela {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
      },
    },

    { type: "heading", text: "Grid: duas dimensões" },
    {
      type: "paragraph",
      text: "`display: grid` no container e você descreve a grade com `grid-template-columns` / `grid-template-rows`. A unidade `fr` representa uma fração do espaço livre.",
    },
    {
      type: "code",
      language: "css",
      code: `.galeria {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colunas iguais */
  gap: 20px;
}

/* grade que se adapta sozinha, sem media query: */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}`,
    },
    {
      type: "callout",
      variant: "tip",
      title: "O truque do auto-fit + minmax",
      text: "`repeat(auto-fit, minmax(220px, 1fr))` diz: \"faça quantas colunas couberem, cada uma com no mínimo 220px, dividindo o resto igualmente\". A grade ganha e perde colunas sozinha conforme a largura muda.",
    },

    { type: "heading", text: "Flex ou Grid?" },
    {
      type: "list",
      items: [
        "**Uma direção** (barra de navegação, lista de tags, botões lado a lado) → **Flexbox**.",
        "**Duas direções** (galeria de cards, layout de página com header/sidebar/main/footer) → **Grid**.",
        "Nada impede de usar os dois juntos: Grid para a página, Flex dentro de cada card.",
      ],
    },

    { type: "heading", text: "Responsividade: mobile-first" },
    {
      type: "paragraph",
      text: "Escreva primeiro o layout do **celular** (o caso mais simples: tudo em uma coluna) e use `@media (min-width: ...)` para **adicionar** complexidade em telas maiores. Isso mantém o CSS enxuto e garante que o mobile — a maioria do tráfego — não carregue estilo que não usa.",
    },
    {
      type: "code",
      language: "css",
      code: `/* base: celular */
.layout {
  display: grid;
  gap: 24px;
}

/* a partir de 768px, duas colunas */
@media (min-width: 768px) {
  .layout {
    grid-template-columns: 240px 1fr;
  }
}`,
    },
    {
      type: "callout",
      variant: "warning",
      title: "Pré-requisito silencioso",
      text: "Nada de media query funciona bem sem esta tag no `<head>`: `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">`. Sem ela, o celular finge ter 980px de largura e ignora seu layout mobile.",
    },

    { type: "heading", text: "Unidades: largue o pixel fixo" },
    {
      type: "list",
      items: [
        "**`%`** — relativo ao elemento pai. Bom para larguras fluidas.",
        "**`rem`** — relativo à fonte-base do documento. Ideal para tipografia e espaçamento que respeitam a preferência do usuário.",
        "**`fr`** — fração do espaço livre, só em Grid.",
        "**`min()` / `max()` / `clamp()`** — `width: min(90%, 1100px)` = \"90% da tela, mas nunca mais que 1100px\". `clamp(1rem, 2.5vw, 1.5rem)` = tamanho que cresce com a tela dentro de limites.",
      ],
    },
  ],

  video: {
    title: "Flexbox CSS In 20 Minutes",
    provider: "YouTube",
    channel: "Traversy Media",
    url: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
    description:
      "Constrói vários layouts com Flexbox do zero. Em inglês. Para Grid, veja o recurso do Kevin Powell abaixo.",
    lang: "en",
  },

  freeResources: [
    {
      kind: "article",
      title: "A Complete Guide to Flexbox",
      provider: "CSS-Tricks",
      url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      description: "A referência definitiva de Flexbox, com ilustração de cada propriedade.",
      lang: "en",
    },
    {
      kind: "article",
      title: "A Complete Guide to CSS Grid",
      provider: "CSS-Tricks",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      description: "O mesmo guia visual, para Grid.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Design responsivo",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/CSS/CSS_layout/Responsive_Design",
      description: "Media queries, imagens flexíveis e a abordagem mobile-first, em português.",
      lang: "pt-BR",
    },
    {
      kind: "course",
      title: "Learn CSS in 20 Minutes (Grid e layout)",
      provider: "YouTube · Web Dev Simplified",
      url: "https://www.youtube.com/watch?v=1PnVor36_40",
      description: "Panorama rápido de layout com Grid e boas práticas modernas.",
      lang: "en",
    },
  ],

  premiumResources: [
    {
      title: "CSS Flexbox e CSS Grid",
      platform: "Origamid",
      url: "https://www.origamid.com/",
      reason:
        "Se você quer dominar layout com aulas em português, projetos guiados e exercícios, a Origamid tem trilhas dedicadas a Flexbox e Grid.",
    },
  ],

  questions: [
    {
      id: "q-layout-flex-vs-grid",
      type: "single",
      skill: "aplicacao",
      concept: "layout-escolha",
      prompt:
        "Você precisa montar uma barra de navegação: logo à esquerda, links no centro, botão de login à direita, tudo em uma linha. Qual ferramenta é a mais natural?",
      options: [
        { id: "a", text: "Flexbox — é distribuição em uma única direção" },
        { id: "b", text: "Grid — sempre que há mais de um item" },
        { id: "c", text: "float — é o padrão para navegação" },
        { id: "d", text: "position: absolute em cada item" },
      ],
      correctOptionIds: ["a"],
      hint: "Uma linha só = uma dimensão.",
      explanation:
        "Barra horizontal é layout de uma dimensão: Flexbox com `justify-content: space-between` resolve. Grid brilha quando há linhas E colunas.",
    },
    {
      id: "q-layout-justify-align",
      type: "code-output",
      skill: "compreensao",
      concept: "flexbox",
      prompt: "Onde ficam os itens deste container flex?",
      code: {
        language: "css",
        code: `.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
}`,
      },
      options: [
        {
          id: "a",
          text: "Centralizados na horizontal e encostados na base do container",
        },
        { id: "b", text: "No canto superior esquerdo" },
        { id: "c", text: "Centralizados na horizontal e na vertical" },
        { id: "d", text: "Espalhados com espaço igual entre eles" },
      ],
      correctOptionIds: ["a"],
      hint: "`justify-content` = eixo principal (horizontal aqui); `align-items` = eixo cruzado (vertical).",
      explanation:
        "`justify-content: center` centraliza no eixo principal (horizontal); `align-items: flex-end` joga os itens para o fim do eixo cruzado (a base).",
    },
    {
      id: "q-layout-autofit",
      type: "single",
      skill: "raciocinio",
      concept: "grid-responsivo",
      prompt:
        "O que `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))` produz quando a tela encolhe?",
      options: [
        {
          id: "a",
          text: "A grade reduz o número de colunas automaticamente, sem media query",
        },
        { id: "b", text: "As colunas ficam sempre em número fixo, só mais estreitas" },
        { id: "c", text: "Os itens somem quando não cabem" },
        { id: "d", text: "Nada; auto-fit só funciona com media queries" },
      ],
      correctOptionIds: ["a"],
      hint: "auto-fit = 'quantas couberem'; minmax define o mínimo de cada coluna.",
      explanation:
        "Cada coluna quer no mínimo 200px. Quando não cabem mais N colunas nesse mínimo, o `auto-fit` remove uma e redistribui — uma grade responsiva sem escrever `@media`.",
    },
    {
      id: "q-layout-mobile-first-order",
      type: "order",
      skill: "raciocinio",
      concept: "responsividade",
      prompt: "Ordene a construção de um layout mobile-first:",
      items: [
        { id: "viewport", text: "Adicionar a meta viewport no <head>" },
        { id: "base", text: "Escrever o CSS base: tudo em uma coluna (celular)" },
        { id: "test", text: "Testar reduzindo a janela ao máximo" },
        { id: "mq", text: "Adicionar @media (min-width) para telas maiores" },
        { id: "enhance", text: "Nas media queries, introduzir colunas e mais espaço" },
      ],
      correctOrder: ["viewport", "base", "test", "mq", "enhance"],
      hint: "Começa no menor; as media queries só ADICIONAM a partir de um ponto.",
      explanation:
        "Sem a meta viewport nada funciona. Depois: estilo base (mobile), verificar no menor tamanho, e só então `min-width` para ampliar o layout em telas grandes.",
    },
    {
      id: "q-layout-units-match",
      type: "match",
      skill: "compreensao",
      concept: "unidades",
      prompt: "Relacione a unidade/função ao seu uso típico:",
      left: [
        { id: "rem", text: "rem" },
        { id: "fr", text: "fr" },
        { id: "pct", text: "%" },
        { id: "clamp", text: "clamp()" },
      ],
      right: [
        { id: "r-rem", text: "Tipografia e espaçamento que respeitam a fonte-base" },
        { id: "r-fr", text: "Dividir o espaço livre entre colunas de um grid" },
        { id: "r-pct", text: "Largura fluida relativa ao elemento pai" },
        { id: "r-clamp", text: "Um valor que cresce com a tela, entre um mínimo e um máximo" },
      ],
      correctPairs: [
        { leftId: "rem", rightId: "r-rem" },
        { leftId: "fr", rightId: "r-fr" },
        { leftId: "pct", rightId: "r-pct" },
        { leftId: "clamp", rightId: "r-clamp" },
      ],
      hint: "Uma delas só existe dentro de Grid.",
      explanation:
        "rem → escala com a raiz; fr → fração do espaço livre no Grid; % → relativo ao pai; clamp(min, ideal, max) → valor fluido com trava.",
    },
  ],

  exercise: {
    id: "ex-layout-galeria",
    title: "Uma galeria responsiva sem media query",
    statement:
      "Você tem um `<div class=\"galeria\">` com 8 `<img>`. Faça uma grade que mostre 4 colunas em telas largas, reduza para 2 no tablet e 1 no celular — usando apenas Grid, sem `@media`.",
    starter: {
      language: "css",
      code: `*, *::before, *::after { box-sizing: border-box; }

.galeria {
  display: grid;
  /* uma linha só de CSS resolve as 3 situações */
  gap: 16px;
}

.galeria img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}`,
    },
    steps: [
      "Use `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`.",
      "Ajuste o `240px` para calibrar quando a grade troca de número de colunas.",
      "Redimensione a janela do navegador e observe as colunas aparecerem e sumirem.",
      "Garanta que as imagens não distorçam (`object-fit: cover`).",
    ],
    hints: [
      "Se as imagens esticarem, confira `width: 100%` no `img` e `object-fit: cover`.",
      "`auto-fill` em vez de `auto-fit` deixa colunas vazias quando sobra espaço — teste os dois e sinta a diferença.",
    ],
    solution: {
      language: "css",
      code: `.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}`,
    },
    selfCheck: [
      "A grade tem 1, 2 ou mais colunas conforme a largura, sem eu ter escrito @media",
      "As imagens mantêm proporção e não distorcem",
      "Há espaço uniforme entre as imagens (gap)",
      "No celular (janela bem estreita) fica tudo em uma coluna",
    ],
  },

  challenge: {
    id: "ch-layout-pagina",
    title: "Layout de página inteiro com Grid + Flex",
    statement:
      "Monte o layout de um app: `header` no topo, `sidebar` fixa à esquerda (240px), `main` ocupando o resto e `footer` embaixo — no desktop. No celular, tudo empilha em uma coluna e a sidebar vira uma linha rolável. Dentro do header, use Flexbox para logo à esquerda e ações à direita.",
    requirements: [
      "A estrutura da página usa Grid (grid-template-areas ou colunas/linhas)",
      "O CSS é mobile-first: base em uma coluna, @media (min-width: 900px) para o layout de duas colunas",
      "O header usa Flexbox internamente (space-between)",
      "Nada de largura fixa em px na área de conteúdo — usar fr, %, min() ou clamp()",
      "A meta viewport está no HTML e o layout é testado do menor ao maior tamanho",
    ],
    hints: [
      "`grid-template-areas` deixa o layout legível: strings como \"header header\" / \"sidebar main\" / \"footer footer\".",
      "Trocar as áreas dentro da media query reorganiza a página inteira com poucas linhas.",
    ],
  },

  checkpoint: {
    id: "cp-css-layout",
    passThreshold: 4,
    successMessage:
      "🎉 CHECKPOINT CONCLUÍDO — você monta layouts que funcionam do celular ao monitor.",
    questions: [
      {
        id: "cp-layout-dimension",
        type: "single",
        skill: "compreensao",
        concept: "layout-escolha",
        prompt:
          "A frase que melhor resume a diferença entre Flexbox e Grid é:",
        options: [
          {
            id: "a",
            text: "Flexbox lida com uma dimensão (linha OU coluna); Grid lida com duas (linhas E colunas)",
          },
          { id: "b", text: "Flexbox é para texto; Grid é para imagens" },
          { id: "c", text: "Grid é mais antigo e Flexbox o substituiu" },
          { id: "d", text: "Só se pode usar um dos dois por página" },
        ],
        correctOptionIds: ["a"],
        hint: "Prateleira vs. estante.",
        explanation:
          "Flexbox distribui ao longo de um eixo; Grid define linhas e colunas simultaneamente. Eles se complementam.",
      },
      {
        id: "cp-layout-center",
        type: "code-output",
        skill: "aplicacao",
        concept: "flexbox",
        prompt: "O que este CSS faz com o conteúdo de `.hero`?",
        code: {
          language: "css",
          code: `.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
        },
        options: [
          {
            id: "a",
            text: "Centraliza o conteúdo na horizontal e na vertical, ocupando a altura da tela",
          },
          { id: "b", text: "Empilha o conteúdo no topo" },
          { id: "c", text: "Espalha o conteúdo pelas bordas" },
          { id: "d", text: "Não tem efeito sem flex-direction" },
        ],
        correctOptionIds: ["a"],
        hint: "center nos dois eixos + 100vh de altura.",
        explanation:
          "`justify-content: center` + `align-items: center` centralizam nos dois eixos; `min-height: 100vh` dá a altura da viewport para a centralização vertical valer.",
      },
      {
        id: "cp-layout-viewport",
        type: "boolean",
        skill: "raciocinio",
        concept: "responsividade",
        prompt:
          "Um site sem a tag `<meta name=\"viewport\" ...>` tende a aparecer 'diminuído' no celular, como se a tela fosse de desktop.",
        options: [
          { id: "t", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["t"],
        hint: "O que o celular assume de largura quando a meta não está lá?",
        explanation:
          "Verdadeiro. Sem a meta viewport, o navegador móvel simula ~980px e reduz a página para caber, ignorando o layout mobile e as media queries.",
      },
      {
        id: "cp-layout-mobile-first",
        type: "single",
        skill: "raciocinio",
        concept: "responsividade",
        prompt:
          "Por que a abordagem mobile-first usa `@media (min-width: ...)` em vez de `max-width`?",
        options: [
          {
            id: "a",
            text: "O CSS base cobre o celular e as media queries só ADICIONAM estilo para telas maiores, mantendo tudo mais simples",
          },
          { id: "b", text: "max-width não é suportado pelos navegadores atuais" },
          { id: "c", text: "min-width carrega a página mais rápido" },
          { id: "d", text: "É só convenção, não muda nada" },
        ],
        correctOptionIds: ["a"],
        hint: "Qual layout é o mais simples e serve de base?",
        explanation:
          "Começando pelo caso mais simples (uma coluna, mobile), cada `min-width` acrescenta o que telas maiores permitem. Fica menos código e menos sobrescrita.",
      },
      {
        id: "cp-layout-props-match",
        type: "match",
        skill: "compreensao",
        concept: "flexbox",
        prompt: "Relacione a propriedade flex ao seu efeito:",
        left: [
          { id: "justify", text: "justify-content" },
          { id: "align", text: "align-items" },
          { id: "wrap", text: "flex-wrap: wrap" },
          { id: "gap", text: "gap" },
        ],
        right: [
          { id: "r-justify", text: "Distribui os itens ao longo do eixo principal" },
          { id: "r-align", text: "Alinha os itens no eixo cruzado" },
          { id: "r-wrap", text: "Permite que os itens quebrem para a próxima linha" },
          { id: "r-gap", text: "Cria espaço entre os itens sem usar margens" },
        ],
        correctPairs: [
          { leftId: "justify", rightId: "r-justify" },
          { leftId: "align", rightId: "r-align" },
          { leftId: "wrap", rightId: "r-wrap" },
          { leftId: "gap", rightId: "r-gap" },
        ],
        hint: "Uma cuida do eixo principal; outra, do cruzado.",
        explanation:
          "justify-content → eixo principal; align-items → eixo cruzado; flex-wrap → quebra de linha; gap → espaçamento entre itens.",
      },
    ],
  },
};
