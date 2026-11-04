import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { getAdjacentLessons } from "@/content";
import type { Lesson, Phase, PlayCard, Trail } from "@/content/types";
import { useProgress } from "@/hooks/useProgress";
import { AGENTS, agentForPhase } from "@/lib/agents";
import { checkAnswer, fillNotes, PIECE_XP } from "@/lib/play";
import { lessonComplete, nextPieceIndex } from "@/lib/progress-selectors";
import { isMuted, setMuted, sfx, vibrate } from "@/lib/sound";
import { CortarCard, EscolhaCard, EscreverCard, MontarCard } from "./cards";
import { FeedbackSheet } from "./FeedbackSheet";
import { PieceEnd, type PieceStats } from "./PieceEnd";
import { RobotLine, type RobotMood } from "./RobotLine";

/** Quando a pessoa ainda não escreveu nada, `{ideia}` vira isso — nunca "{ideia}" na tela. */
const FALLBACK = {
  ideia: "a tua ideia",
  referencia: "a tua referência",
  publico: "o teu público",
  ferramenta: "a tua ferramenta",
  commit: "tua descrição",
};

type Answer = string | string[];
interface Verdict {
  ok: boolean;
  title: string;
  text: string;
}

/**
 * A aula em telas de celular, conduzida pelo robô da fase. Uma tela por vez;
 * as que conferem resposta mostram a folha verde ou vermelha, com som, reação
 * do robô e vibração. Pedaço só conta inteiro: recarregar recomeça o pedaço.
 */
export function LessonPlayer({ trail, phase, lesson }: { trail: Trail; phase: Phase; lesson: Lesson }) {
  const { state, notes, completePiece, saveNote } = useProgress();
  const pieces = lesson.play!.pieces;
  const agent = agentForPhase(phase.id) ?? "ideia";

  const [pieceIdx, setPieceIdx] = useState(() => {
    const i = nextPieceIndex(state, lesson);
    return i >= pieces.length ? 0 : i;
  });
  const piece = pieces[pieceIdx];
  const [cardIdx, setCardIdx] = useState(0);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [mood, setMood] = useState<RobotMood>("calmo");
  const [combo, setCombo] = useState(0);
  const [stats, setStats] = useState<Omit<PieceStats, "seconds">>({ hits: 0, tries: 0, maxCombo: 0 });
  const startedAt = useRef(Date.now());
  const [muted, setMutedState] = useState(isMuted());

  const card: PlayCard | undefined = piece.cards[cardIdx];
  const done = cardIdx >= piece.cards.length;
  const fill = (t: string) => fillNotes(t, notes, FALLBACK);

  // Pedaço terminado: conta uma vez, com festa.
  useEffect(() => {
    if (!done) return;
    completePiece(lesson.id, piece.id, PIECE_XP);
    sfx.finish();
    vibrate([30, 60, 30]);
  }, [done, completePiece, lesson.id, piece.id]);

  const remainingInPhase = useMemo(
    () =>
      phase.stages
        .flatMap((s) => s.lessons)
        .filter((l) => l.status === "available" && !lessonComplete(state, l)).length,
    [phase, state],
  );

  const goNext = () => {
    sfx.tap();
    setVerdict(null);
    setAnswer(null);
    setMood("calmo");
    setCardIdx((i) => i + 1);
  };

  const verify = () => {
    if (!card || answer === null) return;
    const ok = checkAnswer(card, answer);
    const c = card as Extract<PlayCard, { right: string }>;
    const belief = card.kind === "escolha" && !ok && answer === card.beliefId;
    setCombo((n) => (ok ? n + 1 : 0));
    setStats((s) => ({
      hits: s.hits + (ok ? 1 : 0),
      tries: s.tries + 1,
      maxCombo: Math.max(s.maxCombo, ok ? combo + 1 : 0),
    }));
    setMood(ok ? "feliz" : "triste");
    if (ok) sfx.right();
    else sfx.wrong();
    vibrate(ok ? 18 : [50, 40, 50]);
    setVerdict({
      ok,
      title: ok ? "Isso!" : belief ? "Todo mundo faz isso" : "Quase",
      text: fill(ok ? c.right : c.wrong),
    });
  };

  const save = () => {
    if (card?.kind !== "escrever" || typeof answer !== "string") return;
    saveNote(card.saveAs, answer);
    sfx.right();
    goNext();
  };

  const startNextPiece = () => {
    setPieceIdx((i) => i + 1);
    setCardIdx(0);
    setStats({ hits: 0, tries: 0, maxCombo: 0 });
    setCombo(0);
    startedAt.current = Date.now();
  };

  const adjacent = getAdjacentLessons(trail.id, lesson.id);
  const next =
    pieceIdx + 1 < pieces.length
      ? ({ kind: "pedaco", onClick: startNextPiece } as const)
      : adjacent.next
        ? ({ kind: "aula", href: `/roadmap/${trail.id}/aula/${adjacent.next.lesson.id}` } as const)
        : ({ kind: "trilha" } as const);

  const toggleMute = () => {
    setMuted(!muted);
    setMutedState(!muted);
  };

  const progresso = done ? 1 : cardIdx / piece.cards.length;
  const botao = "btn-3d w-full";

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-[#05030C]">
      <div
        className="relative flex h-full w-full max-w-md flex-col overflow-hidden bg-[#0B0717] text-[#F2EEFF]"
        style={{ backgroundImage: `radial-gradient(ellipse 80% 45% at 50% 0%, ${AGENTS[agent].color}22, transparent 70%)` }}
      >
        {/* topo: sair, progresso, combo, som */}
        <div className="flex items-center gap-3 px-4 pb-2 pt-4">
          <Link to={`/roadmap/${trail.id}`} aria-label="Sair da aula" className="text-[#6F64A0] hover:text-[#F2EEFF]">
            <X className="h-5 w-5" />
          </Link>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#1E1640]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#3DF5B0]"
              initial={false}
              animate={{ width: `${progresso * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            />
          </div>
          <span className="min-w-[64px] text-right font-mono text-[11px] font-bold text-[#FFB020]">
            {!done && combo >= 2 ? `🔥 ${combo} SEGUIDAS` : ""}
          </span>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Ligar o som" : "Desligar o som"}
            className="text-[#6F64A0] hover:text-[#F2EEFF]"
          >
            {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        {done ? (
          <PieceEnd
            trail={trail}
            lesson={lesson}
            agent={agent}
            mission={fill(piece.mission)}
            stats={{ ...stats, seconds: Math.round((Date.now() - startedAt.current) / 1000) }}
            remainingInPhase={remainingInPhase}
            hasName={!!state.profile.name?.trim()}
            next={next}
          />
        ) : (
          <>
            {/* Só a entrada anima: esperar a saída seguraria a próxima tela. */}
            <motion.div
                key={`${pieceIdx}-${cardIdx}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="flex-1 overflow-y-auto px-5 pt-2"
              >
                {card.kind === "fala" && (
                  <div className="flex min-h-full flex-col justify-center pb-8">
                    <RobotLine big agent={agent} mood={mood} text={fill(card.text)} />
                  </div>
                )}
                {card.kind === "dor" && (
                  <>
                    <RobotLine agent={agent} mood={mood} text="Isso já aconteceu contigo?" />
                    <p className="mt-6 font-display text-[24px] font-extrabold leading-tight">
                      <span className="text-[#FF6B8A]">“</span>
                      {lesson.pain?.quote}
                      <span className="text-[#FF6B8A]">”</span>
                    </p>
                  </>
                )}
                {card.kind === "escolha" && (
                  <EscolhaCard card={card} agent={agent} mood={mood} fill={fill} value={(answer as string) ?? null} onChange={(v) => !verdict && setAnswer(v)} checked={!!verdict} />
                )}
                {card.kind === "cortar" && (
                  <CortarCard
                    card={card}
                    agent={agent}
                    mood={mood}
                    fill={fill}
                    value={card.chips.map((c) => c.text).filter((t) => !((answer as string[] | null) ?? card.chips.map((c) => c.text)).includes(t))}
                    onChange={(fora) => !verdict && setAnswer(card.chips.map((c) => c.text).filter((t) => !fora.includes(t)))}
                  />
                )}
                {card.kind === "montar" && (
                  <MontarCard card={card} agent={agent} mood={mood} fill={fill} value={(answer as string[]) ?? []} onChange={(v) => !verdict && setAnswer(v.length ? v : null)} />
                )}
                {card.kind === "escrever" && (
                  <EscreverCard card={card} agent={agent} mood={mood} fill={fill} value={(answer as string) ?? ""} onChange={(v) => setAnswer(v)} />
                )}
            </motion.div>

            {/* o botão de baixo, ao alcance do dedão */}
            <div className="px-5 pb-7 pt-3">
              {card.kind === "fala" && (
                <button type="button" onClick={goNext} className={`${botao} bg-[#7C5CFF] text-white [--sombra:#4B33C9]`}>
                  Continuar
                </button>
              )}
              {card.kind === "dor" && (
                <div className="space-y-2">
                  <button type="button" onClick={goNext} className={`${botao} bg-[#7C5CFF] text-white [--sombra:#4B33C9]`}>
                    Já aconteceu comigo
                  </button>
                  <button type="button" onClick={goNext} className="w-full py-2 text-[14px] font-semibold text-[#A99CD6]">
                    Ainda não
                  </button>
                </div>
              )}
              {(card.kind === "escolha" || card.kind === "cortar" || card.kind === "montar") && (
                <button
                  type="button"
                  onClick={verify}
                  disabled={answer === null || !!verdict}
                  className={`${botao} bg-[#7C5CFF] text-white [--sombra:#4B33C9] disabled:bg-[#1E1640] disabled:text-[#4E447A] disabled:shadow-none`}
                >
                  Verificar
                </button>
              )}
              {card.kind === "escrever" && (
                <button
                  type="button"
                  onClick={save}
                  disabled={typeof answer !== "string" || answer.trim().length < 3}
                  className={`${botao} bg-[#3DF5B0] text-[#0B0717] [--sombra:#1FA676] disabled:bg-[#1E1640] disabled:text-[#4E447A] disabled:shadow-none`}
                >
                  Guardar
                </button>
              )}
            </div>

            {verdict && <FeedbackSheet ok={verdict.ok} title={verdict.title} text={verdict.text} onNext={goNext} />}
          </>
        )}
      </div>
    </div>
  );
}
