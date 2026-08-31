import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { AchievementView } from "@/lib/gamification";

export function AchievementsGrid({
  achievements,
  limit,
}: {
  achievements: AchievementView[];
  limit?: number;
}) {
  const list = limit ? achievements.slice(0, limit) : achievements;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {list.map((a, i) => (
        <motion.div
          key={a.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: i * 0.03 }}
          className={`rounded-xl border p-3 text-center ${
            a.earned
              ? "border-border bg-card"
              : "border-dashed border-border/60 bg-secondary/10"
          }`}
        >
          <div
            className={`mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg text-lg ${
              a.earned ? "bg-secondary" : "bg-secondary/40"
            }`}
          >
            {a.earned ? (
              <span aria-hidden>{a.icon}</span>
            ) : (
              <Lock className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <p
            className={`text-xs font-semibold ${
              a.earned ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {a.title}
          </p>
          <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
            {a.earned ? a.description : "Bloqueada"}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
