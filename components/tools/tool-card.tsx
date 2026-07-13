import { ToolLogo } from "@/components/tools/tool-logo";
import type { AiTool } from "@/lib/ai-tools";
import type { Locale } from "@/lib/i18n";
import Link from "next/link";

type ToolCardProps = {
  locale: Locale;
  tool: AiTool;
};

export function ToolCard({ locale, tool }: ToolCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <ToolLogo tool={tool} />
        <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-secondary">
          {tool.category}
        </span>
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold text-primary">{tool.name}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-secondary">{tool.shortDescription}</p>
        <div className="mt-5 grid gap-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-secondary">Pricing</span>
            <span className="text-right font-semibold text-primary">{tool.pricing}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-secondary">GoAI Rating</span>
            <span className="font-semibold text-brand">{tool.rating.toFixed(1)}/5</span>
          </div>
        </div>
        <Link
          className="focus-ring mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-primary transition hover:border-brand/30 hover:text-brand"
          href={`/${locale}/tools/${tool.slug}`}
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
