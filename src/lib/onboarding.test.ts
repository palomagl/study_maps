import { describe, expect, it } from "vitest";
import {
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  recommendTrail,
} from "@/lib/onboarding";
import { getTrail } from "@/content";

describe("recommendTrail", () => {
  it("objetivos diretos mapeiam para a trilha correspondente", () => {
    expect(recommendTrail("frontend", null).trailId).toBe("frontend");
    expect(recommendTrail("backend", null).trailId).toBe("backend");
    expect(recommendTrail("fullstack", null).trailId).toBe("fullstack");
  });

  it("'apps' depende da experiência", () => {
    expect(recommendTrail("apps", "nunca").trailId).toBe("frontend");
    expect(recommendTrail("apps", "contato").trailId).toBe("frontend");
    expect(recommendTrail("apps", "projetos").trailId).toBe("fullstack");
    expect(recommendTrail("apps", "programo").trailId).toBe("fullstack");
  });

  it("'ainda não sei' + iniciante → front-end; + experiente → full-stack", () => {
    expect(recommendTrail("indeciso", "nunca").trailId).toBe("frontend");
    expect(recommendTrail("indeciso", "programo").trailId).toBe("fullstack");
    expect(recommendTrail(null, null).trailId).toBe("frontend");
  });

  it("sempre devolve um trailId que existe e um motivo não vazio", () => {
    for (const g of [...GOAL_OPTIONS.map((o) => o.id), null]) {
      for (const e of [...EXPERIENCE_OPTIONS.map((o) => o.id), null]) {
        const r = recommendTrail(g, e);
        expect(getTrail(r.trailId)).toBeDefined();
        expect(r.reason.length).toBeGreaterThan(10);
      }
    }
  });
});
