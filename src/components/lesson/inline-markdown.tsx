import { Fragment, type ReactNode } from "react";

/**
 * Markdown inline mínimo para os textos de conteúdo: **negrito** e `código`.
 * Deliberadamente sem HTML/links para manter o conteúdo seguro e previsível.
 */
export function renderInline(text: string): ReactNode {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return tokens.map((tk, i) => {
    if (tk.startsWith("**") && tk.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {tk.slice(2, -2)}
        </strong>
      );
    }
    if (tk.startsWith("`") && tk.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {tk.slice(1, -1)}
        </code>
      );
    }
    return <Fragment key={i}>{tk}</Fragment>;
  });
}
