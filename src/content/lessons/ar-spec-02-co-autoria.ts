import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 2 (Pedido), aula 2.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Fatos sobre o Lovable conferidos na documentação oficial em 30/10:
 * existem os modos Build, Chat e Plan; o Plan pergunta e escreve um plano
 * antes de mexer, e nunca altera o código; mensagem no Plan gasta crédito.
 */
export const usaAIaProPedido: Lesson = {
  id: "ar-spec-02-co-autoria",
  slug: "melhore-o-seu-pedido",
  title: "Usa a IA pra melhorar teu pedido",
  pain: {
    quote: "Só descubro o que faltava no pedido depois que vem errado.",
    belief: "Ir corrigindo depois que vier errado.",
    resolve: "Pedir as perguntas antes de pedir o resultado.",
    resolveDetail: "Quem vai construir sabe o que vai precisar saber. Deixa ela perguntar.",
    after: "A IA me pergunta o que faltava antes de gerar qualquer coisa.",
  },
  summary: "Antes de pedir o resultado, pede as perguntas que faltam no teu briefing.",
  estimatedMinutes: 20,

  learningObjectives: [
    "Pedir as perguntas antes de pedir o resultado",
    "Usar o modo de planejar da ferramenta pra isso",
    "Responder antes de gerar, e só então construir",
  ],

  content: [
    { type: "heading", text: "Gerar direto × perguntar antes" },
    {
      type: "example",
      title: "O mesmo briefing, dois caminhos",
      text: "No primeiro, a falta aparece depois de gastar a geração. No segundo, ela aparece antes.",
      code: {
        language: "text",
        code: `Caminho 1 — gerar direto:
"Constrói esse app: [briefing]"
→ vem a tela → tu percebe que não disse se a lista de quem vai é pública
→ pede de novo → ela mexe no que tava bom

Caminho 2 — perguntar antes:
"Antes de construir, lê esse briefing e me faz as perguntas que faltam
 pra tu fazer exatamente o que eu quero. Não constrói nada ainda.
 [briefing]"
→ "A lista de quem confirmou é visível pra todo mundo ou só pra quem organiza?"
→ "O link expira depois do rolê?"
→ tu responde → aí sim constrói`,
      },
    },
    {
      type: "paragraph",
      text: "Quem vai construir sabe o que vai precisar saber — tu não. **Deixa a IA te dizer o que falta**, enquanto ainda é barato responder.",
    },

    { type: "heading", text: "Como fazer" },
    {
      type: "list",
      ordered: true,
      items: [
        "Cola o briefing e escreve: **“me faz as perguntas que faltam, não constrói ainda”**.",
        "Responde todas — inclusive com “ainda não sei”, que também é resposta.",
        "Acrescenta as respostas no briefing. Ele fica melhor pra sempre, não só pra esse pedido.",
        "Só agora pede pra construir.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "No Lovable isso tem nome",
      text: "O modo **Plan** faz perguntas, escreve um plano que tu pode editar e aprovar, e não mexe no código enquanto isso. Tem também o modo **Chat**, pra conversar sem construir. Repara que mensagem no Plan gasta crédito — vale usar no pedido grande, não em cada ajuste.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Funciona em qualquer IA",
      text: "No Claude, no ChatGPT ou no Gemini é a mesma frase: “antes de responder, me pergunta o que falta”.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Pular as perguntas porque “tá óbvio”. O óbvio na tua cabeça é exatamente o que a IA não tem.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "Plan a change in Plan mode",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/features/plan-mode",
      description: "O modo que pergunta e escreve um plano antes de mexer no projeto.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Discuss your app in Chat mode",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/features/chat-mode",
      description: "Pra conversar sobre o projeto sem construir nada.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-spec-02-q1",
      type: "single",
      prompt: "Por que pedir as perguntas antes de pedir o resultado?",
      concept: "perguntas antes do resultado",
      skill: "compreensao",
      hint: "Pensa em quando é mais barato descobrir o que falta.",
      explanation:
        "Porque a falta aparece antes de gastar a geração — e antes de a correção estragar o que tava bom.",
      options: [
        { id: "a", text: "Porque a IA fica mais educada" },
        { id: "b", text: "Porque o que falta aparece antes de gastar a geração" },
        { id: "c", text: "Porque gera mais rápido" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-spec-02-q2",
      type: "single",
      prompt: "Qual frase pede as perguntas sem deixar a IA sair construindo?",
      concept: "como pedir as perguntas",
      skill: "aplicacao",
      hint: "Ela tem que dizer as duas coisas: pergunta, e não constrói.",
      explanation: "A que pede as perguntas e diz explicitamente pra não construir ainda.",
      options: [
        { id: "a", text: "Faz o melhor que tu puder com esse briefing" },
        { id: "b", text: "Me faz as perguntas que faltam pra fazer isso direito. Não constrói nada ainda." },
        { id: "c", text: "Tem alguma dúvida?" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-spec-02-q3",
      type: "boolean",
      prompt: "No Lovable, o modo Plan muda o código enquanto faz as perguntas.",
      concept: "modo plan",
      skill: "compreensao",
      hint: "Pra que serve planejar antes?",
      explanation: "Falso. O Plan pergunta e escreve o plano, mas nunca altera o código. Ele só constrói depois que tu aprova.",
      options: [
        { id: "v", text: "Verdadeiro" },
        { id: "f", text: "Falso" },
      ],
      correctOptionIds: ["f"],
    },
  ],

  exercise: {
    id: "ar-spec-02-ex",
    title: "Pede as perguntas sobre o teu briefing",
    statement:
      "Pega o briefing da aula anterior e pede pra IA as perguntas que faltam — sem deixar ela construir. Responde e atualiza o briefing.",
    steps: [
      "Cola o briefing com a frase: “me faz as perguntas que faltam, não constrói ainda”.",
      "Anota as perguntas que vierem.",
      "Responde cada uma.",
      "Acrescenta as respostas no briefing.",
    ],
    selfCheck: [
      "Pedi as perguntas sem deixar construir",
      "Respondi todas, mesmo que com “ainda não sei”",
      "O briefing ficou maior e mais claro",
      "Pelo menos uma pergunta foi algo que eu nunca tinha pensado",
    ],
  },

  checkpoint: {
    id: "ar-spec-02-cp",
    passThreshold: 2,
    successMessage: "💬 A IA agora trabalha contigo no pedido, não só no resultado.",
    questions: [
      {
        id: "ar-spec-02-cp1",
        type: "order",
        prompt: "Coloca na ordem.",
        concept: "perguntas antes do resultado",
        skill: "compreensao",
        hint: "Construir é sempre o último.",
        explanation: "Pedir as perguntas, responder, atualizar o briefing, e só então construir.",
        items: [
          { id: "c", text: "Atualizar o briefing com as respostas" },
          { id: "d", text: "Pedir pra construir" },
          { id: "a", text: "Pedir as perguntas que faltam" },
          { id: "b", text: "Responder as perguntas" },
        ],
        correctOrder: ["a", "b", "c", "d"],
      },
      {
        id: "ar-spec-02-cp2",
        type: "single",
        prompt: "Tu não sabe responder uma das perguntas. E agora?",
        concept: "como pedir as perguntas",
        skill: "raciocinio",
        hint: "Não saber também é informação.",
        explanation: "Responde “ainda não sei” — a IA vai fazer a escolha mais simples, e tu fica sabendo que aquilo é uma decisão em aberto.",
        options: [
          { id: "a", text: "Pula e manda construir assim mesmo" },
          { id: "b", text: "Responde “ainda não sei” — também é resposta" },
          { id: "c", text: "Desiste do projeto" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-spec-02-cp3",
        type: "single",
        prompt: "Quando vale usar o modo Plan, que gasta crédito?",
        concept: "modo plan",
        skill: "aplicacao",
        hint: "Pensa no tamanho do pedido.",
        explanation: "No pedido grande, onde errar custa caro. Pra um ajuste pequeno, o Build direto resolve.",
        options: [
          { id: "a", text: "Em cada ajuste pequeno" },
          { id: "b", text: "No pedido grande, onde errar custa caro" },
          { id: "c", text: "Nunca" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
