import { MetadataRoute } from "next";
import { SITE_URL } from "@/config/siteConfig";

const normalize = (url: string) => (url.endsWith("/") ? url : `${url}/`);

export default function robots(): MetadataRoute.Robots {
  const base = normalize(SITE_URL);
  const host = new URL(SITE_URL).host;

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
    host,
  };
}
