import { useEffect, useRef, useState } from "react";
import type { Question } from "@/content/types";
import { QuestionCard } from "./QuestionCard";

interface QuizProps {
  questions: Question[];
  accentHsl: string;
  alreadyDone: boolean;
  onComplete: () => void;
  onConceptError: (concept: string) => void;
}

export function Quiz({
  questions,
  accentHsl,
  alreadyDone,
  onComplete,
  onConceptError,
}: QuizProps) {
  const [settled, setSettled] = useState<Record<string, boolean>>({});
  const firedRef = useRef(alreadyDone);

  const settledCount = Object.keys(settled).length;
  const correctCount = Object.values(settled).filter(Boolean).length;

  useEffect(() => {
    if (!firedRef.current && settledCount === questions.length && questions.length > 0) {
      firedRef.current = true;
      onComplete();
    }
  }, [settledCount, questions.length, onComplete]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {settledCount}/{questions.length} respondidas
        </span>
        {settledCount > 0 && (
          <span>
            {correctCount} de primeira ·{" "}
            {settledCount - correctCount} exigiram revisão
          </span>
        )}
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${(settledCount / questions.length) * 100}%`,
            backgroundColor: `hsl(${accentHsl})`,
          }}
        />
      </div>

      {questions.map((q, i) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={i}
          accentHsl={accentHsl}
          onSettled={(correct) =>
            setSettled((prev) => ({ ...prev, [q.id]: correct }))
          }
          onConceptError={onConceptError}
        />
      ))}

      {settledCount === questions.length && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Bloco concluído.</span> Você
          revisou todas as perguntas — hora de praticar.
        </p>
      )}
    </div>
  );
}
