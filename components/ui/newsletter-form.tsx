"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  return (
    <form
      className="mt-8 flex w-full flex-col gap-3 sm:flex-row lg:mt-0 lg:max-w-md"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Thanks. Newsletter signup will be connected before launch.");
      }}
    >
      <div className="flex-1">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          className="min-h-12 w-full rounded-full border border-white/20 bg-white px-5 text-sm text-primary outline-none placeholder:text-secondary focus:border-cyan"
          id="newsletter-email"
          placeholder="you@example.com"
          required
          type="email"
        />
        {message ? <p className="mt-3 text-sm text-white/75">{message}</p> : null}
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
