import { site } from "./site";

/**
 * Careers: the job profiles on /careers. People read them and, if they think they fit, email their
 * CV to site.careersEmail; nothing is submitted through the website. Whether a role is from home or at the office varies
 * by role and is discussed with each candidate, so it is not stated per role.
 *
 * Titles avoid the names an AMFI-registered Mutual Fund Distributor may not use for itself: "Planning Associate", not
 * "Financial Planner". Research and economics are for our own team; nothing is published as research.
 */

export type Role = {
  slug: string;
  title: string;
  line: string;
  does: readonly string[];
  needs: readonly string[];
  plus: readonly string[];
};

export const ROLES: readonly Role[] = [
  {
    slug: "client-relationship-manager",
    title: "Client Relationship Manager",
    line: "Looking after a set of families over years: their reviews, their questions, and everything they need from us.",
    does: [
      "Be the first person a family calls, for anything.",
      "Run yearly reviews with the planning team, and follow up on what was agreed.",
      "Bring together investments, insurance, loans and property, so each family deals with one person.",
      "Welcome new families who come through referrals and the free review.",
    ],
    needs: [
      "A graduate, with two years or more in client service at a bank, a distributor or an insurer.",
      "NISM Series V-A, or the willingness to clear it within three months of joining.",
      "Warm, reliable and clear, on the phone and in person.",
    ],
    plus: ["An existing network of families or businesses.", "CFP certification or CFA Program candidates."],
  },
  {
    slug: "research-analyst",
    title: "Research Analyst",
    line: "The numbers behind every recommendation: funds, SIFs and structured products, studied for our own team.",
    does: [
      "Track mutual fund schemes, SIFs and structured products: their portfolios, costs, risks and behaviour across market cycles.",
      "Build and maintain our internal shortlist, with a short note on why each one is on it.",
      "Prepare the figures behind each family's balance sheet and plan.",
      "Follow changes in SEBI and AMFI rules, and in tax, and tell the team what they mean.",
    ],
    needs: [
      "A degree in finance, commerce, economics, statistics or engineering.",
      "Strong Excel, and comfort with large sets of data.",
      "Clear, plain writing.",
    ],
    plus: ["CFA Program candidates, or an MBA in finance.", "NISM Series V-A."],
  },
  {
    slug: "economist",
    title: "Economist",
    line: "What the economy is doing, and what it means for a family's money, in plain words for our team.",
    does: [
      "Follow the Indian and global economy: inflation, interest rates, growth, the rupee, and RBI and government policy.",
      "Write a short note for the team each month on what changed and why it matters.",
      "Help set the assumptions our plans use, such as inflation and interest rates, and review them every year.",
      "Brief the team before client reviews when markets move sharply.",
    ],
    needs: [
      "A master's degree in economics, or a bachelor's degree with strong relevant work.",
      "Comfort with data from the RBI, MOSPI and market sources.",
      "The ability to explain difficult ideas simply.",
    ],
    plus: ["Experience at a bank, a research house or a policy body."],
  },
  {
    slug: "planning-associate",
    title: "Planning Associate",
    line: "Turning what a family owns, owes and wants into a balance sheet and a written plan.",
    does: [
      "Prepare each family's balance sheet from their statements, policies and loan papers.",
      "Draft goal plans and investment policy statements for us to go through with the family.",
      "Join first reviews and yearly reviews, note what was agreed, and see it through.",
      "Keep plans up to date when a family's life changes.",
    ],
    needs: [
      "A degree in finance, commerce or economics.",
      "NISM Series V-A, or the willingness to clear it within three months of joining.",
      "Care with numbers, and patience and clarity with people.",
    ],
    plus: ["CFP certification or CFA Program candidates.", "Experience with a mutual fund distributor, an insurer or a bank."],
  },
  {
    slug: "insurance-executive",
    title: "Insurance Executive",
    line: "Health, motor, home and business policies: finding the right cover, renewing it on time, and seeing claims through.",
    does: [
      "Understand what a family or a business needs to cover, and compare policies across insurers.",
      "Explain what each policy covers and what it leaves out, in plain words.",
      "Track renewals so that no policy lapses, and handle changes to existing policies.",
      "Help clients through claims: the forms, the documents and the follow-up with the insurer.",
    ],
    needs: [
      "A graduate. Experience in general insurance, at an insurer, a broker or an agency, is preferred.",
      "Clear with clients, and careful with documents and dates.",
      "Good English, and Hindi or Marathi.",
    ],
    plus: ["An IRDAI licence or POSP certification.", "Experience with group mediclaim or fleet insurance."],
  },
  {
    slug: "loans-executive",
    title: "Loans Executive",
    line: "Home, business and property loans: comparing what banks offer, and seeing each loan through to disbursal.",
    does: [
      "Understand what a client needs, and what they already owe.",
      "Compare offers from banks for the client's profile: rate, fees, tenure and prepayment charges.",
      "Collect and check documents, file applications and follow up with the bank.",
      "Stay with the client until the loan is disbursed, and spot when a balance transfer makes sense later.",
    ],
    needs: [
      "A graduate, with experience in home loans or loans against property at a bank, an NBFC or a DSA.",
      "A working knowledge of income documents, property papers and credit reports.",
      "Persistent and organised with follow-up.",
    ],
    plus: ["Contacts in the credit and operations teams of banks.", "Experience with business loans and working capital."],
  },
  {
    slug: "property-associate",
    title: "Property Associate",
    line: "Helping families buy, sell or invest in property, with the numbers checked first.",
    does: [
      "Research projects and resale options against a client's budget, location and timing.",
      "Arrange site visits and meetings with developers, owners and our partners in other markets.",
      "Compare prices, costs and rental yields, and write a short note on each option.",
      "Track the paperwork through to registration, with the client's lawyer.",
    ],
    needs: [
      "A graduate, with experience in property sales, research or documentation.",
      `Knowledge of the ${site.city} property market, and of the basics of RERA.`,
      "Comfortable with numbers, and trustworthy with clients.",
    ],
    plus: ["Experience with property markets abroad.", "Experience with housing society redevelopment."],
  },
  {
    slug: "office-assistant",
    title: "Office Assistant",
    line: "The paperwork that keeps every client's investments, policies and loans in order.",
    does: [
      "Prepare KYC, application and transaction forms, and bank, address and nominee updates.",
      "Handle insurance renewals and claim documents, and collect loan documents.",
      "Keep client files and records organised and up to date.",
      "Follow up with fund houses, registrars, insurers and banks until each request is done.",
    ],
    needs: [
      "A graduate, or 12th pass with office experience.",
      "Comfort with email, Excel, scanning and PDFs.",
      "Careful, organised and good at following up.",
      "Good English, and Hindi or Marathi.",
    ],
    plus: ["Experience in a mutual fund, insurance or banking office."],
  },
];

/** The email someone sends to apply for a role: the role in the subject line. */
export function applyHref(email: string, roleTitle?: string): string {
  const subject = roleTitle ? `Application: ${roleTitle}` : "Application";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
