import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "oudfinder – Parfum entdecken & vergleichen",
    template: "%s | oudfinder",
  },
  description:
    "Entdecke, bewerte und vergleiche Parfums. KI-gestützte Duftempfehlungen, echte Community-Bewertungen und die größte deutsche Parfum-Datenbank.",
  keywords: ["Parfum", "Duft", "Bewertungen", "Empfehlungen", "Duftnoten"],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://oudfinder.de",
    siteName: "oudfinder",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#111111] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
