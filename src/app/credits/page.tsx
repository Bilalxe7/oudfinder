import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = {
  title: "Bildquellen",
  description:
    "Quellen und Lizenzangaben für die auf oudfinder.de verwendeten Parfum-Bilder.",
};

type Credit = {
  slug: string;
  brand: string;
  name: string;
  license: string;
  license_url: string;
  author: string;
  source_url: string;
};

const credits: Credit[] = [
  {
    slug: "1-million",
    brand: "Paco Rabanne",
    name: "1 Million",
    license: "CC BY-SA 4.0",
    license_url: "https://creativecommons.org/licenses/by-sa/4.0",
    author: "DYVER",
    source_url:
      "https://commons.wikimedia.org/wiki/Paco_Rabanne_1_Million_Parfum_-_2.jpg",
  },
  {
    slug: "coco-mademoiselle",
    brand: "Chanel",
    name: "Coco Mademoiselle",
    license: "CC BY 3.0",
    license_url: "https://creativecommons.org/licenses/by/3.0",
    author: "Brownchl",
    source_url: "https://commons.wikimedia.org/wiki/Coco_mademoiselle.jpg",
  },
  {
    slug: "jadore",
    brand: "Dior",
    name: "J'adore",
    license: "CC BY-SA 3.0",
    license_url: "https://creativecommons.org/licenses/by-sa/3.0",
    author: "Diaphnie Casimir",
    source_url:
      "https://commons.wikimedia.org/wiki/J%E2%80%99adore_Eau_Lumiere.jpg",
  },
  {
    slug: "no-5",
    brand: "Chanel",
    name: "N°5",
    license: "Public Domain",
    license_url: "https://creativecommons.org/publicdomain/mark/1.0/",
    author: "Arz (Wikimedia)",
    source_url:
      "https://commons.wikimedia.org/wiki/CHANEL_No5_parfum_(cropped).jpg",
  },
  {
    slug: "santal-33",
    brand: "Le Labo",
    name: "Santal 33",
    license: "CC BY 3.0",
    license_url: "https://creativecommons.org/licenses/by/3.0",
    author: "The Honest Channel",
    source_url:
      "https://commons.wikimedia.org/wiki/Le_Labo_Santal_33_in_a_50_milliliter_bottle.jpg",
  },
  {
    slug: "shalimar",
    brand: "Guerlain",
    name: "Shalimar",
    license: "CC BY-SA 2.0",
    license_url: "https://creativecommons.org/licenses/by-sa/2.0",
    author: "Gonna Fly Now",
    source_url: "https://commons.wikimedia.org/wiki/Perfume_Shalimar.jpg",
  },
];

export default function CreditsPage() {
  return (
    <LegalPage
      eyebrow="Bildquellen"
      title="Bildquellen &amp; Lizenzen"
      updated="10. Mai 2026"
    >
      <p>
        Die auf oudfinder.de verwendeten Parfum-Bilder stammen aus
        verschiedenen Quellen. Ein Teil ist eigene Gestaltung in Form
        editorialer SVG-Platzhalter; ein anderer Teil sind unter freier
        Lizenz veröffentlichte Fotografien von{" "}
        <a
          href="https://commons.wikimedia.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikimedia Commons
        </a>
        . Für letztere führen wir hier transparent Autor und Lizenz auf.
      </p>

      <h2>Wikimedia Commons (Public Domain / Creative Commons)</h2>
      <ul>
        {credits.map((c) => (
          <li key={c.slug}>
            <strong>
              {c.brand} – {c.name}
            </strong>
            : Foto von{" "}
            <a href={c.source_url} target="_blank" rel="noopener noreferrer">
              {c.author}
            </a>
            , lizenziert unter{" "}
            <a
              href={c.license_url || "https://commons.wikimedia.org"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.license}
            </a>
            .
          </li>
        ))}
      </ul>

      <h2>SVG-Platzhalter</h2>
      <p>
        Für Düfte ohne hinterlegtes Foto generieren wir markenspezifische
        SVG-Illustrationen (Flakon-Silhouette, Farb-Gradient nach
        Duftfamilie, Marken-Monogramm). Diese werden zur Laufzeit auf
        unseren Servern erzeugt und unterliegen keiner externen Lizenz.
      </p>

      <h2>Marken und Trademark-Hinweis</h2>
      <p>
        Alle genannten Markennamen und Produktbezeichnungen sind Eigentum
        der jeweiligen Hersteller. Ihre Nennung dient ausschließlich der
        redaktionellen Information und Beschreibung der jeweiligen
        Düfte; eine geschäftliche Beziehung oder Empfehlung durch die
        Markeninhaber ist damit nicht verbunden.
      </p>

      <h2>Hinweis melden</h2>
      <p>
        Falls eine Lizenzangabe fehlerhaft ist oder du Inhaber eines hier
        verwendeten Bildes bist und Änderungen wünschst, schreib uns
        kurz an{" "}
        <a href="mailto:info@oudfinder.de">info@oudfinder.de</a> — wir
        korrigieren oder entfernen das Bild umgehend.
      </p>
    </LegalPage>
  );
}
