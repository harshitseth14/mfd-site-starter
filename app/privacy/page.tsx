import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `What ${site.name} collects when you ask for a call back, why, who can see it, how long we keep it, and your rights.`,
  alternates: { canonical: "/privacy" },
};

const SECTIONS: readonly LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.name} is a practice that has looked after families&apos; money since {site.since}: their investments, insurance, loans and property, and
          planning for every member of the family. {site.base}
        </p>
        <p>
          Each service is provided under its own registration: mutual funds as an {site.amfiLine} ({site.arn}), general insurance through an IRDAI-licensed
          insurance agent, and loans through banks as their Direct Selling Agent.
        </p>
        <p>
          We decide why and how your personal data is used, so we are responsible for it. You can reach us at {site.email} or {site.phones[0].display}.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect, and when",
    body: (
      <>
        <p>When you ask for a call back on this website, we collect your name, mobile number and email address.</p>
        <p>If you then pick a time, we also collect the time you chose, how you would like to talk, and any note you add.</p>
        <p>
          If you go on to work with us, we collect what we need to give you the review and carry out what you ask: what you own and owe, your goals,
          and the details that fund houses, insurers and banks require, such as KYC. We collect these from you directly, on a call, in a meeting or by email.
        </p>
        <p>We never ask for your passwords, OTPs or full card details.</p>
      </>
    ),
  },
  {
    id: "applicants",
    title: "If you apply for a job",
    body: (
      <p>
        When you apply by email to {site.careersEmail}, we receive your CV and whatever else you send. We use it only to consider you for a role, share it with
        no one outside our team, and delete it within 12 months unless you join us. You can ask us to delete it sooner by writing to the same address.
      </p>
    ),
  },
  {
    id: "why",
    title: "Why we use it",
    body: (
      <ul>
        <li>To call you back at the time you asked for, and to give you the free review.</li>
        <li>To prepare your balance sheet and written plan, and to review it with you.</li>
        <li>To carry out what you ask us to do with fund houses, insurers and banks.</li>
        <li>To keep the records that the rules for mutual fund distributors require.</li>
      </ul>
    ),
  },
  {
    id: "consent",
    title: "Your consent",
    body: (
      <p>
        We use your personal data with your consent, under the Digital Personal Data Protection Act, 2023. You give it when you send us your details. You can
        withdraw it at any time by writing to {site.email}; we then stop using your data, except where the law requires us to keep it.
      </p>
    ),
  },
  {
    id: "who-sees-it",
    title: "Who can see it",
    body: (
      <>
        <ul>
          <li>Our team, to serve you.</li>
          <li>The companies that run our email, host this website and host our database, only to carry and store it for us.</li>
          <li>Fund houses, their registrars, KYC agencies, insurers and banks, only when you ask us to act for you, and only what that needs.</li>
          <li>Regulators and authorities, when the law requires it.</li>
        </ul>
        <p>We never sell your data, and never share it for anyone else&apos;s marketing.</p>
      </>
    ),
  },
  {
    id: "storage",
    title: "Where it is kept, and cookies",
    body: (
      <>
        <p>
          When you send the form, your details are emailed to our inbox and saved in our database, which is hosted by Neon in {site.dataRegion}. This website does
          not create an account for you, or use advertising or tracking cookies.
        </p>
        <p>We keep what you share with us securely and let only the people who serve you see it.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        If you become a client, we keep your records for as long as we serve you and then for as long as the rules for mutual fund distributors, insurance and
        lending require. If you do not, we delete your call-back details when you ask us to, or once we no longer need them.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>
          You can ask us what personal data we hold about you, have it corrected or completed, have it erased, withdraw your consent, and nominate someone to
          act for you. Write to {site.email}. We reply within the timelines on our <Link href="/grievance">grievance page</Link>.
        </p>
        <p>If you are not satisfied with our reply, you can approach the Data Protection Board of India.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children and family members",
    body: (
      <p>
        A family plan can include details of children and other family members. We collect them only from a parent or the family member who works with us, and
        only for the plan.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this notice",
    body: <p>If we change this notice, we update this page and the date at the top.</p>,
  },
];

/** /privacy: what the new website collects (a name, a number, an email, an optional time) and why. */
export default function PrivacyPage() {
  return (
    <LegalPage
      label="Privacy"
      title="Privacy notice"
      intro={<p>You will tell us a lot about your family&apos;s money. This page explains, in plain words, what we collect, why, and the choices you have.</p>}
      sections={SECTIONS}
    />
  );
}
