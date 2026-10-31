import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { Agent } from "@/components/agents/Agent";
import { curriculum, getTrailStats } from "@/content";
import { useProgress } from "@/hooks/useProgress";
import { hasAnyProgress } from "@/lib/progress-selectors";
import { AGENTS, type AgentKind } from "@/lib/agents";
import Dashboard from "@/pages/Dashboard";

/** O palco: o time inteiro, com o Julgamento — o que olha — em destaque. */
const PALCO: { kind: AgentKind; size: number }[] = [
  { kind: "ideia", size: 86 },
  { kind: "pedido", size: 96 },
  { kind: "geracao", size: 106 },
  { kind: "julgamento", size: 134 },
  { kind: "conserto", size: 106 },
  { kind: "noar", size: 96 },
];

const Index = () => {
  const navigate = useNavigate();
  const { state, getTrailProgress } = useProgress();

  // Quem já começou (ou fez onboarding) vê o painel; visitantes veem a home.
  if (hasAnyProgress(state) || state.profile.onboardedAt) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-ceu">
      <Header />

      {/* ---------- chamada ---------- */}
      <section className="px-4 pt-28 text-center sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
            <i className="h-[7px] w-[7px] rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            Trilha nova: do zero ao teu app no ar
          </span>

          <h1 className="title-display mx-auto mt-5 max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">
            Tira tuas ideias <span className="text-primary">do papel.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Todo mundo pede pra uma IA. Aqui tu aprende a olhar o resultado, dizer o que tá
            errado — e colocar o teu projeto no ar.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/inicio"
              className="inline-flex items-center gap-2 rounded-[10px] bg-primary px-6 py-3.5 text-[15px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Começar agora <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/roadmap/app-no-ar"
              className="inline-flex items-center rounded-[10px] border-[1.5px] border-border px-6 py-3.5 text-[15px] font-bold text-foreground transition-colors hover:bg-secondary"
            >
              Ver a trilha
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ---------- o palco ---------- */}
      <section aria-label="O time" className="relative mx-auto mt-6 h-[190px] max-w-4xl sm:mt-8 sm:h-[250px]">
        <div className="pointer-events-none absolute bottom-5 left-1/2 h-[90px] w-[min(760px,100%)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(124_92_255/0.45),rgb(124_92_255/0.08)_55%,transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-[34px] left-1/2 h-14 w-[min(640px,92%)] -translate-x-1/2 rounded-[50%] border-[1.5px] border-accent/50" />
        {/* Posição e escala num div comum: o motion.div reescreve o `transform`
            e apagaria o centralizado do Tailwind. */}
        <div className="absolute bottom-10 left-1/2 origin-bottom -translate-x-1/2 scale-[0.6] sm:scale-100">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-end gap-3.5"
          >
            {PALCO.map((a) => (
              <Agent key={a.kind} kind={a.kind} size={a.size} />
            ))}
          </motion.div>
        </div>
      </section>
      <p className="px-4 text-center text-[13px] text-muted-foreground/70">
        <b className="font-semibold text-muted-foreground">Seis especialistas, seis passos.</b>{" "}
        Tu monta o teu time no caminho.
      </p>

      {/* ---------- a trilha ---------- */}
      <section id="trilhas" className="mx-auto mt-16 max-w-4xl scroll-mt-20 px-4 pb-16">
        <p className="font-mono text-xs tracking-[0.1em] text-primary">A TRILHA</p>
        <div className="mt-3 grid gap-4">
          {curriculum.map((trail) => {
            const stats = getTrailStats(trail.id);
            const progress = getTrailProgress(trail);
            return (
              <button
                key={trail.id}
                onClick={() => navigate(`/roadmap/${trail.id}`)}
                className="group grid gap-5 rounded-2xl border border-border bg-card p-6 text-left transition-colors hover:border-accent sm:grid-cols-[1fr_auto] sm:items-center sm:p-8"
              >
                <div>
                  <h2 className="title-display text-2xl sm:text-3xl">{trail.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{trail.subtitle}</p>
                  <p className="mt-4 font-mono text-xs text-muted-foreground">
                    {stats.phases} FASES · {stats.lessons} AULAS
                    {progress > 0 && ` · ${progress}% FEITO`}
                  </p>
                </div>
                <div className="flex items-end gap-1.5">
                  {(Object.keys(AGENTS) as AgentKind[]).map((k) => (
                    <Agent key={k} kind={k} size={44} />
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-primary sm:col-span-2">
                  {progress > 0 ? "Continuar" : "Começar a trilha"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">© 2026 StudyMaps · Tira tuas ideias do papel.</p>
      </footer>
    </div>
  );
};

export default Index;
