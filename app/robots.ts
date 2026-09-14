import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digital-hub.rasyid-hidayat.cloud";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/*?preview=true", "/*&preview=true"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
