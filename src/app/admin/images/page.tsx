import { AdminImagesClient } from "./AdminImagesClient";

export const metadata = {
  title: "Admin · Bilder",
  description: "Echte Produktbilder für Parfums hochladen",
  robots: { index: false, follow: false },
};

export default function AdminImagesPage() {
  return <AdminImagesClient />;
}
