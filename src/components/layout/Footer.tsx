import Link from "next/link";

const links = {
  entdecken: [
    { label: "Alle Düfte", href: "/entdecken" },
    { label: "Trending", href: "/trending" },
    { label: "Editor's Choice", href: "/entdecken" },
    { label: "Neuerscheinungen", href: "/entdecken?sort=neu" },
  ],
  tools: [
    { label: "KI-Berater", href: "/ki-berater" },
    { label: "Duft-Quiz", href: "/ki-berater/quiz" },
    { label: "Community", href: "/community" },
    { label: "Ratgeber", href: "/ratgeber" },
  ],
  info: [
    { label: "Über oudfinder", href: "/ueber-uns" },
    { label: "Kontakt", href: "/kontakt" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "Impressum", href: "/impressum" },
    { label: "AGB", href: "/agb" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#faf9f7] border-t border-[#e8e6e1] pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-[#111111] flex items-center justify-center">
                <span className="text-white text-sm font-semibold">o</span>
              </div>
              <span className="font-semibold text-[#111111] text-[15px]">oudfinder</span>
            </Link>
            <p className="text-sm text-[#999999] leading-relaxed mb-5 max-w-[200px]">
              Die moderne Parfum-Plattform für Deutschland.
            </p>
            <div className="flex gap-2">
              {["IG", "X", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg border border-[#e8e6e1] flex items-center justify-center text-[10px] font-semibold text-[#aaaaaa] hover:text-[#111111] hover:border-[#c4c0bb] transition-colors"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Entdecken", links: links.entdecken },
            { title: "Tools", links: links.tools },
            { title: "Info", links: links.info },
          ].map(({ title, links: l }) => (
            <div key={title}>
              <p className="text-[10px] font-semibold text-[#333333] uppercase tracking-[0.12em] mb-4">
                {title}
              </p>
              <ul className="space-y-2.5">
                {l.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#888888] hover:text-[#111111] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#e8e6e1] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[#bbbbbb]">© {new Date().getFullYear()} oudfinder.de</p>
          <p className="text-xs text-[#cccccc]">Redaktionelles Projekt aus Herdecke</p>
        </div>
      </div>
    </footer>
  );
}
