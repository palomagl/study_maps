import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, CircleCheck, CircleX, Lightbulb } from "lucide-react";
import type { Question, QuestionAnswer } from "@/content/types";
import { emptyAnswer, gradeQuestion, isAnswerComplete } from "@/lib/questions";
import { QuestionInput, QuestionPrompt } from "./QuestionInputs";
import { renderInline } from "./inline-markdown";

type Phase = "answering" | "hint" | "explained" | "correct";

interface QuestionCardProps {
  question: Question;
  index: number;
  accentHsl: string;
  /** Chamado uma vez quando a pergunta é resolvida (acerto, ou explicação vista). */
  onSettled: (correct: boolean) => void;
  onConceptError: (concept: string) => void;
}

const skillLabel: Record<Question["skill"], string> = {
  compreensao: "Compreensão",
  aplicacao: "Aplicação",
  raciocinio: "Raciocínio",
};

export function QuestionCard({
  question,
  index,
  accentHsl,
  onSettled,
  onConceptError,
}: QuestionCardProps) {
  const [answer, setAnswer] = useState<QuestionAnswer>(() => emptyAnswer(question));
  const [phase, setPhase] = useState<Phase>("answering");
  const [wrongCount, setWrongCount] = useState(0);
  const [settledReported, setSettledReported] = useState(false);

  const locked = phase === "correct";
  const reveal = phase === "explained" || phase === "correct";

  const settleOnce = (correct: boolean) => {
    if (!settledReported) {
      setSettledReported(true);
      onSettled(correct);
    }
  };

  const submit = () => {
    if (!isAnswerComplete(question, answer)) return;
    const correct = gradeQuestion(question, answer);

    if (correct) {
      setPhase("correct");
      settleOnce(true);
      return;
    }

    const nextWrong = wrongCount + 1;
    setWrongCount(nextWrong);

    if (nextWrong === 1) {
      setPhase("hint");
    } else {
      setPhase("explained");
      onConceptError(question.concept);
      settleOnce(false);
    }
  };

  const retry = () => setPhase("answering");

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
          {index + 1}
        </span>
        <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
          {skillLabel[question.skill]}
        </span>
        {phase === "correct" && (
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-emerald-500">
            <CircleCheck className="h-3.5 w-3.5" /> Correto
          </span>
        )}
        {phase === "explained" && (
          <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-amber-500">
            revisar conceito
          </span>
        )}
      </div>

      <QuestionPrompt question={question} />

      <div className="mt-4">
        <QuestionInput
          question={question}
          answer={answer}
          onAnswer={setAnswer}
          disabled={locked}
          reveal={reveal}
          accentHsl={accentHsl}
        />
      </div>

      <AnimatePresence mode="wait">
        {phase === "hint" && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 text-sm">
              <CircleX className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
              <div className="text-muted-foreground">
                <span className="font-semibold text-foreground">Não é essa. </span>
                <span className="inline-flex items-center gap-1 font-medium text-amber-500">
                  <Lightbulb className="h-3.5 w-3.5" /> Dica:
                </span>{" "}
                {renderInline(question.hint)}
              </div>
            </div>
          </motion.div>
        )}

        {(phase === "explained" || phase === "correct") && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div
              className={`rounded-xl border p-3 text-sm ${
                phase === "correct"
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-border bg-secondary/30"
              }`}
            >
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {phase === "correct" ? "Por quê: " : "Explicação: "}
                </span>
                {renderInline(question.explanation)}
              </p>
              {phase === "explained" && question.reviewUrl && (
                <a
                  href={question.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Revisar o conceito
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase !== "correct" && (
        <div className="mt-4 flex gap-2">
          {(phase === "answering" || phase === "hint") && (
            <button
              type="button"
              onClick={submit}
              disabled={!isAnswerComplete(question, answer)}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
              style={{ backgroundColor: `hsl(${accentHsl})` }}
            >
              {phase === "hint" ? "Tentar de novo" : "Responder"}
            </button>
          )}
          {phase === "explained" && (
            <button
              type="button"
              onClick={retry}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Tentar novamente
            </button>
          )}
        </div>
      )}
    </div>
  );
}
