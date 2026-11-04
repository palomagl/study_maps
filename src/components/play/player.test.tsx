import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LessonPlayer } from "@/components/play/LessonPlayer";
import { appNoArTrail } from "@/content/trails/app-no-ar";
import { recortaAIdeia } from "@/content/lessons/ar-ideia-01-recortar";
import type { Lesson } from "@/content/types";
import { progressStore } from "@/lib/progress-store";
import { setMuted } from "@/lib/sound";

const fase = appNoArTrail.phases[0];

/** Um pedaço com uma tela de cada tipo — a 1.1 de mentira. */
const aula: Lesson = {
  ...recortaAIdeia,
  play: {
    pieces: [
      {
        id: "teste",
        title: "Teste",
        mission: "Escreve a lista do que a tua ideia tem.",
        cards: [
          { kind: "fala", text: "Oi! Tua ideia: {ideia}." },
          { kind: "dor" },
          {
            kind: "escolha",
            prompt: "Primeiro passo do Caio?",
            options: [
              { id: "a", text: "Pedir tudo de uma vez" },
              { id: "b", text: "Uma coisa só" },
            ],
            correctId: "b",
            beliefId: "a",
            right: "Uma coisa só. O resto espera.",
            wrong: "Vem um app genérico, com metade quebrada.",
          },
          {
            kind: "cortar",
            prompt: "Toca no que fica pra depois.",
            chips: [
              { text: "Mandar o link", keep: true },
              { text: "Chat", keep: false },
            ],
            right: "Cabe num fim de semana.",
            wrong: "Fica só o que faz o rolê acontecer.",
          },
          {
            kind: "montar",
            prompt: "Monta a frase.",
            answer: ["Quem marca o rolê", "manda o link"],
            distractors: ["e paga"],
            right: "Perfeito.",
            wrong: "Tem e também aí.",
          },
          { kind: "escrever", prompt: "Escreve a tua ideia.", placeholder: "Quem… faz o quê…", saveAs: "ideia" },
        ],
      },
    ],
  },
};

const abrir = () =>
  render(
    <MemoryRouter>
      <LessonPlayer trail={appNoArTrail} phase={fase} lesson={aula} />
    </MemoryRouter>,
  );
const toca = (nome: string | RegExp) => fireEvent.click(screen.getByRole("button", { name: nome }));
const folha = () => screen.getByRole("dialog", { name: /resposta/i });

beforeEach(() => {
  progressStore.resetAll();
  setMuted(true);
});
afterEach(() => setMuted(false));

describe("o player da aula", () => {
  it("o robô fala, com a ideia trocada pelo texto alternativo", () => {
    abrir();
    expect(screen.getByText("Oi! Tua ideia: a tua ideia.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Agente Ideia" })).toBeInTheDocument();
  });

  it("percorre o pedaço inteiro e guarda tudo", () => {
    abrir();
    toca("Continuar");

    expect(screen.getByText(aula.pain!.quote, { exact: false })).toBeInTheDocument();
    toca("Já aconteceu comigo");

    toca("Pedir tudo de uma vez");
    toca("Verificar");
    expect(within(folha()).getByText("Todo mundo faz isso")).toBeInTheDocument();
    expect(within(folha()).getByText("Vem um app genérico, com metade quebrada.")).toBeInTheDocument();
    toca("Entendi");

    toca("Chat");
    toca("Verificar");
    expect(within(folha()).getByText("Cabe num fim de semana.")).toBeInTheDocument();
    toca("Continuar");

    toca("Quem marca o rolê");
    toca("manda o link");
    toca("Verificar");
    expect(within(folha()).getByText("Perfeito.")).toBeInTheDocument();
    expect(screen.getByText(/2 SEGUIDAS/)).toBeInTheDocument();
    toca("Continuar");

    fireEvent.change(screen.getByRole("textbox", { name: "Escreve a tua ideia." }), {
      target: { value: "Quem joga bola acha time" },
    });
    toca("Guardar");

    expect(screen.getByRole("heading", { name: "Pedaço feito!" })).toBeInTheDocument();
    expect(screen.getByText("Escreve a lista do que a tua ideia tem.")).toBeInTheDocument();
    expect(progressStore.getState().lessons[aula.id].pieces).toEqual(["teste"]);
    expect(progressStore.getState().notes.ideia).toBe("Quem joga bola acha time");
    expect(progressStore.getState().xp).toBe(40);
  });

  it("sem nome, o fim do pedaço pergunta como o time te chama", () => {
    progressStore.completePiece(aula.id, "outro", 0);
    abrir();
    toca("Continuar");
    toca("Já aconteceu comigo");
    toca("Uma coisa só");
    toca("Verificar");
    toca("Continuar");
    toca("Chat");
    toca("Verificar");
    toca("Continuar");
    toca("Quem marca o rolê");
    toca("manda o link");
    toca("Verificar");
    toca("Continuar");
    fireEvent.change(screen.getByRole("textbox", { name: "Escreve a tua ideia." }), { target: { value: "app" } });
    toca("Guardar");

    fireEvent.change(screen.getByRole("textbox", { name: "Como o time te chama?" }), { target: { value: "Caio" } });
    toca("Salvar");
    expect(progressStore.getState().profile.name).toBe("Caio");
  });

  it("o ✕ leva de volta pra trilha", () => {
    abrir();
    expect(screen.getByRole("link", { name: "Sair da aula" })).toHaveAttribute("href", "/roadmap/app-no-ar");
  });
});
