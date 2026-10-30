/**
 * O time: um agente por passo do loop.
 *
 * Cada fase da trilha tem um especialista; concluir as aulas da fase recruta
 * esse agente para o teu time. É a gamificação do StudyMaps — não a de
 * cobrar sequência todo dia, mas a de montar um time conforme tu avança.
 */

export type AgentKind =
  | "ideia"
  | "pedido"
  | "geracao"
  | "julgamento"
  | "conserto"
  | "noar";

export interface AgentInfo {
  label: string;
  /** Cor do corpo — também a cor que representa a fase. */
  color: string;
}

/** Na ordem do loop. */
export const AGENTS: Record<AgentKind, AgentInfo> = {
  ideia: { label: "Ideia", color: "#FFB020" },
  pedido: { label: "Pedido", color: "#3DF5B0" },
  geracao: { label: "Geração", color: "#FF3D9A" },
  julgamento: { label: "Julgamento", color: "#7C5CFF" },
  conserto: { label: "Conserto", color: "#FF6B2C" },
  noar: { label: "No ar", color: "#2EC5FF" },
};

const PHASE_AGENT: Record<string, AgentKind> = {
  "ar-p1": "ideia",
  "ar-p2": "pedido",
  "ar-p3": "geracao",
  "ar-p4": "julgamento",
  "ar-p5": "conserto",
  "ar-p6": "noar",
};

/** O agente da fase, ou `null` para fases fora da Trilha 1. */
export function agentForPhase(phaseId: string): AgentKind | null {
  return PHASE_AGENT[phaseId] ?? null;
}
