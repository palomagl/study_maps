import type { Trail } from "@/content/types";
import { flattenLessons } from "@/content";
import type { ProgressState } from "@/lib/progress-store";
import { trailComplete } from "@/lib/progress-selectors";

/**
 * Certificado de conclusão.
 *
 * Ele não tem valor acadêmico e não finge ter. O que ele atesta é entrega:
 * por isso exige o link do que a pessoa publicou, além das aulas. Um
 * certificado que sai só por ter clicado em tudo é certificado de presença,
 * e certificado de presença é exatamente o que este projeto não quer ser.
 */

/**
 * O que ainda falta para o certificado existir, na ordem em que se resolve.
 *
 * `trail-unwritten` não é lacuna da pessoa, é da trilha: enquanto houver aula
 * em rascunho, `trailComplete` responderia "sim" só com as aulas escritas, e
 * o certificado afirmaria conclusão de uma trilha que ninguém pode concluir.
 */
export type CertificateGap = "trail-unwritten" | "lessons" | "proof" | "name";

export interface CertificateData {
  learnerName: string;
  trailTitle: string;
  /** O que a trilha atesta, na voz "você sabe…". */
  certifies: string[];
  proofUrl: string;
  issuedAt: number;
  /** Código curto e estável, para a pessoa citar ao compartilhar. */
  code: string;
}

export function certificateGaps(
  state: ProgressState,
  trail: Trail,
): CertificateGap[] {
  // Sozinha: as outras lacunas sugeririam que a pessoa pode resolver isso.
  if (flattenLessons(trail).some((l) => l.lesson.status !== "available")) {
    return ["trail-unwritten"];
  }

  const gaps: CertificateGap[] = [];
  if (!trailComplete(state, trail)) gaps.push("lessons");
  if (!state.proofs[trail.id]) gaps.push("proof");
  if (!state.profile.name?.trim()) gaps.push("name");
  return gaps;
}

/** FNV-1a de 32 bits, em base 36. Determinístico e curto. */
function shortHash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).toUpperCase().padStart(7, "0");
}

/**
 * `null` quando há qualquer lacuna — a página nunca decide elegibilidade por
 * conta própria. `now` é parâmetro para o código do certificado não depender
 * do relógio: ele identifica a entrega, não o momento da emissão.
 */
export function buildCertificate(
  state: ProgressState,
  trail: Trail,
  now: number = Date.now(),
): CertificateData | null {
  if (certificateGaps(state, trail).length > 0) return null;

  const proof = state.proofs[trail.id];
  const name = state.profile.name!.trim();

  return {
    learnerName: name,
    trailTitle: trail.title,
    certifies: trail.certifies,
    proofUrl: proof.url,
    issuedAt: now,
    code: shortHash(`${trail.id}|${proof.url}|${proof.savedAt}`),
  };
}

/** Texto curto do que falta, para mostrar no lugar do certificado. */
export function gapLabel(gap: CertificateGap): string {
  switch (gap) {
    case "trail-unwritten":
      return "Esta trilha ainda está sendo escrita";
    case "lessons":
      return "Concluir as aulas da trilha";
    case "proof":
      return "Registrar o link do que tu publicou";
    case "name":
      return "Dizer teu nome no início";
  }
}

/** Onde a pessoa resolve a lacuna. `null` quando não depende dela. */
export function gapHref(gap: CertificateGap, trailId: string): string | null {
  switch (gap) {
    case "trail-unwritten":
      return null;
    case "name":
      return "/inicio";
    case "lessons":
    case "proof":
      return `/roadmap/${trailId}`;
  }
}
