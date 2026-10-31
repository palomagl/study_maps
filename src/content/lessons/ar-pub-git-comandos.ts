import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 6 (No ar), entre a 6.1 e a
 * 6.2. Pedido da autora: ensinar Git e os comandos do dia a dia, falando de
 * sair da bolha — todo mundo fica no básico, e tu pode ir além.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Comandos conferidos no "About Git" do GitHub Docs em 30/10: clone, status,
 * add, commit, push e pull fazem o que a aula diz. O Pro Git tem tradução
 * oficial em português (git-scm.com/book/pt-br/v2), com a instalação na 1.5.
 */
export const gitNoTerminal: Lesson = {
  id: "ar-pub-git-comandos",
  slug: "git-no-terminal",
  title: "Git no terminal: sair da bolha",
  pain: {
    quote: "Abri o terminal e travei: não sei nem o que digitar.",
    belief: "Fechar o terminal e voltar pro botão — todo mundo só faz o básico mesmo.",
    resolve: "Seis comandos e um ciclo: muda, confere, salva, manda.",
    resolveDetail: "Não precisa decorar o Git inteiro. Seis comandos cobrem quase tudo que tu vai fazer.",
    after: "Salvo e mando meu código pelo terminal — e sei o que cada comando faz.",
  },
  summary: "O que é Git, os seis comandos do dia a dia, e por que saber isso te tira da bolha.",
  estimatedMinutes: 30,

  learningObjectives: [
    "Saber a diferença entre Git e GitHub",
    "Usar os seis comandos do dia a dia",
    "Fazer o ciclo: muda, confere, salva, manda",
  ],

  content: [
    { type: "heading", text: "A bolha do botão" },
    {
      type: "paragraph",
      text: "Quase todo mundo que constrói com IA fica no botão: a ferramenta faz tudo, e quando alguma coisa quebra, a pessoa trava e espera. É o básico — e é onde a maioria para.",
    },
    {
      type: "paragraph",
      text: "Tu não precisa parar ali. **Saber o que acontece por baixo do botão é o que separa quem usa de quem entende.** E pra isso não precisa virar programador: seis comandos já te tiram da bolha.",
    },

    { type: "heading", text: "Git e GitHub não são a mesma coisa" },
    {
      type: "list",
      items: [
        "**Git** — o programa que guarda o histórico do teu projeto, no teu computador. Cada commit da aula anterior é o Git trabalhando.",
        "**GitHub** — o site onde o repositório mora online. É de lá que a Vercel e a Render puxam o código.",
      ],
    },
    {
      type: "paragraph",
      text: "O Git cuida do histórico; o GitHub guarda uma cópia online. Os comandos abaixo fazem os dois conversarem.",
    },

    { type: "heading", text: "Os seis comandos" },
    {
      type: "example",
      title: "O que cada um faz",
      text: "Tu digita no terminal, dentro da pasta do projeto.",
      code: {
        language: "bash",
        code: `git clone <link>      # baixa o projeto do GitHub pro teu computador (uma vez só)
git status            # mostra o que mudou desde o último commit
git add .             # separa todas as mudanças pra salvar
git commit -m "..."   # salva no histórico, com uma descrição
git push              # manda teus commits pro GitHub
git pull              # puxa o que mudou lá no GitHub`,
      },
    },

    { type: "heading", text: "O ciclo de todo dia" },
    {
      type: "example",
      title: "Mudou o botão de confirmar? É assim que sobe",
      text: "Muda, confere, salva, manda. Sempre nessa ordem.",
      code: {
        language: "bash",
        code: `git status
# modified: src/BotaoConfirmar.tsx   ← o Git viu a mudança

git add .
git commit -m "aumenta o botão de confirmar no celular"
git push
# → o commit aparece no GitHub, e a Vercel publica a versão nova`,
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "Descrição de commit que ajuda",
      text: "“update” não diz nada. “aumenta o botão de confirmar no celular” diz o quê e onde — daqui a um mês, é isso que te salva quando tu precisar voltar.",
    },
    {
      type: "callout",
      variant: "info",
      title: "O erro mais comum",
      text: "O push foi recusado? Quase sempre é porque mudou alguma coisa no GitHub que tu não tem no computador. Roda git pull primeiro, depois git push de novo.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Usa o agente como professor",
      text: "Se tu constrói com Claude Code, Codex ou Cursor, eles rodam comandos de Git o tempo todo. Pergunta “o que esse comando fez?” — cada resposta é uma aula de graça.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Dois comandos pra nunca rodar sem entender",
      text: "git reset --hard e git push --force podem apagar trabalho de verdade. Se uma IA ou um tutorial mandar rodar um deles, para e pergunta antes o que vai acontecer.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "Pro Git — Primeiros Passos",
      provider: "Git (livro oficial, traduzido)",
      url: "https://git-scm.com/book/pt-br/v2",
      description: "O livro oficial do Git, em português e de graça. A seção 1.5 mostra como instalar.",
      lang: "pt-BR",
    },
    {
      kind: "docs",
      title: "About Git",
      provider: "GitHub Docs",
      url: "https://docs.github.com/en/get-started/using-git/about-git",
      description: "O que é Git e os comandos básicos, nas palavras do GitHub.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-pub-git-q1",
      type: "single",
      prompt: "Qual é a diferença entre Git e GitHub?",
      concept: "git e github",
      skill: "compreensao",
      hint: "Um mora no teu computador, o outro na internet.",
      explanation: "O Git guarda o histórico no teu computador; o GitHub é o site onde o repositório mora online.",
      options: [
        { id: "a", text: "São a mesma coisa com nomes diferentes" },
        { id: "b", text: "Git guarda o histórico no computador; GitHub guarda o repositório online" },
        { id: "c", text: "Git é pago e GitHub é grátis" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-pub-git-q2",
      type: "match",
      prompt: "Liga cada comando com o que ele faz.",
      concept: "seis comandos",
      skill: "compreensao",
      hint: "Um mostra, um salva, um manda.",
      explanation: "status mostra o que mudou; commit salva no histórico; push manda pro GitHub.",
      left: [
        { id: "l1", text: "git status" },
        { id: "l2", text: "git commit" },
        { id: "l3", text: "git push" },
      ],
      right: [
        { id: "r1", text: "Manda teus commits pro GitHub" },
        { id: "r2", text: "Mostra o que mudou" },
        { id: "r3", text: "Salva no histórico, com descrição" },
      ],
      correctPairs: [
        { leftId: "l1", rightId: "r2" },
        { leftId: "l2", rightId: "r3" },
        { leftId: "l3", rightId: "r1" },
      ],
    },
    {
      id: "ar-pub-git-q3",
      type: "single",
      prompt: "O git push foi recusado. O que tu faz primeiro?",
      concept: "push recusado",
      skill: "aplicacao",
      hint: "O GitHub tem alguma coisa que teu computador não tem.",
      explanation: "git pull, pra trazer o que mudou no GitHub — depois git push de novo.",
      options: [
        { id: "a", text: "git push --force" },
        { id: "b", text: "git pull, e depois git push de novo" },
        { id: "c", text: "Apagar a pasta e começar do zero" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-pub-git-ex",
    title: "Faz o ciclo pelo terminal",
    statement:
      "Baixa o teu repositório, muda uma coisa pequena e sobe de volta só com comandos — sem botão.",
    steps: [
      "Instala o Git, se ainda não tem (a seção 1.5 do Pro Git mostra como).",
      "Roda git clone com o link do teu repositório.",
      "Muda uma coisa pequena: um texto, uma cor.",
      "Roda git status e vê o Git achar a mudança.",
      "Roda git add, git commit com uma descrição que diz o quê e onde, e git push.",
      "Abre o GitHub e vê o teu commit lá.",
    ],
    selfCheck: [
      "Sei a diferença entre Git e GitHub",
      "Fiz o ciclo inteiro pelo terminal",
      "Minha descrição de commit diz o quê e onde",
      "Vi meu commit aparecer no GitHub",
    ],
  },

  checkpoint: {
    id: "ar-pub-git-cp",
    passThreshold: 2,
    successMessage: "💻 Tu saiu da bolha do botão. Agora tu sabe o que acontece por baixo.",
    questions: [
      {
        id: "ar-pub-git-cp1",
        type: "order",
        prompt: "Coloca o ciclo de todo dia na ordem.",
        concept: "ciclo do git",
        skill: "aplicacao",
        hint: "Muda, confere, salva, manda.",
        explanation: "Conferir com status, separar com add, salvar com commit, mandar com push.",
        items: [
          { id: "c", text: "git commit -m \"...\"" },
          { id: "a", text: "git status" },
          { id: "d", text: "git push" },
          { id: "b", text: "git add ." },
        ],
        correctOrder: ["a", "b", "c", "d"],
      },
      {
        id: "ar-pub-git-cp2",
        type: "single",
        prompt: "Qual dessas descrições de commit ajuda mais daqui a um mês?",
        concept: "descricao de commit",
        skill: "raciocinio",
        hint: "Qual diz o quê e onde?",
        explanation: "A que diz o que mudou e onde. “update” e “mudanças” não dizem nada.",
        options: [
          { id: "a", text: "update" },
          { id: "b", text: "aumenta o botão de confirmar no celular" },
          { id: "c", text: "mudanças" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-pub-git-cp3",
        type: "boolean",
        prompt: "Se uma IA mandar rodar git push --force, é só rodar.",
        concept: "comando perigoso",
        skill: "raciocinio",
        hint: "O que esse comando pode fazer com o trabalho que tá no GitHub?",
        explanation: "Falso. Ele pode apagar trabalho de verdade. Antes de rodar, pergunta o que vai acontecer.",
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
