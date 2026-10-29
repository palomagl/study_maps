import { describe, expect, it } from "vitest";
import type {
  ChoiceQuestion,
  JudgeQuestion,
  MatchQuestion,
  OrderQuestion,
} from "@/content/types";
import {
  emptyAnswer,
  gradeQuestion,
  gradeQuiz,
  isAnswerComplete,
  shuffle,
} from "@/lib/questions";

const single: ChoiceQuestion = {
  id: "s1",
  type: "single",
  prompt: "?",
  concept: "c",
  skill: "compreensao",
  hint: "h",
  explanation: "e",
  options: [
    { id: "a", text: "A" },
    { id: "b", text: "B" },
  ],
  correctOptionIds: ["a"],
};

const multiple: ChoiceQuestion = {
  ...single,
  id: "m1",
  type: "multiple",
  options: [
    { id: "a", text: "A" },
    { id: "b", text: "B" },
    { id: "c", text: "C" },
  ],
  correctOptionIds: ["a", "c"],
};

const order: OrderQuestion = {
  id: "o1",
  type: "order",
  prompt: "?",
  concept: "c",
  skill: "raciocinio",
  hint: "h",
  explanation: "e",
  items: [
    { id: "x", text: "X" },
    { id: "y", text: "Y" },
    { id: "z", text: "Z" },
  ],
  correctOrder: ["x", "y", "z"],
};

const match: MatchQuestion = {
  id: "mt1",
  type: "match",
  prompt: "?",
  concept: "c",
  skill: "compreensao",
  hint: "h",
  explanation: "e",
  left: [
    { id: "l1", text: "L1" },
    { id: "l2", text: "L2" },
  ],
  right: [
    { id: "r1", text: "R1" },
    { id: "r2", text: "R2" },
  ],
  correctPairs: [
    { leftId: "l1", rightId: "r1" },
    { leftId: "l2", rightId: "r2" },
  ],
};

describe("gradeQuestion", () => {
  it("single: só aceita a opção correta", () => {
    expect(gradeQuestion(single, { kind: "choice", optionIds: ["a"] })).toBe(true);
    expect(gradeQuestion(single, { kind: "choice", optionIds: ["b"] })).toBe(false);
  });

  it("multiple: exige o conjunto exato, ordem não importa", () => {
    expect(gradeQuestion(multiple, { kind: "choice", optionIds: ["c", "a"] })).toBe(true);
    expect(gradeQuestion(multiple, { kind: "choice", optionIds: ["a"] })).toBe(false);
    expect(
      gradeQuestion(multiple, { kind: "choice", optionIds: ["a", "b", "c"] }),
    ).toBe(false);
  });

  it("order: exige a sequência exata", () => {
    expect(gradeQuestion(order, { kind: "order", itemIds: ["x", "y", "z"] })).toBe(true);
    expect(gradeQuestion(order, { kind: "order", itemIds: ["y", "x", "z"] })).toBe(false);
  });

  it("match: exige todos os pares corretos, ordem dos pares não importa", () => {
    expect(
      gradeQuestion(match, {
        kind: "match",
        pairs: [
          { leftId: "l2", rightId: "r2" },
          { leftId: "l1", rightId: "r1" },
        ],
      }),
    ).toBe(true);
    expect(
      gradeQuestion(match, {
        kind: "match",
        pairs: [
          { leftId: "l1", rightId: "r2" },
          { leftId: "l2", rightId: "r1" },
        ],
      }),
    ).toBe(false);
  });

  it("resposta de tipo incompatível nunca passa", () => {
    expect(gradeQuestion(single, { kind: "order", itemIds: ["a"] })).toBe(false);
  });
});

describe("isAnswerComplete / emptyAnswer", () => {
  it("order começa completo (ordem inicial dos itens)", () => {
    expect(isAnswerComplete(order, emptyAnswer(order))).toBe(true);
  });
  it("single só fica completo com exatamente uma opção", () => {
    expect(isAnswerComplete(single, emptyAnswer(single))).toBe(false);
    expect(isAnswerComplete(single, { kind: "choice", optionIds: ["a"] })).toBe(true);
  });
  it("match fica completo quando todo lado esquerdo tem par", () => {
    expect(isAnswerComplete(match, { kind: "match", pairs: [] })).toBe(false);
    expect(
      isAnswerComplete(match, {
        kind: "match",
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
        ],
      }),
    ).toBe(true);
  });
});

describe("gradeQuiz", () => {
  it("conta acertos, aplica a meta e coleta conceitos fracos", () => {
    const out = gradeQuiz(
      [single, order],
      {
        s1: { kind: "choice", optionIds: ["b"] }, // errado
        o1: { kind: "order", itemIds: ["x", "y", "z"] }, // certo
      },
      2,
    );
    expect(out).toEqual({
      total: 2,
      correct: 1,
      passed: false,
      weakConcepts: ["c"],
    });
  });

  it("passa quando atinge a meta", () => {
    const out = gradeQuiz(
      [single],
      { s1: { kind: "choice", optionIds: ["a"] } },
      1,
    );
    expect(out.passed).toBe(true);
    expect(out.weakConcepts).toEqual([]);
  });
});

describe("shuffle", () => {
  it("não muta a entrada e preserva os elementos", () => {
    const input = [1, 2, 3, 4, 5];
    const out = shuffle(input);
    expect(input).toEqual([1, 2, 3, 4, 5]);
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

/* ------------------------------------------------------------------ */
/* Questão de julgamento (A/B)                                        */
/* ------------------------------------------------------------------ */
/* Coração pedagógico do projeto: escolher o melhor resultado e nomear */
/* o defeito do pior. Nomear o defeito é o que ensina a enxergá-lo.    */

const judge: JudgeQuestion = {
  id: "q-judge",
  type: "judge",
  prompt: "Qual versão está melhor?",
  concept: "hierarquia visual",
  skill: "raciocinio",
  hint: "Olhe o que seu olho encontra primeiro.",
  explanation: "A da direita tem um único ponto de entrada.",
  left: { label: "Versão A" },
  right: { label: "Versão B" },
  better: "right",
  defects: [
    { id: "d1", text: "Tudo com o mesmo peso visual" },
    { id: "d2", text: "Espaçamento inconsistente" },
    { id: "d3", text: "Paleta com cor demais" },
  ],
  correctDefectIds: ["d1", "d2"],
};

describe("questão de julgamento", () => {
  it("emptyAnswer de judge começa sem lado e sem defeito", () => {
    expect(emptyAnswer(judge)).toEqual({ kind: "judge", better: null, defectIds: [] });
  });

  it("judge só está completa com lado escolhido e ao menos um defeito", () => {
    expect(
      isAnswerComplete(judge, { kind: "judge", better: "right", defectIds: [] }),
    ).toBe(false);
    expect(
      isAnswerComplete(judge, { kind: "judge", better: null, defectIds: ["d1"] }),
    ).toBe(false);
    expect(
      isAnswerComplete(judge, { kind: "judge", better: "right", defectIds: ["d1"] }),
    ).toBe(true);
  });

  it("judge acerta só com lado certo e conjunto exato de defeitos", () => {
    expect(
      gradeQuestion(judge, { kind: "judge", better: "right", defectIds: ["d2", "d1"] }),
    ).toBe(true);
    expect(
      gradeQuestion(judge, { kind: "judge", better: "left", defectIds: ["d1", "d2"] }),
    ).toBe(false);
    expect(
      gradeQuestion(judge, { kind: "judge", better: "right", defectIds: ["d1"] }),
    ).toBe(false);
    expect(
      gradeQuestion(judge, {
        kind: "judge",
        better: "right",
        defectIds: ["d1", "d2", "d3"],
      }),
    ).toBe(false);
  });

  it("judge errada entra em weakConcepts do quiz", () => {
    const out = gradeQuiz(
      [judge],
      { "q-judge": { kind: "judge", better: "left", defectIds: [] } },
      1,
    );
    expect(out.passed).toBe(false);
    expect(out.weakConcepts).toEqual(["hierarquia visual"]);
  });
});
