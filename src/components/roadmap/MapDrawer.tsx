/**
 * Painel lateral do mapa.
 *
 * Clicar num nó abre aqui em vez de navegar: dá pra explorar a trilha inteira
 * sem perder o lugar. O botão "Abrir aula" é que leva ao fluxo de estudo.
 */
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Lock, Sparkles, X, Zap } from "lucide-react";
import type { Lesson, Trail } from "@/content/types";
import { lessonMaxXp, lessonSteps } from "@/content";
import type { LessonNode, MapNode, PhaseNode, StageNode } from "@/lib/roadmap-layout";
import { useProgress } from "@/hooks/useProgress";
import { FLOW } from "@/components/lesson/LessonStepper";
import { buildStatusMap, type NodeStatus } from "./node-state";

const difficultyLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

function StatusPill({ status, accent }: { status: NodeStatus; accent: string }) {
  const map = {
    done: { label: "Concluído", icon: <Check className="h-3 w-3" /> },
    active: { label: `${status.percent}% feito`, icon: null },
    todo: { label: "Não iniciado", icon: null },
    draft: { label: "Em produção", icon: <Lock className="h-3 w-3" /> },
  } as const;
  const { label, icon } = map[status.state];
  const lit = status.state === "done" || status.state === "active";

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold"
      style={{
        borderColor: lit ? `hsl(${accent} / 0.4)` : "hsl(var(--border))",
        backgroundColor: lit ? `hsl(${accent} / 0.1)` : "transparent",
        color: lit ? `hsl(${accent})` : "hsl(var(--muted-foreground))",
      }}
    >
      {icon}
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Conteúdo por tipo de nó                                            */
/* ------------------------------------------------------------------ */

function LessonPanel({
  node,
  trail,
  accent,
}: {
  node: LessonNode;
  trail: Trail;
  accent: string;
}) {
  const { getLessonProgress } = useProgress();
  const lesson = node.lesson;
  const draft = lesson.status !== "available";
  const steps = lessonSteps(lesson);
  const doneMap = getLessonProgress(lesson.id).steps;
  const items = FLOW.filter((f) => steps.includes(f.id as never));

  return (
    <>
      <p className="text-sm leading-6 text-muted-foreground">
        {draft
          ? "Esta aula já tem lugar na trilha — o conteúdo está sendo escrito."
          : lesson.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {lesson.estimatedMinutes && (
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.estimatedMinutes} min
          </span>
        )}
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          até {lessonMaxXp(lesson)} XP
        </span>
      </div>

      {!draft && lesson.learningObjectives.length > 0 && (
        <section className="mt-5">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            O que você vai aprender
          </h4>
          <ul className="space-y-1.5">
            {lesson.learningObjectives.map((o) => (
              <li key={o} className="flex gap-2 text-sm text-foreground">
                <span style={{ color: `hsl(${accent})` }}>·</span>
                <span className="leading-6">{o}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {!draft && (
        <section className="mt-5">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Passos da aula
          </h4>
          <ul className="space-y-1">
            {items.map((item) => {
              const done = doneMap[item.id as never] === true;
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs"
                  style={{
                    borderColor: done
                      ? `hsl(${accent} / 0.35)`
                      : "hsl(var(--border))",
                    backgroundColor: done
                      ? `hsl(${accent} / 0.08)`
                      : "transparent",
                  }}
                >
                  <span aria-hidden>{item.emoji}</span>
                  <span
                    className="flex-1 font-medium"
                    style={{
                      color: done
                        ? `hsl(${accent})`
                        : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {item.label}
                  </span>
                  {done && (
                    <Check
                      className="h-3 w-3"
                      style={{ color: `hsl(${accent})` }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <Link
        to={`/roadmap/${trail.id}/aula/${lesson.id}`}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
        style={{ backgroundColor: `hsl(${accent})` }}
      >
        {draft ? "Ver a aula" : "Abrir aula"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  );
}

function StagePanel({
  node,
  accent,
  statuses,
  onPickLesson,
}: {
  node: StageNode;
  accent: string;
  statuses: Record<string, NodeStatus>;
  onPickLesson: (lesson: Lesson) => void;
}) {
  const stage = node.stage;
  const done = statuses[stage.id]?.state === "done";

  return (
    <>
      <p className="text-sm leading-6 text-muted-foreground">
        {stage.description}
      </p>

      <section className="mt-5">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Aulas desta etapa
        </h4>
        <ul className="space-y-2">
          {stage.lessons.map((lesson) => {
            const s = statuses[lesson.id];
            return (
              <li key={lesson.id}>
                <button
                  type="button"
                  onClick={() => onPickLesson(lesson)}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-secondary/20 px-3 py-2.5 text-left transition-colors hover:border-primary/40"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-foreground">
                      {lesson.title}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      {s?.state === "draft"
                        ? "Em produção"
                        : `${s?.percent ?? 0}% concluído`}
                    </span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {stage.evolutionMoment && (
        <div
          className="mt-5 flex items-start gap-2 rounded-xl border p-3"
          style={{
            borderColor: `hsl(${accent} / ${done ? 0.35 : 0.15})`,
            background: `hsl(${accent} / ${done ? 0.08 : 0.03})`,
          }}
        >
          <Sparkles
            className="mt-0.5 h-4 w-4 flex-shrink-0"
            style={{ color: `hsl(${accent})`, opacity: done ? 1 : 0.5 }}
          />
          <p className="text-sm leading-6 text-foreground">
            {done ? (
              stage.evolutionMoment
            ) : (
              <span className="text-muted-foreground">
                Complete a etapa para desbloquear a conquista.
              </span>
            )}
          </p>
        </div>
      )}
    </>
  );
}

function PhasePanel({
  node,
  statuses,
}: {
  node: PhaseNode;
  statuses: Record<string, NodeStatus>;
}) {
  return (
    <>
      <p className="text-sm leading-6 text-muted-foreground">
        {node.phase.description}
      </p>
      <section className="mt-5">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Etapas
        </h4>
        <ul className="space-y-1.5">
          {node.phase.stages.map((stage) => (
            <li
              key={stage.id}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
            >
              <span className="min-w-0 flex-1 truncate text-foreground">
                {stage.title}
              </span>
              <span className="flex-shrink-0 text-xs text-muted-foreground">
                {difficultyLabel[stage.difficulty]}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Drawer                                                             */
/* ------------------------------------------------------------------ */

export interface MapDrawerProps {
  trail: Trail;
  node?: MapNode;
  onClose: () => void;
  onNavigate: (node: MapNode) => void;
}

const MapDrawer = ({ trail, node, onClose, onNavigate }: MapDrawerProps) => {
  const { state } = useProgress();
  const statuses = buildStatusMap(state, trail.phases);
  const accent = trail.accentHsl;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const kindLabel =
    node?.kind === "phase" ? "Fase" : node?.kind === "stage" ? "Etapa" : "Aula";
  const title =
    node?.kind === "phase"
      ? node.phase.title
      : node?.kind === "stage"
        ? node.stage.title
        : node?.kind === "lesson"
          ? node.lesson.title
          : "";

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-label={`${kindLabel}: ${title}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card"
          >
            <header className="flex items-start gap-3 border-b border-border p-5">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {kindLabel}
                </span>
                <h3 className="mt-0.5 text-lg font-bold leading-tight text-foreground">
                  {title}
                </h3>
                <div className="mt-2">
                  <StatusPill
                    status={statuses[node.id] ?? { state: "todo", percent: 0 }}
                    accent={accent}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar painel"
                className="flex-shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5">
              {node.kind === "phase" && (
                <PhasePanel node={node} statuses={statuses} />
              )}
              {node.kind === "stage" && (
                <StagePanel
                  node={node}
                  accent={accent}
                  statuses={statuses}
                  onPickLesson={(lesson) => {
                    const target = trail.phases
                      .flatMap((p) => p.stages)
                      .flatMap((s) => s.lessons)
                      .find((l) => l.id === lesson.id);
                    if (!target) return;
                    onNavigate({
                      kind: "lesson",
                      id: lesson.id,
                      lesson: target,
                      stageId: node.stage.id,
                      phaseId: node.phaseId,
                      side: node.side,
                      x: 0,
                      y: 0,
                      w: 0,
                      h: 0,
                    });
                  }}
                />
              )}
              {node.kind === "lesson" && (
                <LessonPanel node={node} trail={trail} accent={accent} />
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MapDrawer;
