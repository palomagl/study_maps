import type { Question, QuestionAnswer } from "@/content/types";

/** Compara dois conjuntos de strings sem considerar ordem. */
function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sb = new Set(b);
  return a.every((x) => sb.has(x));
}

/** Resposta "vazia" para um tipo de pergunta — usada como estado inicial. */
export function emptyAnswer(q: Question): QuestionAnswer {
  switch (q.type) {
    case "order":
      return { kind: "order", itemIds: q.items.map((i) => i.id) };
    case "match":
      return { kind: "match", pairs: [] };
    default:
      return { kind: "choice", optionIds: [] };
  }
}

/** Uma resposta está "preenchida" o suficiente para ser submetida? */
export function isAnswerComplete(q: Question, answer: QuestionAnswer): boolean {
  switch (q.type) {
    case "order":
      return answer.kind === "order" && answer.itemIds.length === q.items.length;
    case "match":
      return answer.kind === "match" && answer.pairs.length === q.left.length;
    case "multiple":
      return answer.kind === "choice" && answer.optionIds.length > 0;
    default:
      return answer.kind === "choice" && answer.optionIds.length === 1;
  }
}

/** Corrige a resposta. `true` = totalmente correta. */
export function gradeQuestion(q: Question, answer: QuestionAnswer): boolean {
  switch (q.type) {
    case "single":
    case "boolean":
    case "code-output":
    case "multiple": {
      if (answer.kind !== "choice") return false;
      return sameSet(answer.optionIds, q.correctOptionIds);
    }
    case "order": {
      if (answer.kind !== "order") return false;
      return (
        answer.itemIds.length === q.correctOrder.length &&
        answer.itemIds.every((id, i) => id === q.correctOrder[i])
      );
    }
    case "match": {
      if (answer.kind !== "match") return false;
      if (answer.pairs.length !== q.correctPairs.length) return false;
      const key = (p: { leftId: string; rightId: string }) => `${p.leftId}=>${p.rightId}`;
      return sameSet(answer.pairs.map(key), q.correctPairs.map(key));
    }
    default:
      return false;
  }
}

export interface QuizOutcome {
  total: number;
  correct: number;
  passed: boolean;
  /** Conceitos das perguntas erradas — alimenta a área de revisão. */
  weakConcepts: string[];
}

/** Resultado de um conjunto de perguntas (usado no checkpoint). */
export function gradeQuiz(
  questions: Question[],
  answers: Record<string, QuestionAnswer>,
  passThreshold: number,
): QuizOutcome {
  let correct = 0;
  const weak: string[] = [];
  for (const q of questions) {
    const a = answers[q.id];
    const ok = a ? gradeQuestion(q, a) : false;
    if (ok) correct += 1;
    else if (!weak.includes(q.concept)) weak.push(q.concept);
  }
  return {
    total: questions.length,
    correct,
    passed: correct >= passThreshold,
    weakConcepts: weak,
  };
}

/** Fisher–Yates puro (não muta o array recebido). */
export function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
