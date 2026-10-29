import type { Lesson } from "@/content/types";

/** Front-end · Fase 1 · Etapa "Estilo com CSS" · aula 1. */
export const cssBoxModelESeletores: Lesson = {
  id: "fe-css-01-box-model",
  slug: "box-model-e-seletores",
  title: "Box model e seletores",
  summary:
    "Como o navegador calcula tamanho e espaço de cada elemento, e como a especificidade decide qual regra vence.",
  estimatedMinutes: 30,
  status: "available",

  learningObjectives: [
    "Explicar as quatro camadas de uma caixa: content, padding, border e margin",
    "Prever a largura final de um elemento com e sem box-sizing: border-box",
    "Entender o colapso de margens verticais",
    "Escrever seletores por tag, classe, id, descendente e estado (:hover, :focus)",
    "Resolver um conflito entre regras usando a ordem de especificidade",
  ],

  content: [
    {
      type: "paragraph",
      text: "Depois que o HTML define **o que** é cada coisa, o CSS define **como** ela aparece. Duas ideias sustentam quase tudo em CSS: o **box model** (todo elemento é uma caixa retangular com camadas) e os **seletores + especificidade** (como você aponta para os elementos e o que acontece quando duas regras brigam).",
    },
    {
      type: "callout",
      variant: "analogy",
      title: "Uma analogia",
      text: "Pense num quadro na parede: a **foto** é o conteúdo, o **paspatur** branco em volta é o padding, a **moldura** é a border, e o **espaço até o próximo quadro** é a margin.",
    },

    { type: "heading", text: "As quatro camadas da caixa" },
    {
      type: "list",
      items: [
        "**content** — o texto ou a imagem em si; seu tamanho base vem de `width`/`height`.",
        "**padding** — espaço interno, entre o conteúdo e a borda. Fica dentro do fundo do elemento.",
        "**border** — a linha que contorna o padding.",
        "**margin** — espaço externo, empurrando os vizinhos para longe. É transparente.",
      ],
    },
    {
      type: "code",
      language: "css",
      code: `.cartao {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  margin: 16px;
}`,
    },
    {
      type: "heading", text: "A pegadinha da largura" },
    {
      type: "paragraph",
      text: "Por padrão (`box-sizing: content-box`), `width` mede **só o conteúdo**. A largura ocupada na tela é `width + padding-esquerda + padding-direita + border-esquerda + border-direita`. No exemplo acima: `300 + 20 + 20 + 2 + 2 = 344px`. Isso quebra layouts o tempo todo.",
    },
    {
      type: "code",
      language: "css",
      caption: "A regra que quase todo projeto usa hoje",
      code: `*, *::before, *::after {
  box-sizing: border-box;
}`,
    },
    {
      type: "callout",
      variant: "tip",
      title: "O que border-box faz",
      text: "Com `box-sizing: border-box`, `width` passa a incluir padding e border. Aí `width: 300px` significa **300px na tela**, e o conteúdo se ajusta por dentro. Muito mais previsível.",
    },

    { type: "heading", text: "Colapso de margem" },
    {
      type: "paragraph",
      text: "Margens **verticais** de elementos vizinhos não se somam: elas se sobrepõem, e vale a maior. Se um parágrafo tem `margin-bottom: 20px` e o próximo tem `margin-top: 30px`, o espaço entre eles é **30px**, não 50. Isso só acontece na vertical, e não acontece dentro de containers `flex` ou `grid`.",
    },

    { type: "heading", text: "Seletores: como apontar para os elementos" },
    {
      type: "code",
      language: "css",
      code: `p              { }   /* toda tag <p>                         */
.destaque      { }   /* todo elemento class="destaque"       */
#topo          { }   /* o elemento id="topo" (único)         */
nav a          { }   /* todo <a> dentro de <nav> (descendente) */
nav > a        { }   /* <a> filho DIRETO de <nav>            */
a:hover        { }   /* <a> com o mouse em cima             */
input:focus    { }   /* o input que está com o foco          */
li:first-child { }   /* o primeiro <li> da lista            */`,
    },
    {
      type: "list",
      items: [
        "Combine com vírgula para aplicar a mesma regra a vários seletores: `h1, h2, h3 { ... }`.",
        "Prefira **classes**. Elas são reutilizáveis e têm especificidade equilibrada.",
        "Evite estilizar por **id** — especificidade alta demais, difícil de sobrescrever depois.",
      ],
    },

    { type: "heading", text: "Especificidade: quem vence a briga" },
    {
      type: "paragraph",
      text: "Quando duas regras definem a mesma propriedade para o mesmo elemento, o navegador escolhe pela **especificidade**. Da mais fraca para a mais forte: seletor de tag < classe / `:hover` / `[atributo]` < id < `style=\"\"` no HTML < `!important`. Empate na especificidade? Ganha **quem vem por último** no arquivo.",
    },
    {
      type: "example",
      title: "Qual cor o botão fica?",
      text: "O elemento é `<button class=\"btn\" id=\"enviar\">`. Três regras tentam colorir o texto.",
      code: {
        language: "css",
        code: `button   { color: gray; }   /* tag: fraca          */
.btn     { color: blue; }   /* classe: média       */
#enviar  { color: red;  }   /* id: forte -> VENCE  */`,
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Cuidado com !important",
      text: "`!important` atropela tudo — e por isso vira uma bola de neve: para sobrescrever um `!important` você precisa de outro `!important`. Use como último recurso, não como atalho.",
    },
  ],

  video: {
    title: "CSS Crash Course For Absolute Beginners",
    provider: "YouTube",
    channel: "Traversy Media",
    url: "https://www.youtube.com/watch?v=yfoY53QXEnI",
    description:
      "Cobre box model, seletores, unidades e as propriedades mais usadas. Em inglês.",
    lang: "en",
  },

  freeResources: [
    {
      kind: "docs",
      title: "O modelo de caixa (box model)",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/CSS/Building_blocks/The_box_model",
      description: "content, padding, border e margin com diagramas interativos.",
      lang: "pt-BR",
    },
    {
      kind: "docs",
      title: "Seletores CSS",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Selectors",
      description: "A referência completa de seletores, com exemplos de cada tipo.",
      lang: "pt-BR",
    },
    {
      kind: "article",
      title: "Specifics on CSS Specificity",
      provider: "CSS-Tricks",
      url: "https://css-tricks.com/specifics-on-css-specificity/",
      description: "O melhor guia visual de como a especificidade é calculada.",
      lang: "en",
    },
    {
      kind: "course",
      title: "Learn CSS — Box Model",
      provider: "web.dev (Google)",
      url: "https://web.dev/learn/css/box-model",
      description: "Capítulo enxuto e moderno sobre o box model.",
      lang: "en",
    },
  ],

  premiumResources: [
    {
      title: "CSS para Iniciantes",
      platform: "Origamid",
      url: "https://www.origamid.com/",
      reason:
        "A Origamid é referência em CSS no Brasil; se você quer aprofundar seletores, unidades e layout com aulas em português e projetos, vale conhecer.",
    },
  ],

  questions: [
    {
      id: "q-css-width-calc",
      type: "single",
      skill: "aplicacao",
      concept: "box-model",
      prompt:
        "Com `box-sizing: content-box` (o padrão), quanto este elemento ocupa de largura na tela?",
      code: {
        language: "css",
        code: `.caixa {
  width: 200px;
  padding: 16px;
  border: 4px solid black;
}`,
      },
      options: [
        { id: "a", text: "240px" },
        { id: "b", text: "200px" },
        { id: "c", text: "216px" },
        { id: "d", text: "220px" },
      ],
      correctOptionIds: ["a"],
      hint: "Some os dois lados: width + 2×padding + 2×border.",
      explanation:
        "200 + 16 + 16 + 4 + 4 = 240px. Com `content-box`, `width` mede só o conteúdo; padding e border são somados por fora.",
    },
    {
      id: "q-css-border-box",
      type: "single",
      skill: "compreensao",
      concept: "box-model",
      prompt:
        "Ainda no elemento da questão anterior, o que muda se você aplicar `box-sizing: border-box`?",
      options: [
        {
          id: "a",
          text: "Ele passa a ocupar 200px na tela; o conteúdo encolhe para caber com o padding e a border",
        },
        { id: "b", text: "Ele passa a ocupar 168px" },
        { id: "c", text: "Nada muda; box-sizing só afeta a altura" },
        { id: "d", text: "A border é ignorada" },
      ],
      correctOptionIds: ["a"],
      hint: "Com border-box, `width` já inclui padding e border.",
      explanation:
        "`border-box` faz `width: 200px` valer para a caixa inteira. O espaço do conteúdo vira 200 − 32 (padding) − 8 (border) = 160px.",
    },
    {
      id: "q-css-margin-collapse",
      type: "boolean",
      skill: "raciocinio",
      concept: "margin-collapse",
      prompt:
        "Um `<p>` com `margin-bottom: 24px` é seguido por outro `<p>` com `margin-top: 16px`. O espaço vertical entre eles é 40px.",
      options: [
        { id: "t", text: "Verdadeiro" },
        { id: "f", text: "Falso" },
      ],
      correctOptionIds: ["f"],
      hint: "Margens verticais de vizinhos não se somam.",
      explanation:
        "Falso. Elas colapsam e vale a maior: 24px. O colapso só ocorre na vertical e não dentro de containers flex/grid.",
    },
    {
      id: "q-css-specificity-order",
      type: "order",
      skill: "compreensao",
      concept: "especificidade",
      prompt: "Ordene os seletores da MENOR para a MAIOR especificidade:",
      items: [
        { id: "tag", text: "p" },
        { id: "class", text: ".texto" },
        { id: "id", text: "#intro" },
        { id: "inline", text: "style=\"...\" no HTML" },
        { id: "important", text: "regra com !important" },
      ],
      correctOrder: ["tag", "class", "id", "inline", "important"],
      hint: "Tag é a base; !important atropela tudo.",
      explanation:
        "tag < classe < id < style inline < !important. Em empate de especificidade, vence a regra declarada por último.",
    },
    {
      id: "q-css-selector-match",
      type: "match",
      skill: "compreensao",
      concept: "seletores",
      prompt: "Relacione o seletor ao que ele seleciona:",
      left: [
        { id: "desc", text: "nav a" },
        { id: "child", text: "nav > a" },
        { id: "hover", text: "a:hover" },
        { id: "first", text: "li:first-child" },
      ],
      right: [
        { id: "r-desc", text: "Qualquer <a> dentro de <nav>, em qualquer nível" },
        { id: "r-child", text: "Apenas <a> que é filho direto de <nav>" },
        { id: "r-hover", text: "<a> enquanto o ponteiro está sobre ele" },
        { id: "r-first", text: "O primeiro <li> dentro do seu container" },
      ],
      correctPairs: [
        { leftId: "desc", rightId: "r-desc" },
        { leftId: "child", rightId: "r-child" },
        { leftId: "hover", rightId: "r-hover" },
        { leftId: "first", rightId: "r-first" },
      ],
      hint: "O espaço é 'descendente'; o `>` é 'filho direto'.",
      explanation:
        "`nav a` = descendente (qualquer profundidade); `nav > a` = filho imediato; `:hover` = estado do ponteiro; `:first-child` = primeiro filho.",
    },
  ],

  exercise: {
    id: "ex-css-cartao",
    title: "Estilize um cartão com o box model",
    statement:
      "Dado o HTML de um cartão (`<article class=\"card\">` com um `<h2>`, um `<p>` e um `<a class=\"botao\">`), escreva o CSS para deixá-lo com largura previsível, respiro interno e um botão com estado de hover.",
    starter: {
      language: "css",
      code: `/* comece resetando o box model */
*, *::before, *::after { box-sizing: border-box; }

.card {
  /* largura, padding, border, margin, border-radius */
}

.botao {
  /* padding, cor de fundo, cor do texto, sem sublinhado */
}

.botao:hover {
  /* mude o fundo no hover */
}`,
    },
    steps: [
      "Garanta `box-sizing: border-box` para todos os elementos.",
      "No `.card`: `width` fixa (ex.: 320px), `padding` de ~20px, uma `border` sutil e `border-radius`.",
      "No `.botao`: `display: inline-block`, `padding`, cor de fundo, cor de texto, `text-decoration: none`.",
      "Em `.botao:hover`, troque a cor de fundo.",
      "Abra o DevTools, selecione o `.card` e confira o diagrama do box model.",
    ],
    hints: [
      "Se o card \"estourar\" o container, provavelmente faltou `border-box`.",
      "`transition: background-color 0.2s` deixa o hover mais suave.",
    ],
    solution: {
      language: "css",
      code: `*, *::before, *::after { box-sizing: border-box; }

.card {
  width: 320px;
  padding: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  margin: 16px;
}

.botao {
  display: inline-block;
  padding: 10px 18px;
  background-color: #2563eb;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.botao:hover {
  background-color: #1d4ed8;
}`,
    },
    selfCheck: [
      "O card tem exatamente a largura que eu defini (não estoura)",
      "Há respiro entre o conteúdo e a borda (padding)",
      "O botão muda de cor ao passar o mouse",
      "Consigo ler o box model do card no DevTools",
    ],
  },

  challenge: {
    id: "ch-css-especificidade",
    title: "Desminando um conflito de especificidade",
    statement:
      "Você recebeu uma folha de estilo em que um link de menu deveria ficar branco, mas está preto. Há quatro regras mirando esse `<a class=\"menu-link\" id=\"link-home\">`. Descubra qual está vencendo e corrija — sem usar `!important`.",
    requirements: [
      "Liste as quatro regras em ordem de especificidade",
      "Aponte qual delas está definindo a cor preta e por que ela vence",
      "Proponha uma correção que faça o branco vencer usando um seletor de especificidade igual ou menor que a regra vencedora",
      "Explique por que evitar `!important` aqui é melhor a longo prazo",
    ],
    hints: [
      "Some: (ids, classes/pseudo-classes/atributos, tags). O maior número da esquerda para a direita vence.",
      "Às vezes a solução é remover o id do seletor problemático, não adicionar peso ao outro.",
    ],
  },

  checkpoint: {
    id: "cp-css-box-model",
    passThreshold: 4,
    successMessage:
      "🎉 CHECKPOINT CONCLUÍDO — box model e especificidade não te pegam mais de surpresa.",
    questions: [
      {
        id: "cp-css-total-width",
        type: "single",
        skill: "aplicacao",
        concept: "box-model",
        prompt:
          "Com `box-sizing: border-box`, qual a largura de conteúdo disponível dentro deste elemento?",
        code: {
          language: "css",
          code: `.painel {
  width: 400px;
  padding: 24px;
  border: 1px solid #ccc;
}`,
        },
        options: [
          { id: "a", text: "350px" },
          { id: "b", text: "400px" },
          { id: "c", text: "352px" },
          { id: "d", text: "448px" },
        ],
        correctOptionIds: ["a"],
        hint: "border-box: o conteúdo é 400 menos padding e border dos dois lados.",
        explanation:
          "400 − 24 − 24 − 1 − 1 = 350px sobram para o conteúdo. A caixa continua ocupando 400px na tela.",
      },
      {
        id: "cp-css-margin-nature",
        type: "boolean",
        skill: "compreensao",
        concept: "box-model",
        prompt:
          "A `margin` faz parte da área clicável e pintada de fundo do elemento.",
        options: [
          { id: "t", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
        hint: "Qual camada é o espaço *externo* e transparente?",
        explanation:
          "Falso. A margin é espaço externo e transparente — não recebe `background` nem responde a clique. Quem faz isso é o padding (interno).",
      },
      {
        id: "cp-css-specificity-winner",
        type: "code-output",
        skill: "raciocinio",
        concept: "especificidade",
        prompt:
          "O elemento é `<p class=\"aviso destaque\">`. Qual `color` ele recebe?",
        code: {
          language: "css",
          code: `p              { color: black; }
.destaque      { color: green; }
.aviso.destaque{ color: orange; }`,
        },
        options: [
          { id: "a", text: "orange — dois seletores de classe têm mais especificidade que um" },
          { id: "b", text: "green — vem depois de black" },
          { id: "c", text: "black — tag sempre perde por vir primeiro" },
          { id: "d", text: "depende da ordem no HTML" },
        ],
        correctOptionIds: ["a"],
        hint: "Conte quantas classes cada seletor usa.",
        explanation:
          "`.aviso.destaque` tem duas classes (especificidade 0-2-0), contra uma de `.destaque` (0-1-0) e a tag (0-0-1). O laranja vence.",
      },
      {
        id: "cp-css-child-selector",
        type: "single",
        skill: "aplicacao",
        concept: "seletores",
        prompt:
          "Você quer estilizar só os itens de menu do primeiro nível, sem afetar os submenus aninhados. Qual seletor?",
        options: [
          { id: "a", text: ".menu > li" },
          { id: "b", text: ".menu li" },
          { id: "c", text: ".menu li li" },
          { id: "d", text: ".menu, li" },
        ],
        correctOptionIds: ["a"],
        hint: "Você quer só os filhos *diretos*.",
        explanation:
          "`.menu > li` pega apenas os `<li>` que são filhos imediatos de `.menu`. `.menu li` pegaria também os itens de submenus.",
      },
      {
        id: "cp-css-state-match",
        type: "match",
        skill: "compreensao",
        concept: "seletores",
        prompt: "Relacione a pseudo-classe ao momento em que ela se aplica:",
        left: [
          { id: "hover", text: ":hover" },
          { id: "focus", text: ":focus" },
          { id: "active", text: ":active" },
          { id: "disabled", text: ":disabled" },
        ],
        right: [
          { id: "r-hover", text: "O ponteiro está sobre o elemento" },
          { id: "r-focus", text: "O elemento está selecionado (por clique ou Tab)" },
          { id: "r-active", text: "O elemento está sendo pressionado neste instante" },
          { id: "r-disabled", text: "O controle de formulário está desativado" },
        ],
        correctPairs: [
          { leftId: "hover", rightId: "r-hover" },
          { leftId: "focus", rightId: "r-focus" },
          { leftId: "active", rightId: "r-active" },
          { leftId: "disabled", rightId: "r-disabled" },
        ],
        hint: "Um é 'mouse em cima', outro é 'selecionado', outro é 'clicando agora'.",
        explanation:
          ":hover = ponteiro sobre; :focus = com foco; :active = pressionado no momento; :disabled = campo inativo.",
      },
    ],
  },
};
