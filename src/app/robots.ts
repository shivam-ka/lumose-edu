import { env } from "@/env";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sitemap/*"],
        disallow: ["/admin", "/dashboard", "/signin", "/signup", "/api"],
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/sitemap.xml`,
    host: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  };
}
