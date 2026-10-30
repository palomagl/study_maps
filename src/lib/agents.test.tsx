import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AGENTS, agentForPhase } from "@/lib/agents";
import { Agent } from "@/components/agents/Agent";

describe("agentes", () => {
  it("cada fase da Trilha 1 tem seu agente, na ordem do loop", () => {
    expect(["ar-p1", "ar-p2", "ar-p3", "ar-p4", "ar-p5", "ar-p6"].map(agentForPhase)).toEqual([
      "ideia",
      "pedido",
      "geracao",
      "julgamento",
      "conserto",
      "noar",
    ]);
  });

  it("fase fora da Trilha 1 não tem agente", () => {
    expect(agentForPhase("fe-p1")).toBeNull();
    expect(agentForPhase("")).toBeNull();
  });

  it("os seis têm nome e cor", () => {
    expect(Object.values(AGENTS).map((a) => a.label)).toEqual([
      "Ideia",
      "Pedido",
      "Geração",
      "Julgamento",
      "Conserto",
      "No ar",
    ]);
  });

  it("o desenho do agente é uma imagem com nome acessível", () => {
    render(<Agent kind="julgamento" />);
    expect(screen.getByRole("img", { name: "Agente Julgamento" })).toBeInTheDocument();
  });

  it("agente bloqueado diz que está bloqueado", () => {
    render(<Agent kind="bloqueado" />);
    expect(screen.getByRole("img", { name: "Agente bloqueado" })).toBeInTheDocument();
  });

  it("vários agentes na mesma tela não colidem ids", () => {
    const { container } = render(
      <>
        <Agent kind="ideia" />
        <Agent kind="ideia" />
      </>,
    );
    const ids = [...container.querySelectorAll("[id]")].map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
