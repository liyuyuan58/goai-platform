"use client";

import { ButtonLink } from "@/components/ui/button-link";
import type { Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  locale: Locale;
};

const navItems = [
  { label: "Solutions", href: "/solutions" },
  { label: "AI Tools", href: "/tools" },
  { label: "Playbooks", href: "/playbooks" },
  { label: "Regions", href: "/regions" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" }
];

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const localizedHref = (href: string) => `/${locale}${href}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/90 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          aria-label="GoAI home"
          className="focus-ring inline-flex items-center rounded-md"
          href={`/${locale}`}
        >
          <Image
            alt="GoAI"
            className="h-9 w-auto"
            height={64}
            priority
            src="/brand/logo-primary.svg"
            width={220}
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              className="focus-ring rounded-md text-sm font-medium text-secondary transition hover:text-primary"
              href={localizedHref(item.href)}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            className="focus-ring rounded-md text-sm font-semibold text-secondary transition hover:text-primary"
            href={`/${locale}`}
          >
            EN
          </Link>
          <ButtonLink href={localizedHref("/solutions")}>Explore Solutions</ButtonLink>
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary lg:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-primary" />
            <span className="block h-0.5 w-5 rounded-full bg-primary" />
            <span className="block h-0.5 w-5 rounded-full bg-primary" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-border bg-surface lg:hidden" id="mobile-navigation">
          <nav aria-label="Mobile navigation" className="container-page py-4">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  className="focus-ring rounded-lg px-2 py-3 text-base font-medium text-primary"
                  href={localizedHref(item.href)}
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <Link
                className="focus-ring rounded-lg px-2 py-2 text-sm font-semibold text-secondary"
                href={`/${locale}`}
                onClick={() => setIsOpen(false)}
              >
                EN
              </Link>
              <ButtonLink className="w-full" href={localizedHref("/solutions")}>
                Explore Solutions
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
