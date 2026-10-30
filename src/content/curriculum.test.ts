import { describe, expect, it } from "vitest";
import {
  LEGACY_TRAIL_IDS,
  curriculum,
  flattenLessons,
  getAdjacentLessons,
  getFirstLesson,
  getLessonLocation,
  getTrail,
  getTrailStats,
  lessonMaxXp,
  lessonSteps,
} from "@/content";
import type { Question, TrailId } from "@/content/types";
import { parseYouTubeId } from "@/lib/youtube";
import { existsSync } from "node:fs";
import { join } from "node:path";

const allLessons = curriculum.flatMap((t) => flattenLessons(t).map((l) => l.lesson));

describe("curriculum — integridade estrutural", () => {
  it("TrailId aceita os ids das trilhas de entrega", () => {
    // Gate desta asserção é `tsc --noEmit`: o vitest apaga os tipos.
    const ids: TrailId[] = [
      "app-no-ar",
      "site-com-sua-cara",
      "tarefa-chata",
      "projeto-de-verdade",
    ];
    expect(new Set(ids).size).toBe(4);
  });

  it("ids de aula são únicos em toda a plataforma", () => {
    const ids = allLessons.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("slugs de aula são únicos por trilha", () => {
    for (const trail of curriculum) {
      const slugs = flattenLessons(trail).map((l) => l.lesson.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("toda etapa tem ao menos uma aula", () => {
    for (const trail of curriculum) {
      for (const phase of trail.phases) {
        for (const stage of phase.stages) {
          expect(stage.lessons.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("todo projeto referencia uma fase existente da própria trilha", () => {
    for (const trail of curriculum) {
      const phaseIds = new Set(trail.phases.map((p) => p.id));
      for (const proj of trail.projects) {
        if (proj.unlockedAfterPhaseId) {
          expect(phaseIds.has(proj.unlockedAfterPhaseId)).toBe(true);
        }
      }
    }
  });
});

describe("curriculum — regras de conteúdo", () => {
  const questionIds: string[] = [];
  for (const lesson of allLessons) {
    for (const q of [...lesson.questions, ...lesson.checkpoint.questions]) {
      questionIds.push(q.id);
    }
  }

  it("ids de pergunta são únicos", () => {
    expect(new Set(questionIds).size).toBe(questionIds.length);
  });

  it("aula 'available' tem conteúdo, recursos, perguntas, exercício e checkpoint", () => {
    const available = allLessons.filter((l) => l.status === "available");
    expect(available.length).toBeGreaterThan(0);
    for (const l of available) {
      expect(l.content.length, `${l.id} content`).toBeGreaterThan(0);
      expect(l.learningObjectives.length, `${l.id} objetivos`).toBeGreaterThan(0);
      expect(l.freeResources.length, `${l.id} recursos`).toBeGreaterThan(0);
      expect(l.questions.length, `${l.id} perguntas`).toBeGreaterThanOrEqual(3);
      expect(l.exercise, `${l.id} exercício`).toBeTruthy();
      expect(l.checkpoint.questions.length, `${l.id} checkpoint`).toBeGreaterThanOrEqual(3);
    }
  });

  it("meta do checkpoint é possível (threshold <= nº de perguntas) quando há checkpoint", () => {
    for (const l of allLessons) {
      if (l.checkpoint.questions.length > 0) {
        expect(l.checkpoint.passThreshold).toBeGreaterThan(0);
        expect(l.checkpoint.passThreshold).toBeLessThanOrEqual(
          l.checkpoint.questions.length,
        );
      }
    }
  });

  it("toda pergunta tem dica e explicação e uma resposta correta bem formada", () => {
    const check = (q: Question) => {
      expect(q.hint.trim().length, `${q.id} hint`).toBeGreaterThan(0);
      expect(q.explanation.trim().length, `${q.id} explanation`).toBeGreaterThan(0);
      expect(q.concept.trim().length, `${q.id} concept`).toBeGreaterThan(0);
      if (q.type === "order") {
        expect(new Set(q.correctOrder)).toEqual(new Set(q.items.map((i) => i.id)));
      } else if (q.type === "match") {
        expect(q.correctPairs.length).toBe(q.left.length);
      } else if (q.type === "judge") {
        expect(q.defects.length, `${q.id} defeitos`).toBeGreaterThan(0);
        expect(q.correctDefectIds.length, `${q.id} defeitos certos`).toBeGreaterThan(0);
        const defectIds = new Set(q.defects.map((d) => d.id));
        for (const id of q.correctDefectIds) expect(defectIds.has(id)).toBe(true);
      } else {
        expect(q.correctOptionIds.length).toBeGreaterThan(0);
        const optionIds = new Set(q.options.map((o) => o.id));
        for (const id of q.correctOptionIds) expect(optionIds.has(id)).toBe(true);
      }
    };
    for (const l of allLessons) {
      [...l.questions, ...l.checkpoint.questions].forEach(check);
    }
  });

  it("todo vídeo de aula aponta para um link de YouTube válido", () => {
    for (const l of allLessons) {
      if (!l.video) continue;
      expect(l.video.url, `${l.id} video.url`).toMatch(/^https:\/\//);
      expect(parseYouTubeId(l.video.url), `${l.id} video.url`).not.toBeNull();
    }
  });

  it("aula 'draft' não trava: sem perguntas de checkpoint", () => {
    for (const l of allLessons.filter((x) => x.status === "draft")) {
      expect(l.checkpoint.questions.length).toBe(0);
    }
  });
});

describe("seletores", () => {
  it("getFirstLesson devolve a aula available da trilha", () => {
    const first = getFirstLesson("app-no-ar");
    expect(first?.lesson.status).toBe("available");
    expect(first?.lesson.id).toBe("ar-ideia-01-recortar");
  });

  it("getLessonLocation resolve trilha/fase/etapa/aula", () => {
    const loc = getLessonLocation("app-no-ar", "ar-jul-01-generico");
    expect(loc?.trail.id).toBe("app-no-ar");
    expect(loc?.phase.id).toBe("ar-p4");
    expect(loc?.stage.id).toBe("ar-s4");
    // 2 aulas em p1 + 2 em p2 + 1 em p3 = a sexta da trilha
    expect(loc?.indexInTrail).toBe(5);
  });

  it("getLessonLocation com ids inválidos devolve undefined", () => {
    expect(getLessonLocation("app-no-ar", "nao-existe")).toBeUndefined();
    expect(getLessonLocation("xxx", "ar-jul-01-generico")).toBeUndefined();
  });

  it("getAdjacentLessons encadeia as aulas da trilha", () => {
    const { prev, next } = getAdjacentLessons("app-no-ar", "ar-jul-01-generico");
    expect(prev?.lesson.id).toBe("ar-ger-01-ferramenta-certa");
    expect(next?.lesson.id).toBe("ar-jul-02-checklist");
  });

  it("getTrailStats soma o que existe", () => {
    const trail = getTrail("app-no-ar")!;
    const stats = getTrailStats("app-no-ar");
    const available = flattenLessons(trail).filter(
      (l) => l.lesson.status === "available",
    ).length;
    expect(stats.phases).toBe(6);
    expect(stats.lessons).toBe(flattenLessons(trail).length);
    expect(stats.availableLessons).toBe(available);
    expect(available).toBeGreaterThanOrEqual(1);
    expect(stats.totalXp).toBeGreaterThan(0);
  });

  it("lessonSteps/lessonMaxXp refletem as partes da aula", () => {
    const julgamento = getLessonLocation("app-no-ar", "ar-jul-01-generico")!.lesson;
    // Sem "watch": a aula não tem vídeo, porque não havia um verificado.
    expect(lessonSteps(julgamento)).toEqual([
      "learn",
      "explore",
      "quiz",
      "practice",
      "challenge",
      "checkpoint",
    ]);
    // 10 + 5 + 20 + 30 + 50 + 80
    expect(lessonMaxXp(julgamento)).toBe(195);
  });
});

/* ------------------------------------------------------------------ */
/* Trilha de entrega                                                  */
/* ------------------------------------------------------------------ */

describe("Trilha 1 — Coloque seu primeiro app no ar", () => {
  it("a trilha de entrega principal é a primeira do currículo", () => {
    expect(curriculum[0].id).toBe("app-no-ar");
  });

  it("as fases da Trilha 1 são os seis passos do loop", () => {
    const trail = getTrail("app-no-ar")!;
    expect(trail.phases.map((p) => p.id)).toEqual([
      "ar-p1",
      "ar-p2",
      "ar-p3",
      "ar-p4",
      "ar-p5",
      "ar-p6",
    ]);
  });

  it("a Trilha 1 tem 12 aulas", () => {
    expect(getTrailStats("app-no-ar").lessons).toBe(12);
  });
});

describe("aula de julgamento — primeira aula escrita da Trilha 1", () => {
  it("está completa e usa os primitivos novos", () => {
    const lesson = getLessonLocation("app-no-ar", "ar-jul-01-generico")!.lesson;
    expect(lesson.status).toBe("available");
    expect(lesson.content.some((b) => b.type === "compare")).toBe(true);
    expect(
      [...lesson.questions, ...lesson.checkpoint.questions].some(
        (q) => q.type === "judge",
      ),
    ).toBe(true);
  });

  it("as imagens da comparação apontam para arquivos do repositório", () => {
    const lesson = getLessonLocation("app-no-ar", "ar-jul-01-generico")!.lesson;
    for (const block of lesson.content) {
      if (block.type !== "compare") continue;
      for (const side of [block.left, block.right]) {
        expect(side.src, "src relativo, nunca URL remota").toMatch(/^\/content\//);
      }
    }
  });
});

describe("trilhas de código arquivadas", () => {
  it("saíram do currículo", () => {
    expect(curriculum.map((t) => t.id)).toEqual(["app-no-ar"]);
    expect(getTrail("frontend")).toBeUndefined();
    expect(getTrail("backend")).toBeUndefined();
    expect(getTrail("fullstack")).toBeUndefined();
  });

  it("seus ids continuam listados, para as rotas antigas redirecionarem", () => {
    expect([...LEGACY_TRAIL_IDS]).toEqual(["frontend", "backend", "fullstack"]);
  });
});

describe("certificado", () => {
  it("toda trilha do currículo declara o que atesta", () => {
    for (const trail of curriculum) {
      expect(trail.certifies.length, `${trail.id} certifies`).toBeGreaterThan(0);
      for (const frase of trail.certifies) {
        expect(frase.trim().length).toBeGreaterThan(10);
      }
    }
  });
});

/**
 * Uma imagem com caminho errado não quebra a aula — isso é de propósito
 * (Review Focus nº 4). O efeito colateral é que o erro fica SILENCIOSO: a
 * comparação, que é o coração da aula, some sem avisar ninguém. Este teste
 * é o único lugar onde esse erro faz barulho.
 */
describe("imagens de conteúdo", () => {
  const publicPath = (src: string) => join(process.cwd(), "public", src);

  it("o teste sabe detectar arquivo ausente", () => {
    expect(existsSync(publicPath("/content/nao-existe-mesmo.svg"))).toBe(false);
  });

  it("toda imagem de aula available existe em public/", () => {
    // Aula sem imagem é permitida — a prova pode ser texto (spec 30/10 §10.2).
    // O que não pode é uma imagem citada que não existe.
    let total = 0;
    for (const l of allLessons.filter((x) => x.status === "available")) {
      const srcs: string[] = [];

      for (const block of l.content) {
        if (block.type === "image") srcs.push(block.src);
        if (block.type === "compare") srcs.push(block.left.src, block.right.src);
      }
      for (const q of [...l.questions, ...l.checkpoint.questions]) {
        if (q.type !== "judge") continue;
        for (const side of [q.left, q.right]) if (side.src) srcs.push(side.src);
      }

      total += srcs.length;
      for (const src of srcs) {
        expect(existsSync(publicPath(src)), `${l.id}: ${src}`).toBe(true);
      }
    }
    // Para o teste não passar vazio.
    expect(total, "nenhuma imagem na trilha para checar").toBeGreaterThan(0);
  });
});

/* ------------------------------------------------------------------ */
/* Dor → solução                                                      */
/* ------------------------------------------------------------------ */
/* Verbatim da tabela aprovada pela autora (spec 2026-10-30, §5).     */
/* Trocar uma frase aqui é trocar uma decisão dela.                   */

const DORES: Record<string, { titulo: string; quote: string; resolve: string; after: string }> = {
  "ar-ideia-01-recortar": {
    titulo: "Recorta a ideia até ela caber",
    quote: "Tenho uma ideia gigante e não sei nem por onde começar.",
    resolve: "Achar a menor versão que já serve pra alguém.",
    after: "Sei qual é a primeira versão — e ela cabe num fim de semana.",
  },
  "ar-ideia-02-referencias": {
    titulo: "Junta cinco referências",
    quote: "Peço pra IA e sempre sai a mesma cara de site.",
    resolve: "Juntar referência antes de abrir a IA.",
    after: "Tenho cinco referências e sei o que eu quero de cada uma.",
  },
  "ar-spec-01-briefing": {
    titulo: "Escreve o briefing antes do prompt",
    quote: "A IA não faz o que eu tô pedindo.",
    resolve: "Dizer pra quem é, o que a pessoa faz na tela e o que não entra — antes do prompt.",
    after: "Meu pedido cabe numa página e não deixa a IA adivinhar.",
  },
  "ar-spec-02-co-autoria": {
    titulo: "Usa a IA pra melhorar teu pedido",
    quote: "Só descubro o que faltava no pedido depois que vem errado.",
    resolve: "Pedir as perguntas antes de pedir o resultado.",
    after: "A IA me pergunta o que faltava antes de gerar qualquer coisa.",
  },
  "ar-ger-01-ferramenta-certa": {
    titulo: "A ferramenta certa pra cada pedaço",
    quote: "Uso o ChatGPT pra tudo e fico travado.",
    resolve: "Saber qual ferramenta faz melhor cada pedaço do projeto.",
    after: "Lovable pra tela, Claude ou ChatGPT pra pensar e escrever — cada um no seu lugar.",
  },
  "ar-jul-01-generico": {
    titulo: "O que faz um resultado parecer genérico",
    quote: "Pedi um site pra IA e veio um site. Achei meio feio, mas não sei dizer o quê — então deixei assim.",
    resolve: "Dar nome ao defeito. Quem nomeia, conserta.",
    after: "Tudo com o mesmo peso, três botões brigando e um texto que serve pra qualquer um.",
  },
  "ar-jul-02-checklist": {
    titulo: "Teu checklist de julgamento",
    quote: "Toda vez eu aceito o primeiro resultado que vem.",
    resolve: "Seis perguntas que tu faz a qualquer tela antes de aceitar.",
    after: "Passo qualquer resultado no checklist antes de dizer 'tá bom'.",
  },
  "ar-jul-03-feio-de-proposito": {
    titulo: "Faz a versão feia de propósito",
    quote: "Só percebo que tá ruim quando alguém me fala.",
    resolve: "Gerar o ruim de propósito pra treinar o olho.",
    after: "Eu vejo o defeito antes de alguém apontar.",
  },
  "ar-cons-01-iteracao": {
    titulo: "Pede a correção, não outra tentativa",
    quote: "Pedi pra arrumar uma coisa e a IA estragou o que tava bom.",
    resolve: "Um ajuste por vez: o defeito com nome, e o que não pode mexer.",
    after: "Peço o conserto e o resto fica no lugar.",
  },
  "ar-pub-01-github": {
    titulo: "GitHub: onde teu projeto passa a existir",
    quote: "Meu projeto só existe no meu computador — ou no preview do Lovable.",
    resolve: "Um repositório: o lugar de onde o deploy puxa o código.",
    after: "Meu código tá no GitHub, com histórico de tudo que mudou.",
  },
  "ar-pub-02-vercel-render": {
    titulo: "Vercel ou Render: a decisão",
    quote: "Não sei onde colocar meu app no ar e tenho medo de virar conta pra pagar.",
    resolve: "Só front: Vercel. Tem backend e banco: Render. Nos dois, plano grátis.",
    after: "Sei onde meu tipo de app vai morar — e de graça.",
  },
  "ar-pub-03-no-ar": {
    titulo: "No ar, com link pra mandar",
    quote: "Tá pronto, mas ninguém consegue ver.",
    resolve: "Publicar, guardar o que não pode vazar e registrar o link.",
    after: "Mandei o link pra alguém e abriu.",
  },
};

describe("dor → solução", () => {
  const trilha = flattenLessons(getTrail("app-no-ar")!).map((l) => l.lesson);

  it("a tabela cobre as 12 aulas da trilha", () => {
    expect(Object.keys(DORES).sort()).toEqual(trilha.map((l) => l.id).sort());
  });

  it("toda aula da Trilha 1 tem a dor, para o mapa mostrar", () => {
    for (const l of trilha) expect(l.pain?.quote?.trim(), l.id).toBeTruthy();
  });

  it("as dores não se repetem", () => {
    const qs = trilha.map((l) => l.pain!.quote);
    expect(new Set(qs).size).toBe(qs.length);
  });

  it("título e dor de cada aula batem com a tabela aprovada", () => {
    for (const l of trilha) {
      expect(l.title, l.id).toBe(DORES[l.id].titulo);
      expect(l.pain!.quote, l.id).toBe(DORES[l.id].quote);
    }
  });

  it("aula available tem a dor completa e igual à tabela", () => {
    for (const l of trilha.filter((x) => x.status === "available")) {
      expect(l.pain?.resolve, l.id).toBe(DORES[l.id].resolve);
      expect(l.pain?.after, l.id).toBe(DORES[l.id].after);
    }
  });

  it("a dor vai sem aspas — quem desenha as aspas é o componente", () => {
    for (const l of trilha) expect(l.pain!.quote, l.id).not.toMatch(/^["“]|["”]$/);
  });
});

describe("tratamento em 'tu'", () => {
  it("aula available fala com 'tu', nunca com 'você'", () => {
    const trilha = flattenLessons(getTrail("app-no-ar")!).map((l) => l.lesson);
    for (const l of trilha.filter((x) => x.status === "available")) {
      const texto = JSON.stringify(l);
      // \b do JS não entende acento: com ele "você" nunca casaria e o teste
      // passaria à toa. A fronteira aqui é por letra Unicode.
      expect(texto, l.id).not.toMatch(/(^|[^\p{L}])vocês?(?=[^\p{L}]|$)/iu);
    }
  });
});

/*
 * As onze aulas escritas no formato dor → solução (Tarefas 5–15). A lista
 * cresce uma aula por vez: entrar na lista é o teste vermelho da aula.
 */
const ESCRITAS = [
  "ar-ideia-01-recortar",
  "ar-ideia-02-referencias",
];

describe("aulas escritas da Trilha 1", () => {
  for (const id of ESCRITAS) {
    it(`${id} está escrita`, () => {
      expect(getLessonLocation("app-no-ar", id)!.lesson.status).toBe("available");
    });
  }

  it("as aulas de julgamento têm questão de julgar (A/B)", () => {
    for (const id of ["ar-jul-01-generico", "ar-jul-02-checklist", "ar-jul-03-feio-de-proposito"]) {
      const l = getLessonLocation("app-no-ar", id)!.lesson;
      if (l.status !== "available") continue;
      expect(
        [...l.questions, ...l.checkpoint.questions].some((q) => q.type === "judge"),
        id,
      ).toBe(true);
    }
  });
});
