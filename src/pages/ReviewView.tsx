import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from "lucide-react";
import Header from "@/components/Header";
import { useProgress } from "@/hooks/useProgress";
import { conceptsToReview } from "@/lib/progress-selectors";
import { buildReviewDeck, prettyConcept, type ReviewQuestion } from "@/lib/review";
import type { Question } from "@/content/types";
import { renderInline } from "@/components/lesson/inline-markdown";

function describeAnswer(q: Question): string {
  if (q.type === "order") {
    return q.correctOrder
      .map((id) => q.items.find((i) => i.id === id)?.text ?? id)
      .join("  →  ");
  }
  if (q.type === "match") {
    return q.correctPairs
      .map((p) => {
        const l = q.left.find((x) => x.id === p.leftId)?.text ?? p.leftId;
        const r = q.right.find((x) => x.id === p.rightId)?.text ?? p.rightId;
        return `${l} → ${r}`;
      })
      .join("\n");
  }
  return q.options
    .filter((o) => q.correctOptionIds.includes(o.id))
    .map((o) => o.text + (o.code ? ` (${o.code})` : ""))
    .join(", ");
}

const ReviewView = () => {
  const { state, resolveConcept } = useProgress();

  // Congela a lista de conceitos ao montar, para o baralho não encolher
  // debaixo do usuário conforme ele resolve conceitos.
  const concepts = useMemo(
    () => conceptsToReview(state).map((c) => c.concept),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const deck = useMemo(() => buildReviewDeck(concepts), [concepts]);

  const flat: { rq: ReviewQuestion; concept: string }[] = useMemo(
    () =>
      deck.flatMap((c) => c.questions.map((rq) => ({ rq, concept: c.concept }))),
    [deck],
  );

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [correctIds, setCorrectIds] = useState<Set<string>>(new Set());
  const [resolvedConcepts, setResolvedConcepts] = useState<string[]>([]);

  if (concepts.length === 0 || flat.length === 0) {
    return (
      <Shell>
        <div className="rounded-2xl border border-dashed border-border bg-secondary/10 p-8 text-center">
          <p className="text-sm font-semibold text-foreground">
            Nada para revisar agora. 🎯
          </p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Quando você errar uma pergunta, o conceito entra aqui como flashcard
            até você revisá-lo.
          </p>
          <Link
            to="/painel"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline"
          >
            Voltar ao painel
          </Link>
        </div>
      </Shell>
    );
  }

  const done = index >= flat.length;

  if (done) {
    return (
      <Shell>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.07] p-8 text-center"
        >
          <p className="text-base font-bold text-foreground">Revisão concluída</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {resolvedConcepts.length > 0
              ? `${resolvedConcepts.length} conceito(s) marcados como revisados.`
              : "Continue praticando os conceitos que ainda pesam."}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIndex(0);
                setRevealed(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              <RotateCcw className="h-4 w-4" /> Rever de novo
            </button>
            <Link
              to="/painel"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Voltar ao painel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </Shell>
    );
  }

  const { rq, concept } = flat[index];
  const q = rq.question;

  const advance = () => {
    setRevealed(false);
    setIndex((i) => i + 1);
  };

  const markCorrect = () => {
    const nextCorrect = new Set(correctIds).add(q.id);
    setCorrectIds(nextCorrect);

    const conceptQ = flat.filter((f) => f.concept === concept).map((f) => f.rq.question.id);
    if (conceptQ.every((id) => nextCorrect.has(id)) && !resolvedConcepts.includes(concept)) {
      resolveConcept(concept);
      setResolvedConcepts((r) => [...r, concept]);
    }
    advance();
  };

  return (
    <Shell>
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="capitalize">
          Conceito: <strong className="text-foreground">{prettyConcept(concept)}</strong>
        </span>
        <span>
          {index + 1} / {flat.length}
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${(index / flat.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="mt-4 rounded-2xl border border-border bg-card p-5 sm:p-6"
        >
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {rq.lessonTitle}
          </p>
          <p className="mt-2 text-[15px] font-medium leading-7 text-foreground">
            {renderInline(q.prompt)}
          </p>
          {q.code && (
            <div className="mt-3 overflow-x-auto rounded-lg border border-border bg-[hsl(215_28%_6%)]">
              <pre className="p-3 text-[13px]">
                <code className="font-mono text-foreground/90">{q.code.code}</code>
              </pre>
            </div>
          )}

          {!revealed ? (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Revelar resposta
            </button>
          ) : (
            <>
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
                  Resposta
                </p>
                <p className="mt-1 whitespace-pre-line text-sm text-foreground">
                  {describeAnswer(q)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                <span className="font-semibold text-foreground">Por quê: </span>
                {renderInline(q.explanation)}
              </p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={markCorrect}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  <Check className="h-4 w-4" /> Acertei
                </button>
                <button
                  type="button"
                  onClick={advance}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  <X className="h-4 w-4" /> Ainda não
                </button>
              </div>
              <Link
                to={`/roadmap/${rq.trailId}/aula/${rq.lessonId}`}
                className="mt-3 block text-center text-xs text-muted-foreground underline hover:text-foreground"
              >
                revisar a aula "{rq.lessonTitle}"
              </Link>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />
      <main className="mx-auto max-w-xl px-4 pb-20 pt-24">
        <Link
          to="/painel"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Painel
        </Link>
        <h1 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">
          Revisão
        </h1>
        {children}
      </main>
    </div>
  );
}

export default ReviewView;
