import { describe, expect, it } from "vitest";
import { babble, isMuted, setMuted, sfx, vibrate } from "@/lib/sound";

describe("som, bipes e vibração", () => {
  it("sem áudio nem vibração no navegador (como no iPhone e nos testes), nada quebra", () => {
    expect(() => {
      sfx.tap();
      sfx.right();
      sfx.wrong();
      sfx.finish();
      babble("julgamento", "Hmm.");
      vibrate([20]);
    }).not.toThrow();
  });

  it("desligar o som fica lembrado", () => {
    setMuted(true);
    expect(isMuted()).toBe(true);
    setMuted(false);
    expect(isMuted()).toBe(false);
  });
});
