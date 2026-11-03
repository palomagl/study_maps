import { describe, expect, it, vi } from "vitest";
import { flattenLessons, lessonSteps } from "@/content";
import { appNoArTrail } from "@/content/trails/app-no-ar";
import {
  createTestStore,
  defaultProfile,
  defaultState,
  parseState,
  type IssuedCertificate,
  type ProgressState,
} from "@/lib/progress-store";
import {
  conceptsToReview,
  hasRecurringDifficulty,
  lessonComplete,
} from "@/lib/progress-selectors";
import { buildCertificate, certificateGaps, issueEarnedCertificates } from "@/lib/certificate";

/*
 * Achados da revisão final do branch (31/10). Cada teste reproduz o que a
 * pessoa via de errado antes do conserto.
 */

describe("o desafio é opcional de verdade", () => {
  it("a aula conclui sem o desafio — como a tela promete", () => {
    const { lesson } = flattenLessons(appNoArTrail).find((l) => l.lesson.challenge)!;
    const state = defaultState();
    const steps: Record<string, boolean> = {};
    for (const s of lessonSteps(lesson)) if (s !== "challenge") steps[s] = true;
    state.lessons[lesson.id] = { steps, checkpoint: null };
    expect(lessonComplete(state, lesson)).toBe(true);
  });
});

describe("certificado emitido fica emitido", () => {
  const emitido = (state: ProgressState): ProgressState => ({
    ...state,
    profile: { ...defaultProfile(), name: "Paloma" },
    certificates: {
      "app-no-ar": { issuedAt: 1762000000000, proofUrl: "https://meu-app.vercel.app", code: "ABC1234" },
    },
  });

  it("continua valendo depois de refazer uma aula", () => {
    const state = emitido(defaultState());
    expect(certificateGaps(state, appNoArTrail)).toEqual([]);
  });

  it("guarda a data, o link e o código de quando foi emitido", () => {
    const cert = buildCertificate(emitido(defaultState()), appNoArTrail, 1999999999999)!;
    expect(cert.issuedAt).toBe(1762000000000);
    expect(cert.proofUrl).toBe("https://meu-app.vercel.app");
    expect(cert.code).toBe("ABC1234");
  });

  it("ainda precisa do nome pra mostrar", () => {
    const state = { ...emitido(defaultState()), profile: defaultProfile() };
    expect(certificateGaps(state, appNoArTrail)).toEqual(["name"]);
  });

  it("recordCertificate guarda a primeira emissão e não sobrescreve", () => {
    const store = createTestStore();
    store.recordCertificate("app-no-ar", { issuedAt: 1, proofUrl: "https://a.vercel.app", code: "X" });
    store.recordCertificate("app-no-ar", { issuedAt: 2, proofUrl: "https://b.vercel.app", code: "Y" });
    expect(store.getState().certificates["app-no-ar"]).toEqual({
      issuedAt: 1,
      proofUrl: "https://a.vercel.app",
      code: "X",
    });
  });

  it("refazer a aula não apaga o certificado", () => {
    const store = createTestStore();
    store.recordCertificate("app-no-ar", { issuedAt: 1, proofUrl: "https://a.vercel.app", code: "X" });
    store.resetLesson("ar-ideia-01-recortar");
    expect(store.getState().certificates["app-no-ar"]).toBeDefined();
  });

  it("parseState lê os certificados e descarta o que não presta", () => {
    const state = parseState(
      JSON.stringify({
        version: 4,
        certificates: {
          "app-no-ar": { issuedAt: 5, proofUrl: "https://a.vercel.app", code: "X" },
          ruim: { issuedAt: 1, proofUrl: "javascript:alert(1)", code: "Z" },
          outro: 3,
        },
      }),
    );
    expect(Object.keys(state.certificates)).toEqual(["app-no-ar"]);
    expect(parseState(JSON.stringify({ version: 4 })).certificates).toEqual({});
  });
});

describe("o link da prova tem que ser de algo publicado", () => {
  it("localhost, rede de casa e nome sem ponto não contam", () => {
    const store = createTestStore();
    for (const local of [
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://192.168.0.10",
      "http://10.0.0.2:8080",
      "http://172.16.4.1",
      "http://[::1]:5173",
      "http://meu-pc",
    ]) {
      expect(store.setProof("app-no-ar", local), local).toBe(false);
    }
  });

  it("o endereço da plataforma sozinho não é o teu app", () => {
    const store = createTestStore();
    for (const raiz of ["https://vercel.app", "https://onrender.com", "lovable.app"]) {
      expect(store.setProof("app-no-ar", raiz), raiz).toBe(false);
    }
  });

  it("link copiado sem https:// ganha o https://", () => {
    const store = createTestStore();
    expect(store.setProof("app-no-ar", "meu-app.vercel.app")).toBe(true);
    expect(store.getState().proofs["app-no-ar"].url).toBe("https://meu-app.vercel.app");
  });

  it("texto gigante colado por engano é recusado", () => {
    const store = createTestStore();
    expect(store.setProof("app-no-ar", `https://a.vercel.app/${"x".repeat(3000)}`)).toBe(false);
  });
});

describe("a revisão só lista conceito que ainda tem pergunta", () => {
  it("conceito de aula que não existe mais não aparece no painel", () => {
    const state = defaultState();
    state.concepts["closures-em-javascript"] = {
      errors: 3,
      lastErrorAt: 2,
      resolved: false,
      lessons: ["fe-js-03"],
    };
    state.concepts["pronto e outra pessoa abrir"] = {
      errors: 1,
      lastErrorAt: 1,
      resolved: false,
      lessons: ["ar-pub-03-no-ar"],
    };
    expect(conceptsToReview(state).map((c) => c.concept)).toEqual(["pronto e outra pessoa abrir"]);
    expect(hasRecurringDifficulty(state)).toBe(false);
  });
});

describe("o certificado é guardado assim que fica pronto", () => {
  /** A Trilha 1 inteira feita, com link e nome. */
  function pronto(): ProgressState {
    const state = defaultState();
    for (const { lesson } of flattenLessons(appNoArTrail)) {
      const steps: Record<string, boolean> = {};
      for (const s of lessonSteps(lesson)) steps[s] = true;
      state.lessons[lesson.id] = { steps, checkpoint: null };
    }
    state.proofs["app-no-ar"] = { url: "https://meu-app.vercel.app", savedAt: 1762000000000 };
    state.profile = { ...defaultProfile(), name: "Paloma" };
    return state;
  }

  it("guarda com a data de agora, o link e o código", () => {
    const guardados: [string, IssuedCertificate][] = [];
    issueEarnedCertificates(pronto(), [appNoArTrail], (id, c) => guardados.push([id, c]), 1770000000000);
    expect(guardados).toHaveLength(1);
    expect(guardados[0][0]).toBe("app-no-ar");
    expect(guardados[0][1].issuedAt).toBe(1770000000000);
    expect(guardados[0][1].proofUrl).toBe("https://meu-app.vercel.app");
    expect(guardados[0][1].code).toMatch(/^[0-9A-Z]{7}$/);
  });

  it("não guarda de novo o que já foi guardado, nem o que não tá pronto", () => {
    const guardar = vi.fn();
    const jaTem = { ...pronto(), certificates: { "app-no-ar": { issuedAt: 1, proofUrl: "https://a.vercel.app", code: "X" } } };
    issueEarnedCertificates(jaTem, [appNoArTrail], guardar);
    issueEarnedCertificates(defaultState(), [appNoArTrail], guardar);
    expect(guardar).not.toHaveBeenCalled();
  });
});
