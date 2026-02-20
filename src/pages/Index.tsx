import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { trails } from "@/data/roadmaps";
import { Code, Database, Layers, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const trailIcons: Record<string, any> = {
  frontend: Code,
  backend: Database,
  fullstack: Layers,
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">100% Gratuito · Aprenda no seu ritmo</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="text-foreground">Aprenda programação com</span>
              <br />
              <span className="gradient-text">ROADMAPS do zero</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Trilhas completas, gratuitas e estruturadas para você se tornar um desenvolvedor profissional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 Trail Cards */}
      <section className="py-12 px-4">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trails.map((trail, index) => {
              const Icon = trailIcons[trail.id] ?? Code;
              return (
                <motion.button
                  key={trail.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onClick={() => navigate(`/roadmap/${trail.id}`)}
                  className={`group relative w-full text-left rounded-2xl bg-card p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${trail.glowClass}`}
                >
                  {/* Glow background */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, hsl(${trail.accentHsl} / 0.08) 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative">
                    <div className={`rounded-xl bg-secondary p-4 w-fit mb-6`}>
                      <Icon className={`h-8 w-8 ${trail.colorClass}`} />
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Trilha {trail.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {trail.subtitle}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>{trail.nodes.length} etapas</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 mt-12">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 StudyMaps · Aprenda programação, de graça.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
