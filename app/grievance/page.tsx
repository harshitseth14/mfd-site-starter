import type { Metadata } from "next";
import Link from "next/link";

import { Ext, LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Grievances",
  description: `How to raise a complaint with ${site.name}, how quickly we respond, and where to go if you are not satisfied.`,
  alternates: { canonical: "/grievance" },
};

const { acknowledgeWithinDays, resolveWithinDays } = site.grievance;

const SECTIONS: readonly LegalSection[] = [
  {
    id: "tell-us",
    title: "Tell us first",
    body: (
      <>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phones[0].display} or {site.phones[1].display}.
        </p>
        <p>
          Tell us your name, your registered phone number or email, the folio, policy or loan it concerns (if any), what happened, and what you would like us
          to do. Please do not send us your full PAN, passwords or OTPs.
        </p>
      </>
    ),
  },
  {
    id: "timelines",
    title: "How quickly we respond",
    body: (
      <p>
        We acknowledge your complaint within <strong>{acknowledgeWithinDays} working days</strong> and aim to resolve it within{" "}
        <strong>{resolveWithinDays} days</strong>. If it depends on a fund house, registrar, insurer or bank, we tell you and keep you updated.
      </p>
    ),
  },
  {
    id: "fund-house",
    title: "Mutual funds: the fund house or its registrar",
    body: (
      <p>
        For a transaction, statement, payment or scheme, you can also go directly to the fund house or its registrar, such as CAMS or KFin Technologies. Each
        fund house lists its investor service contacts on its website and in its scheme documents. Fund houses also oversee the distributors they work with,
        so you can raise a complaint about us with them too.
      </p>
    ),
  },
  {
    id: "amfi",
    title: "Mutual funds: AMFI",
    body: (
      <p>
        AMFI registers mutual fund distributors and oversees the code of conduct they follow. You can write to AMFI about a distributor&apos;s conduct; contact
        details are on <Ext href="https://www.amfiindia.com">amfiindia.com</Ext>.
      </p>
    ),
  },
  {
    id: "scores",
    title: "Mutual funds: SEBI SCORES",
    body: (
      <p>
        If a complaint about a scheme or a fund house is not resolved, or you are not satisfied, you can lodge it on SEBI&apos;s SCORES at{" "}
        <Ext href="https://scores.sebi.gov.in">scores.sebi.gov.in</Ext>. If you are still not satisfied, you can ask for it to be reviewed.
      </p>
    ),
  },
  {
    id: "odr",
    title: "Mutual funds: online dispute resolution",
    body: (
      <p>
        If a dispute with a fund house is still not settled after SCORES, you can start online conciliation and, if needed, arbitration on the securities
        market&apos;s Online Dispute Resolution portal at <Ext href="https://smartodr.in">smartodr.in</Ext>.
      </p>
    ),
  },
  {
    id: "insurance",
    title: "Insurance",
    body: (
      <p>
        For a policy arranged through us, tell us and contact the insurance company&apos;s grievance officer. If it is not resolved, you can use IRDAI&apos;s
        Bima Bharosa at <Ext href="https://bimabharosa.irdai.gov.in">bimabharosa.irdai.gov.in</Ext> or approach the Insurance Ombudsman.
      </p>
    ),
  },
  {
    id: "loans",
    title: "Loans",
    body: (
      <p>
        For a loan arranged through us, tell us and contact the bank&apos;s grievance officer. If the bank does not reply within 30 days, or you are not satisfied with
        its reply, you can complain to the RBI Ombudsman at <Ext href="https://cms.rbi.org.in">cms.rbi.org.in</Ext>.
      </p>
    ),
  },
  {
    id: "data",
    title: "Your personal data",
    body: (
      <p>
        Send these to us in the same way. If you are not satisfied with our reply, you can approach the Data Protection Board of India. The{" "}
        <Link href="/privacy#your-rights">privacy notice</Link> explains your rights.
      </p>
    ),
  },
];

/** /grievance: how to complain, our timelines, and every route beyond us. */
export default function GrievancePage() {
  return (
    <LegalPage
      label="Grievances"
      title="Grievances"
      intro={<p>If something has gone wrong with an investment, a policy, a loan, our service or your data, here is how to raise it and where to go if you are not satisfied.</p>}
      sections={SECTIONS}
    />
  );
}
