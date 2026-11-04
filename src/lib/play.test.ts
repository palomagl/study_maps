import { describe, expect, it } from "vitest";
import { checkAnswer, fillNotes, NOTE_MAX, PIECE_XP, syllables } from "@/lib/play";
import type { PlayCard } from "@/content/types";

const escolha: PlayCard = {
  kind: "escolha",
  prompt: "Primeiro passo?",
  options: [
    { id: "a", text: "Pedir tudo de uma vez" },
    { id: "b", text: "Uma coisa só" },
  ],
  correctId: "b",
  beliefId: "a",
  right: "Isso.",
  wrong: "Todo mundo faz isso.",
};
const cortar: PlayCard = {
  kind: "cortar",
  prompt: "Toca no que fica pra depois.",
  chips: [
    { text: "Mandar o link", keep: true },
    { text: "Chat", keep: false },
    { text: "Ver quem confirmou", keep: true },
  ],
  right: "Isso.",
  wrong: "Quase.",
};
const montar: PlayCard = {
  kind: "montar",
  prompt: "Monta a frase.",
  answer: ["Quem marca o rolê", "manda o link", "e vê quem confirmou"],
  distractors: ["e paga"],
  right: "Isso.",
  wrong: "Quase.",
};

describe("checkAnswer", () => {
  it("escolha: só a alternativa certa", () => {
    expect(checkAnswer(escolha, "b")).toBe(true);
    expect(checkAnswer(escolha, "a")).toBe(false);
  });

  it("cortar: exatamente o que fica, em qualquer ordem", () => {
    expect(checkAnswer(cortar, ["Ver quem confirmou", "Mandar o link"])).toBe(true);
    expect(checkAnswer(cortar, ["Mandar o link"])).toBe(false);
    expect(checkAnswer(cortar, ["Mandar o link", "Ver quem confirmou", "Chat"])).toBe(false);
  });

  it("montar: os blocos certos, na ordem certa", () => {
    expect(checkAnswer(montar, ["Quem marca o rolê", "manda o link", "e vê quem confirmou"])).toBe(true);
    expect(checkAnswer(montar, ["manda o link", "Quem marca o rolê", "e vê quem confirmou"])).toBe(false);
    expect(checkAnswer(montar, ["Quem marca o rolê", "manda o link", "e paga"])).toBe(false);
  });
});

describe("fillNotes", () => {
  it("usa o que a pessoa escreveu", () => {
    expect(fillNotes("Tua ideia: {ideia}", { ideia: "app de rolê" }, {})).toBe("Tua ideia: app de rolê");
  });

  it("sem nota, usa o texto alternativo — nunca mostra {ideia} na tela", () => {
    expect(fillNotes("Tua ideia: {ideia}", {}, { ideia: "a tua ideia" })).toBe("Tua ideia: a tua ideia");
    expect(fillNotes("Tua ideia: {ideia}", {}, {})).toBe("Tua ideia: ");
  });
});

describe("syllables", () => {
  it("quebra o texto em pedaços sem perder nada além de espaço", () => {
    const texto = "E se a gente…?! Um pedaço por vez.";
    const s = syllables(texto);
    expect(s.length).toBeGreaterThan(5);
    expect(s.every((x) => x.length > 0)).toBe(true);
    expect(s.join("").replace(/\s/g, "")).toBe(texto.replace(/\s/g, ""));
  });
});

it("valores da entrega 1", () => {
  expect(PIECE_XP).toBe(40);
  expect(NOTE_MAX).toBe(140);
});
