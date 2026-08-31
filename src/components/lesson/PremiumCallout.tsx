import { Gem, ExternalLink } from "lucide-react";
import type { PremiumResource } from "@/content/types";

/**
 * "💎 QUER SE APROFUNDAR?" — recomendações pagas. NUNCA bloqueiam a trilha:
 * é um bloco opcional, claramente marcado, com o motivo de cada indicação.
 * Nunca exibe preço, duração ou nota (não temos esse dado e não inventamos).
 */
export function PremiumCallout({ resources }: { resources: PremiumResource[] }) {
  if (!resources.length) return null;

  return (
    <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-b from-violet-500/[0.07] to-transparent p-5">
      <div className="mb-1 flex items-center gap-2">
        <Gem className="h-4 w-4 text-violet-400" />
        <h3 className="text-sm font-bold text-foreground">Quer se aprofundar?</h3>
      </div>
      <p className="mb-4 text-xs text-muted-foreground">
        Opcional. Tudo nesta trilha dá para aprender de graça — estas são indicações
        pagas para quem quer ir além.
      </p>

      <ul className="space-y-2">
        {resources.map((r, i) => (
          <li
            key={i}
            className="rounded-xl border border-border bg-card/60 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.platform}</p>
              </div>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
              >
                Ver na plataforma
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              <span className="font-medium text-foreground/80">
                Por que recomendamos:{" "}
              </span>
              {r.reason}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
