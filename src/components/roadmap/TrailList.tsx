/**
 * Visão de lista da trilha — a leitura densa, boa para varrer conteúdo e para
 * telas pequenas. Convive com o mapa; nenhuma das duas é "a certa".
 */
import { Link } from "react-router-dom";
import { Check, ChevronDown, CircleDashed, Clock, Lock, Sparkles } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Lesson, Stage, Trail } from "@/content/types";
import { useProgress } from "@/hooks/useProgress";

const difficultyLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const TrailList = ({ trail }: { trail: Trail }) => {
  const {
    getPhaseProgress,
    getStageProgress,
    getLessonCompletion,
    isLessonComplete,
    isStageComplete,
  } = useProgress();

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
                <StageCard key={stage.id} stage={stage} index={stageCounter++} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default TrailList;
