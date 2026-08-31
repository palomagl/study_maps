import { describe, expect, it } from "vitest";
import { getLessonLocation, lessonSteps } from "@/content";
import { createTestStore } from "@/lib/progress-store";
import {
  ACHIEVEMENTS,
  cumulativeXpForLevel,
  levelProgress,
  missionViews,
  pendingAchievements,
} from "@/lib/gamification";

const ach = (id: string) => ACHIEVEMENTS.find((a) => a.id === id)!;
const internet = getLessonLocation("frontend", "fe-web-01-internet")!.lesson;

function storeWithFullLesson() {
  const store = createTestStore();
  for (const s of lessonSteps(internet)) store.completeStep(internet.id, s, 0);
  return store;
}

describe("levelProgress", () => {
  it("limites da curva de níveis", () => {
    expect(cumulativeXpForLevel(1)).toBe(0);
    expect(cumulativeXpForLevel(2)).toBe(100);
    expect(cumulativeXpForLevel(3)).toBe(300);
    expect(cumulativeXpForLevel(5)).toBe(1000);
  });

  it("xp 0 → nível 1, começo da barra", () => {
    const l = levelProgress(0);
    expect(l.level).toBe(1);
    expect(l.floor).toBe(0);
    expect(l.ceil).toBe(100);
    expect(l.percent).toBe(0);
    expect(l.toNext).toBe(100);
  });

  it("xp logo abaixo do corte continua no nível de baixo", () => {
    expect(levelProgress(99).level).toBe(1);
    expect(levelProgress(100).level).toBe(2);
    expect(levelProgress(299).level).toBe(2);
    expect(levelProgress(300).level).toBe(3);
  });

  it("xp alto → nível 5 e título", () => {
    const l = levelProgress(1000);
    expect(l.level).toBe(5);
    expect(l.title).toBe("Desenvolvedor(a)");
  });

  it("valores inválidos não quebram", () => {
    expect(levelProgress(-50).level).toBe(1);
    expect(levelProgress(Number.NaN).level).toBe(1);
  });
});

describe("conquistas", () => {
  it("estado zerado não desbloqueia nada", () => {
    const store = createTestStore();
    expect(pendingAchievements(store.getState())).toEqual([]);
  });

  it("primeiro passo de aula → 'primeiro-passo'", () => {
    const store = createTestStore();
    store.completeStep("qualquer-aula", "learn", 10);
    expect(ach("primeiro-passo").test(store.getState())).toBe(true);
    expect(ach("primeira-aula").test(store.getState())).toBe(false);
  });

  it("aula completa → 'primeira-aula' e 'primeiro-codigo'", () => {
    const s = storeWithFullLesson().getState();
    expect(ach("primeira-aula").test(s)).toBe(true);
    expect(ach("primeiro-codigo").test(s)).toBe(true); // tem passo practice
    expect(ach("sem-medo").test(s)).toBe(true); // tem passo challenge
  });

  it("etapa completa (só a etapa 1 do front tem 1 aula) → 'primeira-etapa'", () => {
    const s = storeWithFullLesson().getState();
    expect(ach("primeira-etapa").test(s)).toBe(true);
  });

  it("sequência longa → 'constancia' e 'sequencia-7'", () => {
    const store = createTestStore();
    // força a streak via múltiplas mutações não dá; testamos o predicado direto
    const base = store.getState();
    expect(ach("constancia").test({ ...base, streak: { ...base.streak, longest: 3 } })).toBe(true);
    expect(ach("sequencia-7").test({ ...base, streak: { ...base.streak, longest: 7 } })).toBe(true);
    expect(ach("sequencia-7").test({ ...base, streak: { ...base.streak, longest: 6 } })).toBe(false);
  });

  it("xp alto → 'nivel-5'", () => {
    const store = createTestStore();
    expect(ach("nivel-5").test({ ...store.getState(), xp: 1000 })).toBe(true);
    expect(ach("nivel-5").test({ ...store.getState(), xp: 900 })).toBe(false);
  });
});

describe("missões", () => {
  it("estado zerado: nenhuma missão concluída", () => {
    const views = missionViews(createTestStore().getState());
    expect(views.every((m) => !m.done)).toBe(true);
    expect(views.every((m) => !m.claimable)).toBe(true);
  });

  it("aula completa deixa 'primeira aula' resgatável", () => {
    const s = storeWithFullLesson().getState();
    const m = missionViews(s).find((x) => x.id === "m-primeira-aula")!;
    expect(m.done).toBe(true);
    expect(m.claimable).toBe(true);
  });

  it("claimMission credita o bônus uma única vez", () => {
    const store = storeWithFullLesson();
    const xpBefore = store.getState().xp;
    expect(store.claimMission("m-primeira-aula", 40)).toBe(true);
    expect(store.getState().xp).toBe(xpBefore + 40);
    expect(store.claimMission("m-primeira-aula", 40)).toBe(false);
    expect(store.getState().xp).toBe(xpBefore + 40);
    const m = missionViews(store.getState()).find((x) => x.id === "m-primeira-aula")!;
    expect(m.claimed).toBe(true);
    expect(m.claimable).toBe(false);
  });
});
