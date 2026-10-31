import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { ResourceList } from "./ResourceList";
import type { FreeResource } from "@/content/types";

const ingles: FreeResource = {
  kind: "docs",
  title: "About Git",
  provider: "GitHub Docs",
  url: "https://docs.github.com/en/get-started/using-git/about-git",
  lang: "en",
};
const portugues: FreeResource = {
  kind: "docs",
  title: "Pro Git",
  provider: "Git",
  url: "https://git-scm.com/book/pt-br/v2",
  lang: "pt-BR",
};

describe("ResourceList — idioma", () => {
  it("avisa com uma etiqueta quando o recurso é em inglês", () => {
    render(<ResourceList resources={[ingles]} />);
    expect(within(screen.getByRole("link", { name: /About Git/ })).getByText("EM INGLÊS")).toBeInTheDocument();
  });

  it("recurso em português não ganha etiqueta", () => {
    render(<ResourceList resources={[portugues]} />);
    expect(screen.queryByText(/^EM /)).not.toBeInTheDocument();
  });

  it("mostra primeiro o que é em português", () => {
    render(<ResourceList resources={[ingles, portugues]} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Pro Git");
    expect(links[1]).toHaveTextContent("About Git");
  });

  it("lembra do tradutor do navegador quando tem recurso em outra língua", () => {
    const { rerender } = render(<ResourceList resources={[portugues]} />);
    expect(screen.queryByText(/tradutor do navegador/)).not.toBeInTheDocument();
    rerender(<ResourceList resources={[portugues, ingles]} />);
    expect(screen.getByText(/tradutor do navegador/)).toBeInTheDocument();
  });
});
