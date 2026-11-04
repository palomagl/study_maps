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
export function RobotLine({
  agent,
  text,
  mood = "calmo",
  big = false,
}: {
  agent: AgentKind;
  text: string;
  mood?: RobotMood;
  /** Tela só de fala: o robô grande no meio, com o balão embaixo. */
  big?: boolean;
}) {
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

  const fala = (
    <>
      <p className="sr-only">{text}</p>
      <p aria-hidden className="min-h-[1.4em]">
        {parts.slice(0, shown).map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </p>
    </>
  );

  if (big) {
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-x-[-30%] bottom-0 top-[10%] rounded-full opacity-30 blur-2xl"
            style={{ background: AGENTS[agent].color }}
          />
          <div key={mood} className={`relative origin-bottom ${anim}`}>
            <Agent kind={agent} size={150} />
          </div>
        </div>
        <div className="relative mt-4 w-full rounded-3xl border border-[#2E2357] bg-[#17112E] px-5 py-4 text-center text-[17px] leading-snug">
          <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-[#2E2357] bg-[#17112E]" />
          {fala}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3">
      <div key={mood} className={`flex-shrink-0 origin-bottom ${anim}`}>
        <Agent kind={agent} size={84} />
      </div>
      <div className="relative mb-3 flex-1 rounded-2xl rounded-bl-md border border-[#2E2357] bg-[#17112E] px-4 py-3 text-[15px] leading-snug">
        {fala}
      </div>
    </div>
  );
}
