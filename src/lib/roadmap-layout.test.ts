import { describe, expect, it } from "vitest";
import { curriculum } from "@/content";
import { frontendTrail } from "@/content/trails/frontend";
import {
  MAP,
  buildTrailMap,
  type LessonNode,
  type StageNode,
} from "@/lib/roadmap-layout";

const map = buildTrailMap(frontendTrail);
const stages = map.nodes.filter((n): n is StageNode => n.kind === "stage");
const lessons = map.nodes.filter((n): n is LessonNode => n.kind === "lesson");

describe("buildTrailMap", () => {
  it("cria um nó para cada fase, etapa e aula da trilha", () => {
    const phases = frontendTrail.phases;
    const stageCount = phases.reduce((n, p) => n + p.stages.length, 0);
    const lessonCount = phases.reduce(
      (n, p) => n + p.stages.reduce((m, s) => m + s.lessons.length, 0),
      0,
    );

    expect(map.nodes.filter((n) => n.kind === "phase")).toHaveLength(
      phases.length,
    );
    expect(stages).toHaveLength(stageCount);
    expect(lessons).toHaveLength(lessonCount);
  });

  it("alterna o lado das etapas ao longo da trilha inteira", () => {
    expect(stages.map((s) => s.side)).toEqual(
      stages.map((_, i) => (i % 2 === 0 ? "right" : "left")),
    );
  });

  it("mantém as aulas do mesmo lado da etapa, recuadas", () => {
    for (const lesson of lessons) {
      const stage = stages.find((s) => s.id === lesson.stageId);
      expect(stage).toBeDefined();
      expect(lesson.side).toBe(stage!.side);
      // Recuada = mais longe do trilho central que a caixa da etapa.
      const lessonEdge =
        lesson.side === "right" ? lesson.x : lesson.x + lesson.w;
      const stageEdge = stage!.side === "right" ? stage!.x : stage!.x + stage!.w;
      expect(Math.abs(lessonEdge - MAP.spineX)).toBeGreaterThan(
        Math.abs(stageEdge - MAP.spineX),
      );
    }
  });

  it("empilha os nós em ordem vertical, sem sobreposição", () => {
    const ordered = [...map.nodes].sort((a, b) => a.y - b.y);
    for (let i = 0; i < ordered.length - 1; i++) {
      const a = ordered[i];
      const b = ordered[i + 1];
      // Só exigimos separação quando as caixas se cruzam horizontalmente.
      const overlapsX = a.x < b.x + b.w && b.x < a.x + a.w;
      if (overlapsX) expect(b.y).toBeGreaterThanOrEqual(a.y + a.h);
    }
  });

  it("cabe dentro da largura declarada e tem altura suficiente", () => {
    for (const node of map.nodes) {
      expect(node.x).toBeGreaterThanOrEqual(0);
      expect(node.x + node.w).toBeLessThanOrEqual(map.width);
    }
    const lowest = Math.max(...map.nodes.map((n) => n.y + n.h));
    expect(map.height).toBeGreaterThan(lowest);
  });

  it("liga toda aresta a um nó existente", () => {
    const ids = new Set(map.nodes.map((n) => n.id));
    for (const edge of map.edges) {
      expect(ids.has(edge.ownerId)).toBe(true);
      expect(edge.d).toMatch(/^M [\d.]+ [\d.]+/);
    }
  });

  it("desenha um ramo por etapa e uma haste por aula", () => {
    expect(map.edges.filter((e) => e.kind === "branch")).toHaveLength(
      stages.length,
    );
    expect(
      map.edges.filter((e) => e.kind === "twig" && e.id.startsWith("twig-")),
    ).toHaveLength(lessons.length);
  });

  it("funciona para todas as trilhas do currículo", () => {
    for (const trail of curriculum) {
      const built = buildTrailMap(trail);
      expect(built.nodes.length).toBeGreaterThan(0);
      expect(built.height).toBeGreaterThan(0);
    }
  });
});
