import type { Lesson } from "@/content/types";

/** Front-end · Fase 1 · Etapa "Estrutura com HTML" · aula 1. */
export const htmlTagsEEstrutura: Lesson = {
  id: "fe-html-01-tags",
  slug: "tags-e-estrutura",
  title: "Tags, estrutura e semântica",
  summary:
    "O esqueleto de um documento HTML e por que escolher a tag pelo significado — e não pela aparência — muda tudo.",
  estimatedMinutes: 30,
  status: "available",

  learningObjectives: [
    "Escrever o esqueleto de um documento HTML válido (doctype, html, head, body)",
    "Diferenciar elementos de bloco e de linha e saber quando cada um aparece",
    "Escolher a tag semântica certa (header, nav, main, section, article, aside, footer)",
    "Montar uma hierarquia de títulos (h1–h6) que faça sentido para pessoas e para buscadores",
    "Achar e corrigir erros de aninhamento e de semântica num trecho de HTML",
  ],

  content: [
    {
      type: "paragraph",
      text: "HTML descreve a **estrutura e o significado** do conteúdo de uma página — o que é título, o que é parágrafo, o que é lista, o que é navegação. Ele não cuida da aparência (isso é CSS) nem do comportamento (isso é JavaScript). Escrever bom HTML é a diferença entre uma página que só *parece* certa e uma que também funciona para o Google, para leitores de tela e para o próximo dev que abrir o código.",
    },
    {
      type: "callout",
      variant: "analogy",
      title: "Uma analogia",
      text: "HTML é a **planta da casa**: aqui é a cozinha, aqui é o quarto, esta parede é estrutural. CSS é a decoração — cor da parede, móveis, iluminação. JavaScript é a parte elétrica e hidráulica, que faz as coisas reagirem. Ninguém decora antes de ter as paredes.",
    },

    { type: "heading", text: "O esqueleto de toda página" },
    {
      type: "code",
      language: "html",
      caption: "A estrutura mínima de um documento HTML5",
      code: `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minha primeira página</title>
  </head>
  <body>
    <h1>Olá, mundo</h1>
    <p>Meu primeiro parágrafo.</p>
  </body>
</html>`,
    },
    {
      type: "list",
      items: [
        "**`<!doctype html>`** — avisa o navegador para renderizar no modo padrões (sem isso ele entra num modo de compatibilidade antigo).",
        "**`<html lang=\"pt-BR\">`** — a raiz do documento; o `lang` ajuda leitores de tela na pronúncia e ferramentas de tradução.",
        "**`<head>`** — metadados que não aparecem na página: charset, título da aba, viewport, links para CSS.",
        "**`<body>`** — tudo que é visível: textos, imagens, botões, seções.",
      ],
    },

    { type: "heading", text: "Elemento, tag e atributo" },
    {
      type: "paragraph",
      text: "Um **elemento** costuma ter uma tag de abertura, um conteúdo e uma tag de fechamento. **Atributos** ficam na tag de abertura e configuram o elemento. Alguns elementos são **vazios** (não têm conteúdo nem fechamento): `<img>`, `<br>`, `<input>`, `<meta>`.",
    },
    {
      type: "code",
      language: "html",
      code: `<a href="/sobre" title="Sobre nós">Quem somos</a>
<!--  ^tag       ^atributo         ^conteúdo   ^fecha  -->

<img src="/logo.png" alt="Logotipo da StudyMaps" />
<!--  elemento vazio: sem conteúdo, sem tag de fechamento  -->`,
    },

    { type: "heading", text: "Bloco vs. linha" },
    {
      type: "paragraph",
      text: "Por padrão, elementos de **bloco** (`div`, `p`, `h1`, `section`, `ul`, `li`…) começam numa nova linha e ocupam toda a largura disponível. Elementos de **linha** (`span`, `a`, `strong`, `em`, `img`) fluem dentro do texto, um ao lado do outro.",
    },
    {
      type: "callout",
      variant: "info",
      text: "Isso é só o comportamento padrão — o CSS pode inverter com `display`. Mas a **escolha da tag** deve ser pelo significado do conteúdo, nunca pelo layout que ela produz de fábrica.",
    },

    { type: "heading", text: "Semântica: a tag certa para a coisa certa" },
    {
      type: "paragraph",
      text: "`<div>` e `<span>` não significam nada — são caixas genéricas. Já `<nav>`, `<main>`, `<article>` e companhia **comunicam intenção**: o navegador, o leitor de tela e o buscador sabem o que é aquilo. Trocar `<div class=\"nav\">` por `<nav>` não muda um pixel, mas melhora acessibilidade e SEO de graça.",
    },
    {
      type: "list",
      items: [
        "**`<header>`** — topo de uma página ou seção (logo, título, busca).",
        "**`<nav>`** — um bloco de links de navegação. Pode haver mais de um.",
        "**`<main>`** — o conteúdo único e central da página. **Só um por página.**",
        "**`<section>`** — um agrupamento temático, normalmente com um título próprio.",
        "**`<article>`** — conteúdo autossuficiente, que faria sentido isolado (um post, um card de produto, um comentário).",
        "**`<aside>`** — conteúdo tangencial (barra lateral, box de \"leia também\").",
        "**`<footer>`** — rodapé de uma página ou seção (créditos, links secundários).",
      ],
    },
    {
      type: "example",
      title: "Antes e depois",
      text: "As duas versões renderizam igual. A de baixo é legível para máquinas e para humanos.",
      code: {
        language: "html",
        code: `<!-- sopa de divs -->
<div class="topo">
  <div class="menu">...</div>
</div>
<div class="conteudo">
  <div class="post">...</div>
</div>
<div class="rodape">...</div>

<!-- semântico -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>`,
      },
    },

    { type: "heading", text: "Títulos: de h1 a h6" },
    {
      type: "paragraph",
      text: "Os títulos formam o **índice** da página. Idealmente **um `<h1>`** (o assunto da página), `<h2>` para as seções, `<h3>` para subseções, e assim por diante. Leitores de tela permitem pular de título em título — uma hierarquia furada quebra essa navegação.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Erro clássico",
      text: "Usar `<h4>` \"porque ficou do tamanho certo\". O nível do título é semântico; o tamanho é problema do CSS. Escolha `<h2>` vs `<h3>` pela **posição na hierarquia**, e ajuste a fonte depois.",
    },

    { type: "heading", text: "Atributos que aparecem o tempo todo" },
    {
      type: "list",
      items: [
        "**`id`** — identificador único na página (âncoras, alvo de JS/CSS).",
        "**`class`** — rótulo reutilizável, usado por CSS e JS.",
        "**`alt`** (em `<img>`) — texto alternativo. **Obrigatório**: descreve a imagem para quem não a vê e aparece se ela falhar ao carregar.",
        "**`href`** (em `<a>`) e **`src`** (em `<img>`, `<script>`) — para onde o elemento aponta.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Na prática",
      text: "Cole seu HTML no **validator.w3.org**. Quando a marcação está quebrada, o navegador \"conserta\" do jeito dele — e nem sempre do jeito que você queria.",
    },
  ],

  video: {
    title: "HTML Crash Course For Absolute Beginners",
    provider: "YouTube",
    channel: "Traversy Media",
    url: "https://www.youtube.com/watch?v=UB1O30fR-EE",
    description:
      "Passa por todas as tags essenciais construindo uma página do zero. Em inglês, com legendas automáticas.",
    lang: "en",
  },

  freeResources: [
    {
      kind: "docs",
      title: "Estrutura de um documento e de um site",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure",
      description: "Como as tags semânticas se encaixam numa página real.",
      lang: "pt-BR",
    },
    {
      kind: "docs",
      title: "Referência de elementos HTML",
      provider: "MDN Web Docs",
      url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element",
      description: "A lista completa, com o significado e o uso de cada tag.",
      lang: "pt-BR",
    },
    {
      kind: "course",
      title: "Learn HTML",
      provider: "web.dev (Google)",
      url: "https://web.dev/learn/html",
      description: "Curso escrito, curto e moderno, com foco em marcação correta.",
      lang: "en",
    },
    {
      kind: "article",
      title: "HTML: guia de estudo",
      provider: "freeCodeCamp",
      url: "https://www.freecodecamp.org/portuguese/news/tag/html/",
      description: "Artigos em português sobre tags, formulários e boas práticas.",
      lang: "pt-BR",
    },
  ],

  premiumResources: [
    {
      title: "Formação HTML e CSS",
      platform: "Alura",
      url: "https://www.alura.com.br/",
      reason:
        "Se você prefere uma trilha guiada com exercícios corrigidos e projetos, a formação cobre HTML semântico e CSS do básico ao layout.",
    },
  ],

  questions: [
    {
      id: "q-html-semantic-swap",
      type: "single",
      skill: "aplicacao",
      concept: "html-semantica",
      prompt:
        "Você recebeu este trecho. Qual mudança melhora a semântica **sem alterar a aparência**?",
      code: {
        language: "html",
        code: `<div class="cabecalho">
  <div class="navegacao"><a href="/">Início</a></div>
</div>
<div class="principal">...</div>`,
      },
      options: [
        {
          id: "a",
          text: "Trocar as divs por <header>, <nav> e <main>, mantendo as classes",
        },
        { id: "b", text: "Adicionar style=\"display:block\" em cada div" },
        { id: "c", text: "Trocar as divs por <span>" },
        { id: "d", text: "Envolver tudo em um único <section>" },
      ],
      correctOptionIds: ["a"],
      hint: "Quais tags comunicam 'topo da página', 'navegação' e 'conteúdo principal'?",
      explanation:
        "`<header>`, `<nav>` e `<main>` têm exatamente esse significado. Como já eram divs (bloco), o layout não muda — mas agora leitores de tela e buscadores entendem a estrutura.",
    },
    {
      id: "q-html-heading-size",
      type: "boolean",
      skill: "compreensao",
      concept: "html-titulos",
      prompt:
        "É correto escolher entre `<h2>` e `<h3>` com base no tamanho de fonte que você quer que apareça.",
      options: [
        { id: "t", text: "Verdadeiro" },
        { id: "f", text: "Falso" },
      ],
      correctOptionIds: ["f"],
      hint: "Quem decide tamanho de fonte: o HTML ou o CSS?",
      explanation:
        "Falso. O nível do título é hierárquico (seção, subseção…). O tamanho é responsabilidade do CSS. Pular níveis para conseguir um visual quebra a navegação por títulos.",
    },
    {
      id: "q-html-nesting",
      type: "code-output",
      skill: "raciocinio",
      concept: "html-aninhamento",
      prompt: "O que o navegador faz ao encontrar este HTML?",
      code: {
        language: "html",
        code: `<p>Início do texto <div>um bloco</div> e o resto.</p>`,
      },
      options: [
        {
          id: "a",
          text: "Fecha o <p> automaticamente antes da <div>, deixando \"e o resto.\" fora de qualquer parágrafo",
        },
        { id: "b", text: "Renderiza tudo normalmente dentro do <p>" },
        { id: "c", text: "Ignora a <div> e mantém só o texto" },
        { id: "d", text: "Mostra um erro e não renderiza a página" },
      ],
      correctOptionIds: ["a"],
      hint: "Um elemento de bloco pode viver dentro de `<p>`?",
      explanation:
        "`<p>` só aceita conteúdo de linha. Ao ver a `<div>` (bloco), o navegador fecha o `<p>` ali mesmo. O resultado no DOM é diferente do que o código sugere — por isso HTML inválido causa bugs difíceis.",
    },
    {
      id: "q-html-skeleton-order",
      type: "order",
      skill: "compreensao",
      concept: "html-estrutura",
      prompt: "Coloque as partes de um documento HTML na ordem em que aparecem:",
      items: [
        { id: "doctype", text: "<!doctype html>" },
        { id: "htmlopen", text: "<html lang=\"pt-BR\">" },
        { id: "head", text: "<head> com <meta charset> e <title>" },
        { id: "body", text: "<body> com o conteúdo visível" },
        { id: "htmlclose", text: "</html>" },
      ],
      correctOrder: ["doctype", "htmlopen", "head", "body", "htmlclose"],
      hint: "O `<head>` (metadados) vem antes do `<body>` (conteúdo).",
      explanation:
        "Primeiro o doctype, depois a raiz `<html>`, dentro dela o `<head>` e em seguida o `<body>`, e por fim o fechamento de `<html>`.",
    },
    {
      id: "q-html-sectioning-match",
      type: "match",
      skill: "compreensao",
      concept: "html-semantica",
      prompt: "Relacione cada tag ao seu papel:",
      left: [
        { id: "main", text: "<main>" },
        { id: "nav", text: "<nav>" },
        { id: "article", text: "<article>" },
        { id: "aside", text: "<aside>" },
      ],
      right: [
        { id: "r-main", text: "O conteúdo único e central da página" },
        { id: "r-nav", text: "Um bloco de links de navegação" },
        {
          id: "r-article",
          text: "Conteúdo autossuficiente, que faria sentido sozinho",
        },
        { id: "r-aside", text: "Conteúdo tangencial, ligado mas secundário" },
      ],
      correctPairs: [
        { leftId: "main", rightId: "r-main" },
        { leftId: "nav", rightId: "r-nav" },
        { leftId: "article", rightId: "r-article" },
        { leftId: "aside", rightId: "r-aside" },
      ],
      hint: "Pense: 'o que sobraria se eu recortasse esse pedaço e colasse em outro lugar?'",
      explanation:
        "`<main>` é o miolo (um por página); `<nav>` são links; `<article>` sobrevive fora de contexto (um post, um card); `<aside>` complementa sem ser essencial.",
    },
  ],

  exercise: {
    id: "ex-html-refatora-div-soup",
    title: "Refatore uma sopa de divs",
    statement:
      "A página abaixo funciona, mas é toda feita de `<div>`. Reescreva usando tags semânticas e uma hierarquia de títulos correta. Não use CSS.",
    starter: {
      language: "html",
      code: `<div class="site">
  <div class="topo">
    <div class="logo">Meu Blog</div>
    <div class="menu">
      <a href="/">Início</a> <a href="/sobre">Sobre</a>
    </div>
  </div>

  <div class="miolo">
    <div class="post">
      <div class="titulo-post">Como comecei a programar</div>
      <div class="texto">Era uma vez um parágrafo...</div>
      <div class="subtitulo">O primeiro projeto</div>
      <div class="texto">Outro parágrafo...</div>
      <img src="setup.png" />
    </div>
  </div>

  <div class="rodape">© 2026 Meu Blog</div>
</div>`,
    },
    steps: [
      "Troque `topo` por `<header>`, `menu` por `<nav>`, `miolo` por `<main>`, `post` por `<article>` e `rodape` por `<footer>`.",
      "O título do post deve ser um `<h1>`; \"O primeiro projeto\" deve ser `<h2>`.",
      "Transforme os blocos de texto em `<p>`.",
      "Adicione `lang=\"pt-BR\"` no `<html>` e um `alt` descritivo na imagem.",
      "Cole o resultado no validator.w3.org e corrija o que aparecer.",
    ],
    hints: [
      "Deve existir exatamente um `<main>` e um `<h1>` na página.",
      "O nome do blog no topo não precisa ser um heading — pode ser um texto simples ou um link.",
    ],
    solution: {
      language: "html",
      code: `<header>
  <p>Meu Blog</p>
  <nav>
    <a href="/">Início</a>
    <a href="/sobre">Sobre</a>
  </nav>
</header>

<main>
  <article>
    <h1>Como comecei a programar</h1>
    <p>Era uma vez um parágrafo...</p>
    <h2>O primeiro projeto</h2>
    <p>Outro parágrafo...</p>
    <img src="setup.png" alt="Minha mesa com o notebook aberto no editor" />
  </article>
</main>

<footer>© 2026 Meu Blog</footer>`,
      note: "As classes foram removidas por clareza; num projeto real você as manteria para o CSS.",
    },
    selfCheck: [
      "A página tem exatamente um <main> e um <h1>",
      "Nenhuma <div> sobrou onde uma tag semântica cabia",
      "A imagem tem um alt que descreve o que ela mostra",
      "Passa no validator.w3.org sem erros",
    ],
  },

  challenge: {
    id: "ch-html-receita",
    title: "Marque uma página de receita",
    statement:
      "Escreva o HTML (sem CSS) de uma página de receita à sua escolha: título, foto com legenda, tempo e rendimento, ingredientes, modo de preparo e dicas.",
    requirements: [
      "A receita inteira está dentro de um <article>",
      "A foto usa <figure> com <figcaption>",
      "Ingredientes em <ul>; modo de preparo em <ol>",
      "As dicas ficam em um <aside>",
      "Hierarquia de títulos correta, com um único <h1>",
      "A imagem tem alt e a página passa no validador do W3C",
    ],
    hints: [
      "`<time datetime=\"PT45M\">45 minutos</time>` marca duração de forma legível para máquinas.",
      "Rendimento e tempo podem ficar juntos numa pequena lista de definição `<dl>`, ou em parágrafos — o que importa é a marcação fazer sentido.",
    ],
  },

  checkpoint: {
    id: "cp-html-tags",
    passThreshold: 4,
    successMessage: "🎉 CHECKPOINT CONCLUÍDO — você monta HTML com estrutura e intenção.",
    questions: [
      {
        id: "cp-html-one-h1",
        type: "single",
        skill: "compreensao",
        concept: "html-titulos",
        prompt: "Quantos elementos `<h1>` uma página deve ter, na prática recomendada?",
        options: [
          { id: "a", text: "Um, representando o assunto da página" },
          { id: "b", text: "Um por seção" },
          { id: "c", text: "Quantos forem necessários para o visual" },
          { id: "d", text: "Nenhum — `<h1>` é obsoleto" },
        ],
        correctOptionIds: ["a"],
        hint: "É o topo do índice da página.",
        explanation:
          "Um `<h1>` que diz do que a página trata. As seções internas usam `<h2>`, `<h3>`…",
      },
      {
        id: "cp-html-ul-child",
        type: "code-output",
        skill: "raciocinio",
        concept: "html-aninhamento",
        prompt: "Por que este HTML é inválido?",
        code: { language: "html", code: `<ul>
  <p>Maçã</p>
  <p>Banana</p>
</ul>` },
        options: [
          {
            id: "a",
            text: "O conteúdo direto de <ul> precisa estar em <li>; <p> não é filho válido de <ul>",
          },
          { id: "b", text: "Listas não aceitam texto, só imagens" },
          { id: "c", text: "Faltou o atributo type no <ul>" },
          { id: "d", text: "<ul> precisa de no mínimo três itens" },
        ],
        correctOptionIds: ["a"],
        hint: "O que vai *dentro* de uma lista não ordenada?",
        explanation:
          "Só `<li>` (e alguns elementos de script) podem ser filhos diretos de `<ul>`. O texto de cada item vai dentro de um `<li>`.",
      },
      {
        id: "cp-html-footer-nav",
        type: "single",
        skill: "aplicacao",
        concept: "html-semantica",
        prompt:
          "No rodapé você tem um grupo de links (Privacidade, Termos, Contato). Qual marcação é a mais adequada?",
        options: [
          { id: "a", text: "Um <nav> dentro do <footer>, idealmente com aria-label" },
          { id: "b", text: "Um <section> com vários <a>" },
          { id: "c", text: "Uma <div> com os links" },
          { id: "d", text: "Um segundo <main>" },
        ],
        correctOptionIds: ["a"],
        hint: "É navegação — mesmo que secundária.",
        explanation:
          "Pode haver mais de um `<nav>` por página. Um `aria-label=\"Rodapé\"` distingue esse do menu principal para quem usa leitor de tela.",
      },
      {
        id: "cp-html-section-heading",
        type: "boolean",
        skill: "raciocinio",
        concept: "html-semantica",
        prompt:
          "Se um `<section>` não tem um título (heading) que o identifique, muitas vezes é sinal de que uma `<div>` seria mais apropriada.",
        options: [
          { id: "t", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["t"],
        hint: "`<section>` = agrupamento temático. Tema costuma ter nome.",
        explanation:
          "Verdadeiro. `<section>` representa um trecho temático e normalmente carrega um heading. Sem tema nem título, é só uma caixa — e caixa genérica é `<div>`.",
      },
      {
        id: "cp-html-head-match",
        type: "match",
        skill: "compreensao",
        concept: "html-estrutura",
        prompt: "Relacione cada item do `<head>` ao que ele faz:",
        left: [
          { id: "doctype", text: "<!doctype html>" },
          { id: "charset", text: "<meta charset=\"utf-8\">" },
          { id: "lang", text: "lang=\"pt-BR\" no <html>" },
          { id: "title", text: "<title>" },
        ],
        right: [
          { id: "r-doctype", text: "Ativa o modo de padrões do navegador" },
          { id: "r-charset", text: "Faz acentos e ç aparecerem corretamente" },
          { id: "r-lang", text: "Ajuda leitores de tela e tradução automática" },
          { id: "r-title", text: "Define o nome na aba e no resultado de busca" },
        ],
        correctPairs: [
          { leftId: "doctype", rightId: "r-doctype" },
          { leftId: "charset", rightId: "r-charset" },
          { leftId: "lang", rightId: "r-lang" },
          { leftId: "title", rightId: "r-title" },
        ],
        hint: "Um cuida de codificação de caracteres; outro, do idioma do conteúdo.",
        explanation:
          "doctype → modo padrões; charset utf-8 → acentuação; lang → idioma para acessibilidade/tradução; title → aba e SEO.",
      },
    ],
  },
};
