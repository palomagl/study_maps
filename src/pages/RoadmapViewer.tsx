import { useParams, Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { trails, RoadmapNode } from "@/data/roadmaps";
import { useProgress } from "@/hooks/useProgress";
import Header from "@/components/Header";
import NodeDrawer from "@/components/NodeDrawer";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";

const RoadmapViewer = () => {
  const { id } = useParams();
  const trail = useMemo(() => trails.find((t) => t.id === id), [id]);
  const { isNodeDone, toggleNode, isCheckpointDone, toggleCheckpoint, getTrailProgress } =
    useProgress(id ?? "");

  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!trail) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Trilha não encontrada</h2>
          <Link to="/" className="text-primary hover:underline">Voltar ao início</Link>
        </div>
      </div>
    );
  }

  const progress = getTrailProgress(trail.nodes.length);

  const openNode = (node: RoadmapNode) => {
    setSelectedNode(node);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background bg-grid">
      <Header />

      {/* Fixed progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="container max-w-4xl py-3 flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h2 className={`text-sm font-bold ${trail.colorClass}`}>Trilha {trail.title}</h2>
              <span className="text-xs text-muted-foreground">{progress}% concluído</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `hsl(${trail.accentHsl})` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="pt-36 pb-20 px-4">
        <div className="container max-w-3xl">
          {/* Roadmap nodes */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-3">
              {trail.nodes.map((node, index) => {
                const done = isNodeDone(node.id);

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative pl-14"
                  >
                    {/* Circle */}
                    <button
                      onClick={() => toggleNode(node.id)}
                      className={`absolute left-[12px] top-4 w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                        done
                          ? "border-transparent"
                          : "bg-background border-muted-foreground/30 hover:border-primary"
                      }`}
                      style={done ? { backgroundColor: `hsl(${trail.accentHsl})`, borderColor: `hsl(${trail.accentHsl})` } : {}}
                    >
                      {done && <Check className="h-3 w-3 text-primary-foreground" />}
                      {!done && <span className="text-[10px] font-bold text-muted-foreground">{index + 1}</span>}
                    </button>

                    {/* Card */}
                    <button
                      onClick={() => openNode(node)}
                      className={`w-full text-left rounded-xl bg-card border transition-all duration-300 p-5 hover:shadow-lg ${
                        done ? "border-transparent opacity-80" : "border-border hover:border-primary/30"
                      }`}
                      style={done ? { borderColor: `hsl(${trail.accentHsl} / 0.3)` } : {}}
                    >
                      <h3 className={`font-semibold text-base mb-1 ${done ? trail.colorClass : "text-foreground"}`}>
                        {node.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{node.description}</p>
                      <span className="inline-block mt-2 text-xs text-muted-foreground">
                        {node.checkpoints.length} checkpoints
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Drawer */}
      <NodeDrawer
        node={selectedNode}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        trailAccent={trail.accentHsl}
        isCheckpointDone={isCheckpointDone}
        toggleCheckpoint={toggleCheckpoint}
      />
    </div>
  );
};

export default RoadmapViewer;
