import { describe, expect, it } from "vitest";
import type { Question } from "@/content/types";
import {
  buildReviewDeck,
  describeAnswer,
  prettyConcept,
  questionsForConcept,
} from "@/lib/review";

describe("review", () => {
  it("questionsForConcept encontra as perguntas do conceito na aula da Internet", () => {
    const dns = questionsForConcept("dns");
    expect(dns.length).toBeGreaterThan(0);
    expect(dns.every((rq) => rq.question.concept === "dns")).toBe(true);
    expect(dns.some((rq) => rq.lessonId === "fe-web-01-internet")).toBe(true);
  });

  it("conceito inexistente devolve lista vazia", () => {
    expect(questionsForConcept("nao-existe-mesmo")).toEqual([]);
  });

  it("buildReviewDeck ignora conceitos sem perguntas e preserva a ordem", () => {
    const deck = buildReviewDeck(["https", "nao-existe", "dns"]);
    expect(deck.map((c) => c.concept)).toEqual(["https", "dns"]);
    expect(deck.every((c) => c.questions.length > 0)).toBe(true);
  });

  it("prettyConcept troca hífens por espaço", () => {
    expect(prettyConcept("request-lifecycle")).toBe("request lifecycle");
  });
});

/* ------------------------------------------------------------------ */
/* describeAnswer                                                     */
/* ------------------------------------------------------------------ */

describe("describeAnswer", () => {
  it("descreve a resposta de uma questão de escolha", () => {
    const q: Question = {
      id: "c1",
      type: "single",
      prompt: "?",
      concept: "c",
      skill: "compreensao",
      hint: "h",
      explanation: "e",
      options: [
        { id: "a", text: "Certa" },
        { id: "b", text: "Errada" },
      ],
      correctOptionIds: ["a"],
    };
    expect(describeAnswer(q)).toBe("Certa");
  });

  it("descreve a resposta de uma questão de julgamento", () => {
    const q: Question = {
      id: "j1",
      type: "judge",
      prompt: "Qual está melhor?",
      concept: "hierarquia visual",
      skill: "raciocinio",
      hint: "h",
      explanation: "e",
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
    expect(describeAnswer(q)).toBe(
      "Versão B — na outra: Tudo com o mesmo peso visual, Espaçamento inconsistente",
    );
  });
});
