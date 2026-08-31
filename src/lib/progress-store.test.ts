import { describe, expect, it } from "vitest";
import {
  createTestStore,
  defaultState,
  localDateKey,
  parseState,
} from "@/lib/progress-store";

describe("parseState (validação defensiva)", () => {
  it("null e JSON inválido viram o default", () => {
    expect(parseState(null)).toEqual(defaultState());
    expect(parseState("{ not json")).toEqual(defaultState());
    expect(parseState("[]")).toEqual(defaultState());
  });

  it("coage campos ausentes ou de tipo errado", () => {
    const s = parseState(
      JSON.stringify({
        xp: "abc",
        lessons: { l1: { steps: { learn: true, watch: "sim" }, checkpoint: 3 } },
        concepts: "nope",
        streak: { current: 4 },
        achievements: [1, "primeiro-passo", null],
      }),
    );
    expect(s.xp).toBe(0);
    expect(s.lessons.l1.steps).toEqual({ learn: true });
    expect(s.lessons.l1.checkpoint).toBeNull();
    expect(s.concepts).toEqual({});
    expect(s.streak.current).toBe(4);
    expect(s.streak.lastStudyDate).toBeNull();
    expect(s.achievements).toEqual(["primeiro-passo"]);
  });

  it("v3: coage missionsClaimed e profile; um blob v2 (sem eles) vira default", () => {
    const v2 = parseState(
      JSON.stringify({ xp: 50, lessons: {}, streak: { current: 1 } }),
    );
    expect(v2.missionsClaimed).toEqual([]);
    expect(v2.profile).toEqual({
      name: null,
      goal: null,
      experience: null,
      onboardedAt: null,
    });

    const v3 = parseState(
      JSON.stringify({
        missionsClaimed: ["m1", 2, null, "m2"],
        profile: { name: "Ana", goal: "frontend", experience: 7, onboardedAt: 123 },
      }),
    );
    expect(v3.missionsClaimed).toEqual(["m1", "m2"]);
    expect(v3.profile).toEqual({
      name: "Ana",
      goal: "frontend",
      experience: null,
      onboardedAt: 123,
    });
  });
});

describe("ProgressStore — passos e XP", () => {
  it("completeStep é idempotente: XP só entra uma vez", () => {
    const store = createTestStore();
    store.completeStep("l1", "learn", 10);
    store.completeStep("l1", "learn", 10);
    expect(store.getState().xp).toBe(10);
    expect(store.getState().lessons.l1.steps.learn).toBe(true);
  });

  it("uncompleteStep remove o passo mas não devolve XP", () => {
    const store = createTestStore();
    store.completeStep("l1", "quiz", 20);
    store.uncompleteStep("l1", "quiz");
    expect(store.getState().lessons.l1.steps.quiz).toBeUndefined();
    expect(store.getState().xp).toBe(20);
  });

  it("notifica assinantes a cada commit", () => {
    const store = createTestStore();
    let hits = 0;
    const unsub = store.subscribe(() => hits++);
    store.completeStep("l1", "learn", 10);
    store.completeStep("l1", "watch", 15);
    unsub();
    store.completeStep("l1", "quiz", 20);
    expect(hits).toBe(2);
  });
});

describe("ProgressStore — checkpoint", () => {
  it("credita XP e marca o passo apenas ao passar, e só uma vez", () => {
    const store = createTestStore();

    store.recordCheckpoint("l1", { score: 2, total: 5, passed: false, xpOnPass: 80 });
    expect(store.getState().xp).toBe(0);
    expect(store.getState().lessons.l1.checkpoint?.attempts).toBe(1);
    expect(store.getState().lessons.l1.steps.checkpoint).toBeUndefined();

    store.recordCheckpoint("l1", { score: 5, total: 5, passed: true, xpOnPass: 80 });
    expect(store.getState().xp).toBe(80);
    expect(store.getState().lessons.l1.steps.checkpoint).toBe(true);
    expect(store.getState().lessons.l1.checkpoint?.bestScore).toBe(5);

    store.recordCheckpoint("l1", { score: 4, total: 5, passed: true, xpOnPass: 80 });
    expect(store.getState().xp).toBe(80); // não credita de novo
    expect(store.getState().lessons.l1.checkpoint?.attempts).toBe(3);
    expect(store.getState().lessons.l1.checkpoint?.bestScore).toBe(5); // mantém o melhor
  });
});

describe("ProgressStore — conceitos", () => {
  it("acumula erros e resolve", () => {
    const store = createTestStore();
    store.recordConceptError("dns", "l1");
    store.recordConceptError("dns", "l1");
    store.recordConceptError("dns", "l2");
    const c = store.getState().concepts.dns;
    expect(c.errors).toBe(3);
    expect(c.lessons).toEqual(["l1", "l2"]);
    expect(c.resolved).toBe(false);

    store.resolveConcept("dns");
    expect(store.getState().concepts.dns.resolved).toBe(true);
  });
});

describe("ProgressStore — streak", () => {
  it("primeira atividade do dia inicia a sequência em 1", () => {
    const store = createTestStore();
    store.completeStep("l1", "learn", 10);
    const s = store.getState().streak;
    expect(s.current).toBe(1);
    expect(s.longest).toBe(1);
    expect(s.lastStudyDate).toBe(localDateKey());
  });

  it("várias atividades no mesmo dia não incrementam a sequência", () => {
    const store = createTestStore();
    store.completeStep("l1", "learn", 10);
    store.completeStep("l1", "watch", 15);
    expect(store.getState().streak.current).toBe(1);
  });
});

describe("ProgressStore — conquistas e missões", () => {
  it("unlockAchievements deduplica e devolve só as novas", () => {
    const store = createTestStore();
    expect(store.unlockAchievements(["a", "b"])).toEqual(["a", "b"]);
    expect(store.unlockAchievements(["b", "c"])).toEqual(["c"]);
    expect(store.getState().achievements).toEqual(["a", "b", "c"]);
  });

  it("claimMission credita XP uma vez e marca como resgatada", () => {
    const store = createTestStore();
    expect(store.claimMission("m1", 40)).toBe(true);
    expect(store.getState().xp).toBe(40);
    expect(store.getState().missionsClaimed).toEqual(["m1"]);
    expect(store.claimMission("m1", 40)).toBe(false);
    expect(store.getState().xp).toBe(40);
  });
});

describe("ProgressStore — perfil / onboarding", () => {
  it("setProfile mescla campos", () => {
    const store = createTestStore();
    store.setProfile({ name: "Ana" });
    store.setProfile({ goal: "frontend" });
    expect(store.getState().profile).toMatchObject({ name: "Ana", goal: "frontend" });
    expect(store.getState().profile.onboardedAt).toBeNull();
  });

  it("completeOnboarding carimba a data só na primeira vez", () => {
    const store = createTestStore();
    store.completeOnboarding({ name: "Ana", goal: "fullstack", experience: "contato" });
    const first = store.getState().profile.onboardedAt;
    expect(first).toBeTypeOf("number");
    store.completeOnboarding({ name: "Ana Maria" });
    expect(store.getState().profile.onboardedAt).toBe(first);
    expect(store.getState().profile.name).toBe("Ana Maria");
  });
});

describe("ProgressStore — reset", () => {
  it("resetLesson limpa só a aula; resetAll zera tudo", () => {
    const store = createTestStore();
    store.completeStep("l1", "learn", 10);
    store.completeStep("l2", "learn", 10);
    store.resetLesson("l1");
    expect(store.getState().lessons.l1).toBeUndefined();
    expect(store.getState().lessons.l2).toBeDefined();
    store.resetAll();
    expect(store.getState()).toEqual(defaultState());
  });
});
