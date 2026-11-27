import type { Metadata } from "next";

import { ServicePage, serviceMetadata } from "@/components/service-page";
import { SERVICE_PAGES } from "@/lib/service-pages";

const page = SERVICE_PAGES["investments"];

export const metadata: Metadata = serviceMetadata(page);

/** /investments: the words are in lib/service-pages.ts, the layout in components/service-page.tsx. */
export default function InvestmentsPage() {
  return <ServicePage page={page} />;
}
