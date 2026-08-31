import { toast } from "sonner";
import type { AchievementDef, LevelProgress } from "@/lib/gamification";

/** Feedback visual curto e discreto (usa o toaster já montado no App). */

export function notifyXp(amount: number, label?: string): void {
  if (amount <= 0) return;
  toast.success(`+${amount} XP${label ? ` · ${label}` : ""}`, { duration: 1600 });
}

export function notifyAchievement(a: AchievementDef): void {
  toast(`${a.icon}  Conquista desbloqueada`, {
    description: `${a.title} — ${a.description}`,
    duration: 4000,
  });
}

export function notifyLevelUp(level: LevelProgress): void {
  toast(`⭐  Nível ${level.level}`, {
    description: `Agora você é ${level.title}.`,
    duration: 4000,
  });
}

export function notifyMissionClaimed(bonusXp: number): void {
  toast.success(`Missão concluída · +${bonusXp} XP`, { duration: 2400 });
}
