import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 1 (Ideia), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 */
export const recortaAIdeia: Lesson = {
  id: "ar-ideia-01-recortar",
  slug: "recorte-a-ideia",
  title: "Recorta a ideia até ela caber",
  pain: {
    quote: "Tenho uma ideia gigante — ou difícil demais — e não sei nem por onde começar.",
    belief: "Abrir a IA e pedir tudo de uma vez, pra ver no que dá.",
    resolve: "Separar em pedaços.",
    resolveDetail: "A ideia só parece gigante porque tá inteira na tua cabeça. Separada em pedaços, tu escolhe o primeiro: uma pessoa, uma ação, um resultado.",
    after: "Sei qual é a primeira versão — e ela cabe num fim de semana.",
  },
  summary: "Ideia grande não sai do papel. Como achar a primeira versão que já serve pra alguém.",
  estimatedMinutes: 20,

  // A aula em telas: o que a pessoa faz no celular, conduzida pelo Ideia.
  play: {
    pieces: [
      {
        id: "a-ideia-do-caio",
        title: "A ideia do Caio",
        cards: [
          {
            kind: "fala",
            text: "E aí! Eu sou o Ideia. Meu trabalho é pegar ideia gigante e achar o primeiro pedaço dela. Bora?",
          },
          {
            kind: "dor",
          },
          {
            kind: "fala",
            text: "Olha o Caio. Ele quer um app de rolê com chat, mapa, pagamento e ranking. Tudo junto, de uma vez.",
          },
          {
            kind: "escolha",
            prompt: "Qual é o primeiro passo dele?",
            options: [
              {
                id: "a",
                text: "Abrir a IA e pedir tudo de uma vez, pra ver no que dá",
              },
              {
                id: "b",
                text: "Escolher uma coisa só pra primeira versão",
              },
              {
                id: "c",
                text: "Achar a ferramenta perfeita antes de começar",
              },
            ],
            correctId: "b",
            beliefId: "a",
            right: "Uma coisa só. O resto espera a primeira versão existir.",
            wrong: "Pedindo tudo junto, vem um app genérico, com metade quebrada — e o Caio sem saber onde mexer. O que resolve é separar em pedaços.",
          },
          {
            kind: "fala",
            text: "O segredo é separar em pedaços. A ideia só parece gigante porque tá inteira na tua cabeça.",
          },
          {
            kind: "cortar",
            prompt: "Ajuda o Caio: toca no que fica pra depois. Deixa só o que faz o rolê acontecer.",
            chips: [
              {
                text: "Mandar o link do rolê",
                keep: true,
              },
              {
                text: "Chat",
                keep: false,
              },
              {
                text: "Ver quem confirmou",
                keep: true,
              },
              {
                text: "Mapa",
                keep: false,
              },
              {
                text: "Pagamento",
                keep: false,
              },
              {
                text: "Ranking",
                keep: false,
              },
              {
                text: "Login com Google",
                keep: false,
              },
            ],
            right: "Sobrou: mandar o link e ver quem confirmou. Isso cabe num fim de semana.",
            wrong: "Fica só o que faz o rolê acontecer: mandar o link e ver quem confirmou. O resto é segunda versão.",
          },
          {
            kind: "montar",
            prompt: "A régua é: uma pessoa, uma ação, um resultado. Monta a frase da primeira versão do Caio.",
            answer: [
              "Quem marca o rolê",
              "manda o link",
              "e vê quem confirmou",
            ],
            distractors: [
              "e paga a conta",
              "e conversa no chat",
            ],
            right: "Uma pessoa (quem marca), uma ação (manda o link), um resultado (vê quem confirmou).",
            wrong: "A certa: quem marca o rolê manda o link e vê quem confirmou. Pagar e conversar ficam pra depois.",
          },
          {
            kind: "escrever",
            prompt: "Agora é contigo. Escreve a tua ideia nessa régua. Eu guardo — na próxima aula a gente usa.",
            placeholder: "Quem… faz o quê… e ganha o quê",
            saveAs: "ideia",
          },
        ],
        mission: "Escreve, nas notas do celular, tudo que a tua ideia tem — uma linha por coisa.",
      },
      {
        id: "a-regua",
        title: "A régua do fim de semana",
        cards: [
          {
            kind: "fala",
            text: "Tua ideia tá guardada. Agora a gente testa ela na régua do fim de semana.",
          },
          {
            kind: "escolha",
            prompt: "Login e pagamento são uma boa primeira versão, porque todo app tem?",
            options: [
              {
                id: "s",
                text: "Sim, todo app precisa disso",
              },
              {
                id: "n",
                text: "Não — eles não dizem nada sobre o teu app",
              },
            ],
            correctId: "n",
            right: "Isso. Todo app tem — e por isso mesmo eles não são a tua ideia.",
            wrong: "Todo app tem, e por isso mesmo não dizem nada sobre o teu. Ficam pra depois.",
          },
          {
            kind: "escolha",
            prompt: "A frase da tua primeira versão tem “e também” no meio. Isso quer dizer…",
            options: [
              {
                id: "a",
                text: "Que ela tá completa",
              },
              {
                id: "b",
                text: "Que ainda não recortou — tem mais de uma ação",
              },
              {
                id: "c",
                text: "Que precisa de outra ferramenta",
              },
            ],
            correctId: "b",
            right: "Exato. “E também” é sinal de duas ações. Corta uma.",
            wrong: "“E também” é sinal de que ainda tem mais de uma ação. Corta até sobrar uma.",
          },
          {
            kind: "escolha",
            prompt: "Qual é uma boa primeira versão de “app pra organizar rolê com os amigos”?",
            options: [
              {
                id: "a",
                text: "Chat em grupo, votação de lugar, divisão de conta e mapa",
              },
              {
                id: "b",
                text: "Uma tela onde alguém cria o rolê e manda o link pros amigos",
              },
              {
                id: "c",
                text: "Login, perfil e lista de amigos",
              },
            ],
            correctId: "b",
            beliefId: "a",
            right: "Uma pessoa, uma ação, um resultado. Dá pra ter funcionando no domingo.",
            wrong: "Tudo junto é a ideia inteira, não a primeira versão. A primeira é uma tela: cria o rolê e manda o link.",
          },
          {
            kind: "montar",
            prompt: "Põe o recorte na ordem.",
            answer: [
              "Escreve tudo que a ideia tem",
              "Acha a ação principal",
              "Risca o resto",
              "Mede no fim de semana",
            ],
            distractors: [
              "Escolhe as cores",
            ],
            right: "Lista, ação principal, risca, mede. É o recorte inteiro.",
            wrong: "A ordem: lista tudo, acha a ação principal, risca o resto, mede no fim de semana. Cor fica pra depois.",
          },
          {
            kind: "fala",
            text: "Se não dá pra ter funcionando em dois dias, corta mais. Ideia boa espera — ela não some.",
          },
        ],
        mission: "Pega a tua lista e risca tudo que não é a ação principal. O que sobrar tem que caber num fim de semana.",
      },
    ],
  },

  learningObjectives: [
    "Separar a ideia em pedaços",
    "Achar a coisa principal que a pessoa faz no app",
    "Escolher o pedaço que cabe num fim de semana",
  ],

  content: [
    { type: "heading", text: "A mesma ideia, antes e depois do recorte" },
    {
      type: "example",
      title: "App de academia",
      text: "Repara no tamanho de cada uma. A primeira não tem por onde começar; a segunda tu começa hoje.",
      code: {
        language: "text",
        code: `Antes:
"Um app de academia com treino, dieta, comunidade, loja de suplemento,
ranking entre amigos e personal online."

Depois:
"Uma tela onde o aluno abre, vê o treino de hoje e marca o que fez."`,
      },
    },
    {
      type: "paragraph",
      text: "A segunda não é a ideia menor. É a **primeira versão** da mesma ideia — a que já serve pra alguém de verdade. Treino, dieta e comunidade não somem: eles esperam a primeira versão existir.",
    },

    { type: "heading", text: "Ideia grande é uma lista, não uma coisa" },
    {
      type: "paragraph",
      text: "Quando tu diz “um app de academia”, tu tá falando de seis coisas ao mesmo tempo. Por isso não sabe por onde começar: não existe começo de seis coisas. O primeiro passo é escrever a lista.",
    },
    {
      type: "list",
      ordered: true,
      items: [
        "**Escreve tudo** que a ideia tem, um item por linha. Sem filtrar.",
        "**Responde: quem usa e o que essa pessoa faz na primeira vez que abre?** Uma pessoa, uma ação.",
        "**Risca** tudo que não é essa ação. Dói — é pra doer.",
        "**Mede com a régua do fim de semana:** dá pra ter isso funcionando em dois dias? Se não, corta mais.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Uma pessoa, uma ação, um resultado",
      text: "É a régua da primeira versão. Se a tua frase tem “e também”, ainda não recortou.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Login, pagamento e painel de administrador quase nunca são a primeira versão. São coisas que todo app tem — e por isso mesmo não dizem nada sobre o teu.",
    },
  ],

  video: {
    title: "O que é MVP (produto mínimo viável)? Exemplos práticos",
    provider: "YouTube",
    channel: "Gabriel Valle",
    url: "https://www.youtube.com/watch?v=i6nWH7STrb4",
    description: "O que é a primeira versão que já serve pra alguém — com exemplos de empresa de verdade.",
    lang: "pt-BR",
  },

  freeResources: [
    {
      kind: "docs",
      title: "How to build a real product with Lovable",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/tips-tricks/best-practice",
      description:
        "O guia da própria ferramenta: primeira versão pequena — uma pessoa, uma ação, um resultado — e as perguntas pra fazer antes do primeiro prompt.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-ideia-01-q1",
      type: "single",
      prompt: "Por que “um app de academia completo” não tem por onde começar?",
      concept: "ideia grande e uma lista",
      skill: "compreensao",
      hint: "Conta quantas coisas diferentes cabem nessa frase.",
      explanation:
        "Porque não é uma coisa: é uma lista de seis. Não existe começo de seis coisas ao mesmo tempo — por isso o primeiro passo é escrever a lista e escolher uma.",
      options: [
        { id: "a", text: "Porque app de academia é difícil de fazer com IA" },
        { id: "b", text: "Porque a frase esconde várias coisas diferentes ao mesmo tempo" },
        { id: "c", text: "Porque falta escolher as cores antes" },
        { id: "d", text: "Porque precisa de um programador" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-ideia-01-q2",
      type: "single",
      prompt: "Qual dessas é uma boa primeira versão de “um app pra organizar rolê com os amigos”?",
      concept: "uma pessoa uma acao",
      skill: "aplicacao",
      hint: "Procura a que tem uma pessoa e uma ação só.",
      explanation:
        "Uma tela onde alguém cria o rolê e manda o link resolve uma ação de uma pessoa. As outras juntam várias coisas — e voltam a ser a ideia gigante.",
      options: [
        { id: "a", text: "Chat em grupo, votação de lugar, divisão de conta e mapa" },
        { id: "b", text: "Uma tela onde alguém cria o rolê com data e lugar e manda o link pros amigos" },
        { id: "c", text: "Um app com login, perfil e lista de amigos" },
        { id: "d", text: "Um painel com estatística de todos os rolês do ano" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-ideia-01-q3",
      type: "order",
      prompt: "Coloca os passos do recorte na ordem.",
      concept: "passos do recorte",
      skill: "compreensao",
      hint: "Primeiro tu precisa ver tudo, por último tu mede.",
      explanation:
        "Primeiro a lista inteira, depois a pergunta de quem usa e o que faz, depois cortar o que não é essa ação, e por último medir com a régua do fim de semana.",
      // Listados fora de ordem: a lista começa nesta ordem na tela.
      items: [
        { id: "i3", text: "Riscar o que não é essa ação" },
        { id: "i1", text: "Escrever tudo que a ideia tem" },
        { id: "i4", text: "Medir com a régua do fim de semana" },
        { id: "i2", text: "Responder quem usa e o que faz na primeira vez" },
      ],
      correctOrder: ["i1", "i2", "i3", "i4"],
    },
  ],

  exercise: {
    id: "ar-ideia-01-ex",
    title: "Recorta a tua ideia",
    statement:
      "Pega a ideia que tu quer tirar do papel — a tua mesmo — e faz o recorte inteiro. É a ideia que tu vai carregar pela trilha toda, até ela ter link.",
    steps: [
      "Escreve a ideia numa frase, do jeito que ela tá na tua cabeça.",
      "Lista tudo que ela tem, um item por linha.",
      "Responde: quem usa e o que essa pessoa faz na primeira vez que abre?",
      "Risca tudo que não é essa ação.",
      "Escreve a primeira versão numa frase só, sem “e também”.",
    ],
    starter: {
      language: "text",
      code: `Minha ideia: ______________________________

Tudo que ela tem:
-
-
-

Quem usa: ____________  O que faz na primeira vez: ____________

Primeira versão (uma frase, sem "e também"):
______________________________________________`,
    },
    hints: ["Se a primeira versão precisa de login pra fazer sentido, provavelmente ainda dá pra cortar."],
    selfCheck: [
      "Escrevi a lista inteira, sem filtrar",
      "Sei quem usa e qual a ação principal",
      "A primeira versão cabe numa frase sem “e também”",
      "Dá pra ter ela funcionando num fim de semana",
    ],
  },

  checkpoint: {
    id: "ar-ideia-01-cp",
    passThreshold: 2,
    successMessage: "✂️ Tua ideia agora tem começo. É ela que tu vai carregar até o link.",
    questions: [
      {
        id: "ar-ideia-01-cp1",
        type: "boolean",
        prompt: "Login e pagamento costumam ser uma boa primeira versão, porque todo app tem.",
        concept: "o que nao e primeira versao",
        skill: "raciocinio",
        hint: "Pensa no que essas coisas dizem sobre o teu app em particular.",
        explanation:
          "Falso. Justamente porque todo app tem, login e pagamento não dizem nada sobre o teu. A primeira versão é a ação que só o teu app faz.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-ideia-01-cp2",
        type: "single",
        prompt: "A frase da tua primeira versão tem “e também” no meio. O que isso indica?",
        concept: "uma pessoa uma acao",
        skill: "aplicacao",
        hint: "Quantas ações cabem numa frase com “e também”?",
        explanation:
          "Que ainda tem mais de uma ação ali dentro. Corta até a frase ter uma pessoa, uma ação e um resultado.",
        options: [
          { id: "a", text: "Que a ideia tá completa e pronta" },
          { id: "b", text: "Que ainda não recortou — tem mais de uma ação" },
          { id: "c", text: "Que precisa de outra ferramenta" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-ideia-01-cp3",
        type: "single",
        prompt: "Pra que serve a régua do fim de semana?",
        concept: "regua do fim de semana",
        skill: "compreensao",
        hint: "É uma medida de tamanho, não de prazo.",
        explanation:
          "Pra medir se a primeira versão é pequena o bastante pra existir logo. Se não cabe em dois dias, ainda é a ideia grande disfarçada.",
        options: [
          { id: "a", text: "Pra marcar a data de lançamento" },
          { id: "b", text: "Pra medir se a primeira versão é pequena o bastante" },
          { id: "c", text: "Pra saber quantas horas estudar" },
        ],
        correctOptionIds: ["b"],
      },
    ],
  },

  status: "available",
};
