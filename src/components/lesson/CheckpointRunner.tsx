import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Flag, PartyPopper, RotateCcw } from "lucide-react";
import type { Checkpoint, Question, QuestionAnswer } from "@/content/types";
import { emptyAnswer, gradeQuestion, gradeQuiz, isAnswerComplete } from "@/lib/questions";
import type { CheckpointRecord } from "@/lib/progress-store";
import { QuestionInput, QuestionPrompt } from "./QuestionInputs";

type Stage = "idle" | "running" | "result";

interface Props {
  checkpoint: Checkpoint;
  accentHsl: string;
  record: CheckpointRecord | null;
  conceptLabels?: Record<string, string>;
  onRecord: (r: { score: number; total: number; passed: boolean }) => void;
  onConceptError: (concept: string) => void;
  onPassed: () => void;
}

export function CheckpointRunner({
  checkpoint,
  accentHsl,
  record,
  conceptLabels = {},
  onRecord,
  onConceptError,
  onPassed,
}: Props) {
  const questions = checkpoint.questions;
  const total = questions.length;

  const [stage, setStage] = useState<Stage>(record?.passed ? "result" : "idle");
  const [answers, setAnswers] = useState<Record<string, QuestionAnswer>>({});
  const [outcome, setOutcome] = useState<ReturnType<typeof gradeQuiz> | null>(null);

  const allAnswered = useMemo(
    () => questions.every((q) => answers[q.id] && isAnswerComplete(q, answers[q.id])),
    [questions, answers],
  );

  const start = () => {
    setAnswers(Object.fromEntries(questions.map((q) => [q.id, emptyAnswer(q)])));
    setOutcome(null);
    setStage("running");
  };

  const submit = () => {
    if (!allAnswered) return;
    const result = gradeQuiz(questions, answers, checkpoint.passThreshold);
    setOutcome(result);
    onRecord({ score: result.correct, total: result.total, passed: result.passed });
    if (!result.passed) {
      questions.forEach((q) => {
        if (!gradeQuestion(q, answers[q.id])) onConceptError(q.concept);
      });
    } else {
      onPassed();
    }
    setStage("result");
  };

  /* ----- idle ----- */
  if (stage === "idle") {
    return (
      <div className="rounded-2xl border border-border bg-secondary/20 p-5 text-center">
        <Flag className="mx-auto mb-2 h-6 w-6" style={{ color: `hsl(${accentHsl})` }} />
        <p className="text-sm font-semibold text-foreground">
          {total} perguntas · meta {checkpoint.passThreshold}/{total}
        </p>
        <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground">
          Sem dicas desta vez — é a hora de mostrar que o conteúdo ficou. Errou? Sem
          drama: você vê o que revisar e pode refazer.
        </p>
        {record && record.attempts > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Melhor tentativa: {record.bestScore}/{record.bestTotal} ·{" "}
            {record.attempts} {record.attempts === 1 ? "tentativa" : "tentativas"}
          </p>
        )}
        <button
          type="button"
          onClick={start}
          className="mt-4 rounded-lg px-5 py-2 text-sm font-semibold text-primary-foreground"
          style={{ backgroundColor: `hsl(${accentHsl})` }}
        >
          {record?.attempts ? "Refazer checkpoint" : "Começar checkpoint"}
        </button>
      </div>
    );
  }

  /* ----- running ----- */
  if (stage === "running") {
    return (
      <div className="space-y-4">
        {questions.map((q: Question, i) => (
          <div key={q.id} className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
                {i + 1}
              </span>
              <span className="text-xs text-muted-foreground">de {total}</span>
            </div>
            <QuestionPrompt question={q} />
            <div className="mt-4">
              <QuestionInput
                question={q}
                answer={answers[q.id] ?? emptyAnswer(q)}
                onAnswer={(a) => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
                accentHsl={accentHsl}
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={submit}
          disabled={!allAnswered}
          className="w-full rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
          style={{ backgroundColor: `hsl(${accentHsl})` }}
        >
          Enviar respostas
        </button>
      </div>
    );
  }

  /* ----- result ----- */
  const finalOutcome =
    outcome ??
    (record
      ? {
          total: record.bestTotal,
          correct: record.bestScore,
          passed: record.passed,
          weakConcepts: [] as string[],
        }
      : null);

  if (!finalOutcome) return null;
  const passed = finalOutcome.passed;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl border p-5 ${
        passed
          ? "border-emerald-500/40 bg-emerald-500/[0.07]"
          : "border-amber-500/40 bg-amber-500/[0.07]"
      }`}
    >
      {passed ? (
        <>
          <div className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-emerald-400" />
            <p className="text-sm font-bold text-foreground">
              {checkpoint.successMessage}
            </p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Você acertou {finalOutcome.correct} de {finalOutcome.total}. +80 XP.
          </p>
        </>
      ) : (
        <>
          <p className="text-sm font-bold text-foreground">
            Faltou pouco — {finalOutcome.correct}/{finalOutcome.total} (meta{" "}
            {checkpoint.passThreshold})
          </p>
          {finalOutcome.weakConcepts.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Revise antes de tentar de novo
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {finalOutcome.weakConcepts.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs text-foreground"
                  >
                    {conceptLabels[c] ?? c}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="button"
            onClick={start}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" />
            Refazer checkpoint
          </button>
        </>
      )}
    </motion.div>
  );
}
