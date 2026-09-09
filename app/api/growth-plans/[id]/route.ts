import { auth } from "@/auth";
import { isSupabaseConfigured, supabaseServerRequest } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

type RouteProps = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const { id } = await params;

  try {
    const rows = await supabaseServerRequest<any[]>(
      `growth_plans?id=eq.${encodeURIComponent(id)}&user_email=eq.${encodeURIComponent(session.user.email)}&select=id,title,company_name,current_country,target_country,opportunity_score,created_at,plan_data&limit=1`
    );

    if (!rows[0]) {
      return NextResponse.json({ error: "Growth plan not found" }, { status: 404 });
    }

    return NextResponse.json({ plan: rows[0] });
  } catch (error) {
    console.error("[growth-plans][GET:id]", error);
    return NextResponse.json({ error: "Unable to load growth plan" }, { status: 500 });
  }
}
