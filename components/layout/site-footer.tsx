import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

type SiteFooterProps = {
  locale: Locale;
};

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "AI Tools", href: "/tools" },
      { label: "Playbooks", href: "/playbooks" },
      { label: "Regions", href: "/regions" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Newsletter", href: "#newsletter" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partnership", href: "/about#partnership" }
    ]
  }
];

export function SiteFooter({ locale }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
          <div>
            <Link
              aria-label="GoAI home"
              className="focus-ring inline-flex rounded-md"
              href={`/${locale}`}
            >
              <Image
                alt="GoAI - Go Global with AI"
                className="h-14 w-auto"
                height={88}
                src="/brand/logo-primary-slogan.svg"
                width={260}
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-secondary">
              Empowering every business to grow globally with AI.
            </p>
            <p className="mt-4 text-sm font-semibold text-brand">Go Global with AI.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                  {group.title}
                </h2>
                <ul className="mt-5 grid gap-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        className="focus-ring rounded-md text-sm text-secondary transition hover:text-primary"
                        href={`${link.href.startsWith("#") ? `/${locale}` : `/${locale}`}${link.href}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 GoAI. All rights reserved.</p>
          <p>Built for global business teams.</p>
        </div>
      </div>
    </footer>
  );
}
