import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/** Search engines may read every page; the sitemap lists them. */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `https://${site.domain}/sitemap.xml`, host: `https://${site.domain}` };
}
