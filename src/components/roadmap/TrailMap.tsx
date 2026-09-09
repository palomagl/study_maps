/**
 * Mapa da Trilha — a visão de grafo.
 *
 * Arestas em SVG (uma camada só, atrás), nós em HTML posicionado em absoluto.
 * HTML nos nós porque são botões de verdade: foco, teclado e leitor de tela
 * funcionam sem gambiarra, coisa que texto em SVG não entrega.
 *
 * O mapa tem largura fixa (`MAP.width`) e é escalado para caber no container,
 * então nunca há rolagem horizontal.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Flag, Lock, Play } from "lucide-react";
import {
  MAP,
  buildTrailMap,
  type LessonNode,
  type MapNode,
  type PhaseNode,
  type StageNode,
} from "@/lib/roadmap-layout";
import type { Trail } from "@/content/types";
import { lessonSteps } from "@/content";
import { useProgress } from "@/hooks/useProgress";
import { buildStatusMap, type NodeState, type NodeStatus } from "./node-state";

const difficultyLabel: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

/** Escala o mapa para caber na largura disponível (nunca amplia além de 1). */
function useFitScale(designWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setScale(Math.min(1, el.clientWidth / designWidth));
    update();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return { ref, scale };
}

/* ------------------------------------------------------------------ */
/* Estilo por estado                                                  */
/* ------------------------------------------------------------------ */

/** Cor do nó: o accent da trilha quando há progresso, cinza quando não há. */
function tone(status: NodeStatus, accent: string) {
  switch (status.state) {
    case "done":
      return {
        border: `hsl(${accent} / 0.55)`,
        background: `hsl(${accent} / 0.12)`,
        boxShadow: `0 0 18px hsl(${accent} / 0.18)`,
      };
    case "active":
      return {
        border: `hsl(${accent} / 0.45)`,
        background: "hsl(var(--card))",
        boxShadow: `0 0 14px hsl(${accent} / 0.12)`,
      };
    case "draft":
      return {
        border: "hsl(var(--border))",
        background: "hsl(var(--secondary) / 0.25)",
        boxShadow: "none",
      };
    default:
      return {
        border: "hsl(var(--border))",
        background: "hsl(var(--card))",
        boxShadow: "none",
      };
  }
}

const edgeOpacity: Record<NodeState, number> = {
  done: 0.85,
  active: 0.5,
  todo: 0.28,
  draft: 0.16,
};

/** Marcador circular à esquerda do nó. */
function Marker({
  status,
  accent,
  size = 22,
}: {
  status: NodeStatus;
  accent: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
  } as const;

  if (status.state === "done") {
    return (
      <span
        className="flex flex-shrink-0 items-center justify-center rounded-full"
        style={{ ...common, backgroundColor: `hsl(${accent})` }}
      >
        <Check
          className="text-background"
          style={{ width: size * 0.6, height: size * 0.6 }}
          strokeWidth={3}
        />
      </span>
    );
  }

  if (status.state === "draft") {
    return (
      <span
        className="flex flex-shrink-0 items-center justify-center rounded-full border border-dashed border-muted-foreground/40"
        style={common}
      >
        <Lock
          className="text-muted-foreground"
          style={{ width: size * 0.45, height: size * 0.45 }}
        />
      </span>
    );
  }

  // todo / active: anel que se preenche conforme o progresso.
  const r = size / 2 - 1.5;
  const circumference = 2 * Math.PI * r;
  return (
    <span className="relative flex-shrink-0" style={common}>
      <svg viewBox={`0 0 ${size} ${size}`} style={common}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={2}
          stroke="hsl(var(--muted-foreground) / 0.3)"
        />
        {status.percent > 0 && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            stroke={`hsl(${accent})`}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - status.percent / 100)}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Nós                                                                */
/* ------------------------------------------------------------------ */

interface NodeProps {
  status: NodeStatus;
  accent: string;
  selected: boolean;
  onSelect: () => void;
}

function PhaseBox({
  node,
  status,
  accent,
  selected,
  onSelect,
}: NodeProps & { node: PhaseNode }) {
  const done = status.state === "done";
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex h-full w-full items-center gap-3 rounded-2xl border px-4 text-left transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        borderColor: done ? `hsl(${accent} / 0.6)` : "hsl(var(--border))",
        background: done
          ? `linear-gradient(135deg, hsl(${accent} / 0.18), hsl(var(--card)))`
          : "hsl(var(--card))",
        boxShadow: selected ? `0 0 0 2px hsl(${accent} / 0.5)` : undefined,
      }}
    >
      <Flag
        className="h-4 w-4 flex-shrink-0"
        style={{ color: `hsl(${accent})` }}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Fase {node.order}
        </span>
        <span className="block truncate text-sm font-bold text-foreground">
          {node.phase.title}
        </span>
      </span>
      <span
        className="flex-shrink-0 text-sm font-bold tabular-nums"
        style={{ color: `hsl(${accent})` }}
      >
        {status.percent}%
      </span>
    </button>
  );
}

function StageBox({
  node,
  status,
  accent,
  selected,
  onSelect,
}: NodeProps & { node: StageNode }) {
  const t = tone(status, accent);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex h-full w-full items-center gap-3 rounded-xl border px-3.5 text-left transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        borderColor: t.border,
        background: t.background,
        boxShadow: selected ? `0 0 0 2px hsl(${accent} / 0.5)` : t.boxShadow,
      }}
    >
      <Marker status={status} accent={accent} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-bold leading-tight text-foreground">
          {node.stage.title}
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="rounded bg-secondary px-1.5 py-0.5 font-medium">
            {difficultyLabel[node.stage.difficulty]}
          </span>
          <span>
            {node.stage.lessons.length} aula
            {node.stage.lessons.length > 1 ? "s" : ""}
          </span>
        </span>
      </span>
    </button>
  );
}

function LessonBox({
  node,
  status,
  accent,
  selected,
  onSelect,
}: NodeProps & { node: LessonNode }) {
  const t = tone(status, accent);
  const total = lessonSteps(node.lesson).length;
  const done = Math.round((status.percent / 100) * total);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex h-full w-full items-center gap-2.5 rounded-lg border px-3 text-left transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        borderColor: t.border,
        borderStyle: status.state === "draft" ? "dashed" : "solid",
        background: t.background,
        boxShadow: selected ? `0 0 0 2px hsl(${accent} / 0.5)` : t.boxShadow,
        opacity: status.state === "draft" ? 0.65 : 1,
      }}
    >
      <Marker status={status} accent={accent} size={18} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold text-foreground">
          {node.lesson.title}
        </span>
        {/* Passos da aula: o que substitui o "marcar como feito". */}
        {status.state !== "draft" && (
          <span className="mt-1 flex gap-0.5" aria-hidden>
            {Array.from({ length: total }).map((_, i) => (
              <span
                key={i}
                className="h-[3px] w-3 rounded-full"
                style={{
                  backgroundColor:
                    i < done
                      ? `hsl(${accent})`
                      : "hsl(var(--muted-foreground) / 0.25)",
                }}
              />
            ))}
          </span>
        )}
      </span>
      {status.state === "active" && (
        <Play
          className="h-3 w-3 flex-shrink-0"
          style={{ color: `hsl(${accent})` }}
        />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Mapa                                                               */
/* ------------------------------------------------------------------ */

export interface TrailMapProps {
  trail: Trail;
  selectedId?: string;
  onSelect: (node: MapNode) => void;
}

const TrailMap = ({ trail, selectedId, onSelect }: TrailMapProps) => {
  const { state } = useProgress();
  const layout = useMemo(() => buildTrailMap(trail), [trail]);
  const statuses = useMemo(
    () => buildStatusMap(state, trail.phases),
    [state, trail.phases],
  );
  const { ref, scale } = useFitScale(layout.width);
  const accent = trail.accentHsl;

  return (
    <div ref={ref} className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative origin-top-left"
        style={{
          width: layout.width,
          height: layout.height,
          transform: `scale(${scale})`,
          // Reserva a altura já escalada, senão sobra espaço em branco embaixo.
          marginBottom: layout.height * (scale - 1),
        }}
      >
        <svg
          className="absolute inset-0 pointer-events-none"
          width={layout.width}
          height={layout.height}
          aria-hidden
        >
          {layout.edges.map((edge) => {
            const status = statuses[edge.ownerId];
            const lit = status?.state === "done";
            return (
              <path
                key={edge.id}
                d={edge.d}
                fill="none"
                stroke={lit ? `hsl(${accent})` : "hsl(var(--border))"}
                strokeWidth={edge.kind === "spine" ? 2.5 : 1.75}
                strokeLinecap="round"
                strokeDasharray={edge.kind === "spine" ? undefined : "5 5"}
                opacity={edgeOpacity[status?.state ?? "todo"]}
              />
            );
          })}
        </svg>

        {layout.nodes.map((node) => {
          const status = statuses[node.id] ?? { state: "todo", percent: 0 };
          const selected = selectedId === node.id;
          const props = {
            status,
            accent,
            selected,
            onSelect: () => onSelect(node),
          };
          return (
            <div
              key={node.id}
              className="absolute"
              style={{ left: node.x, top: node.y, width: node.w, height: node.h }}
            >
              {node.kind === "phase" && <PhaseBox node={node} {...props} />}
              {node.kind === "stage" && <StageBox node={node} {...props} />}
              {node.kind === "lesson" && <LessonBox node={node} {...props} />}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TrailMap;
