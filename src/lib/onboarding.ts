import type { TrailId } from "@/content/types";

export interface Option {
  id: string;
  label: string;
  hint?: string;
}

export const GOAL_OPTIONS: Option[] = [
  { id: "frontend", label: "Front-end", hint: "Interfaces, sites e telas que as pessoas usam" },
  { id: "backend", label: "Back-end", hint: "APIs, dados, regras de negócio e servidores" },
  { id: "fullstack", label: "Full-Stack", hint: "As duas pontas: front + back integrados" },
  { id: "apps", label: "Fazer aplicações", hint: "Quero construir produtos completos" },
  { id: "indeciso", label: "Ainda não sei", hint: "Me ajuda a decidir por onde começar" },
];

export const EXPERIENCE_OPTIONS: Option[] = [
  { id: "nunca", label: "Nunca programei" },
  { id: "contato", label: "Já tive algum contato" },
  { id: "projetos", label: "Já fiz alguns projetos" },
  { id: "programo", label: "Já programo hoje" },
];

export interface Recommendation {
  trailId: TrailId;
  reason: string;
}

export function recommendTrail(
  goal: string | null,
  experience: string | null,
): Recommendation {
  if (goal === "frontend")
    return {
      trailId: "frontend",
      reason:
        "Você quer construir interfaces — a trilha Front-end vai do HTML ao React.",
    };
  if (goal === "backend")
    return {
      trailId: "backend",
      reason:
        "Seu foco é o servidor — a trilha Back-end cobre APIs, bancos e deploy.",
    };
  if (goal === "fullstack")
    return {
      trailId: "fullstack",
      reason: "Você quer as duas pontas — a trilha Full-Stack integra front e back.",
    };

  if (goal === "apps") {
    if (experience === "projetos" || experience === "programo") {
      return {
        trailId: "fullstack",
        reason:
          "Você já tem base e quer produtos completos — a trilha Full-Stack te leva do front ao deploy.",
      };
    }
    return {
      trailId: "frontend",
      reason:
        "Para chegar a apps completos, começar pelo Front-end te dá base de JavaScript e interface — depois o Full-Stack.",
    };
  }

  // indeciso (ou sem resposta)
  if (experience === "projetos" || experience === "programo") {
    return {
      trailId: "fullstack",
      reason:
        "Como você já programa, a trilha Full-Stack aproveita sua base e amplia para as duas pontas.",
    };
  }
  return {
    trailId: "frontend",
    reason:
      "Para quem está começando, o Front-end dá retorno visual rápido e ensina a lógica de programação.",
  };
}
