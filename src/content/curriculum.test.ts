import { describe, expect, it } from "vitest";
import {
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
import type { Question } from "@/content/types";
import { parseYouTubeId } from "@/lib/youtube";

const allLessons = curriculum.flatMap((t) => flattenLessons(t).map((l) => l.lesson));

describe("curriculum — integridade estrutural", () => {
  it("tem as três trilhas na ordem esperada", () => {
    expect(curriculum.map((t) => t.id)).toEqual(["frontend", "backend", "fullstack"]);
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

  it("a aula da Internet usa o vídeo verificado (não o id inválido antigo)", () => {
    const internet = getLessonLocation("frontend", "fe-web-01-internet")!.lesson;
    expect(parseYouTubeId(internet.video!.url)).toBe("nlO5hySqJFA");
  });

  it("aula 'draft' não trava: sem perguntas de checkpoint", () => {
    for (const l of allLessons.filter((x) => x.status === "draft")) {
      expect(l.checkpoint.questions.length).toBe(0);
    }
  });
});

describe("seletores", () => {
  it("getFirstLesson devolve uma aula available da trilha", () => {
    const first = getFirstLesson("frontend");
    expect(first?.lesson.status).toBe("available");
    expect(first?.lesson.id).toBe("fe-web-01-internet");
  });

  it("getLessonLocation resolve trilha/fase/etapa/aula", () => {
    const loc = getLessonLocation("frontend", "fe-web-01-internet");
    expect(loc?.trail.id).toBe("frontend");
    expect(loc?.phase.id).toBe("fe-p1");
    expect(loc?.stage.id).toBe("fe-s1");
    expect(loc?.indexInTrail).toBe(0);
  });

  it("getLessonLocation com ids inválidos devolve undefined", () => {
    expect(getLessonLocation("frontend", "nao-existe")).toBeUndefined();
    expect(getLessonLocation("xxx", "fe-web-01-internet")).toBeUndefined();
  });

  it("getAdjacentLessons encadeia as aulas da trilha", () => {
    const { prev, next } = getAdjacentLessons("frontend", "fe-web-01-internet");
    expect(prev).toBeUndefined();
    expect(next?.lesson.id).toBe("fe-html-01-tags");
  });

  it("getTrailStats soma o que existe", () => {
    const trail = getTrail("frontend")!;
    const stats = getTrailStats("frontend");
    const available = flattenLessons(trail).filter(
      (l) => l.lesson.status === "available",
    ).length;
    expect(stats.phases).toBe(4);
    expect(stats.lessons).toBe(flattenLessons(trail).length);
    expect(stats.availableLessons).toBe(available);
    expect(available).toBeGreaterThanOrEqual(5); // Fase 1 completa
    expect(stats.totalXp).toBeGreaterThan(0);
  });

  it("lessonSteps/lessonMaxXp refletem as partes da aula", () => {
    const internet = getLessonLocation("frontend", "fe-web-01-internet")!.lesson;
    expect(lessonSteps(internet)).toEqual([
      "learn",
      "watch",
      "explore",
      "quiz",
      "practice",
      "challenge",
      "checkpoint",
    ]);
    // 10 + 15 + 5 + 20 + 30 + 50 + 80
    expect(lessonMaxXp(internet)).toBe(210);
  });
});
