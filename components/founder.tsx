import Image from "next/image";
import Link from "next/link";

import { PEOPLE_PHOTOS } from "@/components/photos";
import { pages, site } from "@/lib/site";

/**
 * The founder at the top of Our story: a cut-out photo on a soft arch if one is set in PEOPLE_PHOTOS
 * (components/photos.ts), otherwise their initials in the same frame.
 */
export function FounderPortrait() {
  const founder = site.founder;
  const photo = PEOPLE_PHOTOS[founder.name];
  return (
    <figure className="founder-ph">
      <div className="founder-art">
        {photo ? (
          <Image className="sticker" src={photo.src} alt={photo.alt} loading="eager" fetchPriority="high" sizes="(max-width: 900px) 80vw, 440px" />
        ) : (
          <span className="founder-initials" aria-hidden="true">
            {founder.initials}
          </span>
        )}
      </div>
      <figcaption>
        <span>
          <b>{founder.name}</b>
          <i>
            {founder.role}, since {site.since}
          </i>
        </span>
      </figcaption>
    </figure>
  );
}

/** On the homepage beside the figures: a link to Our story. */
export function FounderLine() {
  return (
    <p className="founder-line">
      <Link className="cta-line" href={pages.story.href}>
        Our story →
      </Link>
    </p>
  );
}
