import { RoadmapNode } from "@/data/roadmaps";
import { X, Play, BookOpen, FileText, CheckSquare, Square, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeDrawerProps {
  node: RoadmapNode | null;
  open: boolean;
  onClose: () => void;
  trailAccent: string;
  isCheckpointDone: (nodeId: string, checkpoint: string) => boolean;
  toggleCheckpoint: (nodeId: string, checkpoint: string) => void;
}

const NodeDrawer = ({ node, open, onClose, trailAccent, isCheckpointDone, toggleCheckpoint }: NodeDrawerProps) => {
  if (!node) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-50 bg-card border-l border-border overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border p-5 flex items-start justify-between gap-4 z-10">
              <div>
                <h2 className="text-lg font-bold text-foreground">{node.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{node.description}</p>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary transition-colors flex-shrink-0">
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              {/* Video */}
              <section>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Play className="h-3.5 w-3.5" style={{ color: `hsl(${trailAccent})` }} />
                  Vídeo em Destaque
                </h3>
                <a
                  href={node.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl bg-secondary/50 border border-border p-4 hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg p-2.5 flex-shrink-0"
                      style={{ backgroundColor: `hsl(${trailAccent} / 0.15)` }}
                    >
                      <Play className="h-5 w-5" style={{ color: `hsl(${trailAccent})` }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {node.videoTitle}
                      </p>
                      <p className="text-xs text-muted-foreground">YouTube · Curso gratuito</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </a>
              </section>

              {/* Links */}
              <section>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5" style={{ color: `hsl(${trailAccent})` }} />
                  Links Úteis
                </h3>
                <div className="space-y-2">
                  <a
                    href={node.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-secondary/30 border border-border p-3 hover:border-primary/30 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1 truncate">
                      {node.docsLabel}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  </a>
                  <a
                    href={node.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg bg-secondary/30 border border-border p-3 hover:border-primary/30 transition-colors group"
                  >
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1 truncate">
                      {node.articleLabel}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  </a>
                </div>
              </section>

              {/* Checkpoints */}
              <section>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckSquare className="h-3.5 w-3.5" style={{ color: `hsl(${trailAccent})` }} />
                  Checkpoints Práticos
                </h3>
                <div className="space-y-2">
                  {node.checkpoints.map((cp) => {
                    const done = isCheckpointDone(node.id, cp);
                    return (
                      <button
                        key={cp}
                        onClick={() => toggleCheckpoint(node.id, cp)}
                        className={`flex items-start gap-3 w-full text-left rounded-lg p-3 transition-all ${
                          done
                            ? "bg-secondary/60"
                            : "bg-secondary/20 hover:bg-secondary/40"
                        }`}
                      >
                        {done ? (
                          <CheckSquare className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: `hsl(${trailAccent})` }} />
                        ) : (
                          <Square className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {cp}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default NodeDrawer;
