import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, List, Map as MapIcon } from "lucide-react";
import Header from "@/components/Header";
import TrailMap from "@/components/roadmap/TrailMap";
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

const legend = [
  { label: "Concluído", fill: true },
  { label: "Em andamento", ring: true },
  { label: "A fazer", plain: true },
  { label: "Em produção", dashed: true },
];

const RoadmapViewer = () => {
  const { id } = useParams();
  const trail = useMemo(() => getTrail(id), [id]);
  const stats = useMemo(() => (id ? getTrailStats(id) : null), [id]);
  const { getTrailProgress } = useProgress();

  const [view, setView] = useState<View>(defaultView);
  const [selected, setSelected] = useState<MapNode | undefined>();

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

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      {/* barra de progresso fixa */}
      <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
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

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Trilha {trail.title}
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-muted-foreground">
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

        {/* alternador de visão + legenda */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
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
                  className="flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: on ? `hsl(${accent} / 0.15)` : "transparent",
                    color: on ? `hsl(${accent})` : "hsl(var(--muted-foreground))",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>

          {view === "map" && (
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              {legend.map((l) => (
                <li key={l.label} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full border"
                    style={{
                      backgroundColor: l.fill ? `hsl(${accent})` : "transparent",
                      borderColor: l.fill
                        ? `hsl(${accent})`
                        : l.ring
                          ? `hsl(${accent} / 0.7)`
                          : "hsl(var(--muted-foreground) / 0.4)",
                      borderStyle: l.dashed ? "dashed" : "solid",
                    }}
                  />
                  {l.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {view === "map" ? (
          <TrailMap
            trail={trail}
            selectedId={selected?.id}
            onSelect={setSelected}
          />
        ) : (
          <TrailList trail={trail} />
        )}
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
