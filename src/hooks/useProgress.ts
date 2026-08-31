import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Lesson, LessonStepId, Phase, Stage, Trail } from "@/content/types";
import { XP_REWARD } from "@/content/types";
import { xpForStep } from "@/content";
import {
  EMPTY_LESSON_PROGRESS,
  progressStore,
  type LessonProgress,
  type ProgressState,
} from "@/lib/progress-store";
import {
  lessonComplete as selLessonComplete,
  lessonCompletion as selLessonCompletion,
  phaseProgress as selPhaseProgress,
  stageComplete as selStageComplete,
  stageProgress as selStageProgress,
  trailProgress as selTrailProgress,
  type LessonCompletion,
} from "@/lib/progress-selectors";
import { notifyXp } from "@/lib/notify";

export type { LessonCompletion };

/**
 * Ponte React ↔ progressStore. Store único para todo o app; sincroniza entre
 * abas via `useSyncExternalStore` + evento `storage`. As contas de progresso
 * ficam em `progress-selectors` (puras); aqui só ligamos ao React e ao feedback.
 */
export function useProgress() {
  const state = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getState,
    progressStore.getState,
  );

  const getLessonProgress = useCallback(
    (lessonId: string): LessonProgress =>
      state.lessons[lessonId] ?? EMPTY_LESSON_PROGRESS,
    [state],
  );

  const isStepDone = useCallback(
    (lessonId: string, step: LessonStepId): boolean =>
      state.lessons[lessonId]?.steps[step] === true,
    [state],
  );

  const completeStep = useCallback((lessonId: string, step: LessonStepId) => {
    const already = progressStore.getState().lessons[lessonId]?.steps[step] === true;
    progressStore.completeStep(lessonId, step, xpForStep(step));
    if (!already) notifyXp(xpForStep(step));
  }, []);

  const uncompleteStep = useCallback((lessonId: string, step: LessonStepId) => {
    progressStore.uncompleteStep(lessonId, step);
  }, []);

  const recordCheckpoint = useCallback(
    (
      lessonId: string,
      result: { score: number; total: number; passed: boolean },
    ) => {
      const before =
        progressStore.getState().lessons[lessonId]?.steps.checkpoint === true;
      progressStore.recordCheckpoint(lessonId, {
        ...result,
        xpOnPass: XP_REWARD.checkpoint,
      });
      if (result.passed && !before) notifyXp(XP_REWARD.checkpoint, "Checkpoint");
    },
    [],
  );

  const recordConceptError = useCallback((concept: string, lessonId: string) => {
    progressStore.recordConceptError(concept, lessonId);
  }, []);

  const resolveConcept = useCallback((concept: string) => {
    progressStore.resolveConcept(concept);
  }, []);

  const resetLesson = useCallback((lessonId: string) => {
    progressStore.resetLesson(lessonId);
  }, []);

  const getLessonCompletion = useCallback(
    (lesson: Lesson): LessonCompletion => selLessonCompletion(state, lesson),
    [state],
  );
  const isLessonComplete = useCallback(
    (lesson: Lesson) => selLessonComplete(state, lesson),
    [state],
  );
  const getStageProgress = useCallback(
    (stage: Stage) => selStageProgress(state, stage),
    [state],
  );
  const isStageComplete = useCallback(
    (stage: Stage) => selStageComplete(state, stage),
    [state],
  );
  const getPhaseProgress = useCallback(
    (phase: Phase) => selPhaseProgress(state, phase),
    [state],
  );
  const getTrailProgress = useCallback(
    (trail: Trail) => selTrailProgress(state, trail),
    [state],
  );

  return useMemo(
    () => ({
      state: state as ProgressState,
      xp: state.xp,
      streak: state.streak,
      concepts: state.concepts,
      achievements: state.achievements,
      profile: state.profile,
      getLessonProgress,
      isStepDone,
      completeStep,
      uncompleteStep,
      recordCheckpoint,
      recordConceptError,
      resolveConcept,
      resetLesson,
      getLessonCompletion,
      isLessonComplete,
      isStageComplete,
      getStageProgress,
      getPhaseProgress,
      getTrailProgress,
    }),
    [
      state,
      getLessonProgress,
      isStepDone,
      completeStep,
      uncompleteStep,
      recordCheckpoint,
      recordConceptError,
      resolveConcept,
      resetLesson,
      getLessonCompletion,
      isLessonComplete,
      isStageComplete,
      getStageProgress,
      getPhaseProgress,
      getTrailProgress,
    ],
  );
}
