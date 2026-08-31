import { motion } from "framer-motion";
import { Check, Wrench } from "lucide-react";
import type { ProjectShowcase } from "@/content/types";

const difficultyMeta: Record<
  ProjectShowcase["difficulty"],
  { label: string; className: string }
> = {
  iniciante: { label: "Iniciante", className: "text-emerald-400 border-emerald-500/30" },
  intermediario: {
    label: "Intermediário",
    className: "text-sky-400 border-sky-500/30",
  },
  avancado: { label: "Avançado", className: "text-violet-400 border-violet-500/30" },
};

interface ProjectCardProps {
  project: ProjectShowcase;
  accentHsl: string;
  /** 0–100. Progresso da fase que libera o projeto. */
  readiness?: number;
  unlocked?: boolean;
  compact?: boolean;
}

export function ProjectCard({
  project,
  accentHsl,
  readiness = 0,
  unlocked = false,
  compact = false,
}: ProjectCardProps) {
  const diff = difficultyMeta[project.difficulty];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
    >
      {/* preview */}
      <div
        className="relative flex h-28 items-center justify-center border-b border-border"
        style={{
          background: `linear-gradient(135deg, hsl(${accentHsl} / 0.15), transparent)`,
        }}
      >
        <span className="text-3xl opacity-80" aria-hidden>
          {unlocked ? "🚀" : "🔒"}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full border bg-background/60 px-2 py-0.5 text-[11px] font-medium ${diff.className}`}
        >
          {diff.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-bold text-foreground">{project.title}</h3>
        <p className="text-xs font-medium" style={{ color: `hsl(${accentHsl})` }}>
          {project.tagline}
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {project.description}
        </p>

        {!compact && (
          <>
            <div className="mt-3">
              <p className="mb-1 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <Wrench className="h-3 w-3" /> Você vai praticar
              </p>
              <div className="flex flex-wrap gap-1">
                {project.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <ul className="mt-3 space-y-1">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-1.5 text-[11px] text-muted-foreground"
                >
                  <Check className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground/60" />
                  {f}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-auto pt-3">
          <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
            <span>{unlocked ? "Você já pode construir" : "Preparo da trilha"}</span>
            <span>{readiness}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${readiness}%`,
                backgroundColor: unlocked ? "hsl(142 71% 45%)" : `hsl(${accentHsl})`,
              }}
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
