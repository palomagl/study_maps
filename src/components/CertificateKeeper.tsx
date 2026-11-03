import { useEffect } from "react";
import { curriculum } from "@/content";
import { useProgress } from "@/hooks/useProgress";
import { issueEarnedCertificates } from "@/lib/certificate";
import { progressStore } from "@/lib/progress-store";

/**
 * Guarda o certificado no momento em que ele é conquistado — montado uma
 * vez só, no topo da árvore, como o GamificationRuntime. Não renderiza nada.
 */
export default function CertificateKeeper() {
  const { state } = useProgress();
  useEffect(() => {
    issueEarnedCertificates(state, curriculum, (trailId, cert) =>
      progressStore.recordCertificate(trailId, cert),
    );
  }, [state]);
  return null;
}
