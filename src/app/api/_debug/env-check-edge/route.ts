// Temporary edge-runtime diagnostic — same as env-check but on edge runtime
// to mirror what the middleware sees. REMOVE after debugging.

export const runtime = "edge";

export async function GET() {
  const token = process.env.ADMIN_TOKEN;
  return new Response(
    JSON.stringify({
      runtime: "edge",
      hasAdminToken: !!token,
      tokenLength: token?.length ?? 0,
      nodeEnv: process.env.NODE_ENV ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
    }),
    { headers: { "content-type": "application/json" } },
  );
}
