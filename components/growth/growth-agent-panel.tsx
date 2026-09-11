"use client";

import type { GrowthAgentMission } from "@/lib/agent/growth-agent";
import type { GrowthPlan } from "@/lib/growth-plan";
import { useState } from "react";

export function GrowthAgentPanel({ plan }: { plan: GrowthPlan }) {
  const [mission, setMission] = useState<GrowthAgentMission | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState<Record<string, boolean>>({});

  async function runAgent() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/growth-agent/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan })
      });
      const data = await response.json();
      if (!response.ok || !data?.mission) throw new Error(data?.error || "Unable to start Growth Agent.");
      setMission(data.mission);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to start Growth Agent.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="rounded-[2rem] border border-brand/25 bg-surface p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-brand">GoAI Growth Agent · V1</p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">Turn this plan into an execution mission.</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            The agent converts your strategy into research, ICP, lead, qualification and outreach tasks.
            External or irreversible actions stay behind human approval.
          </p>
        </div>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 text-sm font-semibold text-white disabled:opacity-60"
          disabled={busy}
          onClick={runAgent}
          type="button"
        >
          {busy ? "Planning execution..." : mission ? "Rebuild Mission" : "Run with GoAI Agent"}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">Approval-first</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">No autonomous spending</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Wallet rail reserved</span>
      </div>

      {error ? <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{error}</p> : null}

      {mission ? (
        <div className="mt-7">
          <div className="rounded-3xl border border-border bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[.12em] text-brand">Agent Mission</p>
            <h3 className="mt-2 text-xl font-semibold text-primary">{mission.title}</h3>
            <p className="mt-2 text-sm leading-6 text-secondary">{mission.summary}</p>
            <p className="mt-4 text-sm font-semibold text-primary">Objective: {mission.objective}</p>
          </div>

          <div className="mt-4 grid gap-3">
            {mission.tasks.map((task, index) => {
              const needsApproval = task.status === "needs_approval";
              const isApproved = Boolean(approved[task.id]);
              return (
                <div className="rounded-3xl border border-border bg-white p-5" key={task.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[.12em] text-secondary">Task {index + 1}</p>
                      <h4 className="mt-1 text-lg font-semibold text-primary">{task.title}</h4>
                    </div>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      task.status === "ready" ? "bg-emerald-50 text-emerald-700" :
                      task.status === "blocked" ? "bg-rose-50 text-rose-700" :
                      isApproved ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-800"
                    }`}>
                      {task.status === "ready" ? "Ready" : task.status === "blocked" ? "Blocked" : isApproved ? "Approved" : "Needs approval"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-secondary">{task.objective}</p>
                  <div className="mt-3 rounded-2xl bg-background p-4">
                    <p className="text-xs font-semibold uppercase tracking-[.1em] text-secondary">Expected output</p>
                    <p className="mt-1 text-sm text-primary">{task.output}</p>
                  </div>
                  {needsApproval ? (
                    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm leading-6 text-amber-900">{task.approvalReason}</p>
                      <button
                        className="shrink-0 rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-900"
                        onClick={() => setApproved((x) => ({ ...x, [task.id]: !x[task.id] }))}
                        type="button"
                      >
                        {isApproved ? "Revoke Approval" : "Approve Step"}
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-3xl border border-dashed border-brand/30 bg-brand/5 p-5">
            <p className="text-sm font-semibold text-primary">Next best action</p>
            <p className="mt-2 text-sm leading-6 text-secondary">{mission.nextBestAction}</p>
            <p className="mt-4 text-xs leading-5 text-secondary">
              Sprint013 plans execution and captures approval state only. External tools, email sending, purchases and wallet transactions are intentionally disabled in V1.
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
