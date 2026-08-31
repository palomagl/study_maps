import { Link } from "react-router-dom";
import type { LevelProgress } from "@/lib/gamification";

/** Pílula compacta de nível + XP (usada no Header). */
export function LevelPill({ level }: { level: LevelProgress }) {
  return (
    <Link
      to="/painel"
      className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs transition-colors hover:border-primary/40"
    >
      <span className="font-bold text-foreground">Nv {level.level}</span>
      <span className="hidden h-3 w-px bg-border sm:block" />
      <span className="hidden text-muted-foreground sm:block">{level.xp} XP</span>
    </Link>
  );
}

/** Cartão completo de nível, com barra de progresso até o próximo. */
export function LevelCard({
  level,
  accentHsl = "190 100% 50%",
}: {
  level: LevelProgress;
  accentHsl?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Nível {level.level}
          </p>
          <p className="text-lg font-bold text-foreground">{level.title}</p>
        </div>
        <p className="text-sm font-semibold text-foreground">{level.xp} XP</p>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${level.percent}%`,
            backgroundColor: `hsl(${accentHsl})`,
          }}
        />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {level.toNext} XP para o nível {level.level + 1}
      </p>
    </div>
  );
}
