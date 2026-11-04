import { motion } from "framer-motion";

/**
 * A folha que sobe de baixo depois do "Verificar": verde no acerto, vermelha
 * no erro. Errar não trava — explica e segue.
 */
export function FeedbackSheet({
  ok,
  title,
  text,
  onNext,
}: {
  ok: boolean;
  title: string;
  text: string;
  onNext: () => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-label="Resposta"
      initial={{ y: "105%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      className={`absolute inset-x-0 bottom-0 z-20 rounded-t-3xl px-5 pb-7 pt-5 ${ok ? "bg-[#0F2A21]" : "bg-[#2A0F1A]"}`}
    >
      <p className={`title-display text-xl ${ok ? "text-[#3DF5B0]" : "text-[#FF6B8A]"}`}>{title}</p>
      <p className="mt-1.5 text-[15px] leading-snug text-[#E6DFFF]">{text}</p>
      <button
        type="button"
        onClick={onNext}
        className={`btn-3d mt-4 w-full ${ok ? "bg-[#3DF5B0] text-[#0B0717] [--sombra:#1FA676]" : "bg-[#FF6B8A] text-[#1A0710] [--sombra:#B83A57]"}`}
      >
        {ok ? "Continuar" : "Entendi"}
      </button>
    </motion.div>
  );
}
