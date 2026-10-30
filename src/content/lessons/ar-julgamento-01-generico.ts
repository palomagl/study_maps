import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 4 (Julgamento), aula 1.
 *
 * O molde das outras onze (spec 2026-10-30): a dor abre a aula, o "o que
 * resolve" promete a saída, a prova vem antes da explicação, depois a
 * ferramenta, a prática, e o fecho com o antes e o agora. A dor, o que
 * resolve e o agora vivem em `pain`; o `content` começa pela prova.
 *
 * Tratamento em "tu", do jeito que se fala: "tu faz", "teu olho", "olha".
 *
 * As duas imagens da comparação são ILUSTRAÇÕES autorais (SVG no próprio
 * repositório), não capturas de tela de nenhuma ferramenta — e o texto diz
 * isso, porque fingir que são prints seria mentir sobre a evidência.
 */
export const oQueFazParecerGenerico: Lesson = {
  id: "ar-jul-01-generico",
  slug: "o-que-faz-parecer-generico",
  title: "O que faz um resultado parecer genérico",
  pain: {
    quote:
      "Pedi um site pra IA e veio um site. Achei meio feio, mas não sei dizer o quê — então deixei assim.",
    belief: "Pedir pra IA \"deixar mais bonito\".",
    resolve: "Dar nome ao defeito. Quem nomeia, conserta.",
    resolveDetail:
      "“Meio feio” a IA não entende. “Três botões brigando” ela arruma em segundos.",
    after:
      "Tudo com o mesmo peso, três botões brigando e um texto que serve pra qualquer um.",
  },
  summary:
    "Dois resultados do mesmo pedido, lado a lado. A diferença não é sorte — e tem nome.",
  estimatedMinutes: 25,

  learningObjectives: [
    "Reconhecer, olhando, a diferença entre um resultado genérico e um resultado específico",
    "Dar nome ao defeito em vez de dizer só que ficou feio",
    "Aplicar o teste do olho semicerrado pra achar o que tá sem hierarquia",
    "Entender por que a IA entrega a média quando o pedido é vago",
  ],

  content: [
    { type: "heading", text: "O mesmo produto, dois pedidos" },
    {
      type: "paragraph",
      text: "Repara pra onde o teu olho vai primeiro em cada um. Não lê ainda — só olha.",
    },
    {
      type: "compare",
      left: {
        src: "/content/app-no-ar/hero-sem-referencia.svg",
        alt: "Seção inicial com título pequeno, parágrafo longo de linha larga, três botões iguais e quatro cartões colados, tudo no mesmo tom de cinza.",
        label: "Pedido preguiçoso",
        caption: "Ilustração. O olho não tem pra onde ir primeiro: tudo pesa o mesmo.",
      },
      right: {
        src: "/content/app-no-ar/hero-com-referencia.svg",
        alt: "Seção inicial com um título grande em duas linhas, texto de apoio curto, um único botão escuro e uma imagem de agenda à direita, com espaço em volta.",
        label: "Pedido com referência e especificação",
        caption: "Ilustração. O olho cai no título, desce pro apoio e para no botão.",
      },
    },
    {
      type: "paragraph",
      text: "No A o olho fica passeando, sem destino. No B ele cai no título, desce e para no botão. **Tu já sabia qual era melhor. O que faltava era o nome.**",
    },
    {
      type: "paragraph",
      text: "E a diferença não é sorte nem ferramenta. O A saiu de um pedido de uma linha: sem dizer nada específico, a IA entrega a média de todas as telas que ela já viu — e a média é genérica por definição. O B saiu de um pedido que dizia pra quem é, qual a ação principal e o que não podia ter.",
    },

    { type: "heading", text: "O que de fato mudou" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Hierarquia.** No A, título e parágrafo têm quase o mesmo tamanho. No B, o título é muito maior que o resto — então ele é, claramente, a coisa mais importante.",
        "**Uma ação, não três.** Três botões iguais não são três opções: são nenhuma. No B tem um botão cheio e um link discreto do lado.",
        "**Promessa concreta.** “Soluções inovadoras para o seu negócio” não diz o que o produto faz. “Agende clientes sem trocar mensagem” diz.",
        "**Espaço.** No A tá tudo colado, como se espaço fosse desperdício. O espaço é o que separa o que é diferente.",
      ],
    },

    { type: "heading", text: "Troca o sentimento pelo nome" },
    {
      type: "paragraph",
      text: "“Ficou feio” não é defeito, é sentimento — e a IA não conserta sentimento. Dar nome ao defeito transforma o teu incômodo num pedido que a ferramenta consegue executar. E treina o teu olho, porque tu só nomeia o que consegue ver.",
    },
    {
      type: "list",
      items: [
        "Em vez de “sem graça”: *tudo com o mesmo peso, nada pro olho achar primeiro*.",
        "Em vez de “bagunçado”: *três botões brigando pela mesma atenção*.",
        "Em vez de “genérico”: *o texto serviria pra qualquer empresa, não diz o que esse produto faz*.",
        "Em vez de “carregado”: *cor demais competindo; nenhuma guardada pra ação principal*.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Teste do olho semicerrado",
      text: "Aperta os olhos até a tela embaçar e as letras ficarem ilegíveis. O que continuar aparecendo é a tua hierarquia real. Virou um borrão uniforme? Achou o defeito.",
    },
    {
      type: "example",
      title: "O mesmo pedido, reescrito com os nomes",
      text: "Os dois pedidos foram pra mesma ferramenta. A diferença entre as duas ilustrações lá em cima começa aqui, antes de qualquer geração.",
      code: {
        language: "text",
        code: `Antes:
"faz uma landing page bonita pro meu app de agendamento"

Depois:
"Seção inicial de uma landing page pra um app de agendamento usado por
salões e consultórios.
- Um título de no máximo 6 palavras, dizendo a dor que resolve.
- Uma linha de apoio curta explicando como funciona.
- UMA ação principal: 'Criar minha agenda'. Um link secundário discreto.
- À direita, a imagem de uma agenda com três horários livres.
- Título muito maior que o resto; espaço generoso entre os blocos.
Não quero: carrossel, três botões concorrendo, a palavra 'inovação'."`,
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "“Deixa mais bonito” e “deixa mais moderno” não são nomes de defeito. São pedidos pra ferramenta chutar de novo — e ela vai chutar pra média outra vez.",
    },
  ],

  freeResources: [
    {
      kind: "article",
      title: "5 Principles of Visual Design in UX",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/principles-visual-design/",
      description:
        "Escala, hierarquia e contraste explicados com exemplo. É a base do vocabulário que essa aula usa.",
      lang: "en",
    },
    {
      kind: "video",
      title: "Squint Test",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/videos/squint-test/",
      description: "O teste do olho semicerrado, demonstrado numa tela de verdade.",
      lang: "en",
      durationLabel: "4 min",
    },
    {
      kind: "docs",
      title: "Prompting best practices",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/prompting/prompting-one",
      description:
        "A própria ferramenta dizendo que quanto mais específico e opinativo o pedido, melhor o resultado — e por que pedir uma seção por vez.",
      lang: "en",
    },
  ],

  premiumResources: [
    {
      title: "Refactoring UI",
      platform: "Refactoring UI (Adam Wathan e Steve Schoger)",
      url: "https://refactoringui.com/",
      reason:
        "É o material que ensina a nomear defeito visual de um jeito que dá pra agir — exatamente a habilidade dessa aula, em 50 capítulos curtos. Tem dois capítulos grátis, então dá pra experimentar antes de decidir.",
    },
  ],

  questions: [
    {
      id: "ar-jul-01-q1",
      type: "single",
      prompt:
        "Tu pediu “uma landing page bonita” e o resultado veio genérico. Qual é a melhor explicação?",
      concept: "pedido vago gera resultado medio",
      skill: "compreensao",
      hint: "Pensa no que a ferramenta tinha na mão pra decidir o que é “bonito”.",
      explanation:
        "Sem referência nem especificação, a única coisa que a ferramenta pode fazer é entregar a média do que ela viu. A média é genérica por definição — o problema tava no pedido, não na ferramenta.",
      options: [
        { id: "a", text: "A ferramenta é fraca pra design e precisa de um plano pago" },
        {
          id: "b",
          text: "O pedido não dizia nada específico, então ela entregou a média de tudo que conhece",
        },
        { id: "c", text: "Faltou pedir mais vezes até sair algo bom" },
        { id: "d", text: "Landing page é um tipo de tela difícil pra IA" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-jul-01-q2",
      type: "judge",
      prompt:
        "Duas versões do texto da mesma seção inicial. Escolhe a melhor e diz o que tá errado na outra.",
      concept: "promessa concreta",
      skill: "raciocinio",
      hint: "Lê as duas como se tu nunca tivesse ouvido falar desse produto. Qual te conta o que ele faz?",
      explanation:
        "A Versão B nomeia a dor (“sem trocar mensagem”), explica como funciona numa linha e oferece uma ação só. A Versão A poderia ser de qualquer empresa, não diz o que o produto faz, e põe três chamadas brigando entre si — o que na prática é nenhuma.",
      left: {
        label: "Versão A",
        body: `Soluções inovadoras para o seu negócio
Transformando ideias em resultados

[ Saiba mais ]  [ Entre em contato ]  [ Nossos serviços ]`,
      },
      right: {
        label: "Versão B",
        body: `Agende clientes sem trocar mensagem.
Seu cliente escolhe o horário livre e recebe a confirmação na hora.

[ Criar minha agenda ]   ver uma agenda de exemplo`,
      },
      better: "right",
      defects: [
        { id: "d1", text: "Não diz o que o produto faz" },
        { id: "d2", text: "Três chamadas pra ação brigando entre si" },
        { id: "d3", text: "O texto serviria pra qualquer empresa" },
        { id: "d4", text: "O texto é curto demais pra explicar o produto" },
      ],
      correctDefectIds: ["d1", "d2", "d3"],
    },
    {
      id: "ar-jul-01-q3",
      type: "multiple",
      prompt: "Quais desses pedidos de conserto a ferramenta consegue executar sem adivinhar?",
      concept: "nomear o defeito",
      skill: "aplicacao",
      hint: "Um pedido executável diz o que mudar e onde. Um pedido vago só pede outro chute.",
      explanation:
        "Nomear o defeito e dizer o que fazer com ele é o que torna o pedido executável. “Mais bonito” e “mais moderno” são sentimentos: a ferramenta só pode chutar de novo, e vai chutar pra média.",
      options: [
        { id: "a", text: "Aumenta o título pro dobro do tamanho do parágrafo e alinha à esquerda" },
        { id: "b", text: "Deixa mais bonito" },
        {
          id: "c",
          text: "Deixa só a ação “Criar minha agenda” e transforma as outras duas num link discreto",
        },
        { id: "d", text: "Deixa com uma cara mais moderna" },
        { id: "e", text: "Dobra o espaço vertical entre o bloco de texto e o botão" },
      ],
      correctOptionIds: ["a", "c", "e"],
    },
    {
      id: "ar-jul-01-q4",
      type: "single",
      prompt:
        "Tu aperta os olhos diante da tua tela até tudo embaçar e vê um borrão uniforme, sem nada se destacando. O que isso te diz?",
      concept: "teste do olho semicerrado",
      skill: "aplicacao",
      hint: "O que sobra quando as letras ficam ilegíveis é o peso visual, não o conteúdo.",
      explanation:
        "O borrão uniforme é a assinatura da falta de hierarquia: nada tem peso suficiente pro olho achar primeiro. É o defeito mais comum em resultado gerado sem especificação — e o mais fácil de consertar, aumentando o contraste de tamanho entre o título e o resto.",
      options: [
        { id: "a", text: "Que a paleta de cores tá errada" },
        { id: "b", text: "Que falta conteúdo na página" },
        { id: "c", text: "Que não existe hierarquia: nada tem peso pro olho achar primeiro" },
        { id: "d", text: "Que o teste não serve pra esse tipo de tela" },
      ],
      correctOptionIds: ["c"],
    },
  ],

  exercise: {
    id: "ar-jul-01-ex",
    title: "Nomeia os defeitos de um resultado teu que tu já tinha aceitado",
    statement:
      "Volta em alguma coisa que tu gerou com IA e deu por boa — um site, uma tela, um texto. Olha de novo com o olho que tu acabou de treinar e dá nome ao que tá errado.",
    steps: [
      "Abre um resultado antigo teu, que tu aceitou na época.",
      "Aperta os olhos até embaçar: o que continua aparecendo? Era isso que devia aparecer primeiro?",
      "Escreve de três a cinco defeitos **com nome**. Nada de “feio”, “sem graça” ou “moderno”.",
      "Pra cada defeito, escreve o que tu pediria pra consertar e onde.",
    ],
    starter: {
      language: "text",
      code: `# Teus defeitos com nome

Defeito 1: ________________ → conserto: ________________
Defeito 2: ________________ → conserto: ________________
Defeito 3: ________________ → conserto: ________________

Regra: se o defeito tem a palavra "bonito", "moderno", "legal" ou
"sem graça", ele ainda não tá nomeado. Volta e diz o que, na tela,
te deu essa sensação.`,
    },
    hints: [
      "Se travar na hora de nomear, te pergunta: pra onde o meu olho foi primeiro? E devia ter ido pra lá?",
      "Três defeitos bem nomeados valem mais que dez vagos.",
    ],
    selfCheck: [
      "Escolhi um resultado antigo meu que eu tinha aceitado",
      "Fiz o teste do olho semicerrado nele",
      "Nomeei de três a cinco defeitos sem usar “feio”, “sem graça” ou “moderno”",
      "Escrevi o conserto de cada um, dizendo o que mudar e onde",
      "Consigo explicar em voz alta o que eu não tinha enxergado antes",
    ],
  },

  challenge: {
    id: "ar-jul-01-ch",
    title: "Reescreve o pedido daquele resultado usando os nomes que tu achou",
    statement:
      "Pega os defeitos que tu nomeou no exercício e transforma num pedido novo — o pedido que teria evitado eles desde o começo.",
    requirements: [
      "O pedido novo diz pra quem é e qual é a ação principal",
      "Cada defeito nomeado virou uma instrução no pedido",
      "O pedido diz o que não pode ter",
      "Gerei de novo com o pedido novo e comparei com o antigo",
    ],
  },

  checkpoint: {
    id: "ar-jul-01-cp",
    passThreshold: 2,
    successMessage:
      "🎯 Tu não depende mais de achar que tá ruim: tu sabe dizer o que tá ruim. É isso que faz a ferramenta trabalhar pra ti.",
    questions: [
      {
        id: "ar-jul-01-cp1",
        type: "multiple",
        prompt: "Quais dessas afirmações descrevem defeitos de um jeito que dá pra agir?",
        concept: "nomear o defeito",
        skill: "aplicacao",
        hint: "Dá pra agir quando a ferramenta sabe exatamente o que mexer.",
        explanation:
          "Defeito acionável aponta um elemento e uma propriedade dele: peso, tamanho, espaço, quantidade de ações, o que o texto afirma. Adjetivo de sentimento não aponta nada.",
        options: [
          { id: "a", text: "O título tem quase o mesmo tamanho do parágrafo" },
          { id: "b", text: "A página tá sem personalidade" },
          { id: "c", text: "Tem três ações principais brigando pela mesma atenção" },
          { id: "d", text: "O texto não diz o que o produto faz" },
          { id: "e", text: "Tá com um visual pouco atrativo" },
        ],
        correctOptionIds: ["a", "c", "d"],
      },
      {
        id: "ar-jul-01-cp2",
        type: "judge",
        prompt:
          "Duas versões do bloco de preços do mesmo app. Escolhe a melhor e nomeia o problema da outra.",
        concept: "hierarquia visual",
        skill: "raciocinio",
        hint: "Numa tabela de preços, a dúvida de quem chega é “qual eu escolho?”.",
        explanation:
          "A Versão B responde à pergunta de quem chega: um plano tá destacado e tem a ação em evidência. A Versão A apresenta três planos idênticos em peso — a pessoa tem que decidir sozinha, sem pista nenhuma, e muita gente simplesmente não decide.",
        left: {
          label: "Versão A",
          body: `[ Básico ]      [ Pro ]        [ Avançado ]
  R$ 29          R$ 59          R$ 99
 Assinar        Assinar         Assinar`,
        },
        right: {
          label: "Versão B",
          body: `                 ┌─ MAIS ESCOLHIDO ─┐
[ Básico ]       │       Pro        │     [ Avançado ]
  R$ 29          │      R$ 59       │       R$ 99
 Assinar         │  Começar agora   │      Assinar
                 └──────────────────┘`,
        },
        better: "right",
        defects: [
          { id: "d1", text: "Os três planos têm exatamente o mesmo peso visual" },
          { id: "d2", text: "Nada indica qual plano a maioria escolhe" },
          { id: "d3", text: "Mostra preço, e preço nunca devia aparecer" },
        ],
        correctDefectIds: ["d1", "d2"],
      },
      {
        id: "ar-jul-01-cp3",
        type: "single",
        prompt:
          "Qual é o primeiro passo quando um resultado gerado te incomoda e tu não sabe por quê?",
        concept: "teste do olho semicerrado",
        skill: "aplicacao",
        hint: "Antes de pedir qualquer coisa pra ferramenta, tu precisa de uma informação sobre a tela.",
        explanation:
          "Primeiro tu descobre o que tá errado — o teste do olho semicerrado mostra a hierarquia real em segundos. Só depois de ter o defeito nomeado vale falar com a ferramenta; pedir “de novo” antes disso só sorteia outra média.",
        options: [
          { id: "a", text: "Pedir pra ferramenta gerar outra versão" },
          {
            id: "b",
            text: "Apertar os olhos e ver o que continua aparecendo quando a tela embaça",
          },
          { id: "c", text: "Trocar a paleta de cores" },
          { id: "d", text: "Procurar um modelo pronto pra copiar" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
