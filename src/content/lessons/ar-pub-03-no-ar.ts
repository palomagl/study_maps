import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 6 (No ar), aula 3. A última.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Fatos conferidos na documentação oficial em 30/10: na Vercel, variáveis de
 * ambiente são configuradas fora do código-fonte; a Render tem página própria
 * de variáveis de ambiente e arquivos secretos.
 */
export const noArComLink: Lesson = {
  id: "ar-pub-03-no-ar",
  slug: "no-ar-com-link",
  title: "No ar, com link pra mandar",
  pain: {
    quote: "Tá pronto, mas ninguém consegue ver.",
    belief: "Dizer \"tá pronto\" porque abriu no teu computador.",
    resolve: "Publicar, guardar o que não pode vazar e registrar o link.",
    resolveDetail: "Pronto é quando outra pessoa abre no celular dela. Antes disso, é rascunho.",
    after: "Mandei o link pra alguém e abriu.",
  },
  summary:
    "Variáveis de ambiente, o que nunca vai pro repositório, e o link que tu registra como prova.",
  estimatedMinutes: 30,

  // A aula em telas: o que a pessoa faz no celular, conduzida pelo No ar.
  play: {
    pieces: [
      {
        id: "pronto-de-verdade",
        title: "Pronto de verdade",
        cards: [
          {
            kind: "fala",
            text: "ÚLTIMA AULA! Tua ideia tá quase no mundo! Só falta uma coisa: outra pessoa abrir.",
          },
          {
            kind: "dor",
          },
          {
            kind: "escolha",
            prompt: "Abriu no teu computador. Tá pronto?",
            options: [
              {
                id: "a",
                text: "Tá — abriu, tá pronto",
              },
              {
                id: "b",
                text: "Ainda não: pronto é quando outra pessoa abre no celular dela",
              },
            ],
            correctId: "b",
            beliefId: "a",
            right: "ISSO! Pronto é no celular de outra pessoa!",
            wrong: "Teu computador mente: tá logado, tem cache, tá na tua rede. Pronto é no celular de outra pessoa.",
          },
          {
            kind: "cortar",
            prompt: "Toca no que nunca vai pro repositório.",
            chips: [
              {
                text: "O código das telas",
                keep: true,
              },
              {
                text: "Chave de API",
                keep: false,
              },
              {
                text: "Senha do banco",
                keep: false,
              },
              {
                text: "As imagens do app",
                keep: true,
              },
              {
                text: "Token de serviço",
                keep: false,
              },
            ],
            right: "Chave, senha e token vão em variável de ambiente, fora do código!",
            wrong: "Chave, senha e token nunca vão pro repositório: vão em variável de ambiente.",
          },
          {
            kind: "escolha",
            prompt: "Uma chave foi pro repositório. Apagar o arquivo resolve?",
            options: [
              {
                id: "a",
                text: "Resolve",
              },
              {
                id: "b",
                text: "Não: gera uma nova, põe na variável de ambiente e cancela a velha",
              },
            ],
            correctId: "b",
            right: "Exato! Ela continua no histórico!",
            wrong: "Não resolve: a chave fica no histórico. Gera uma nova e cancela a velha.",
          },
        ],
        mission: "Confere que nenhuma chave ou senha tá no teu repositório e publica.",
      },
      {
        id: "manda-o-link",
        title: "Manda o link",
        cards: [
          {
            kind: "fala",
            text: "TESTE FINAL! Aba anônima, celular de outra pessoa, outra rede. Se abriu: MANDA O LINK!",
          },
          {
            kind: "montar",
            prompt: "Põe o fim da trilha na ordem.",
            answer: [
              "Tira as chaves do código",
              "Publica",
              "Outra pessoa abre no celular",
              "Registra o link",
            ],
            distractors: [
              "Manda print",
            ],
            right: "É ISSO! O loop inteiro!",
            wrong: "A ordem: tira as chaves do código, publica, outra pessoa abre no celular, registra o link. Print não conta.",
          },
          {
            kind: "escolha",
            prompt: "O que destrava teu certificado?",
            options: [
              {
                id: "a",
                text: "Só assistir as aulas",
              },
              {
                id: "b",
                text: "Concluir as aulas e registrar o link publicado",
              },
              {
                id: "c",
                text: "Pagar uma taxa",
              },
            ],
            correctId: "b",
            right: "ISSO! O certificado diz que tu ENTREGOU!",
            wrong: "O certificado não é de presença: ele pede as aulas e o link do que tu publicou.",
          },
          {
            kind: "escrever",
            prompt: "Quem vai ser a primeira pessoa a abrir o teu link?",
            placeholder: "Ex.: meu primo",
            saveAs: "primeiro",
          },
          {
            kind: "fala",
            text: "Lembra? Tudo começou com “{ideia}”. Agora tem link. Recortar, pedir, gerar, julgar, consertar, publicar. O LOOP É TEU!",
          },
        ],
        mission: "Manda o link pra alguém abrir no celular e registra ele no cartão da prova, no mapa da trilha. É ele que destrava teu certificado.",
      },
    ],
  },

  learningObjectives: [
    "Publicar a partir do repositório",
    "Guardar senha e chave fora do código",
    "Testar o link como outra pessoa e registrar ele",
  ],

  content: [
    { type: "heading", text: "Dois “tá pronto”" },
    {
      type: "example",
      title: "O mesmo link, aberto em dois lugares",
      text: "Só um dos dois conta.",
      code: {
        language: "text",
        code: `No teu computador, logado em tudo:
  abre ✓ — mas tu tá vendo pelos teus olhos

No celular de um amigo, em outra rede:
  abre ✓ → AGORA tá pronto
  não abre ✗ → era rascunho`,
      },
    },
    {
      type: "paragraph",
      text: "O teu computador mente: ele tá logado, tem cache, tá na tua rede. **Pronto é quando outra pessoa abre no celular dela.** Até lá, é rascunho.",
    },

    { type: "heading", text: "Publicar a partir do repositório" },
    {
      type: "paragraph",
      text: "Com o repositório conectado na Vercel ou na Render (aula anterior), cada commit novo gera uma publicação nova. Tu não “sobe arquivo”: tu manda pro repositório, e a publicação puxa de lá.",
    },

    { type: "heading", text: "O que nunca vai pro repositório" },
    {
      type: "paragraph",
      text: "Chave de API, senha de banco, token de serviço. Se isso entrar no código, entra no histórico — e quem tiver acesso ao repositório tem acesso à tua chave. O lugar certo é a **variável de ambiente**: um par nome-valor que tu configura no painel da Vercel ou da Render, **fora do código**. O código só lê o nome.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Se uma chave já foi pro repositório",
      text: "Apagar o arquivo não basta: ela continua no histórico. Gera uma chave nova no serviço, põe ela na variável de ambiente, e cancela a velha.",
    },

    { type: "heading", text: "Testa como outra pessoa" },
    {
      type: "list",
      ordered: true,
      items: [
        "Abre o link numa **aba anônima** — sem login, sem cache.",
        "Manda pra **alguém** e pede pra abrir no celular, em outra rede.",
        "Pede pra essa pessoa fazer **a ação principal** — a que tu recortou lá na Fase 1.",
        "Se funcionou, **registra o link no StudyMaps**, no cartão da prova da trilha. É ele que destrava o teu certificado.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Fechou o ciclo",
      text: "Tu saiu de uma ideia gigante e chegou num link que outra pessoa abre. Recortar, juntar referência, pedir, gerar, julgar, consertar, publicar — é esse o loop, e agora ele é teu.",
    },
  ],

  video: {
    title: "Controlando dados sensíveis com variáveis de ambiente",
    provider: "YouTube",
    channel: "Mario Souto — Dev Soutinho",
    url: "https://www.youtube.com/watch?v=BP2KQtCyzo8",
    description: "Por que chave e senha ficam fora do código, e como fazer isso.",
    lang: "pt-BR",
  },

  freeResources: [
    {
      kind: "docs",
      title: "Environment variables",
      provider: "Vercel (documentação oficial)",
      url: "https://vercel.com/docs/environment-variables",
      description: "Variáveis de ambiente na Vercel: configuradas fora do código-fonte.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Environment Variables and Secrets",
      provider: "Render (documentação oficial)",
      url: "https://render.com/docs/configure-environment-variables",
      description: "Variáveis de ambiente e arquivos secretos na Render.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-pub-03-q1",
      type: "single",
      prompt: "Quando dá pra dizer que o app tá pronto de verdade?",
      concept: "pronto e outra pessoa abrir",
      skill: "compreensao",
      hint: "Pelos olhos de quem?",
      explanation: "Quando outra pessoa abre no celular dela e consegue fazer a ação principal. Teu computador logado não conta.",
      options: [
        { id: "a", text: "Quando abre no meu computador" },
        { id: "b", text: "Quando outra pessoa abre no celular dela e faz a ação principal" },
        { id: "c", text: "Quando o build termina" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-pub-03-q2",
      type: "single",
      prompt: "Onde mora a chave de API do teu app?",
      concept: "variavel de ambiente",
      skill: "aplicacao",
      hint: "Fora de um lugar que tem histórico.",
      explanation: "Numa variável de ambiente, configurada no painel da Vercel ou da Render, fora do código.",
      options: [
        { id: "a", text: "Num arquivo do repositório" },
        { id: "b", text: "Numa variável de ambiente, fora do código" },
        { id: "c", text: "No README" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-pub-03-q3",
      type: "single",
      prompt: "Uma chave foi pro repositório por engano. Apagar o arquivo resolve?",
      concept: "chave vazada",
      skill: "raciocinio",
      hint: "O repositório tem histórico.",
      explanation: "Não: ela continua no histórico. Gera uma chave nova, põe na variável de ambiente e cancela a velha.",
      options: [
        { id: "a", text: "Sim, sumiu" },
        { id: "b", text: "Não — gera uma nova, põe na variável de ambiente e cancela a velha" },
        { id: "c", text: "Só se o repositório for privado" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-pub-03-ex",
    title: "Põe no ar e manda pra alguém",
    statement:
      "Publica o teu app, testa como outra pessoa, e registra o link como prova da trilha.",
    steps: [
      "Confere que nenhuma chave ou senha tá no repositório; se tiver, move pra variável de ambiente.",
      "Publica a partir do repositório.",
      "Abre o link numa aba anônima.",
      "Manda pra alguém abrir no celular e fazer a ação principal.",
      "Registra o link no cartão da prova da trilha.",
    ],
    selfCheck: [
      "Nenhuma chave ou senha tá no repositório",
      "O link abre numa aba anônima",
      "Outra pessoa abriu no celular dela e fez a ação principal",
      "Registrei o link no StudyMaps",
    ],
  },

  checkpoint: {
    id: "ar-pub-03-cp",
    passThreshold: 2,
    successMessage: "🚀 Tá no ar. Tu tirou uma ideia do papel — e tem o link pra provar.",
    questions: [
      {
        id: "ar-pub-03-cp1",
        type: "order",
        prompt: "Coloca o fim da trilha na ordem.",
        concept: "pronto e outra pessoa abrir",
        skill: "compreensao",
        hint: "Registrar a prova é o último.",
        explanation: "Tirar as chaves do código, publicar, testar como outra pessoa, registrar o link.",
        items: [
          { id: "c", text: "Outra pessoa abrir no celular" },
          { id: "a", text: "Tirar chaves e senhas do código" },
          { id: "d", text: "Registrar o link como prova" },
          { id: "b", text: "Publicar a partir do repositório" },
        ],
        correctOrder: ["a", "b", "c", "d"],
      },
      {
        id: "ar-pub-03-cp2",
        type: "boolean",
        prompt: "Abrir o link no meu próprio computador, logado, é um bom teste final.",
        concept: "pronto e outra pessoa abrir",
        skill: "raciocinio",
        hint: "O que teu computador tem que os outros não têm?",
        explanation: "Falso. Teu computador tem login, cache e tua rede. O teste vale numa aba anônima e no celular de outra pessoa.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-pub-03-cp3",
        type: "single",
        prompt: "O que destrava o teu certificado no StudyMaps?",
        concept: "registrar a prova",
        skill: "compreensao",
        hint: "O certificado atesta entrega.",
        explanation: "Concluir as aulas e registrar o link do que tu publicou — o certificado atesta que tu entregou, não que assistiu.",
        options: [
          { id: "a", text: "Só assistir todas as aulas" },
          { id: "b", text: "Concluir as aulas e registrar o link publicado" },
          { id: "c", text: "Pagar uma taxa" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
