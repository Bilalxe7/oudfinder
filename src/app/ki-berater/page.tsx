import { KIBeraterClient } from "./KIBeraterClient";

export const metadata = {
  title: "KI-Duftberater",
  description: "Lass unsere KI den perfekten Duft für dich finden – basierend auf deiner Stimmung, deinen Vorlieben und deinem Budget.",
};

export default function KIBeraterPage() {
  return <KIBeraterClient />;
}
