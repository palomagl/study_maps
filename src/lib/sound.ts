import { AGENTS, type AgentKind } from "@/lib/agents";

/**
 * Som da aula: toque, acerto, erro, fim e os bipes de cada robô. Tudo gerado
 * no navegador (Web Audio) — sem arquivo, sem serviço pago. Onde não tem
 * áudio (testes) ou vibração (iPhone), cada função simplesmente não faz nada.
 */

const MUTE_KEY = "studymaps:som";

let muted = (() => {
  try {
    return localStorage.getItem(MUTE_KEY) === "mudo";
  } catch {
    return false;
  }
})();

export function isMuted(): boolean {
  return muted;
}

export function setMuted(v: boolean): void {
  muted = v;
  try {
    localStorage.setItem(MUTE_KEY, v ? "mudo" : "som");
  } catch {
    /* sem storage: vale só nesta visita */
  }
}

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  if (muted) return null;
  const AC =
    typeof window !== "undefined"
      ? window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      : undefined;
  if (!AC) return null;
  try {
    ctx ??= new AC();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, at: number, dur: number, wave: OscillatorType, vol: number): void {
  const c = audio();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  const t = c.currentTime + at;
  o.type = wave;
  o.frequency.setValueAtTime(freq, t);
  o.frequency.exponentialRampToValueAtTime(freq * 1.12, t + dur);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.03);
}

export const sfx = {
  tap: () => tone(660, 0, 0.06, "triangle", 0.08),
  /** Duas notas subindo — a mesma ideia do "ding" de acerto do Duolingo. */
  right: () => {
    tone(784, 0, 0.12, "triangle", 0.16);
    tone(1175, 0.09, 0.22, "triangle", 0.16);
  },
  wrong: () => {
    tone(220, 0, 0.18, "sawtooth", 0.07);
    tone(180, 0.12, 0.25, "sawtooth", 0.07);
  },
  finish: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.09, 0.3, "triangle", 0.14)),
};

/** Um bipe na voz do robô. A pergunta e a exclamação sobem no fim. */
export function babble(agent: AgentKind, syllable: string): void {
  const v = AGENTS[agent].voice;
  const sobe = /[?!]/.test(syllable) ? 1.25 : 1;
  tone((v.base + Math.random() * v.spread) * sobe, 0, (v.ms / 1000) * 0.9, v.wave, v.vol);
}

export function vibrate(pattern: number | number[]): void {
  if (muted) return;
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* sem vibração (iPhone, computador) */
  }
}
