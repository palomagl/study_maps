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
                className="flex flex-col gap-1.5 px-1 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-colors"
                style={{ color: done ? `hsl(${accentHsl})` : "hsl(var(--muted-foreground))" }}
              >
                {/* pílula fina: feita em menta, a fazer apagada */}
                <span
                  aria-hidden
                  className="block h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: done ? `hsl(${accentHsl})` : "hsl(var(--secondary))" }}
                />
                <span>{item.label}</span>
              </a>
              {i < items.length - 1 && <span className="w-0.5" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
