import { useState } from "react";
import { ExternalLink, Link2 } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

/**
 * O link do que a pessoa publicou.
 *
 * É a prova da trilha: ninguém se orgulha de um chat bom, todo mundo se
 * orgulha de um link. Ele é autodeclarado — não há backend para conferir — e
 * de propósito NÃO trava a conclusão da trilha: travar puniria quem publicou
 * fora do fluxo do app. O que ele destrava é o certificado.
 */
export function ProofCard({
  trailId,
  accentHsl,
}: {
  trailId: string;
  accentHsl: string;
}) {
  const { proofs, setProof } = useProgress();
  const saved = proofs[trailId];

  const [draft, setDraft] = useState("");
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (setProof(trailId, draft)) {
      setDraft("");
      setEditing(false);
      setError(null);
    } else {
      setError(
        "Isso não parece um link de algo publicado. Cola o endereço que a Vercel ou a Render te deu — localhost só abre no teu computador.",
      );
    }
  };

  if (saved && !editing) {
    return (
      <section
        aria-labelledby="prova-titulo"
        className="mt-6 rounded-xl border border-border bg-card/60 p-4"
      >
        <h2
          id="prova-titulo"
          className="flex items-center gap-2 text-sm font-semibold text-foreground"
        >
          <Link2 className="h-4 w-4" style={{ color: `hsl(${accentHsl})` }} />
          O teu projeto tá no ar
        </h2>
        <a
          href={saved.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 inline-flex items-center gap-1.5 break-all text-[15px] font-medium underline underline-offset-4"
          style={{ color: `hsl(${accentHsl})` }}
        >
          {saved.url}
          <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
        </a>
        <p className="mt-2 text-xs text-muted-foreground">
          Registrado em{" "}
          {new Date(saved.savedAt).toLocaleDateString("pt-BR")} ·{" "}
          <button
            type="button"
            onClick={() => {
              setDraft(saved.url);
              setEditing(true);
            }}
            className="underline underline-offset-2 hover:text-foreground"
          >
            trocar o link
          </button>
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="prova-titulo"
      className="mt-6 rounded-xl border border-border bg-card/60 p-4"
    >
      <h2
        id="prova-titulo"
        className="flex items-center gap-2 text-sm font-semibold text-foreground"
      >
        <Link2 className="h-4 w-4 text-muted-foreground" />
        Registra o link do que tu publicou
      </h2>
      <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
        É o que separa “fiz um projeto” de “olha ele aqui”. Cola o endereço
        público do teu app — ele destrava o teu certificado.
      </p>

      <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          inputMode="url"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setError(null);
          }}
          placeholder="https://meu-app.vercel.app"
          aria-label="Link do teu projeto publicado"
          aria-invalid={error ? true : undefined}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
          style={{ backgroundColor: `hsl(${accentHsl})` }}
        >
          Salvar
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-2 text-[13px] leading-6 text-red-400">
          {error}
        </p>
      )}
    </section>
  );
}
