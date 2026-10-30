import type { ReactNode } from "react";
import { AGENTS, type AgentKind } from "@/lib/agents";

/**
 * Os agentes do time, portados das maquetes aprovadas
 * (docs/superpowers/specs/mockups/telas-agentes.html).
 *
 * Corpo de cápsula, visor escuro com olhar firme, distintivo da função no
 * peito. Sem bochecha e sem sorriso: a primeira versão, de bichinhos
 * redondos, foi recusada por parecer infantil.
 *
 * Tudo é desenhado inline, sem `<use>` nem ids — vários agentes na mesma
 * tela não podem colidir.
 */

interface Art {
  body: string;
  shade: string;
  shadeOpacity: number;
  legs: string;
  light: string;
  badge: ReactNode;
}

const VISOR = "#120A24";

const ART: Record<AgentKind, Art> = {
  ideia: {
    body: "#FFB020", shade: "#D98C0B", shadeOpacity: 0.55, legs: "#B9790A", light: "#FFE3A1",
    badge: <path d="M50 68 a4.5 4.5 0 0 1 2.6 8.2 v1.8 h-5.2 v-1.8 A4.5 4.5 0 0 1 50 68Z" fill="#FFE3A1" />,
  },
  pedido: {
    body: "#3DF5B0", shade: "#1DBF88", shadeOpacity: 0.55, legs: "#169E73", light: "#C8FFEA",
    badge: <path d="M46 78 l7-7 2 2 -7 7 -2.6.6Z" fill="#C8FFEA" />,
  },
  geracao: {
    body: "#FF3D9A", shade: "#D11F7C", shadeOpacity: 0.55, legs: "#B8156A", light: "#FFC2E0",
    badge: (
      <path
        d="M50 67.5 l1.8 4.7 4.7 1.8 -4.7 1.8 -1.8 4.7 -1.8-4.7 -4.7-1.8 4.7-1.8Z"
        fill="#FFC2E0"
      />
    ),
  },
  julgamento: {
    body: "#7C5CFF", shade: "#5A3DE6", shadeOpacity: 0.6, legs: "#4B33C9", light: "#D6CCFF",
    badge: (
      <>
        <circle cx="49" cy="73" r="3.6" fill="none" stroke="#D6CCFF" strokeWidth="2" />
        <line x1="51.6" y1="75.6" x2="54.5" y2="78.5" stroke="#D6CCFF" strokeWidth="2.2" strokeLinecap="round" />
      </>
    ),
  },
  conserto: {
    body: "#FF6B2C", shade: "#DE5216", shadeOpacity: 0.55, legs: "#C24A12", light: "#FFD0B8",
    badge: (
      <path
        d="M53.8 69.2 a3.6 3.6 0 0 0 -4.6 4.6 l-4 4 1.9 1.9 4-4 a3.6 3.6 0 0 0 4.6-4.6 l-2 2 -1.8-1.8Z"
        fill="#FFD0B8"
      />
    ),
  },
  noar: {
    body: "#2EC5FF", shade: "#159FD9", shadeOpacity: 0.55, legs: "#127FB8", light: "#C4F0FF",
    badge: (
      <>
        <path
          d="M50 67.5 c3 2.2 4 5.4 3.4 8.6 l-1.6 1.6 h-3.6 l-1.6-1.6 c-.6-3.2.4-6.4 3.4-8.6Z"
          fill="#C4F0FF"
        />
        <path d="M47 78 l-2 2.8 M53 78 l2 2.8" stroke="#C4F0FF" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
  },
};

function Shadow() {
  return <ellipse cx="50" cy="112" rx="30" ry="5" fill="#000" opacity=".45" />;
}

function Legs({ color }: { color: string }) {
  return (
    <>
      <rect x="31" y="92" width="14" height="18" rx="7" fill={color} />
      <rect x="55" y="92" width="14" height="18" rx="7" fill={color} />
    </>
  );
}

function Body({ art }: { art: Art }) {
  return (
    <>
      <rect x="20" y="16" width="60" height="84" rx="30" fill={art.body} />
      <path d="M62 18 A30 30 0 0 1 80 46 L80 70 A30 30 0 0 1 62 98 Z" fill={art.shade} opacity={art.shadeOpacity} />
      <path d="M30 26 A28 28 0 0 1 48 18" stroke={art.light} strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  );
}

/** Visor estreito, olhos em fenda inclinados — o olhar firme. */
function SlitVisor({ light }: { light: string }) {
  return (
    <>
      <rect x="29" y="36" width="42" height="20" rx="10" fill={VISOR} />
      <rect x="35" y="43" width="11" height="5" rx="2.5" fill={light} transform="rotate(10 40 45)" />
      <rect x="54" y="43" width="11" height="5" rx="2.5" fill={light} transform="rotate(-10 60 45)" />
    </>
  );
}

/** Visor largo, olhos redondos — o Julgamento é o que olha. */
function WideVisor({ light }: { light: string }) {
  return (
    <>
      <rect x="25" y="34" width="50" height="24" rx="12" fill={VISOR} />
      <circle cx="40" cy="46" r="5.5" fill={light} />
      <circle cx="60" cy="46" r="5.5" fill={light} />
      <circle cx="40" cy="46" r="2.2" fill={VISOR} />
      <circle cx="60" cy="46" r="2.2" fill={VISOR} />
    </>
  );
}

interface AgentProps {
  kind: AgentKind | "bloqueado";
  /** Altura em px; a largura segue a proporção 100×120. */
  size?: number;
  className?: string;
}

export function Agent({ kind, size = 96, className }: AgentProps) {
  const width = (size * 100) / 120;

  if (kind === "bloqueado") {
    return (
      <svg
        role="img"
        aria-label="Agente bloqueado"
        viewBox="0 0 100 120"
        width={width}
        height={size}
        className={className}
      >
        <Shadow />
        <Legs color="#1E1440" />
        <rect x="20" y="16" width="60" height="84" rx="30" fill="#251A4D" />
        <rect x="29" y="36" width="42" height="20" rx="10" fill="#160E30" />
        <rect x="42" y="68" width="16" height="13" rx="3" fill="#3B2C73" />
        <path d="M45 68 v-3.5 a5 5 0 0 1 10 0 v3.5" stroke="#3B2C73" strokeWidth="2.6" fill="none" />
      </svg>
    );
  }

  const art = ART[kind];
  return (
    <svg
      role="img"
      aria-label={`Agente ${AGENTS[kind].label}`}
      viewBox="0 0 100 120"
      width={width}
      height={size}
      className={className}
    >
      <Shadow />
      <Legs color={art.legs} />
      <Body art={art} />
      {kind === "julgamento" ? <WideVisor light={art.light} /> : <SlitVisor light={art.light} />}
      <circle cx="50" cy="74" r="9" fill={VISOR} />
      {art.badge}
    </svg>
  );
}
