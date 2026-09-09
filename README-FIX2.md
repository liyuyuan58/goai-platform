# Sprint009.1 Fix 2

Fixes the Save Growth Plan HTTP 400 caused by a mismatch between the API validation and the GrowthPlan data model.

Changes:
- Adds the original `GrowthPlanInput` to every generated plan.
- Validates `targetMarket` correctly.
- Persists company/current/target market context to Supabase.

Commit:
`Fix Sprint009.1 Growth Plan persistence`
