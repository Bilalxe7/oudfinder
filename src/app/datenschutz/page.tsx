import { LegalPage } from "@/components/layout/LegalPage";

export const metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung deiner Daten nach Art. 13 DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      eyebrow="Datenschutz"
      title="Datenschutzerklärung"
      updated="10. Mai 2026"
    >
      <p>
        Wir freuen uns über deinen Besuch auf oudfinder.de. Der Schutz
        deiner personenbezogenen Daten ist uns wichtig. Im Folgenden
        informieren wir dich gemäß Art. 13 DSGVO darüber, welche Daten wir
        verarbeiten und welche Rechte du hast.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p>
        <strong>[Vor- und Nachname]</strong>
        <br />
        [Anschrift]
        <br />
        E-Mail:{" "}
        <a href="mailto:datenschutz@oudfinder.de">
          datenschutz@oudfinder.de
        </a>
      </p>

      <h2>2. Bereitstellung der Website und Erstellung von Logfiles</h2>
      <p>
        Bei jedem Aufruf unserer Website erfasst unser Hosting-Anbieter
        (siehe Abschnitt 6) automatisch Informationen, die dein Browser an
        unseren Server übermittelt. Dies sind:
      </p>
      <ul>
        <li>IP-Adresse des aufrufenden Geräts</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>Name und URL der abgerufenen Datei</li>
        <li>Übertragene Datenmenge</li>
        <li>Meldung über erfolgreichen Abruf (HTTP-Statuscode)</li>
        <li>Browsertyp und -version, Betriebssystem</li>
        <li>Referrer-URL (zuvor besuchte Seite)</li>
      </ul>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
        Interesse besteht darin, einen technisch fehlerfreien Betrieb und
        die Sicherheit unserer Website zu gewährleisten. Die Daten werden
        nach spätestens 30 Tagen gelöscht.
      </p>

      <h2>3. Cookies</h2>
      <p>
        Diese Website verwendet derzeit <strong>keine Tracking-, Marketing-
        oder Analyse-Cookies</strong>. Technisch notwendige Cookies werden
        nur dann gesetzt, wenn dies für die Funktionalität (z. B. eine
        Anmeldung) zwingend erforderlich ist. Falls künftig Cookies
        eingesetzt werden, wirst du vorab über einen Cookie-Banner um deine
        Einwilligung gebeten.
      </p>

      <h2>4. Suchanfragen und Filter</h2>
      <p>
        Die Suche und die Filter auf der Seite{" "}
        <code>/entdecken</code> werden vollständig im Browser ausgeführt.
        Deine Eingaben werden nicht an unseren Server gesendet und nicht
        gespeichert. Die aktuell aktiven Filter werden als
        URL-Parameter dargestellt, damit du den Link teilen kannst.
      </p>

      <h2>5. KI-Berater</h2>
      <p>
        Wenn du den KI-Berater nutzt, werden deine Eingaben an einen
        externen KI-Anbieter übermittelt, um eine Antwort zu generieren.
        Wir speichern die Chat-Inhalte nicht dauerhaft auf unseren Servern.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Erbringung des
        angeforderten Dienstes) bzw. Art. 6 Abs. 1 lit. a DSGVO
        (Einwilligung durch aktive Nutzung).
      </p>

      <h2>6. Hosting (Vercel)</h2>
      <p>
        Diese Website wird gehostet bei{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vercel Inc.
        </a>
        , 440 N Barranca Ave #4133, Covina, CA 91723, USA. Beim Aufruf
        werden Verbindungsdaten an Vercel übermittelt. Vercel betreibt
        Server unter anderem in der EU. Es besteht ein
        Auftragsverarbeitungsvertrag (Data Processing Addendum) gemäß
        Art. 28 DSGVO. Datenschutzerklärung von Vercel:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com/legal/privacy-policy
        </a>
        .
      </p>

      <h2>7. Affiliate-Links</h2>
      <p>
        Wir setzen auf den Produktseiten Affiliate-Links zu Online-Händlern
        wie Douglas, Flaconi und Notino ein. Wenn du einem solchen Link
        folgst, kann der jeweilige Händler Cookies setzen, um die
        Vermittlung zu identifizieren. Diese Datenverarbeitung erfolgt
        ausschließlich durch den Händler unter dessen
        Datenschutzbestimmungen. Wir erhalten lediglich aggregierte
        Provisions-Auszahlungen, keine Personendaten.
      </p>

      <h2>8. Deine Rechte</h2>
      <p>Du hast jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung („Recht auf Vergessenwerden", Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Wende dich dazu formlos an{" "}
        <a href="mailto:datenschutz@oudfinder.de">
          datenschutz@oudfinder.de
        </a>
        .
      </p>

      <h2>9. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Unbeschadet eines anderweitigen verwaltungsrechtlichen oder
        gerichtlichen Rechtsbehelfs steht dir das Recht zu, dich bei einer
        Datenschutz-Aufsichtsbehörde zu beschweren. Eine Liste der
        deutschen Behörden findest du unter:{" "}
        <a
          href="https://www.bfdi.bund.de/DE/Service/Anschriften/anschriften-node.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          bfdi.bund.de
        </a>
        .
      </p>

      <h2>10. Aktualität und Änderung dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig und hat den Stand
        vom oben angegebenen Datum. Wir behalten uns vor, diese Erklärung
        bei Änderungen unserer Dienste oder rechtlichen Vorgaben
        anzupassen.
      </p>

      <p className="text-xs text-[#9b9389] mt-12">
        Hinweis: Die mit [eckigen Klammern] markierten Stellen müssen vor
        Veröffentlichung mit den tatsächlichen Angaben befüllt werden.
      </p>
    </LegalPage>
  );
}
