import type { StaticImageData } from "next/image";

import keys from "@/assets/photos/keys.jpg";
import living from "@/assets/photos/living.jpg";
import notebook from "@/assets/photos/notebook.jpg";
import towers from "@/assets/photos/towers.jpg";
import umbrella from "@/assets/photos/umbrella.jpg";
import type { ServiceSlug } from "@/lib/site";

/**
 * One picture per service: on the homepage plates and at the top of each service page. The files in assets/photos are
 * simple line-drawing placeholders; replace them with your own photographs (same file names) and update the alt text.
 */
export const SERVICE_PHOTOS: Record<ServiceSlug, { src: StaticImageData; alt: string }> = {
  investments: { src: notebook, alt: "A line drawing of an open notebook and a pencil" },
  insurance: { src: umbrella, alt: "A line drawing of an umbrella in the rain" },
  loans: { src: keys, alt: "A line drawing of a key" },
  "real-estate": { src: towers, alt: "A line drawing of residential towers" },
  family: { src: living, alt: "A line drawing of a house" },
};

/**
 * Optional portraits, keyed by name as in site.founder. Leave empty to show styled initials. To add one, put a
 * transparent PNG (a cut-out works best) in assets/photos/people/ and import it here, for example:
 *
 *   import founder from "@/assets/photos/people/founder.png";
 *   export const PEOPLE_PHOTOS = { "A. Founder": { src: founder, alt: "A. Founder in a dark suit" } };
 */
export const PEOPLE_PHOTOS: Record<string, { src: StaticImageData; alt: string } | undefined> = {};
