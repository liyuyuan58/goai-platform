import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "text";
  className?: string;
};

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className = ""
}: ButtonLinkProps) {
  const variantClasses = {
    primary: "bg-brand text-white shadow-sm hover:bg-[#1D4ED8]",
    secondary:
      "border border-border bg-surface text-primary hover:border-[#C7CDD8] hover:bg-white",
    text: "text-brand hover:bg-brand/5"
  }[variant];

  return (
    <Link
      className={`focus-ring inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition ${variantClasses} ${className}`}
      href={href}
    >
      {children}
    </Link>
  );
}
