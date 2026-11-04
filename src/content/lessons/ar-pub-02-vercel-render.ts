import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 6 (No ar), aula 2.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Planos grátis conferidos na documentação oficial em 30/10 — e os limites
 * deles vão na aula, porque "de graça" sem limite seria meia verdade:
 * - Vercel Hobby: grátis, só pra uso pessoal e não comercial.
 * - Render: web service grátis dorme depois de 15 min sem acesso (leva ~1
 *   min pra acordar); Postgres grátis expira em 30 dias (+14 de carência);
 *   750 h por mês; a Render diz pra não usar em produção.
 * Nenhum preço é citado.
 */
export const vercelOuRender: Lesson = {
  id: "ar-pub-02-vercel-render",
  slug: "vercel-ou-render",
  title: "Vercel ou Render: a decisão",
  pain: {
    quote: "Não sei onde colocar meu app no ar e tenho medo de virar conta pra pagar.",
    belief: "Escolher o primeiro que aparecer — ou desistir porque parece caro.",
    resolve: "Só front: Vercel. Tem backend e banco: Render. Nos dois, plano grátis.",
    resolveDetail: "Uma pergunta decide: teu app tem backend e banco, ou é só tela?",
    after: "Sei onde meu tipo de app vai morar — e de graça.",
  },
  summary: "Tem backend e banco? Render. É só front? Vercel. E o que é um build no meio disso.",
  estimatedMinutes: 25,

  // A aula em telas: o que a pessoa faz no celular, conduzida pelo No ar.
  play: {
    pieces: [
      {
        id: "a-pergunta-que-decide",
        title: "A pergunta que decide",
        cards: [
          {
            kind: "fala",
            text: "Hora de escolher onde teu app MORA! Uma pergunta só decide. Bora!",
          },
          {
            kind: "dor",
          },
          {
            kind: "escolha",
            prompt: "Como o Caio escolhe?",
            options: [
              {
                id: "a",
                text: "Pega o primeiro que aparecer — ou desiste porque parece caro",
              },
              {
                id: "b",
                text: "Responde: o app guarda algo que outra pessoa vai ver depois?",
              },
              {
                id: "c",
                text: "Escolhe o mais famoso",
              },
            ],
            correctId: "b",
            beliefId: "a",
            right: "ISSO! Uma pergunta e pronto!",
            wrong: "Nem sorteio nem desistência: uma pergunta decide — e os dois têm plano grátis!",
          },
          {
            kind: "escolha",
            prompt: "O app de rolê guarda quem confirmou. Onde ele mora?",
            options: [
              {
                id: "a",
                text: "Vercel",
              },
              {
                id: "b",
                text: "Render",
              },
            ],
            correctId: "b",
            right: "Tem backend e banco → Render!",
            wrong: "Ele guarda quem confirmou: tem backend e banco. Isso é Render.",
          },
          {
            kind: "escolha",
            prompt: "E um portfólio, onde nada é guardado?",
            options: [
              {
                id: "a",
                text: "Vercel",
              },
              {
                id: "b",
                text: "Render",
              },
            ],
            correctId: "a",
            right: "Só tela → Vercel! BOA!",
            wrong: "Nada guardado é só tela — e só tela é Vercel.",
          },
        ],
        mission: "Responde pro teu projeto: ele guarda algo que outra pessoa vai ver depois?",
      },
      {
        id: "o-gratis-e-os-limites",
        title: "O grátis e os limites",
        cards: [
          {
            kind: "fala",
            text: "É DE GRAÇA! …Com limites. Conhecer eles antes é o que separa quem sabe de quem toma susto.",
          },
          {
            kind: "escolha",
            prompt: "Render grátis: a primeira pessoa do dia esperou um minuto. Por quê?",
            options: [
              {
                id: "a",
                text: "A internet dela é lenta",
              },
              {
                id: "b",
                text: "O grátis dorme sem acesso e leva ~1 minuto pra acordar",
              },
            ],
            correctId: "b",
            right: "Isso! Dorme depois de 15 minutos sem acesso!",
            wrong: "Não é a internet: o web service grátis dorme sem acesso e leva uns 1 minuto pra acordar.",
          },
          {
            kind: "escolha",
            prompt: "O banco Postgres grátis da Render guarda dados pra sempre?",
            options: [
              {
                id: "s",
                text: "Guarda",
              },
              {
                id: "n",
                text: "Não — expira em 30 dias",
              },
            ],
            correctId: "n",
            right: "Exato! É pra aprender e testar!",
            wrong: "Não guarda: o Postgres grátis expira em 30 dias. É pra testar.",
          },
          {
            kind: "escolha",
            prompt: "O plano Hobby da Vercel é pra quê?",
            options: [
              {
                id: "a",
                text: "Pra qualquer empresa",
              },
              {
                id: "b",
                text: "Pra uso pessoal e não comercial",
              },
              {
                id: "c",
                text: "Só pra estudante",
              },
            ],
            correctId: "b",
            right: "ISSO! Virou negócio, muda de plano!",
            wrong: "É pra uso pessoal e não comercial. Se virar negócio, muda de plano.",
          },
          {
            kind: "escolha",
            prompt: "O painel mostra erro no build. O que é?",
            options: [
              {
                id: "a",
                text: "A montagem do site a partir do código falhou",
              },
              {
                id: "b",
                text: "Acabou o plano grátis",
              },
            ],
            correctId: "a",
            right: "Exato! O erro no painel diz onde!",
            wrong: "Build é a montagem do site a partir do código. Se falha, o painel diz onde.",
          },
        ],
        mission: "Cria a conta na Vercel ou na Render, no plano grátis, e conecta ao teu repositório.",
      },
    ],
  },

  learningObjectives: [
    "Saber se teu app é só tela ou guarda dados",
    "Escolher entre Vercel e Render com essa resposta",
    "Saber os limites do grátis antes de depender dele",
  ],

  content: [
    { type: "heading", text: "Dois apps, duas casas" },
    {
      type: "example",
      title: "A pergunta que decide",
      text: "Os dois apps têm tela. Só um precisa de um computador ligado guardando dados.",
      code: {
        language: "text",
        code: `App A — portfólio, landing page, cardápio
  tudo que a pessoa vê vem pronto; nada é guardado
  → SÓ TELA (front) → Vercel

App B — app de rolê com lista de quem confirmou
  precisa guardar quem confirmou e mostrar pra todo mundo
  → TELA + BACKEND + BANCO → Render`,
      },
    },
    {
      type: "paragraph",
      text: "**Teu app guarda alguma coisa que outra pessoa vai ver depois?** Se não, é só tela, e a Vercel resolve. Se sim, tem backend e banco, e a Render pega as três partes.",
    },

    { type: "heading", text: "O que é o build" },
    {
      type: "paragraph",
      text: "Quando tu manda publicar, a Vercel ou a Render puxam o código do teu repositório e **montam** a versão que vai pro ar. Essa montagem é o build. Se ele falha, o site não sobe — e o erro aparece no painel. É por isso que o repositório da aula anterior vem antes.",
    },

    { type: "heading", text: "O plano grátis — e os limites dele" },
    {
      type: "list",
      items: [
        "**Vercel (plano Hobby):** grátis, pra projeto pessoal. Ele é **só pra uso pessoal e não comercial** — se o projeto virar negócio, muda de plano.",
        "**Render, web service grátis:** **dorme depois de 15 minutos sem acesso** e leva cerca de um minuto pra acordar. A primeira pessoa que abrir depois disso vai esperar.",
        "**Render, banco Postgres grátis:** **expira em 30 dias** (com 14 de carência). Serve pra aprender e testar, não pra guardar coisa importante.",
        "**Render, no geral:** 750 horas grátis por mês, e a própria Render diz pra não usar o grátis em produção.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Pra primeira versão, isso basta",
      text: "Tua primeira versão é pra mostrar e testar com gente de verdade. Os limites do grátis não atrapalham isso — só não deixa um projeto que tá dando certo morar no grátis pra sempre.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Escolher pelo nome mais famoso. A escolha vem da pergunta do backend — e pôr um app com banco num lugar só de tela é a receita de “subiu mas não salva nada”.",
    },
  ],

  video: {
    title: "Como hospedar um site na Vercel em 3 minutos (passo a passo)",
    provider: "YouTube",
    channel: "Breno Luiz",
    url: "https://www.youtube.com/watch?v=mhbYavuW9T4",
    description: "Do repositório no GitHub ao link da Vercel, em três minutos.",
    lang: "pt-BR",
  },

  freeResources: [
    {
      kind: "docs",
      title: "Vercel Hobby Plan",
      provider: "Vercel (documentação oficial)",
      url: "https://vercel.com/docs/plans/hobby",
      description: "O plano grátis da Vercel, os limites dele e o uso só pessoal.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Deploy for Free",
      provider: "Render (documentação oficial)",
      url: "https://render.com/docs/free",
      description: "O que é grátis na Render e os limites: dormir sem acesso, banco que expira, horas por mês.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-pub-02-q1",
      type: "single",
      prompt: "Qual pergunta decide entre Vercel e Render?",
      concept: "so tela ou backend",
      skill: "compreensao",
      hint: "Tem a ver com guardar coisa.",
      explanation: "Se o app guarda algo que outra pessoa vai ver depois (backend e banco), Render. Se é só tela, Vercel.",
      options: [
        { id: "a", text: "Qual é mais famosa" },
        { id: "b", text: "Se o app guarda algo que outra pessoa vai ver depois" },
        { id: "c", text: "Qual tem a tela mais bonita" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-pub-02-q2",
      type: "match",
      prompt: "Liga cada app com onde ele mora.",
      concept: "so tela ou backend",
      skill: "aplicacao",
      hint: "Pergunta pra cada um: guarda alguma coisa?",
      explanation: "Portfólio e cardápio são só tela (Vercel). Lista de confirmados precisa de banco (Render).",
      left: [
        { id: "l1", text: "Portfólio pessoal" },
        { id: "l2", text: "App de rolê com lista de quem confirmou" },
        { id: "l3", text: "Cardápio de uma lanchonete" },
      ],
      right: [
        { id: "r1", text: "Vercel" },
        { id: "r2", text: "Render" },
      ],
      correctPairs: [
        { leftId: "l1", rightId: "r1" },
        { leftId: "l2", rightId: "r2" },
        { leftId: "l3", rightId: "r1" },
      ],
    },
    {
      id: "ar-pub-02-q3",
      type: "single",
      prompt: "Teu app tá na Render grátis e a primeira pessoa do dia demorou um minuto pra abrir. Por quê?",
      concept: "limites do gratis",
      skill: "raciocinio",
      hint: "O que acontece com o web service grátis sem acesso?",
      explanation: "O web service grátis dorme depois de 15 minutos sem acesso e leva cerca de um minuto pra acordar.",
      options: [
        { id: "a", text: "Porque a internet dela é lenta" },
        { id: "b", text: "Porque o grátis dorme sem acesso e leva ~1 minuto pra acordar" },
        { id: "c", text: "Porque o app tá com defeito" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-pub-02-ex",
    title: "Decide a casa do teu app",
    statement:
      "Responde a pergunta do backend pro teu projeto, escolhe Vercel ou Render, e cria a conta no plano grátis.",
    steps: [
      "Lista o que teu app precisa guardar. Se a lista tá vazia, é só tela.",
      "Escolhe: só tela → Vercel. Backend e banco → Render.",
      "Lê os limites do plano grátis da escolhida na documentação oficial.",
      "Cria a conta e conecta ao teu repositório do GitHub.",
    ],
    selfCheck: [
      "Sei se meu app é só tela ou tem backend e banco",
      "Escolhi a casa pela pergunta, não pelo nome",
      "Sei os limites do plano grátis que vou usar",
      "Conectei a conta ao meu repositório",
    ],
  },

  checkpoint: {
    id: "ar-pub-02-cp",
    passThreshold: 2,
    successMessage: "🏠 Teu app tem casa — e tu sabe exatamente o que o grátis cobre.",
    questions: [
      {
        id: "ar-pub-02-cp1",
        type: "boolean",
        prompt: "O banco Postgres grátis da Render serve pra guardar dados importantes por tempo indeterminado.",
        concept: "limites do gratis",
        skill: "compreensao",
        hint: "A documentação da Render fala de prazo.",
        explanation: "Falso. O Postgres grátis expira em 30 dias (com 14 de carência). É pra aprender e testar.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-pub-02-cp2",
        type: "single",
        prompt: "O plano Hobby da Vercel é pra quê?",
        concept: "limites do gratis",
        skill: "compreensao",
        hint: "A documentação fala de tipo de uso.",
        explanation: "Pra projeto pessoal e não comercial. Se virar negócio, muda de plano.",
        options: [
          { id: "a", text: "Pra qualquer empresa, sem limite" },
          { id: "b", text: "Pra uso pessoal e não comercial" },
          { id: "c", text: "Só pra estudante" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-pub-02-cp3",
        type: "single",
        prompt: "O site não subiu e o painel mostra um erro no build. O que isso quer dizer?",
        concept: "o que e build",
        skill: "aplicacao",
        hint: "O build é a montagem.",
        explanation: "Que a montagem da versão pro ar falhou a partir do código do repositório — o erro no painel diz onde.",
        options: [
          { id: "a", text: "Que a montagem do site a partir do código falhou" },
          { id: "b", text: "Que acabou o plano grátis" },
          { id: "c", text: "Que o domínio tá errado" },
        ],
        correctOptionIds: ["a"],
      },
    ],
  },

  status: "available",
};
