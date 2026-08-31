/**
 * Seletores puros sobre o estado de progresso.
 *
 * Nada de React aqui — são funções `(state, ...args) => valor`, usadas pelo
 * hook `useProgress`, pela gamificação e pelo dashboard. Manter puro facilita
 * testar e, no futuro, rodar no servidor.
 */
import type { Lesson, Phase, Stage, Trail } from "@/content/types";
import { curriculum, flattenLessons, lessonSteps, type LessonLocation } from "@/content";
import type { ProgressState } from "@/lib/progress-store";

export interface LessonCompletion {
  doneSteps: number;
  totalSteps: number;
  percent: number;
  complete: boolean;
}

export function lessonCompletion(
  state: ProgressState,
  lesson: Lesson,
): LessonCompletion {
  const steps = lessonSteps(lesson);
  const stored = state.lessons[lesson.id]?.steps ?? {};
  const done = steps.filter((s) => stored[s] === true).length;
  const total = steps.length || 1;
  return {
    doneSteps: done,
    totalSteps: steps.length,
    percent: Math.round((done / total) * 100),
    complete: lesson.status === "available" && done === steps.length,
  };
}

export function lessonComplete(state: ProgressState, lesson: Lesson): boolean {
  return lessonCompletion(state, lesson).complete;
}

/** Aulas `available` de um agrupamento. */
function availableLessons(lessons: Lesson[]): Lesson[] {
  return lessons.filter((l) => l.status === "available");
}

function ratio(state: ProgressState, lessons: Lesson[]): number {
  const avail = availableLessons(lessons);
  if (avail.length === 0) return 0;
  const done = avail.filter((l) => lessonComplete(state, l)).length;
  return Math.round((done / avail.length) * 100);
}

function allComplete(state: ProgressState, lessons: Lesson[]): boolean {
  const avail = availableLessons(lessons);
  return avail.length > 0 && avail.every((l) => lessonComplete(state, l));
}

export const stageProgress = (state: ProgressState, stage: Stage) =>
  ratio(state, stage.lessons);

export const stageComplete = (state: ProgressState, stage: Stage) =>
  allComplete(state, stage.lessons);

export const phaseProgress = (state: ProgressState, phase: Phase) =>
  ratio(state, phase.stages.flatMap((s) => s.lessons));

export const phaseComplete = (state: ProgressState, phase: Phase) =>
  allComplete(state, phase.stages.flatMap((s) => s.lessons));

export const trailProgress = (state: ProgressState, trail: Trail) =>
  ratio(state, flattenLessons(trail).map((l) => l.lesson));

export const trailComplete = (state: ProgressState, trail: Trail) =>
  allComplete(state, flattenLessons(trail).map((l) => l.lesson));

/* ------------------------------------------------------------------ */
/* Agregados de plataforma                                            */
/* ------------------------------------------------------------------ */

export function completedLessonCount(state: ProgressState): number {
  let n = 0;
  for (const trail of curriculum) {
    for (const { lesson } of flattenLessons(trail)) {
      if (lessonComplete(state, lesson)) n++;
    }
  }
  return n;
}

export function completedStepCount(
  state: ProgressState,
  step?: string,
): number {
  let n = 0;
  for (const lp of Object.values(state.lessons)) {
    for (const [k, v] of Object.entries(lp.steps)) {
      if (v === true && (!step || k === step)) n++;
    }
  }
  return n;
}

export function passedCheckpointCount(
  state: ProgressState,
  opts: { perfectOnly?: boolean } = {},
): number {
  let n = 0;
  for (const lp of Object.values(state.lessons)) {
    const cp = lp.checkpoint;
    if (cp?.passed && (!opts.perfectOnly || cp.bestScore === cp.bestTotal)) n++;
  }
  return n;
}

export interface ConceptToReview {
  concept: string;
  errors: number;
  lastErrorAt: number;
  lessons: string[];
}

/** Conceitos com erro e ainda não resolvidos, do mais recente ao mais antigo. */
export function conceptsToReview(state: ProgressState): ConceptToReview[] {
  return Object.entries(state.concepts)
    .filter(([, c]) => !c.resolved && c.errors > 0)
    .map(([concept, c]) => ({
      concept,
      errors: c.errors,
      lastErrorAt: c.lastErrorAt,
      lessons: c.lessons,
    }))
    .sort((a, b) => b.errors - a.errors || b.lastErrorAt - a.lastErrorAt);
}

/** Um conceito "recorrente" (>= 2 erros) merece recomendação de revisão. */
export function hasRecurringDifficulty(state: ProgressState): boolean {
  return conceptsToReview(state).some((c) => c.errors >= 2);
}

/* ------------------------------------------------------------------ */
/* "Continuar estudando"                                              */
/* ------------------------------------------------------------------ */

/** Primeira aula `available` não concluída, respeitando a ordem do currículo. */
export function nextLesson(
  state: ProgressState,
  preferredTrailId?: string,
): LessonLocation | undefined {
  const trails = preferredTrailId
    ? [
        ...curriculum.filter((t) => t.id === preferredTrailId),
        ...curriculum.filter((t) => t.id !== preferredTrailId),
      ]
    : curriculum;

  for (const trail of trails) {
    for (const loc of flattenLessons(trail)) {
      if (loc.lesson.status !== "available") continue;
      if (!lessonComplete(state, loc.lesson)) return loc;
    }
  }
  return undefined;
}

/** Trilha em que o usuário tem progresso (a de maior % > 0). */
export function currentTrail(state: ProgressState): Trail | undefined {
  let best: { trail: Trail; pct: number } | undefined;
  for (const trail of curriculum) {
    const pct = trailProgress(state, trail);
    if (pct > 0 && (!best || pct > best.pct)) best = { trail, pct };
  }
  return best?.trail;
}

export function hasAnyProgress(state: ProgressState): boolean {
  return state.xp > 0 || Object.keys(state.lessons).length > 0;
}
