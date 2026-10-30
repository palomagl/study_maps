/**
 * O mapa da trilha: uma carta por fase, com o agente dela, ligadas por uma
 * rota em zigue-zague (Tela 2 das maquetes). Clicar na carta abre a fase no
 * painel lateral, com as aulas e a dor de cada uma.
 */
import { useMemo } from "react";
import type { Trail } from "@/content/types";
import { Agent } from "@/components/agents/Agent";
import { useProgress } from "@/hooks/useProgress";
import { AGENTS } from "@/lib/agents";
import { nextLesson, teamStatus } from "@/lib/progress-selectors";
import { buildTrailMap, type PhaseNode } from "@/lib/roadmap-layout";

type Estado = "feito" | "atual" | "fechado";

/** Centro de cada carta no desenho da rota (0–1000 × 0–330). */
function pontos(n: number): { x: number; y: number }[] {
  return Array.from({ length: n }, (_, i) => ({
    x: ((i + 0.5) / n) * 1000,
    y: i % 2 === 0 ? 64 : 264,
  }));
}

/** Curva suave pelos pontos, sempre entrando e saindo na horizontal. */
function caminho(p: { x: number; y: number }[]): string {
  if (p.length < 2) return "";
  const dx = (p[1].x - p[0].x) / 2;
  let d = `M${p[0].x} ${p[0].y} C ${p[0].x + dx} ${p[0].y}, ${p[1].x - dx} ${p[1].y}, ${p[1].x} ${p[1].y}`;
  for (let i = 2; i < p.length; i++) d += ` S ${p[i].x - dx} ${p[i].y}, ${p[i].x} ${p[i].y}`;
  return d;
}

interface Props {
  trail: Trail;
  onSelect: (node: PhaseNode) => void;
}

const TeamRoute = ({ trail, onSelect }: Props) => {
  const { state } = useProgress();
  const team = teamStatus(state, trail);
  const fases = useMemo(
    () => buildTrailMap(trail).nodes.filter((n): n is PhaseNode => n.kind === "phase"),
    [trail],
  );
  const atual = nextLesson(state, trail.id)?.phase.id;

  // A rota acende em menta só até onde o time foi recrutado em sequência.
  let acesas = 0;
  while (acesas < team.length && team[acesas].unlocked) acesas++;
  const pts = pontos(fases.length);

  return (
    <div className="relative md:pb-[200px]">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[330px] w-full md:block"
        viewBox="0 0 1000 330"
        preserveAspectRatio="none"
      >
        <path d={caminho(pts)} stroke="hsl(var(--border))" strokeWidth="3" fill="none" strokeDasharray="8 10" />
        {acesas > 1 && (
          <path d={caminho(pts.slice(0, acesas))} stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
        )}
      </svg>

      <ol className="relative grid grid-cols-2 gap-x-3 gap-y-10 pt-8 sm:grid-cols-3 md:grid-cols-6 md:gap-y-0">
        {fases.map((node, i) => {
          const membro = team[i];
          const kind = membro?.kind;
          const lessons = node.phase.stages.flatMap((s) => s.lessons);
          const escritas = lessons.filter((l) => l.status === "available").length;
          const estado: Estado = membro?.unlocked
            ? "feito"
            : node.phase.id === atual
              ? "atual"
              : "fechado";
          const num = String(i + 1).padStart(2, "0");
          const nome = kind ? AGENTS[kind].label : node.phase.title;
          const info =
            `${lessons.length} aula${lessons.length === 1 ? "" : "s"}` +
            (estado === "feito" ? " · no time" : escritas === 0 ? " · em produção" : "");

          return (
            <li key={node.id} className={i % 2 === 1 ? "md:translate-y-[200px]" : ""}>
              <button
                type="button"
                onClick={() => onSelect(node)}
                aria-label={`Fase ${num}: ${nome} — ${node.phase.title}`}
                className="group relative mx-auto block w-full max-w-[150px] text-center"
              >
                {estado === "atual" && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-accent px-2.5 py-1 font-mono text-[11px] font-bold text-white">
                    TU TÁ AQUI
                  </span>
                )}
                <span
                  className={`relative mx-auto flex h-[128px] w-[110px] items-end justify-center rounded-[18px] border-[1.5px] bg-card pb-1.5 transition-colors ${
                    estado === "feito"
                      ? "border-primary/55"
                      : estado === "atual"
                        ? "border-accent bg-secondary shadow-[0_0_0_6px_rgb(124_92_255/0.14),0_18px_50px_rgb(124_92_255/0.35)]"
                        : "border-border group-hover:border-accent/60"
                  }`}
                >
                  <span className="absolute left-2.5 top-2 font-mono text-[10px] text-muted-foreground/70">
                    {num}
                  </span>
                  {estado === "feito" && (
                    <span className="absolute right-2.5 top-2 font-mono text-[10px] font-bold text-primary">✓</span>
                  )}
                  {kind && <Agent kind={estado === "fechado" ? "bloqueado" : kind} size={92} />}
                </span>
                <span
                  className={`mt-2.5 block font-display text-sm font-extrabold uppercase [font-stretch:112%] ${
                    estado === "fechado" ? "text-muted-foreground/60" : "text-foreground"
                  }`}
                >
                  {nome}
                </span>
                <span className="block text-xs text-muted-foreground/70">{info}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default TeamRoute;
