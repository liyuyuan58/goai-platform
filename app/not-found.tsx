import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container-page max-w-2xl rounded-3xl border border-border bg-surface p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-primary">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-secondary">
          The page you are looking for does not exist yet.
        </p>
        <Link
          className="focus-ring mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          href="/en"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
