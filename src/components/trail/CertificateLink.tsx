import { Link } from "react-router-dom";
import { Award } from "lucide-react";
import type { Trail } from "@/content/types";
import { useProgress } from "@/hooks/useProgress";
import { certificateGaps, gapLabel } from "@/lib/certificate";

/**
 * Aparece sempre, mesmo quando ainda não dá para emitir — ver o que falta é
 * o que faz a pessoa ir publicar. Esconder só adiaria a descoberta.
 */
export function CertificateLink({ trail }: { trail: Trail }) {
  const { state } = useProgress();
  const gaps = certificateGaps(state, trail);

  if (gaps.length === 0) {
    return (
      <Link
        to={`/certificado/${trail.id}`}
        className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
        style={{ backgroundColor: `hsl(${trail.accentHsl})` }}
      >
        <Award className="h-4 w-4" />
        Ver o teu certificado
      </Link>
    );
  }

  const pendencia =
    gaps[0] === "trail-unwritten"
      ? "abre quando a trilha estiver escrita"
      : `falta ${gapLabel(gaps[0]).toLowerCase()}`;

  return (
    <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <Award className="h-4 w-4 flex-shrink-0" />
      <span>
        Certificado:{" "}
        <Link
          to={`/certificado/${trail.id}`}
          className="underline underline-offset-4 hover:text-foreground"
        >
          {pendencia}
        </Link>
      </span>
    </p>
  );
}
