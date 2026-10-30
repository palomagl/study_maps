import { Agent } from "@/components/agents/Agent";
import type { AgentKind } from "@/lib/agents";

/** O agente da fase promete a saída numa frase. */
export function ResolveCard({
  resolve,
  detail,
  agent,
}: {
  resolve: string;
  detail?: string;
  agent: AgentKind | null;
}) {
  return (
    <section
      aria-label="O que resolve"
      className="mt-3.5 flex items-center gap-4 rounded-2xl border border-[#1C4A3B] bg-[#0F1E1A] py-4 pl-4 pr-5"
    >
      {agent && <Agent kind={agent} size={62} className="flex-shrink-0" />}
      <div>
        <p className="font-mono text-[11px] tracking-[0.14em] text-primary">O QUE RESOLVE</p>
        <p className="mt-1 font-display text-lg font-extrabold leading-snug [font-stretch:110%] sm:text-xl">
          {resolve}
        </p>
        {detail && <p className="mt-1 text-sm text-[#9FD9C4]">{detail}</p>}
      </div>
    </section>
  );
}
