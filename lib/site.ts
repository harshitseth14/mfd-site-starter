/**
 * Everything the website says about the firm, in one place. Edit this file to make the site yours: name, city,
 * registrations, contact details, figures, your story and the services you offer. Every page, the structured data,
 * llms.txt and the emails read from here.
 *
 * The values below describe a fictional demo firm. Replace them all before you publish.
 */

const name = "Example Wealth & Insurance";
const since = 2010;
const city = "Nagpur";
const region = "Maharashtra";
const arn = "ARN-000000";

export const site = {
  name,
  /** Two letters used for the large mark in the footer and the icon. */
  short: "EW",
  /** The name in the header: the first part in bold, the rest lighter. */
  mark: ["Example", "Wealth & Insurance"] as const,
  domain: "example.com",
  since,
  city,
  region,
  /** ISO country code, for the structured data. */
  country: "IN",
  founder: { name: "A. Founder", initials: "AF", role: "Founder" },
  base: `Based in ${city}, serving families across India.`,
  /** Shown everywhere a phone number appears. Use non-breaking spaces ( ) so a number never splits across lines. */
  phones: [
    { display: "+91 00000 00001", tel: "+910000000001" },
    { display: "+91 00000 00002", tel: "+910000000002" },
  ],
  email: "info@example.com",
  careersEmail: "careers@example.com",
  /** The WhatsApp number, digits only, with the country code. */
  whatsapp: "910000000001",
  hours: "Monday to Saturday, 10 am to 7 pm.",
  hoursShort: "Mon to Sat, 10 am to 7 pm",
  afterHours: "Outside these hours? Leave your details and we will call you back.",

  // ── Registrations and compliance lines. Keep these accurate: they are what the regulators look for. ──
  /** AMFI's standard risk line, required wherever mutual funds are mentioned. */
  marketRisk: "Mutual fund investments are subject to market risks, read all scheme related documents carefully.",
  arn,
  euin: "E000000",
  amfiLine: "AMFI-registered Mutual Fund Distributor",
  /**
   * How search engines and AI assistants should sum the firm up: a distributor, never an adviser. Used for the homepage
   * description, the structured data and llms.txt.
   */
  summary: `A practice in ${city} since ${since}: insurance, loans, real estate, and mutual funds as an AMFI-registered Mutual Fund Distributor (${arn}).`,
  insuranceLine: "General insurance through an IRDAI-licensed insurance agent.",
  insuranceSolicitation: "Insurance is the subject matter of solicitation.",
  lenderNote: "Every loan is sanctioned by the bank at its own discretion; the interest rate, fees and terms are set by the bank.",
  loanLine: "Loans through public and private sector banks, as their Direct Selling Agent.",
  /** How the firm is paid, said plainly (shown on the Terms page and in answers about fees). */
  paid: "There is no fee to you. We are paid commissions by the fund houses, insurers and banks we work with. For property consultancy, such as a society's redevelopment, we agree the scope and any fee with you in writing before we start.",
  paidDetail:
    "Investments made through us are in the regular plan of each scheme. Regular plans carry a slightly higher expense ratio than direct plans; that difference pays our commission. Insurers pay us a commission on policies arranged through us, and banks pay us a fee on loans arranged through us.",
  /** Complaints: when you acknowledge and when you aim to resolve. */
  grievance: { acknowledgeWithinDays: 2, resolveWithinDays: 21 },
  /** Where the lead database is hosted, for the privacy notice. */
  dataRegion: "Singapore",
  /** The date the legal pages were last changed. */
  legalUpdated: "1 January 2026",

  // ── Figures and story. Only claim what you can stand behind. ──
  /** The figures on the homepage and Our story. `plain` shows a number without digit grouping (for a year). */
  stats: [
    { label: "Since", value: since, plain: true },
    { label: "Families", value: 500, suffix: "+" },
    { label: "Cities", value: 3 },
  ] as readonly { label: string; value: number; suffix?: string; plain?: boolean }[],
  /** How the team is described on Our story and Careers. */
  team: "a small team",
  story: {
    title: ["A family practice, ", `since ${since}.`] as const,
    lede: `A. Founder started the practice in ${since}. As the work grew, the first staff came on board. Today we look after families and businesses across ${region}.`,
    heading: "From one practice to many families.",
    paragraphs: [
      `A. Founder started the practice in ${since}, helping families and businesses with their insurance and their finances, and taking care of the claims, renewals and paperwork that came with them.`,
      "As the work grew, the first staff came on board. Word travelled from one client to the next.",
      "As we looked after our clients' insurance and loans, they asked us to look after more. So we added mutual funds, real estate, and services for companies. Today we look after all of it for our clients.",
    ] as readonly string[],
  },
  /**
   * Optional recognition (rankings, certifications, honours). The section on Our story appears only when this list has
   * items, so leave it empty rather than invent anything.
   */
  recognition: [] as readonly { title: string; line: string }[],
} as const;

/** Both numbers, with the one at index `first` on top (a page can lead with whichever number suits it). */
export function phonesInOrder(first: 0 | 1 = 0): readonly (typeof site.phones)[number][] {
  return first === 0 ? site.phones : [site.phones[1], site.phones[0]];
}

/** A WhatsApp chat link with a greeting already typed. */
export function whatsappHref(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type ServiceSlug = "investments" | "insurance" | "loans" | "real-estate" | "family";
export type Service = { slug: ServiceSlug; href: string; title: string; tag: string; line: string; menu: string; products: readonly string[] };

/** The services, each with its own page. The homepage and the header menu list them in this order. */
export const services: readonly Service[] = [
  {
    slug: "investments",
    href: "/investments",
    title: "Investments",
    tag: "Grow",
    menu: "Mutual funds, SIFs and structured products",
    line: "Mutual funds, SIFs and structured products, each held for a goal you can name.",
    products: ["Mutual funds", "SIPs", "SIFs", "Structured products"],
  },
  {
    slug: "insurance",
    href: "/insurance",
    title: "Insurance",
    tag: "Protect",
    menu: "Health, motor, home and business",
    line: "Health, motor, home and business cover, renewed on time and claimed with our help.",
    products: ["Health and mediclaim", "Motor", "Home and fire", "Business covers"],
  },
  {
    slug: "loans",
    href: "/loans",
    title: "Loans",
    tag: "Borrow",
    menu: "Home, business and property loans",
    line: "Home, business and property loans, compared across banks and followed to disbursal.",
    products: ["Home loans", "Loans against property", "Business loans", "Car and education"],
  },
  {
    slug: "real-estate",
    href: "/real-estate",
    title: "Real estate",
    tag: "Own",
    menu: "Redevelopment, buying and selling",
    line: "Redevelopment consultancy, and buying, selling or investing in property.",
    products: ["Redevelopment consultancy", "Buying and selling", "Investing", "Expert opinions"],
  },
  {
    slug: "family",
    href: "/family",
    title: "Family",
    tag: "Everyone",
    menu: "Reviews and planning for everyone",
    line: "Reviews and planning for the whole family: one balance sheet, and a written investment policy statement.",
    products: ["Family balance sheet", "Investment policy statement", "Goals for each person", "Nominations"],
  },
];

/** The other pages in the header and footer. */
export const pages = {
  corporates: { href: "/corporates", title: "Corporates", line: "Surplus cash, insurance, loans and property for companies" },
  approach: { href: "/approach", title: "Our approach", line: "The goal-based balance sheet" },
  story: { href: "/about", title: "Our story", line: `Founded by ${site.founder.name} in ${since}` },
  about: { href: "/#why", title: "Why us", line: `Since ${since}` },
  careers: { href: "/careers", title: "Careers", line: "Open roles, and how to apply" },
  consultation: { href: "/#begin", title: "Free review" },
} as const;
