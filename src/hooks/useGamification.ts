import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSyncExternalStore } from "react";
import { progressStore } from "@/lib/progress-store";
import {
  achievementViews,
  levelProgress,
  missionViews,
  pendingAchievements,
} from "@/lib/gamification";
import { notifyAchievement, notifyLevelUp, notifyMissionClaimed } from "@/lib/notify";

interface UseGamificationOptions {
  /** Dispara toasts de conquista/nível. Apenas UMA instância deve ativar isto. */
  withToasts?: boolean;
}

export function useGamification(options: UseGamificationOptions = {}) {
  const { withToasts = false } = options;

  const state = useSyncExternalStore(
    progressStore.subscribe,
    progressStore.getState,
    progressStore.getState,
  );

  const level = useMemo(() => levelProgress(state.xp), [state.xp]);
  const achievements = useMemo(() => achievementViews(state), [state]);
  const missions = useMemo(() => missionViews(state), [state]);
  const earnedCount = achievements.filter((a) => a.earned).length;

  const prevLevel = useRef(level.level);

  // Desbloqueia conquistas pendentes assim que as condições passam a valer.
  // Só a instância com `withToasts` grava/notifica — evita corrida entre
  // múltiplas instâncias do hook "roubando" o toast.
  useEffect(() => {
    if (!withToasts) return;
    const pending = pendingAchievements(state);
    if (pending.length === 0) return;
    const fresh = progressStore.unlockAchievements(pending.map((a) => a.id));
    for (const id of fresh) {
      const def = pending.find((a) => a.id === id);
      if (def) notifyAchievement(def);
    }
  }, [state, withToasts]);

  // Toast de subida de nível (nunca no primeiro render).
  useEffect(() => {
    if (withToasts && level.level > prevLevel.current) {
      notifyLevelUp(level);
    }
    prevLevel.current = level.level;
  }, [level, withToasts]);

  const claimMission = useCallback((id: string, bonusXp: number) => {
    const ok = progressStore.claimMission(id, bonusXp);
    if (ok && withToasts) notifyMissionClaimed(bonusXp);
    return ok;
  }, [withToasts]);

  return { level, achievements, missions, earnedCount, claimMission };
}
