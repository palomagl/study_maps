/**
 * Gamificação: níveis, conquistas e missões.
 *
 * Tudo é DERIVADO do estado de progresso (funções puras). O store só guarda
 * `achievements` (ids desbloqueados) e `missionsClaimed` (bônus resgatados).
 * O nível não é guardado — é sempre calculado a partir do XP.
 */
import type { ProgressState } from "@/lib/progress-store";
import {
  completedLessonCount,
  completedStepCount,
  passedCheckpointCount,
  phaseComplete,
  stageComplete,
  trailComplete,
} from "@/lib/progress-selectors";
import { curriculum } from "@/content";

/* ------------------------------------------------------------------ */
/* Níveis                                                             */
/* ------------------------------------------------------------------ */

const LEVEL_TITLES = [
  "Explorador(a)",
  "Aprendiz",
  "Praticante",
  "Construtor(a)",
  "Desenvolvedor(a)",
  "Especialista",
  "Veterano(a)",
];

export function levelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level, LEVEL_TITLES.length) - 1] ?? "Veterano(a)";
}

/** XP acumulado necessário para ESTAR no nível `l` (l >= 1). */
export function cumulativeXpForLevel(l: number): number {
  return 50 * (l - 1) * l; // L1:0  L2:100  L3:300  L4:600  L5:1000  L6:1500
}

export interface LevelProgress {
  level: number;
  title: string;
  xp: number;
  floor: number;
  ceil: number;
  into: number;
  span: number;
  percent: number;
  toNext: number;
}

export function levelProgress(xp: number): LevelProgress {
  const safeXp = Math.max(0, Math.floor(xp) || 0);
  let level = 1;
  while (cumulativeXpForLevel(level + 1) <= safeXp) level++;
  const floor = cumulativeXpForLevel(level);
  const ceil = cumulativeXpForLevel(level + 1);
  const into = safeXp - floor;
  const span = ceil - floor;
  return {
    level,
    title: levelTitle(level),
    xp: safeXp,
    floor,
    ceil,
    into,
    span,
    percent: Math.round((into / span) * 100),
    toNext: ceil - safeXp,
  };
}

/* ------------------------------------------------------------------ */
/* Conquistas                                                         */
/* ------------------------------------------------------------------ */

export interface AchievementDef {
  id: string;
  icon: string;
  title: string;
  description: string;
  /** Verdadeiro quando a conquista deve estar desbloqueada. */
  test: (s: ProgressState) => boolean;
}

const anyStageComplete = (s: ProgressState): boolean =>
  curriculum.some((t) =>
    t.phases.some((p) => p.stages.some((stage) => stageComplete(s, stage))),
  );

export const ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "primeiro-passo",
    icon: "👣",
    title: "Primeiro Passo",
    description: "Você concluiu o primeiro passo de uma aula.",
    test: (s) => completedStepCount(s) >= 1,
  },
  {
    id: "primeira-aula",
    icon: "📘",
    title: "Primeira Aula",
    description: "Concluiu uma aula inteira, do conteúdo ao checkpoint.",
    test: (s) => completedLessonCount(s) >= 1,
  },
  {
    id: "primeiro-codigo",
    icon: "💻",
    title: "Primeiro Código",
    description: "Concluiu seu primeiro exercício prático.",
    test: (s) => completedStepCount(s, "practice") >= 1,
  },
  {
    id: "sem-medo",
    icon: "🔥",
    title: "Sem Medo",
    description: "Encarou e concluiu um desafio.",
    test: (s) => completedStepCount(s, "challenge") >= 1,
  },
  {
    id: "checkpoint-limpo",
    icon: "🎯",
    title: "Gabaritou",
    description: "Passou por um checkpoint acertando tudo.",
    test: (s) => passedCheckpointCount(s, { perfectOnly: true }) >= 1,
  },
  {
    id: "primeira-etapa",
    icon: "🏁",
    title: "Primeira Etapa",
    description: "Concluiu todas as aulas de uma etapa.",
    test: (s) => anyStageComplete(s),
  },
  {
    id: "roadmapper",
    icon: "🗺️",
    title: "Roadmapper",
    description: "Concluiu uma fase inteira de uma trilha.",
    test: (s) =>
      curriculum.some((t) => t.phases.some((p) => phaseComplete(s, p))),
  },
  {
    id: "constancia",
    icon: "📅",
    title: "Constância",
    description: "Estudou 3 dias seguidos.",
    test: (s) => s.streak.longest >= 3,
  },
  {
    id: "sequencia-7",
    icon: "🚀",
    title: "7 Dias",
    description: "Manteve uma sequência de 7 dias de estudo.",
    test: (s) => s.streak.longest >= 7,
  },
  {
    id: "nivel-5",
    icon: "⭐",
    title: "Nível 5",
    description: "Alcançou o nível 5.",
    test: (s) => levelProgress(s.xp).level >= 5,
  },
  {
    id: "criador",
    icon: "🏆",
    title: "Criador(a)",
    description: "Concluiu todas as aulas disponíveis de uma trilha.",
    test: (s) => curriculum.some((t) => trailComplete(s, t)),
  },
];

export interface AchievementView extends AchievementDef {
  earned: boolean;
}

export function achievementViews(s: ProgressState): AchievementView[] {
  return ACHIEVEMENTS.map((a) => ({ ...a, earned: s.achievements.includes(a.id) }));
}

/** Conquistas que já deveriam estar desbloqueadas mas ainda não estão. */
export function pendingAchievements(s: ProgressState): AchievementDef[] {
  return ACHIEVEMENTS.filter((a) => a.test(s) && !s.achievements.includes(a.id));
}

/* ------------------------------------------------------------------ */
/* Missões                                                            */
/* ------------------------------------------------------------------ */

export interface MissionDef {
  id: string;
  title: string;
  description: string;
  bonusXp: number;
  progress: (s: ProgressState) => { current: number; target: number };
}

export const MISSIONS: MissionDef[] = [
  {
    id: "m-primeira-aula",
    title: "Conclua sua primeira aula",
    description: "Passe por todos os passos de uma aula, do conteúdo ao checkpoint.",
    bonusXp: 40,
    progress: (s) => ({ current: completedLessonCount(s), target: 1 }),
  },
  {
    id: "m-tres-exercicios",
    title: "Pratique de verdade",
    description: "Conclua 3 exercícios práticos.",
    bonusXp: 30,
    progress: (s) => ({ current: completedStepCount(s, "practice"), target: 3 }),
  },
  {
    id: "m-explorador",
    title: "Explorador de recursos",
    description: "Explore os recursos recomendados de 2 aulas.",
    bonusXp: 20,
    progress: (s) => ({ current: completedStepCount(s, "explore"), target: 2 }),
  },
  {
    id: "m-nivel-3",
    title: "Chegue ao nível 3",
    description: "Acumule XP suficiente para o terceiro nível.",
    bonusXp: 60,
    progress: (s) => ({ current: levelProgress(s.xp).level, target: 3 }),
  },
];

export interface MissionView extends MissionDef {
  current: number;
  target: number;
  done: boolean;
  claimed: boolean;
  claimable: boolean;
}

export function missionViews(s: ProgressState): MissionView[] {
  return MISSIONS.map((m) => {
    const { current, target } = m.progress(s);
    const done = current >= target;
    const claimed = s.missionsClaimed.includes(m.id);
    return { ...m, current, target, done, claimed, claimable: done && !claimed };
  });
}
