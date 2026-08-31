import type { LessonStepId } from "@/content/types";

export interface StepperItem {
  id: LessonStepId | "reward" | "next";
  emoji: string;
  label: string;
}

export const FLOW: StepperItem[] = [
  { id: "learn", emoji: "📖", label: "Aprenda" },
  { id: "watch", emoji: "🎥", label: "Assista" },
  { id: "explore", emoji: "🔗", label: "Explore" },
  { id: "quiz", emoji: "🧠", label: "Teste" },
  { id: "practice", emoji: "💻", label: "Pratique" },
  { id: "challenge", emoji: "🔥", label: "Desafio" },
  { id: "checkpoint", emoji: "🏆", label: "Checkpoint" },
  { id: "reward", emoji: "⭐", label: "Recompensa" },
  { id: "next", emoji: "➡️", label: "Próxima" },
];

interface LessonStepperProps {
  /** Ids de passos que esta aula possui (na ordem do fluxo). */
  present: (LessonStepId | "reward" | "next")[];
  doneMap: Partial<Record<string, boolean>>;
  accentHsl: string;
}

export function LessonStepper({ present, doneMap, accentHsl }: LessonStepperProps) {
  const items = FLOW.filter((f) => present.includes(f.id));

  return (
    <nav aria-label="Etapas da aula" className="-mx-1 overflow-x-auto">
      <ol className="flex min-w-max items-center gap-1 px-1">
        {items.map((item, i) => {
          const done = doneMap[item.id] === true;
          return (
            <li key={item.id} className="flex items-center">
              <a
                href={`#step-${item.id}`}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors"
                style={{
                  borderColor: done ? `hsl(${accentHsl} / 0.5)` : "hsl(var(--border))",
                  backgroundColor: done ? `hsl(${accentHsl} / 0.12)` : "transparent",
                  color: done ? `hsl(${accentHsl})` : "hsl(var(--muted-foreground))",
                }}
              >
                <span aria-hidden>{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
              </a>
              {i < items.length - 1 && (
                <span className="mx-0.5 text-muted-foreground/40" aria-hidden>
                  ·
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
