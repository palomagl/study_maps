import type {
  Lesson,
  LessonStepId,
  Phase,
  Stage,
  StageStats,
  Trail,
  TrailId,
  TrailStats,
} from "@/content/types";
import { XP_REWARD } from "@/content/types";
import { frontendTrail } from "@/content/trails/frontend";
import { backendTrail } from "@/content/trails/backend";
import { fullstackTrail } from "@/content/trails/fullstack";

export * from "@/content/types";

/** Todo o conteúdo da plataforma. Ordem = ordem de exibição. */
export const curriculum: Trail[] = [frontendTrail, backendTrail, fullstackTrail];

/* ------------------------------------------------------------------ */
/* Seletores                                                          */
/* ------------------------------------------------------------------ */

export function getTrail(id: string | undefined): Trail | undefined {
  return curriculum.find((t) => t.id === id);
}

export interface LessonLocation {
  trail: Trail;
  phase: Phase;
  stage: Stage;
  lesson: Lesson;
  /** Índice da aula na lista achatada da trilha (0-based). */
  indexInTrail: number;
}

/** Lista achatada de todas as aulas de uma trilha, com seu contexto. */
export function flattenLessons(trail: Trail): LessonLocation[] {
  const out: LessonLocation[] = [];
  let i = 0;
  for (const phase of trail.phases) {
    for (const stage of phase.stages) {
      for (const lesson of stage.lessons) {
        out.push({ trail, phase, stage, lesson, indexInTrail: i++ });
      }
    }
  }
  return out;
}

export function getLessonLocation(
  trailId: string | undefined,
  lessonId: string | undefined,
): LessonLocation | undefined {
  const trail = getTrail(trailId);
  if (!trail) return undefined;
  return flattenLessons(trail).find((l) => l.lesson.id === lessonId);
}

/** Aula anterior e próxima dentro da mesma trilha (fronteira de fase/etapa incluída). */
export function getAdjacentLessons(
  trailId: string | undefined,
  lessonId: string | undefined,
): { prev?: LessonLocation; next?: LessonLocation } {
  const trail = getTrail(trailId);
  if (!trail) return {};
  const all = flattenLessons(trail);
  const idx = all.findIndex((l) => l.lesson.id === lessonId);
  if (idx === -1) return {};
  return { prev: all[idx - 1], next: all[idx + 1] };
}

/** Primeira aula `available` da trilha (fallback: a primeira de todas). */
export function getFirstLesson(trailId: string): LessonLocation | undefined {
  const trail = getTrail(trailId);
  if (!trail) return undefined;
  const all = flattenLessons(trail);
  return all.find((l) => l.lesson.status === "available") ?? all[0];
}

/* ------------------------------------------------------------------ */
/* XP                                                                 */
/* ------------------------------------------------------------------ */

/** Passos que uma aula específica oferece (sem exercício/desafio se não existirem). */
export function lessonSteps(lesson: Lesson): LessonStepId[] {
  const steps: LessonStepId[] = ["learn"];
  if (lesson.video) steps.push("watch");
  if (lesson.freeResources.length > 0) steps.push("explore");
  if (lesson.questions.length > 0) steps.push("quiz");
  if (lesson.exercise) steps.push("practice");
  if (lesson.challenge) steps.push("challenge");
  if (lesson.checkpoint.questions.length > 0) steps.push("checkpoint");
  return steps;
}

export function xpForStep(step: LessonStepId): number {
  return XP_REWARD[step];
}

/** XP máximo obtível numa aula. */
export function lessonMaxXp(lesson: Lesson): number {
  return lessonSteps(lesson).reduce((sum, s) => sum + xpForStep(s), 0);
}

/* ------------------------------------------------------------------ */
/* Estatísticas                                                       */
/* ------------------------------------------------------------------ */

function countQuestions(lesson: Lesson): number {
  return lesson.questions.length + lesson.checkpoint.questions.length;
}

export function getStageStats(stage: Stage): StageStats {
  return stage.lessons.reduce<StageStats>(
    (acc, lesson) => {
      acc.lessons += 1;
      if (lesson.status === "available") acc.availableLessons += 1;
      if (lesson.exercise) acc.exercises += 1;
      acc.totalXp += lessonMaxXp(lesson);
      return acc;
    },
    { lessons: 0, availableLessons: 0, exercises: 0, totalXp: 0 },
  );
}

export function getTrailStats(trailId: string): TrailStats {
  const empty: TrailStats = {
    phases: 0,
    stages: 0,
    lessons: 0,
    availableLessons: 0,
    questions: 0,
    exercises: 0,
    challenges: 0,
    totalXp: 0,
  };
  const trail = getTrail(trailId);
  if (!trail) return empty;

  for (const phase of trail.phases) {
    empty.phases += 1;
    for (const stage of phase.stages) {
      empty.stages += 1;
      for (const lesson of stage.lessons) {
        empty.lessons += 1;
        if (lesson.status === "available") empty.availableLessons += 1;
        if (lesson.exercise) empty.exercises += 1;
        if (lesson.challenge) empty.challenges += 1;
        empty.questions += countQuestions(lesson);
        empty.totalXp += lessonMaxXp(lesson);
      }
    }
  }
  return empty;
}

/** Todas as aulas de todas as trilhas — útil para dashboard e revisão. */
export function allLessonLocations(): LessonLocation[] {
  return curriculum.flatMap((t) => flattenLessons(t));
}

export const trailIdList: TrailId[] = curriculum.map((t) => t.id);
