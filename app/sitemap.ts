import type { MetadataRoute } from "next";

import { pages, services, site } from "@/lib/site";

/** Every page on the site, the homepage first. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${site.domain}`;
  const paths = ["/", ...services.map((s) => s.href), pages.corporates.href, pages.approach.href, pages.story.href, "/book", pages.careers.href, "/privacy", "/terms", "/grievance"];
  return paths.map((p) => ({ url: `${base}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
