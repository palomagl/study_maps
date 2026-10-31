import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PainResolved } from "@/components/lesson/pain/PainResolved";
import { RewardPanel } from "@/components/lesson/RewardPanel";

/*
 * Achados da revisão final do branch (31/10), do lado da tela.
 */

describe("o agente só entra pro time quando a fase acaba", () => {
  it("com aula faltando na fase, diz quantas faltam — não que já entrou", () => {
    render(<PainResolved before="Achei feio." after="Sei dizer o defeito." agent="julgamento" remaining={2} />);
    expect(screen.queryByText(/NO TIME/)).not.toBeInTheDocument();
    expect(screen.getByText("FALTAM 2 AULAS PRO JULGAMENTO")).toBeInTheDocument();
  });

  it("falta uma: singular", () => {
    render(<PainResolved before="Achei feio." after="Sei dizer o defeito." agent="julgamento" remaining={1} />);
    expect(screen.getByText("FALTA 1 AULA PRO JULGAMENTO")).toBeInTheDocument();
  });

  it("fase completa: aí sim, no time", () => {
    render(<PainResolved before="Achei feio." after="Sei dizer o defeito." agent="julgamento" remaining={0} />);
    expect(screen.getByText(/✓ JULGAMENTO NO TIME/)).toBeInTheDocument();
  });
});

describe("refazer a aula pede confirmação", () => {
  const renderPanel = (onReviewLesson: () => void) =>
    render(
      <MemoryRouter>
        <RewardPanel
          xpEarned={100}
          totalXp={500}
          streak={2}
          accentHsl="158 90% 60%"
          trailHref="/roadmap/app-no-ar"
          onReviewLesson={onReviewLesson}
        />
      </MemoryRouter>,
    );

  it("um toque só não apaga nada", () => {
    const reset = vi.fn();
    renderPanel(reset);
    fireEvent.click(screen.getByRole("button", { name: /Refazer esta aula/ }));
    expect(reset).not.toHaveBeenCalled();
    expect(screen.getByText(/apaga o teu progresso desta aula/)).toBeInTheDocument();
  });

  it("confirmando, refaz", () => {
    const reset = vi.fn();
    renderPanel(reset);
    fireEvent.click(screen.getByRole("button", { name: /Refazer esta aula/ }));
    fireEvent.click(screen.getByRole("button", { name: "Sim, refazer" }));
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("dá pra desistir", () => {
    const reset = vi.fn();
    renderPanel(reset);
    fireEvent.click(screen.getByRole("button", { name: /Refazer esta aula/ }));
    fireEvent.click(screen.getByRole("button", { name: "Deixa assim" }));
    expect(reset).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /Refazer esta aula/ })).toBeInTheDocument();
  });
});
