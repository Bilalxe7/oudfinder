import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = {
  title: "Impressum",
  description: "Angaben gemäß § 5 TMG.",
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Pflichtangaben" title="Impressum" updated="10. Mai 2026">
      <p>
        Angaben gemäß § 5 TMG sowie § 18 Abs. 2 MStV.
      </p>

      <h2>Anbieter</h2>
      <p>
        <strong>[Vor- und Nachname / Firma]</strong>
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ] [Ort]
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:kontakt@oudfinder.de">kontakt@oudfinder.de</a>
        <br />
        Telefon: [optional]
      </p>

      <h2>Vertretungsberechtigte Person</h2>
      <p>[Vor- und Nachname]</p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        [Vor- und Nachname]
        <br />
        [Anschrift wie oben]
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        [USt-ID falls vorhanden, ansonsten Hinweis: „Kleinunternehmer gem.
        § 19 UStG, keine USt-ID."]
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{" "}
        <a
          href="https://ec.europa.eu/consumers/odr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse findest du oben.
      </p>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>

      <h2>Haftungsausschluss</h2>
      <h3>Haftung für Inhalte</h3>
      <p>
        Als Diensteanbieter sind wir nach § 7 Abs. 1 TMG für eigene Inhalte
        auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
        §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
        verpflichtet, übermittelte oder gespeicherte fremde Informationen
        zu überwachen oder nach Umständen zu forschen, die auf eine
        rechtswidrige Tätigkeit hinweisen.
      </p>
      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
        fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
        der Seiten verantwortlich.
      </p>
      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
        diesen Seiten unterliegen dem deutschen Urheberrecht. Die
        Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
        schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2>Affiliate-Hinweis</h2>
      <p>
        Auf dieser Website befinden sich Werbe-Links (Affiliate-Links). Für
        jeden Kauf, der über diese Links zustande kommt, erhalten wir eine
        Provision vom jeweiligen Anbieter. Für dich entstehen dadurch
        keinerlei Mehrkosten.
      </p>

      <p className="text-xs text-[#9b9389] mt-12">
        Hinweis: Die mit [eckigen Klammern] markierten Stellen müssen vor
        Veröffentlichung mit den tatsächlichen Angaben befüllt werden.
      </p>
    </LegalPage>
  );
}
