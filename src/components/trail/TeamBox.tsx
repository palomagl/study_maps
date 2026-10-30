import type { Trail } from "@/content/types";
import { Agent } from "@/components/agents/Agent";
import { useProgress } from "@/hooks/useProgress";
import { teamStatus } from "@/lib/progress-selectors";

/** "TEU TIME 2/6": quem já foi recrutado aparece colorido; o resto, de cadeado. */
export function TeamBox({ trail }: { trail: Trail }) {
  const { state } = useProgress();
  const team = teamStatus(state, trail);
  if (team.length === 0) return null;
  const recrutados = team.filter((m) => m.unlocked).length;

  return (
    <div className="flex-shrink-0 rounded-xl border border-border bg-card px-3.5 py-3">
      <p className="flex justify-between gap-6 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
        <span>TEU TIME</span>
        <b className="text-foreground">
          {recrutados}/{team.length}
        </b>
      </p>
      <div className="mt-2 flex gap-1">
        {team.map((m) => (
          <Agent key={m.kind} kind={m.unlocked ? m.kind : "bloqueado"} size={30} />
        ))}
      </div>
    </div>
  );
}
