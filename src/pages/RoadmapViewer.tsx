import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CircleDashed,
  Clock,
  Lock,
  Sparkles,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Header from "@/components/Header";
import { getTrail, getTrailStats } from "@/content";
import type { Lesson, Stage } from "@/content/types";
import { useProgress } from "@/hooks/useProgress";

const difficultyLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const RoadmapViewer = () => {
  const { id } = useParams();
  const trail = useMemo(() => getTrail(id), [id]);
  const stats = useMemo(() => (id ? getTrailStats(id) : null), [id]);

  const {
    getTrailProgress,
    getPhaseProgress,
    getStageProgress,
    getLessonCompletion,
    isLessonComplete,
    isStageComplete,
  } = useProgress();

  if (!trail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Trilha não encontrada
          </h2>
          <Link to="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const progress = getTrailProgress(trail);
  const accent = trail.accentHsl;

  const LessonRow = ({ lesson }: { lesson: Lesson }) => {
    const isDraft = lesson.status === "draft";
    const c = getLessonCompletion(lesson);
    const complete = isLessonComplete(lesson);
    const started = !isDraft && c.doneSteps > 0 && !complete;

    return (
      <Link
        to={`/roadmap/${trail.id}/aula/${lesson.id}`}
        className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
          isDraft
            ? "border-border/60 bg-secondary/10 opacity-70 hover:opacity-100"
            : "border-border bg-secondary/20 hover:border-primary/30"
        }`}
      >
        <span
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border"
          style={
            complete
              ? { backgroundColor: `hsl(${accent})`, borderColor: `hsl(${accent})` }
              : { borderColor: "hsl(var(--muted-foreground) / 0.3)" }
          }
        >
          {complete ? (
            <Check className="h-3.5 w-3.5 text-primary-foreground" />
          ) : isDraft ? (
            <Lock className="h-3 w-3 text-muted-foreground" />
          ) : started ? (
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: `hsl(${accent})` }}
            />
          ) : (
            <CircleDashed className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">
            {lesson.title}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {isDraft
              ? "Conteúdo em produção"
              : started
                ? `${c.doneSteps}/${c.totalSteps} passos · ${lesson.summary}`
                : lesson.summary}
          </span>
        </span>

        {!isDraft && lesson.estimatedMinutes && (
          <span className="hidden flex-shrink-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
            <Clock className="h-3 w-3" />
            {lesson.estimatedMinutes}m
          </span>
        )}
      </Link>
    );
  };

  const StageCard = ({ stage, index }: { stage: Stage; index: number }) => {
    const stageProgress = getStageProgress(stage);
    const stageComplete = isStageComplete(stage);
    const hasAvailable = stage.lessons.some((l) => l.status === "available");
    const defaultOpen = hasAvailable && !stageComplete;

    return (
      <Collapsible
        defaultOpen={defaultOpen}
        className="rounded-2xl border border-border bg-card"
      >
        <CollapsibleTrigger className="group flex w-full items-center gap-3 p-4 text-left">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold"
            style={{
              backgroundColor: stageComplete
                ? `hsl(${accent} / 0.15)`
                : "hsl(var(--secondary))",
              color: stageComplete ? `hsl(${accent})` : "hsl(var(--muted-foreground))",
            }}
          >
            {stageComplete ? <Check className="h-4 w-4" /> : index + 1}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-bold text-foreground">
                {stage.title}
              </span>
              <span className="flex-shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {difficultyLabel[stage.difficulty]}
              </span>
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {stage.description}
            </span>
          </span>

          <span className="flex flex-shrink-0 items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:inline">
              {stage.lessons.length} aula{stage.lessons.length > 1 ? "s" : ""}
            </span>
            {hasAvailable && (
              <span
                className="text-xs font-semibold"
                style={{ color: `hsl(${accent})` }}
              >
                {stageProgress}%
              </span>
            )}
            <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
          </span>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="space-y-2 border-t border-border p-4">
            {stage.lessons.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} />
            ))}

            {stageComplete && stage.evolutionMoment && (
              <div
                className="mt-2 flex items-start gap-2 rounded-xl border p-3"
                style={{
                  borderColor: `hsl(${accent} / 0.3)`,
                  background: `hsl(${accent} / 0.06)`,
                }}
              >
                <Sparkles
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: `hsl(${accent})` }}
                />
                <p className="text-sm font-medium text-foreground">
                  {stage.evolutionMoment}
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      {/* barra de progresso fixa */}
      <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
          <Link
            to="/"
            aria-label="Voltar ao início"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex-1">
            <div className="mb-1 flex items-center justify-between">
              <h2 className={`text-sm font-bold ${trail.colorClass}`}>
                Trilha {trail.title}
              </h2>
              <span className="text-xs text-muted-foreground">
                {progress}% concluído
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `hsl(${accent})` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Trilha {trail.title}
          </h1>
          <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
            {trail.description}
          </p>
          {stats && (
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span>{stats.phases} fases</span>
              <span>{stats.stages} etapas</span>
              <span>{stats.lessons} aulas</span>
              <span>{stats.exercises} exercícios</span>
              <span>{stats.totalXp} XP no total</span>
            </div>
          )}

          <Link
            to={`/roadmap/${trail.id}/projetos`}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            🚀 O que você vai construir
          </Link>
        </motion.div>

        <div className="space-y-8">
          {trail.phases.map((phase, phaseIndex) => {
            const phaseProgress = getPhaseProgress(phase);
            let stageCounter = 0;
            return (
              <section key={phase.id}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Fase {phaseIndex + 1}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span
                    className="text-xs font-semibold"
                    style={{ color: `hsl(${accent})` }}
                  >
                    {phaseProgress}%
                  </span>
                </div>
                <h2 className="text-lg font-bold text-foreground">{phase.title}</h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  {phase.description}
                </p>

                <div className="space-y-3">
                  {phase.stages.map((stage) => (
                    <StageCard
                      key={stage.id}
                      stage={stage}
                      index={stageCounter++}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default RoadmapViewer;
