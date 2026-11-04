import { describe, expect, it } from "vitest";
import { createTestStore, defaultState, parseState } from "@/lib/progress-store";
import { lessonComplete, lessonCompletion, nextPieceIndex } from "@/lib/progress-selectors";
import { lessonSteps } from "@/content";
import type { Lesson } from "@/content/types";
import { recortaAIdeia } from "@/content/lessons/ar-ideia-01-recortar";

/** A 1.1 com um roteiro de dois pedaços, pra não depender do conteúdo real. */
const comPlay: Lesson = {
  ...recortaAIdeia,
  play: {
    pieces: [
      { id: "p1", title: "Um", mission: "m", cards: [{ kind: "dor" }] },
      { id: "p2", title: "Dois", mission: "m", cards: [{ kind: "dor" }] },
    ],
  },
};

describe("progresso por pedaço", () => {
  it("completar um pedaço dá XP uma vez só", () => {
    const store = createTestStore();
    store.completePiece(comPlay.id, "p1", 40);
    store.completePiece(comPlay.id, "p1", 40);
    expect(store.getState().xp).toBe(40);
    expect(store.getState().lessons[comPlay.id].pieces).toEqual(["p1"]);
  });

  it("a aula com roteiro conclui só com todos os pedaços", () => {
    const store = createTestStore();
    store.completePiece(comPlay.id, "p1", 40);
    expect(lessonComplete(store.getState(), comPlay)).toBe(false);
    expect(lessonCompletion(store.getState(), comPlay)).toMatchObject({ doneSteps: 1, totalSteps: 2 });
    expect(nextPieceIndex(store.getState(), comPlay)).toBe(1);
    store.completePiece(comPlay.id, "p2", 40);
    expect(lessonComplete(store.getState(), comPlay)).toBe(true);
    expect(nextPieceIndex(store.getState(), comPlay)).toBe(2);
  });

  it("quem já concluiu a aula no formato antigo continua com ela concluída", () => {
    const state = defaultState();
    const steps: Record<string, boolean> = {};
    for (const s of lessonSteps(comPlay)) steps[s] = true;
    state.lessons[comPlay.id] = { steps, checkpoint: null };
    expect(lessonComplete(state, comPlay)).toBe(true);
  });
});

describe("o que a pessoa escreve fica guardado", () => {
  it("saveNote guarda o texto cru, cortado em 140", () => {
    const store = createTestStore();
    store.saveNote("ideia", `  <b>app</b> "de rolê" ${"x".repeat(300)}  `);
    const nota = store.getState().notes.ideia;
    expect(nota.startsWith('<b>app</b> "de rolê"')).toBe(true);
    expect(nota.length).toBe(140);
  });

  it("texto vazio não apaga a nota", () => {
    const store = createTestStore();
    store.saveNote("ideia", "app de rolê");
    store.saveNote("ideia", "   ");
    expect(store.getState().notes.ideia).toBe("app de rolê");
  });

  it("parseState aceita blob antigo e descarta lixo", () => {
    expect(parseState(JSON.stringify({ version: 4 })).notes).toEqual({});
    const s = parseState(
      JSON.stringify({
        version: 4,
        notes: { ideia: "app", ruim: 3 },
        lessons: { x: { steps: {}, checkpoint: null, pieces: ["p1", 2, "p2"] } },
      }),
    );
    expect(s.notes).toEqual({ ideia: "app" });
    expect(s.lessons.x.pieces).toEqual(["p1", "p2"]);
  });
});
