import { describe, expect, it } from "vitest";
import { parseState } from "@/lib/progress-store";
import { completedLessonCount, hasAnyProgress } from "@/lib/progress-selectors";

/**
 * Quem já usou o app publicado tem, no navegador, progresso de aulas que
 * saíram do currículo na virada. Esse progresso não some: o XP e a sequência
 * continuam, e as entradas órfãs simplesmente não contam como aula concluída.
 */
describe("progresso de aulas que não existem mais", () => {
  const órfão = JSON.stringify({
    version: 4,
    xp: 500,
    lessons: {
      "fe-html-01-tags": {
        steps: { learn: true, quiz: true },
        checkpoint: { attempts: 1, bestScore: 4, bestTotal: 4, passed: true },
      },
    },
    concepts: {},
    streak: { current: 0, longest: 0, lastStudyDate: null },
    achievements: [],
    missionsClaimed: [],
    profile: {},
  });

  it("não contam como aula concluída", () => {
    expect(completedLessonCount(parseState(órfão))).toBe(0);
  });

  it("mas o progresso da pessoa continua existindo", () => {
    const state = parseState(órfão);
    expect(hasAnyProgress(state)).toBe(true);
    expect(state.xp).toBe(500);
  });
});
