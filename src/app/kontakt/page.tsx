import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = {
  title: "Kontakt",
  description: "So erreichst du oudfinder.",
};

export default function KontaktPage() {
  return (
    <LegalPage eyebrow="Kontakt" title="Schreib uns gerne">
      <p>
        Wir freuen uns über Feedback, Korrekturvorschläge, Partner-Anfragen
        oder Hinweise zu Düften, die noch fehlen.
      </p>

      <h2>Allgemein</h2>
      <p>
        E-Mail:{" "}
        <a href="mailto:kontakt@oudfinder.de">kontakt@oudfinder.de</a>
      </p>

      <h2>Datenschutz</h2>
      <p>
        Anfragen nach Art. 15–22 DSGVO:{" "}
        <a href="mailto:datenschutz@oudfinder.de">
          datenschutz@oudfinder.de
        </a>
      </p>

      <h2>Presse &amp; Partnerschaften</h2>
      <p>
        Bitte mit kurzer Angabe zum Thema an{" "}
        <a href="mailto:kontakt@oudfinder.de">kontakt@oudfinder.de</a>.
      </p>
    </LegalPage>
  );
}
