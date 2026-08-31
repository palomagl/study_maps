import { useState, type ReactNode } from "react";
import { Check, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface StepSectionProps {
  id: string;
  emoji: string;
  index: number;
  title: string;
  subtitle?: string;
  done?: boolean;
  /** Pré-requisitos ainda não cumpridos. */
  locked?: boolean;
  lockHint?: string;
  accentHsl: string;
  children: ReactNode;
  /** Ação secundária no cabeçalho (ex.: "Marcar como concluído"). */
  action?: ReactNode;
}

export function StepSection({
  id,
  emoji,
  index,
  title,
  subtitle,
  done,
  locked,
  lockHint,
  accentHsl,
  children,
  action,
}: StepSectionProps) {
  const [forceOpen, setForceOpen] = useState(false);
  const showBody = !locked || forceOpen;

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="scroll-mt-32 rounded-2xl border border-border bg-card p-5 sm:p-6"
    >
      <header className="mb-4 flex items-start gap-3">
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-base"
          style={{
            backgroundColor: done
              ? `hsl(${accentHsl} / 0.15)`
              : "hsl(var(--secondary))",
          }}
          aria-hidden
        >
          {done ? (
            <Check className="h-4 w-4" style={{ color: `hsl(${accentHsl})` }} />
          ) : locked && !forceOpen ? (
            <Lock className="h-4 w-4 text-muted-foreground" />
          ) : (
            <span>{emoji}</span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Passo {index}
          </p>
          <h2 className="text-base font-bold text-foreground">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {done && (
          <span
            className="flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              backgroundColor: `hsl(${accentHsl} / 0.15)`,
              color: `hsl(${accentHsl})`,
            }}
          >
            concluído
          </span>
        )}
        {!done && showBody && action}
      </header>

      {showBody ? (
        children
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {lockHint ?? "Conclua os passos anteriores para liberar."}
          </p>
          <button
            onClick={() => setForceOpen(true)}
            className="mt-2 text-xs font-medium text-muted-foreground underline hover:text-foreground"
          >
            Abrir mesmo assim
          </button>
        </div>
      )}
    </motion.section>
  );
}
