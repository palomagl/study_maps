import { describe, expect, it } from "vitest";
import { flattenLessons, lessonSteps } from "@/content";
import type { Trail } from "@/content/types";
import { appNoArTrail } from "@/content/trails/app-no-ar";
import {
  defaultProfile,
  defaultState,
  type ProgressState,
} from "@/lib/progress-store";
import {
  buildCertificate,
  certificateGaps,
  gapHref,
} from "@/lib/certificate";

/** A mesma trilha, como ela ficará quando as 12 aulas estiverem escritas. */
const trilhaEscrita: Trail = {
  ...appNoArTrail,
  phases: appNoArTrail.phases
    .map((p) => ({
      ...p,
      stages: p.stages.map((s) => ({
        ...s,
        lessons: s.lessons.filter((l) => l.status === "available"),
      })),
    }))
    .filter((p) => p.stages.some((s) => s.lessons.length > 0)),
};

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
 *
 * Os testes de emissão usam `trilhaEscrita` porque a trilha real ainda tem
 * onze aulas por escrever — e, enquanto tiver, nenhum certificado sai (ver
 * o bloco "trilha ainda sendo escrita" no fim deste arquivo).
 */
describe("certificado", () => {
  it("sem o link da prova não há certificado, mesmo com a trilha concluída", () => {
    const state = comNome(stateWithTrailComplete());
    expect(certificateGaps(state, trilhaEscrita)).toEqual(["proof"]);
    expect(buildCertificate(state, trilhaEscrita)).toBeNull();
  });

  it("com o link mas sem a trilha concluída também não há certificado", () => {
    const state = comProva(comNome(defaultState()));
    expect(certificateGaps(state, trilhaEscrita)).toContain("lessons");
    expect(buildCertificate(state, trilhaEscrita)).toBeNull();
  });

  it("sem nome no perfil o certificado não é emitido", () => {
    const state = comProva(stateWithTrailComplete());
    expect(certificateGaps(state, trilhaEscrita)).toEqual(["name"]);
    expect(buildCertificate(state, trilhaEscrita)).toBeNull();
  });

  it("trilha concluída + link + nome emite o certificado com o link dentro", () => {
    const state = comProva(comNome(stateWithTrailComplete()));
    const cert = buildCertificate(state, trilhaEscrita, 1762000000000)!;

    expect(certificateGaps(state, trilhaEscrita)).toEqual([]);
    expect(cert.learnerName).toBe("Paloma");
    expect(cert.trailTitle).toBe(appNoArTrail.title);
    expect(cert.proofUrl).toBe("https://meu-app.vercel.app");
    expect(cert.certifies).toEqual(appNoArTrail.certifies);
    expect(cert.certifies.length).toBeGreaterThan(0);
    expect(cert.issuedAt).toBe(1762000000000);
  });

  it("o código do certificado é estável para o mesmo estado", () => {
    const state = comProva(comNome(stateWithTrailComplete()));
    const a = buildCertificate(state, trilhaEscrita, 1)!;
    const b = buildCertificate(state, trilhaEscrita, 999)!;
    expect(a.code).toBe(b.code);
    expect(a.code.length).toBeGreaterThanOrEqual(6);
  });

  it("links diferentes geram códigos diferentes", () => {
    const base = comNome(stateWithTrailComplete());
    const um = buildCertificate(comProva(base), trilhaEscrita, 1)!;
    const outro = buildCertificate(
      {
        ...base,
        proofs: { "app-no-ar": { url: "https://outro.vercel.app", savedAt: 1 } },
      },
      trilhaEscrita,
      1,
    )!;
    expect(um.code).not.toBe(outro.code);
  });
});

/**
 * A trilha tem 12 aulas e só uma escrita. `trailComplete` conta apenas as
 * aulas `available`, então concluir essa uma bastaria para o certificado
 * afirmar "concluiu a trilha" — uma afirmação falsa, num papel feito
 * justamente para sair do app e ser mostrado a outra pessoa.
 */
describe("trilha ainda sendo escrita", () => {
  it("não emite certificado mesmo com tudo que a pessoa podia fazer feito", () => {
    const state = comProva(comNome(stateWithTrailComplete()));
    expect(certificateGaps(state, appNoArTrail)).toEqual(["trail-unwritten"]);
    expect(buildCertificate(state, appNoArTrail)).toBeNull();
  });

  it("é a única lacuna mostrada — não há o que a pessoa fazer a respeito", () => {
    expect(certificateGaps(defaultState(), appNoArTrail)).toEqual([
      "trail-unwritten",
    ]);
  });
});

describe("para onde a pessoa vai resolver cada lacuna", () => {
  it("o nome se resolve no onboarding, não na trilha", () => {
    expect(gapHref("name", "app-no-ar")).toBe("/inicio");
  });

  it("aulas e prova se resolvem na trilha", () => {
    expect(gapHref("lessons", "app-no-ar")).toBe("/roadmap/app-no-ar");
    expect(gapHref("proof", "app-no-ar")).toBe("/roadmap/app-no-ar");
  });

  it("trilha por escrever não tem para onde ir — não depende da pessoa", () => {
    expect(gapHref("trail-unwritten", "app-no-ar")).toBeNull();
  });
});
