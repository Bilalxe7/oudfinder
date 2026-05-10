import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = {
  title: "Über oudfinder",
  description:
    "Was oudfinder ist, wer dahinter steht und wie wir uns finanzieren.",
};

export default function UeberUnsPage() {
  return (
    <LegalPage eyebrow="Über uns" title="Was oudfinder ist">
      <p>
        oudfinder ist eine deutsche Informations- und Empfehlungsplattform
        rund um Parfum. Wir kuratieren Düfte, redaktionelle Guides und
        bieten einen KI-gestützten Duft-Berater an — kostenlos und ohne
        Anmeldung.
      </p>

      <h2>Was wir machen</h2>
      <ul>
        <li>
          eine wachsende Datenbank mit echten Parfums, Marken, Noten und
          Familien
        </li>
        <li>
          Filter und Vergleich nach Anlass, Jahreszeit, Geschlecht und
          Preisspanne
        </li>
        <li>
          KI-Berater, der auf Basis deiner Vorlieben passende Düfte
          vorschlägt
        </li>
        <li>
          redaktionelle Ratgeber-Artikel rund um das Thema Parfum
        </li>
      </ul>

      <h2>Wie wir uns finanzieren</h2>
      <p>
        Wir verdienen über Affiliate-Links zu Online-Händlern wie
        Douglas, Flaconi oder Notino. Wenn du über einen dieser Links
        einen Duft kaufst, erhalten wir eine kleine Provision. Für dich
        ändert sich am Preis nichts. Diese Einnahmen finanzieren die
        Plattform und ermöglichen es uns, sie für dich kostenlos zu
        halten.
      </p>

      <h2>Redaktionelle Unabhängigkeit</h2>
      <p>
        Affiliate-Partnerschaften beeinflussen unsere redaktionellen
        Empfehlungen nicht. Wir empfehlen Düfte, die wir oder unsere
        Community gut finden — unabhängig davon, ob sie bei einem
        Partner-Shop geführt werden.
      </p>

      <h2>Kontakt</h2>
      <p>
        Feedback, Vorschläge oder Anfragen:{" "}
        <a href="mailto:kontakt@oudfinder.de">kontakt@oudfinder.de</a>.
      </p>
    </LegalPage>
  );
}
