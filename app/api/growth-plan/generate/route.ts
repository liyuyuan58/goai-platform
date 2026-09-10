import { generateLiveGrowthPlan } from "@/lib/ai/growth-plan-router";
import type { GrowthPlanInput } from "@/lib/growth-plan";
import { NextResponse } from "next/server";
const valid=(v:any):v is GrowthPlanInput=>Boolean(v&&["companyName","industry","product","currentCountry","targetCountry","goal"].every(k=>typeof v[k]==="string"&&v[k].trim()));
export async function POST(request:Request){
 try{const body=await request.json();if(!valid(body?.input))return NextResponse.json({error:"Please complete the required fields."},{status:400});
 return NextResponse.json({plan:await generateLiveGrowthPlan(body.input),provider:"deepseek",mode:"live"});}
 catch(error){console.error("[growth-plan][generate]",error);return NextResponse.json({error:"Live AI is temporarily unavailable. Use the competition demo instead."},{status:502});}
}
