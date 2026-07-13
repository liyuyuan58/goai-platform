"use client";

import { ToolCard } from "@/components/tools/tool-card";
import { filterAiTools, type AiTool, type AiToolCategory } from "@/lib/ai-tools";
import type { Locale } from "@/lib/i18n";
import { useMemo, useState } from "react";

type ToolsDirectoryProps = {
  categories: AiToolCategory[];
  locale: Locale;
  tools: AiTool[];
};

export function ToolsDirectory({ categories, locale, tools }: ToolsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(
    () => filterAiTools(tools, query, activeCategory),
    [activeCategory, query, tools]
  );

  return (
    <section className="border-b border-border bg-surface/45 py-14 sm:py-16">
      <div className="container-page">
        <div className="rounded-[2rem] border border-border bg-surface p-4 shadow-sm sm:p-5">
          <label className="sr-only" htmlFor="tool-search">
            Search AI tools
          </label>
          <input
            className="focus-ring h-14 w-full rounded-2xl border border-border bg-background px-5 py-4 text-base text-primary outline-none transition placeholder:text-secondary/70 focus:border-brand"
            id="tool-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by tool, category, use case or pricing"
            type="search"
            value={query}
          />
          <div
            aria-label="AI tool categories"
            className="mt-4 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.slug;

              return (
                <button
                  aria-selected={isActive}
                  className={`focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "border-brand bg-brand text-white"
                      : "border-border bg-background text-secondary hover:border-brand/30 hover:text-primary"
                  }`}
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  role="tab"
                  type="button"
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-secondary">
            Showing <span className="font-semibold text-primary">{filteredTools.length}</span> AI
            tools
          </p>
          <p className="hidden text-sm text-secondary sm:block">Built for scalable tool discovery.</p>
        </div>

        {filteredTools.length > 0 ? (
          <div className="mt-5 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} locale={locale} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-border bg-surface p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-primary">No tools found</h2>
            <p className="mt-3 text-sm leading-6 text-secondary">
              Try another keyword or category. The directory is structured for deeper fuzzy search
              and filtering in future releases.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
