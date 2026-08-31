import { useEffect, useRef, useState } from "react";
import { CheckSquare, ChevronDown, Square } from "lucide-react";
import type { Challenge, Exercise } from "@/content/types";
import { renderInline } from "./inline-markdown";

function CodeSnippet({ code, note }: { code: string; note?: string }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-border bg-[hsl(215_28%_6%)]">
        <pre className="p-3 text-[13px] leading-relaxed">
          <code className="font-mono text-foreground/90">{code}</code>
        </pre>
      </div>
      {note && <p className="mt-1.5 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

function Reveal({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between p-3 text-sm font-medium text-foreground"
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="border-t border-border p-3">{children}</div>}
    </div>
  );
}

interface Props {
  exercise?: Exercise;
  challenge?: Challenge;
  variant: "exercise" | "challenge";
  accentHsl: string;
  alreadyDone: boolean;
  onComplete: () => void;
}

export function ExercisePanel({
  exercise,
  challenge,
  variant,
  accentHsl,
  alreadyDone,
  onComplete,
}: Props) {
  const isExercise = variant === "exercise";
  const data = isExercise ? exercise : challenge;
  const firedRef = useRef(alreadyDone);

  const checklist = isExercise
    ? exercise?.selfCheck ?? []
    : challenge?.requirements ?? [];

  const [checked, setChecked] = useState<boolean[]>(() => checklist.map(() => false));

  const allChecked = checked.length > 0 && checked.every(Boolean);

  useEffect(() => {
    if (!firedRef.current && allChecked) {
      firedRef.current = true;
      onComplete();
    }
  }, [allChecked, onComplete]);

  if (!data) return null;

  const steps = isExercise ? exercise?.steps : undefined;
  const starter = isExercise ? exercise?.starter : undefined;
  const hints = data.hints ?? [];
  const solution = data.solution;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{data.title}</p>
        <p className="mt-1 text-[15px] leading-7 text-muted-foreground">
          {renderInline(data.statement)}
        </p>
      </div>

      {steps && steps.length > 0 && (
        <ol className="list-decimal space-y-1.5 rounded-xl border border-border bg-secondary/20 p-4 pl-8 text-sm leading-7 text-muted-foreground">
          {steps.map((s, i) => (
            <li key={i}>{renderInline(s)}</li>
          ))}
        </ol>
      )}

      {starter && <CodeSnippet code={starter.code} />}

      {hints.length > 0 && (
        <Reveal label={`Dicas (${hints.length})`}>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-7 text-muted-foreground">
            {hints.map((h, i) => (
              <li key={i}>{renderInline(h)}</li>
            ))}
          </ul>
        </Reveal>
      )}

      {solution && (
        <Reveal label="Ver solução">
          <CodeSnippet code={solution.code} note={solution.note} />
        </Reveal>
      )}

      <div className="rounded-xl border border-border bg-card/60 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isExercise ? "Marque quando conseguir" : "Requisitos entregues"}
        </p>
        <div className="space-y-1.5">
          {checklist.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() =>
                setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))
              }
              className="flex w-full items-start gap-2.5 rounded-lg p-2 text-left text-sm hover:bg-secondary/40"
            >
              {checked[i] ? (
                <CheckSquare
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: `hsl(${accentHsl})` }}
                />
              ) : (
                <Square className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              )}
              <span
                className={
                  checked[i] ? "text-muted-foreground line-through" : "text-foreground"
                }
              >
                {renderInline(item)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
