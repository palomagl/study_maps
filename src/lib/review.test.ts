import { describe, expect, it } from "vitest";
import { buildReviewDeck, prettyConcept, questionsForConcept } from "@/lib/review";

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
