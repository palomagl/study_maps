import { Info, Lightbulb, TriangleAlert, Sparkles } from "lucide-react";
import type { ContentBlock } from "@/content/types";
import { renderInline } from "./inline-markdown";

const calloutStyle: Record<
  Extract<ContentBlock, { type: "callout" }>["variant"],
  { icon: typeof Info; className: string; label: string }
> = {
  info: { icon: Info, className: "border-sky-500/30 bg-sky-500/5", label: "Nota" },
  tip: { icon: Lightbulb, className: "border-emerald-500/30 bg-emerald-500/5", label: "Dica" },
  warning: {
    icon: TriangleAlert,
    className: "border-amber-500/30 bg-amber-500/5",
    label: "Atenção",
  },
  analogy: {
    icon: Sparkles,
    className: "border-violet-500/30 bg-violet-500/5",
    label: "Analogia",
  },
};

function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure className="my-4">
      <div className="overflow-x-auto rounded-xl border border-border bg-[hsl(215_28%_6%)]">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="font-mono text-foreground/90">{code}</code>
        </pre>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h3
                key={i}
                className="pt-3 text-lg font-bold tracking-tight text-foreground"
              >
                {block.text}
              </h3>
            );

          case "paragraph":
            return (
              <p key={i} className="text-[15px] leading-7 text-muted-foreground">
                {renderInline(block.text)}
              </p>
            );

          case "list": {
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag
                key={i}
                className={`space-y-1.5 pl-5 text-[15px] leading-7 text-muted-foreground ${
                  block.ordered ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInline(item)}</li>
                ))}
              </Tag>
            );
          }

          case "callout": {
            const s = calloutStyle[block.variant];
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`flex gap-3 rounded-xl border p-4 ${s.className}`}
              >
                <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-foreground/70" />
                <div className="text-[15px] leading-7 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {block.title ?? s.label}
                  </span>
                  <span className="text-foreground/40"> — </span>
                  {renderInline(block.text)}
                </div>
              </div>
            );
          }

          case "code":
            return <CodeBlock key={i} code={block.code} caption={block.caption} />;

          case "example":
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card/60 p-4"
              >
                <p className="mb-1.5 text-sm font-semibold text-foreground">
                  {block.title}
                </p>
                <p className="text-[15px] leading-7 text-muted-foreground">
                  {renderInline(block.text)}
                </p>
                {block.code && (
                  <CodeBlock code={block.code.code} />
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
