import { describe, expect, it } from "vitest";
import {
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  recommendTrail,
} from "@/lib/onboarding";
import { getTrail } from "@/content";

describe("recommendTrail", () => {
  it("todo objetivo recomenda uma trilha que existe no currículo", () => {
    for (const g of [...GOAL_OPTIONS.map((o) => o.id), null]) {
      for (const e of [...EXPERIENCE_OPTIONS.map((o) => o.id), null]) {
        const r = recommendTrail(g, e);
        expect(getTrail(r.trailId), `objetivo ${g} / experiência ${e}`).toBeDefined();
      }
    }
  });

  it("o motivo é específico do objetivo, não um texto só", () => {
    const motivos = GOAL_OPTIONS.map((o) => recommendTrail(o.id, null).reason);
    for (const m of motivos) expect(m.length).toBeGreaterThan(10);
    expect(new Set(motivos).size).toBeGreaterThan(1);
  });

  it("quem já publicou algo ouve um motivo diferente de quem nunca publicou", () => {
    expect(recommendTrail("app-no-ar", "publiquei").reason).not.toBe(
      recommendTrail("app-no-ar", "nunca").reason,
    );
  });

  it("objetivo desconhecido ou ausente ainda devolve recomendação válida", () => {
    for (const g of [null, "objetivo-que-nao-existe"]) {
      const r = recommendTrail(g, null);
      expect(getTrail(r.trailId)).toBeDefined();
      expect(r.reason.length).toBeGreaterThan(10);
    }
  });
});
