import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContentRenderer } from "@/components/lesson/ContentRenderer";

/**
 * Os blocos visuais existem por causa da tese do projeto: taste não se
 * explica, se compara. A comparação lado a lado precisa ser vista.
 */
describe("blocos visuais de conteúdo", () => {
  it("renderiza um bloco image com alt e legenda", () => {
    render(
      <ContentRenderer
        blocks={[
          {
            type: "image",
            src: "/content/x.png",
            alt: "Tela gerada",
            caption: "Primeira tentativa",
          },
        ]}
      />,
    );
    expect(screen.getByAltText("Tela gerada")).toBeInTheDocument();
    expect(screen.getByText("Primeira tentativa")).toBeInTheDocument();
  });

  it("renderiza um bloco compare com os dois lados e seus rótulos", () => {
    render(
      <ContentRenderer
        blocks={[
          {
            type: "compare",
            left: { src: "/a.png", alt: "Versão sem referência", label: "Sem referência" },
            right: { src: "/b.png", alt: "Versão com referência", label: "Com referência" },
          },
        ]}
      />,
    );
    expect(screen.getByAltText("Versão sem referência")).toBeInTheDocument();
    expect(screen.getByAltText("Versão com referência")).toBeInTheDocument();
    expect(screen.getByText("Sem referência")).toBeInTheDocument();
    expect(screen.getByText("Com referência")).toBeInTheDocument();
  });

  /**
   * Pino de regressão: a resiliência vem da AUSÊNCIA de tratamento de erro.
   * Guarda contra alguém acrescentar um `onError` que desmonte o bloco e leve
   * o resto da aula embora junto.
   */
  it("bloco compare com imagem inexistente ainda mostra o resto do conteúdo", () => {
    render(
      <ContentRenderer
        blocks={[
          {
            type: "compare",
            left: { src: "/nao-existe-a.png", alt: "A", label: "Sem referência" },
            right: { src: "/nao-existe-b.png", alt: "B", label: "Com referência" },
          },
          { type: "paragraph", text: "Repare no espaçamento." },
        ]}
      />,
    );
    expect(screen.getByText("Repare no espaçamento.")).toBeInTheDocument();
    expect(screen.getByText("Sem referência")).toBeInTheDocument();
  });
});
