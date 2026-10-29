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
    expect(first?.lesson.id).toBe("ar-jul-01-generico");
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
