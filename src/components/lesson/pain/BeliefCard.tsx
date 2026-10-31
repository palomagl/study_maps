/**
 * A falsa solução — o que a pessoa já faz, de qualquer jeito, achando que
 * resolve. Fica entre a dor e o "o que resolve": antes de mostrar o caminho,
 * a aula mostra o atalho que não leva a lugar nenhum.
 */
export function BeliefCard({ belief }: { belief: string }) {
  return (
    <section
      aria-label="O que tu acha que resolve"
      className="mt-3.5 flex items-start gap-3 rounded-2xl border border-[#4A3A12] bg-[#17120A] px-5 py-4"
    >
      <span
        aria-hidden
        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-[#FFB020]/15 font-mono text-sm font-bold text-[#FFB020]"
      >
        ✗
      </span>
      <div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-[#FFB020]">
          O QUE TU ACHA QUE RESOLVE
        </p>
        <p className="mt-1 text-[15px] leading-snug text-[#E8DDBF]">{belief}</p>
        <p className="mt-1 text-xs text-[#B5A578]">
          Todo mundo faz isso. Não resolve — e a aula mostra por quê.
        </p>
      </div>
    </section>
  );
}
