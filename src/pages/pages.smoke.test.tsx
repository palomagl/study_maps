import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";

/**
 * Renderiza as rotas REAIS do app — as mesmas que o usuário navega, incluindo
 * os redirecionamentos das trilhas arquivadas. Antes este arquivo mantinha uma
 * cópia da tabela de rotas, que podia divergir da verdadeira sem ninguém notar.
 */
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

const TRILHA = "/roadmap/app-no-ar";
const AULA = `${TRILHA}/aula/ar-jul-01-generico`;

describe("smoke — páginas renderizam sem quebrar", () => {
  it("Home lista a trilha de entrega", () => {
    renderAt("/");
    expect(
      screen.getAllByText("Coloque seu primeiro app no ar").length,
    ).toBeGreaterThan(0);
  });

  it("RoadmapViewer mostra as fases do loop e a aula escrita", () => {
    renderAt(TRILHA);
    expect(screen.getByText("Julgamento")).toBeInTheDocument();
    expect(
      screen.getAllByText("O que faz um resultado parecer genérico").length,
    ).toBeGreaterThan(0);
  });

  it("RoadmapViewer abre no mapa e alterna para a lista", () => {
    renderAt(TRILHA);
    const tabs = screen.getByRole("tablist", { name: "Modo de visualização" });
    const mapa = within(tabs).getByRole("tab", { name: "Mapa" });
    const lista = within(tabs).getByRole("tab", { name: "Lista" });

    expect(mapa).toHaveAttribute("aria-selected", "true");
    fireEvent.click(lista);
    expect(lista).toHaveAttribute("aria-selected", "true");
    expect(mapa).toHaveAttribute("aria-selected", "false");
  });

  it("clicar num nó do mapa abre o painel com os passos da aula", () => {
    renderAt(TRILHA);
    // No mapa a aula é um botão; na lista seria um link.
    fireEvent.click(
      screen.getByRole("button", {
        name: /O que faz um resultado parecer genérico/,
      }),
    );

    const painel = screen.getByRole("dialog", {
      name: "Aula: O que faz um resultado parecer genérico",
    });
    expect(within(painel).getByText("Passos da aula")).toBeInTheDocument();
    expect(
      within(painel).getByRole("link", { name: /Abrir aula/ }),
    ).toHaveAttribute("href", AULA);
  });

  it("RoadmapViewer com trilha inválida mostra fallback", () => {
    renderAt("/roadmap/xxx");
    expect(screen.getByText("Trilha não encontrada")).toBeInTheDocument();
  });

  it("link antigo de trilha de código redireciona em vez de dar 404", () => {
    renderAt("/roadmap/frontend");
    expect(screen.queryByText("Trilha não encontrada")).not.toBeInTheDocument();
    expect(screen.queryByText("404")).not.toBeInTheDocument();
    expect(screen.getByText("Julgamento")).toBeInTheDocument();
  });

  it("link antigo de aula de código também redireciona", () => {
    renderAt("/roadmap/frontend/aula/fe-web-01-internet");
    expect(screen.queryByText("Aula não encontrada")).not.toBeInTheDocument();
    expect(screen.getByText("Julgamento")).toBeInTheDocument();
  });

  it("LessonView renderiza o fluxo da aula completa", () => {
    renderAt(AULA);
    expect(
      screen.getByRole("heading", {
        name: "O que faz um resultado parecer genérico",
        level: 1,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("O que você vai aprender")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Aprenda", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checkpoint", level: 2 }),
    ).toBeInTheDocument();
    // conteúdo real da aula
    expect(screen.getByText(/Dê nome ao defeito/)).toBeInTheDocument();
  });

  it("LessonView mostra a comparação lado a lado da aula", () => {
    renderAt(AULA);
    expect(screen.getByAltText(/título pequeno/)).toBeInTheDocument();
    expect(screen.getByAltText(/um título grande em duas linhas/)).toBeInTheDocument();
    expect(screen.getByText("Pedido preguiçoso")).toBeInTheDocument();
    expect(
      screen.getByText("Pedido com referência e especificação"),
    ).toBeInTheDocument();
  });

  it("LessonView em aula draft mostra 'em produção'", () => {
    renderAt(`${TRILHA}/aula/ar-jul-02-checklist`);
    expect(screen.getByText("Conteúdo em produção")).toBeInTheDocument();
  });

  it("LessonView com id inválido mostra fallback", () => {
    renderAt(`${TRILHA}/aula/nao-existe`);
    expect(screen.getByText("Aula não encontrada")).toBeInTheDocument();
  });

  it("rota desconhecida cai no NotFound", () => {
    renderAt("/rota/que/nao/existe");
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("Dashboard (/painel) renderiza as seções principais", () => {
    renderAt("/painel");
    expect(
      screen.getByRole("heading", { name: /Bem-vindo|Olá/, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Continuar estudando/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Missões" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Conquistas" })).toBeInTheDocument();
  });

  it("Onboarding (/inicio) começa pedindo o nome", () => {
    renderAt("/inicio");
    expect(
      screen.getByRole("heading", { name: /Vamos montar sua trilha/ }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Seu nome/)).toBeInTheDocument();
  });

  it("ProjectsView lista a entrega da trilha", () => {
    renderAt(`${TRILHA}/projetos`);
    expect(
      screen.getByRole("heading", { name: /O que você vai conseguir construir/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("O seu app, no ar")).toBeInTheDocument();
  });

  it("RoadmapViewer oferece registrar o link publicado", () => {
    renderAt(TRILHA);
    expect(
      screen.getByLabelText("Link do seu projeto publicado"),
    ).toBeInTheDocument();
  });

  it("link inválido no registro da prova avisa e não salva", () => {
    renderAt(TRILHA);
    fireEvent.change(screen.getByLabelText("Link do seu projeto publicado"), {
      target: { value: "meu app ta pronto" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Salvar" }));
    expect(screen.getByRole("alert")).toHaveTextContent(/não parece um link/i);
    expect(screen.queryByText("O seu projeto está no ar")).not.toBeInTheDocument();
  });

  it("a trilha diz o que falta para o certificado", () => {
    renderAt(TRILHA);
    expect(screen.getByText(/Certificado:/)).toBeInTheDocument();
    expect(screen.getByText(/falta concluir as aulas da trilha/i)).toBeInTheDocument();
  });

  it("certificado aberto por quem não tem direito mostra o que falta, não um papel em branco", () => {
    renderAt("/certificado/app-no-ar");
    expect(
      screen.getByRole("heading", { name: /Ainda não dá para emitir/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Concluir as aulas da trilha")).toBeInTheDocument();
    expect(
      screen.getByText("Registrar o link do que você publicou"),
    ).toBeInTheDocument();
    // nada de certificado em branco
    expect(screen.queryByText(/Certificado de conclusão/)).not.toBeInTheDocument();
  });

  it("certificado de trilha inexistente mostra fallback", () => {
    renderAt("/certificado/nao-existe");
    expect(screen.getByText("Trilha não encontrada")).toBeInTheDocument();
  });

  it("ReviewView sem conceitos mostra estado vazio", () => {
    renderAt("/revisao");
    expect(screen.getByRole("heading", { name: "Revisão" })).toBeInTheDocument();
    expect(screen.getByText(/Nada para revisar agora/)).toBeInTheDocument();
  });
});
