import type { TrailId } from "@/content/types";

export interface Option {
  id: string;
  label: string;
  hint?: string;
}

/**
 * Objetivos de entrega, não de cargo. A pessoa não chega aqui querendo ser
 * "front-end": ela chega com uma ideia e quer ver aquilo existindo.
 */
export const GOAL_OPTIONS: Option[] = [
  {
    id: "app-no-ar",
    label: "Colocar um app meu no ar",
    hint: "Tenho uma ideia e quero um link funcionando para mandar",
  },
  {
    id: "site",
    label: "Fazer um site com a minha cara",
    hint: "Quero algo que não pareça gerado por IA",
  },
  {
    id: "automatizar",
    label: "Automatizar uma tarefa chata",
    hint: "Perco tempo toda semana com a mesma coisa",
  },
  {
    id: "indeciso",
    label: "Ainda não sei",
    hint: "Me ajuda a decidir por onde começar",
  },
];

export const EXPERIENCE_OPTIONS: Option[] = [
  { id: "nunca", label: "Nunca criei nada com IA" },
  { id: "pedi", label: "Já pedi umas coisas e usei o que veio" },
  { id: "fiz", label: "Já fiz algo que funcionou" },
  { id: "publiquei", label: "Já coloquei alguma coisa no ar" },
];

export interface Recommendation {
  trailId: TrailId;
  reason: string;
}

/**
 * Nesta versão só existe uma trilha escrita, então todo caminho leva a ela —
 * mas o motivo muda, porque o motivo é o que faz a pessoa começar. Quando as
 * trilhas 2, 3 e 4 existirem, só os destinos mudam aqui.
 */
export function recommendTrail(
  goal: string | null,
  experience: string | null,
): Recommendation {
  if (goal === "site") {
    return {
      trailId: "app-no-ar",
      reason:
        "Ter cara própria é o que essa trilha mais ensina: referência antes de gerar, e olho para julgar o que voltou.",
    };
  }

  if (goal === "automatizar") {
    return {
      trailId: "app-no-ar",
      reason:
        "O caminho é o mesmo — recortar, especificar, julgar e publicar. Faça esta trilha com a sua tarefa chata no lugar do app.",
    };
  }

  if (goal === "indeciso") {
    if (experience === "fiz" || experience === "publiquei") {
      return {
        trailId: "app-no-ar",
        reason:
          "Você já faz coisas com IA. Aqui o ganho é o passo que quase ninguém tem: julgar o resultado e consertar com precisão.",
      };
    }
    return {
      trailId: "app-no-ar",
      reason:
        "Comece colocando uma coisa pequena no ar. Ter um link que funciona muda o que você acha que consegue fazer.",
    };
  }

  // "app-no-ar" e qualquer resposta não prevista
  if (experience === "publiquei") {
    return {
      trailId: "app-no-ar",
      reason:
        "Você já publicou algo, então a parte final vai ser rápida — o que essa trilha te dá é o olho para o resultado não sair genérico.",
    };
  }
  return {
    trailId: "app-no-ar",
    reason:
      "É exatamente o que essa trilha faz: você entra com uma ideia e sai com um link para mandar para alguém.",
  };
}
