import type { Locale } from "@/lib/i18n";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import Image from "next/image";
import Link from "next/link";

type SiteFooterProps = {
  locale: Locale;
};

const footerGroups = [
  {
    title: "GoAI",
    links: [
      { label: "About", href: "/about" },
      { label: "Resources", href: "/resources" },
      { label: "Pricing", href: "/pricing" }
    ]
  },
  {
    title: "Content",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/about#contact" },
      { label: "Suggest Tool", href: "/about#suggest-tool" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/about#privacy-policy" },
      { label: "Terms of Service", href: "/about#terms-of-service" },
      { label: "Cookie Policy", href: "/about#cookie-policy" }
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
            <div className="mt-7 max-w-md">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                Join GoAI Newsletter
              </h2>
              <NewsletterForm tone="light" />
            </div>
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
          <p>Copyright (c) 2026 GoAI. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="hover:text-primary" href="https://x.com" rel="noreferrer" target="_blank">Twitter</a>
            <a className="hover:text-primary" href="https://linkedin.com" rel="noreferrer" target="_blank">LinkedIn</a>
            <a className="hover:text-primary" href="https://youtube.com" rel="noreferrer" target="_blank">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
