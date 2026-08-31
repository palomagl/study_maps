import { ArrowDown, ArrowUp, Check, X } from "lucide-react";
import type {
  ChoiceQuestion,
  MatchQuestion,
  OrderQuestion,
  Question,
  QuestionAnswer,
} from "@/content/types";
import { renderInline } from "./inline-markdown";

/* ---------------- enunciado ---------------- */

export function QuestionPrompt({ question }: { question: Question }) {
  return (
    <div className="space-y-3">
      <p className="text-[15px] font-medium leading-7 text-foreground">
        {renderInline(question.prompt)}
      </p>
      {question.code && (
        <div className="overflow-x-auto rounded-lg border border-border bg-[hsl(215_28%_6%)]">
          <pre className="p-3 text-[13px] leading-relaxed">
            <code className="font-mono text-foreground/90">{question.code.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

/* ---------------- múltipla escolha / V-F / código ---------------- */

interface ChoiceProps {
  question: ChoiceQuestion;
  value: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
  reveal?: boolean;
  accentHsl: string;
}

export function ChoiceInput({
  question,
  value,
  onChange,
  disabled,
  reveal,
  accentHsl,
}: ChoiceProps) {
  const multi = question.type === "multiple";

  const toggle = (id: string) => {
    if (disabled) return;
    if (multi) {
      onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);
    } else {
      onChange([id]);
    }
  };

  return (
    <div className="space-y-2">
      {question.options.map((opt) => {
        const selected = value.includes(opt.id);
        const isCorrect = question.correctOptionIds.includes(opt.id);
        let tone = "border-border bg-secondary/20 hover:bg-secondary/40";
        if (reveal && isCorrect) tone = "border-emerald-500/50 bg-emerald-500/10";
        else if (reveal && selected && !isCorrect)
          tone = "border-red-500/50 bg-red-500/10";
        else if (selected) tone = "border-transparent";

        return (
          <button
            key={opt.id}
            type="button"
            disabled={disabled}
            onClick={() => toggle(opt.id)}
            aria-pressed={selected}
            className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition-colors disabled:cursor-not-allowed ${tone}`}
            style={
              selected && !reveal
                ? {
                    backgroundColor: `hsl(${accentHsl} / 0.12)`,
                    borderColor: `hsl(${accentHsl} / 0.5)`,
                  }
                : undefined
            }
          >
            <span
              className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border ${
                multi ? "rounded" : "rounded-full"
              } ${selected ? "border-transparent" : "border-muted-foreground/40"}`}
              style={selected ? { backgroundColor: `hsl(${accentHsl})` } : undefined}
            >
              {selected && <Check className="h-3 w-3 text-primary-foreground" />}
            </span>
            <span className="flex-1 text-foreground">
              {renderInline(opt.text)}
              {opt.code && (
                <code className="ml-1 rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]">
                  {opt.code}
                </code>
              )}
            </span>
            {reveal && isCorrect && (
              <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" />
            )}
            {reveal && selected && !isCorrect && (
              <X className="h-4 w-4 flex-shrink-0 text-red-500" />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- ordenar ---------------- */

interface OrderProps {
  question: OrderQuestion;
  value: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
  reveal?: boolean;
}

export function OrderInput({ question, value, onChange, disabled, reveal }: OrderProps) {
  const order = value.length === question.items.length ? value : question.items.map((i) => i.id);
  const label = (id: string) => question.items.find((i) => i.id === id)?.text ?? "";

  const move = (idx: number, dir: -1 | 1) => {
    if (disabled) return;
    const next = [...order];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <ol className="space-y-2">
      {order.map((id, idx) => {
        const rightHere = reveal && question.correctOrder[idx] === id;
        const wrongHere = reveal && question.correctOrder[idx] !== id;
        return (
          <li
            key={id}
            className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
              rightHere
                ? "border-emerald-500/50 bg-emerald-500/10"
                : wrongHere
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-border bg-secondary/20"
            }`}
          >
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-muted-foreground">
              {idx + 1}
            </span>
            <span className="flex-1 text-foreground">{label(id)}</span>
            <span className="flex flex-shrink-0 flex-col">
              <button
                type="button"
                aria-label="Mover para cima"
                disabled={disabled || idx === 0}
                onClick={() => move(idx, -1)}
                className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Mover para baixo"
                disabled={disabled || idx === order.length - 1}
                onClick={() => move(idx, 1)}
                className="rounded p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- relacionar ---------------- */

interface MatchProps {
  question: MatchQuestion;
  value: { leftId: string; rightId: string }[];
  onChange: (pairs: { leftId: string; rightId: string }[]) => void;
  disabled?: boolean;
  reveal?: boolean;
}

export function MatchInput({ question, value, onChange, disabled, reveal }: MatchProps) {
  const pick = (leftId: string, rightId: string) => {
    if (disabled) return;
    const rest = value.filter((p) => p.leftId !== leftId);
    onChange(rightId ? [...rest, { leftId, rightId }] : rest);
  };
  const selectedRight = (leftId: string) =>
    value.find((p) => p.leftId === leftId)?.rightId ?? "";
  const correctRight = (leftId: string) =>
    question.correctPairs.find((p) => p.leftId === leftId)?.rightId;

  return (
    <div className="space-y-2">
      {question.left.map((l) => {
        const chosen = selectedRight(l.id);
        const ok = reveal && chosen === correctRight(l.id);
        const bad = reveal && chosen !== correctRight(l.id);
        return (
          <div
            key={l.id}
            className={`flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center ${
              ok
                ? "border-emerald-500/50 bg-emerald-500/10"
                : bad
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-border bg-secondary/20"
            }`}
          >
            <span className="flex-1 text-sm font-medium text-foreground">{l.text}</span>
            <select
              disabled={disabled}
              value={chosen}
              onChange={(e) => pick(l.id, e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-60 sm:w-64"
            >
              <option value="">Selecione…</option>
              {question.right.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.text}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- dispatcher ---------------- */

interface QuestionInputProps {
  question: Question;
  answer: QuestionAnswer;
  onAnswer: (a: QuestionAnswer) => void;
  disabled?: boolean;
  reveal?: boolean;
  accentHsl: string;
}

export function QuestionInput({
  question,
  answer,
  onAnswer,
  disabled,
  reveal,
  accentHsl,
}: QuestionInputProps) {
  if (question.type === "order") {
    return (
      <OrderInput
        question={question}
        value={answer.kind === "order" ? answer.itemIds : []}
        onChange={(itemIds) => onAnswer({ kind: "order", itemIds })}
        disabled={disabled}
        reveal={reveal}
      />
    );
  }
  if (question.type === "match") {
    return (
      <MatchInput
        question={question}
        value={answer.kind === "match" ? answer.pairs : []}
        onChange={(pairs) => onAnswer({ kind: "match", pairs })}
        disabled={disabled}
        reveal={reveal}
      />
    );
  }
  return (
    <ChoiceInput
      question={question}
      value={answer.kind === "choice" ? answer.optionIds : []}
      onChange={(optionIds) => onAnswer({ kind: "choice", optionIds })}
      disabled={disabled}
      reveal={reveal}
      accentHsl={accentHsl}
    />
  );
}
