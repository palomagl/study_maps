import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 6 (No ar), aula 1.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 *
 * Revisão da autora: menos Lovable. O código chega no GitHub por três
 * caminhos, conforme onde a pessoa construiu (aula 3.1). Fatos conferidos na
 * documentação oficial em 30/10: a conta do GitHub é grátis; dá pra subir
 * arquivo pelo site do GitHub; conectar o Lovable ao GitHub cria um
 * repositório novo e sincroniza nos dois sentidos. O passo a passo fica na
 * documentação — aqui vai o conceito.
 */
export const githubOndeExiste: Lesson = {
  id: "ar-pub-01-github",
  slug: "github-onde-o-projeto-existe",
  title: "GitHub: onde teu projeto passa a existir",
  pain: {
    quote: "Meu projeto só existe no meu computador — ou dentro da ferramenta onde eu fiz.",
    belief: "Mandar print do preview pros amigos.",
    resolve: "Um repositório: o lugar de onde o deploy puxa o código.",
    resolveDetail: "Sem repositório, não tem de onde publicar. Com ele, tem — e tem histórico.",
    after: "Meu código tá no GitHub, com histórico de tudo que mudou.",
  },
  summary: "O que é um repositório, o que é um commit, e como teu código chega no GitHub.",
  estimatedMinutes: 25,

  learningObjectives: [
    "Entender o que é repositório e commit",
    "Saber por que publicar precisa de um repositório",
    "Pôr teu projeto no GitHub, venha de onde vier",
  ],

  content: [
    { type: "heading", text: "Preview × repositório" },
    {
      type: "example",
      title: "O mesmo projeto, em dois lugares",
      text: "Os dois mostram a tua tela. Só um deixa ela sair dali.",
      code: {
        language: "text",
        code: `Só na ferramenta onde tu fez:
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

    { type: "heading", text: "Como teu código chega lá" },
    {
      type: "paragraph",
      text: "Depende de onde tu construiu na Fase 3. A conta do GitHub é grátis nos três casos.",
    },
    {
      type: "list",
      items: [
        "**Num agente de código (Cursor, Claude Code, Codex):** o projeto já tá em arquivos. Cria o repositório no site do GitHub e pede pro agente fazer o commit e mandar o projeto pra lá.",
        "**Num construtor no navegador:** a maioria conecta direto no GitHub. No Lovable, por exemplo, conectar cria um repositório novo e sincroniza nos dois sentidos.",
        "**Numa conversa ou num artifact do Claude:** copia o código pra arquivos, cria o repositório no site do GitHub e sobe os arquivos por lá mesmo.",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "O passo a passo tá na documentação",
      text: "As telas das ferramentas mudam o tempo todo, então aqui não vai print. Segue o guia oficial do teu caminho — ele é atualizado quando a tela muda.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Achar que “tá salvo na ferramenta” é o mesmo que “tá num repositório”. Pra Fase 6 inteira, só conta o que tá no GitHub.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "About repositories",
      provider: "GitHub Docs",
      url: "https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories",
      description: "O que é um repositório, nas palavras do próprio GitHub.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Adding a file to a repository",
      provider: "GitHub Docs",
      url: "https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository",
      description: "Como subir arquivos pelo site do GitHub, sem instalar nada.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "Sync your Lovable project with GitHub",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/integrations/github",
      description: "Se tu construiu no Lovable: como conectar o projeto e criar o repositório.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-pub-01-q1",
      type: "single",
      prompt: "Por que o preview da ferramenta não basta pra publicar?",
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
      prompt: "Tu fez a tela num artifact do Claude. Como o código chega no GitHub?",
      concept: "codigo ate o github",
      skill: "aplicacao",
      hint: "O site do GitHub aceita arquivo.",
      explanation: "Copia o código pra arquivos, cria o repositório no site do GitHub e sobe os arquivos por lá.",
      options: [
        { id: "a", text: "Não chega — tem que refazer em outra ferramenta" },
        { id: "b", text: "Cria o repositório no site do GitHub e sobe os arquivos por lá" },
        { id: "c", text: "O GitHub puxa sozinho da conversa" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-pub-01-ex",
    title: "Põe teu projeto num repositório",
    statement:
      "Põe o teu projeto num repositório do GitHub pelo caminho que combina com onde tu construiu, e confere que o código chegou lá.",
    steps: [
      "Cria tua conta no GitHub, se ainda não tem.",
      "Escolhe o caminho: agente de código manda do teu computador; construtor conecta direto; código de conversa tu sobe pelo site.",
      "Abre o repositório no GitHub e vê os arquivos lá.",
      "Faz uma mudança pequena e vê o commit novo aparecer.",
    ],
    selfCheck: [
      "Tenho conta no GitHub",
      "Meu projeto tá num repositório",
      "Vi o histórico de commits",
      "Uma mudança minha apareceu como commit novo",
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
        prompt: "Pra ter um repositório no GitHub, precisa de plano pago.",
        concept: "codigo ate o github",
        skill: "compreensao",
        hint: "A conta do GitHub custa quanto?",
        explanation: "Falso. A conta do GitHub é grátis, e dá pra ter repositório nela.",
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
