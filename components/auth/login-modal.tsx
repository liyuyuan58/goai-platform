"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const searchParams = useSearchParams();
  const callbackUrlParam = searchParams.get("callbackUrl");
  const callbackUrl =
    callbackUrlParam?.startsWith("/") && !callbackUrlParam.startsWith("//")
      ? callbackUrlParam
      : "/en/account";

  if (!isOpen) {
    return null;
  }

  return (
    <div
      aria-labelledby="login-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 px-4 py-8 backdrop-blur-sm"
      role="dialog"
    >
      <button
        aria-label="Close login dialog"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div className="relative w-full max-w-md rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-soft backdrop-blur sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              GoAI Account
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-primary" id="login-modal-title">
              Continue with Google
            </h2>
          </div>
          <button
            aria-label="Close"
            className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-lg leading-none text-secondary transition hover:text-primary"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-secondary">
          Sign in to prepare your GoAI workspace, saved tools, favorites and future membership
          features.
        </p>
        <button
          className="focus-ring mt-7 flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-[#1D4ED8]"
          onClick={() => void signIn("google", { callbackUrl, redirectTo: callbackUrl })}
          type="button"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand">
            G
          </span>
          Continue with Google
        </button>
        <p className="mt-4 text-center text-xs leading-5 text-secondary">
          By continuing, you agree to GoAI's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
