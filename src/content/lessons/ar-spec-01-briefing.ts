import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 2 (Pedido), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 */
export const escreveOBriefing: Lesson = {
  id: "ar-spec-01-briefing",
  slug: "escreva-o-briefing",
  title: "Escreve o briefing antes do prompt",
  pain: {
    quote: "A IA não faz o que eu tô pedindo.",
    belief: "Repetir o mesmo pedido, só que mais irritado.",
    resolve:
      "Dizer pra quem é, o que a pessoa faz na tela e o que não entra — antes do prompt.",
    resolveDetail: "A IA faz o que tu pediu. O problema é que tu pediu pouco.",
    after: "Meu pedido cabe numa página e não deixa a IA adivinhar.",
  },
  summary: "Pra quem é, o que a pessoa faz na tela, o que não entra. Numa página.",
  estimatedMinutes: 25,

  // A aula em telas: o que a pessoa faz no celular, conduzida pelo Pedido.
  play: {
    pieces: [
      {
        id: "o-pedido-do-caio",
        title: "O pedido do Caio",
        cards: [
          {
            kind: "fala",
            text: "Prazer, eu sou o Pedido. Antes de qualquer prompt eu pergunto uma coisa: mas como assim, exatamente?",
          },
          {
            kind: "dor",
          },
          {
            kind: "fala",
            text: "O Caio mandou pra IA: “faz um app pra organizar rolê com os amigos”. Veio qualquer coisa.",
          },
          {
            kind: "escolha",
            prompt: "O que ele faz agora?",
            options: [
              {
                id: "a",
                text: "Repete o mesmo pedido, só que mais irritado",
              },
              {
                id: "b",
                text: "Escreve um briefing: pra quem é, o que faz e o que não entra",
              },
              {
                id: "c",
                text: "Troca de IA",
              },
            ],
            correctId: "b",
            beliefId: "a",
            right: "Isso. A IA faz o que tu pede — o problema é que o Caio pediu pouco.",
            wrong: "Pedido irritado é o mesmo pedido. A IA continua adivinhando público, tela e botão.",
          },
          {
            kind: "escolha",
            prompt: "Quantas decisões a IA tem que adivinhar em “faz um app pra organizar rolê”?",
            options: [
              {
                id: "a",
                text: "Quase nenhuma",
              },
              {
                id: "b",
                text: "Várias: pra quem, que tela, que botões, que cores, o que não pode ter",
              },
            ],
            correctId: "b",
            right: "Exato. Cada adivinhação vai pra média — por isso vem genérico.",
            wrong: "São várias: público, tela, botões, cores, o que não pode ter. Cada chute vai pra média.",
          },
          {
            kind: "montar",
            prompt: "Monta as cinco partes do briefing, na ordem.",
            answer: [
              "Pra quem é",
              "A ação principal",
              "O que tem na tela",
              "O que não entra",
              "As referências",
            ],
            distractors: [
              "O preço do servidor",
            ],
            right: "As cinco. Com elas, quase nada fica pra IA chutar.",
            wrong: "A ordem: pra quem é, ação principal, o que tem na tela, o que não entra, referências. Servidor não é briefing.",
          },
        ],
        mission: "Escreve o briefing do teu projeto nas cinco partes. Tem que caber numa página.",
      },
      {
        id: "o-que-nao-entra",
        title: "O que não entra",
        cards: [
          {
            kind: "fala",
            text: "A parte que todo mundo esquece é a que eu mais gosto: o que não entra.",
          },
          {
            kind: "escolha",
            prompt: "Qual parte do briefing mais evita um resultado com cara de qualquer site?",
            options: [
              {
                id: "a",
                text: "O nome do app",
              },
              {
                id: "b",
                text: "O que não entra",
              },
              {
                id: "c",
                text: "A cor favorita",
              },
            ],
            correctId: "b",
            right: "Dizer o que tu não quer corta de cara o carrossel, os três botões e a palavra “inovação”.",
            wrong: "É o “não entra”: ele corta os padrões que a IA puxa sozinha.",
          },
          {
            kind: "cortar",
            prompt: "Toca no que não é público de verdade.",
            chips: [
              {
                text: "Galera de 18 a 25 que marca rolê pelo WhatsApp",
                keep: true,
              },
              {
                text: "Todo mundo",
                keep: false,
              },
              {
                text: "Quem organiza o futebol de quinta",
                keep: true,
              },
              {
                text: "Qualquer pessoa que tenha celular",
                keep: false,
              },
            ],
            right: "Público de verdade tem idade e situação. “Todo mundo” é ninguém.",
            wrong: "“Todo mundo” e “qualquer pessoa” não dizem nada pra IA. Público tem idade e situação.",
          },
          {
            kind: "escolha",
            prompt: "Teu briefing ficou com três páginas. Isso quer dizer…",
            options: [
              {
                id: "a",
                text: "Que tá bem completo",
              },
              {
                id: "b",
                text: "Que a ideia grande voltou — recorta de novo",
              },
              {
                id: "c",
                text: "Que precisa de três prompts",
              },
            ],
            correctId: "b",
            right: "Exato. Briefing bom cabe numa página.",
            wrong: "Três páginas é a ideia grande voltando. Volta e recorta.",
          },
          {
            kind: "escrever",
            prompt: "Pra quem é a tua ideia? Uma pessoa de verdade, com idade e situação.",
            placeholder: "Ex.: quem tem 17 e joga bola toda quinta",
            saveAs: "publico",
          },
          {
            kind: "fala",
            text: "Anotado: {publico}. Mas como assim, exatamente? …Brincadeira. Tá ótimo.",
          },
        ],
        mission: "Lê teu briefing e conta quantas decisões ainda ficaram pra IA adivinhar. Fecha cada uma.",
      },
    ],
  },

  learningObjectives: [
    "Entender por que pedido curto vira adivinhação",
    "Escrever um briefing com as cinco partes",
    "Dizer o que tu não quer, pra não vir genérico",
  ],

  content: [
    { type: "heading", text: "Um pedido, dois tamanhos" },
    {
      type: "example",
      title: "O mesmo app de rolê",
      text: "Lê os dois e conta quantas decisões a IA tem que adivinhar em cada um.",
      code: {
        language: "text",
        code: `Pedido de uma linha:
"faz um app pra organizar rolê com os amigos"

Briefing:
PRA QUEM: galera de 18 a 25 que marca rolê pelo WhatsApp e sempre se perde.
AÇÃO PRINCIPAL: quem organiza cria o rolê (data, hora, lugar) e manda um link.
NA TELA: nome do rolê grande, data e lugar embaixo, um botão "eu vou",
         a lista de quem confirmou.
NÃO ENTRA: login, chat, pagamento, mapa.
REFERÊNCIAS: a cara de convite do Partiful; o roxo só no botão principal.`,
      },
    },
    {
      type: "paragraph",
      text: "No pedido de uma linha, a IA tem que adivinhar público, tela, botões, cores e o que não pode ter. Cada adivinhação vai pra média. No briefing, quase nada fica pra ela chutar. **“A IA não faz o que eu peço” quase sempre é “eu não pedi”.**",
    },

    { type: "heading", text: "As cinco partes" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Pra quem é.** Uma pessoa de verdade, com idade e situação. Não “todo mundo”.",
        "**A ação principal.** A única coisa que essa pessoa tem que conseguir fazer — a que tu recortou na Fase 1.",
        "**O que tem na tela.** Os elementos, em ordem de importância.",
        "**O que não entra.** A parte que mais gente esquece — e a que mais evita resultado genérico.",
        "**As referências.** As cinco da Fase 1, cada uma com a anotação.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "O “não entra” é o atalho",
      text: "Dizer o que não quer elimina de cara os padrões que a IA puxa sozinha: carrossel, três botões, a palavra “inovação”, um rodapé gigante.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Briefing de três páginas. Se não cabe numa página, tu voltou pra ideia grande — volta e recorta.",
    },
  ],

  video: {
    title: "Engenharia de prompt: 7 passos para o prompt perfeito",
    provider: "YouTube",
    channel: "Bruno Picinini",
    url: "https://www.youtube.com/watch?v=oFGXr2pgKLY",
    description: "Os passos de um pedido bem escrito, em oito minutos.",
    lang: "pt-BR",
  },

  freeResources: [
    {
      kind: "course",
      title: "Engenharia de Prompt: O Guia Definitivo",
      provider: "Bruno Picinini · YouTube",
      url: "https://www.youtube.com/watch?v=1VDcke66TRE",
      description: "Aula longa e grátis, pra quem quer ir fundo em como pedir pra IA.",
      lang: "pt-BR",
      durationLabel: "1h27",
    },
    {
      kind: "person",
      title: "Bruno Picinini",
      provider: "YouTube",
      url: "https://www.youtube.com/@brunopicinini",
      description: "Prompt e IA no dia a dia, em português.",
      lang: "pt-BR",
    },
    {
      kind: "docs",
      title: "Prompting best practices",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/prompting/prompting-one",
      description:
        "A ferramenta pede o mesmo: definir produto, público e a ação principal antes, e ser específico — quanto mais específico, melhor o resultado.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Prompting best practices",
      provider: "Claude (documentação oficial da Anthropic)",
      url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices",
      description: "O guia do Claude sobre ser claro, dar contexto e mostrar exemplo.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-spec-01-q1",
      type: "single",
      prompt: "“A IA não faz o que eu peço.” Na maioria das vezes, o que tá acontecendo?",
      concept: "pedido curto vira adivinhacao",
      skill: "compreensao",
      hint: "Conta quantas decisões o pedido deixou em aberto.",
      explanation:
        "O pedido deixou decisões demais em aberto, e a IA preencheu cada uma com a média. Ela fez o que foi pedido — foi pedido pouco.",
      options: [
        { id: "a", text: "A IA tá com defeito" },
        { id: "b", text: "O pedido deixou decisões demais pra ela adivinhar" },
        { id: "c", text: "Precisa de outra ferramenta" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-spec-01-q2",
      type: "match",
      prompt: "Liga cada parte do briefing com o exemplo dela.",
      concept: "cinco partes do briefing",
      skill: "aplicacao",
      hint: "Uma parte diz quem, outra diz o quê, outra diz o que não.",
      explanation:
        "Pra quem: uma pessoa de verdade. Ação principal: a única coisa que ela tem que conseguir. Não entra: o que fecha a porta da média.",
      left: [
        { id: "l1", text: "Pra quem é" },
        { id: "l2", text: "Ação principal" },
        { id: "l3", text: "O que não entra" },
      ],
      right: [
        { id: "r1", text: "Login, chat e pagamento" },
        { id: "r2", text: "Galera de 18 a 25 que marca rolê pelo WhatsApp" },
        { id: "r3", text: "Criar o rolê e mandar o link" },
      ],
      correctPairs: [
        { leftId: "l1", rightId: "r2" },
        { leftId: "l2", rightId: "r3" },
        { leftId: "l3", rightId: "r1" },
      ],
    },
    {
      id: "ar-spec-01-q3",
      type: "single",
      prompt: "Qual parte do briefing mais evita um resultado com cara de qualquer site?",
      concept: "o nao entra",
      skill: "raciocinio",
      hint: "É a parte que tira coisas, não a que põe.",
      explanation:
        "O “não entra”. Ele elimina de cara os padrões que a IA puxa sozinha — e são esses padrões que dão a cara de qualquer site.",
      options: [
        { id: "a", text: "O nome do app" },
        { id: "b", text: "O que não entra" },
        { id: "c", text: "A cor favorita" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-spec-01-ex",
    title: "Escreve o briefing da tua primeira versão",
    statement:
      "Usa a primeira versão que tu recortou e as cinco referências que tu juntou. Escreve o briefing nas cinco partes, numa página.",
    starter: {
      language: "text",
      code: `PRA QUEM:
AÇÃO PRINCIPAL:
NA TELA (em ordem de importância):
NÃO ENTRA:
REFERÊNCIAS (com anotação):`,
    },
    selfCheck: [
      "Tem uma pessoa de verdade no “pra quem”",
      "Tem uma ação principal só",
      "O “não entra” tem pelo menos três coisas",
      "As referências têm anotação, não só link",
      "Cabe numa página",
    ],
  },

  checkpoint: {
    id: "ar-spec-01-cp",
    passThreshold: 2,
    successMessage: "📝 Teu pedido agora diz o que tu quer. A IA para de adivinhar.",
    questions: [
      {
        id: "ar-spec-01-cp1",
        type: "multiple",
        prompt: "Quais dessas são partes do briefing?",
        concept: "cinco partes do briefing",
        skill: "compreensao",
        hint: "São cinco, e uma delas é sobre o que tirar.",
        explanation: "Pra quem, ação principal, o que tem na tela, o que não entra e as referências.",
        options: [
          { id: "a", text: "Pra quem é" },
          { id: "b", text: "O que não entra" },
          { id: "c", text: "Quanto vai custar o servidor" },
          { id: "d", text: "As referências" },
        ],
        correctOptionIds: ["a", "b", "d"],
      },
      {
        id: "ar-spec-01-cp2",
        type: "single",
        prompt: "Teu briefing ficou com três páginas. O que isso indica?",
        concept: "briefing numa pagina",
        skill: "raciocinio",
        hint: "Lembra da régua da Fase 1.",
        explanation: "Que a ideia grande voltou. Volta, recorta, e o briefing cabe numa página.",
        options: [
          { id: "a", text: "Que tá bem completo" },
          { id: "b", text: "Que a ideia grande voltou e precisa recortar de novo" },
          { id: "c", text: "Que precisa dividir em três prompts" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-spec-01-cp3",
        type: "boolean",
        prompt: "“Pra quem é: todo mundo” é um bom público pro briefing.",
        concept: "pedido curto vira adivinhacao",
        skill: "aplicacao",
        hint: "“Todo mundo” ajuda a IA a decidir alguma coisa?",
        explanation: "Falso. “Todo mundo” não decide nada — é a média de novo. Uma pessoa de verdade decide tom, tamanho e o que importa.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
    ],
  },

  status: "available",
};
