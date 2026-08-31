import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import RoadmapViewer from "./pages/RoadmapViewer";
import ProjectsView from "./pages/ProjectsView";
import LessonView from "./pages/LessonView";
import ReviewView from "./pages/ReviewView";
import NotFound from "./pages/NotFound";
import GamificationRuntime from "./components/GamificationRuntime";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <GamificationRuntime />
    <BrowserRouter>
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
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
