import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/siteConfig";

const normalize = (url: string) => (url.endsWith("/") ? url : `${url}/`);

export default function robots(): MetadataRoute.Robots {
  const base = normalize(SITE_URL);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",        // internal API routes
          "/private/",    // if you ever add protected pages
        ],
      },
    ],
    sitemap: `${base}sitemap.xml`,
    host: SITE_URL, // ✔ bonus: tells Google your primary indexing host
  };
}
