import { ButtonLink } from "@/components/ui/button-link";
import type { Locale } from "@/lib/i18n";

type HeroSectionProps = {
  locale: Locale;
};

export function HeroSection({ locale }: HeroSectionProps) {
  const prefix = `/${locale}`;

  return (
    <section className="overflow-hidden border-b border-border">
      <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[1fr_0.92fr] lg:py-18 xl:py-20">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand shadow-sm sm:text-sm sm:normal-case sm:tracking-normal">
            AI for Global Business
          </p>
          <h1 className="max-w-4xl text-[2.85rem] font-semibold leading-[1.04] tracking-normal text-primary sm:text-6xl lg:text-7xl">
            Build Your Global Business with AI
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-secondary sm:mt-6 sm:text-xl sm:leading-8">
            Discover AI tools, proven playbooks and global market insights to help your
            business find customers, enter new markets and grow internationally.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink className="min-h-12 px-6 shadow-soft" href={`${prefix}/solutions`}>
              Explore Solutions
            </ButtonLink>
            <ButtonLink className="min-h-12 px-6" href={`${prefix}/tools`} variant="secondary">
              Discover AI Tools
            </ButtonLink>
          </div>
          <p className="mt-7 max-w-xl border-l-2 border-brand/20 pl-4 text-sm leading-6 text-secondary">
            Tools, methods and global business resources - organized around what your
            business wants to achieve.
          </p>
        </div>

        <GlobalDashboard />
      </div>
    </section>
  );
}

function GlobalDashboard() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mr-0">
      <div className="relative aspect-[1.03] overflow-hidden rounded-[1.75rem] border border-border bg-surface p-4 shadow-soft sm:aspect-[1.06] sm:rounded-[2rem] sm:p-7">
        <div className="absolute inset-x-8 top-8 h-24 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative h-full rounded-[1.35rem] border border-border bg-[linear-gradient(180deg,#FFFFFF_0%,#F7F9FC_100%)] p-4 sm:rounded-[1.5rem] sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                Global Signals
              </p>
              <p className="mt-1 text-lg font-semibold text-primary">Opportunity Map</p>
            </div>
            <div className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-growth">
              Live
            </div>
          </div>

          <div className="relative mt-7 flex aspect-[1.45] items-center justify-center overflow-hidden rounded-3xl border border-border bg-[#F2F5FA] sm:mt-9">
            <WorldMap />
            <InfoCard className="left-3 top-4 sm:left-4 sm:top-5" label="Find Customers" value="+28%" />
            <InfoCard
              className="right-3 top-[42%] sm:right-4"
              label="Enter New Markets"
              value="12"
            />
            <InfoCard
              className="bottom-4 left-1/2 -translate-x-1/2 sm:bottom-5"
              label="Automate Growth"
              value="AI"
            />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
            {["Demand", "Channels", "Partners"].map((label, index) => (
              <div className="rounded-2xl border border-border bg-surface p-2.5 sm:p-3" key={label}>
                <div className="h-1.5 rounded-full bg-border">
                  <div
                    className="h-1.5 rounded-full bg-brand"
                    style={{ width: `${68 - index * 12}%` }}
                  />
                </div>
                <p className="mt-2 text-[11px] font-medium text-secondary sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  className,
  label,
  value
}: {
  className: string;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`absolute min-w-24 rounded-2xl border border-border bg-white/95 p-2.5 shadow-sm backdrop-blur sm:min-w-32 sm:p-3 ${className}`}
    >
      <p className="text-[10px] font-semibold text-secondary sm:text-[11px]">{label}</p>
      <p className="mt-1 text-base font-bold text-primary sm:text-lg">{value}</p>
    </div>
  );
}

function WorldMap() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      fill="none"
      viewBox="0 0 560 386"
    >
      <path
        d="M82 190C99 113 177 58 280 58C383 58 461 113 478 190C461 267 383 322 280 322C177 322 99 267 82 190Z"
        stroke="#C8D0DD"
        strokeWidth="2"
      />
      <path d="M280 58C229 100 203 144 203 190C203 236 229 280 280 322" stroke="#C8D0DD" />
      <path d="M280 58C331 100 357 144 357 190C357 236 331 280 280 322" stroke="#C8D0DD" />
      <path d="M103 150H457" stroke="#C8D0DD" />
      <path d="M103 230H457" stroke="#C8D0DD" />
      <path d="M280 58V322" stroke="#C8D0DD" />
      <path
        d="M155 178C175 151 207 143 238 158C257 167 273 168 294 154C321 136 356 137 383 158C407 177 426 181 452 169"
        stroke="#2563EB"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M128 221C168 242 204 245 236 230C270 214 303 213 332 228C371 248 408 246 447 221"
        stroke="#12B76A"
        strokeLinecap="round"
        strokeWidth="4"
      />
      {[
        [158, 178],
        [294, 154],
        [452, 169],
        [236, 230],
        [332, 228],
        [447, 221]
      ].map(([cx, cy]) => (
        <circle
          cx={cx}
          cy={cy}
          fill="#FFFFFF"
          key={`${cx}-${cy}`}
          r="7"
          stroke="#2563EB"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}
