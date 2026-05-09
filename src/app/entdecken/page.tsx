import { Suspense } from "react";
import { EntdeckenClient } from "./EntdeckenClient";

export const metadata = {
  title: "Düfte entdecken",
  description: "Entdecke über 50.000 Parfums, gefiltert nach Duftfamilie, Anlass, Geschlecht und mehr.",
};

export default function EntdeckenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <EntdeckenClient />
    </Suspense>
  );
}
