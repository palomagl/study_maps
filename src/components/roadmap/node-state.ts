/**
 * Estado visual de um nó do mapa.
 *
 * A diferença central para um roadmap de marcar caixinha: aqui o estado é
 * **derivado do progresso real** (passos concluídos da aula), nunca declarado
 * pelo usuário. `active` significa "começou e não terminou".
 */
import type { Lesson, Phase, Stage } from "@/content/types";
import type { ProgressState } from "@/lib/progress-store";
import {
  lessonCompletion,
  phaseComplete,
  phaseProgress,
  stageComplete,
  stageProgress,
} from "@/lib/progress-selectors";

export type NodeState = "done" | "active" | "todo" | "draft";

export interface NodeStatus {
  state: NodeState;
  /** 0–100. */
  percent: number;
}

const hasAvailable = (lessons: Lesson[]) =>
  lessons.some((l) => l.status === "available");

function from(percent: number, available: boolean): NodeStatus {
  if (!available) return { state: "draft", percent: 0 };
  if (percent >= 100) return { state: "done", percent: 100 };
  return { state: percent > 0 ? "active" : "todo", percent };
}

export function lessonStatus(state: ProgressState, lesson: Lesson): NodeStatus {
  if (lesson.status !== "available") return { state: "draft", percent: 0 };
  const c = lessonCompletion(state, lesson);
  return {
    state: c.complete ? "done" : c.doneSteps > 0 ? "active" : "todo",
    percent: c.percent,
  };
}

export function stageStatus(state: ProgressState, stage: Stage): NodeStatus {
  const available = hasAvailable(stage.lessons);
  if (stageComplete(state, stage)) return { state: "done", percent: 100 };
  return from(stageProgress(state, stage), available);
}

export function phaseStatus(state: ProgressState, phase: Phase): NodeStatus {
  const lessons = phase.stages.flatMap((s) => s.lessons);
  if (phaseComplete(state, phase)) return { state: "done", percent: 100 };
  return from(phaseProgress(state, phase), hasAvailable(lessons));
}

/** Estado de cada nó do mapa, por id — o mapa inteiro numa passada só. */
export function buildStatusMap(
  state: ProgressState,
  phases: Phase[],
): Record<string, NodeStatus> {
  const out: Record<string, NodeStatus> = {};
  for (const phase of phases) {
    out[phase.id] = phaseStatus(state, phase);
    for (const stage of phase.stages) {
      out[stage.id] = stageStatus(state, stage);
      for (const lesson of stage.lessons) {
        out[lesson.id] = lessonStatus(state, lesson);
      }
    }
  }
  return out;
}
