import type { MetadataRoute } from "next";
import { parfums } from "@/lib/data/perfumes";

const BASE = "https://oudfinder.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/entdecken",
    "/trending",
    "/community",
    "/ratgeber",
    "/ki-berater",
    "/ki-berater/quiz",
    "/ueber-uns",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  const perfumeRoutes: MetadataRoute.Sitemap = parfums.map((p) => ({
    url: `${BASE}/duft/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...perfumeRoutes];
}
