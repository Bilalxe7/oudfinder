import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = {
  title: "Nutzungsbedingungen",
  description:
    "Bedingungen für die Nutzung von oudfinder.de.",
};

export default function AgbPage() {
  return (
    <LegalPage
      eyebrow="Bedingungen"
      title="Nutzungsbedingungen"
      updated="10. Mai 2026"
    >
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Nutzungsbedingungen regeln die Nutzung der Website
        oudfinder.de (nachfolgend „Plattform") durch dich als Nutzer:in.
        Mit der Nutzung der Plattform erkennst du diese Bedingungen an.
      </p>

      <h2>2. Leistungsbeschreibung</h2>
      <p>
        oudfinder.de ist eine redaktionelle Informations- und
        Empfehlungsplattform für Parfums. Wir stellen Inhalte, Filter und
        einen KI-gestützten Duft-Berater zur freien Nutzung bereit. Es
        kommt durch die Nutzung der Plattform <strong>kein Kaufvertrag
        zwischen dir und uns</strong> zustande. Verkäufe finden
        ausschließlich auf den Plattformen der jeweiligen Händler statt.
      </p>

      <h2>3. Kostenlose Nutzung</h2>
      <p>
        Die Nutzung der Plattform ist für Nutzer:innen kostenlos. Wir
        finanzieren uns über Affiliate-Provisionen, die wir von
        Partner-Shops für vermittelte Käufe erhalten. Dir entstehen
        dadurch keine zusätzlichen Kosten.
      </p>

      <h2>4. Inhalte und Bewertungen</h2>
      <p>
        Bewertungen, Kommentare und redaktionelle Beiträge geben die
        subjektive Meinung der jeweiligen Autor:innen wieder. Eine
        Gewähr für deren Richtigkeit oder Aktualität wird nicht
        übernommen.
      </p>
      <p>
        Falls du selbst Inhalte einreichst (z. B. Rezensionen, sobald
        Accounts verfügbar sind), versicherst du, dass du an diesen
        sämtliche Rechte hältst und keine Rechte Dritter verletzt
        werden. Du räumst uns an deinen Inhalten ein einfaches,
        unentgeltliches Nutzungsrecht zur Veröffentlichung auf der
        Plattform ein.
      </p>

      <h2>5. Verbotene Nutzung</h2>
      <p>Untersagt ist insbesondere:</p>
      <ul>
        <li>
          jede missbräuchliche, automatisierte oder massenhafte Nutzung
          (Scraping, Bots) ohne unsere ausdrückliche Zustimmung
        </li>
        <li>
          das Hochladen oder Verbreiten rechtswidriger, beleidigender oder
          urheberrechtsverletzender Inhalte
        </li>
        <li>
          die Manipulation oder Beeinträchtigung der technischen
          Verfügbarkeit der Plattform
        </li>
      </ul>

      <h2>6. Verfügbarkeit</h2>
      <p>
        Wir bemühen uns um eine möglichst hohe Verfügbarkeit. Ein Anspruch
        auf ununterbrochenen Betrieb besteht nicht. Wartungsarbeiten oder
        technische Störungen können vorübergehende Einschränkungen mit
        sich bringen.
      </p>

      <h2>7. Haftung</h2>
      <p>
        Wir haften nach den gesetzlichen Vorschriften. Bei einfacher
        Fahrlässigkeit haften wir – außer bei Verletzung von Leben, Körper
        oder Gesundheit – nur, sofern wesentliche Vertragspflichten
        (Kardinalpflichten) verletzt werden; die Haftung ist in diesem
        Fall der Höhe nach auf den typischerweise vorhersehbaren Schaden
        begrenzt.
      </p>
      <p>
        Für die Inhalte verlinkter externer Websites (insbesondere
        Online-Shops) übernehmen wir keine Haftung; verantwortlich ist
        jeweils der Betreiber.
      </p>

      <h2>8. Änderungen dieser Bedingungen</h2>
      <p>
        Wir behalten uns vor, diese Nutzungsbedingungen anzupassen, etwa
        bei Erweiterungen der Plattform oder geänderten rechtlichen
        Rahmenbedingungen. Wesentliche Änderungen werden auf der
        Plattform kenntlich gemacht.
      </p>

      <h2>9. Schlussbestimmungen</h2>
      <p>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Sollte
        eine Bestimmung dieser Nutzungsbedingungen unwirksam sein, bleibt
        die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </LegalPage>
  );
}
