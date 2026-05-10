import { Lock } from "lucide-react";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next = "/admin/images", error } = await searchParams;
  return (
    <div
      className="min-h-screen bg-[#faf8f4] flex items-center justify-center px-4"
      style={{ paddingTop: "4rem" }}
    >
      <div className="w-full max-w-sm bg-white border border-[#ece9e3] rounded-2xl p-8 shadow-[0_8px_32px_rgba(20,16,8,0.06)]">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#111111] text-white mx-auto mb-5">
          <Lock className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-serif font-medium text-[#111111] text-center mb-1">
          Admin-Zugang
        </h1>
        <p className="text-xs text-[#7a756d] text-center mb-6">
          Gib das Admin-Token ein, um fortzufahren.
        </p>

        {error && (
          <p className="mb-4 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-center">
            Falsches Token. Bitte erneut versuchen.
          </p>
        )}

        <form action="/api/admin/login" method="POST" className="space-y-3">
          <input type="hidden" name="next" value={next} />
          <input
            type="password"
            name="token"
            autoComplete="off"
            autoFocus
            required
            placeholder="Token"
            className="w-full px-3 py-2.5 text-sm border border-[#e4e0d7] rounded-lg bg-white focus:outline-none focus:border-[#111111]"
          />
          <button
            type="submit"
            className="w-full text-sm font-medium text-white bg-[#111111] hover:bg-[#2a2a2a] px-4 py-2.5 rounded-lg transition-colors"
          >
            Anmelden
          </button>
        </form>

        <p className="text-[11px] text-[#9b9389] text-center mt-6">
          Token wird per <code>ADMIN_TOKEN</code>-env-Variable in Vercel
          gesetzt.
        </p>
      </div>
    </div>
  );
}
