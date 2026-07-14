import { ToolLogo } from "@/components/tools/tool-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import type { AiTool } from "@/lib/ai-tools";
import type { Locale } from "@/lib/i18n";
import type { ReactNode } from "react";

type HomepageV2SectionsProps = {
  featuredTools: AiTool[];
  locale: Locale;
};

const businessGoals = [
  {
    title: "Find customers",
    description: "Identify promising buyer segments and channels in new markets."
  },
  {
    title: "Enter new markets",
    description: "Compare regions, local requirements and go-to-market paths."
  },
  {
    title: "Automate growth",
    description: "Use AI workflows to scale outreach, research and operations."
  },
  {
    title: "Localize faster",
    description: "Adapt positioning, content and campaigns for international audiences."
  },
  {
    title: "Build trust",
    description: "Create stronger proof, partner signals and market-specific credibility."
  },
  {
    title: "Operate globally",
    description: "Organize the tools and methods needed to run across borders."
  }
];

const featuredSolutions = [
  {
    label: "Market",
    title: "AI Market Entry",
    description: "Plan your first international expansion with AI-assisted research and execution."
  },
  {
    label: "Sales",
    title: "Global Lead Generation",
    description: "Find, qualify and prioritize customers across regions and channels."
  },
  {
    label: "Content",
    title: "Localization Engine",
    description: "Turn existing assets into market-ready content for new audiences."
  },
  {
    label: "Ops",
    title: "Export Growth Stack",
    description: "A practical toolkit for sales, marketing and operations teams going global."
  }
];

const regions = [
  {
    code: "NA",
    name: "North America",
    markets: "US, Canada",
    description: "Demand signals, channels and entry paths for mature B2B markets."
  },
  {
    code: "EU",
    name: "Europe",
    markets: "UK, Germany, France",
    description: "Regional growth planning across compliance-conscious markets."
  },
  {
    code: "ME",
    name: "Middle East",
    markets: "UAE, Saudi Arabia",
    description: "Expansion resources for fast-moving trade and services hubs."
  },
  {
    code: "AP",
    name: "Asia Pacific",
    markets: "Singapore, Japan, Australia",
    description: "Market discovery for high-growth digital and export opportunities."
  }
];

const playbooks = [
  {
    title: "Validate a new market",
    step: "01",
    description: "A lightweight process for testing demand before heavy investment."
  },
  {
    title: "Build an AI sales workflow",
    step: "02",
    description: "Combine research, targeting and outreach into a repeatable system."
  },
  {
    title: "Localize your homepage",
    step: "03",
    description: "Adapt messaging and proof for buyers in another region."
  },
  {
    title: "Choose your growth stack",
    step: "04",
    description: "Select practical AI tools around a specific business objective."
  }
];

export function HomepageV2Sections({ featuredTools, locale }: HomepageV2SectionsProps) {
  const prefix = `/${locale}`;

  return (
    <>
      <WhyGoAI />
      <HowItWorks />
      <BusinessGoals />
      <FeaturedSolutions prefix={prefix} />
      <FeaturedTools featuredTools={featuredTools} prefix={prefix} />
      <RegionsPreview prefix={prefix} />
      <PlaybooksPreview prefix={prefix} />
      <NewsletterCta />
    </>
  );
}

function WhyGoAI() {
  const values = [
    {
      title: "Business-first guidance",
      description: "Start from growth goals instead of chasing random AI tools."
    },
    {
      title: "Practical AI execution",
      description: "Turn market research, content and outreach into repeatable workflows."
    },
    {
      title: "Global market resources",
      description: "Connect tools and playbooks with regional context for expansion."
    }
  ];

  return (
    <section className="border-b border-border py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          description="GoAI connects strategy, tools and international market context so teams can move from idea to execution."
          eyebrow="Why GoAI"
          title="Built for businesses going global with AI"
        />
        <div className="grid auto-rows-fr gap-4 lg:grid-cols-3">
          {values.map((value, index) => (
            <FeatureCard key={value.title}>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-sm font-bold text-brand">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{value.description}</p>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    "Choose a Business Goal",
    "Find a Solution",
    "Follow a Playbook",
    "Use the Right AI Tools"
  ];

  return (
    <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              How It Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-[2.6rem]">
              A simple path from goal to execution
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary sm:text-lg">
              Use GoAI as a practical map for international business building, not another
              overwhelming directory.
            </p>
          </div>
          <div className="grid gap-3">
            {steps.map((step, index) => (
              <div
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm"
                key={step}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-base font-semibold text-primary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-[2.6rem]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-secondary sm:text-lg">{description}</p>
    </div>
  );
}

function BusinessGoals() {
  return (
    <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          description="Start with the outcome your business wants, then find the tools, methods and resources that support it."
          eyebrow="Business Goals"
          title="Organized around global growth outcomes"
        />
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessGoals.map((goal, index) => (
            <FeatureCard key={goal.title}>
              <div className="flex h-full flex-col">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/10 bg-brand/10 text-brand">
                    <GoalIcon index={index} />
                  </div>
                  <span className="text-xs font-semibold text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-primary">{goal.title}</h3>
                <p className="mt-3 text-sm leading-6 text-secondary">{goal.description}</p>
              </div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSolutions({ prefix }: { prefix: string }) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Featured Solutions</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-[2.6rem]">
              Practical paths for international growth
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary">
              Explore solution tracks that connect AI tools with proven global business
              workflows.
            </p>
          </div>
          <ButtonLink href={`${prefix}/solutions`} variant="secondary">
            View solutions
          </ButtonLink>
        </div>
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredSolutions.map((solution) => (
            <FeatureCard className="min-h-64" key={solution.title}>
              <div>
                <div className="mb-6 inline-flex rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-secondary">
                  {solution.label}
                </div>
                <h3 className="text-xl font-semibold text-primary">{solution.title}</h3>
                <p className="mt-3 text-sm leading-6 text-secondary">{solution.description}</p>
              </div>
              <span className="mt-7 inline-flex text-sm font-semibold text-brand">Explore track</span>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedTools({ featuredTools, prefix }: { featuredTools: AiTool[]; prefix: string }) {
  return (
    <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          description="A curated starting point for teams that want useful AI tools without a noisy directory experience."
          eyebrow="Featured AI Tools"
          title="Tools for research, customers and execution"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <FeatureCard className="p-5" key={tool.name}>
              <div className="mb-5 flex items-start justify-between gap-3">
                <ToolLogo size="sm" tool={tool} />
                <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-secondary">
                  {tool.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-primary">{tool.name}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{tool.shortDescription}</p>
              <span className="mt-5 text-sm font-semibold text-brand">
                {tool.rating.toFixed(1)}/5
              </span>
            </FeatureCard>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonLink href={`${prefix}/tools`}>Discover AI Tools</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function RegionsPreview({ prefix }: { prefix: string }) {
  return (
    <section className="border-b border-border py-16 sm:py-20">
      <div className="container-page">
        <SectionHeader
          description="Use regional previews to understand where opportunities, channels and requirements differ."
          eyebrow="Regions"
          title="Explore global markets with more context"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((region) => (
            <FeatureCard className="p-5" key={region.name}>
              <div className="mb-6 rounded-2xl border border-border bg-background p-4">
                <RegionMap code={region.code} />
              </div>
              <h3 className="text-xl font-semibold text-primary">{region.name}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-secondary">
                {region.markets}
              </p>
              <p className="mt-3 text-sm leading-6 text-secondary">{region.description}</p>
              <a
                className="focus-ring mt-5 inline-flex rounded-md text-sm font-semibold text-brand"
                href={`${prefix}/regions`}
              >
                View region
              </a>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaybooksPreview({ prefix }: { prefix: string }) {
  return (
    <section className="border-b border-border bg-surface/45 py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Playbooks</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-4xl lg:text-[2.6rem]">
              Repeatable methods for global execution
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary">
              Step-by-step guides for teams that want to move from research to action.
            </p>
          </div>
          <ButtonLink href={`${prefix}/playbooks`} variant="secondary">
            Browse playbooks
          </ButtonLink>
        </div>
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {playbooks.map((playbook) => (
            <FeatureCard key={playbook.title}>
              <p className="text-sm font-bold text-brand">{playbook.step}</p>
              <h3 className="mt-4 text-xl font-semibold text-primary">{playbook.title}</h3>
              <p className="mt-3 text-sm leading-6 text-secondary">{playbook.description}</p>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsletterCta() {
  return (
    <section className="py-16 sm:py-20" id="newsletter">
      <div className="container-page">
        <div className="rounded-[2rem] border border-border bg-primary p-7 text-white shadow-soft sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              GoAI Brief
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.55rem]">
              Get practical AI and global growth ideas in your inbox.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/70">
              Practical updates on AI tools, global markets, playbooks and growth
              resources for teams building international business.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`group flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-soft ${className}`}
    >
      {children}
    </article>
  );
}

function GoalIcon({ index }: { index: number }) {
  const icons = [
    <path d="M6 12h12M12 6v12" key="customers" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />,
    <path d="M5 16c4-7 10-7 14 0M8 10h8" key="markets" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />,
    <path d="M7 17l10-10M8 8h5v5" key="growth" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />,
    <path d="M6 7h12M6 12h8M6 17h10" key="localize" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />,
    <path d="M12 5l6 3v4c0 4-2.5 6.5-6 8-3.5-1.5-6-4-6-8V8l6-3Z" key="trust" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />,
    <path d="M5 12h14M12 5c3 3.5 3 10.5 0 14M12 5c-3 3.5-3 10.5 0 14" key="operate" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  ];

  return (
    <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
      {icons[index]}
    </svg>
  );
}

function RegionMap({ code }: { code: string }) {
  return (
    <div className="relative h-24 overflow-hidden rounded-xl bg-surface">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 220 96">
        <path
          d="M24 51c22-25 51-31 86-20 32 10 56 6 86-11"
          stroke="#D0D5DD"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M27 67c32-7 56-4 72 8 21 15 53 10 94-16"
          stroke="#E4E7EC"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M57 27c13 5 25 8 38 7 12 0 24-3 37-8"
          stroke="#3157D5"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <path
          d="M105 68c25-18 51-20 79-7"
          stroke="#12B76A"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle cx="57" cy="27" fill="#FFFFFF" r="5" stroke="#3157D5" strokeWidth="2" />
        <circle cx="132" cy="26" fill="#FFFFFF" r="5" stroke="#3157D5" strokeWidth="2" />
        <circle cx="184" cy="61" fill="#FFFFFF" r="5" stroke="#12B76A" strokeWidth="2" />
      </svg>
      <div className="absolute left-3 top-3 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-bold text-brand">
        {code}
      </div>
    </div>
  );
}
