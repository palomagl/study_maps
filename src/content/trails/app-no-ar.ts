import type { Trail } from "@/content/types";
import { draftLesson } from "@/content/draft";
import { noArComLink } from "@/content/lessons/ar-pub-03-no-ar";
import { vercelOuRender } from "@/content/lessons/ar-pub-02-vercel-render";
import { githubOndeExiste } from "@/content/lessons/ar-pub-01-github";
import { gitNoTerminal } from "@/content/lessons/ar-pub-git-comandos";
import { pedeACorrecao } from "@/content/lessons/ar-conserto-01-iteracao";
import { fazAVersaoFeia } from "@/content/lessons/ar-julgamento-03-feio";
import { teuChecklist } from "@/content/lessons/ar-julgamento-02-checklist";
import { aFerramentaCerta } from "@/content/lessons/ar-ger-01-ferramenta-certa";
import { usaAIaProPedido } from "@/content/lessons/ar-spec-02-co-autoria";
import { escreveOBriefing } from "@/content/lessons/ar-spec-01-briefing";
import { juntaCincoReferencias } from "@/content/lessons/ar-ideia-02-referencias";
import { recortaAIdeia } from "@/content/lessons/ar-ideia-01-recortar";
import { oQueFazParecerGenerico } from "@/content/lessons/ar-julgamento-01-generico";

/**
 * Trilha 1 — Coloca teu primeiro app no ar.
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
  title: "Coloca teu primeiro app no ar",
  subtitle: "Da ideia ao link público, com IA",
  description:
    "Tu chega com uma ideia e sai com um link pra mandar pra alguém. No caminho aprende o que separa um resultado genérico de um resultado teu: referência antes de gerar, pedido escrito, olho pra julgar e conserto dirigido.",
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
        "O que fazer antes de abrir qualquer IA. Sem referência, o resultado é a média da internet — porque foi isso que tu pediu.",
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
        "Dizer o que tu quer de verdade. Aqui a IA é co-autora do pedido, não executora ainda.",
      stages: [
        {
          id: "ar-s2",
          title: "Dizer o que tu quer",
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
            "Comparar, nomear o defeito e ter um checklist que tu aplica em qualquer coisa que gerar.",
          difficulty: "iniciante",
          evolutionMoment:
            "👀 Agora tu enxerga o que tá ruim — e consegue dizer por quê.",
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
            pedeACorrecao,
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
            "GitHub porque é de lá que o deploy puxa o código; Vercel ou Render conforme o que o teu projeto tem dentro.",
          difficulty: "iniciante",
          evolutionMoment:
            "🚀 Teu projeto existe fora do teu computador. Tem link e dá pra mandar.",
          lessons: [
            githubOndeExiste,
            gitNoTerminal,
            vercelOuRender,
            noArComLink,
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
      title: "O teu app, no ar",
      tagline: "Um link que funciona e tu pode mandar pra alguém",
      description:
        "A entrega desta trilha não é um exercício: é a tua própria ideia, publicada. Tu escolhe o que construir na primeira aula e carrega essa ideia pelas seis fases, até ela ter endereço público.",
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
