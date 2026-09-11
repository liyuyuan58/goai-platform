import { generateGrowthAgentMission } from "@/lib/agent/growth-agent";
import type { GrowthPlan } from "@/lib/growth-plan";
import { NextResponse } from "next/server";

function validPlan(plan: any): plan is GrowthPlan {
  return Boolean(
    plan &&
    plan.input &&
    typeof plan.input.companyName === "string" &&
    typeof plan.input.targetCountry === "string" &&
    Array.isArray(plan.entryStrategy) &&
    Array.isArray(plan.customerAcquisition)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!validPlan(body?.plan)) {
      return NextResponse.json({ error: "A valid Growth Plan is required." }, { status: 400 });
    }

    const mission = await generateGrowthAgentMission(body.plan);
    return NextResponse.json({
      mission,
      execution: {
        mode: "approval-first",
        externalActionsEnabled: false,
        walletEnabled: false
      }
    });
  } catch (error) {
    console.error("[growth-agent][run]", error);
    return NextResponse.json(
      { error: "Growth Agent is temporarily unavailable." },
      { status: 502 }
    );
  }
}
