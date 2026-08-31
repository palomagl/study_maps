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
