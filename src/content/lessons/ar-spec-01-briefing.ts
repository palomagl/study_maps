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

  learningObjectives: [
    "Entender por que pedido curto vira adivinhação",
    "Escrever um briefing com as cinco partes",
    "Usar o “não quero” pra fechar a porta da média",
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

  freeResources: [
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
