/**
 * StudyMaps – modelo de conteúdo.
 *
 * Hierarquia:
 *   Trail (trilha) → Phase (fase) → Stage (etapa) → Lesson (aula)
 *   Lesson: blocos de conteúdo, vídeo, recursos grátis, recurso premium,
 *           perguntas, exercício, desafio e checkpoint.
 *   Trail também carrega um catálogo de projetos (showcase).
 *
 * Nada aqui é renderizado diretamente – os componentes recebem estes tipos.
 */

/**
 * Trilhas de entrega (as atuais) e trilhas de código (arquivadas).
 *
 * As três de código saem do currículo na virada para trilhas de entrega, mas
 * continuam no tipo porque seus arquivos permanecem no repositório, em
 * `src/content/archive/`, e seguem compilando — é assim que a gente garante
 * que não apodreçam em silêncio.
 */
export type TrailId =
  // entrega
  | "app-no-ar"
  | "site-com-sua-cara"
  | "tarefa-chata"
  | "projeto-de-verdade"
  // código (arquivadas)
  | "frontend"
  | "backend"
  | "fullstack";

export type Difficulty = "iniciante" | "intermediario" | "avancado";

export type ContentLang = "pt-BR" | "en" | "es";

/* ------------------------------------------------------------------ */
/* Blocos de conteúdo escrito                                         */
/* ------------------------------------------------------------------ */

export type ContentBlock =
  | { type: "heading"; text: string }
  /** Parágrafo com markdown leve inline: **negrito**, `código`. */
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | {
      type: "callout";
      variant: "info" | "tip" | "warning" | "analogy";
      title?: string;
      text: string;
    }
  | { type: "code"; language: string; caption?: string; code: string }
  | {
      type: "example";
      title: string;
      text: string;
      code?: { language: string; code: string };
    }
  /** `src` é caminho a partir da raiz pública — arquivo do repositório, nunca URL remota. */
  | { type: "image"; src: string; alt: string; caption?: string }
  /**
   * Comparação lado a lado. É o bloco de que a tese depende: a aula não diz
   * "use referências", ela mostra os dois resultados e deixa a pessoa ver.
   */
  | {
      type: "compare";
      title?: string;
      left: CompareSide;
      right: CompareSide;
    };

export interface CompareSide {
  src: string;
  alt: string;
  /** Rótulo curto acima da imagem: "Sem referência", "Com referência". */
  label: string;
  caption?: string;
}

/* ------------------------------------------------------------------ */
/* Recursos                                                           */
/* ------------------------------------------------------------------ */

export type ResourceKind = "video" | "article" | "docs" | "course";

export interface FreeResource {
  kind: ResourceKind;
  title: string;
  /** Fonte: MDN, JavaScript.info, freeCodeCamp, YouTube, documentação oficial… */
  provider: string;
  url: string;
  description?: string;
  lang?: ContentLang;
  /** Só preencher quando o valor for realmente conhecido. Nunca inventar. */
  durationLabel?: string;
}

export interface RecommendedVideo {
  title: string;
  provider: string; // normalmente "YouTube"
  channel?: string;
  url: string;
  description?: string;
  lang?: ContentLang;
}

/**
 * Recomendação paga. NUNCA bloqueia a trilha.
 * Proibido inventar preço, duração ou avaliação – por isso não há esses campos.
 */
export interface PremiumResource {
  title: string;
  platform: string; // Alura, Udemy, Rocketseat, …
  url: string;
  /** Motivo objetivo da recomendação. Obrigatório. */
  reason: string;
}

/* ------------------------------------------------------------------ */
/* Perguntas                                                          */
/* ------------------------------------------------------------------ */

export type QuestionType =
  | "single" // múltipla escolha, 1 correta
  | "multiple" // múltipla escolha, N corretas
  | "boolean" // verdadeiro / falso
  | "code-output" // interpretar um trecho de código (escolha única)
  | "order" // ordenar etapas
  | "match" // relacionar conceitos
  | "judge"; // julgar dois resultados e nomear o defeito do pior

/** Habilidade avaliada – guia a autoria para não cair em decoreba. */
export type QuestionSkill = "compreensao" | "aplicacao" | "raciocinio";

export interface QuestionOption {
  id: string;
  text: string;
  code?: string;
}

interface QuestionBase {
  id: string;
  type: QuestionType;
  prompt: string;
  /** Trecho de código exibido no enunciado. */
  code?: { language: string; code: string };
  /** Conceito avaliado – usado para revisão e detecção de dificuldade. */
  concept: string;
  skill: QuestionSkill;
  /** Mostrada no 1º erro. Não pode entregar a resposta. */
  hint: string;
  /** Mostrada após acerto ou no 2º erro. */
  explanation: string;
  /** Link para revisar o conceito (recurso da própria aula, de preferência). */
  reviewUrl?: string;
}

export interface ChoiceQuestion extends QuestionBase {
  type: "single" | "multiple" | "boolean" | "code-output";
  options: QuestionOption[];
  correctOptionIds: string[];
}

export interface OrderQuestion extends QuestionBase {
  type: "order";
  items: { id: string; text: string }[];
  /** ids de `items` na ordem correta. */
  correctOrder: string[];
}

export interface MatchQuestion extends QuestionBase {
  type: "match";
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
  correctPairs: { leftId: string; rightId: string }[];
}

/** Um dos dois resultados postos em comparação. Imagem, texto, ou os dois. */
export interface JudgeSide {
  label: string;
  src?: string;
  alt?: string;
  /** Alternativa textual à imagem, quando o resultado é texto ou markup. */
  body?: string;
}

/**
 * Questão de julgamento. Duas partes, as duas de escolha: qual resultado é
 * melhor, e quais defeitos o pior tem. Nomear o defeito é o que ensina a
 * enxergá-lo — por isso a segunda parte não é opcional.
 *
 * Fica corrigível pelo `gradeQuestion`, contável no `passThreshold` do
 * checkpoint e capaz de alimentar a revisão por `concept`.
 */
export interface JudgeQuestion extends QuestionBase {
  type: "judge";
  left: JudgeSide;
  right: JudgeSide;
  /** Qual lado é o melhor. */
  better: "left" | "right";
  /** Defeitos candidatos do lado pior. */
  defects: { id: string; text: string }[];
  /** Subconjunto de `defects` que de fato se aplica. Pelo menos 1. */
  correctDefectIds: string[];
}

export type Question =
  | ChoiceQuestion
  | OrderQuestion
  | MatchQuestion
  | JudgeQuestion;

/** Resposta do usuário, normalizada por tipo. */
export type QuestionAnswer =
  | { kind: "choice"; optionIds: string[] }
  | { kind: "order"; itemIds: string[] }
  | { kind: "match"; pairs: { leftId: string; rightId: string }[] }
  | { kind: "judge"; better: "left" | "right" | null; defectIds: string[] };

/* ------------------------------------------------------------------ */
/* Prática                                                            */
/* ------------------------------------------------------------------ */

export interface Exercise {
  id: string;
  title: string;
  /** O que o aluno deve fazer/escrever. */
  statement: string;
  starter?: { language: string; code: string };
  steps?: string[];
  hints?: string[];
  solution?: { language: string; code: string; note?: string };
  /** Checklist "marque quando conseguir…". */
  selfCheck: string[];
}

export interface Challenge {
  id: string;
  title: string;
  statement: string;
  requirements: string[];
  hints?: string[];
  solution?: { language: string; code: string; note?: string };
}

/* ------------------------------------------------------------------ */
/* Checkpoint                                                         */
/* ------------------------------------------------------------------ */

export interface Checkpoint {
  id: string;
  /** Perguntas dedicadas ao checkpoint (avaliação, sem dica/retry por questão). */
  questions: Question[];
  /** Acertos necessários para passar (ex.: 4). */
  passThreshold: number;
  successMessage: string;
}

/* ------------------------------------------------------------------ */
/* XP                                                                 */
/* ------------------------------------------------------------------ */

export const XP_REWARD = {
  learn: 10, // conteúdo escrito
  watch: 15, // vídeo
  explore: 5, // recursos grátis (não estava na lista original; valor baixo, ajustável)
  quiz: 20, // bloco de perguntas
  practice: 30, // exercício
  challenge: 50, // desafio
  checkpoint: 80, // checkpoint
  project: 200, // projeto
} as const;

/** Passos rastreáveis de uma aula (o fluxo tem 9 marcos; 7 geram progresso). */
export type LessonStepId =
  | "learn"
  | "watch"
  | "explore"
  | "quiz"
  | "practice"
  | "challenge"
  | "checkpoint";

/* ------------------------------------------------------------------ */
/* Aula                                                               */
/* ------------------------------------------------------------------ */

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  /** Descrição curta. */
  summary: string;
  /** "O que você vai aprender". */
  learningObjectives: string[];
  estimatedMinutes?: number;
  content: ContentBlock[];
  video?: RecommendedVideo;
  freeResources: FreeResource[];
  premiumResources?: PremiumResource[];
  /** Bloco 🧠 Teste – prática com dica/retry. */
  questions: Question[];
  exercise?: Exercise;
  challenge?: Challenge;
  checkpoint: Checkpoint;
  /**
   * `draft`: estrutura pronta, conteúdo a preencher. A UI mostra "em breve"
   * e não deixa o passo travar a navegação.
   */
  status: "available" | "draft";
}

/* ------------------------------------------------------------------ */
/* Estrutura                                                          */
/* ------------------------------------------------------------------ */

export interface Stage {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  lessons: Lesson[];
  /** PRIORITY 11 – mensagem exibida ao concluir a etapa. */
  evolutionMoment?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  stages: Stage[];
}

export interface ProjectShowcase {
  id: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: Difficulty;
  previewImage?: string;
  technologies: string[];
  skills: string[];
  features: string[];
  /** A partir de qual fase o projeto passa a ser "construível". */
  unlockedAfterPhaseId?: string;
}

export interface Trail {
  id: TrailId;
  title: string;
  subtitle: string;
  description: string;
  glowClass: string;
  colorClass: string;
  accentHsl: string;
  phases: Phase[];
  projects: ProjectShowcase[];
}

/* ------------------------------------------------------------------ */
/* Estatísticas derivadas                                             */
/* ------------------------------------------------------------------ */

export interface TrailStats {
  phases: number;
  stages: number;
  lessons: number;
  availableLessons: number;
  questions: number;
  exercises: number;
  challenges: number;
  totalXp: number;
}

export interface StageStats {
  lessons: number;
  availableLessons: number;
  exercises: number;
  totalXp: number;
}
