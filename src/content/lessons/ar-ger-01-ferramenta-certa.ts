import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 3 (Geração), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Planos grátis conferidos nas páginas oficiais em 30/10: Claude, ChatGPT,
 * Gemini e Lovable têm plano grátis; o do Lovable dá 5 créditos de
 * construção por dia, até 30 por mês, sem acumular. Nenhum preço é citado.
 */
export const aFerramentaCerta: Lesson = {
  id: "ar-ger-01-ferramenta-certa",
  slug: "a-ferramenta-certa",
  title: "A ferramenta certa pra cada pedaço",
  pain: {
    quote: "Uso o ChatGPT pra tudo e fico travado.",
    belief: "Achar a ferramenta perfeita e usar ela pra tudo.",
    resolve: "Saber qual ferramenta faz melhor cada pedaço do projeto.",
    resolveDetail: "Pensar, construir a tela, achar referência e publicar são trabalhos diferentes.",
    after:
      "Lovable pra tela, Claude ou ChatGPT pra pensar e escrever — cada um no seu lugar.",
  },
  summary: "Lovable, Claude, ChatGPT e Gemini: o que cada um faz melhor e como entregar o pedido.",
  estimatedMinutes: 20,

  learningObjectives: [
    "Dividir o projeto em pedaços de trabalho diferentes",
    "Saber qual ferramenta pega cada pedaço",
    "Usar o plano grátis sem desperdiçar crédito",
  ],

  content: [
    { type: "heading", text: "Um projeto, quatro trabalhos" },
    {
      type: "example",
      title: "O app de rolê, dividido",
      text: "Repara que cada pedaço é um tipo de trabalho. Tentar fazer tudo num chat só é o que trava.",
      code: {
        language: "text",
        code: `PENSAR E ESCREVER   briefing, textos da tela, nome do app      → Claude, ChatGPT ou Gemini
CONSTRUIR A TELA    a tela funcionando, com os botões          → Lovable
REFERÊNCIA          a cara que tu quer                         → Pinterest e apps que tu usa
PUBLICAR            guardar o código e pôr no ar               → GitHub + Vercel ou Render`,
      },
    },
    {
      type: "paragraph",
      text: "O ChatGPT é ótimo pra pensar contigo e escrever. Mas ele te devolve texto e código pra tu montar — não te devolve a tela funcionando. O Lovable te devolve a tela. **Quando tu usa uma ferramenta de pensar pra construir, tu fica colando código sem saber onde.** É aí que trava.",
    },

    { type: "heading", text: "Cada uma no seu lugar" },
    {
      type: "list",
      items: [
        "**Claude, ChatGPT, Gemini — pra pensar e escrever.** Recortar a ideia, escrever o briefing, pedir as perguntas que faltam, escrever os textos da tela. Os três têm plano grátis.",
        "**Lovable — pra construir a tela.** Tu manda o briefing e as referências, ele devolve a tela funcionando. Tem plano grátis com 5 créditos de construção por dia (até 30 no mês), e crédito que sobra não acumula.",
        "**Pinterest e os apps que tu usa — pra referência.** É de onde vêm as cinco da Fase 1.",
        "**GitHub, Vercel, Render — pra publicar.** É a Fase 6 inteira.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Pensa no gratuito, constrói no Lovable",
      text: "Como o crédito do Lovable é contado, faz o trabalho de pensar (briefing, perguntas, textos) no Claude, no ChatGPT ou no Gemini — e leva pro Lovable só o pedido pronto. Cada crédito vira tela, não conversa.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Trocar de ferramenta toda vez que o resultado sai ruim. Se o pedido é vago, toda ferramenta entrega a média. O problema quase nunca é a ferramenta.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "How to build a real product with Lovable",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/tips-tricks/best-practice",
      description: "O que levar pronto pro Lovable antes de pedir a primeira tela.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Lovable Pricing",
      provider: "Lovable",
      url: "https://lovable.dev/pricing",
      description: "O que o plano grátis inclui — os créditos por dia e por mês.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-ger-01-q1",
      type: "match",
      prompt: "Liga cada pedaço do projeto com a ferramenta que pega ele.",
      concept: "ferramenta por pedaco",
      skill: "aplicacao",
      hint: "Pensa no que cada ferramenta te devolve: texto, tela ou endereço.",
      explanation:
        "Pensar e escrever no Claude/ChatGPT/Gemini; construir a tela no Lovable; publicar com GitHub e Vercel ou Render.",
      left: [
        { id: "l1", text: "Escrever o briefing" },
        { id: "l2", text: "Ter a tela funcionando" },
        { id: "l3", text: "Pôr no ar com link" },
      ],
      right: [
        { id: "r1", text: "Lovable" },
        { id: "r2", text: "GitHub + Vercel ou Render" },
        { id: "r3", text: "Claude, ChatGPT ou Gemini" },
      ],
      correctPairs: [
        { leftId: "l1", rightId: "r3" },
        { leftId: "l2", rightId: "r1" },
        { leftId: "l3", rightId: "r2" },
      ],
    },
    {
      id: "ar-ger-01-q2",
      type: "single",
      prompt: "Por que “usar o ChatGPT pra tudo” trava na hora de construir?",
      concept: "pensar nao e construir",
      skill: "compreensao",
      hint: "O que ele te devolve quando tu pede um app?",
      explanation:
        "Porque ele te devolve texto e código pra tu montar, não a tela funcionando. Sem saber onde colar cada pedaço, trava.",
      options: [
        { id: "a", text: "Porque o ChatGPT é ruim" },
        { id: "b", text: "Porque ele devolve texto e código, não a tela funcionando" },
        { id: "c", text: "Porque o plano grátis não deixa" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-ger-01-q3",
      type: "single",
      prompt: "Teu crédito do Lovable é contado. Qual é o jeito esperto de usar?",
      concept: "credito do lovable",
      skill: "raciocinio",
      hint: "Onde o pensar é de graça?",
      explanation:
        "Pensar e escrever nas ferramentas de conversa, e levar pro Lovable só o pedido pronto. Cada crédito vira tela.",
      options: [
        { id: "a", text: "Conversar sobre a ideia no Lovable até ficar boa" },
        { id: "b", text: "Pensar no Claude/ChatGPT/Gemini e levar pro Lovable só o pedido pronto" },
        { id: "c", text: "Gerar várias vezes até sair bom" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-ger-01-ex",
    title: "Divide o teu projeto por ferramenta",
    statement:
      "Pega a tua primeira versão e escreve, pedaço por pedaço, qual ferramenta faz o quê. Depois gera a primeira tela no Lovable com o briefing pronto.",
    steps: [
      "Lista os pedaços: pensar, escrever os textos, construir a tela, referência, publicar.",
      "Do lado de cada um, escreve a ferramenta.",
      "Deixa o briefing pronto numa ferramenta de conversa.",
      "Leva o briefing e as referências pro Lovable e gera a primeira tela.",
    ],
    selfCheck: [
      "Sei qual ferramenta pega cada pedaço do meu projeto",
      "Pensei e escrevi fora do Lovable",
      "Gerei a primeira tela com o briefing pronto",
      "Guardei esse primeiro resultado — ele vai ser julgado na Fase 4",
    ],
  },

  checkpoint: {
    id: "ar-ger-01-cp",
    passThreshold: 2,
    successMessage: "⚡ Cada ferramenta no seu lugar. Agora tu tem uma tela — e na próxima fase tu aprende a julgar ela.",
    questions: [
      {
        id: "ar-ger-01-cp1",
        type: "boolean",
        prompt: "Se o resultado saiu genérico, o melhor é trocar de ferramenta.",
        concept: "pensar nao e construir",
        skill: "raciocinio",
        hint: "O que acontece com um pedido vago em qualquer ferramenta?",
        explanation:
          "Falso. Pedido vago dá média em qualquer ferramenta. O conserto quase sempre é no pedido.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-ger-01-cp2",
        type: "single",
        prompt: "Qual dessas é a ferramenta pra construir a tela funcionando?",
        concept: "ferramenta por pedaco",
        skill: "compreensao",
        hint: "Qual delas te devolve a tela, e não texto?",
        explanation: "O Lovable: tu manda o pedido, ele devolve a tela funcionando.",
        options: [
          { id: "a", text: "Pinterest" },
          { id: "b", text: "Lovable" },
          { id: "c", text: "GitHub" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-ger-01-cp3",
        type: "single",
        prompt: "No plano grátis do Lovable, o crédito que sobra hoje…",
        concept: "credito do lovable",
        skill: "compreensao",
        hint: "A página de preços fala disso.",
        explanation: "Não acumula: o crédito diário vence no fim do dia. Por isso vale chegar com o pedido pronto.",
        options: [
          { id: "a", text: "Acumula pro mês" },
          { id: "b", text: "Não acumula — vence no fim do dia" },
          { id: "c", text: "Vira dinheiro" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
