import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 4 (Julgamento), aula 1.
 *
 * Primeira aula escrita da plataforma depois da virada. Ela carrega a tese do
 * projeto: taste não se explica, se compara. A aula não diz "use
 * referências" — ela põe os dois resultados lado a lado e deixa a pessoa ver,
 * e só depois dá nome ao que ela acabou de enxergar.
 *
 * As duas imagens da comparação são ILUSTRAÇÕES autorais (SVG no próprio
 * repositório), não capturas de tela de nenhuma ferramenta. O texto diz isso
 * à pessoa, porque fingir que são prints seria mentir sobre a evidência.
 */
export const oQueFazParecerGenerico: Lesson = {
  id: "ar-jul-01-generico",
  slug: "o-que-faz-parecer-generico",
  title: "O que faz um resultado parecer genérico",
  pain: {
    quote:
      "Pedi um site pra IA e veio um site. Achei meio feio, mas não sei dizer o quê — então deixei assim.",
    resolve: "Dar nome ao defeito. Quem nomeia, conserta.",
    after:
      "Tudo com o mesmo peso, três botões brigando e um texto que serve pra qualquer um.",
  },
  summary:
    "Dois resultados do mesmo pedido, lado a lado. A diferença não é sorte — e tem nome.",
  estimatedMinutes: 25,

  learningObjectives: [
    "Reconhecer, olhando, a diferença entre um resultado genérico e um resultado específico",
    "Dar nome ao defeito em vez de dizer só que ficou feio",
    "Aplicar o teste do olho semicerrado para achar o que está sem hierarquia",
    "Entender por que a IA entrega a média quando o pedido é vago",
  ],

  content: [
    {
      type: "heading",
      text: "Por que o que você gera parece sempre a mesma coisa",
    },
    {
      type: "paragraph",
      text: "Você pede uma landing page. Vem uma landing page. Centralizada, com um título azul, três cartõezinhos e a palavra **inovação** em algum lugar. Você olha e sente que está ruim, mas não sabe dizer o que está ruim — então aceita.",
    },
    {
      type: "paragraph",
      text: "O que aconteceu não é falha da ferramenta. Você pediu *uma landing page*, e ela te deu a média de todas as landing pages que existem. A média é genérica por definição. Pedido vago, resultado médio.",
    },
    {
      type: "callout",
      variant: "analogy",
      title: "É como pedir comida",
      text: "Se você fala “me traz algo gostoso”, vem o prato que agrada todo mundo e ninguém lembra. Se você fala o que quer, o que não come e o que viu alguém comendo na mesa ao lado, vem a sua comida.",
    },

    { type: "heading", text: "Olhe antes de eu explicar" },
    {
      type: "paragraph",
      text: "Abaixo estão duas versões da **mesma** seção inicial do **mesmo** produto. A da esquerda saiu de um pedido preguiçoso. A da direita saiu de um pedido com referência e especificação. Não leia a explicação ainda: olhe as duas por uns dez segundos e repare para onde o seu olho vai primeiro em cada uma.",
    },
    {
      type: "compare",
      title: "O mesmo produto, dois pedidos",
      left: {
        src: "/content/app-no-ar/hero-sem-referencia.svg",
        alt: "Seção inicial com título pequeno, parágrafo longo de linha larga, três botões iguais e quatro cartões colados, tudo no mesmo tom de cinza.",
        label: "Pedido preguiçoso",
        caption:
          "Ilustração. O olho não tem para onde ir primeiro: tudo pesa o mesmo.",
      },
      right: {
        src: "/content/app-no-ar/hero-com-referencia.svg",
        alt: "Seção inicial com um título grande em duas linhas, texto de apoio curto, um único botão escuro e uma imagem de agenda à direita, com espaço em volta.",
        label: "Pedido com referência e especificação",
        caption:
          "Ilustração. O olho cai no título, desce para o apoio e para no botão.",
      },
    },
    {
      type: "paragraph",
      text: "Se o seu olho ficou passeando sem destino na primeira e foi direto ao título na segunda, você acabou de ter a experiência que essa aula toda serve para explicar. Você já sabia qual era melhor. O que faltava era o nome.",
    },

    { type: "heading", text: "O que de fato mudou" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Hierarquia.** Na primeira, título e parágrafo têm quase o mesmo tamanho. Na segunda, o título é muito maior que o resto — então ele é, claramente, a coisa mais importante.",
        "**Uma ação, não três.** Três botões iguais não são três opções: são nenhuma. Na segunda há um botão cheio e um link discreto ao lado.",
        "**Promessa concreta.** “Soluções inovadoras para o seu negócio” não diz o que o produto faz. “Agende clientes sem trocar mensagem” diz.",
        "**Espaço.** Na primeira tudo está colado, como se o espaço fosse desperdício. O espaço é o que separa o que é diferente.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Teste do olho semicerrado",
      text: "Semicerre os olhos até a tela embaçar e as letras ficarem ilegíveis. O que continuar aparecendo é a sua hierarquia real. Se tudo virar um borrão uniforme, não existe hierarquia — e é por isso que está parecendo genérico.",
    },

    { type: "heading", text: "Dê nome ao defeito" },
    {
      type: "paragraph",
      text: "“Ficou feio” não é um defeito, é um sentimento. A IA não consegue consertar um sentimento. Nomear o defeito é o que transforma o seu incômodo em um pedido que a ferramenta consegue executar — e é também o que treina o seu olho, porque você só nomeia o que consegue ver.",
    },
    {
      type: "list",
      items: [
        "Em vez de “sem graça”: *tudo com o mesmo peso visual, sem nada para o olho encontrar primeiro*.",
        "Em vez de “bagunçado”: *espaçamento inconsistente entre as seções*.",
        "Em vez de “genérico”: *o texto serviria para qualquer empresa, não diz o que esse produto faz*.",
        "Em vez de “carregado”: *cor demais competindo; nenhuma reservada para a ação principal*.",
      ],
    },
    {
      type: "example",
      title: "O mesmo pedido, reescrito",
      text: "Os dois pedidos abaixo foram para a mesma ferramenta. A diferença entre as duas imagens lá em cima começa aqui, antes de qualquer geração.",
      code: {
        language: "text",
        code: `Antes:
"faz uma landing page bonita pro meu app de agendamento"

Depois:
"Seção inicial de uma landing page para um app de agendamento usado por
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
      text: "“Deixa mais bonito” e “deixa mais moderno” não são nomes de defeito. São pedidos para a ferramenta chutar de novo — e ela vai chutar para a média outra vez.",
    },
  ],

  freeResources: [
    {
      kind: "article",
      title: "5 Principles of Visual Design in UX",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/principles-visual-design/",
      description:
        "Escala, hierarquia e contraste explicados com exemplos. É a base do vocabulário que esta aula usa.",
      lang: "en",
    },
    {
      kind: "video",
      title: "Squint Test",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/videos/squint-test/",
      description:
        "O teste do olho semicerrado, demonstrado numa tela de verdade.",
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
        "É o material que ensina a nomear defeito visual de forma acionável — exatamente a habilidade desta aula, em 50 capítulos curtos. Tem dois capítulos gratuitos, então dá para experimentar antes de decidir.",
    },
  ],

  questions: [
    {
      id: "ar-jul-01-q1",
      type: "single",
      prompt:
        "Você pediu “uma landing page bonita” e o resultado veio genérico. Qual é a melhor explicação?",
      concept: "pedido vago gera resultado medio",
      skill: "compreensao",
      hint: "Pense no que a ferramenta tinha em mãos para decidir o que é “bonito”.",
      explanation:
        "Sem referência nem especificação, a única coisa que a ferramenta pode fazer é entregar a média do que ela viu. A média é genérica por definição — o problema estava no pedido, não na ferramenta.",
      options: [
        { id: "a", text: "A ferramenta é fraca para design e precisa de um plano pago" },
        {
          id: "b",
          text: "O pedido não dizia nada específico, então ela entregou a média de tudo que conhece",
        },
        { id: "c", text: "Faltou pedir mais de uma vez até sair algo bom" },
        { id: "d", text: "Landing page é um tipo de tela difícil para IA" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-jul-01-q2",
      type: "judge",
      prompt:
        "Duas versões do texto da mesma seção inicial. Escolha a melhor e diga o que está errado na outra.",
      concept: "promessa concreta",
      skill: "raciocinio",
      hint: "Leia as duas imaginando que você nunca ouviu falar desse produto. Qual delas te conta o que ele faz?",
      explanation:
        "A Versão B nomeia a dor (“sem trocar mensagem”), explica como funciona em uma linha e oferece uma ação só. A Versão A poderia ser de qualquer empresa, não diz o que o produto faz, e coloca três chamadas concorrendo entre si — o que na prática é nenhuma.",
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
        { id: "d2", text: "Três chamadas para ação concorrendo entre si" },
        { id: "d3", text: "O texto serviria para qualquer empresa" },
        { id: "d4", text: "O texto é curto demais para explicar o produto" },
      ],
      correctDefectIds: ["d1", "d2", "d3"],
    },
    {
      id: "ar-jul-01-q3",
      type: "multiple",
      prompt:
        "Quais destes pedidos de conserto a ferramenta consegue executar sem adivinhar?",
      concept: "nomear o defeito",
      skill: "aplicacao",
      hint: "Um pedido executável diz o que mudar e onde. Um pedido vago só pede outro chute.",
      explanation:
        "Nomear o defeito e dizer o que fazer com ele é o que torna o pedido executável. “Mais bonito” e “mais moderno” são sentimentos: a ferramenta só pode chutar de novo, e vai chutar para a média.",
      options: [
        {
          id: "a",
          text: "Aumente o título para o dobro do tamanho do parágrafo e alinhe à esquerda",
        },
        { id: "b", text: "Deixa mais bonito" },
        {
          id: "c",
          text: "Mantenha só a ação “Criar minha agenda” e transforme as outras duas em um link discreto",
        },
        { id: "d", text: "Deixa com uma cara mais moderna" },
        {
          id: "e",
          text: "Dobre o espaço vertical entre o bloco de texto e o botão",
        },
      ],
      correctOptionIds: ["a", "c", "e"],
    },
    {
      id: "ar-jul-01-q4",
      type: "single",
      prompt:
        "Você semicerra os olhos diante da sua tela até tudo embaçar e vê um borrão uniforme, sem nada se destacando. O que isso te diz?",
      concept: "teste do olho semicerrado",
      skill: "aplicacao",
      hint: "O que sobra quando as letras ficam ilegíveis é o peso visual, não o conteúdo.",
      explanation:
        "O borrão uniforme é a assinatura da falta de hierarquia: nada tem peso suficiente para o olho encontrar primeiro. É o defeito mais comum em resultado gerado sem especificação — e o mais fácil de consertar, aumentando o contraste de tamanho entre o título e o resto.",
      options: [
        { id: "a", text: "Que a paleta de cores está errada" },
        { id: "b", text: "Que falta conteúdo na página" },
        {
          id: "c",
          text: "Que não existe hierarquia: nada tem peso para o olho encontrar primeiro",
        },
        { id: "d", text: "Que o teste não serve para esse tipo de tela" },
      ],
      correctOptionIds: ["c"],
    },
  ],

  exercise: {
    id: "ar-jul-01-ex",
    title: "Faça a versão feia de propósito",
    statement:
      "O exercício mais honesto do curso. Você vai gerar de propósito o resultado ruim, olhar para ele, nomear os defeitos e só então consertar. Fazer o ruim por escolha é o que te ensina a reconhecê-lo quando ele aparecer por acidente.",
    steps: [
      "Escolha uma ideia sua, qualquer uma, e peça à ferramenta da forma mais preguiçosa possível: uma frase, sem referência, sem detalhe.",
      "Guarde esse resultado. Não jogue fora — ele é o seu “antes”.",
      "Aplique o teste do olho semicerrado e escreva, em uma lista, de três a cinco defeitos **com nome**. Nada de “feio”.",
      "Reescreva o pedido: para quem é, qual a ação principal, o que você não quer. Use a lista de defeitos como o que evitar.",
      "Gere de novo e ponha os dois lado a lado na sua tela.",
    ],
    starter: {
      language: "text",
      code: `# Molde da sua lista de defeitos

Defeito 1: ________________ → conserto pedido: ________________
Defeito 2: ________________ → conserto pedido: ________________
Defeito 3: ________________ → conserto pedido: ________________

Regra: se o defeito tem a palavra "bonito", "moderno", "legal" ou
"sem graça", ele ainda não está nomeado. Volte e diga o que, na tela,
causou essa sensação.`,
    },
    hints: [
      "Se travar na hora de nomear, pergunte-se: para onde o meu olho foi primeiro? E deveria ter ido para lá?",
      "Três defeitos bem nomeados valem mais que dez vagos.",
    ],
    selfCheck: [
      "Gerei o resultado preguiçoso e guardei ele",
      "Nomeei de três a cinco defeitos sem usar “feio”, “sem graça” ou “moderno”",
      "Reescrevi o pedido dizendo para quem é e qual é a ação principal",
      "Gerei a segunda versão e consigo ver a diferença olhando",
      "Consigo explicar a diferença em voz alta, usando o nome dos defeitos",
    ],
  },

  challenge: {
    id: "ar-jul-01-ch",
    title: "Julgue algo que você já tinha aceitado",
    statement:
      "Volte em alguma coisa que você gerou semanas atrás e tinha dado por boa. Olhe com o olho que você acabou de treinar.",
    requirements: [
      "Escolhi um resultado antigo meu que eu tinha aceitado na época",
      "Apliquei o teste do olho semicerrado e achei pelo menos dois defeitos com nome",
      "Escrevi o pedido de conserto para cada defeito, dizendo o que mudar e onde",
      "Deixei registrado o que eu não tinha enxergado antes desta aula",
    ],
  },

  checkpoint: {
    id: "ar-jul-01-cp",
    passThreshold: 2,
    successMessage:
      "🎯 Você não depende mais de achar que está ruim: você sabe dizer o que está ruim. É isso que faz a ferramenta trabalhar para você.",
    questions: [
      {
        id: "ar-jul-01-cp1",
        type: "multiple",
        prompt:
          "Quais destas afirmações descrevem defeitos de forma acionável?",
        concept: "nomear o defeito",
        skill: "aplicacao",
        hint: "Acionável significa que a ferramenta sabe exatamente o que mexer.",
        explanation:
          "Defeito acionável aponta um elemento e uma propriedade dele: peso, tamanho, espaço, quantidade de ações, o que o texto afirma. Adjetivo de sentimento não aponta nada.",
        options: [
          { id: "a", text: "O título tem quase o mesmo tamanho do parágrafo" },
          { id: "b", text: "A página está sem personalidade" },
          { id: "c", text: "Há três ações principais competindo pela mesma atenção" },
          { id: "d", text: "O texto não diz o que o produto faz" },
          { id: "e", text: "Está com um visual pouco atrativo" },
        ],
        correctOptionIds: ["a", "c", "d"],
      },
      {
        id: "ar-jul-01-cp2",
        type: "judge",
        prompt:
          "Duas versões do bloco de preços do mesmo app. Escolha a melhor e nomeie o problema da outra.",
        concept: "hierarquia visual",
        skill: "raciocinio",
        hint: "Em uma tabela de preços, a dúvida que o usuário tem é “qual eu escolho?”.",
        explanation:
          "A Versão B responde à pergunta do usuário: um plano está destacado e tem a ação em evidência. A Versão A apresenta três planos idênticos em peso — o usuário tem que decidir sozinho, sem nenhuma pista, e muitos simplesmente não decidem.",
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
          { id: "d3", text: "Mostra preços, e preço nunca deveria aparecer" },
        ],
        correctDefectIds: ["d1", "d2"],
      },
      {
        id: "ar-jul-01-cp3",
        type: "single",
        prompt:
          "Qual destes é o primeiro passo quando um resultado gerado te incomoda e você não sabe por quê?",
        concept: "teste do olho semicerrado",
        skill: "aplicacao",
        hint: "Antes de pedir qualquer coisa à ferramenta, você precisa de uma informação sobre a tela.",
        explanation:
          "Primeiro você descobre o que está errado — o teste do olho semicerrado mostra a hierarquia real em segundos. Só depois de ter o defeito nomeado é que vale falar com a ferramenta; pedir “de novo” antes disso só sorteia outra média.",
        options: [
          { id: "a", text: "Pedir para a ferramenta gerar outra versão" },
          {
            id: "b",
            text: "Semicerrar os olhos e ver o que continua aparecendo quando a tela embaça",
          },
          { id: "c", text: "Trocar a paleta de cores" },
          { id: "d", text: "Procurar um modelo pronto para copiar" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
