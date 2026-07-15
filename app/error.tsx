"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container-page max-w-2xl rounded-3xl border border-border bg-surface p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">500</p>
        <h1 className="mt-4 text-4xl font-semibold text-primary">Server Error</h1>
        <p className="mt-4 text-base leading-7 text-secondary">
          Something went wrong while loading GoAI.
        </p>
        <Link
          className="focus-ring mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
          href="/en"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
