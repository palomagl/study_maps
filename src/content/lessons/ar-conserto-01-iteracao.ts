import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 5 (Conserto), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Fatos sobre o histórico de versões do Lovable conferidos na documentação
 * oficial em 30/10: toda mudança vira versão; reverter volta o código, não
 * os dados do banco; dá pra marcar uma versão boa. Num agente de código, o
 * ponto de volta é o commit (aula 6.1).
 */
export const pedeACorrecao: Lesson = {
  id: "ar-cons-01-iteracao",
  slug: "peca-a-correcao",
  title: "Pede a correção, não outra tentativa",
  pain: {
    quote: "Pedi pra arrumar uma coisa e a IA estragou o que tava bom.",
    belief: "Gerar tudo de novo do zero até sair certo.",
    resolve: "Um ajuste por vez: o defeito com nome, e o que não pode mexer.",
    resolveDetail: "“Melhora” é licença pra mexer em tudo. Diz o quê, onde, e o que fica quieto.",
    after: "Peço o conserto e o resto fica no lugar.",
  },
  summary: "Um ajuste por vez, com o defeito nomeado. E quando vale recomeçar de verdade.",
  estimatedMinutes: 20,

  learningObjectives: [
    "Pedir conserto dizendo o quê, onde e o que não mexer",
    "Consertar um defeito por vez",
    "Voltar pra versão boa quando estragar",
  ],

  content: [
    { type: "heading", text: "Dois pedidos de conserto" },
    {
      type: "example",
      title: "O mesmo defeito, pedido de dois jeitos",
      text: "O defeito era só o título pequeno demais. Repara no que cada pedido autoriza a IA a mexer.",
      code: {
        language: "text",
        code: `Pedido vago:
"melhora o topo da página"
→ ela troca o título, muda a cor do botão, reescreve o texto,
  tira a imagem — e tu tinha gostado da imagem

Pedido de conserto:
"No topo, aumenta o título pro dobro do tamanho do parágrafo.
 Não mexe em mais nada: cor, texto, botão e imagem ficam como estão."
→ ela mexe no título. Só.`,
      },
    },
    {
      type: "paragraph",
      text: "“Melhora” é licença pra mexer em tudo — e a IA usa. **Ela não estragou de propósito: tu autorizou.** O conserto bom diz o quê, onde, e o que fica quieto.",
    },

    { type: "heading", text: "Os três elementos" },
    {
      type: "list",
      ordered: true,
      items: [
        "**O defeito, com nome.** O que tu achou na Fase 4: “o título tem o mesmo tamanho do parágrafo”.",
        "**Onde.** “No topo”, “no card de preço”, “no botão principal”.",
        "**O que não pode mexer.** A frase que mais gente esquece — e a que protege o que tava bom.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Um por vez",
      text: "Cinco defeitos num pedido só e alguma coisa vai sair errada sem tu saber qual pedido causou. Um conserto, olha, próximo.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Se estragou mesmo assim",
      text: "Toda ferramenta de construir guarda versões. Num construtor como o Lovable, cada mudança vira uma versão e dá pra voltar pelo histórico; num agente de código, o commit é o teu ponto de volta. Voltar recupera o código, não os dados do banco. Quando chegar numa versão boa, marca ela — fica fácil de achar depois.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Quando recomeçar de verdade",
      text: "Se tu já pediu o mesmo conserto três vezes e não sai, o problema não é o conserto: é o pedido original. Volta pro briefing, corrige ele, e gera de novo.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "Revert and restore your project with version history",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/features/projects/history",
      description: "Como voltar pra uma versão anterior e marcar uma versão boa.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Prompting best practices",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/prompting/prompting-one",
      description: "Inclui como pedir mudança dizendo o que mudar, onde, e o que deixar como está.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-cons-01-q1",
      type: "single",
      prompt: "Tu pediu “melhora o topo” e a IA mexeu em tudo. Por quê?",
      concept: "melhora e licenca",
      skill: "compreensao",
      hint: "O que o pedido autorizou?",
      explanation: "Porque “melhora” não diz o quê nem o que deixar quieto — é licença pra mexer em tudo.",
      options: [
        { id: "a", text: "Porque a IA tá com defeito" },
        { id: "b", text: "Porque “melhora” autoriza mexer em tudo" },
        { id: "c", text: "Porque faltou crédito" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-cons-01-q2",
      type: "multiple",
      prompt: "Quais pedidos têm os três elementos do conserto?",
      concept: "tres elementos do conserto",
      skill: "aplicacao",
      hint: "Defeito com nome, onde, e o que não pode mexer.",
      explanation:
        "Os que dizem o defeito, o lugar e o que fica quieto. “Deixa mais bonito” e “arruma o botão” não dizem o que proteger.",
      options: [
        { id: "a", text: "No card de preço, destaca só o plano Pro. Não mexe nos preços nem no texto." },
        { id: "b", text: "Deixa mais bonito" },
        { id: "c", text: "No topo, aumenta o título pro dobro. O resto fica igual." },
        { id: "d", text: "Arruma o botão" },
      ],
      correctOptionIds: ["a", "c"],
    },
    {
      id: "ar-cons-01-q3",
      type: "single",
      prompt: "Tu tem cinco defeitos nomeados. Qual é o melhor jeito de pedir?",
      concept: "um conserto por vez",
      skill: "raciocinio",
      hint: "Se algo sair errado, tu quer saber qual pedido causou.",
      explanation: "Um por vez: pede, olha, próximo. Assim, se algo estragar, tu sabe exatamente o que causou.",
      options: [
        { id: "a", text: "Os cinco num pedido só, pra economizar" },
        { id: "b", text: "Um por vez, olhando o resultado entre cada um" },
        { id: "c", text: "Gerar tudo de novo do zero" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-cons-01-ex",
    title: "Conserta um defeito da tua tela, um por vez",
    statement:
      "Pega os defeitos que tu nomeou na Fase 4 e conserta um por um, com os três elementos em cada pedido.",
    starter: {
      language: "text",
      code: `Defeito: _______________________________
Onde:    _______________________________
Não mexe em: ___________________________

Pedido: "No ___, ___. Não mexe em ___."`,
    },
    selfCheck: [
      "Cada pedido tem defeito com nome, onde, e o que não mexer",
      "Pedi um conserto por vez",
      "Olhei o resultado antes do próximo",
      "Marquei a versão boa no histórico",
    ],
  },

  checkpoint: {
    id: "ar-cons-01-cp",
    passThreshold: 2,
    successMessage: "🔧 Tu conserta sem estragar. O resto fica no lugar.",
    questions: [
      {
        id: "ar-cons-01-cp1",
        type: "single",
        prompt: "Qual dos três elementos protege o que tava bom?",
        concept: "tres elementos do conserto",
        skill: "compreensao",
        hint: "É o que mais gente esquece.",
        explanation: "O “não mexe em”. É ele que impede a IA de usar o conserto como licença.",
        options: [
          { id: "a", text: "O defeito com nome" },
          { id: "b", text: "O lugar" },
          { id: "c", text: "O que não pode mexer" },
        ],
        correctOptionIds: ["c"],
      },
      {
        id: "ar-cons-01-cp2",
        type: "boolean",
        prompt: "Voltar pra uma versão anterior do código também volta os dados do banco.",
        concept: "historico de versoes",
        skill: "compreensao",
        hint: "A documentação separa código de dados.",
        explanation: "Falso. Reverter volta o código; os dados do banco não voltam junto.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-cons-01-cp3",
        type: "single",
        prompt: "Tu pediu o mesmo conserto três vezes e não sai. O que fazer?",
        concept: "quando recomecar",
        skill: "raciocinio",
        hint: "Onde mora o problema quando o conserto não pega?",
        explanation: "Voltar pro briefing: o problema tá no pedido original. Corrige ele e gera de novo.",
        options: [
          { id: "a", text: "Pedir uma quarta vez, mais alto" },
          { id: "b", text: "Voltar pro briefing, corrigir e gerar de novo" },
          { id: "c", text: "Trocar de ferramenta" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
