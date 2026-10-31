import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 3 (Geração), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Revisão da autora: menos Lovable. O piso é grátis; quem já paga uma IA
 * segue pelo agente de código dela. Fatos conferidos nas páginas oficiais em
 * 30/10/2026:
 * - Claude: artifacts vêm em todos os planos, inclusive o grátis; Claude Code
 *   vem nos planos pagos (Pro, Max, Ultra).
 * - ChatGPT: o Codex vem em todos os planos, inclusive o grátis, com limite
 *   que muda por plano.
 * - Cursor: "coding agent"; tem plano grátis com pedidos limitados; os planos
 *   pagos mudaram este ano.
 * - Lovable: plano grátis com crédito contado por dia.
 * Nenhum preço é citado: os planos mudam várias vezes por ano.
 */
export const aFerramentaCerta: Lesson = {
  id: "ar-ger-01-ferramenta-certa",
  slug: "a-ferramenta-certa",
  title: "A ferramenta certa pra cada pedaço",
  pain: {
    quote: "Uso o ChatGPT pra tudo e fico travado.",
    belief: "Achar a ferramenta perfeita e usar ela pra tudo.",
    resolve: "Saber qual ferramenta faz melhor cada pedaço do projeto.",
    resolveDetail: "Pensar, construir e publicar são trabalhos diferentes — e cada um tem sua ferramenta.",
    after: "Sei onde pensar, onde construir e onde publicar — e começo de graça.",
  },
  summary: "Pensar, construir e publicar: onde fazer cada um, de graça ou com a IA que tu já paga.",
  estimatedMinutes: 20,

  learningObjectives: [
    "Separar o projeto em pensar, construir e publicar",
    "Escolher onde construir: grátis ou no que tu já paga",
    "Gastar o limite do plano com tela, não com conversa",
  ],

  content: [
    { type: "heading", text: "Um projeto, três trabalhos" },
    {
      type: "example",
      title: "O app de rolê, dividido",
      text: "Cada linha é um tipo de trabalho. Fazer os três no mesmo chat é o que trava.",
      code: {
        language: "text",
        code: `PENSAR      recortar a ideia, briefing, textos   → ChatGPT, Claude ou Gemini
CONSTRUIR   a tela funcionando                   → depende do teu caminho (abaixo)
PUBLICAR    guardar o código e pôr no ar         → GitHub + Vercel ou Render

(e a referência, a cara que tu quer → Pinterest e os apps que tu usa)`,
      },
    },
    {
      type: "paragraph",
      text: "O chat é ótimo pra pensar contigo. Mas quando tu pede um app inteiro numa conversa comum, vem um monte de código pra tu colar — e tu não sabe onde. **O problema não é a IA: é usar a ferramenta de pensar pra construir.**",
    },

    { type: "heading", text: "Onde construir: dois caminhos" },
    {
      type: "list",
      items: [
        "**Caminho grátis.** Pensa no ChatGPT, no Claude ou no Gemini — os três têm plano grátis. Pra ver a tela funcionando, pede pro Claude fazer um **artifact**: ele mostra a tela do lado da conversa, e isso vem no grátis. Outra opção é um construtor no navegador, como o Lovable, que tem plano grátis com crédito contado por dia.",
        "**Caminho pago — se tu já paga uma IA.** Aí vale usar um **agente de código**: ele abre os arquivos do teu projeto e mexe direto neles, sem tu colar nada. O **Claude Code** vem nos planos pagos do Claude. O **Codex** vem no ChatGPT — até no grátis, com limite menor. O **Cursor** é um editor feito em volta disso. É o caminho mais forte pra app de verdade.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Antes de assinar qualquer coisa",
      text: "Os planos dessas ferramentas mudam várias vezes por ano. Antes de pagar, abre a página de preços oficial e confere o que o plano inclui. E tu não precisa pagar nada pra fazer essa trilha: o caminho grátis chega até o link no ar.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Gasta o limite com tela, não com conversa",
      text: "Todo plano tem limite — de crédito, de mensagem ou de uso. Pensa e escreve o briefing antes, e leva pra quem constrói só o pedido pronto.",
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
      title: "What are artifacts and how do I use them?",
      provider: "Claude (central de ajuda oficial)",
      url: "https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them",
      description: "O que é um artifact e em quais planos ele vem — inclusive o grátis.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Using Codex with your ChatGPT plan",
      provider: "OpenAI (central de ajuda oficial)",
      url: "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan",
      description: "Como usar o Codex com a conta do ChatGPT, e o limite de cada plano.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Cursor Pricing",
      provider: "Cursor",
      url: "https://cursor.com/pricing",
      description: "O que cada plano do Cursor inclui. Confere antes de assinar.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Lovable Pricing",
      provider: "Lovable",
      url: "https://lovable.dev/pricing",
      description: "O que o plano grátis do Lovable inclui.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-ger-01-q1",
      type: "match",
      prompt: "Liga cada trabalho com quem faz ele.",
      concept: "ferramenta por pedaco",
      skill: "aplicacao",
      hint: "Pensa no que cada ferramenta te devolve: texto, tela ou endereço.",
      explanation:
        "Pensar no chat; construir num construtor ou num agente de código; publicar com GitHub e Vercel ou Render.",
      left: [
        { id: "l1", text: "Escrever o briefing" },
        { id: "l2", text: "Ter a tela funcionando" },
        { id: "l3", text: "Pôr no ar com link" },
      ],
      right: [
        { id: "r1", text: "Um construtor ou um agente de código (Lovable, Cursor, Claude Code, Codex)" },
        { id: "r2", text: "GitHub + Vercel ou Render" },
        { id: "r3", text: "ChatGPT, Claude ou Gemini" },
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
      prompt: "Por que pedir um app inteiro numa conversa comum trava?",
      concept: "pensar nao e construir",
      skill: "compreensao",
      hint: "O que vem de volta quando tu pede um app inteiro?",
      explanation:
        "Porque vem um monte de código pra tu colar, e tu não sabe onde vai cada pedaço.",
      options: [
        { id: "a", text: "Porque a IA é ruim" },
        { id: "b", text: "Porque vem um monte de código pra colar, sem saber onde" },
        { id: "c", text: "Porque o plano grátis não deixa" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-ger-01-q3",
      type: "single",
      prompt: "Tu já paga o ChatGPT ou o Claude. Qual é o jeito mais forte de construir?",
      concept: "caminho pago",
      skill: "raciocinio",
      hint: "Qual deles mexe direto nos arquivos do projeto?",
      explanation:
        "Usar o agente de código do teu plano — Codex no ChatGPT, Claude Code no Claude. Ele mexe nos arquivos, tu não cola nada.",
      options: [
        { id: "a", text: "Colar o código da conversa num arquivo, pedaço por pedaço" },
        { id: "b", text: "Usar o agente de código do plano: Codex ou Claude Code" },
        { id: "c", text: "Assinar todas as ferramentas" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-ger-01-ex",
    title: "Escolhe teu caminho e gera a primeira tela",
    statement:
      "Decide se vai pelo caminho grátis ou pelo pago, escreve qual ferramenta faz cada trabalho, e gera a primeira tela com o briefing pronto.",
    steps: [
      "Escolhe o caminho: grátis, ou o agente de código da IA que tu já paga.",
      "Do lado de cada trabalho — pensar, construir, publicar — escreve a ferramenta.",
      "Deixa o briefing pronto numa conversa.",
      "Leva o briefing e as referências pra ferramenta de construir e gera a primeira tela.",
    ],
    selfCheck: [
      "Sei qual ferramenta faz cada trabalho do meu projeto",
      "Não paguei nada que eu não precisava",
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
        prompt: "Tu não quer pagar nada. Dá pra fazer a trilha?",
        concept: "caminho gratis",
        skill: "compreensao",
        hint: "O que vem nos planos grátis?",
        explanation:
          "Dá: pensa num chat grátis e constrói num artifact do Claude ou num construtor com plano grátis.",
        options: [
          { id: "a", text: "Não, precisa de plano pago" },
          { id: "b", text: "Sim: pensa num chat grátis e constrói num artifact ou num construtor grátis" },
          { id: "c", text: "Só se tiver o Cursor" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-ger-01-cp3",
        type: "single",
        prompt: "Antes de assinar uma ferramenta, o que tu confere?",
        concept: "planos mudam",
        skill: "aplicacao",
        hint: "Os planos mudam várias vezes por ano.",
        explanation: "A página de preços oficial — é ela que diz o que o plano inclui hoje.",
        options: [
          { id: "a", text: "O que alguém falou num vídeo antigo" },
          { id: "b", text: "A página de preços oficial da ferramenta" },
          { id: "c", text: "Nada, é tudo igual" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
