import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "@/App";
import { progressStore } from "@/lib/progress-store";
import { getTrailStats } from "@/content";
import { draftLesson } from "@/content/draft";
import { appNoArTrail } from "@/content/trails/app-no-ar";

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

/**
 * Troca uma aula da trilha por um rascunho só durante o teste. Com as 12
 * aulas escritas não sobra rascunho de verdade — mas a regra "rascunho
 * mostra em produção e não desenha cartão vazio" vale pras próximas trilhas.
 */
function comRascunho(id: string, fn: () => void) {
  const stage = appNoArTrail.phases
    .flatMap((p) => p.stages)
    .find((st) => st.lessons.some((l) => l.id === id))!;
  const i = stage.lessons.findIndex((l) => l.id === id);
  const original = stage.lessons[i];
  stage.lessons[i] = draftLesson({
    id,
    slug: original.slug,
    title: original.title,
    summary: original.summary,
    painQuote: original.pain?.quote,
  });
  try {
    fn();
  } finally {
    stage.lessons[i] = original;
  }
}

const TRILHA = "/roadmap/app-no-ar";
const AULA = `${TRILHA}/aula/ar-jul-01-generico`;

describe("smoke — páginas renderizam sem quebrar", () => {
  // O progressStore é um singleton de módulo: sem isto, um teste que salvasse
  // estado tornaria os seguintes dependentes da ordem.
  beforeEach(() => progressStore.resetAll());

  it("a home mostra o time no palco", () => {
    renderAt("/");
    expect(
      screen.getByRole("heading", { name: /Tire suas ideias do papel/i, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /^Agente / }).length).toBeGreaterThanOrEqual(6);
    expect(screen.queryByText(/aprenda programação/i)).not.toBeInTheDocument();
  });

  it("Home lista a trilha de entrega", () => {
    renderAt("/");
    expect(
      screen.getAllByText("Coloque seu primeiro app no ar").length,
    ).toBeGreaterThan(0);
  });

  it("o mapa mostra as seis fases, cada uma com o seu agente", () => {
    renderAt(TRILHA);
    for (const fase of ["Ideia", "Pedido", "Geração", "Julgamento", "Conserto", "No ar"]) {
      expect(screen.getByRole("button", { name: new RegExp(`Fase \\d+: ${fase}`) })).toBeInTheDocument();
    }
  });

  it("a lista mostra a aula escrita", () => {
    renderAt(TRILHA);
    fireEvent.click(screen.getByRole("tab", { name: "Lista" }));
    expect(
      screen.getAllByText("O que faz um resultado parecer genérico").length,
    ).toBeGreaterThan(0);
  });

  it("a trilha mostra o teu time", () => {
    renderAt(TRILHA);
    expect(screen.getByText(/TEU TIME/i)).toBeInTheDocument();
    expect(screen.getByText("0/6")).toBeInTheDocument();
  });

  it("o mapa vem antes do cartão da prova", () => {
    renderAt(TRILHA);
    const mapa = screen.getByRole("tablist", { name: "Modo de visualização" });
    const prova = screen.getByLabelText("Link do seu projeto publicado");
    expect(mapa.compareDocumentPosition(prova) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("a lista da trilha mostra a dor que cada aula resolve", () => {
    renderAt(TRILHA);
    fireEvent.click(screen.getByRole("tab", { name: "Lista" }));
    expect(
      screen.getByText(/Toda vez eu aceito o primeiro resultado que vem\./),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/resolve:/).length).toBeGreaterThanOrEqual(12);
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

  it("clicar na carta da fase abre as aulas dela, com a dor de cada uma", () => {
    renderAt(TRILHA);
    fireEvent.click(screen.getByRole("button", { name: /Fase 04: Julgamento/ }));

    const fase = screen.getByRole("dialog", { name: "Fase: Julgamento" });
    expect(within(fase).getByText(/Toda vez eu aceito o primeiro resultado que vem\./)).toBeInTheDocument();
    fireEvent.click(
      within(fase).getByRole("button", { name: /O que faz um resultado parecer genérico/ }),
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
    expect(screen.getByText("O QUE TU VAI APRENDER")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Aprenda", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Checkpoint", level: 2 }),
    ).toBeInTheDocument();
    // conteúdo real da aula
    expect(screen.getByText(/Troca o sentimento pelo nome/)).toBeInTheDocument();
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
    comRascunho("ar-jul-02-checklist", () => {
      renderAt(`${TRILHA}/aula/ar-jul-02-checklist`);
      expect(screen.getByText("Conteúdo em produção")).toBeInTheDocument();
    });
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
      screen.getByRole("heading", { name: /E aí|Bora continuar/, level: 1 }),
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
    // Com as doze aulas escritas, a primeira lacuna é a da pessoa: concluir as aulas.
    expect(screen.getByText(/falta concluir as aulas da trilha/i)).toBeInTheDocument();
  });

  it("certificado aberto por quem não tem direito mostra o que falta, não um papel em branco", () => {
    renderAt("/certificado/app-no-ar");
    expect(
      screen.getByRole("heading", { name: /Ainda não dá para emitir/ }),
    ).toBeInTheDocument();
    // as três lacunas da pessoa, cada uma levando pra onde se resolve
    expect(screen.getByRole("link", { name: "Concluir as aulas da trilha" })).toHaveAttribute(
      "href",
      "/roadmap/app-no-ar",
    );
    expect(
      screen.getByRole("link", { name: "Registrar o link do que tu publicou" }),
    ).toHaveAttribute("href", "/roadmap/app-no-ar");
    expect(screen.getByRole("link", { name: "Dizer teu nome no início" })).toHaveAttribute(
      "href",
      "/inicio",
    );
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

describe("revisão de uma questão de julgamento", () => {
  beforeEach(() => progressStore.resetAll());

  it("mostra os dois lados — não dá para julgar o que não está na tela", () => {
    progressStore.recordConceptError("hierarquia visual", "ar-jul-01-generico");
    render(
      <MemoryRouter initialEntries={["/revisao"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText("Versão A")).toBeInTheDocument();
    expect(screen.getByText("Versão B")).toBeInTheDocument();
  });
});

describe("honestidade sobre o que já está escrito", () => {
  beforeEach(() => progressStore.resetAll());

  it("a trilha diz quantas aulas existem de verdade, não só quantas estão previstas", () => {
    render(
      <MemoryRouter initialEntries={["/roadmap/app-no-ar"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    // A regra, não um número: enquanto houver rascunho, a trilha diz quantas
    // estão escritas; quando todas estiverem, para de falar em "produção".
    const stats = getTrailStats("app-no-ar");
    expect(screen.getByText(new RegExp(`${stats.lessons} aulas`))).toBeInTheDocument();
    if (stats.availableLessons < stats.lessons) {
      const escritas = `${stats.availableLessons} escrita${stats.availableLessons === 1 ? "" : "s"}`;
      expect(screen.getByText(new RegExp(`${escritas}, o resto em produção`))).toBeInTheDocument();
    } else {
      expect(screen.queryByText(/o resto em produção/)).not.toBeInTheDocument();
    }
  });
});

describe("a aula no formato dor → solução", () => {
  beforeEach(() => progressStore.resetAll());

  it("a aula escrita abre pela dor e fecha com antes e agora", () => {
    render(
      <MemoryRouter initialEntries={["/roadmap/app-no-ar/aula/ar-jul-01-generico"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(screen.getByText("A DOR")).toBeInTheDocument();
    expect(screen.getByText("O QUE RESOLVE")).toBeInTheDocument();
    expect(screen.getByText("DOR RESOLVIDA")).toBeInTheDocument();
  });

  it("a aula em rascunho não desenha cartões vazios", () => {
    comRascunho("ar-jul-02-checklist", () => {
      render(
        <MemoryRouter initialEntries={["/roadmap/app-no-ar/aula/ar-jul-02-checklist"]}>
          <AppRoutes />
        </MemoryRouter>,
      );
      expect(screen.getByText("Conteúdo em produção")).toBeInTheDocument();
      expect(screen.queryByText("O QUE RESOLVE")).not.toBeInTheDocument();
      expect(screen.queryByText("DOR RESOLVIDA")).not.toBeInTheDocument();
    });
  });
});

describe("numeração dos passos", () => {
  it("os passos da aula são numerados sem buraco, mesmo sem vídeo", () => {
    render(
      <MemoryRouter initialEntries={["/roadmap/app-no-ar/aula/ar-ideia-01-recortar"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    const nums = screen
      .getAllByText(/^PASSO \d{2}$/)
      .map((e) => Number(e.textContent!.replace("PASSO ", "")));
    expect(nums.length).toBeGreaterThan(3);
    expect(nums).toEqual(nums.map((_, i) => i + 1));
  });
});

describe("o time explica como recrutar", () => {
  beforeEach(() => progressStore.resetAll());

  it("a caixa do time diz como ganhar cada agente", () => {
    render(
      <MemoryRouter initialEntries={["/roadmap/app-no-ar"]}>
        <AppRoutes />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/Termina todas as aulas de uma fase e o agente dela entra pro teu time/),
    ).toBeInTheDocument();
  });
});
