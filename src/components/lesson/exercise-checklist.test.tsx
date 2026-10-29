import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ExercisePanel } from "@/components/lesson/ExercisePanel";
import type { Exercise } from "@/content/types";

const exercise: Exercise = {
  id: "ex-feio-de-proposito",
  title: "Faça a versão feia de propósito",
  statement: "Peça sem referência nenhuma e guarde o resultado.",
  selfCheck: ["Juntei cinco referências", "Escrevi a especificação"],
};

const props = {
  lessonId: "aula-teste-checklist",
  exercise,
  variant: "exercise" as const,
  accentHsl: "220 100% 60%",
  alreadyDone: true,
  onComplete: () => {},
};

const item = () => screen.getByRole("button", { name: /Juntei cinco referências/ });

describe("checklist do exercício na tela", () => {
  it("as marcações sobrevivem a uma remontagem do painel", () => {
    const first = render(<ExercisePanel {...props} />);
    expect(item()).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(item());
    expect(item()).toHaveAttribute("aria-pressed", "true");

    // Equivalente a sair da aula e voltar — ou recarregar a página.
    first.unmount();
    render(<ExercisePanel {...props} />);
    expect(item()).toHaveAttribute("aria-pressed", "true");
  });
});
