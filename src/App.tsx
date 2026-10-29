import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { LEGACY_TRAIL_IDS } from "@/content";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import RoadmapViewer from "./pages/RoadmapViewer";
import ProjectsView from "./pages/ProjectsView";
import LessonView from "./pages/LessonView";
import ReviewView from "./pages/ReviewView";
import NotFound from "./pages/NotFound";
import GamificationRuntime from "./components/GamificationRuntime";

/** Para onde vai quem chega por um link antigo de trilha de código. */
const CURRENT_TRAIL = "/roadmap/app-no-ar";

/**
 * As rotas do app, num componente só, para o teste de smoke exercitar
 * exatamente as mesmas que o usuário navega — inclusive os redirecionamentos.
 */
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/inicio" element={<Onboarding />} />
    <Route path="/painel" element={<Dashboard />} />
    <Route path="/revisao" element={<ReviewView />} />

    {/*
      Trilhas de código arquivadas: link antigo redireciona, não dá 404.
      As rotas de aula e projetos precisam ser declaradas uma a uma: o
      React Router pontua caminhos mais específicos acima de um splat, então
      só `/roadmap/frontend/*` perderia para `/roadmap/:trailId/aula/:lessonId`.
    */}
    {LEGACY_TRAIL_IDS.flatMap((id) => [
      <Route
        key={`${id}-aula`}
        path={`/roadmap/${id}/aula/:lessonId`}
        element={<Navigate to={CURRENT_TRAIL} replace />}
      />,
      <Route
        key={`${id}-projetos`}
        path={`/roadmap/${id}/projetos`}
        element={<Navigate to={CURRENT_TRAIL} replace />}
      />,
      <Route
        key={id}
        path={`/roadmap/${id}/*`}
        element={<Navigate to={CURRENT_TRAIL} replace />}
      />,
    ])}

    <Route path="/roadmap/:id" element={<RoadmapViewer />} />
    <Route path="/roadmap/:trailId/projetos" element={<ProjectsView />} />
    <Route path="/roadmap/:trailId/aula/:lessonId" element={<LessonView />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <GamificationRuntime />
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
