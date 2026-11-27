import type { Faq } from "./service-pages";
import { site } from "./site";

/**
 * What the Corporates page says. The same four things we do for families, for a company and its people: surplus cash in mutual funds, the
 * paperwork and statements across fund houses, insurance, loans, property, and sessions for employees. As a distributor
 * we help choose schemes and carry out the transactions; no rates, returns or "treasury advisory" anywhere.
 */

export type CorpArea = {
  slug: string;
  title: string;
  line: string;
  items: readonly string[];
  /** The service page with more on this area, if there is one. */
  more?: { href: string; label: string };
};

export const CORP_AREAS: readonly CorpArea[] = [
  {
    slug: "surplus-cash",
    title: "Surplus cash",
    line: "Money the company will need soon, kept in funds matched to when it is needed.",
    items: [
      "Overnight and liquid funds, for money needed within days or weeks",
      "Money market and ultra-short duration funds, for a few months",
      "Short duration and arbitrage funds, for reserves held longer",
      "Matched to your calendar: salaries, GST, advance tax and payments to suppliers",
    ],
    more: { href: "/investments", label: "More on investments" },
  },
  {
    slug: "statements",
    title: "Paperwork and statements",
    line: "One team for every fund house, and statements your accounts team and auditors can use.",
    items: [
      "Company KYC: the board resolution, authorised signatories and beneficial owners",
      "Purchases, redemptions and switches across fund houses, through one team",
      "One statement of holdings and transactions across fund houses, at month-end or whenever you need it",
      "Capital gains statements at year-end, for your CA and auditors",
    ],
  },
  {
    slug: "insurance",
    title: "Insurance for the business",
    line: "Cover for your premises, goods, vehicles and people, renewed on time and claimed with our help.",
    items: [
      "Fire and property: offices, shops, factories and godowns",
      "Marine: goods in transit, for one trip or on an open policy",
      "Group mediclaim and group personal accident, for your employees",
      "Workmen's compensation, public liability and machinery breakdown",
      "Motor fleets, and contractors' all risk for construction",
    ],
    more: { href: "/insurance", label: "More on insurance" },
  },
  {
    slug: "loans",
    title: "Loans for the business",
    line: "What banks offer for your company, compared, with the paperwork followed until disbursal.",
    items: [
      "Working capital: cash credit and overdraft limits",
      "Term loans for machinery, expansion and premises",
      "Loans against property, and lease rental discounting",
      "Commercial vehicle loans and construction finance",
    ],
    more: { href: "/loans", label: "More on loans" },
  },
  {
    slug: "property",
    title: "Property",
    line: "Offices, shops, warehouses and land: buying, selling and investing, with the right experts alongside.",
    items: [
      "Finding and buying premises for the company",
      "Selling property the company no longer needs",
      "Commercial property as an investment",
      "Opinions from chartered accountants, architects and lawyers where a decision needs them",
    ],
    more: { href: "/real-estate", label: "More on real estate" },
  },
  {
    slug: "people",
    title: "Your people",
    line: "Sessions for your employees, and the same care for the people who run the company.",
    items: [
      "Talks at your office or online on the basics: an emergency fund, health cover, SIPs and tax",
      "Help for any employee who wants to start: KYC, SIPs set for salary day, and nominations",
      "A free review for any employee and their family, if they ask for one",
      "For promoters and directors: your own family's investments, insurance, loans and property",
    ],
    more: { href: "/family", label: "Planning for families" },
  },
];

/** Who the page is for. */
export const CORP_WHO = ["Small and medium businesses (SMEs)", "Private and public limited companies", "LLPs", "Partnership firms", "Proprietors", "Trusts", "Family businesses"] as const;

/**
 * The example at the top of the page: a company's surplus, split by when each part is needed. Made-up figures, and no
 * returns, only the kind of fund each part could sit in.
 */
export const CORP_EXAMPLE = {
  title: "Surplus cash, matched to when it is needed",
  rows: [
    { when: "This month", need: "Salaries, GST and suppliers", fund: "Overnight and liquid funds", amount: "₹1.5 Cr" },
    { when: "In 3 months", need: "Advance tax", fund: "Money market funds", amount: "₹1 Cr" },
    { when: "In 9 months", need: "New machinery", fund: "Ultra-short and low duration funds", amount: "₹2.5 Cr" },
    { when: "A year or more", need: "Reserve", fund: "Short duration and arbitrage funds", amount: "₹3 Cr" },
  ],
  total: "₹8 Cr",
  note: "An example, with made-up figures. Which funds, and how much in each, is decided with your finance team.",
} as const;

export const CORP_STEPS = [
  { title: "A first meeting", line: "With the owners or your finance team: what the company holds, what comes in and goes out, and who signs." },
  { title: "A note on paper", line: "Which funds or covers, how much in each, what each costs and what the risks are. Your CA confirms the tax." },
  { title: "Your company decides", line: "Your board or partners approve. Your signatories authorise every transaction, and money moves only from the company's own bank account." },
  { title: "We look after it", line: "Transactions when you ask, statements when you need them, renewals on time, and a review on a schedule you set." },
] as const;

export const CORP_FAQS: readonly Faq[] = [
  {
    q: "How quickly can the company get its money back?",
    a: "Most liquid and overnight funds pay out on the next business day, and other funds within three working days. Some charge an exit load if you redeem early; we set this out before you invest.",
  },
  {
    q: "Are debt funds as safe as a fixed deposit?",
    a: "No. Debt funds are not deposits, and their value can fall, for example when interest rates rise or a borrower defaults. Overnight and liquid funds carry the least of these risks, but not none. We set out the risks of each fund in writing before you invest.",
  },
  {
    q: "What does the company need to open an account?",
    a: "Usually its PAN, the certificate of incorporation or registration, the memorandum and articles (or the partnership or trust deed), a board resolution or letter of authority, the authorised signatories with their KYC, and a declaration of beneficial owners. We send you the exact list for your kind of entity.",
  },
  {
    q: "Can trusts and societies invest in mutual funds?",
    a: "It depends on the law they are registered under and on their own deed or bye-laws. We check this with your CA before anything is invested.",
  },
  {
    q: "How are the company's investments taxed?",
    a: "It depends on the type of fund and how long it is held, and the rules change. We set out how each option is taxed today, and your CA confirms it for the company.",
  },
  {
    q: "Do employees' details stay private?",
    a: "Yes. An employee who speaks to us does so for themselves, and we never share what they hold with the company.",
  },
];

export const CORP_FINE = [
  "Debt and liquid funds carry interest rate, credit and liquidity risks. They are not bank deposits, and their value can go down as well as up.",
  "How an investment is taxed depends on the type of fund, how long it is held and the kind of entity. Please confirm it with your chartered accountant.",
  site.insuranceSolicitation,
  site.lenderNote,
] as const;
