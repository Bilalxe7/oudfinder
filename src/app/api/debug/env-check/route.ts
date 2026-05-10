// Temporary diagnostic endpoint — REMOVE after verifying ADMIN_TOKEN is wired up.
// Returns only whether the env var exists + its length, never the value.

export const runtime = "nodejs";

export async function GET() {
  const token = process.env.ADMIN_TOKEN;
  return new Response(
    JSON.stringify({
      runtime: "nodejs",
      hasAdminToken: !!token,
      tokenLength: token?.length ?? 0,
      nodeEnv: process.env.NODE_ENV ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
    }),
    { headers: { "content-type": "application/json" } },
  );
}
