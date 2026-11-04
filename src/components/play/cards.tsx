import { useMemo, useState } from "react";
import type { PlayCard } from "@/content/types";
import type { AgentKind } from "@/lib/agents";
import { NOTE_MAX } from "@/lib/play";
import { sfx } from "@/lib/sound";
import { RobotLine, type RobotMood } from "./RobotLine";

/**
 * As telas da aula. Cada uma recebe a fala já com `{chave}` trocada e avisa
 * o player pelo `onAnswer` (telas que conferem) ou `onDone` (as que só seguem).
 * O botão de baixo é sempre do player — aqui só o que a pessoa toca.
 */

export interface CardProps<K extends PlayCard["kind"]> {
  card: Extract<PlayCard, { kind: K }>;
  agent: AgentKind;
  mood: RobotMood;
  fill: (text: string) => string;
}

const chip =
  "rounded-xl border-2 border-b-4 border-[#2E2357] bg-[#120C26] px-3 py-2 text-[14px] font-medium text-[#F2EEFF] transition-transform active:translate-y-0.5 active:border-b-2";

export function EscolhaCard({
  card,
  agent,
  mood,
  fill,
  value,
  onChange,
}: CardProps<"escolha"> & { value: string | null; onChange: (id: string) => void }) {
  return (
    <>
      <RobotLine agent={agent} mood={mood} text={fill(card.prompt)} />
      <div className="mt-5 flex flex-col gap-2.5">
        {card.options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => {
              sfx.tap();
              onChange(o.id);
            }}
            className={`${chip} px-4 py-3.5 text-left text-[15px] ${value === o.id ? "border-[#7C5CFF] bg-[#1B1340]" : ""}`}
          >
            {fill(o.text)}
          </button>
        ))}
      </div>
    </>
  );
}

/** `value` = os textos que a pessoa marcou pra ficar de fora. */
export function CortarCard({
  card,
  agent,
  mood,
  fill,
  value,
  onChange,
}: CardProps<"cortar"> & { value: string[]; onChange: (fora: string[]) => void }) {
  return (
    <>
      <RobotLine agent={agent} mood={mood} text={fill(card.prompt)} />
      <div className="mt-5 flex flex-wrap gap-2">
        {card.chips.map((c) => {
          const fora = value.includes(c.text);
          return (
            <button
              key={c.text}
              type="button"
              aria-pressed={fora}
              onClick={() => {
                sfx.tap();
                onChange(fora ? value.filter((x) => x !== c.text) : [...value, c.text]);
              }}
              className={`${chip} ${fora ? "border-[#1E1640] text-[#6F64A0] line-through" : ""}`}
            >
              {c.text}
            </button>
          );
        })}
      </div>
    </>
  );
}

/** Ordem estável e embaralhada: o certo não fica sempre na mesma posição. */
function embaralha(xs: string[]): string[] {
  const h = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return [...xs].sort((a, b) => h(a) - h(b));
}

export function MontarCard({
  card,
  agent,
  mood,
  fill,
  value,
  onChange,
}: CardProps<"montar"> & { value: string[]; onChange: (blocos: string[]) => void }) {
  const banco = useMemo(() => embaralha([...card.answer, ...card.distractors]), [card]);
  return (
    <>
      <RobotLine agent={agent} mood={mood} text={fill(card.prompt)} />
      <div className="mt-5 flex min-h-[96px] flex-wrap content-start gap-2 border-b-2 border-[#2E2357] pb-3">
        {value.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => {
              sfx.tap();
              onChange(value.filter((x) => x !== b));
            }}
            className={`${chip} border-[#7C5CFF]`}
          >
            {b}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {banco.map((b) =>
          value.includes(b) ? (
            <span key={b} aria-hidden className="rounded-xl border-2 border-dashed border-[#1E1640] px-3 py-2 text-[14px] text-transparent">
              {b}
            </span>
          ) : (
            <button
              key={b}
              type="button"
              onClick={() => {
                sfx.tap();
                onChange([...value, b]);
              }}
              className={chip}
            >
              {b}
            </button>
          ),
        )}
      </div>
    </>
  );
}

export function EscreverCard({
  card,
  agent,
  mood,
  fill,
  value,
  onChange,
}: CardProps<"escrever"> & { value: string; onChange: (t: string) => void }) {
  const [focado, setFocado] = useState(false);
  return (
    <>
      <RobotLine agent={agent} mood={mood} text={fill(card.prompt)} />
      <input
        aria-label={fill(card.prompt)}
        value={value}
        maxLength={NOTE_MAX}
        placeholder={card.placeholder}
        onFocus={() => setFocado(true)}
        onBlur={() => setFocado(false)}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-5 w-full rounded-2xl border-2 bg-[#120C26] px-4 py-3.5 text-[15px] text-[#F2EEFF] outline-none ${focado ? "border-[#7C5CFF]" : "border-[#2E2357]"}`}
      />
      <p className="mt-2 text-right font-mono text-[11px] text-[#6F64A0]">
        {value.length}/{NOTE_MAX}
      </p>
    </>
  );
}
