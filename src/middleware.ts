import { NextRequest, NextResponse } from "next/server";

/**
 * Protects /admin/* and /api/admin/* behind a shared-secret cookie.
 *
 * Cookie `oud_admin` must match env `ADMIN_TOKEN`. In dev, the check is
 * skipped if `ADMIN_TOKEN` is unset (so localhost work isn't blocked).
 *
 * Login flow: POST `/admin/login` with form field `token`, the cookie
 * is set by /api/admin/login.
 */

const PROTECTED_PATH_PREFIX = ["/admin", "/api/admin"];
const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/login"];

const CANONICAL_HOST = "oudfinder.de";
const HOST_REDIRECT_FROM = new Set([
  "oudfinder.vercel.app",
  "www.oudfinder.de",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = req.headers.get("host")?.toLowerCase();

  // 1) Canonical host: redirect vercel.app + www.* → oudfinder.de
  if (host && HOST_REDIRECT_FROM.has(host)) {
    const url = req.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // 2) Only protect admin routes for the rest
  if (!PROTECTED_PATH_PREFIX.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }
  // Allow the login endpoints themselves
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  const expected = process.env.ADMIN_TOKEN;
  const isDev = process.env.NODE_ENV !== "production";

  // Dev fallback: if no ADMIN_TOKEN configured locally, allow access so
  // developers don't have to set the env var just to work.
  if (!expected) {
    if (isDev) return NextResponse.next();
    // Production with no token configured → block hard (fail-closed)
    return new NextResponse("Admin not configured", { status: 503 });
  }

  const provided = req.cookies.get("oud_admin")?.value;
  if (provided && provided === expected) {
    return NextResponse.next();
  }

  // Unauthorised
  if (pathname.startsWith("/api/admin")) {
    return new NextResponse(
      JSON.stringify({ error: "Unauthorised" }),
      { status: 401, headers: { "content-type": "application/json" } },
    );
  }
  // Redirect HTML pages to login, preserve target
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  // Run on every page request so the canonical-host redirect catches
  // visits to oudfinder.vercel.app, but skip Next's static asset paths
  // for performance.
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
