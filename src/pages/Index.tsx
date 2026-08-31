import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { curriculum, getFirstLesson, getTrailStats } from "@/content";
import { useProgress } from "@/hooks/useProgress";
import { hasAnyProgress } from "@/lib/progress-selectors";
import Dashboard from "@/pages/Dashboard";
import { Code, Database, Layers, Sparkles, ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

const trailIcons: Record<string, typeof Code> = {
  frontend: Code,
  backend: Database,
  fullstack: Layers,
};

const Index = () => {
  const navigate = useNavigate();
  const { state, getTrailProgress, xp, streak } = useProgress();

  // Quem já começou (ou fez onboarding) vê o painel; visitantes veem a home.
  if (hasAnyProgress(state) || state.profile.onboardedAt) {
    return <Dashboard />;
  }

  const hasProgress = xp > 0;

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      {/* Hero */}
      <section className="relative px-4 pb-12 pt-32">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                100% Gratuito · Aprenda no seu ritmo
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-foreground">Aprenda programação com</span>
              <br />
              <span className="gradient-text">ROADMAPS do zero</span>
            </h1>

            <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Trilhas completas e estruturadas: você lê, assiste, testa o que
              entendeu, pratica e passa por um checkpoint antes de avançar.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/inicio"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Montar minha trilha
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#trilhas"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Ver as trilhas
              </a>
            </div>

            {hasProgress && (
              <div className="mt-6 inline-flex items-center gap-4 rounded-full border border-border bg-card/60 px-5 py-2 text-sm">
                <span className="font-semibold text-foreground">{xp} XP</span>
                <span className="h-4 w-px bg-border" />
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Flame className="h-4 w-4 text-orange-400" />
                  {streak.current} {streak.current === 1 ? "dia" : "dias"}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trilhas */}
      <section id="trilhas" className="scroll-mt-20 px-4 py-12">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {curriculum.map((trail, index) => {
              const Icon = trailIcons[trail.id] ?? Code;
              const stats = getTrailStats(trail.id);
              const progress = getTrailProgress(trail);
              const first = getFirstLesson(trail.id);

              return (
                <motion.button
                  key={trail.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  onClick={() => navigate(`/roadmap/${trail.id}`)}
                  className={`group relative w-full rounded-2xl bg-card p-8 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${trail.glowClass}`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse at center, hsl(${trail.accentHsl} / 0.08) 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <div className="mb-6 w-fit rounded-xl bg-secondary p-4">
                      <Icon className={`h-8 w-8 ${trail.colorClass}`} />
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-foreground">
                      Trilha {trail.title}
                    </h3>
                    <p className="mb-5 text-sm text-muted-foreground">
                      {trail.subtitle}
                    </p>

                    {progress > 0 && (
                      <div className="mb-4">
                        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                          <span>Seu progresso</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: `hsl(${trail.accentHsl})`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span>{stats.phases} fases</span>
                      <span>{stats.lessons} aulas</span>
                      <span>{stats.totalXp} XP</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      <span>{progress > 0 ? "Continuar trilha" : "Começar trilha"}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>

                    {first && (
                      <Link
                        to={`/roadmap/${trail.id}/aula/${first.lesson.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-block text-xs font-medium underline"
                        style={{ color: `hsl(${trail.accentHsl})` }}
                      >
                        {progress > 0 ? "Ir para a próxima aula disponível" : `Primeira aula: ${first.lesson.title}`}
                      </Link>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="mt-12 border-t border-border px-4 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 StudyMaps · Aprenda programação, de graça.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
