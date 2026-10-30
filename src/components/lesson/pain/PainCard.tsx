/**
 * A dor, no topo da aula — dita do jeito que a pessoa sente.
 * A pessoa entra porque se reconheceu nesta frase.
 */
export function PainCard({ quote }: { quote: string }) {
  return (
    <section
      aria-label="A dor"
      className="mt-7 rounded-2xl border border-[#3A1B4A] bg-gradient-to-b from-[#1D0F2E] to-[#150B26] px-6 pb-5 pt-6"
    >
      <p className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#FF6B8A]">
        <i className="h-2 w-2 rounded-[2px] bg-[#FF6B8A]" />A DOR
      </p>
      <blockquote className="mt-3.5 break-words font-display text-[22px] font-bold leading-[1.22] tracking-[-0.015em] text-white sm:text-[26px]">
        <span className="text-[#FF6B8A]">“</span>
        {quote}
        <span className="text-[#FF6B8A]">”</span>
      </blockquote>
      <p className="mt-3.5 text-sm text-[#B9A7C9]">Se isso já aconteceu contigo, essa aula é tua.</p>
    </section>
  );
}
