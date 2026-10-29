import type { Lesson, Question } from "@/content/types";
import { curriculum, flattenLessons } from "@/content";

export interface ReviewQuestion {
  question: Question;
  lessonId: string;
  lessonTitle: string;
  trailId: string;
}

let cache: ReviewQuestion[] | null = null;

/** Índice achatado de TODAS as perguntas (aula + checkpoint) da plataforma. */
function allQuestions(): ReviewQuestion[] {
  if (cache) return cache;
  const out: ReviewQuestion[] = [];
  for (const trail of curriculum) {
    for (const { lesson } of flattenLessons(trail)) {
      const push = (q: Question) =>
        out.push({
          question: q,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          trailId: trail.id,
        });
      lesson.questions.forEach(push);
      lesson.checkpoint.questions.forEach(push);
    }
  }
  cache = out;
  return out;
}

export function questionsForConcept(concept: string): ReviewQuestion[] {
  return allQuestions().filter((rq) => rq.question.concept === concept);
}

export interface ReviewCard {
  concept: string;
  questions: ReviewQuestion[];
}

/** Monta um baralho de revisão para os conceitos informados (na ordem dada). */
export function buildReviewDeck(concepts: string[]): ReviewCard[] {
  return concepts
    .map((concept) => ({ concept, questions: questionsForConcept(concept) }))
    .filter((c) => c.questions.length > 0);
}

export function prettyConcept(slug: string): string {
  return slug.replace(/-/g, " ");
}

/* ------------------------------------------------------------------ */
/* Descrição textual da resposta correta                              */
/* ------------------------------------------------------------------ */

/**
 * A resposta certa em uma linha, para o cartão de revisão.
 * Vive aqui, e não na página, porque é lógica pura sobre `Question`.
 */
export function describeAnswer(q: Question): string {
  if (q.type === "order") {
    return q.correctOrder
      .map((id) => q.items.find((i) => i.id === id)?.text ?? id)
      .join("  →  ");
  }
  if (q.type === "match") {
    return q.correctPairs
      .map((p) => {
        const l = q.left.find((x) => x.id === p.leftId)?.text ?? p.leftId;
        const r = q.right.find((x) => x.id === p.rightId)?.text ?? p.rightId;
        return `${l} → ${r}`;
      })
      .join("\n");
  }
  if (q.type === "judge") {
    const better = q.better === "left" ? q.left.label : q.right.label;
    const defects = q.defects
      .filter((d) => q.correctDefectIds.includes(d.id))
      .map((d) => d.text)
      .join(", ");
    return `${better} — na outra: ${defects}`;
  }
  return q.options
    .filter((o) => q.correctOptionIds.includes(o.id))
    .map((o) => o.text + (o.code ? ` (${o.code})` : ""))
    .join(", ");
}
