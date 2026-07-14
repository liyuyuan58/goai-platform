import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/lib/i18n";
import type { Session } from "next-auth";
import type { ReactNode } from "react";

type AccountShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  locale: Locale;
  session: Session;
  children?: ReactNode;
};

export function AccountShell({
  children,
  description,
  eyebrow,
  locale,
  session,
  title
}: AccountShellProps) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="border-b border-border">
        <section className="container-page py-14 sm:py-20">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-primary sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-base leading-7 text-secondary">{description}</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <aside className="rounded-3xl border border-border bg-surface p-6 shadow-sm">
              <div className="flex items-center gap-4">
                {session.user.image ? (
                  <img
                    alt={session.user.name ?? "GoAI user"}
                    className="h-14 w-14 rounded-full object-cover"
                    src={session.user.image}
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                    {session.user.name?.charAt(0) ?? "G"}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary">{session.user.name}</p>
                  <p className="text-sm text-secondary">{session.user.email}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 border-t border-border pt-5 text-sm">
                <InfoRow label="Role" value={session.user.role} />
                <InfoRow label="Plan" value={session.user.plan} />
                <InfoRow label="Provider" value={session.user.provider} />
              </div>
            </aside>
            <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8">
              {children}
            </section>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-secondary">{label}</span>
      <span className="font-semibold capitalize text-primary">{value}</span>
    </div>
  );
}
