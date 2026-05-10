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

      <h2>Wer dahinter steht</h2>
      <p>
        oudfinder.de ist ein redaktionelles Hobby-Projekt von Bilal El
        Hammi aus Herdecke. Wir betreiben die Plattform nicht-kommerziell;
        sollten wir künftig Affiliate-Partnerschaften mit Online-Händlern
        wie Douglas, Flaconi oder Notino eingehen, weisen wir dies
        transparent aus und kennzeichnen entsprechende Links — für dich
        entstehen dadurch in keinem Fall Mehrkosten.
      </p>

      <h2>Redaktionelle Unabhängigkeit</h2>
      <p>
        Empfehlungen geben unsere ehrliche Einschätzung wieder. Mögliche
        spätere Partnerschaften beeinflussen die redaktionelle Auswahl
        nicht.
      </p>

      <h2>Kontakt</h2>
      <p>
        Feedback, Vorschläge oder Anfragen:{" "}
        <a href="mailto:info@oudfinder.de">info@oudfinder.de</a>.
      </p>
    </LegalPage>
  );
}
