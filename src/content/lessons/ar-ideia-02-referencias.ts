import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 1 (Ideia), aula 2.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 */
export const juntaCincoReferencias: Lesson = {
  id: "ar-ideia-02-referencias",
  slug: "junte-cinco-referencias",
  title: "Junta cinco referências",
  pain: {
    quote: "Peço pra IA e sempre sai a mesma cara de site.",
    belief: "Pedir de novo, com mais adjetivo: \"moderno\", \"clean\", \"bonito\".",
    resolve: "Juntar referência antes de abrir a IA.",
    resolveDetail: "Sem referência, a IA te dá a média. Com referência, ela te dá o que tu apontou.",
    after: "Tenho cinco referências e sei o que eu quero de cada uma.",
  },
  summary: "Onde procurar, o que guardar e por que cinco — antes de escrever o primeiro prompt.",
  estimatedMinutes: 20,

  learningObjectives: [
    "Entender por que pedido sem referência sai com cara de média",
    "Achar referências em lugares que tu já usa",
    "Anotar o que tu quer de cada referência, em vez de copiar ela inteira",
  ],

  content: [
    { type: "heading", text: "Duas pastas de referência" },
    {
      type: "example",
      title: "Referência sem anotação × com anotação",
      text: "As duas pastas têm as mesmas cinco imagens. Só uma vira pedido.",
      code: {
        language: "text",
        code: `Pasta A:
- print do Nubank   "curti"
- print do Spotify  "top"
- print do Discord  "bonito"

Pasta B:
- print do Nubank   o roxo forte só no botão principal; o resto é neutro
- print do Spotify  as capas grandes em grade, sem borda
- print do Discord  os personagens; a sensação de "lugar", não de site`,
      },
    },
    {
      type: "paragraph",
      text: "Com a pasta A, a IA não sabe o que pegar de cada uma — e volta pra média. Com a pasta B, cada referência vira uma instrução. **A anotação é o que transforma imagem em pedido.**",
    },

    { type: "heading", text: "Por que antes de abrir a IA" },
    {
      type: "paragraph",
      text: "A IA viu milhões de sites. Se tu não diz qual direção, ela vai pro meio de todos eles — e o meio é genérico. A referência é como tu aponta: “não a média, isso aqui”.",
    },

    { type: "heading", text: "Onde procurar" },
    {
      type: "list",
      items: [
        "**Apps que tu já usa e gosta.** Tira print. Tu já tem gosto — só nunca anotou ele.",
        "**Pinterest** — busca pelo tipo de tela (“app agenda”, “landing page escura”) e salva numa pasta.",
        "**Sites de produtos reais** no mesmo assunto da tua ideia, inclusive concorrentes.",
        "**Fora de tela:** capa de disco, embalagem, pôster. Cor e clima vêm de qualquer lugar.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Por que cinco",
      text: "Uma referência vira cópia. Vinte viram bagunça. Cinco é o bastante pra ter direção sem se perder — e pra cada uma ter um motivo.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Na hora de pedir",
      text: "O Lovable aceita imagem anexada no chat como referência visual — print, mockup, rascunho. Anexa a referência e escreve a anotação junto.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Mandar o print inteiro e escrever “faz igual”. Aí tu não tem uma ideia tua: tem uma cópia pior. Pega um pedaço de cada.",
    },
  ],

  freeResources: [
    {
      kind: "docs",
      title: "Work with Lovable in the project chat",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/features/projects/chat",
      description:
        "Como anexar print, mockup ou rascunho no chat pra ferramenta usar como referência visual.",
      lang: "en",
    },
    {
      kind: "docs",
      title: "How to build a real product with Lovable",
      provider: "Lovable (documentação oficial)",
      url: "https://docs.lovable.dev/tips-tricks/best-practice",
      description: "Inclui o que definir de estilo e de público antes do primeiro pedido.",
      lang: "en",
    },
  ],

  questions: [
    {
      id: "ar-ideia-02-q1",
      type: "single",
      prompt: "Por que um pedido sem referência costuma sair com “a mesma cara de site”?",
      concept: "sem referencia sai a media",
      skill: "compreensao",
      hint: "Pensa no que a IA tem como base quando tu não aponta nada.",
      explanation:
        "Sem direção, a IA vai pro meio de tudo que ela já viu. O meio de milhões de sites é genérico por definição.",
      options: [
        { id: "a", text: "Porque a IA só sabe fazer um tipo de site" },
        { id: "b", text: "Porque sem direção ela entrega a média de tudo que já viu" },
        { id: "c", text: "Porque faltou pagar o plano" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-ideia-02-q2",
      type: "multiple",
      prompt: "Quais anotações de referência viram instrução que a IA consegue usar?",
      concept: "anotar a referencia",
      skill: "aplicacao",
      hint: "Instrução aponta um pedaço da imagem, não um sentimento sobre ela.",
      explanation:
        "“O roxo só no botão principal” e “as capas grandes em grade, sem borda” dizem o que pegar. “Curti” e “top” não dizem nada.",
      options: [
        { id: "a", text: "O roxo forte só no botão principal; o resto neutro" },
        { id: "b", text: "Curti" },
        { id: "c", text: "As capas grandes em grade, sem borda" },
        { id: "d", text: "Top demais" },
      ],
      correctOptionIds: ["a", "c"],
    },
    {
      id: "ar-ideia-02-q3",
      type: "single",
      prompt: "Tu achou um site perfeito. Qual é o melhor jeito de usar ele como referência?",
      concept: "pegar um pedaco de cada",
      skill: "raciocinio",
      hint: "O objetivo é uma coisa tua, não uma cópia.",
      explanation:
        "Pega o pedaço que tu gostou e diz qual é. “Faz igual” te dá uma cópia pior — e tu continua sem uma ideia tua.",
      options: [
        { id: "a", text: "Mandar o print e pedir “faz igual”" },
        { id: "b", text: "Anotar qual pedaço tu quer dele e misturar com as outras referências" },
        { id: "c", text: "Não usar, porque copiar é feio" },
      ],
      correctOptionIds: ["b"],
    },
  ],

  exercise: {
    id: "ar-ideia-02-ex",
    title: "Monta a tua pasta de cinco",
    statement:
      "Junta cinco referências pra primeira versão que tu recortou na aula anterior — e anota o que tu quer de cada uma.",
    steps: [
      "Tira print de pelo menos dois apps que tu já usa e gosta.",
      "Busca mais três: Pinterest, sites reais, ou algo fora de tela.",
      "Embaixo de cada uma, escreve uma linha: o que exatamente tu quer dela.",
      "Confere: nenhuma anotação pode ser “curti”, “top” ou “bonito”.",
    ],
    selfCheck: [
      "Tenho cinco referências numa pasta só",
      "Cada uma tem uma linha dizendo o que eu quero dela",
      "Nenhuma anotação é só um elogio",
      "Não tô copiando nenhuma inteira",
    ],
  },

  checkpoint: {
    id: "ar-ideia-02-cp",
    passThreshold: 2,
    successMessage: "🎯 Agora tu não pede “um site bonito”: tu aponta pra onde é bonito.",
    questions: [
      {
        id: "ar-ideia-02-cp1",
        type: "single",
        prompt: "O que transforma uma imagem de referência num pedido?",
        concept: "anotar a referencia",
        skill: "compreensao",
        hint: "A imagem sozinha não diz o que pegar dela.",
        explanation: "A anotação: a linha que diz qual pedaço da imagem tu quer.",
        options: [
          { id: "a", text: "A resolução da imagem" },
          { id: "b", text: "A anotação dizendo o que pegar dela" },
          { id: "c", text: "Ter muitas imagens" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-ideia-02-cp2",
        type: "boolean",
        prompt: "Quanto mais referência, melhor: vinte é melhor que cinco.",
        concept: "por que cinco",
        skill: "raciocinio",
        hint: "Pensa no que acontece com a direção quando tem referência demais.",
        explanation:
          "Falso. Com vinte, cada uma puxa pra um lado e a direção some. Cinco dá direção e ainda deixa cada uma ter um motivo.",
        options: [
          { id: "v", text: "Verdadeiro" },
          { id: "f", text: "Falso" },
        ],
        correctOptionIds: ["f"],
      },
      {
        id: "ar-ideia-02-cp3",
        type: "single",
        prompt: "Quando é a hora de juntar as referências?",
        concept: "sem referencia sai a media",
        skill: "aplicacao",
        hint: "Pensa em quando a IA decide a cara do resultado.",
        explanation:
          "Antes de abrir a IA. Depois que ela gerou a média, tu vai ficar corrigindo em vez de apontar desde o começo.",
        options: [
          { id: "a", text: "Antes de abrir a IA" },
          { id: "b", text: "Depois do primeiro resultado, pra comparar" },
          { id: "c", text: "Só quando o projeto estiver pronto" },
        ],
        correctOptionIds: ["a"],
      },
    ],
  },

  status: "available",
};
