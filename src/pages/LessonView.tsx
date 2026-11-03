import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock, Construction, Target } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import {
  getAdjacentLessons,
  getLessonLocation,
  lessonSteps,
  xpForStep,
} from "@/content";
import type { LessonStepId } from "@/content/types";
import { useProgress } from "@/hooks/useProgress";
import { ContentRenderer } from "@/components/lesson/ContentRenderer";
import { StepSection } from "@/components/lesson/StepSection";
import { LessonStepper } from "@/components/lesson/LessonStepper";
import { Quiz } from "@/components/lesson/Quiz";
import { ExercisePanel } from "@/components/lesson/ExercisePanel";
import { CheckpointRunner } from "@/components/lesson/CheckpointRunner";
import { RewardPanel } from "@/components/lesson/RewardPanel";
import { ResourceList, VideoCard } from "@/components/lesson/ResourceList";
import { PremiumCallout } from "@/components/lesson/PremiumCallout";
import { PainCard } from "@/components/lesson/pain/PainCard";
import { BeliefCard } from "@/components/lesson/pain/BeliefCard";
import { ResolveCard } from "@/components/lesson/pain/ResolveCard";
import { PainResolved } from "@/components/lesson/pain/PainResolved";
import { AGENTS, agentForPhase } from "@/lib/agents";

function prettyConcept(slug: string) {
  return slug.replace(/-/g, " ");
}

const LessonNotFound = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="flex min-h-[60vh] items-center justify-center px-4 pt-16 text-center">
      <div>
        <h1 className="title-display mb-2 text-2xl text-foreground">Aula não encontrada</h1>
        <p className="mb-4 text-sm text-muted-foreground">
          Esse endereço não corresponde a nenhuma aula.
        </p>
        <Link to="/" className="text-primary hover:underline">
          Voltar ao início
        </Link>
      </div>
    </div>
  </div>
);

const LessonView = () => {
  const { trailId, lessonId } = useParams();
  const loc = useMemo(
    () => getLessonLocation(trailId, lessonId),
    [trailId, lessonId],
  );
  const adjacent = useMemo(
    () => getAdjacentLessons(trailId, lessonId),
    [trailId, lessonId],
  );

  const {
    isStepDone,
    completeStep,
    recordCheckpoint,
    recordConceptError,
    getLessonProgress,
    getLessonCompletion,
    isStageComplete,
    resetLesson,
    xp,
    streak,
  } = useProgress();

  if (!loc) return <LessonNotFound />;

  const { trail, phase, stage, lesson } = loc;
  const accent = trail.accentHsl;
  const trailHref = `/roadmap/${trail.id}`;
  const lp = getLessonProgress(lesson.id);

  /* ---------- draft ---------- */
  if (lesson.status === "draft") {
    return (
      <div className="min-h-screen bg-ceu">
        <Header />
        <main className="mx-auto max-w-2xl px-4 pb-20 pt-28">
          <Link
            to={trailHref}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Trilha {trail.title}
          </Link>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <Construction className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
            <h1 className="title-display text-xl text-foreground">{lesson.title}</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {lesson.summary}
            </p>
            <p className="mt-4 inline-block rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
              Conteúdo em produção
            </p>
            {lesson.learningObjectives.length > 0 && (
              <ul className="mx-auto mt-5 max-w-md space-y-1.5 text-left text-sm text-muted-foreground">
                {lesson.learningObjectives.map((o, i) => (
                  <li key={i} className="flex gap-2">
                    <Target className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    );
  }

  /* ---------- estado dos passos ---------- */
  const steps = lessonSteps(lesson);
  const has = (s: LessonStepId) => steps.includes(s);
  // Numerado pelos passos que a aula tem: sem vídeo, o Explore vira o 02, não o 03.
  const stepNumber = (s: LessonStepId) => steps.indexOf(s) + 1;
  const done = (s: LessonStepId) => isStepDone(lesson.id, s);

  const learnDone = done("learn");
  const watchDone = done("watch");
  const exploreDone = done("explore");
  const quizDone = done("quiz");
  const practiceDone = done("practice");
  const challengeDone = done("challenge");
  const checkpointDone = done("checkpoint");

  const quizLocked =
    !learnDone || (has("watch") && !watchDone) || (has("explore") && !exploreDone);
  const checkpointLocked =
    (has("quiz") && !quizDone) || (has("practice") && !practiceDone);

  const completion = getLessonCompletion(lesson);
  const rewardUnlocked = has("checkpoint") ? checkpointDone : completion.complete;

  const xpEarned = steps
    .filter((s) => done(s))
    .reduce((sum, s) => sum + xpForStep(s), 0);

  const stepperPresent = [
    ...steps,
    ...(has("checkpoint") ? (["reward"] as const) : []),
    "next" as const,
  ];
  const doneMap: Record<string, boolean> = {
    ...Object.fromEntries(steps.map((s) => [s, done(s)])),
    reward: rewardUnlocked,
    next: completion.complete,
  };

  const conceptLabels: Record<string, string> = {};
  [...lesson.questions, ...lesson.checkpoint.questions].forEach((q) => {
    conceptLabels[q.concept] = prettyConcept(q.concept);
  });

  const CompleteButton = ({
    step,
    label,
  }: {
    step: LessonStepId;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => completeStep(lesson.id, step)}
      className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
      style={{ backgroundColor: `hsl(${accent})` }}
    >
      <Check className="h-4 w-4" />
      {label}
    </button>
  );

  // A dor só aparece completa em aula escrita: rascunho tem só a frase, para o mapa.
  const pain = lesson.status === "available" && lesson.pain?.resolve ? lesson.pain : undefined;
  const agent = agentForPhase(phase.id);
  const phaseNumber = trail.phases.indexOf(phase) + 1;
  const phaseLessons = phase.stages.flatMap((s) => s.lessons);
  const lessonsInPhase = phaseLessons.length;
  const lessonNumberInPhase = phaseLessons.findIndex((l) => l.id === lesson.id) + 1;
  // O agente da fase só entra pro time quando todas as aulas escritas dela acabam.
  const remainingInPhase = phaseLessons.filter(
    (l) => l.status === "available" && !getLessonCompletion(l).complete,
  ).length;

  return (
    <div className="min-h-screen bg-ceu">
      <Header />

      {/* sub-barra fixa */}
      <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto max-w-3xl px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Link
              to={trailHref}
              aria-label={`Voltar para a trilha ${trail.title}`}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <p className="flex-1 truncate text-sm font-semibold text-foreground">
              {lesson.title}
            </p>
            <span className="flex-shrink-0 text-xs text-muted-foreground">
              {completion.doneSteps}/{completion.totalSteps}
            </span>
          </div>
          <div className="mt-2">
            <LessonStepper
              present={stepperPresent}
              doneMap={doneMap}
              accentHsl={accent}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-40">
        {/* intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="font-mono text-xs tracking-[0.1em] text-accent">
            {String(phaseNumber).padStart(2, "0")} ·{" "}
            {(agent ? AGENTS[agent].label : phase.title).toUpperCase()} · AULA {lessonNumberInPhase}/
            {lessonsInPhase}
          </p>
          <h1 className="title-display mt-2.5 text-[1.9rem] text-foreground sm:text-[2.2rem]">
            {lesson.title}
          </h1>
          {!pain && (
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{lesson.summary}</p>
          )}
          {lesson.estimatedMinutes && (
            <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />~{lesson.estimatedMinutes} MIN
            </p>
          )}
        </motion.div>

        {/* a dor e o que resolve — a aula abre por aqui */}
        {pain && (
          <>
            <PainCard quote={pain.quote} />
            {pain.belief && <BeliefCard belief={pain.belief} />}
            <ResolveCard resolve={pain.resolve!} detail={pain.resolveDetail} agent={agent} />
          </>
        )}

        {/* o que tu vai aprender */}
        {lesson.learningObjectives.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
              <Target className="h-4 w-4" style={{ color: `hsl(${accent})` }} />
              O QUE TU VAI APRENDER
            </h2>
            <ul className="space-y-2">
              {lesson.learningObjectives.map((o, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 text-sm leading-6 text-muted-foreground"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: `hsl(${accent})` }}
                  />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {/* 📖 Aprenda */}
          <StepSection
            id="step-learn"
            emoji="📖"
            index={stepNumber("learn")}
            title="Aprenda"
            subtitle="Lê com calma. É a base de todo o resto."
            done={learnDone}
            accentHsl={accent}
          >
            <ContentRenderer blocks={lesson.content} />
            {!learnDone && (
              <CompleteButton step="learn" label="Concluí a leitura" />
            )}
          </StepSection>

          {/* 🎥 Assista */}
          {has("watch") && lesson.video && (
            <StepSection
              id="step-watch"
              emoji="🎥"
              index={stepNumber("watch")}
              title="Assista"
              subtitle="Um vídeo para fixar o que tu acabou de ler."
              done={watchDone}
              accentHsl={accent}
            >
              <VideoCard video={lesson.video} accentHsl={accent} />
              {!watchDone && (
                <CompleteButton step="watch" label="Assisti ao vídeo" />
              )}
            </StepSection>
          )}

          {/* 🔗 Explore */}
          {has("explore") && (
            <StepSection
              id="step-explore"
              emoji="🔗"
              index={stepNumber("explore")}
              title="Explore"
              subtitle="Fontes confiáveis para consultar agora e depois."
              done={exploreDone}
              accentHsl={accent}
            >
              <ResourceList resources={lesson.freeResources} />
              {lesson.premiumResources && lesson.premiumResources.length > 0 && (
                <div className="mt-4">
                  <PremiumCallout resources={lesson.premiumResources} />
                </div>
              )}
              {!exploreDone && (
                <CompleteButton step="explore" label="Explorei os recursos" />
              )}
            </StepSection>
          )}

          {/* 🧠 Teste */}
          {has("quiz") && (
            <StepSection
              id="step-quiz"
              emoji="🧠"
              index={stepNumber("quiz")}
              title="Teste"
              subtitle="Perguntas de compreensão, aplicação e raciocínio."
              done={quizDone}
              locked={quizLocked && !quizDone}
              lockHint="Lê o conteúdo, assiste o vídeo e olha os recursos antes de testar."
              accentHsl={accent}
            >
              <Quiz
                questions={lesson.questions}
                accentHsl={accent}
                alreadyDone={quizDone}
                onComplete={() => completeStep(lesson.id, "quiz")}
                onConceptError={(c) => recordConceptError(c, lesson.id)}
              />
            </StepSection>
          )}

          {/* 💻 Pratique */}
          {has("practice") && lesson.exercise && (
            <StepSection
              id="step-practice"
              emoji="💻"
              index={stepNumber("practice")}
              title="Pratique"
              subtitle="Sair da teoria: faça algo com o conceito."
              done={practiceDone}
              accentHsl={accent}
            >
              <ExercisePanel
                lessonId={lesson.id}
                variant="exercise"
                exercise={lesson.exercise}
                accentHsl={accent}
                alreadyDone={practiceDone}
                onComplete={() => completeStep(lesson.id, "practice")}
              />
            </StepSection>
          )}

          {/* 🔥 Desafio */}
          {has("challenge") && lesson.challenge && (
            <StepSection
              id="step-challenge"
              emoji="🔥"
              index={stepNumber("challenge")}
              title="Desafio"
              subtitle="Opcional, um degrau acima. Vale XP extra."
              done={challengeDone}
              accentHsl={accent}
            >
              <ExercisePanel
                lessonId={lesson.id}
                variant="challenge"
                challenge={lesson.challenge}
                accentHsl={accent}
                alreadyDone={challengeDone}
                onComplete={() => completeStep(lesson.id, "challenge")}
              />
            </StepSection>
          )}

          {/* 🏆 Checkpoint */}
          {has("checkpoint") && (
            <StepSection
              id="step-checkpoint"
              emoji="🏆"
              index={stepNumber("checkpoint")}
              title="Checkpoint"
              subtitle={`Acerte ${lesson.checkpoint.passThreshold} de ${lesson.checkpoint.questions.length} para concluir a aula.`}
              done={checkpointDone}
              locked={checkpointLocked && !checkpointDone}
              lockHint="Conclui o Teste e a Prática antes do checkpoint."
              accentHsl={accent}
            >
              <CheckpointRunner
                checkpoint={lesson.checkpoint}
                accentHsl={accent}
                record={lp.checkpoint}
                conceptLabels={conceptLabels}
                onRecord={(r) => recordCheckpoint(lesson.id, r)}
                onConceptError={(c) => recordConceptError(c, lesson.id)}
                onPassed={() => {
                  /* XP + passo são creditados dentro de recordCheckpoint */
                }}
              />
            </StepSection>
          )}

          {/* o fecho: antes e agora */}
          {pain?.after && (
            <PainResolved
              before={pain.quote}
              after={pain.after}
              agent={agent}
              remaining={remainingInPhase}
            />
          )}

          {/* ⭐ Recompensa + ➡️ Próxima */}
          {rewardUnlocked && (
            <div id="step-next">
              <RewardPanel
                xpEarned={xpEarned}
                totalXp={xp}
                streak={streak.current}
                accentHsl={accent}
                evolutionMoment={
                  isStageComplete(stage) ? stage.evolutionMoment : undefined
                }
                nextHref={
                  adjacent.next
                    ? `/roadmap/${trail.id}/aula/${adjacent.next.lesson.id}`
                    : undefined
                }
                nextTitle={adjacent.next?.lesson.title}
                trailHref={trailHref}
                onReviewLesson={() => {
                  resetLesson(lesson.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonView;
