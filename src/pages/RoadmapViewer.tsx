import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, List, Map as MapIcon } from "lucide-react";
import Header from "@/components/Header";
import { ProofCard } from "@/components/trail/ProofCard";
import { CertificateLink } from "@/components/trail/CertificateLink";
import { TeamBox } from "@/components/trail/TeamBox";
import TeamRoute from "@/components/roadmap/TeamRoute";
import TrailList from "@/components/roadmap/TrailList";
import MapDrawer from "@/components/roadmap/MapDrawer";
import { getTrail, getTrailStats } from "@/content";
import type { MapNode } from "@/lib/roadmap-layout";
import { useProgress } from "@/hooks/useProgress";

type View = "map" | "list";

/** Mapa é a visão padrão no desktop; no celular a lista lê melhor. */
function defaultView(): View {
  if (typeof window === "undefined") return "map";
  return window.innerWidth < 768 ? "list" : "map";
}

const RoadmapViewer = () => {
  const { id } = useParams();
  const trail = useMemo(() => getTrail(id), [id]);
  const stats = useMemo(() => (id ? getTrailStats(id) : null), [id]);
  const { getTrailProgress } = useProgress();

  const [view, setView] = useState<View>(defaultView);
  const [selected, setSelected] = useState<MapNode | undefined>();

  if (!trail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ceu">
        <div className="text-center">
          <h2 className="title-display mb-4 text-2xl text-foreground">Trilha não encontrada</h2>
          <Link to="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const progress = getTrailProgress(trail);

  return (
    <div className="min-h-screen bg-ceu">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Início
        </Link>

        {/* ---------- cabeçalho: a trilha e o teu time ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-5 flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-xs tracking-[0.1em] text-primary">TRILHA 01</p>
            <h1 className="title-display mt-2 text-[2rem] sm:text-[2.6rem]">{trail.title}</h1>
            <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{trail.description}</p>
            {stats && (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
                {stats.phases} fases ·{" "}
                {/*
                  Não basta dizer "12 aulas" enquanto onze são rascunho: quem
                  lê entende que existem doze para fazer. A trilha diz o que
                  já existe de verdade.
                */}
                <span>
                  {stats.lessons} aulas
                  {stats.availableLessons < stats.lessons &&
                    ` (${stats.availableLessons} escrita${
                      stats.availableLessons === 1 ? "" : "s"
                    }, o resto em produção)`}
                </span>{" "}
                · {progress}% feito
              </p>
            )}
          </div>
          <TeamBox trail={trail} />
        </motion.div>

        {/* ---------- mapa ou lista ---------- */}
        <div className="mb-8 mt-8 flex items-center justify-between gap-3 border-b border-border pb-4">
          <div
            role="tablist"
            aria-label="Modo de visualização"
            className="inline-flex rounded-xl border border-border bg-card p-1"
          >
            {(
              [
                { id: "map", label: "Mapa", Icon: MapIcon },
                { id: "list", label: "Lista", Icon: List },
              ] as const
            ).map(({ id: v, label, Icon }) => {
              const on = view === v;
              return (
                <button
                  key={v}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setView(v)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    on ? "bg-accent/15 text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>
          <span className="hidden font-mono text-[11px] text-muted-foreground/70 sm:block">
            CLICA NUMA FASE PRA VER AS AULAS
          </span>
        </div>

        {view === "map" ? (
          <TeamRoute trail={trail} onSelect={setSelected} />
        ) : (
          <TrailList trail={trail} />
        )}

        {/* ---------- a prova: depois do mapa, nunca antes ---------- */}
        <section className="mt-16 border-t border-border pt-8">
          <p className="font-mono text-xs tracking-[0.1em] text-primary">A PROVA</p>
          <Link
            to={`/roadmap/${trail.id}/projetos`}
            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            🚀 O que tu vai construir
          </Link>
          <ProofCard trailId={trail.id} accentHsl={trail.accentHsl} />
          <CertificateLink trail={trail} />
        </section>
      </main>

      <MapDrawer
        trail={trail}
        node={selected}
        onClose={() => setSelected(undefined)}
        onNavigate={setSelected}
      />
    </div>
  );
};

export default RoadmapViewer;
