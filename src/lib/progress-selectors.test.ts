import { describe, expect, it } from "vitest";
import { parseState } from "@/lib/progress-store";
import {
  completedLessonCount,
  hasAnyProgress,
  teamStatus,
} from "@/lib/progress-selectors";
import { defaultState } from "@/lib/progress-store";
import { flattenLessons, lessonSteps } from "@/content";
import { appNoArTrail } from "@/content/trails/app-no-ar";

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

/* ------------------------------------------------------------------ */
/* O time                                                             */
/* ------------------------------------------------------------------ */

describe("o time da trilha", () => {
  it("começa vazio", () => {
    const time = teamStatus(defaultState(), appNoArTrail);
    expect(time.map((a) => a.kind)).toEqual([
      "ideia",
      "pedido",
      "geracao",
      "julgamento",
      "conserto",
      "noar",
    ]);
    expect(time.every((a) => !a.unlocked)).toBe(true);
  });

  it("concluir as aulas escritas de uma fase recruta o agente dela", () => {
    const s = defaultState();
    for (const { lesson, phase } of flattenLessons(appNoArTrail)) {
      if (phase.id !== "ar-p4" || lesson.status !== "available") continue;
      s.lessons[lesson.id] = {
        steps: Object.fromEntries(lessonSteps(lesson).map((k) => [k, true])),
        checkpoint: null,
      };
    }
    const time = teamStatus(s, appNoArTrail);
    expect(time.find((a) => a.kind === "julgamento")!.unlocked).toBe(true);
    expect(time.filter((a) => a.unlocked)).toHaveLength(1);
  });
});
