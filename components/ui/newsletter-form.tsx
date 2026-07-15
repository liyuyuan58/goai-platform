"use client";

import { trackEvent } from "@/lib/analytics-events";
import { useState } from "react";

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [message, setMessage] = useState("");
  const isLight = tone === "light";

  return (
    <form
      className="mt-5 flex w-full flex-col gap-3 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        trackEvent("newsletter_subscribe", { source: "newsletter_form" });
        setMessage("Thanks. Newsletter signup will be connected before launch.");
      }}
    >
      <div className="flex-1">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          className={`min-h-12 w-full rounded-full border px-5 text-sm text-primary outline-none placeholder:text-secondary ${
            isLight
              ? "border-border bg-background focus:border-brand"
              : "border-white/20 bg-white focus:border-cyan"
          }`}
          id="newsletter-email"
          placeholder="you@example.com"
          required
          type="email"
        />
        {message ? (
          <p className={`mt-3 text-sm ${isLight ? "text-secondary" : "text-white/75"}`}>
            {message}
          </p>
        ) : null}
      </div>
      <button
        className="focus-ring min-h-12 rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:bg-[#1D4ED8]"
        type="submit"
      >
        Subscribe
      </button>
    </form>
  );
}
