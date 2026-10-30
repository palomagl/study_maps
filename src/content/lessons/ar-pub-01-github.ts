import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 6 (No ar), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Fatos conferidos na documentação oficial em 30/10: conectar o Lovable ao
 * GitHub cria um repositório novo (privado por padrão) e sincroniza nos dois
 * sentidos; a conta do GitHub é grátis; a conexão existe em todos os planos
 * do Lovable. O passo a passo fica na documentação — aqui vai o conceito.
 */
export const githubOndeExiste: Lesson = {
  id: "ar-pub-01-github",
  slug: "github-onde-o-projeto-existe",
  title: "GitHub: onde teu projeto passa a existir",
  pain: {
    quote: "Meu projeto só existe no meu computador — ou no preview do Lovable.",
    belief: "Mandar print do preview pros amigos.",
    resolve: "Um repositório: o lugar de onde o deploy puxa o código.",
    resolveDetail: "Sem repositório, não tem de onde publicar. Com ele, tem — e tem histórico.",
    after: "Meu código tá no GitHub, com histórico de tudo que mudou.",
  },
  summary: "O que é um repositório, o que é um commit e por que o deploy precisa disso.",
  estimatedMinutes: 25,

  learningObjectives: [
    "Entender o que é repositório e commit",
    "Saber por que o deploy precisa de um repositório",
    "Conectar o teu projeto do Lovable ao GitHub",
  ],

  content: [
    { type: "heading", text: "Preview × repositório" },
    {
      type: "example",
      title: "O mesmo projeto, em dois lugares",
      text: "Os dois mostram a tua tela. Só um deixa ela sair dali.",
      code: {
        language: "text",
        code: `Só no preview do Lovable:
- tu vê a tela
- ninguém de fora tem o código
- a Vercel não tem de onde puxar nada

No GitHub:
- o código mora num repositório
- cada mudança vira um commit, com data e descrição
- a Vercel ou a Render puxam dali pra publicar`,
      },
    },
    {
      type: "paragraph",
      text: "O preview é uma janela pro teu projeto, não um endereço. **Pra publicar, o código precisa morar num lugar de onde a publicação puxa** — e esse lugar é o repositório.",
    },

    { type: "heading", text: "As duas palavras que tu precisa" },
    {
      type: "list",
      items: [
        "**Repositório** — a pasta do teu projeto no GitHub: o código, os arquivos, e o histórico de cada mudança.",
        "**Commit** — cada mudança salva no histórico, com data e descrição. É o que deixa tu ver o que mudou e voltar se precisar.",
      ],
    },

    { type: "heading", text: "Conectando o Lovable" },
    {
      type: "paragraph",
      text: "O Lovable conecta direto no GitHub. Quando tu conecta, ele **cria um repositório novo** (privado por padrão) e sincroniza nos dois sentidos: o que muda no Lovable vai pro GitHub, e o que muda no GitHub volta pro Lovable. A conta do GitHub é grátis, e a conexão funciona em todos os planos do Lovable.",
    },
    {
      type: "callout",
      variant: "info",
      title: "O passo a passo tá na documentação",
      text: "As telas das ferramentas mudam o tempo todo, então aqui não vai print. Segue o guia oficial do Lovable de sincronização com o GitHub — ele é atualizado quando a tela muda.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Achar que “tá salvo no Lovable” é o mesmo que “tá num repositório”. Pra Fase 6 inteira, só conta o que tá no GitHub.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "Sync your Lovable project with GitHub",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/integrations/github",
      description: "O passo a passo pra conectar o projeto e criar o repositório.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "About repositories",
      provider: "GitHub Docs",
      url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories",
      description: "O que é um repositório, nas palavras do próprio GitHub.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-pub-01-q1",
      type: "single",
      prompt: "Por que o preview do Lovable não basta pra publicar?",
      concept: "preview nao e endereco",
      skill: "compreensao",
      hint: "De onde a publicação puxa o código?",
      explanation: "Porque o preview é uma janela, não um lugar de onde a Vercel ou a Render consigam puxar o código. Esse lugar é o repositório.",
      options: [
        { id: "a", text: "Porque o preview é feio" },
        { id: "b", text: "Porque a publicação precisa puxar o código de um repositório" },
        { id: "c", text: "Porque o preview só funciona no celular" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-pub-01-q2",
      type: "match",
      prompt: "Liga cada palavra com o que ela é.",
      concept: "repositorio e commit",
      skill: "compreensao",
      hint: "Um é o lugar, o outro é cada mudança.",
      explanation: "Repositório é a pasta do projeto com o histórico; commit é cada mudança salva nesse histórico.",
      left: [
        { id: "l1", text: "Repositório" },
        { id: "l2", text: "Commit" },
      ],
      right: [
        { id: "r1", text: "Cada mudança salva, com data e descrição" },
        { id: "r2", text: "A pasta do projeto no GitHub, com o histórico" },
      ],
      correctPairs: [
        { leftId: "l1", rightId: "r2" },
        { leftId: "l2", rightId: "r1" },
      ],
    },
    {
      id: "ar-pub-01-q3",
      type: "single",
      prompt: "O que acontece quando tu conecta o projeto do Lovable ao GitHub?",
      concept: "sincronizar lovable github",
      skill: "compreensao",
      hint: "A documentação fala em repositório novo e em dois sentidos.",
      explanation: "Ele cria um repositório novo e sincroniza nos dois sentidos: o que muda num lado aparece no outro.",
      options: [
        { id: "a", text: "Ele copia o código uma vez só" },
        { id: "b", text: "Ele cria um repositório novo e sincroniza nos dois sentidos" },
        { id: "c", text: "Ele publica o site automaticamente" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-pub-01-ex",
    title: "Põe teu projeto num repositório",
    statement:
      "Conecta o teu projeto do Lovable ao GitHub seguindo o guia oficial, e confere que o código chegou lá.",
    steps: [
      "Cria tua conta no GitHub, se ainda não tem.",
      "Segue o guia oficial do Lovable pra conectar o projeto.",
      "Abre o repositório no GitHub e vê os arquivos lá.",
      "Faz uma mudança pequena no Lovable e vê o commit novo aparecer no GitHub.",
    ],
    selfCheck: [
      "Tenho conta no GitHub",
      "Meu projeto tá num repositório",
      "Vi o histórico de commits",
      "Uma mudança no Lovable apareceu no GitHub",
    ],
  },

  checkpoint: {
    id: "ar-pub-01-cp",
    passThreshold: 2,
    successMessage: "📦 Teu projeto agora existe fora do teu computador. Falta o endereço.",
    questions: [
      {
        id: "ar-pub-01-cp1",
        type: "boolean",
        prompt: "Pra conectar o Lovable ao GitHub, precisa de plano pago no GitHub.",
        concept: "sincronizar lovable github",
        skill: "compreensao",
        hint: "A documentação do Lovable fala da conta do GitHub.",
        explanation: "Falso. A conta do GitHub é grátis, e a conexão funciona em todos os planos do Lovable.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-pub-01-cp2",
        type: "single",
        prompt: "Por que a aula manda pro guia oficial em vez de ter print do passo a passo?",
        concept: "conceito e documentacao",
        skill: "raciocinio",
        hint: "O que acontece com as telas das ferramentas?",
        explanation: "Porque as telas mudam e print vira mentira. O guia oficial é atualizado quando a tela muda.",
        options: [
          { id: "a", text: "Porque print é proibido" },
          { id: "b", text: "Porque as telas mudam e o guia oficial acompanha" },
          { id: "c", text: "Porque não deu tempo" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-pub-01-cp3",
        type: "single",
        prompt: "Pra que serve o histórico de commits?",
        concept: "repositorio e commit",
        skill: "aplicacao",
        hint: "Cada mudança fica registrada.",
        explanation: "Pra ver o que mudou, quando, e voltar se alguma mudança estragar.",
        options: [
          { id: "a", text: "Pra ver o que mudou e voltar se precisar" },
          { id: "b", text: "Pra contar quantas horas tu trabalhou" },
          { id: "c", text: "Pra publicar mais rápido" },
        ],
        correctOptionIds: ["a"],
      },
    ],
  },

  status: "available",
};
