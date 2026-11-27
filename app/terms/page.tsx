import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description: `The terms for using the ${site.name} website: our role, how we are paid, how your transactions work, and the limits of what the site says.`,
  alternates: { canonical: "/terms" },
};

const SECTIONS: readonly LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: <p>These terms apply when you use this website. By using it, you accept them. If you do not, please do not use the site.</p>,
  },
  {
    id: "role",
    title: "Our role",
    body: (
      <>
        <p>
          {site.name} is a practice that looks after families&apos; investments, insurance, loans and property, and plans for every member of the family. Each
          service is provided under its own registration, and every decision is yours.
        </p>
        <p>
          <strong>Mutual funds.</strong> We are an {site.amfiLine} ({site.arn}, EUIN {site.euin}). We act for you only as a distributor: we help you invest in
          schemes offered by fund houses, and we service those investments.
        </p>
        <p>
          <strong>Insurance.</strong> {site.insuranceLine}
        </p>
        <p>
          <strong>Loans.</strong> {site.loanLine}
        </p>
        <p>
          <strong>Property.</strong> We provide consultancy for housing society redevelopment, and help you buy, sell or invest in property: price, location,
          paperwork and timing. Where a decision needs them, we bring in chartered accountants, architects and lawyers, whose opinions are their own. The sale or
          purchase of a property is always between you and the other party.
        </p>
      </>
    ),
  },
  {
    id: "paid",
    title: "How we are paid",
    body: (
      <>
        <p>{site.paid}</p>
        <p>{site.paidDetail}</p>
        <p>Direct plans of the same schemes, with a lower expense ratio, are available to you straight from the fund houses if you prefer to invest on your own.</p>
      </>
    ),
  },
  {
    id: "transactions",
    title: "Your transactions",
    body: (
      <>
        <p>Every purchase, redemption, switch or SIP is authorised by you, through the link or OTP sent to you by the fund house or the exchange platform. Nothing is processed without it.</p>
        <p>Payments go straight from your bank account to the fund house, insurer or bank. We never accept cash and never receive your money into our own account.</p>
        <p>Cut-off times, processing times, exit loads and NAVs are set by the fund house and the scheme documents, not by us.</p>
      </>
    ),
  },
  {
    id: "figures",
    title: "Plans, figures and examples",
    body: (
      <>
        <p>
          Any plan, balance sheet or figure we prepare is based on what you tell us and on assumptions we explain to you. It is not a promise of what an
          investment will do. Past performance does not tell you what will happen next.
        </p>
        <p>Examples on this website, including the family balance sheet on the homepage, use made-up figures.</p>
      </>
    ),
  },
  {
    id: "market-risk",
    title: "Market risk",
    body: <p>{site.marketRisk}</p>,
  },
  {
    id: "website",
    title: "Using this website",
    body: (
      <>
        <p>
          What this website says is general information. It is not an offer to buy or sell any product, and it does not take your own situation into account;
          for that, book the free review.
        </p>
        <p>
          Links to other websites are for your convenience; we are not responsible for their content. The words, design and images on this website belong to{" "}
          {site.name} or are used with permission. Please do not copy them without asking.
        </p>
      </>
    ),
  },
  {
    id: "limits",
    title: "Limits on our responsibility",
    body: (
      <p>
        We take care to keep this website accurate and available, but we cannot promise it will always be either. Nothing in these terms limits any right you
        have that cannot be excluded by law, including your rights under the rules for mutual funds and their distributors.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of India. Subject to the complaint and dispute routes on our <Link href="/grievance">grievance page</Link>, the
        courts at {site.city} have jurisdiction.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: <p>If we change these terms, we update this page and the date at the top.</p>,
  },
];

/** /terms: our role, how we are paid, how transactions work, and the limits of the website. */
export default function TermsPage() {
  return (
    <LegalPage label="Terms" title="Terms of use" intro={<p>The short version: we are a distributor, you pay us no fee, your money goes straight from your bank, and every decision is yours.</p>} sections={SECTIONS} />
  );
}
