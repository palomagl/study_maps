import { useGamification } from "@/hooks/useGamification";

/**
 * Monta a lógica de gamificação uma única vez, no topo da árvore:
 * desbloqueia conquistas pendentes e dispara os toasts de conquista/nível.
 * Não renderiza nada.
 */
export default function GamificationRuntime() {
  useGamification({ withToasts: true });
  return null;
}
