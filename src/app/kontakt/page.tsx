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

      <h2>E-Mail</h2>
      <p>
        <a href="mailto:info@oudfinder.de">info@oudfinder.de</a>
      </p>
      <p className="text-sm text-[#7a756d]">
        Diese Adresse erreichst du für allgemeine Anfragen, Presse,
        Kooperationen sowie Anliegen rund um den Datenschutz.
      </p>

      <h2>Postanschrift</h2>
      <p>
        Bilal El Hammi
        <br />
        Grünstraße 4
        <br />
        58313 Herdecke
      </p>
    </LegalPage>
  );
}
