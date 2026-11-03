import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PainCard } from "@/components/lesson/pain/PainCard";
import { ResolveCard } from "@/components/lesson/pain/ResolveCard";
import { PainResolved } from "@/components/lesson/pain/PainResolved";

describe("os cartões da dor", () => {
  it("PainCard mostra a dor entre aspas e o convite", () => {
    render(<PainCard quote="Tá pronto, mas ninguém consegue ver." />);
    expect(screen.getByText("A DOR")).toBeInTheDocument();
    expect(screen.getByText(/Tá pronto, mas ninguém consegue ver\./)).toBeInTheDocument();
    expect(
      screen.getByText("Se isso já aconteceu contigo, essa aula é tua."),
    ).toBeInTheDocument();
  });

  it("ResolveCard sem detalhe não desenha linha vazia", () => {
    const { container } = render(
      <ResolveCard resolve="Dar nome ao defeito." agent="julgamento" />,
    );
    expect(container.querySelectorAll("p").length).toBe(2); // rótulo + frase
  });

  it("ResolveCard com detalhe mostra as três linhas", () => {
    render(
      <ResolveCard resolve="Dar nome ao defeito." detail="Quem nomeia, conserta." agent="julgamento" />,
    );
    expect(screen.getByText("O QUE RESOLVE")).toBeInTheDocument();
    expect(screen.getByText("Quem nomeia, conserta.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Agente Julgamento" })).toBeInTheDocument();
  });

  it("ResolveCard sem agente ainda renderiza", () => {
    render(<ResolveCard resolve="Dar nome ao defeito." agent={null} />);
    expect(screen.getByText("Dar nome ao defeito.")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("PainResolved mostra antes, agora e o agente que entrou pro time", () => {
    render(<PainResolved before="Achei feio." after="Três botões brigando." agent="julgamento" remaining={0} />);
    expect(screen.getByText("ANTES")).toBeInTheDocument();
    expect(screen.getByText("AGORA")).toBeInTheDocument();
    expect(screen.getByText(/Achei feio\./)).toBeInTheDocument();
    expect(screen.getByText(/Três botões brigando\./)).toBeInTheDocument();
    expect(screen.getByText(/JULGAMENTO NO TIME/)).toBeInTheDocument();
  });
});
