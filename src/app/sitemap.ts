import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://antcard.airouter.tech/";

  const routes = ["zh", "en", "ja", "de", "es", "ko", "pt-BR", "tw"];

  const sitemap: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1.0
  }));

  return sitemap;
}
