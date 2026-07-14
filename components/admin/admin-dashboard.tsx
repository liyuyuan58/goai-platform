"use client";

import type {
  AnalyticsData,
  CmsCategory,
  CmsContent,
  CmsData,
  CmsFaq,
  CmsTool,
  PublishStatus
} from "@/lib/cms-store";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type AdminDashboardProps = {
  initialAnalytics: AnalyticsData;
  initialData: CmsData;
};

type Section = "analytics" | "blog" | "categories" | "dashboard" | "playbooks" | "resources" | "seo" | "settings" | "tools";
type ContentKey = "blogs" | "resources" | "playbooks";

const menu: Array<{ key: Section; label: string }> = [
  { key: "dashboard", label: "Dashboard" },
  { key: "tools", label: "AI Tools" },
  { key: "categories", label: "Categories" },
  { key: "blog", label: "Blog CMS" },
  { key: "playbooks", label: "Playbook CMS" },
  { key: "resources", label: "Resource CMS" },
  { key: "seo", label: "SEO" },
  { key: "analytics", label: "Analytics" },
  { key: "settings", label: "Settings" }
];

const today = new Date().toISOString().slice(0, 10);

const emptyTool: CmsTool = {
  alternatives: [],
  api: "Unknown",
  bestFor: [],
  canonical: "",
  category: "AI Business",
  categorySlug: "ai-business",
  company: "",
  cons: [],
  country: "",
  editorsPick: false,
  faq: [],
  featured: false,
  features: [],
  founded: "",
  founder: "",
  freeTrial: "Unknown",
  gallery: [],
  integrations: [],
  keywords: [],
  languages: [],
  lastUpdated: today,
  logo: "/brand/logo-icon.svg",
  logoAlt: "Tool logo",
  name: "",
  newest: false,
  openGraph: "",
  overview: "",
  platform: [],
  popular: false,
  pricing: "Free and paid plans",
  pros: [],
  rating: 4,
  review: "",
  schema: "",
  screenshots: [],
  seoDescription: "",
  seoTitle: "",
  shortDescription: "",
  slug: "",
  status: "draft",
  subCategory: "",
  tags: [],
  trending: false,
  twitterCard: "summary_large_image",
  useCases: [],
  website: ""
};

export function AdminDashboard({ initialAnalytics, initialData }: AdminDashboardProps) {
  const [active, setActive] = useState<Section>("dashboard");
  const [analytics] = useState(initialAnalytics);
  const [data, setData] = useState(initialData);
  const [selectedToolSlug, setSelectedToolSlug] = useState(initialData.tools[0]?.slug ?? "");
  const [selectedContent, setSelectedContent] = useState<Record<ContentKey, string>>({
    blogs: initialData.blogs[0]?.id ?? "",
    playbooks: initialData.playbooks[0]?.id ?? "",
    resources: initialData.resources[0]?.id ?? ""
  });
  const [status, setStatus] = useState("Ready");

  const selectedTool = data.tools.find((tool) => tool.slug === selectedToolSlug) ?? data.tools[0] ?? emptyTool;
  const totals = useMemo(
    () => ({
      blogs: data.blogs.length,
      draftTools: data.tools.filter((tool) => tool.status === "draft").length,
      hiddenTools: data.tools.filter((tool) => tool.status === "hidden").length,
      playbooks: data.playbooks.length,
      resources: data.resources.length,
      tools: data.tools.length
    }),
    [data]
  );

  async function publishAll() {
    setStatus("Publishing...");
    const normalizedData = {
      ...data,
      homepage: {
        featuredTools: data.tools.filter((tool) => tool.featured).map((tool) => tool.slug),
        trendingTools: data.tools.filter((tool) => tool.trending).map((tool) => tool.slug),
        newestTools: data.tools.filter((tool) => tool.newest).map((tool) => tool.slug),
        editorsPickTools: data.tools.filter((tool) => tool.editorsPick).map((tool) => tool.slug),
        popularTools: data.tools.filter((tool) => tool.popular).map((tool) => tool.slug)
      }
    };
    const response = await fetch("/api/admin/cms", {
      body: JSON.stringify(normalizedData),
      headers: { "Content-Type": "application/json" },
      method: "PUT"
    });

    if (!response.ok) {
      setStatus("Publish failed");
      return;
    }

    const result = (await response.json()) as { data: CmsData };
    setData(result.data);
    setStatus("Published. Public pages, SEO and sitemap now use the latest CMS data.");
  }

  function updateTool(patch: Partial<CmsTool>) {
    if (patch.slug) {
      setSelectedToolSlug(patch.slug);
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

  function addTool() {
    const slug = `new-tool-${Date.now()}`;
    const tool = {
      ...emptyTool,
      canonical: `/en/tools/${slug}`,
      name: "New Tool",
      seoDescription: "New AI tool profile.",
      seoTitle: "New Tool | GoAI AI Tools",
      slug
    };
    setData((current) => ({ ...current, tools: [tool, ...current.tools] }));
    setSelectedToolSlug(slug);
    setActive("tools");
  }

  function deleteTool() {
    setData((current) => ({ ...current, tools: current.tools.filter((tool) => tool.slug !== selectedTool.slug) }));
    setSelectedToolSlug(data.tools.find((tool) => tool.slug !== selectedTool.slug)?.slug ?? "");
  }

  async function uploadLogo(file: File) {
    setStatus("Processing logo...");
    const imageData = await resizeLogo(file);
    const response = await fetch("/api/admin/upload-logo", {
      body: JSON.stringify({ fileName: `${selectedTool.slug}-${Date.now()}.png`, imageData }),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    if (!response.ok) {
      setStatus("Logo upload failed");
      return;
    }

    const result = (await response.json()) as { logo: string };
    updateTool({ logo: result.logo, logoAlt: `${selectedTool.name} logo` });
    setStatus("Logo uploaded and normalized.");
  }

  function updateContent(key: ContentKey, id: string, patch: Partial<CmsContent>) {
    setData((current) => ({
      ...current,
      [key]: current[key].map((item) => (item.id === id ? { ...item, ...patch } : item))
    }));
  }

  function addContent(key: ContentKey) {
    const label = key === "blogs" ? "Blog Post" : key === "resources" ? "Resource" : "Playbook";
    const id = `${key}-${Date.now()}`;
    const item: CmsContent = {
      canonical: `/en/${key.replace("blogs", "blog")}/new-${Date.now()}`,
      categorySlug: key,
      content: "",
      cover: "",
      id,
      lastUpdated: today,
      resourceType: key === "resources" ? "Guide" : undefined,
      schema: "",
      scheduledAt: "",
      seoDescription: `New ${label}.`,
      seoTitle: `New ${label} | GoAI`,
      slug: `new-${Date.now()}`,
      status: "draft",
      summary: "",
      tags: [],
      title: `New ${label}`
    };
    setData((current) => ({ ...current, [key]: [item, ...current[key]] }));
    setSelectedContent((current) => ({ ...current, [key]: id }));
  }

  function deleteContent(key: ContentKey, id: string) {
    setData((current) => ({ ...current, [key]: current[key].filter((item) => item.id !== id) }));
    setSelectedContent((current) => ({
      ...current,
      [key]: data[key].find((item) => item.id !== id)?.id ?? ""
    }));
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
        {
          color: "#3157D5",
          description: "New category.",
          icon: "Folder",
          label: "New Category",
          seoDescription: "New category from GoAI.",
          seoTitle: "New Category | GoAI",
          slug,
          sortOrder: current.categories.length + 1
        }
      ]
    }));
  }

  return (
    <div className="container-page py-6 sm:py-8">
      <div className="mb-5 flex flex-col gap-3 rounded-3xl border border-border bg-surface p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">GoAI Admin CMS</p>
          <h1 className="mt-2 text-3xl font-semibold text-primary">Operations Dashboard</h1>
          <p className="mt-2 text-sm text-secondary">Manage tools, categories, blog, playbooks, resources, SEO, analytics and settings.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="admin-button-secondary" onClick={addTool} type="button">
            New Tool
          </button>
          <button className="admin-button-primary" onClick={publishAll} type="button">
            Publish Changes
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-border bg-surface p-4 text-sm text-secondary shadow-sm">{status}</div>

      <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-3xl border border-border bg-surface p-3 shadow-sm">
          <nav className="grid gap-1">
            {menu.map((item) => (
              <button
                className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active === item.key ? "bg-brand text-white" : "text-secondary hover:bg-background hover:text-primary"
                }`}
                key={item.key}
                onClick={() => setActive(item.key)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <section>
          {active === "dashboard" ? <DashboardOverview analytics={analytics} totals={totals} /> : null}
          {active === "analytics" ? <AnalyticsPanel analytics={analytics} /> : null}
          {active === "seo" ? (
            <SeoCenter data={data} onUpdate={(seoCenter) => setData((current) => ({ ...current, seoCenter }))} />
          ) : null}
          {active === "tools" ? (
            <ToolCms
              categories={data.categories}
              onAdd={addTool}
              onDelete={deleteTool}
              onSelect={setSelectedToolSlug}
              onUpdate={updateTool}
              onUploadLogo={uploadLogo}
              selectedSlug={selectedTool.slug}
              tool={selectedTool}
              tools={data.tools}
            />
          ) : null}
          {active === "blog" ? (
            <ContentCms
              categories={data.categories}
              items={data.blogs}
              label="Blog CMS"
              onAdd={() => addContent("blogs")}
              onDelete={(id) => deleteContent("blogs", id)}
              onSelect={(id) => setSelectedContent((current) => ({ ...current, blogs: id }))}
              onUpdate={(id, patch) => updateContent("blogs", id, patch)}
              selectedId={selectedContent.blogs}
            />
          ) : null}
          {active === "resources" ? (
            <ContentCms
              categories={data.categories}
              items={data.resources}
              label="Resource CMS"
              onAdd={() => addContent("resources")}
              onDelete={(id) => deleteContent("resources", id)}
              onSelect={(id) => setSelectedContent((current) => ({ ...current, resources: id }))}
              onUpdate={(id, patch) => updateContent("resources", id, patch)}
              selectedId={selectedContent.resources}
            />
          ) : null}
          {active === "playbooks" ? (
            <ContentCms
              categories={data.categories}
              items={data.playbooks}
              label="Playbook CMS"
              onAdd={() => addContent("playbooks")}
              onDelete={(id) => deleteContent("playbooks", id)}
              onSelect={(id) => setSelectedContent((current) => ({ ...current, playbooks: id }))}
              onUpdate={(id, patch) => updateContent("playbooks", id, patch)}
              selectedId={selectedContent.playbooks}
            />
          ) : null}
          {active === "categories" ? (
            <CategoryCms categories={data.categories} onAdd={addCategory} onUpdate={updateCategory} setData={setData} />
          ) : null}
          {active === "settings" ? <SettingsPanel /> : null}
        </section>
      </div>
    </div>
  );
}

function DashboardOverview({ analytics, totals }: { analytics: AnalyticsData; totals: Record<string, number> }) {
  const totalViews = Object.values(analytics.pageViews).reduce((sum, value) => sum + value, 0);
  const cards = [
    { label: "Tools", value: totals.tools },
    { label: "Draft Tools", value: totals.draftTools },
    { label: "Hidden Tools", value: totals.hiddenTools },
    { label: "Blog Posts", value: totals.blogs },
    { label: "Resources", value: totals.resources },
    { label: "Playbooks", value: totals.playbooks },
    { label: "Page Views", value: totalViews }
  ];

  return (
    <Panel title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div className="rounded-3xl border border-border bg-background p-5" key={card.label}>
            <p className="text-sm font-semibold text-secondary">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-primary">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-background p-5">
          <h3 className="text-lg font-semibold text-primary">Today&apos;s Updates</h3>
          <p className="mt-2 text-sm text-secondary">Content edits, scheduled posts and publish events are ready for the activity log.</p>
        </div>
        <div className="rounded-3xl border border-border bg-background p-5">
          <h3 className="text-lg font-semibold text-primary">Quick Actions</h3>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {["New Tool", "New Blog", "New Resource", "New Playbook"].map((action) => (
              <span className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-primary" key={action}>
                {action}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function AnalyticsPanel({ analytics }: { analytics: AnalyticsData }) {
  const rows = Object.entries(analytics.pageViews).sort((a, b) => b[1] - a[1]);

  return (
    <Panel title="Analytics">
      <p className="mb-4 text-sm text-secondary">Access data tracked by page path. Last updated: {analytics.updatedAt}</p>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {["Visitors", "Top Pages", "Top Keywords", "Countries", "Devices", "CTR / Impressions"].map((item) => (
          <div className="rounded-2xl border border-border bg-background p-4 text-sm font-semibold text-primary" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="grid gap-3">
        {rows.length === 0 ? <p className="text-sm text-secondary">No page views recorded yet.</p> : null}
        {rows.map(([pathname, views]) => (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4" key={pathname}>
            <span className="break-all text-sm font-semibold text-primary">{pathname}</span>
            <span className="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">{views}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SeoCenter({ data, onUpdate }: { data: CmsData; onUpdate: (value: CmsData["seoCenter"]) => void }) {
  const seo = data.seoCenter;

  return (
    <Panel title="SEO Center">
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {["Sitemap", "Robots", "Canonical", "Schema", "Google Index", "Bing Index", "Broken Links", "Meta Manager"].map((item) => (
          <div className="rounded-2xl border border-border bg-background p-4 text-sm font-semibold text-primary" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <TextField label="Default Title" onChange={(value) => onUpdate({ ...seo, seoTitle: value })} value={seo.seoTitle} />
        <TextField label="Default Canonical" onChange={(value) => onUpdate({ ...seo, canonical: value })} value={seo.canonical} />
        <TextArea label="Default Description" onChange={(value) => onUpdate({ ...seo, seoDescription: value })} value={seo.seoDescription} />
        <TextArea label="Default Schema" onChange={(value) => onUpdate({ ...seo, schema: value })} value={seo.schema} />
      </div>
    </Panel>
  );
}

function ToolCms({
  categories,
  onAdd,
  onDelete,
  onSelect,
  onUpdate,
  onUploadLogo,
  selectedSlug,
  tool,
  tools
}: {
  categories: CmsCategory[];
  onAdd: () => void;
  onDelete: () => void;
  onSelect: (slug: string) => void;
  onUpdate: (patch: Partial<CmsTool>) => void;
  onUploadLogo: (file: File) => void;
  selectedSlug: string;
  tool: CmsTool;
  tools: CmsTool[];
}) {
  return (
    <Panel
      action={
        <button className="admin-button-secondary" onClick={onAdd} type="button">
          Add Tool
        </button>
      }
      title="AI Tool CMS"
    >
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <ContentList
          items={tools.map((item) => ({ id: item.slug, status: item.status, title: item.name }))}
          onSelect={onSelect}
          selectedId={selectedSlug}
        />
        <div className="grid gap-5">
          <div className="flex flex-wrap gap-3">
            <button className="admin-button-secondary" onClick={() => onUpdate({ status: tool.status === "published" ? "draft" : "published" })} type="button">
              {tool.status === "published" ? "Move to Draft" : "Publish Tool"}
            </button>
            <button className="admin-button-secondary" onClick={() => onUpdate({ status: "hidden" })} type="button">
              Hide
            </button>
            <button className="admin-button-danger" onClick={onDelete} type="button">
              Delete Tool
            </button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <TextField label="Tool Name" onChange={(value) => onUpdate({ name: value })} value={tool.name} />
            <TextField label="Slug" onChange={(value) => onUpdate({ canonical: `/en/tools/${slugify(value)}`, slug: slugify(value) })} value={tool.slug} />
            <TextField label="Company" onChange={(value) => onUpdate({ company: value })} value={tool.company} />
            <TextField label="Founder" onChange={(value) => onUpdate({ founder: value })} value={tool.founder} />
            <TextField label="Founded" onChange={(value) => onUpdate({ founded: value })} value={tool.founded} />
            <TextField label="Country" onChange={(value) => onUpdate({ country: value })} value={tool.country} />
            <SelectField
              label="Category"
              onChange={(value) => {
                const category = categories.find((item) => item.slug === value);
                onUpdate({ category: category?.label ?? tool.category, categorySlug: value });
              }}
              options={categories.filter((category) => category.slug !== "all").map((category) => ({ label: category.label, value: category.slug }))}
              value={tool.categorySlug}
            />
            <TextField label="Sub Category" onChange={(value) => onUpdate({ subCategory: value })} value={tool.subCategory} />
            <TextField label="Website" onChange={(value) => onUpdate({ website: value })} value={tool.website} />
            <TextField label="Pricing" onChange={(value) => onUpdate({ pricing: value })} value={tool.pricing} />
            <TextField label="Free Trial" onChange={(value) => onUpdate({ freeTrial: value })} value={tool.freeTrial} />
            <TextField label="Rating" onChange={(value) => onUpdate({ rating: Number(value) || 0 })} type="number" value={String(tool.rating)} />
            <TextField label="Last Updated" onChange={(value) => onUpdate({ lastUpdated: value })} type="date" value={tool.lastUpdated} />
          </div>
          <div className="rounded-2xl border border-border bg-background p-4">
            <p className="admin-label">Logo</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <img alt={tool.logoAlt} className="h-16 w-16 rounded-2xl border border-border bg-white p-3" src={tool.logo} />
              <input accept="image/*" onChange={(event) => event.target.files?.[0] && onUploadLogo(event.target.files[0])} type="file" />
            </div>
          </div>
          <TextArea label="Description" onChange={(value) => onUpdate({ shortDescription: value })} value={tool.shortDescription} />
          <TextArea label="Overview" onChange={(value) => onUpdate({ overview: value })} value={tool.overview} />
          <div className="grid gap-5 lg:grid-cols-2">
            <ListField label="Features" onChange={(items) => onUpdate({ features: items })} value={tool.features} />
            <ListField label="Pros" onChange={(items) => onUpdate({ pros: items })} value={tool.pros} />
            <ListField label="Cons" onChange={(items) => onUpdate({ cons: items })} value={tool.cons} />
            <ListField label="Best For" onChange={(items) => onUpdate({ bestFor: items })} value={tool.bestFor} />
            <ListField label="Platform" onChange={(items) => onUpdate({ platform: items })} value={tool.platform} />
            <ListField label="Languages" onChange={(items) => onUpdate({ languages: items })} value={tool.languages} />
            <ListField label="Tags" onChange={(items) => onUpdate({ tags: items })} value={tool.tags} />
            <ListField label="Use Cases" onChange={(items) => onUpdate({ useCases: items })} value={tool.useCases} />
            <ListField label="Integrations" onChange={(items) => onUpdate({ integrations: items })} value={tool.integrations} />
            <ListField label="Keywords" onChange={(items) => onUpdate({ keywords: items })} value={tool.keywords} />
            <ListField label="Alternatives" onChange={(items) => onUpdate({ alternatives: items.map(slugify) })} value={tool.alternatives} />
            <ListField label="Gallery" onChange={(items) => onUpdate({ gallery: items })} value={tool.gallery} />
            <ListField label="Screenshots" onChange={(items) => onUpdate({ screenshots: items })} value={tool.screenshots} />
          </div>
          <FaqField onChange={(faq) => onUpdate({ faq })} value={tool.faq} />
          <TextArea label="API" onChange={(value) => onUpdate({ api: value })} value={tool.api} />
          <SeoFieldsEditor
            canonical={tool.canonical}
            openGraph={tool.openGraph}
            schema={tool.schema}
            seoDescription={tool.seoDescription}
            seoTitle={tool.seoTitle}
            twitterCard={tool.twitterCard}
            onChange={onUpdate}
          />
          <FlagGrid tool={tool} onUpdate={onUpdate} />
        </div>
      </div>
    </Panel>
  );
}

function ContentCms({
  categories,
  items,
  label,
  onAdd,
  onDelete,
  onSelect,
  onUpdate,
  selectedId
}: {
  categories: CmsCategory[];
  items: CmsContent[];
  label: string;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<CmsContent>) => void;
  selectedId: string;
}) {
  const item = items.find((entry) => entry.id === selectedId) ?? items[0];

  if (!item) {
    return (
      <Panel action={<button className="admin-button-secondary" onClick={onAdd} type="button">Add</button>} title={label}>
        <p className="text-sm text-secondary">No entries yet.</p>
      </Panel>
    );
  }

  return (
    <Panel action={<button className="admin-button-secondary" onClick={onAdd} type="button">Add Entry</button>} title={label}>
      <div className="grid gap-5 xl:grid-cols-[280px_1fr]">
        <ContentList items={items.map((entry) => ({ id: entry.id, status: entry.status, title: entry.title }))} onSelect={onSelect} selectedId={item.id} />
        <div className="grid gap-5">
          <div className="flex flex-wrap gap-3">
            <button className="admin-button-secondary" onClick={() => onUpdate(item.id, { status: item.status === "published" ? "draft" : "published" })} type="button">
              {item.status === "published" ? "Move to Draft" : "Publish"}
            </button>
            <button className="admin-button-secondary" onClick={() => onUpdate(item.id, { status: "hidden" })} type="button">Hide</button>
            <button className="admin-button-danger" onClick={() => onDelete(item.id)} type="button">Delete</button>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <TextField label="Title" onChange={(value) => onUpdate(item.id, { title: value })} value={item.title} />
            <TextField label="Slug" onChange={(value) => onUpdate(item.id, { slug: slugify(value) })} value={item.slug} />
            <SelectField label="Category" onChange={(value) => onUpdate(item.id, { categorySlug: value })} options={categories.map((category) => ({ label: category.label, value: category.slug }))} value={item.categorySlug} />
            <TextField label="Last Updated" onChange={(value) => onUpdate(item.id, { lastUpdated: value })} type="date" value={item.lastUpdated} />
            <TextField label="Schedule Publish" onChange={(value) => onUpdate(item.id, { scheduledAt: value })} type="datetime-local" value={item.scheduledAt} />
            <TextField label="Cover" onChange={(value) => onUpdate(item.id, { cover: value })} value={item.cover} />
          </div>
          <SelectField
            label="Resource Type"
            onChange={(value) => onUpdate(item.id, { resourceType: value as CmsContent["resourceType"] })}
            options={["Prompt", "Template", "Guide", "Checklist", "PDF", "Video"].map((value) => ({ label: value, value }))}
            value={item.resourceType ?? "Guide"}
          />
          <TextArea label="Summary" onChange={(value) => onUpdate(item.id, { summary: value })} value={item.summary} />
          <TextArea label="Content" onChange={(value) => onUpdate(item.id, { content: value })} value={item.content} />
          <ListField label="Tags" onChange={(tags) => onUpdate(item.id, { tags })} value={item.tags} />
          <SeoFieldsEditor canonical={item.canonical} openGraph="" schema={item.schema} seoDescription={item.seoDescription} seoTitle={item.seoTitle} twitterCard="" onChange={(patch) => onUpdate(item.id, patch)} />
        </div>
      </div>
    </Panel>
  );
}

function CategoryCms({
  categories,
  onAdd,
  onUpdate,
  setData
}: {
  categories: CmsCategory[];
  onAdd: () => void;
  onUpdate: (slug: string, patch: Partial<CmsCategory>) => void;
  setData: (updater: (current: CmsData) => CmsData) => void;
}) {
  return (
    <Panel action={<button className="admin-button-secondary" onClick={onAdd} type="button">Add Category</button>} title="Category CMS">
      <div className="grid gap-3">
        {categories.map((category) => (
          <div className="grid gap-3 rounded-2xl border border-border bg-background p-3 lg:grid-cols-2" key={category.slug}>
            <TextField label="Slug" onChange={(value) => onUpdate(category.slug, { slug: slugify(value) })} value={category.slug} />
            <TextField label="Label" onChange={(value) => onUpdate(category.slug, { label: value })} value={category.label} />
            <TextField label="Icon" onChange={(value) => onUpdate(category.slug, { icon: value })} value={category.icon} />
            <TextField label="Color" onChange={(value) => onUpdate(category.slug, { color: value })} value={category.color} />
            <TextField label="Sort" onChange={(value) => onUpdate(category.slug, { sortOrder: Number(value) || 0 })} type="number" value={String(category.sortOrder)} />
            <TextField label="SEO Title" onChange={(value) => onUpdate(category.slug, { seoTitle: value })} value={category.seoTitle} />
            <TextArea label="Description" onChange={(value) => onUpdate(category.slug, { description: value })} value={category.description} />
            <TextArea label="SEO Description" onChange={(value) => onUpdate(category.slug, { seoDescription: value })} value={category.seoDescription} />
            <button
              className="admin-button-danger self-end"
              onClick={() => setData((current) => ({ ...current, categories: current.categories.filter((item) => item.slug !== category.slug) }))}
              type="button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function SettingsPanel() {
  return (
    <Panel title="Settings">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-5">
          <h3 className="text-lg font-semibold text-primary">Roles</h3>
          <p className="mt-2 text-sm text-secondary">Sprint 002 keeps Admin as the active role. Editor and Reviewer are reserved.</p>
        </div>
        <div className="rounded-2xl border border-border bg-background p-5">
          <h3 className="text-lg font-semibold text-primary">Storage</h3>
          <p className="mt-2 text-sm text-secondary">Content is saved to local JSON for MVP operations. Supabase can replace this layer later.</p>
        </div>
      </div>
    </Panel>
  );
}

function Panel({ action, children, title }: { action?: ReactNode; children: ReactNode; title: string }) {
  return (
    <div className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-primary">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function ContentList({
  items,
  onSelect,
  selectedId
}: {
  items: Array<{ id: string; status: PublishStatus; title: string }>;
  onSelect: (id: string) => void;
  selectedId: string;
}) {
  return (
    <div className="grid max-h-[720px] gap-2 overflow-y-auto rounded-2xl border border-border bg-background p-3">
      {items.map((item) => (
        <button
          className={`rounded-2xl border p-3 text-left transition ${selectedId === item.id ? "border-brand bg-brand/5" : "border-border bg-surface hover:border-brand/30"}`}
          key={item.id}
          onClick={() => onSelect(item.id)}
          type="button"
        >
          <span className="block text-sm font-semibold text-primary">{item.title}</span>
          <span className={`mt-1 block text-xs font-semibold ${item.status === "published" ? "text-growth" : "text-secondary"}`}>{item.status}</span>
        </button>
      ))}
    </div>
  );
}

function SeoFieldsEditor({
  canonical,
  onChange,
  openGraph,
  schema,
  seoDescription,
  seoTitle,
  twitterCard
}: {
  canonical: string;
  onChange: (patch: { canonical?: string; openGraph?: string; schema?: string; seoDescription?: string; seoTitle?: string; twitterCard?: string }) => void;
  openGraph: string;
  schema: string;
  seoDescription: string;
  seoTitle: string;
  twitterCard: string;
}) {
  return (
    <div className="grid gap-5 rounded-2xl border border-border bg-background p-4 lg:grid-cols-2">
      <TextField label="SEO Title" onChange={(value) => onChange({ seoTitle: value })} value={seoTitle} />
      <TextField label="Canonical" onChange={(value) => onChange({ canonical: value })} value={canonical} />
      <TextArea label="SEO Description" onChange={(value) => onChange({ seoDescription: value })} value={seoDescription} />
      <TextArea label="Schema" onChange={(value) => onChange({ schema: value })} value={schema} />
      <TextArea label="Open Graph" onChange={(value) => onChange({ openGraph: value })} value={openGraph} />
      <TextField label="Twitter Card" onChange={(value) => onChange({ twitterCard: value })} value={twitterCard} />
    </div>
  );
}

function FlagGrid({ onUpdate, tool }: { onUpdate: (patch: Partial<CmsTool>) => void; tool: CmsTool }) {
  return (
    <div className="grid gap-3 rounded-2xl border border-border bg-background p-4 sm:grid-cols-2 lg:grid-cols-5">
      {([
        ["featured", "Featured"],
        ["trending", "Trending"],
        ["newest", "Newest"],
        ["editorsPick", "Editor's Pick"],
        ["popular", "Popular"]
      ] as const).map(([key, label]) => (
        <CheckboxField key={key} label={label} onChange={(value) => onUpdate({ [key]: value })} value={tool[key]} />
      ))}
    </div>
  );
}

function FaqField({ onChange, value }: { onChange: (faq: CmsFaq[]) => void; value: CmsFaq[] }) {
  return (
    <TextArea
      label="FAQ (Question | Answer, one per line)"
      onChange={(text) =>
        onChange(
          text
            .split("\n")
            .map((line) => {
              const [question, ...answer] = line.split("|");
              return { answer: answer.join("|").trim(), question: question.trim() };
            })
            .filter((item) => item.question && item.answer)
        )
      }
      value={value.map((item) => `${item.question} | ${item.answer}`).join("\n")}
    />
  );
}

function TextField({ label, onChange, type = "text", value }: { label: string; onChange: (value: string) => void; type?: string; value: string }) {
  return (
    <label>
      <span className="admin-label">{label}</span>
      <input className="admin-input mt-2" onChange={(event) => onChange(event.target.value)} type={type} value={value} />
    </label>
  );
}

function SelectField({ label, onChange, options, value }: { label: string; onChange: (value: string) => void; options: Array<{ label: string; value: string }>; value: string }) {
  return (
    <label>
      <span className="admin-label">{label}</span>
      <select className="admin-input mt-2" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
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

function ListField({ label, onChange, value }: { label: string; onChange: (value: string[]) => void; value: string[] }) {
  return <TextArea label={`${label} (one per line)`} onChange={(text) => onChange(toList(text))} value={value.join("\n")} />;
}

function CheckboxField({ label, onChange, value }: { label: string; onChange: (value: boolean) => void; value: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-primary">
      <input checked={value} className="h-4 w-4 accent-brand" onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      {label}
    </label>
  );
}

function toList(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
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
        reject(new Error("Canvas unavailable."));
        return;
      }

      const sourceSize = Math.min(image.width, image.height);
      context.clearRect(0, 0, 64, 64);
      context.drawImage(image, (image.width - sourceSize) / 2, (image.height - sourceSize) / 2, sourceSize, sourceSize, 0, 0, 64, 64);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error("Could not read image."));
    image.src = URL.createObjectURL(file);
  });
}
