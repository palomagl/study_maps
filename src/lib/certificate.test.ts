import { describe, expect, it } from "vitest";
import { flattenLessons, lessonSteps } from "@/content";
import { appNoArTrail } from "@/content/trails/app-no-ar";
import {
  defaultProfile,
  defaultState,
  type ProgressState,
} from "@/lib/progress-store";
import { buildCertificate, certificateGaps } from "@/lib/certificate";

/** Todos os passos de todas as aulas `available` da trilha, concluídos. */
function stateWithTrailComplete(): ProgressState {
  const state = defaultState();
  for (const { lesson } of flattenLessons(appNoArTrail)) {
    if (lesson.status !== "available") continue;
    const steps: Record<string, boolean> = {};
    for (const s of lessonSteps(lesson)) steps[s] = true;
    state.lessons[lesson.id] = { steps, checkpoint: null };
  }
  return state;
}

const comProva = (state: ProgressState): ProgressState => ({
  ...state,
  proofs: {
    "app-no-ar": { url: "https://meu-app.vercel.app", savedAt: 1762000000000 },
  },
});

const comNome = (state: ProgressState): ProgressState => ({
  ...state,
  profile: { ...defaultProfile(), name: "Paloma" },
});

/**
 * O certificado não atesta presença, atesta entrega. Por isso ele exige o
 * link: sem o que a pessoa publicou, não há o que certificar.
 */
describe("certificado", () => {
  it("sem o link da prova não há certificado, mesmo com a trilha concluída", () => {
    const state = comNome(stateWithTrailComplete());
    expect(certificateGaps(state, appNoArTrail)).toEqual(["proof"]);
    expect(buildCertificate(state, appNoArTrail)).toBeNull();
  });

  it("com o link mas sem a trilha concluída também não há certificado", () => {
    const state = comProva(comNome(defaultState()));
    expect(certificateGaps(state, appNoArTrail)).toContain("lessons");
    expect(buildCertificate(state, appNoArTrail)).toBeNull();
  });

  it("sem nome no perfil o certificado não é emitido", () => {
    const state = comProva(stateWithTrailComplete());
    expect(certificateGaps(state, appNoArTrail)).toEqual(["name"]);
    expect(buildCertificate(state, appNoArTrail)).toBeNull();
  });

  it("trilha concluída + link + nome emite o certificado com o link dentro", () => {
    const state = comProva(comNome(stateWithTrailComplete()));
    const cert = buildCertificate(state, appNoArTrail, 1762000000000)!;

    expect(certificateGaps(state, appNoArTrail)).toEqual([]);
    expect(cert.learnerName).toBe("Paloma");
    expect(cert.trailTitle).toBe(appNoArTrail.title);
    expect(cert.proofUrl).toBe("https://meu-app.vercel.app");
    expect(cert.certifies).toEqual(appNoArTrail.certifies);
    expect(cert.certifies.length).toBeGreaterThan(0);
    expect(cert.issuedAt).toBe(1762000000000);
  });

  it("o código do certificado é estável para o mesmo estado", () => {
    const state = comProva(comNome(stateWithTrailComplete()));
    const a = buildCertificate(state, appNoArTrail, 1)!;
    const b = buildCertificate(state, appNoArTrail, 999)!;
    expect(a.code).toBe(b.code);
    expect(a.code.length).toBeGreaterThanOrEqual(6);
  });

  it("links diferentes geram códigos diferentes", () => {
    const base = comNome(stateWithTrailComplete());
    const um = buildCertificate(comProva(base), appNoArTrail, 1)!;
    const outro = buildCertificate(
      {
        ...base,
        proofs: { "app-no-ar": { url: "https://outro.vercel.app", savedAt: 1 } },
      },
      appNoArTrail,
      1,
    )!;
    expect(um.code).not.toBe(outro.code);
  });
});
