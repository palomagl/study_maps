import { useState } from "react";
import { Link } from "react-router-dom";
import { Agent } from "@/components/agents/Agent";
import { ResourceList, VideoCard } from "@/components/lesson/ResourceList";
import type { Lesson, Trail } from "@/content/types";
import { AGENTS, type AgentKind } from "@/lib/agents";
import { PIECE_XP } from "@/lib/play";
import { progressStore } from "@/lib/progress-store";

export interface PieceStats {
  hits: number;
  tries: number;
  maxCombo: number;
  seconds: number;
}

/**
 * O fim do pedaço: a vitória (XP, acertos, tempo, combo), a missão no projeto
 * de verdade, quanto falta pro robô entrar no time, e o vídeo e os links como
 * extra — fora do caminho.
 */
export function PieceEnd({
  trail,
  lesson,
  agent,
  mission,
  stats,
  remainingInPhase,
  hasName,
  next,
}: {
  trail: Trail;
  lesson: Lesson;
  agent: AgentKind;
  mission: string;
  stats: PieceStats;
  remainingInPhase: number;
  hasName: boolean;
  next: { kind: "pedaco"; onClick: () => void } | { kind: "aula"; href: string } | { kind: "trilha" };
}) {
  const [nome, setNome] = useState("");
  const [nomeSalvo, setNomeSalvo] = useState(hasName);
  const pct = stats.tries ? Math.round((stats.hits / stats.tries) * 100) : 100;
  const label = AGENTS[agent].label;
  const trailHref = `/roadmap/${trail.id}`;
  const btn = "btn-3d block w-full text-center";

  return (
    <div className="flex flex-1 flex-col items-center px-5 pb-6 pt-4 text-center">
      <div className="robo-feliz origin-bottom">
        <Agent kind={agent} size={120} />
      </div>
      <h2 className="title-display mt-3 text-[30px]">Pedaço feito!</h2>

      <div className="mt-5 grid w-full grid-cols-3 gap-2">
        <Stat valor={`+${PIECE_XP}`} rotulo="XP" cor="#3DF5B0" />
        <Stat valor={`${pct}%`} rotulo="ACERTOS" cor="#7C5CFF" />
        <Stat valor={`${Math.floor(stats.seconds / 60)}:${String(stats.seconds % 60).padStart(2, "0")}`} rotulo="TEMPO" cor="#FFB020" />
      </div>
      {stats.maxCombo >= 2 && (
        <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-[#FFB020]">🔥 MELHOR COMBO: {stats.maxCombo} SEGUIDAS</p>
      )}

      <div className="mt-5 w-full rounded-2xl border border-[#2E2357] bg-[#120C26] p-4 text-left">
        <p className="font-mono text-[10px] tracking-[0.14em] text-[#FFB020]">MISSÃO NO TEU PROJETO</p>
        <p className="mt-1 text-[15px] leading-snug">{mission}</p>
      </div>

      <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-[#A99CD6]">
        {remainingInPhase === 0
          ? `✓ ${label.toUpperCase()} NO TIME`
          : remainingInPhase === 1
            ? `FALTA 1 AULA PRO ${label.toUpperCase()} ENTRAR NO TIME`
            : `FALTAM ${remainingInPhase} AULAS PRO ${label.toUpperCase()} ENTRAR NO TIME`}
      </p>

      {!nomeSalvo && (
        <form
          className="mt-5 w-full rounded-2xl border border-[#7C5CFF]/50 bg-[#17112E] p-4 text-left"
          onSubmit={(e) => {
            e.preventDefault();
            if (!nome.trim()) return;
            progressStore.completeOnboarding({ name: nome.trim() });
            setNomeSalvo(true);
          }}
        >
          <label htmlFor="nome-do-time" className="text-[15px] font-semibold">
            Como o time te chama?
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="nome-do-time"
              value={nome}
              maxLength={40}
              onChange={(e) => setNome(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border-2 border-[#2E2357] bg-[#120C26] px-3 py-2.5 text-[15px] outline-none focus:border-[#7C5CFF]"
            />
            <button type="submit" className="btn-3d bg-[#7C5CFF] px-4 text-white [--sombra:#4B33C9]">
              Salvar
            </button>
          </div>
        </form>
      )}

      {(lesson.video || lesson.freeResources.length > 0) && (
        <details className="mt-5 w-full text-left">
          <summary className="cursor-pointer text-[14px] font-semibold text-[#CFC6F0]">Quer ir além? Vídeo e links desta aula</summary>
          <div className="mt-3 space-y-3">
            {lesson.video && <VideoCard video={lesson.video} accentHsl={trail.accentHsl} />}
            {lesson.freeResources.length > 0 && <ResourceList resources={lesson.freeResources} />}
          </div>
        </details>
      )}

      <div className="mt-auto w-full space-y-2 pt-6">
        {next.kind === "pedaco" && (
          <button type="button" onClick={next.onClick} className={`${btn} bg-[#7C5CFF] text-white [--sombra:#4B33C9]`}>
            Próximo pedaço
          </button>
        )}
        {next.kind === "aula" && (
          <Link to={next.href} className={`${btn} bg-[#7C5CFF] text-white [--sombra:#4B33C9]`}>
            Próxima aula
          </Link>
        )}
        <Link to={trailHref} className="block py-2 text-center text-[14px] font-semibold text-[#A99CD6]">
          {next.kind === "trilha" ? "Voltar pra trilha" : "Parar por hoje"}
        </Link>
      </div>
    </div>
  );
}

function Stat({ valor, rotulo, cor }: { valor: string; rotulo: string; cor: string }) {
  return (
    <div className="rounded-2xl border-2 border-[#2E2357] px-2 py-2.5">
      <p className="title-display text-[20px]" style={{ color: cor }}>
        {valor}
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-[#A99CD6]">{rotulo}</p>
    </div>
  );
}
