"use client";

import { LoginModal } from "@/components/auth/login-modal";
import type { Locale } from "@/lib/i18n";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

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
  return (
    <Suspense fallback={null}>
      <HeaderContent locale={locale} />
    </Suspense>
  );
}

function HeaderContent({ locale }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;

  const localizedHref = (href: string) => `/${locale}${href}`;

  useEffect(() => {
    const shouldLogin = searchParams.get("login") === "1";
    const callbackUrl = searchParams.get("callbackUrl");

    if (shouldLogin && isAuthenticated) {
      const target =
        callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//")
          ? callbackUrl
          : `/${locale}/account`;

      setIsLoginOpen(false);

      if (pathname !== target) {
        router.replace(target);
      }

      return;
    }

    if (shouldLogin && !isAuthenticated) {
      setIsLoginOpen(true);
    }
  }, [isAuthenticated, locale, pathname, router, searchParams]);

  const openLogin = () => {
    setIsOpen(false);
    setIsLoginOpen(true);
  };

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
          {isAuthenticated ? (
            <div className="relative">
              <button
                aria-expanded={isAccountOpen}
                className="focus-ring flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3 text-sm font-semibold text-primary shadow-sm transition hover:border-brand/30"
                onClick={() => setIsAccountOpen((current) => !current)}
                type="button"
              >
                {user?.image ? (
                  <img
                    alt={user.name ?? "GoAI user"}
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.image}
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {user?.name?.charAt(0) ?? "G"}
                  </span>
                )}
                <span aria-hidden="true">⌄</span>
              </button>
              {isAccountOpen ? (
                <AccountMenu
                  locale={locale}
                  onClose={() => setIsAccountOpen(false)}
                />
              ) : null}
            </div>
          ) : (
            <>
              <button
                className="focus-ring rounded-md text-sm font-semibold text-secondary transition hover:text-primary"
                onClick={openLogin}
                type="button"
              >
                Login
              </button>
              <button
                className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                onClick={openLogin}
                type="button"
              >
                Sign Up
              </button>
            </>
          )}
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
              {isAuthenticated ? (
                <div className="grid gap-2">
                  <Link
                    className="focus-ring rounded-lg px-2 py-2 text-sm font-semibold text-primary"
                    href={localizedHref("/account")}
                    onClick={() => setIsOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    className="focus-ring rounded-lg px-2 py-2 text-sm font-semibold text-primary"
                    href={localizedHref("/account/subscription")}
                    onClick={() => setIsOpen(false)}
                  >
                    Subscription
                  </Link>
                  <Link
                    className="focus-ring rounded-lg px-2 py-2 text-sm font-semibold text-primary"
                    href={localizedHref("/settings")}
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="focus-ring rounded-lg px-2 py-2 text-left text-sm font-semibold text-secondary"
                    onClick={() => void signOut({ callbackUrl: `/${locale}` })}
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <button
                    className="focus-ring rounded-lg px-2 py-2 text-left text-sm font-semibold text-secondary"
                    onClick={openLogin}
                    type="button"
                  >
                    Login
                  </button>
                  <button
                    className="focus-ring inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D4ED8]"
                    onClick={openLogin}
                    type="button"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      ) : null}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}

function AccountMenu({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const items = [
    { label: "My Account", href: `/${locale}/account` },
    { label: "Subscription", href: `/${locale}/account/subscription` },
    { label: "Settings", href: `/${locale}/settings` }
  ];

  return (
    <div className="absolute right-0 top-12 w-56 rounded-2xl border border-border bg-surface p-2 shadow-soft">
      {items.map((item) => (
        <Link
          className="focus-ring block rounded-xl px-4 py-3 text-sm font-semibold text-primary transition hover:bg-background"
          href={item.href}
          key={item.label}
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
      <button
        className="focus-ring mt-1 block w-full rounded-xl px-4 py-3 text-left text-sm font-semibold text-secondary transition hover:bg-background hover:text-primary"
        onClick={() => void signOut({ callbackUrl: `/${locale}` })}
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
