import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Index from "./Index";
import Dashboard from "./Dashboard";
import Onboarding from "./Onboarding";
import RoadmapViewer from "./RoadmapViewer";
import ProjectsView from "./ProjectsView";
import LessonView from "./LessonView";
import ReviewView from "./ReviewView";
import NotFound from "./NotFound";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inicio" element={<Onboarding />} />
        <Route path="/painel" element={<Dashboard />} />
        <Route path="/revisao" element={<ReviewView />} />
        <Route path="/roadmap/:id" element={<RoadmapViewer />} />
        <Route path="/roadmap/:trailId/projetos" element={<ProjectsView />} />
        <Route path="/roadmap/:trailId/aula/:lessonId" element={<LessonView />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("smoke — páginas renderizam sem quebrar", () => {
  it("Home lista as três trilhas", () => {
    renderAt("/");
    expect(screen.getByText("Trilha Front-end")).toBeInTheDocument();
    expect(screen.getByText("Trilha Back-end")).toBeInTheDocument();
    expect(screen.getByText("Trilha Full-Stack")).toBeInTheDocument();
  });

  it("RoadmapViewer mostra fases e a aula de POC", () => {
    renderAt("/roadmap/frontend");
    expect(screen.getByText("Fundamentos da Web")).toBeInTheDocument();
    expect(screen.getAllByText("Como a Internet Funciona").length).toBeGreaterThan(0);
  });

  it("RoadmapViewer com trilha inválida mostra fallback", () => {
    renderAt("/roadmap/xxx");
    expect(screen.getByText("Trilha não encontrada")).toBeInTheDocument();
  });

  it("LessonView renderiza o fluxo da aula completa", () => {
    renderAt("/roadmap/frontend/aula/fe-web-01-internet");
    expect(
      screen.getByRole("heading", { name: "Como a Internet Funciona", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText("O que você vai aprender")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Aprenda", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checkpoint", level: 2 }),
    ).toBeInTheDocument();
    // conteúdo real da aula
    expect(screen.getByText(/Cliente e servidor/)).toBeInTheDocument();
  });

  it("LessonView: o vídeo abre no player e tem link de YouTube válido", () => {
    renderAt("/roadmap/frontend/aula/fe-web-01-internet");
    expect(
      screen.getByRole("heading", { name: "Assista", level: 2 }),
    ).toBeInTheDocument();
    // botão do player (facade) acessível
    expect(
      screen.getByRole("button", { name: /Assistir ao vídeo: Como a Internet funciona/ }),
    ).toBeInTheDocument();
    // link de fallback para o YouTube com o id verificado
    const link = screen.getByRole("link", { name: /YouTube/ });
    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=nlO5hySqJFA",
    );
  });

  it("LessonView em aula draft mostra 'em produção'", () => {
    renderAt("/roadmap/frontend/aula/fe-js-01-fundamentos");
    expect(screen.getByText("Conteúdo em produção")).toBeInTheDocument();
  });

  it("LessonView renderiza uma das novas aulas de CSS", () => {
    renderAt("/roadmap/frontend/aula/fe-css-01-box-model");
    expect(
      screen.getByRole("heading", { name: "Box model e seletores", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/As quatro camadas da caixa/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checkpoint", level: 2 }),
    ).toBeInTheDocument();
  });

  it("LessonView com id inválido mostra fallback", () => {
    renderAt("/roadmap/frontend/aula/nao-existe");
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

  it("ProjectsView lista projetos da trilha", () => {
    renderAt("/roadmap/frontend/projetos");
    expect(
      screen.getByRole("heading", { name: /O que você vai conseguir construir/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("Landing Page")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("ReviewView sem conceitos mostra estado vazio", () => {
    renderAt("/revisao");
    expect(screen.getByRole("heading", { name: "Revisão" })).toBeInTheDocument();
    expect(screen.getByText(/Nada para revisar agora/)).toBeInTheDocument();
  });
});
