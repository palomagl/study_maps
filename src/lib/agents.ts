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

/**
 * A "voz" do robô: bipes por sílaba, tipo personagem de jogo. Cada um tem
 * altura, variação, timbre e ritmo próprios — o jeito de falar é parte de
 * quem ele é (spec da aula interativa, 04/11).
 */
export interface AgentVoice {
  /** Frequência base, em Hz. */
  base: number;
  /** Quanto a altura varia de sílaba pra sílaba, em Hz. */
  spread: number;
  wave: OscillatorType;
  /** Duração de cada sílaba, em ms. */
  ms: number;
  vol: number;
}

export interface AgentInfo {
  label: string;
  /** Cor do corpo — também a cor que representa a fase. */
  color: string;
  /** Quem ele é no time, numa frase. */
  persona: string;
  catchphrase: string;
  voice: AgentVoice;
}

/** Na ordem do loop. */
export const AGENTS: Record<AgentKind, AgentInfo> = {
  ideia: {
    label: "Ideia", color: "#FFB020", persona: "o sonhador acelerado", catchphrase: "E se a gente…?!",
    voice: { base: 620, spread: 260, wave: "square", ms: 55, vol: 0.05 },
  },
  pedido: {
    label: "Pedido", color: "#3DF5B0", persona: "o certinho que pergunta tudo", catchphrase: "Mas como assim, exatamente?",
    voice: { base: 480, spread: 90, wave: "sine", ms: 75, vol: 0.09 },
  },
  geracao: {
    label: "Geração", color: "#FF3D9A", persona: "o fazedor ansioso", catchphrase: "Já tô fazendo!",
    voice: { base: 760, spread: 340, wave: "triangle", ms: 38, vol: 0.1 },
  },
  julgamento: {
    label: "Julgamento", color: "#7C5CFF", persona: "o chato com bom gosto", catchphrase: "Hmm. Não.",
    voice: { base: 300, spread: 60, wave: "sine", ms: 110, vol: 0.12 },
  },
  conserto: {
    label: "Conserto", color: "#FF6B2C", persona: "o calmo de poucas palavras", catchphrase: "Um de cada vez.",
    voice: { base: 260, spread: 40, wave: "triangle", ms: 120, vol: 0.14 },
  },
  noar: {
    label: "No ar", color: "#2EC5FF", persona: "o hype", catchphrase: "Manda o link!",
    voice: { base: 540, spread: 420, wave: "square", ms: 48, vol: 0.045 },
  },
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
