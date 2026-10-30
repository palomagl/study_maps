import type { Trail } from "@/content/types";
import { draftLesson } from "@/content/draft";
import { fazAVersaoFeia } from "@/content/lessons/ar-julgamento-03-feio";
import { teuChecklist } from "@/content/lessons/ar-julgamento-02-checklist";
import { aFerramentaCerta } from "@/content/lessons/ar-ger-01-ferramenta-certa";
import { usaAIaProPedido } from "@/content/lessons/ar-spec-02-co-autoria";
import { escreveOBriefing } from "@/content/lessons/ar-spec-01-briefing";
import { juntaCincoReferencias } from "@/content/lessons/ar-ideia-02-referencias";
import { recortaAIdeia } from "@/content/lessons/ar-ideia-01-recortar";
import { oQueFazParecerGenerico } from "@/content/lessons/ar-julgamento-01-generico";

/**
 * Trilha 1 — Coloque seu primeiro app no ar.
 *
 * As seis fases são os seis passos do loop que o projeto ensina:
 * ideia e referência → especificação → geração → julgamento → conserto →
 * publicação. As ferramentas (Claude, ChatGPT, Gemini, Lovable, Pinterest,
 * GitHub, Vercel, Render) aparecem como instrumento dentro do passo em que
 * servem, nunca como matéria.
 *
 * Julgamento e Publicação são as fases densas: uma carrega a tese (aprender a
 * enxergar que está ruim), a outra carrega a prova (o link público). Geração é
 * curta de propósito — é a parte que a pessoa já sabe fazer.
 */
export const appNoArTrail: Trail = {
  id: "app-no-ar",
  title: "Coloque seu primeiro app no ar",
  subtitle: "Da ideia ao link público, com IA",
  description:
    "Você chega com uma ideia e sai com um link para mandar para alguém. No caminho aprende o que separa um resultado genérico de um resultado seu: referência antes de gerar, pedido escrito, olho para julgar e conserto dirigido.",
  glowClass: "glow-green",
  colorClass: "text-primary",
  accentHsl: "158 90% 60%",

  certifies: [
    "Recortar uma ideia grande até a primeira versão que já serve para alguém",
    "Juntar referência antes de abrir a IA, em vez de aceitar a média da internet",
    "Escrever uma especificação que não deixa a ferramenta adivinhar",
    "Julgar um resultado gerado e nomear o defeito com precisão",
    "Pedir a correção certa em vez de pedir outra tentativa",
    "Publicar o projeto e deixá-lo com endereço público",
  ],

  phases: [
    {
      id: "ar-p1",
      title: "Ideia e referência",
      description:
        "O que fazer antes de abrir qualquer IA. Sem referência, o resultado é a média da internet — porque foi isso que você pediu.",
      stages: [
        {
          id: "ar-s1",
          title: "Antes de abrir a IA",
          description:
            "Recortar a ideia até ela caber, e juntar o material que vai dizer à ferramenta o que é bom.",
          difficulty: "iniciante",
          lessons: [
            recortaAIdeia,
            juntaCincoReferencias,
          ],
        },
      ],
    },

    {
      id: "ar-p2",
      title: "Especificação",
      description:
        "Dizer o que você quer de verdade. Aqui a IA é co-autora do pedido, não executora ainda.",
      stages: [
        {
          id: "ar-s2",
          title: "Dizer o que você quer",
          description:
            "Transformar a ideia e as referências em um pedido que não deixa a ferramenta adivinhar.",
          difficulty: "iniciante",
          lessons: [
            escreveOBriefing,
            usaAIaProPedido,
          ],
        },
      ],
    },

    {
      id: "ar-p3",
      title: "Geração",
      description:
        "A parte curta. Com briefing e referência na mão, gerar é quase mecânico — e a escolha da ferramenta é o que sobra para decidir.",
      stages: [
        {
          id: "ar-s3",
          title: "Colocar na mão da ferramenta",
          description:
            "Qual ferramenta serve para qual pedaço, e o que entregar para ela junto do pedido.",
          difficulty: "iniciante",
          lessons: [
            aFerramentaCerta,
          ],
        },
      ],
    },

    {
      id: "ar-p4",
      title: "Julgamento",
      description:
        "O passo que ninguém ensina e o mais importante daqui. Olhar o resultado e dizer o que está errado — com nome.",
      stages: [
        {
          id: "ar-s4",
          title: "Aprender a enxergar",
          description:
            "Comparar, nomear o defeito e ter um checklist que você aplica em qualquer coisa que gerar.",
          difficulty: "iniciante",
          evolutionMoment:
            "👀 Agora você enxerga o que está ruim — e consegue dizer por quê.",
          lessons: [
            oQueFazParecerGenerico,
            teuChecklist,
            fazAVersaoFeia,
          ],
        },
      ],
    },

    {
      id: "ar-p5",
      title: "Conserto",
      description:
        "Iteração dirigida. A diferença entre pedir a correção e pedir outra tentativa é a diferença entre avançar e girar.",
      stages: [
        {
          id: "ar-s5",
          title: "Consertar sem recomeçar",
          description:
            "Como descrever o ajuste de forma que a ferramenta não desfaça o que já estava bom.",
          difficulty: "iniciante",
          lessons: [
            draftLesson({
              id: "ar-cons-01-iteracao",
              slug: "peca-a-correcao",
              title: "Pede a correção, não outra tentativa",
              painQuote: "Pedi pra arrumar uma coisa e a IA estragou o que tava bom.",
              summary:
                "Um ajuste por vez, com o defeito nomeado. E quando vale recomeçar de verdade.",
            }),
          ],
        },
      ],
    },

    {
      id: "ar-p6",
      title: "Publicação",
      description:
        "A prova. Repositório, build, link público. É o único pedaço que a IA não resolve sozinha para quem está começando.",
      stages: [
        {
          id: "ar-s6",
          title: "Colocar no ar",
          description:
            "GitHub porque é de lá que o deploy puxa o código; Vercel ou Render conforme o que o seu projeto tem dentro.",
          difficulty: "iniciante",
          evolutionMoment:
            "🚀 Seu projeto existe fora do seu computador. Tem link e dá para mandar.",
          lessons: [
            draftLesson({
              id: "ar-pub-01-github",
              slug: "github-onde-o-projeto-existe",
              title: "GitHub: onde teu projeto passa a existir",
              painQuote: "Meu projeto só existe no meu computador — ou no preview do Lovable.",
              summary:
                "O que é um repositório, o que é um commit e por que o deploy precisa disso.",
            }),
            draftLesson({
              id: "ar-pub-02-vercel-render",
              slug: "vercel-ou-render",
              title: "Vercel ou Render: a decisão",
              painQuote: "Não sei onde colocar meu app no ar e tenho medo de virar conta pra pagar.",
              summary:
                "Tem backend e banco? Render. É só front? Vercel. E o que é um build no meio disso.",
            }),
            draftLesson({
              id: "ar-pub-03-no-ar",
              slug: "no-ar-com-link",
              title: "No ar, com link pra mandar",
              painQuote: "Tá pronto, mas ninguém consegue ver.",
              summary:
                "Variáveis de ambiente, o que nunca vai para o repositório, e o link que você registra como prova.",
            }),
          ],
        },
      ],
    },
  ],

  /**
   * Na trilha de entrega, o "projeto" é o que a própria pessoa vai publicar.
   * Por isso há um só, e ele é a entrega da trilha inteira.
   */
  projects: [
    {
      id: "ar-proj-seu-app",
      title: "O seu app, no ar",
      tagline: "Um link que funciona e você pode mandar para alguém",
      description:
        "A entrega desta trilha não é um exercício: é a sua própria ideia, publicada. Você escolhe o que construir na primeira aula e carrega essa ideia pelas seis fases, até ela ter endereço público.",
      difficulty: "iniciante",
      technologies: ["Lovable", "GitHub", "Vercel ou Render"],
      skills: [
        "Recortar uma ideia até ela caber",
        "Escrever a especificação antes de gerar",
        "Julgar o resultado e nomear o defeito",
        "Publicar e registrar o link",
      ],
      features: [
        "Repositório no GitHub",
        "Build publicado",
        "Link público para compartilhar",
      ],
      unlockedAfterPhaseId: "ar-p1",
    },
  ],
};
