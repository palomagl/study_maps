import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket } from "lucide-react";
import Header from "@/components/Header";
import { getTrail } from "@/content";
import { useProgress } from "@/hooks/useProgress";
import { ProjectCard } from "@/components/projects/ProjectCard";

const ProjectsView = () => {
  const { trailId } = useParams();
  const trail = useMemo(() => getTrail(trailId), [trailId]);
  const { getPhaseProgress } = useProgress();

  if (!trail) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
          <div>
            <h1 className="mb-2 text-2xl font-bold text-foreground">
              Trilha não encontrada
            </h1>
            <Link to="/" className="text-primary hover:underline">
              Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const accent = trail.accentHsl;

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24">
        <Link
          to={`/roadmap/${trail.id}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Trilha {trail.title}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5" style={{ color: `hsl(${accent})` }} />
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              O que você vai conseguir construir
            </h1>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Cada projeto abaixo é um alvo real da trilha {trail.title}. Você pode não
            saber fazer todos agora — a ideia é exatamente essa: olhar, mirar e voltar
            aqui quando destravar.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trail.projects.map((project) => {
            const phase = trail.phases.find(
              (p) => p.id === project.unlockedAfterPhaseId,
            );
            const readiness = phase ? getPhaseProgress(phase) : 0;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                accentHsl={accent}
                readiness={readiness}
                unlocked={readiness >= 100}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ProjectsView;
