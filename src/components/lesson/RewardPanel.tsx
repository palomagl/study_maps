import { motion } from "framer-motion";
import { ArrowRight, Flame, RotateCcw, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { levelProgress } from "@/lib/gamification";

interface RewardPanelProps {
  xpEarned: number;
  totalXp: number;
  streak: number;
  accentHsl: string;
  evolutionMoment?: string;
  nextHref?: string;
  nextTitle?: string;
  trailHref: string;
  onReviewLesson: () => void;
}

export function RewardPanel({
  xpEarned,
  totalXp,
  streak,
  accentHsl,
  evolutionMoment,
  nextHref,
  nextTitle,
  trailHref,
  onReviewLesson,
}: RewardPanelProps) {
  return (
    <motion.section
      id="step-reward"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-32 overflow-hidden rounded-2xl border p-6"
      style={{
        borderColor: `hsl(${accentHsl} / 0.4)`,
        background: `radial-gradient(ellipse at top, hsl(${accentHsl} / 0.12), transparent 70%)`,
      }}
    >
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5" style={{ color: `hsl(${accentHsl})` }} />
        <h2 className="text-base font-bold text-foreground">Aula concluída</h2>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="rounded-xl border border-border bg-card/60 px-4 py-3">
          <p className="text-xs text-muted-foreground">Nesta aula</p>
          <p className="text-lg font-bold text-foreground">+{xpEarned} XP</p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 px-4 py-3">
          <p className="text-xs text-muted-foreground">XP total</p>
          <p className="text-lg font-bold text-foreground">{totalXp}</p>
        </div>
        <div className="rounded-xl border border-border bg-card/60 px-4 py-3">
          <p className="text-xs text-muted-foreground">Nível</p>
          <p className="text-lg font-bold text-foreground">
            {levelProgress(totalXp).level}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-3">
          <Flame className="h-4 w-4 text-orange-400" />
          <div>
            <p className="text-xs text-muted-foreground">Sequência</p>
            <p className="text-lg font-bold text-foreground">
              {streak} {streak === 1 ? "dia" : "dias"}
            </p>
          </div>
        </div>
      </div>

      {evolutionMoment && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-secondary/30 p-4">
          <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/70" />
          <p className="text-sm font-medium text-foreground">{evolutionMoment}</p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {nextHref ? (
          <Link
            to={nextHref}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            style={{ backgroundColor: `hsl(${accentHsl})` }}
          >
            Próxima aula
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            to={trailHref}
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            style={{ backgroundColor: `hsl(${accentHsl})` }}
          >
            Voltar à trilha
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        {nextHref && nextTitle && (
          <span className="text-xs text-muted-foreground">a seguir: {nextTitle}</span>
        )}
        <button
          type="button"
          onClick={onReviewLesson}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground underline hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Refazer esta aula
        </button>
      </div>
    </motion.section>
  );
}
