import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Flame,
  PlayCircle,
  Sparkles,
  Trophy,
} from "lucide-react";
import Header from "@/components/Header";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import {
  completedLessonCount,
  conceptsToReview,
  currentTrail,
  hasRecurringDifficulty,
  nextLesson,
} from "@/lib/progress-selectors";
import { curriculum } from "@/content";
import { LevelCard } from "@/components/gamification/LevelBadge";
import { AchievementsGrid } from "@/components/gamification/AchievementsGrid";
import { MissionList } from "@/components/gamification/MissionList";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Agent } from "@/components/agents/Agent";
import { TeamBox } from "@/components/trail/TeamBox";
import { agentForPhase } from "@/lib/agents";

const prettyConcept = (s: string) => s.replace(/-/g, " ");

const Dashboard = () => {
  const { state, streak, getPhaseProgress } = useProgress();
  const { level, achievements, missions, earnedCount, claimMission } = useGamification();

  const trail = useMemo(() => currentTrail(state) ?? curriculum[0], [state]);
  const next = useMemo(() => nextLesson(state, trail.id), [state, trail.id]);
  const lessonsDone = completedLessonCount(state);
  const review = conceptsToReview(state).slice(0, 6);
  const accent = trail.accentHsl;

  const name = state.profile.name?.trim();
  const greeting = name ? `E aí, ${name.split(" ")[0]}` : "Bora continuar";
  const nextAgent = next ? agentForPhase(next.phase.id) : null;

  return (
    <div className="min-h-screen bg-ceu">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24">
        {/* saudação */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.1em] text-primary">TEU PAINEL</p>
            <h1 className="title-display mt-2 text-[2rem] text-foreground sm:text-[2.6rem]">
              {greeting}
            </h1>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Nível {level.level} · {level.title} · {level.xp} XP
            </p>
          </div>
          <TeamBox trail={trail} />
          {streak.current > 0 && (
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-semibold text-foreground">
                {streak.current} {streak.current === 1 ? "dia" : "dias"} seguidos
              </span>
            </div>
          )}
        </motion.div>

        {/* continuar estudando */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="overflow-hidden rounded-2xl border p-6"
          style={{
            borderColor: `hsl(${accent} / 0.4)`,
            background: `radial-gradient(ellipse at top left, hsl(${accent} / 0.12), transparent 70%)`,
          }}
        >
          {next ? (
            <div className="flex items-start gap-5">
              {nextAgent && <Agent kind={nextAgent} size={96} className="hidden flex-shrink-0 sm:block" />}
              <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                Continuar estudando · {next.trail.title}
              </p>
              <h2 className="title-display mt-2 text-2xl text-foreground">
                {next.lesson.title}
              </h2>
              {next.lesson.pain ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  resolve: <span className="text-[#FF8FA6]">“{next.lesson.pain.quote}”</span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-muted-foreground">
                  {next.phase.title} · {next.stage.title}
                </p>
              )}
              <Link
                to={`/roadmap/${next.trail.id}/aula/${next.lesson.id}`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                style={{ backgroundColor: `hsl(${accent})` }}
              >
                <PlayCircle className="h-4 w-4" />
                {lessonsDone > 0 ? "Retomar" : "Começar agora"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-foreground">
                Tu fez todas as aulas que já estão escritas.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                As próximas tão a caminho. Enquanto isso, revisa o que errou ou registra o
                link do teu projeto.
              </p>
              <Link
                to="/"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
              >
                Ver trilhas <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </motion.section>

        {/* stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <LevelCard level={level} accentHsl={accent} />
          <StatTile
            icon={<BookOpenCheck className="h-4 w-4" />}
            label="Aulas concluídas"
            value={String(lessonsDone)}
          />
          <StatTile
            icon={<Trophy className="h-4 w-4" />}
            label="Conquistas"
            value={`${earnedCount}/${achievements.length}`}
          />
          <StatTile
            icon={<Flame className="h-4 w-4" />}
            label="Melhor sequência"
            value={`${streak.longest} ${streak.longest === 1 ? "dia" : "dias"}`}
          />
        </div>

        {/* progresso da trilha atual */}
        <section className="mt-8">
          <SectionTitle>Tua trilha</SectionTitle>
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h3 className={`text-sm font-bold ${trail.colorClass}`}>
                {trail.title}
              </h3>
              <Link
                to={`/roadmap/${trail.id}`}
                className="text-xs font-medium text-muted-foreground underline hover:text-foreground"
              >
                abrir roadmap
              </Link>
            </div>
            <div className="mt-3 space-y-2">
              {trail.phases.map((phase) => {
                const pct = getPhaseProgress(phase);
                return (
                  <div key={phase.id} className="flex items-center gap-3">
                    <span className="w-40 flex-shrink-0 truncate text-xs text-muted-foreground">
                      {phase.title}
                    </span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: `hsl(${accent})`,
                        }}
                      />
                    </div>
                    <span className="w-8 flex-shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* missões + revisão */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section>
            <SectionTitle>Missões</SectionTitle>
            <MissionList
              missions={missions}
              onClaim={claimMission}
              accentHsl={accent}
            />
          </section>

          <section>
            <SectionTitle>Para revisar</SectionTitle>
            {review.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-secondary/10 p-5 text-sm text-muted-foreground">
                Nada pendente por aqui. Conceitos que tu errar nas perguntas
                aparecem nesta lista para revisão.
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-5">
                {hasRecurringDifficulty(state) && (
                  <p className="mb-3 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5 text-xs text-muted-foreground">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-amber-400" />
                    Tu tropeçou mais de uma vez em alguns conceitos. Vale uma
                    revisão focada.
                  </p>
                )}
                <ul className="space-y-1.5">
                  {review.map((c) => (
                    <li
                      key={c.concept}
                      className="flex items-center justify-between rounded-lg bg-secondary/20 px-3 py-2 text-sm"
                    >
                      <span className="capitalize text-foreground">
                        {prettyConcept(c.concept)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {c.errors} {c.errors === 1 ? "erro" : "erros"}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/revisao"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground underline"
                >
                  Ir para a revisão <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </section>
        </div>

        {/* conquistas */}
        <section className="mt-8">
          <SectionTitle>Conquistas</SectionTitle>
          <AchievementsGrid achievements={achievements} />
        </section>

        {/* projetos */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <SectionTitle noMargin>O que tu vai conseguir construir</SectionTitle>
            <Link
              to={`/roadmap/${trail.id}/projetos`}
              className="text-xs font-medium text-muted-foreground underline hover:text-foreground"
            >
              ver todos
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trail.projects.slice(0, 3).map((project) => {
              const phase = trail.phases.find(
                (p) => p.id === project.unlockedAfterPhaseId,
              );
              const readiness = phase ? getPhaseProgress(phase) : 0;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  accentHsl={accent}
                  readiness={readiness}
                  unlocked={readiness >= 100}
                  compact
                />
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

function SectionTitle({
  children,
  noMargin,
}: {
  children: React.ReactNode;
  noMargin?: boolean;
}) {
  return (
    <h2
      className={`font-mono text-xs uppercase tracking-[0.1em] text-primary ${
        noMargin ? "" : "mb-3"
      }`}
    >
      {children}
    </h2>
  );
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

export default Dashboard;
