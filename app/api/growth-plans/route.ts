import { auth } from "@/auth";
import { isSupabaseConfigured, supabaseServerRequest } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ plans: [], configured: false });
  try {
    const plans = await supabaseServerRequest<any[]>(`growth_plans?user_email=eq.${encodeURIComponent(session.user.email)}&select=id,title,target_country,opportunity_score,created_at&order=created_at.desc&limit=20`);
    return NextResponse.json({ plans, configured: true });
  } catch (error) {
    console.error("[growth-plans][GET]", error);
    return NextResponse.json({ error: "Unable to load growth plans" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  try {
    const body = await request.json();
    const plan = body?.plan;
    if (!plan?.title || !plan?.input?.targetCountry) return NextResponse.json({ error: "Invalid growth plan" }, { status: 400 });
    const rows = await supabaseServerRequest<any[]>("growth_plans", {
      method: "POST",
      body: JSON.stringify({
        user_email: session.user.email,
        user_name: session.user.name ?? null,
        company_name: plan.input.companyName,
        current_country: plan.input.currentCountry,
        target_country: plan.input.targetCountry,
        title: plan.title,
        opportunity_score: plan.opportunityScore,
        plan_data: plan
      })
    });
    return NextResponse.json({ plan: rows[0] }, { status: 201 });
  } catch (error) {
    console.error("[growth-plans][POST]", error);
    return NextResponse.json({ error: "Unable to save growth plan" }, { status: 500 });
  }
}
