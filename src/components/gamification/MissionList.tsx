import { Check } from "lucide-react";
import type { MissionView } from "@/lib/gamification";

interface MissionListProps {
  missions: MissionView[];
  onClaim: (id: string, bonusXp: number) => void;
  accentHsl?: string;
}

export function MissionList({
  missions,
  onClaim,
  accentHsl = "190 100% 50%",
}: MissionListProps) {
  return (
    <ul className="space-y-2.5">
      {missions.map((m) => {
        const pct = Math.min(100, Math.round((m.current / m.target) * 100));
        return (
          <li key={m.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </div>
              {m.claimed ? (
                <span className="flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-emerald-500">
                  <Check className="h-3.5 w-3.5" /> resgatada
                </span>
              ) : m.claimable ? (
                <button
                  type="button"
                  onClick={() => onClaim(m.id, m.bonusXp)}
                  className="flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  style={{ backgroundColor: `hsl(${accentHsl})` }}
                >
                  Resgatar +{m.bonusXp} XP
                </button>
              ) : (
                <span className="flex-shrink-0 text-xs text-muted-foreground">
                  +{m.bonusXp} XP
                </span>
              )}
            </div>

            <div className="mt-2.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: m.done
                      ? "hsl(142 71% 45%)"
                      : `hsl(${accentHsl})`,
                  }}
                />
              </div>
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {Math.min(m.current, m.target)}/{m.target}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
