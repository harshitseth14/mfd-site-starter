import type { Metadata } from "next";

import { ServicePage, serviceMetadata } from "@/components/service-page";
import { SERVICE_PAGES } from "@/lib/service-pages";

const page = SERVICE_PAGES["loans"];

export const metadata: Metadata = serviceMetadata(page);

/** /loans: the words are in lib/service-pages.ts, the layout in components/service-page.tsx. */
export default function LoansPage() {
  return <ServicePage page={page} />;
}
