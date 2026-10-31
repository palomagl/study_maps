import type { Lesson } from "@/content/types";

/**
 * Trilha "Coloque seu primeiro app no ar" — Fase 4 (Julgamento), aula 2.
 * Molde: ar-julgamento-01-generico.ts. Tratamento em "tu".
 */
export const teuChecklist: Lesson = {
  id: "ar-jul-02-checklist",
  slug: "seu-checklist-de-julgamento",
  title: "Teu checklist de julgamento",
  pain: {
    quote: "Toda vez eu aceito o primeiro resultado que vem.",
    belief: "Confiar que, se a IA fez, tá bom.",
    resolve: "Seis perguntas que tu faz a qualquer tela antes de aceitar.",
    resolveDetail: "Aceitar não é decidir. O checklist é o que transforma “tá ok” em decisão.",
    after: "Passo qualquer resultado no checklist antes de dizer 'tá bom'.",
  },
  summary: "Seis perguntas que tu faz a qualquer tela antes de aceitar o que a IA entregou.",
  estimatedMinutes: 20,

  learningObjectives: [
    "Ter seis perguntas fixas pra julgar qualquer tela",
    "Passar um resultado no checklist em dois minutos",
    "Virar cada “não” num defeito com nome",
  ],

  content: [
    { type: "heading", text: "O checklist passando numa tela" },
    {
      type: "example",
      title: "A seção inicial genérica, julgada",
      text: "A mesma tela preguiçosa da aula anterior. Cada pergunta acha um defeito — com nome.",
      code: {
        language: "text",
        code: `1. Pra onde o olho vai primeiro?          → lugar nenhum: tudo pesa igual
2. Qual é a UMA ação?                      → três botões iguais: nenhuma
3. O texto diz o que é isso?               → "soluções inovadoras": serve pra qualquer um
4. O espaço separa o que é diferente?      → não: tudo colado
5. Quantas cores competem?                 → duas, ok
6. No celular, ainda funciona?             → título quebra em quatro linhas

Defeitos: 1, 2, 3, 4 e 6. Aceitar isso não era decidir — era desistir.`,
      },
    },

    { type: "heading", text: "As seis perguntas" },
    {
      type: "list",
      ordered: true,
      items: [
        "**Pra onde o olho vai primeiro?** E devia ir pra lá? (o teste do olho semicerrado)",
        "**Qual é a uma ação?** Se tem três botões iguais, não tem nenhuma.",
        "**O texto diz o que é isso — ou serve pra qualquer um?** Troca o nome da empresa: se o texto continua valendo, é genérico.",
        "**O espaço separa o que é diferente?** Coisas diferentes, longe; coisas do mesmo grupo, perto.",
        "**Quantas cores competem?** Uma cor forte guardada pra ação principal.",
        "**No celular, ainda funciona?** A maioria vai abrir no celular primeiro.",
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "O truque da pergunta 3",
      text: "Troca o nome do teu produto por qualquer outro. Se o texto continua fazendo sentido, ele não tá falando do teu — tá falando de qualquer coisa.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A armadilha",
      text: "Passar o checklist e aceitar mesmo assim, “porque tá quase bom”. Cada “não” vira um defeito com nome — e defeito com nome a IA conserta em segundos.",
    },
  ],

  freeResources: [
    {
      kind: "article",
      title: "5 Principles of Visual Design in UX",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/articles/principles-visual-design/",
      description: "Escala, hierarquia, contraste e agrupamento — o que está por trás das perguntas 1, 4 e 5.",
      lang: "en",
    },
    {
      kind: "video",
      title: "Squint Test",
      provider: "Nielsen Norman Group",
      url: "https://www.nngroup.com/videos/squint-test/",
      description: "A pergunta 1, demonstrada numa tela de verdade.",
      lang: "en",
      durationLabel: "4 min",
    },
  ],

  questions: [
    {
      id: "ar-jul-02-q1",
      type: "judge",
      prompt:
        "Duas versões do mesmo card de produto. Passa o checklist nas duas: qual tá melhor, e o que tá errado na outra?",
      concept: "checklist de julgamento",
      skill: "raciocinio",
      hint: "Começa pela pergunta 2: qual é a uma ação em cada uma?",
      explanation:
        "A Versão B tem uma ação só e diz o que o produto é. A Versão A põe três botões iguais e um texto que serviria pra qualquer coisa — falha nas perguntas 2 e 3.",
      left: {
        label: "Versão A",
        body: `Fone Bluetooth
Qualidade e tecnologia para o seu dia a dia

[ Comprar ] [ Favoritar ] [ Compartilhar ]`,
      },
      right: {
        label: "Versão B",
        body: `Fone que não cai na corrida
30 h de bateria · à prova de suor

[ Comprar ]          ♡  ↗`,
      },
      better: "right",
      defects: [
        { id: "d1", text: "Três ações com o mesmo peso — nenhuma é a principal" },
        { id: "d2", text: "O texto serviria pra qualquer produto" },
        { id: "d3", text: "O nome do produto é curto demais" },
      ],
      correctDefectIds: ["d1", "d2"],
    },
    {
      id: "ar-jul-02-q2",
      type: "single",
      prompt: "O truque de trocar o nome do produto serve pra checar qual pergunta?",
      concept: "texto generico",
      skill: "compreensao",
      hint: "Se o texto continua valendo pra qualquer nome…",
      explanation:
        "A 3: se o texto continua fazendo sentido com qualquer nome, ele não diz o que o teu produto é.",
      options: [
        { id: "a", text: "Pra onde o olho vai primeiro" },
        { id: "b", text: "Se o texto diz o que é isso ou serve pra qualquer um" },
        { id: "c", text: "Se funciona no celular" },
      ],
      correctOptionIds: ["b"],
    },
    {
      id: "ar-jul-02-q3",
      type: "multiple",
      prompt: "Quais dessas fazem parte do checklist de seis perguntas?",
      concept: "checklist de julgamento",
      skill: "compreensao",
      hint: "São sobre o que a tela mostra, não sobre a tua opinião dela.",
      explanation:
        "Olho, ação, texto, espaço, cor e celular. “Ficou bonito?” não tá no checklist: é sentimento, não pergunta.",
      options: [
        { id: "a", text: "Qual é a uma ação?" },
        { id: "b", text: "Ficou bonito?" },
        { id: "c", text: "No celular, ainda funciona?" },
        { id: "d", text: "Quantas cores competem?" },
      ],
      correctOptionIds: ["a", "c", "d"],
    },
  ],

  exercise: {
    id: "ar-jul-02-ex",
    title: "Passa o checklist na tua primeira tela",
    statement:
      "Pega a primeira tela que tu gerou na Fase 3 e passa as seis perguntas. Cada “não” vira um defeito com nome.",
    starter: {
      language: "text",
      code: `1. Olho vai primeiro pra:          ______  Devia? ___
2. A uma ação é:                   ______
3. Troca o nome — o texto vale?    ______
4. O espaço separa o diferente?    ______
5. Quantas cores competem?         ______
6. No celular funciona?            ______

Defeitos com nome:
- `,
    },
    selfCheck: [
      "Respondi as seis perguntas na minha tela",
      "Abri a tela no celular de verdade",
      "Cada “não” virou um defeito com nome",
      "Não aceitei a tela só porque tava quase bom",
    ],
  },

  checkpoint: {
    id: "ar-jul-02-cp",
    passThreshold: 2,
    successMessage: "✅ “Tá bom” agora é uma decisão, não um cansaço.",
    questions: [
      {
        id: "ar-jul-02-cp1",
        type: "judge",
        prompt: "Duas telas de login. Qual passa melhor no checklist, e o que falha na outra?",
        concept: "checklist de julgamento",
        skill: "raciocinio",
        hint: "Olha a pergunta 2 e a 5.",
        explanation:
          "A Versão A tem uma ação principal clara e uma cor só pra ela. A Versão B pinta os três botões com cores fortes diferentes — nenhum se destaca, e as cores brigam.",
        left: {
          label: "Versão A",
          body: `Entra pra ver teus rolês

[ e-mail          ]
[ senha           ]
[   ENTRAR   ]   (único botão colorido)
esqueci a senha`,
        },
        right: {
          label: "Versão B",
          body: `Login

[ e-mail          ]
[ senha           ]
[ ENTRAR ] (verde)  [ CADASTRAR ] (laranja)  [ GOOGLE ] (azul)`,
        },
        better: "left",
        defects: [
          { id: "d1", text: "Três botões com cor forte brigando" },
          { id: "d2", text: "Nenhuma ação se destaca como a principal" },
          { id: "d3", text: "Tem campo de senha" },
        ],
        correctDefectIds: ["d1", "d2"],
      },
      {
        id: "ar-jul-02-cp2",
        type: "single",
        prompt: "Tu passou o checklist e deu três “não”. O que fazer com eles?",
        concept: "defeito com nome",
        skill: "aplicacao",
        hint: "O que a IA consegue consertar?",
        explanation: "Transformar cada um num defeito com nome e pedir o conserto. Defeito com nome a IA arruma em segundos.",
        options: [
          { id: "a", text: "Aceitar, porque tá quase bom" },
          { id: "b", text: "Transformar cada “não” num defeito com nome e pedir o conserto" },
          { id: "c", text: "Gerar tudo de novo do zero" },
        ],
        correctOptionIds: ["b"],
      },
      {
        id: "ar-jul-02-cp3",
        type: "single",
        prompt: "Por que a pergunta 6 (celular) tá no checklist?",
        concept: "checklist de julgamento",
        skill: "compreensao",
        hint: "Onde a maioria das pessoas vai abrir o teu link?",
        explanation: "Porque a maioria vai abrir no celular primeiro. Uma tela que só funciona no computador falha com quase todo mundo.",
        options: [
          { id: "a", text: "Porque a maioria vai abrir no celular primeiro" },
          { id: "b", text: "Porque a IA só funciona no celular" },
          { id: "c", text: "Porque celular é mais bonito" },
        ],
        correctOptionIds: ["a"],
      },
    ],
  },

  status: "available",
};
