import { executeMarketResearch } from "@/lib/agent/research-execution";
import type { GrowthPlan } from "@/lib/growth-plan";
import { NextResponse } from "next/server";
function valid(p:any):p is GrowthPlan{return Boolean(p?.input?.companyName&&p?.input?.targetCountry&&Array.isArray(p?.targetCustomers))}
export async function POST(request:Request){
 try{
  const body=await request.json();
  if(!valid(body?.plan))return NextResponse.json({error:"A valid Growth Plan is required."},{status:400});
  const result=await executeMarketResearch(body.plan);
  return NextResponse.json({result,execution:{provider:"deepseek",externalWebResearch:false,externalActions:false}});
 }catch(e){console.error("[growth-agent][research]",e);return NextResponse.json({error:"Market Research Agent is temporarily unavailable."},{status:502})}
}
