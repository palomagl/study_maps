import type { Lesson } from "@/content/types";

/**
 * Fábrica de aula ainda não escrita. A arquitetura já suporta a aula completa;
 * o conteúdo será preenchido nas próximas etapas. A UI mostra "Conteúdo em
 * produção" e nunca trava a navegação numa aula `draft`.
 */
export function draftLesson(
  input: Pick<Lesson, "id" | "slug" | "title" | "summary"> &
    Partial<Pick<Lesson, "estimatedMinutes" | "learningObjectives">>,
): Lesson {
  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    summary: input.summary,
    estimatedMinutes: input.estimatedMinutes,
    learningObjectives: input.learningObjectives ?? [],
    status: "draft",
    content: [],
    freeResources: [],
    questions: [],
    checkpoint: {
      id: `${input.id}-cp`,
      passThreshold: 0,
      successMessage: "Checkpoint em produção.",
      questions: [],
    },
  };
}
