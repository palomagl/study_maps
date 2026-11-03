import type { LessonStepId } from "@/content/types";
import {
  createDefaultStorage,
  InMemoryStorageAdapter,
  type StorageAdapter,
} from "@/lib/storage";

/* ------------------------------------------------------------------ */
/* Schema (v4)                                                        */
/* ------------------------------------------------------------------ */
/* v1: 3 trilhas × 10 nós (chave "studymaps-progress").               */
/* v2: aulas/passos/checkpoint/conceitos/streak.                      */
/* v3 (aditivo): + missionsClaimed, + profile. Um blob v2 é lido sem  */
/*     migração: os campos novos caem no default.                     */
/* v4 (aditivo): + checklists por aula. Um blob v3 é lido sem         */
/*     migração e mantém XP, conquistas e sequência intactos.         */

export const STORAGE_KEY = "studymaps:progress:v2";
const LEGACY_KEY = "studymaps-progress"; // schema v1 (3 trilhas × 10 nós)

export interface CheckpointRecord {
  attempts: number;
  bestScore: number;
  bestTotal: number;
  passed: boolean;
}

/** Os dois painéis que têm checklist numa aula. */
export type ChecklistPanel = "exercise" | "challenge";

export interface LessonProgress {
  steps: Partial<Record<LessonStepId, boolean>>;
  checkpoint: CheckpointRecord | null;
  /**
   * Índices marcados do checklist, por painel. Persistido porque o trabalho
   * real do aluno acontece fora do app, ao longo de dias — recarregar a
   * página não pode apagar o que ele já conseguiu.
   */
  checklists?: Partial<Record<ChecklistPanel, number[]>>;
}

export interface ConceptRecord {
  /** Quantas vezes o usuário errou uma pergunta deste conceito. */
  errors: number;
  lastErrorAt: number;
  /** Marcado quando o usuário revisa e acerta de novo. */
  resolved: boolean;
  /** Aulas em que o conceito foi errado. */
  lessons: string[];
}

export interface StreakState {
  current: number;
  longest: number;
  /** "YYYY-MM-DD" no fuso local, ou null se nunca estudou. */
  lastStudyDate: string | null;
}

export interface ProfileState {
  name: string | null;
  /** Objetivo escolhido no onboarding: "frontend" | "backend" | "fullstack" | "apps" | "indeciso". */
  goal: string | null;
  /** Experiência declarada: "nunca" | "contato" | "projetos" | "programo". */
  experience: string | null;
  onboardedAt: number | null;
}

/**
 * O link do que a pessoa publicou. É a prova da trilha — autodeclarado,
 * porque não existe backend para verificar, e isso é aceito de propósito:
 * quem cola um link falso está enganando a si mesmo, e o app não é
 * fiscal. O que ele não aceita é um recado no lugar de um link.
 */
export interface ProofRecord {
  url: string;
  savedAt: number;
}

export interface ProgressState {
  version: 4;
  xp: number;
  lessons: Record<string, LessonProgress>;
  concepts: Record<string, ConceptRecord>;
  streak: StreakState;
  /** Ids de conquistas desbloqueadas. */
  achievements: string[];
  /** Ids de missões cujo bônus já foi resgatado. */
  missionsClaimed: string[];
  /** Link publicado por trilha. Chave = TrailId. */
  proofs: Record<string, ProofRecord>;
  /** Certificado já emitido, por trilha. Chave = TrailId. */
  certificates: Record<string, IssuedCertificate>;
  profile: ProfileState;
}

/** O que fica guardado quando o certificado sai pela primeira vez. */
export interface IssuedCertificate {
  issuedAt: number;
  proofUrl: string;
  code: string;
}

const MAX_PROOF_URL = 2000;

/**
 * Raiz de plataforma sozinha não é o app de ninguém — é o endereço da
 * plataforma. O app mora num subdomínio dela.
 */
const PLATFORM_ROOTS = new Set([
  "vercel.app",
  "onrender.com",
  "netlify.app",
  "github.io",
  "lovable.app",
]);

/** Endereço que só abre no computador da pessoa ou na rede da casa dela. */
function isLocalHost(host: string): boolean {
  const h = host.replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost") || h === "::1" || h === "0.0.0.0") return true;
  if (!h.includes(".")) return true; // "meu-pc", nome de máquina
  const ip = h.match(/^(\d+)\.(\d+)\.\d+\.\d+$/);
  if (!ip) return false;
  const [a, b] = [Number(ip[1]), Number(ip[2])];
  return a === 127 || a === 10 || (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31);
}

/**
 * Aceita só http(s) de algo publicado: nada de localhost, rede de casa ou
 * raiz de plataforma. Link copiado sem o https:// ganha o https:// — a
 * Vercel mostra o domínio assim no painel. Devolve o texto (com o https://
 * quando faltou), ou null.
 */
export function parseProofUrl(value: string): string | null {
  let text = value.trim();
  if (!text || text.length > MAX_PROOF_URL || /\s/.test(text)) return null;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(text)) text = `https://${text}`;
  try {
    const url = new URL(text);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    if (isLocalHost(host) || PLATFORM_ROOTS.has(host)) return null;
    return text;
  } catch {
    return null;
  }
}

export function defaultProfile(): ProfileState {
  return { name: null, goal: null, experience: null, onboardedAt: null };
}

export function defaultState(): ProgressState {
  return {
    version: 4,
    xp: 0,
    lessons: {},
    concepts: {},
    streak: { current: 0, longest: 0, lastStudyDate: null },
    achievements: [],
    missionsClaimed: [],
    proofs: {},
    certificates: {},
    profile: defaultProfile(),
  };
}

export const EMPTY_LESSON_PROGRESS: LessonProgress = { steps: {}, checkpoint: null };

/* ------------------------------------------------------------------ */
/* Validação / parsing defensivo                                      */
/* ------------------------------------------------------------------ */

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function coerceLessonProgress(raw: unknown): LessonProgress {
  if (!isObject(raw)) return { steps: {}, checkpoint: null };

  const steps: LessonProgress["steps"] = {};
  if (isObject(raw.steps)) {
    for (const [k, v] of Object.entries(raw.steps)) {
      if (v === true) steps[k as LessonStepId] = true;
    }
  }

  let checkpoint: CheckpointRecord | null = null;
  if (isObject(raw.checkpoint)) {
    checkpoint = {
      attempts: Number(raw.checkpoint.attempts) || 0,
      bestScore: Number(raw.checkpoint.bestScore) || 0,
      bestTotal: Number(raw.checkpoint.bestTotal) || 0,
      passed: raw.checkpoint.passed === true,
    };
  }

  let checklists: LessonProgress["checklists"];
  if (isObject(raw.checklists)) {
    const out: Partial<Record<ChecklistPanel, number[]>> = {};
    for (const panel of ["exercise", "challenge"] as const) {
      const v = raw.checklists[panel];
      if (Array.isArray(v)) {
        out[panel] = v.filter((x): x is number => typeof x === "number");
      }
    }
    if (Object.keys(out).length > 0) checklists = out;
  }

  return { steps, checkpoint, checklists };
}

function coerceConcept(raw: unknown): ConceptRecord {
  if (!isObject(raw)) return { errors: 0, lastErrorAt: 0, resolved: false, lessons: [] };
  return {
    errors: Number(raw.errors) || 0,
    lastErrorAt: Number(raw.lastErrorAt) || 0,
    resolved: raw.resolved === true,
    lessons: Array.isArray(raw.lessons)
      ? raw.lessons.filter((x): x is string => typeof x === "string")
      : [],
  };
}

/** Nunca lança. Qualquer coisa fora do formato vira o default. */
export function parseState(rawJson: string | null): ProgressState {
  if (!rawJson) return defaultState();

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawJson);
  } catch {
    return defaultState();
  }
  if (!isObject(parsed)) return defaultState();

  const base = defaultState();

  const lessons: ProgressState["lessons"] = {};
  if (isObject(parsed.lessons)) {
    for (const [id, lp] of Object.entries(parsed.lessons)) {
      lessons[id] = coerceLessonProgress(lp);
    }
  }

  const concepts: ProgressState["concepts"] = {};
  if (isObject(parsed.concepts)) {
    for (const [id, c] of Object.entries(parsed.concepts)) {
      concepts[id] = coerceConcept(c);
    }
  }

  const streak: StreakState = isObject(parsed.streak)
    ? {
        current: Number(parsed.streak.current) || 0,
        longest: Number(parsed.streak.longest) || 0,
        lastStudyDate:
          typeof parsed.streak.lastStudyDate === "string"
            ? parsed.streak.lastStudyDate
            : null,
      }
    : base.streak;

  const strArray = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

  const proofs: ProgressState["proofs"] = {};
  if (isObject(parsed.proofs)) {
    for (const [trailId, raw] of Object.entries(parsed.proofs)) {
      if (!isObject(raw) || typeof raw.url !== "string") continue;
      const url = parseProofUrl(raw.url);
      if (!url) continue;
      proofs[trailId] = { url, savedAt: Number(raw.savedAt) || 0 };
    }
  }

  const certificates: ProgressState["certificates"] = {};
  if (isObject(parsed.certificates)) {
    for (const [trailId, raw] of Object.entries(parsed.certificates)) {
      if (!isObject(raw) || typeof raw.proofUrl !== "string" || typeof raw.code !== "string") continue;
      const proofUrl = parseProofUrl(raw.proofUrl);
      if (!proofUrl) continue;
      certificates[trailId] = { issuedAt: Number(raw.issuedAt) || 0, proofUrl, code: raw.code };
    }
  }

  const rawProfile = isObject(parsed.profile) ? parsed.profile : {};
  const str = (v: unknown): string | null => (typeof v === "string" ? v : null);
  const profile: ProfileState = {
    name: str(rawProfile.name),
    goal: str(rawProfile.goal),
    experience: str(rawProfile.experience),
    onboardedAt:
      typeof rawProfile.onboardedAt === "number" ? rawProfile.onboardedAt : null,
  };

  return {
    version: 4,
    xp: Number(parsed.xp) || 0,
    lessons,
    concepts,
    streak,
    achievements: strArray(parsed.achievements),
    missionsClaimed: strArray(parsed.missionsClaimed),
    proofs,
    certificates,
    profile,
  };
}

/* ------------------------------------------------------------------ */
/* Datas / streak                                                     */
/* ------------------------------------------------------------------ */

export function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function isYesterday(prev: string, today: string): boolean {
  const p = new Date(prev + "T00:00:00");
  const t = new Date(today + "T00:00:00");
  return t.getTime() - p.getTime() === 86_400_000;
}

function touchStreak(streak: StreakState, today = localDateKey()): StreakState {
  if (streak.lastStudyDate === today) return streak;
  let current: number;
  if (streak.lastStudyDate && isYesterday(streak.lastStudyDate, today)) {
    current = streak.current + 1;
  } else {
    current = 1;
  }
  return {
    current,
    longest: Math.max(streak.longest, current),
    lastStudyDate: today,
  };
}

/* ------------------------------------------------------------------ */
/* Store                                                              */
/* ------------------------------------------------------------------ */

type Listener = () => void;

export class ProgressStore {
  private state: ProgressState;
  private listeners = new Set<Listener>();
  private storageUnsub: (() => void) | null = null;

  constructor(private storage: StorageAdapter) {
    this.migrateLegacyIfNeeded();
    this.state = parseState(this.storage.get(STORAGE_KEY));
  }

  /** v1 usava ids de nó incompatíveis com as novas aulas: não há mapeamento
   *  seguro de progresso. Preservamos o dado antigo num backup e começamos v2
   *  limpo — nada é apagado. */
  private migrateLegacyIfNeeded() {
    if (this.storage.get(STORAGE_KEY)) return;
    const legacy = this.storage.get(LEGACY_KEY);
    if (legacy) {
      this.storage.set(`${LEGACY_KEY}.backup`, legacy);
      this.storage.remove(LEGACY_KEY);
    }
    this.storage.set(STORAGE_KEY, JSON.stringify(defaultState()));
  }

  /* -------- external-store contract -------- */

  getState = (): ProgressState => this.state;

  subscribe = (listener: Listener): (() => void) => {
    this.listeners.add(listener);
    if (this.listeners.size === 1) {
      this.storageUnsub = this.storage.subscribe(STORAGE_KEY, () => {
        this.state = parseState(this.storage.get(STORAGE_KEY));
        this.emit();
      });
    }
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.storageUnsub) {
        this.storageUnsub();
        this.storageUnsub = null;
      }
    };
  };

  private emit() {
    for (const l of this.listeners) l();
  }

  private commit(next: ProgressState) {
    this.state = next;
    this.storage.set(STORAGE_KEY, JSON.stringify(next));
    this.emit();
  }

  private lesson(id: string): LessonProgress {
    return this.state.lessons[id] ?? { steps: {}, checkpoint: null };
  }

  /* -------- mutations -------- */

  /** Marca um passo como concluído. Idempotente: XP só é somado na 1ª vez. */
  completeStep(lessonId: string, step: LessonStepId, xpGain: number): void {
    const lp = this.lesson(lessonId);
    if (lp.steps[step]) return;

    this.commit({
      ...this.state,
      xp: this.state.xp + Math.max(0, xpGain),
      streak: touchStreak(this.state.streak),
      lessons: {
        ...this.state.lessons,
        [lessonId]: { ...lp, steps: { ...lp.steps, [step]: true } },
      },
    });
  }

  /** Desfaz um passo. Não remove XP (não punir). */
  uncompleteStep(lessonId: string, step: LessonStepId): void {
    const lp = this.lesson(lessonId);
    if (!lp.steps[step]) return;
    const steps = { ...lp.steps };
    delete steps[step];
    this.commit({
      ...this.state,
      lessons: { ...this.state.lessons, [lessonId]: { ...lp, steps } },
    });
  }

  /** Marca/desmarca um item do checklist. Não envolve XP — quem credita é o passo. */
  toggleChecklistItem(lessonId: string, which: ChecklistPanel, index: number): void {
    const lp = this.lesson(lessonId);
    const current = lp.checklists?.[which] ?? [];
    const next = current.includes(index)
      ? current.filter((i) => i !== index)
      : [...current, index].sort((a, b) => a - b);

    this.commit({
      ...this.state,
      lessons: {
        ...this.state.lessons,
        [lessonId]: { ...lp, checklists: { ...lp.checklists, [which]: next } },
      },
    });
  }

  /** Registra uma tentativa de checkpoint. Ao passar, credita o XP uma vez. */
  recordCheckpoint(
    lessonId: string,
    result: { score: number; total: number; passed: boolean; xpOnPass: number },
  ): void {
    const lp = this.lesson(lessonId);
    const prev = lp.checkpoint;
    const passedBefore = prev?.passed ?? false;

    const checkpoint: CheckpointRecord = {
      attempts: (prev?.attempts ?? 0) + 1,
      bestScore: Math.max(prev?.bestScore ?? 0, result.score),
      bestTotal: result.total,
      passed: passedBefore || result.passed,
    };

    const stepDone = lp.steps.checkpoint === true;
    const creditXp = result.passed && !stepDone;

    this.commit({
      ...this.state,
      xp: this.state.xp + (creditXp ? Math.max(0, result.xpOnPass) : 0),
      streak: touchStreak(this.state.streak),
      lessons: {
        ...this.state.lessons,
        [lessonId]: {
          ...lp,
          checkpoint,
          steps: creditXp ? { ...lp.steps, checkpoint: true } : lp.steps,
        },
      },
    });
  }

  /** Registra que o usuário errou uma pergunta de determinado conceito. */
  recordConceptError(concept: string, lessonId: string): void {
    const prev =
      this.state.concepts[concept] ??
      ({ errors: 0, lastErrorAt: 0, resolved: false, lessons: [] } as ConceptRecord);
    this.commit({
      ...this.state,
      concepts: {
        ...this.state.concepts,
        [concept]: {
          errors: prev.errors + 1,
          lastErrorAt: Date.now(),
          resolved: false,
          lessons: prev.lessons.includes(lessonId)
            ? prev.lessons
            : [...prev.lessons, lessonId],
        },
      },
    });
  }

  resolveConcept(concept: string): void {
    const prev = this.state.concepts[concept];
    if (!prev || prev.resolved) return;
    this.commit({
      ...this.state,
      concepts: { ...this.state.concepts, [concept]: { ...prev, resolved: true } },
    });
  }

  /* -------- gamificação -------- */

  /** Adiciona conquistas ainda não registradas. Devolve as recém-desbloqueadas. */
  unlockAchievements(ids: string[]): string[] {
    const fresh = ids.filter((id) => !this.state.achievements.includes(id));
    if (fresh.length === 0) return [];
    this.commit({
      ...this.state,
      achievements: [...this.state.achievements, ...fresh],
    });
    return fresh;
  }

  /** Resgata o bônus de uma missão uma única vez. */
  claimMission(id: string, bonusXp: number): boolean {
    if (this.state.missionsClaimed.includes(id)) return false;
    this.commit({
      ...this.state,
      xp: this.state.xp + Math.max(0, bonusXp),
      missionsClaimed: [...this.state.missionsClaimed, id],
    });
    return true;
  }

  /* -------- prova publicada -------- */

  /** Registra o link do que a pessoa publicou. `false` = não era um link. */
  setProof(trailId: string, url: string): boolean {
    const valid = parseProofUrl(url);
    if (!valid) return false;
    this.commit({
      ...this.state,
      proofs: {
        ...this.state.proofs,
        [trailId]: { url: valid, savedAt: Date.now() },
      },
    });
    return true;
  }

  /**
   * Guarda o certificado na primeira vez que ele sai, e nunca sobrescreve.
   * Daí em diante ele vale mesmo que a pessoa refaça uma aula ou que a
   * trilha ganhe aula nova — certificado não é pra sumir.
   */
  recordCertificate(trailId: string, cert: IssuedCertificate): void {
    if (this.state.certificates[trailId]) return;
    this.commit({
      ...this.state,
      certificates: { ...this.state.certificates, [trailId]: cert },
    });
  }

  /* -------- perfil / onboarding -------- */

  setProfile(patch: Partial<ProfileState>): void {
    const next = { ...this.state.profile, ...patch };
    this.commit({ ...this.state, profile: next });
  }

  completeOnboarding(patch: Partial<ProfileState>): void {
    this.commit({
      ...this.state,
      profile: {
        ...this.state.profile,
        ...patch,
        onboardedAt: this.state.profile.onboardedAt ?? Date.now(),
      },
    });
  }

  /** Zera o progresso de uma aula (útil para "refazer aula" e em testes). */
  resetLesson(lessonId: string): void {
    if (!this.state.lessons[lessonId]) return;
    const lessons = { ...this.state.lessons };
    delete lessons[lessonId];
    this.commit({ ...this.state, lessons });
  }

  /** Apaga tudo. */
  resetAll(): void {
    this.commit(defaultState());
  }
}

/* ------------------------------------------------------------------ */
/* Singleton do app                                                   */
/* ------------------------------------------------------------------ */

export const progressStore = new ProgressStore(createDefaultStorage());

/** Fábrica isolada para testes. */
export function createTestStore(): ProgressStore {
  return new ProgressStore(new InMemoryStorageAdapter());
}
