import { useEffect, useMemo, useState } from "react";
import { Agent } from "@/components/agents/Agent";
import type { AgentKind } from "@/lib/agents";
import { AGENTS } from "@/lib/agents";
import { syllables } from "@/lib/play";
import { babble } from "@/lib/sound";

export type RobotMood = "calmo" | "feliz" | "triste";

/** Sem animação quando a pessoa pediu menos movimento — ou onde não dá pra saber (testes). */
function prefersInstant(): boolean {
  return typeof window.matchMedia !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * O robô da fase falando: a fala aparece sílaba a sílaba, com o bipe dele em
 * cada uma. O texto inteiro fica num parágrafo só pra leitor de tela; o que
 * aparece animado é decoração.
 */
export function RobotLine({ agent, text, mood = "calmo" }: { agent: AgentKind; text: string; mood?: RobotMood }) {
  const parts = useMemo(() => syllables(text), [text]);
  const [shown, setShown] = useState(() => (prefersInstant() ? parts.length : 0));

  useEffect(() => {
    if (prefersInstant()) {
      setShown(parts.length);
      return;
    }
    setShown(0);
    const ms = AGENTS[agent].voice.ms;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (i >= parts.length) return;
      babble(agent, parts[i]);
      i += 1;
      setShown(i);
      // Respiro depois de vírgula e ponto: é o que dá ritmo de fala.
      timer = setTimeout(step, ms + (/[,.…]$/.test(parts[i - 1]) ? ms * 2 : 0));
    };
    timer = setTimeout(step, 180);
    return () => clearTimeout(timer);
  }, [agent, parts]);

  const falando = shown < parts.length;
  const anim = mood === "feliz" ? "robo-feliz" : mood === "triste" ? "robo-triste" : falando ? "robo-fala" : "robo-respira";

  return (
    <div className="flex items-end gap-3">
      <div key={mood} className={`flex-shrink-0 origin-bottom ${anim}`}>
        <Agent kind={agent} size={84} />
      </div>
      <div className="relative mb-3 flex-1 rounded-2xl rounded-bl-md border border-[#2E2357] bg-[#17112E] px-4 py-3 text-[15px] leading-snug">
        <p className="sr-only">{text}</p>
        <p aria-hidden className="min-h-[1.4em]">
          {parts.slice(0, shown).map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </p>
      </div>
    </div>
  );
}
