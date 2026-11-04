import type { PlayCard } from "@/content/types";

/**
 * A lógica pura da aula em telas: conferir resposta, trocar `{chave}` pelo
 * que a pessoa escreveu, e quebrar a fala em pedaços pros bipes do robô.
 */

/** XP de um pedaço inteiro — pedaço só conta inteiro. */
export const PIECE_XP = 40;
/** Tamanho máximo do que a pessoa escreve numa tela "escrever". */
export const NOTE_MAX = 140;

const mesmoConjunto = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join("\u0000") === [...b].sort().join("\u0000");

/** `answer`: id da alternativa (escolha) ou os textos (cortar: os que ficam; montar: em ordem). */
export function checkAnswer(card: PlayCard, answer: string | string[]): boolean {
  switch (card.kind) {
    case "escolha":
      return answer === card.correctId;
    case "cortar":
      return Array.isArray(answer) && mesmoConjunto(answer, card.chips.filter((c) => c.keep).map((c) => c.text));
    case "montar":
      return Array.isArray(answer) && answer.join("\u0000") === card.answer.join("\u0000");
    default:
      return true;
  }
}

/** Troca `{chave}` pela nota da pessoa, ou pelo texto alternativo. Nunca deixa `{chave}` na tela. */
export function fillNotes(
  text: string,
  notes: Record<string, string>,
  fallback: Record<string, string>,
): string {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => notes[k]?.trim() || fallback[k] || "");
}

/** Pedaços da fala pra cada bipe: uma sílaba aproximada, com a pontuação grudada. */
export function syllables(text: string): string[] {
  return text.match(/\s*[^aeiouáéíóúâêôãõà\s]*[aeiouáéíóúâêôãõà]+[^\s]*?(?=[^aeiouáéíóúâêôãõà\s]*[aeiouáéíóúâêôãõà]|\s|$)|\s*\S+/gi) ?? [];
}
