import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/login
 *   form field: token=<secret>
 * On match: sets HTTP-only cookie `oud_admin` and redirects to ?next or /admin/images.
 */
export async function POST(req: NextRequest) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) {
    return NextResponse.json(
      { error: "Admin nicht konfiguriert. Setze ADMIN_TOKEN als env-Variable." },
      { status: 503 },
    );
  }

  const form = await req.formData();
  const token = form.get("token");
  if (typeof token !== "string" || token !== expected) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "1");
    const next = form.get("next");
    if (typeof next === "string" && next.startsWith("/admin")) {
      url.searchParams.set("next", next);
    }
    return NextResponse.redirect(url, 303);
  }

  // Determine where to redirect
  const next = form.get("next");
  const redirectTo =
    typeof next === "string" && next.startsWith("/admin") && next !== "/admin/login"
      ? next
      : "/admin/images";

  const url = req.nextUrl.clone();
  url.pathname = redirectTo;
  url.search = "";
  const res = NextResponse.redirect(url, 303);

  res.cookies.set("oud_admin", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // 7 days
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

/** POST without body → logout (clears cookie). */
export async function DELETE(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  const res = NextResponse.redirect(url, 303);
  res.cookies.set("oud_admin", "", { path: "/", maxAge: 0 });
  return res;
}
