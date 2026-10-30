import { AGENTS, type AgentKind } from "@/lib/agents";

/**
 * O fim da aula: a frase da dor de um lado, a mesma pessoa falando depois do
 * outro. É ela vendo que mudou.
 */
export function PainResolved({
  before,
  after,
  agent,
}: {
  before: string;
  after: string;
  agent: AgentKind | null;
}) {
  return (
    <section
      aria-label="Dor resolvida"
      className="mt-10 overflow-hidden rounded-2xl border border-border"
    >
      <div className="flex justify-between gap-4 bg-card px-5 py-3.5 font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
        <span>DOR RESOLVIDA</span>
        {agent && (
          <b className="text-primary">✓ {AGENTS[agent].label.toUpperCase()} NO TIME</b>
        )}
      </div>
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-border bg-[#150B26] px-5 pb-5 pt-4 sm:border-b-0 sm:border-r">
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#FF6B8A]">ANTES</p>
          <p className="mt-2 text-[17px] font-semibold leading-snug text-[#B9A7C9]">“{before}”</p>
        </div>
        <div className="bg-[#0F1E1A] px-5 pb-5 pt-4">
          <p className="font-mono text-[11px] tracking-[0.14em] text-primary">AGORA</p>
          <p className="mt-2 text-[17px] font-semibold leading-snug">“{after}”</p>
        </div>
      </div>
    </section>
  );
}
