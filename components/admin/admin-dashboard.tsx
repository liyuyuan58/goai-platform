"use client";

import type { CmsCategory, CmsData, CmsTool } from "@/lib/cms-store";
import { useEffect, useMemo, useState } from "react";

type AdminDashboardProps = {
  initialData: CmsData;
};

const emptyTool: CmsTool = {
  slug: "",
  name: "",
  categorySlug: "ai-business",
  category: "AI Business",
  subCategory: "",
  logo: "/brand/logo-icon.svg",
  logoAlt: "Tool logo",
  website: "",
  pricing: "Free and paid plans",
  freeTrial: "Unknown",
  shortDescription: "",
  overview: "",
  features: [],
  pros: [],
  cons: [],
  bestFor: [],
  platform: [],
  languages: [],
  api: "Unknown",
  alternatives: [],
  rating: 4.0,
  featured: false,
  trending: false,
  editorsPick: false,
  popular: false,
  newest: false,
  isPublished: false,
  isHidden: false,
  seoTitle: "",
  seoDescription: "",
  lastUpdated: new Date().toISOString().slice(0, 10),
  review: ""
};

export function AdminDashboard({ initialData }: AdminDashboardProps) {
  const [data, setData] = useState(initialData);
  const [selectedSlug, setSelectedSlug] = useState(initialData.tools[0]?.slug ?? "");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Ready");

  const selectedTool = data.tools.find((tool) => tool.slug === selectedSlug) ?? data.tools[0] ?? emptyTool;
  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return data.tools.filter((tool) =>
      [tool.name, tool.slug, tool.category, tool.pricing, tool.api, ...tool.languages, ...tool.platform]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [data.tools, query]);

  useEffect(() => {
    setData((current) => ({
      ...current,
      homepage: {
        featuredTools: current.tools.filter((tool) => tool.featured).map((tool) => tool.slug),
        trendingTools: current.tools.filter((tool) => tool.trending).map((tool) => tool.slug),
        newestTools: current.tools.filter((tool) => tool.newest).map((tool) => tool.slug),
        editorsPickTools: current.tools.filter((tool) => tool.editorsPick).map((tool) => tool.slug),
        popularTools: current.tools.filter((tool) => tool.popular).map((tool) => tool.slug)
      }
    }));
  }, [data.tools]);

  function updateTool(patch: Partial<CmsTool>) {
    if (patch.slug) {
      setSelectedSlug(patch.slug);
    }

    setData((current) => ({
      ...current,
      tools: current.tools.map((tool) =>
        tool.slug === selectedTool.slug
          ? {
              ...tool,
              ...patch,
              category:
                patch.category ??
                current.categories.find((category) => category.slug === (patch.categorySlug ?? tool.categorySlug))
                  ?.label ??
                tool.category
            }
          : tool
      )
    }));
  }

  function createTool() {
    const slug = `new-tool-${Date.now()}`;
    const tool = {
      ...emptyTool,
      slug,
      name: "New Tool",
      seoTitle: "New Tool | GoAI AI Tools",
      seoDescription: "New AI tool profile."
    };

    setData((current) => ({ ...current, tools: [tool, ...current.tools] }));
    setSelectedSlug(slug);
  }

  function deleteTool() {
    if (!selectedTool.slug) {
      return;
    }

    setData((current) => ({
      ...current,
      tools: current.tools.filter((tool) => tool.slug !== selectedTool.slug)
    }));
    setSelectedSlug(data.tools.find((tool) => tool.slug !== selectedTool.slug)?.slug ?? "");
  }

  async function saveCms() {
    setStatus("Saving...");
    const response = await fetch("/api/admin/cms", {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "PUT"
    });

    if (!response.ok) {
      setStatus("Save failed");
      return;
    }

    const result = (await response.json()) as { data: CmsData };
    setData(result.data);
    setStatus("Published. Homepage, detail pages, SEO and sitemap now read CMS data.");
  }

  function updateCategory(slug: string, patch: Partial<CmsCategory>) {
    setData((current) => ({
      ...current,
      categories: current.categories.map((category) =>
        category.slug === slug ? { ...category, ...patch } : category
      )
    }));
  }

  function addCategory() {
    const slug = `category-${Date.now()}`;
    setData((current) => ({
      ...current,
      categories: [
        ...current.categories,
        { slug, label: "New Category", sortOrder: current.categories.length + 1 }
      ]
    }));
  }

  function deleteCategory(slug: string) {
    if (slug === "all") {
      return;
    }

    setData((current) => ({
      ...current,
      categories: current.categories.filter((category) => category.slug !== slug)
    }));
  }

  async function uploadLogo(file: File) {
    setStatus("Processing logo...");
    const imageData = await resizeLogo(file);
    const fileName = `${selectedTool.slug || "tool"}-${Date.now()}.png`;
    const response = await fetch("/api/admin/upload-logo", {
      body: JSON.stringify({ fileName, imageData }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    if (!response.ok) {
      setStatus("Logo upload failed");
      return;
    }

    const result = (await response.json()) as { logo: string };
    updateTool({ logo: result.logo, logoAlt: `${selectedTool.name} official logo` });
    setStatus("Logo uploaded and normalized to 64 x 64.");
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Admin CMS</p>
          <h1 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">GoAI Content Admin</h1>
          <p className="mt-2 text-sm text-secondary">Admin role only. Manage tools, categories and homepage flags.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-button-secondary" onClick={createTool} type="button">
            New Tool
          </button>
          <button className="admin-button-primary" onClick={saveCms} type="button">
            Publish
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-surface p-4 text-sm text-secondary shadow-sm">
        {status}
      </div>

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <aside className="rounded-3xl border border-border bg-surface p-4 shadow-sm">
          <label className="sr-only" htmlFor="admin-tool-search">
            Search tools
          </label>
          <input
            className="admin-input"
            id="admin-tool-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, category, pricing, language, API, platform"
            value={query}
          />
          <div className="mt-4 grid max-h-[720px] gap-2 overflow-y-auto pr-1">
            {filteredTools.map((tool) => (
              <button
                className={`rounded-2xl border p-3 text-left transition ${
                  tool.slug === selectedTool.slug
                    ? "border-brand bg-brand/5"
                    : "border-border bg-background hover:border-brand/30"
                }`}
                key={tool.slug}
                onClick={() => setSelectedSlug(tool.slug)}
                type="button"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-primary">{tool.name}</span>
                  <span className={`text-xs font-semibold ${tool.isPublished ? "text-growth" : "text-secondary"}`}>
                    {tool.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-secondary">{tool.category}</p>
              </button>
            ))}
          </div>
        </aside>

        <section className="grid gap-6">
          <ToolEditor
            categories={data.categories}
            onDelete={deleteTool}
            onUpdate={updateTool}
            onUploadLogo={uploadLogo}
            tool={selectedTool}
          />
          <CategoryEditor
            categories={data.categories}
            onAdd={addCategory}
            onDelete={deleteCategory}
            onUpdate={updateCategory}
          />
        </section>
      </div>
    </div>
  );
}

function ToolEditor({
  categories,
  onDelete,
  onUpdate,
  onUploadLogo,
  tool
}: {
  categories: CmsCategory[];
  onDelete: () => void;
  onUpdate: (patch: Partial<CmsTool>) => void;
  onUploadLogo: (file: File) => void;
  tool: CmsTool;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Tool Management</h2>
          <p className="mt-1 text-sm text-secondary">Create, edit, hide, publish and delete tools.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            className="admin-button-secondary"
            onClick={() => onUpdate({ isHidden: !tool.isHidden })}
            type="button"
          >
            {tool.isHidden ? "Show Tool" : "Hide Tool"}
          </button>
          <button
            className="admin-button-secondary"
            onClick={() => onUpdate({ isPublished: !tool.isPublished })}
            type="button"
          >
            {tool.isPublished ? "Unpublish" : "Publish Tool"}
          </button>
          <button className="admin-button-danger" onClick={onDelete} type="button">
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <TextField label="Tool Name" onChange={(value) => onUpdate({ name: value })} value={tool.name} />
        <TextField label="Slug" onChange={(value) => onUpdate({ slug: slugify(value) })} value={tool.slug} />
        <SelectField
          label="Category"
          onChange={(value) => {
            const category = categories.find((item) => item.slug === value);
            onUpdate({ categorySlug: value, category: category?.label ?? tool.category });
          }}
          options={categories.filter((category) => category.slug !== "all").map((category) => ({
            label: category.label,
            value: category.slug
          }))}
          value={tool.categorySlug}
        />
        <TextField label="Sub Category" onChange={(value) => onUpdate({ subCategory: value })} value={tool.subCategory} />
        <TextField label="Website" onChange={(value) => onUpdate({ website: value })} value={tool.website} />
        <TextField label="Pricing" onChange={(value) => onUpdate({ pricing: value })} value={tool.pricing} />
        <TextField label="Free Trial" onChange={(value) => onUpdate({ freeTrial: value })} value={tool.freeTrial} />
        <TextField
          label="Rating"
          onChange={(value) => onUpdate({ rating: Number(value) || 0 })}
          type="number"
          value={String(tool.rating)}
        />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr]">
        <div>
          <label className="admin-label">Logo</label>
          <div className="mt-2 rounded-2xl border border-border bg-background p-4">
            <img alt={tool.logoAlt} className="h-16 w-16 rounded-2xl border border-border bg-white p-3" src={tool.logo} />
            <input
              accept="image/*"
              className="mt-4 block w-full text-sm text-secondary"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  onUploadLogo(file);
                }
              }}
              type="file"
            />
            <p className="mt-2 text-xs leading-5 text-secondary">Uploads are centered, cropped and scaled to 64 x 64 PNG.</p>
          </div>
        </div>
        <div className="grid gap-5">
          <TextArea label="Description" onChange={(value) => onUpdate({ shortDescription: value })} value={tool.shortDescription} />
          <TextArea label="Overview" onChange={(value) => onUpdate({ overview: value })} value={tool.overview} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ListField label="Features" onChange={(items) => onUpdate({ features: items })} value={tool.features} />
        <ListField label="Pros" onChange={(items) => onUpdate({ pros: items })} value={tool.pros} />
        <ListField label="Cons" onChange={(items) => onUpdate({ cons: items })} value={tool.cons} />
        <ListField label="Best For" onChange={(items) => onUpdate({ bestFor: items })} value={tool.bestFor} />
        <ListField label="Platform" onChange={(items) => onUpdate({ platform: items })} value={tool.platform} />
        <ListField label="Languages" onChange={(items) => onUpdate({ languages: items })} value={tool.languages} />
        <ListField label="Alternatives" onChange={(items) => onUpdate({ alternatives: items.map(slugify) })} value={tool.alternatives} />
        <TextArea label="API" onChange={(value) => onUpdate({ api: value })} value={tool.api} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <TextField label="SEO Title" onChange={(value) => onUpdate({ seoTitle: value })} value={tool.seoTitle} />
        <TextField label="Last Updated" onChange={(value) => onUpdate({ lastUpdated: value })} type="date" value={tool.lastUpdated} />
        <TextArea label="SEO Description" onChange={(value) => onUpdate({ seoDescription: value })} value={tool.seoDescription} />
        <TextArea label="GoAI Review" onChange={(value) => onUpdate({ review: value })} value={tool.review} />
      </div>

      <div className="mt-5 grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-2 lg:grid-cols-5">
        <CheckboxField label="Featured" onChange={(value) => onUpdate({ featured: value })} value={tool.featured} />
        <CheckboxField label="Trending" onChange={(value) => onUpdate({ trending: value })} value={tool.trending} />
        <CheckboxField label="Newest" onChange={(value) => onUpdate({ newest: value })} value={tool.newest} />
        <CheckboxField label="Editor's Pick" onChange={(value) => onUpdate({ editorsPick: value })} value={tool.editorsPick} />
        <CheckboxField label="Popular" onChange={(value) => onUpdate({ popular: value })} value={tool.popular} />
      </div>
    </div>
  );
}

function CategoryEditor({
  categories,
  onAdd,
  onDelete,
  onUpdate
}: {
  categories: CmsCategory[];
  onAdd: () => void;
  onDelete: (slug: string) => void;
  onUpdate: (slug: string, patch: Partial<CmsCategory>) => void;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Category Management</h2>
          <p className="mt-1 text-sm text-secondary">Add, edit, delete and sort categories.</p>
        </div>
        <button className="admin-button-secondary" onClick={onAdd} type="button">
          Add Category
        </button>
      </div>
      <div className="grid gap-3">
        {categories.map((category) => (
          <div className="grid gap-3 rounded-2xl border border-border bg-background p-3 lg:grid-cols-[1fr_1fr_120px_90px]" key={category.slug}>
            <TextField label="Slug" onChange={(value) => onUpdate(category.slug, { slug: slugify(value) })} value={category.slug} />
            <TextField label="Label" onChange={(value) => onUpdate(category.slug, { label: value })} value={category.label} />
            <TextField
              label="Sort"
              onChange={(value) => onUpdate(category.slug, { sortOrder: Number(value) || 0 })}
              type="number"
              value={String(category.sortOrder)}
            />
            <button className="admin-button-danger self-end" onClick={() => onDelete(category.slug)} type="button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextField({
  label,
  onChange,
  type = "text",
  value
}: {
  label: string;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label>
      <span className="admin-label">{label}</span>
      <input className="admin-input mt-2" onChange={(event) => onChange(event.target.value)} type={type} value={value} />
    </label>
  );
}

function SelectField({
  label,
  onChange,
  options,
  value
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  value: string;
}) {
  return (
    <label>
      <span className="admin-label">{label}</span>
      <select className="admin-input mt-2" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label>
      <span className="admin-label">{label}</span>
      <textarea className="admin-input mt-2 min-h-28 py-3" onChange={(event) => onChange(event.target.value)} value={value} />
    </label>
  );
}

function ListField({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (value: string[]) => void;
  value: string[];
}) {
  return (
    <TextArea label={`${label} (one per line)`} onChange={(text) => onChange(toList(text))} value={value.join("\n")} />
  );
}

function CheckboxField({
  label,
  onChange,
  value
}: {
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-primary">
      <input checked={value} className="h-4 w-4 accent-brand" onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      {label}
    </label>
  );
}

function toList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function resizeLogo(file: File) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Canvas is unavailable."));
        return;
      }

      context.clearRect(0, 0, 64, 64);
      const sourceSize = Math.min(image.width, image.height);
      const sourceX = (image.width - sourceSize) / 2;
      const sourceY = (image.height - sourceSize) / 2;
      context.drawImage(image, sourceX, sourceY, sourceSize, sourceSize, 0, 0, 64, 64);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error("Could not read image."));
    image.src = URL.createObjectURL(file);
  });
}
