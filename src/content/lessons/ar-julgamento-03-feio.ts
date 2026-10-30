import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 4 (Julgamento), aula 3.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Recebe o exercício que saiu da 4.1 na conversão (spec 30/10 §10.3):
 * gerar o ruim de propósito é o assunto inteiro desta aula.
 */
export const fazAVersaoFeia: Lesson = {
  id: "ar-jul-03-feio-de-proposito",
  slug: "a-versao-feia-de-proposito",
  title: "Faz a versão feia de propósito",
  pain: {
    quote: "Só percebo que tá ruim quando alguém me fala.",
    resolve: "Gerar o ruim de propósito pra treinar o olho.",
    resolveDetail: "Quem já fez o feio de propósito reconhece o feio por acidente.",
    after: "Eu vejo o defeito antes de alguém apontar.",
  },
  summary: "Gera o ruim de propósito e conserta. Treina o olho.",
  estimatedMinutes: 30,

  learningObjectives: [
    "Gerar um resultado ruim de propósito e guardar ele",
    "Nomear os defeitos sem ajuda de ninguém",
    "Consertar com um pedido novo e comparar os dois",
  ],

  content: [
    { type: "heading", text: "O ruim de propósito, lado a lado com o consertado" },
    {
      type: "compare",
      left: {
        src: "/content/app-no-ar/hero-sem-referencia.svg",
        alt: "Seção inicial gerada de propósito com um pedido preguiçoso: tudo do mesmo tamanho, três botões iguais, cartões colados.",
        label: "Feio de propósito",
        caption: "Ilustração. Pedido: “faz uma landing page”. Nada mais.",
      },
      right: {
        src: "/content/app-no-ar/hero-com-referencia.svg",
        alt: "A mesma seção consertada: título grande, uma ação principal, espaço em volta.",
        label: "Consertado com nome",
        caption: "Ilustração. Pedido novo: cada defeito nomeado virou instrução.",
      },
    },
    {
      type: "paragraph",
      text: "O da esquerda não saiu ruim por azar: ele foi **pedido** ruim. E é exatamente por isso que serve. Quando tu faz o feio de propósito, tu vê de onde ele vem — e passa a reconhecer quando ele aparece sem tu querer.",
    },

    { type: "heading", text: "Por que fazer o ruim de propósito" },
    {
      type: "paragraph",
      text: "Tu já sabe nomear defeito e tem o checklist. O que falta é o olho rápido — ver o defeito antes de alguém apontar. Olho se treina com repetição, e o jeito mais rápido de ter defeito pra treinar é fabricar ele.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Pede o ruim.** Uma frase, sem referência, sem briefing: “faz uma tela de [tua ideia]”.",
        "**Guarda.** Print. É o teu “antes”.",
        "**Nomeia sozinho.** Passa o checklist e escreve de três a cinco defeitos com nome. Ninguém te ajuda nessa parte.",
        "**Conserta com pedido novo.** Cada defeito vira uma instrução no pedido.",
        "**Compara.** Põe os dois lado a lado e explica a diferença em voz alta.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Cronometra",
      text: "Na primeira vez, nomear os defeitos leva minutos. Repete com outra tela e cronometra de novo. Quando cair pra segundos, teu olho tá treinado.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Pular o passo 3 e já pedir o conserto. Sem nomear sozinho, tu só trocou um chute por outro — e o olho não treinou nada.",
    },
  ],

  freeResources: [
    {
      kind: "video",
      title: "Squint Test",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/videos/squint-test/",
      description: "O teste mais rápido pra achar o defeito de hierarquia no teu “antes”.",
      lang: "en",
      durationLabel: "4 min",
    },
    {
      kind: "docs",
      title: "Prompting best practices",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/prompting/prompting-one",
      description: "Como ser específico no pedido do conserto.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-jul-03-q1",
      type: "single",
      prompt: "Pra que serve gerar o resultado ruim de propósito?",
      concept: "feio de proposito",
      skill: "compreensao",
      hint: "O que tu ganha vendo de onde o ruim vem?",
      explanation:
        "Pra treinar o olho: quem fabricou o defeito sabe de onde ele vem, e passa a reconhecer quando ele aparece sem querer.",
      options: [
        { id: "a", text: "Pra ter algo pra mostrar como erro" },
        { id: "b", text: "Pra treinar o olho a reconhecer o defeito sozinho" },
        { id: "c", text: "Pra gastar menos crédito" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-jul-03-q2",
      type: "judge",
      prompt: "Teu “antes” e teu “depois”. Qual é o consertado, e o que tava errado no outro?",
      concept: "nomear sozinho",
      skill: "raciocinio",
      hint: "Passa a pergunta 1 e a 3 do checklist nos dois.",
      explanation:
        "O B tem um título que manda e diz o que o app faz. O A tem tudo com o mesmo peso e um texto que serve pra qualquer app.",
      left: {
        label: "A",
        body: `Bem-vindo ao nosso app
O melhor app para organizar a sua vida
com praticidade e tecnologia.
[ Começar ] [ Saiba mais ] [ Contato ]`,
      },
      right: {
        label: "B",
        body: `MARCA O ROLÊ.
O LINK FAZ O RESTO.
Quem vai confirma num toque.
[ Criar rolê ]`,
      },
      better: "right",
      defects: [
        { id: "d1", text: "Tudo com o mesmo peso — nada pro olho achar primeiro" },
        { id: "d2", text: "O texto serviria pra qualquer app" },
        { id: "d3", text: "Três ações brigando" },
        { id: "d4", text: "Tem a palavra “app”" },
      ],
      correctDefectIds: ["d1", "d2", "d3"],
    },
    {
      id: "ar-jul-03-q3",
      type: "order",
      prompt: "Coloca o exercício da versão feia na ordem.",
      concept: "feio de proposito",
      skill: "compreensao",
      hint: "O conserto vem depois de tu nomear sozinho.",
      explanation: "Pedir o ruim, guardar, nomear sozinho, consertar com pedido novo, comparar.",
      items: [
        { id: "c", text: "Nomear os defeitos sozinho" },
        { id: "e", text: "Comparar os dois lado a lado" },
        { id: "a", text: "Pedir o ruim, sem referência" },
        { id: "d", text: "Consertar com um pedido novo" },
        { id: "b", text: "Guardar o print do “antes”" },
      ],
      correctOrder: ["a", "b", "c", "d", "e"],
    },
  ],

  exercise: {
    id: "ar-jul-03-ex",
    title: "Faz a versão feia de propósito",
    statement:
      "Gera de propósito o resultado ruim da tua ideia, nomeia os defeitos sozinho e conserta. É o exercício que mais treina o olho na trilha toda.",
    steps: [
      "Pede a tela da tua ideia numa frase só, sem referência.",
      "Guarda o print.",
      "Passa o checklist e escreve de três a cinco defeitos com nome — sozinho.",
      "Reescreve o pedido: cada defeito vira uma instrução.",
      "Gera de novo e põe os dois lado a lado.",
    ],
    selfCheck: [
      "Gerei o ruim de propósito e guardei",
      "Nomeei os defeitos sem pedir ajuda",
      "Cada defeito virou uma instrução no pedido novo",
      "Consigo explicar a diferença em voz alta",
      "Repeti com outra tela e fui mais rápido",
    ],
  },

  checkpoint: {
    id: "ar-jul-03-cp",
    passThreshold: 2,
    successMessage: "👀 Teu olho tá treinado. Tu vê o defeito antes de alguém apontar.",
    questions: [
      {
        id: "ar-jul-03-cp1",
        type: "single",
        prompt: "Qual passo do exercício não dá pra pular?",
        concept: "nomear sozinho",
        skill: "raciocinio",
        hint: "Qual deles é o que treina o olho?",
        explanation: "Nomear os defeitos sozinho. Sem ele, o conserto é só outro chute e o olho não treina.",
        options: [
          { id: "a", text: "Nomear os defeitos sozinho" },
          { id: "b", text: "Escolher a cor" },
          { id: "c", text: "Gerar três vezes" },
        ],
        correctOptionIds: ["a"],
      },
      {
        id: "ar-jul-03-cp2",
        type: "boolean",
        prompt: "O resultado ruim de propósito deve ser apagado assim que tu consertar.",
        concept: "feio de proposito",
        skill: "aplicacao",
        hint: "Pra que serve o “antes”?",
        explanation: "Falso. Guarda: o “antes” do lado do “depois” é o que mostra o que mudou — e o que tu aprendeu.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-jul-03-cp3",
        type: "single",
        prompt: "Como tu sabe que teu olho tá treinado?",
        concept: "feio de proposito",
        skill: "compreensao",
        hint: "Lembra da dica do cronômetro.",
        explanation: "Quando nomear os defeitos de uma tela nova cai de minutos pra segundos.",
        options: [
          { id: "a", text: "Quando alguém elogia" },
          { id: "b", text: "Quando nomear defeito cai de minutos pra segundos" },
          { id: "c", text: "Quando a IA para de errar" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
