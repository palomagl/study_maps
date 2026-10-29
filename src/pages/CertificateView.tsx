import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Printer } from "lucide-react";
import Header from "@/components/Header";
import { getTrail } from "@/content";
import { useProgress } from "@/hooks/useProgress";
import { buildCertificate, certificateGaps, gapLabel } from "@/lib/certificate";

/**
 * O certificado. Só existe quando a pessoa concluiu as aulas E registrou o
 * link do que publicou — é isso que o separa de um certificado de presença.
 * Quando falta algo, a página mostra o que falta, nunca um certificado vazio.
 */
const CertificateView = () => {
  const { trailId } = useParams();
  const { state } = useProgress();
  const trail = getTrail(trailId);

  if (!trail) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-4 pt-36 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Trilha não encontrada
          </h1>
          <Link to="/" className="mt-4 inline-block text-sm underline">
            Voltar ao início
          </Link>
        </main>
      </div>
    );
  }

  const gaps = certificateGaps(state, trail);
  const cert = buildCertificate(state, trail);

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #ffffff !important; }
          .certificado { box-shadow: none !important; border-color: #d4d4d4 !important; }
        }
      `}</style>

      <div className="no-print">
        <Header />
      </div>

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-32 print:pt-0">
        <Link
          to={`/roadmap/${trail.id}`}
          className="no-print mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a trilha
        </Link>

        {!cert ? (
          <section className="rounded-xl border border-border bg-card/60 p-6">
            <h1 className="text-xl font-bold text-foreground">
              Ainda não dá para emitir o seu certificado
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
              Ele não é de participação. Ele diz que você entregou — então
              precisa de uma entrega. Falta:
            </p>
            <ul className="mt-4 space-y-2">
              {gaps.map((g) => (
                <li
                  key={g}
                  className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/20 p-3 text-sm text-foreground"
                >
                  <span aria-hidden className="mt-0.5">
                    ○
                  </span>
                  {gapLabel(g)}
                </li>
              ))}
            </ul>
            <Link
              to={`/roadmap/${trail.id}`}
              className="mt-5 inline-block rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground"
              style={{ backgroundColor: `hsl(${trail.accentHsl})` }}
            >
              Continuar a trilha
            </Link>
          </section>
        ) : (
          <>
            <article className="certificado rounded-2xl border border-border bg-card p-8 sm:p-12">
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: `hsl(${trail.accentHsl})` }}
              >
                Certificado de conclusão
              </p>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {cert.learnerName}
              </h1>

              <p className="mt-4 text-[15px] leading-7 text-muted-foreground">
                concluiu a trilha{" "}
                <strong className="text-foreground">{cert.trailTitle}</strong> e
                publicou um projeto no ar:
              </p>

              <a
                href={cert.proofUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1.5 break-all text-[15px] font-semibold underline underline-offset-4"
                style={{ color: `hsl(${trail.accentHsl})` }}
              >
                {cert.proofUrl}
                <ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
              </a>

              <h2 className="mt-8 text-sm font-semibold text-foreground">
                O que este certificado atesta
              </h2>
              <ul className="mt-3 space-y-2">
                {cert.certifies.map((frase) => (
                  <li
                    key={frase}
                    className="flex items-start gap-2.5 text-[15px] leading-7 text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: `hsl(${trail.accentHsl})` }}
                    />
                    {frase}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
                <span>
                  Emitido em{" "}
                  {new Date(cert.issuedAt).toLocaleDateString("pt-BR")} · código{" "}
                  <span className="font-mono text-foreground">{cert.code}</span>
                </span>
                <span className="font-semibold text-foreground">StudyMaps</span>
              </div>

              <p className="mt-5 text-xs leading-6 text-muted-foreground">
                Este certificado não tem valor acadêmico e não vale como
                diploma. O que ele atesta é verificável por quem o recebe: há um
                projeto publicado, com endereço, feito por quem assina.
              </p>
            </article>

            <button
              type="button"
              onClick={() => window.print()}
              className="no-print mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              <Printer className="h-4 w-4" />
              Imprimir ou salvar em PDF
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default CertificateView;
