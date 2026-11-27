import { site, type ServiceSlug } from "./site";

/**
 * What each service page says. Short sentences, one idea per line, no rates, returns or comparisons with named firms. Every
 * page has the same parts, in this order: what we help with, how it works, questions (if any), the free consultation,
 * then the fine print for that service (the registrations and the market-risk line are in the footer of every page, so
 * they are not repeated here).
 */

export type Offer = { title: string; line: string };
export type Step = { title: string; line: string };
export type Faq = { q: string; a: string; link?: { href: string; label: string } };

export type ServicePage = {
  slug: ServiceSlug;
  label: string;
  /** The heading: plain words, then the part in italics. */
  title: [string, string];
  lede: string;
  meta: { title: string; description: string };
  /**
   * Which of site.phones is shown first on this page (0 or 1), so each service can lead with the person who handles it.
   * Both numbers are always shown.
   */
  callFirst: 0 | 1;
  offersTitle: string;
  offers: readonly Offer[];
  steps: readonly Step[];
  /**
   * Questions and answers. A page with none leaves the section out. How the firm is paid is on the Terms page rather
   * than in a "fee" question on each page.
   */
  faqs: readonly Faq[];
  /** The fine print for this service, one item per line. */
  fine: readonly string[];
  closing: { title: [string, string]; lede: string };
};

export const SERVICE_PAGES: Record<ServiceSlug, ServicePage> = {
  investments: {
    slug: "investments",
    label: "Investments",
    title: ["Investments, each held ", "for a goal you can name."],
    lede: "Mutual funds, SIFs and structured products, chosen against your balance sheet and your goals. We tell you what to keep in what you already hold, add what is missing, and review it with you every year.",
    meta: {
      title: "Mutual funds, SIPs, SIFs and structured products",
      description: "Mutual funds, SIPs, SIFs and structured products, each held for a goal, with a written plan and a review every year. Free review.",
    },
    callFirst: 0,
    offersTitle: "Every kind of investment a family needs, and nothing it does not.",
    offers: [
      { title: "Mutual funds", line: "Equity, debt, hybrid and index funds. Each one is picked for a specific goal, and for how soon that money is needed." },
      { title: "SIPs", line: "A fixed amount every month towards each goal, stepped up every year as your income grows." },
      { title: "Large sums, in stages", line: "Money from a sale, a bonus or a maturing FD is first parked in a debt fund, then moved into equity a little each month, rather than all at once." },
      { title: "Income in retirement", line: "A steady monthly income paid out of your investments through a systematic withdrawal plan (SWP), worked out so the money lasts." },
      { title: "SIFs", line: "Specialised Investment Funds, for investments of ₹10 lakh or more. They can use strategies that regular mutual funds are not allowed to." },
      { title: "Structured products", line: "For larger portfolios. What they can pay, when, and in which situations you could lose money, set out in writing before you invest." },
      { title: "Tax-saving funds", line: "On the old tax regime, ELSS funds save tax under Section 80C. We pick ones that also work towards one of your goals, not just to save tax in March." },
      { title: "What you already hold", line: "We review the funds you already have, wherever you bought them. If they are right for your goals, we say so and leave them alone." },
    ],
    steps: [
      { title: "A free review", line: "Thirty minutes on what you own, what you owe, and what each of you is working towards." },
      { title: "Your balance sheet, marked", line: "Every holding checked against your goals: what is right, and what can be improved." },
      { title: "A written plan", line: "Which funds, how much, for which goal, and why. You decide, in your own time." },
      { title: "You invest, we look after it", line: "You approve each transaction by OTP, money goes from your bank to the fund house, and we review it with you every year." },
    ],
    faqs: [],
    fine: [
      "SIFs and structured products carry risks of their own. Please read the offer documents before you invest.",
      "Past performance may or may not be sustained in future, and is not a guide to what an investment will do.",
    ],
    closing: { title: ["Talk to us about ", "your investments."], lede: "Leave your name, number and email. We call you, review what you hold, and tell you what is right and what can be improved." },
  },

  insurance: {
    slug: "insurance",
    label: "Insurance",
    title: ["Cover for your family, your home ", "and your business."],
    lede: "Health, motor, home and business cover. We compare policies across insurers, explain what each covers and what it leaves out, renew on time, and stay with you when you claim.",
    meta: {
      title: "Health, motor, home and business insurance",
      description: "Health, motor, home, fire, marine and business insurance through an IRDAI-licensed agent: policies explained plainly, renewed on time, and help when you claim.",
    },
    callFirst: 1,
    offersTitle: "Policies we can help with.",
    offers: [
      { title: "Health and mediclaim", line: "For you, your spouse, children and parents. Individual or family floater, with a top-up when the cover is too low." },
      { title: "Motor", line: "Cars, two-wheelers, commercial vehicles and fleets. Comprehensive or third-party, renewed before it lapses." },
      { title: "Home", line: "The building and what is inside it, against fire, flood, theft and other damage." },
      { title: "Group mediclaim", line: "Health cover for your employees, and their families if you choose." },
      { title: "Fire", line: "Shops, offices, factories and godowns, against fire and allied perils." },
      { title: "Marine", line: "Goods in transit by road, rail, sea or air, for one trip or on an open policy." },
      { title: "Workmen's compensation", line: "Your liability as an employer if a worker is injured or killed at work." },
      { title: "Contractors' all risk", line: "Construction projects: the works, materials, site equipment and damage to others." },
      { title: "Other business covers", line: "Shop and office packages, burglary, public liability, machinery breakdown and more." },
    ],
    steps: [
      { title: "Tell us what to cover", line: "Your family, vehicles, home or business, and any policies you already have." },
      { title: "We compare policies", line: "Across insurers: the premium, what each covers, and what it leaves out, in plain words." },
      { title: "You choose", line: "The insurer issues the policy in your name. You pay the insurer directly." },
      { title: "Renewals and claims", line: "We remind you before every renewal, and handle the forms and follow-up when you claim." },
    ],
    faqs: [
      { q: "Will you help when I make a claim?", a: "Yes: the forms, the documents and the follow-up with the insurer. The insurer decides the claim under the policy wording." },
      { q: "Can you review policies I already have?", a: "Yes. We tell you where your cover is right and where it falls short." },
      { q: "How soon does the cover start?", a: "As soon as you pay the premium. With health policies, some illnesses are covered only after a waiting period, which we explain before you buy." },
      { q: "Do you arrange life insurance?", a: "Not yet. We do review the life cover you already have, as part of your balance sheet." },
    ],
    fine: [
      "Every policy is issued by the insurance company, which decides on cover and claims under the policy wording. Please read the policy wording and its exclusions before you buy.",
      site.insuranceSolicitation,
    ],
    closing: { title: ["Talk to us about ", "your cover."], lede: "Leave your name, number and email. We call you, review the cover you have, and show you what is right and what falls short." },
  },

  loans: {
    slug: "loans",
    label: "Loans",
    title: ["The right loan, ", "from the right bank."],
    lede: "We compare what banks offer for your profile, help you choose, handle the paperwork and follow up until the money is disbursed. We also check the loan against your balance sheet, so it fits the rest of your plan.",
    meta: {
      title: "Home, business and property loans",
      description: "Home loans, loans against property, business, car and education loans, compared across major banks, with the paperwork handled until disbursal.",
    },
    callFirst: 0,
    offersTitle: "Loans we can help with.",
    offers: [
      { title: "Home loan", line: "To buy, build, extend or repair your home." },
      { title: "Balance transfer", line: "Move your home loan or loan against property to a bank offering better terms, with a top-up if you need one." },
      { title: "Loan against property", line: "Against a home, shop or office you own, for business or personal needs." },
      { title: "Business loan", line: "Term loans for expansion, machinery, premises and other business needs." },
      { title: "Working capital", line: "Cash credit and overdraft limits for day-to-day business needs." },
      { title: "Car loan", line: "New and used cars, and commercial vehicles." },
      { title: "Education loan", line: "For studies in India or abroad." },
      { title: "Personal loan", line: "Unsecured loans for salaried and self-employed people." },
      { title: "Something else", line: "Construction finance, lease rental discounting and more. Tell us what you need." },
    ],
    steps: [
      { title: "Tell us what you need", line: "The amount, the purpose, and what you already owe." },
      { title: "We compare banks", line: "Their offers for your profile, side by side: rate, fees, tenure and prepayment charges." },
      { title: "We handle the paperwork", line: "We collect the documents, file the application and follow up with the bank." },
      { title: "Disbursal, and after", line: "Later, we tell you when moving the loan or prepaying part of it makes sense." },
    ],
    faqs: [
      { q: "Which banks do you work with?", a: "Major public and private sector banks. You see their offers side by side before you choose." },
      { q: "Who decides on my loan?", a: site.lenderNote },
      { q: "Can you move my loan to a lower rate?", a: "If another bank offers better terms for your profile, yes, through a balance transfer. We show you the cost of switching first." },
      { q: "Should I prepay my home loan or invest?", a: "It depends on your rate, your tax and your goals. We work it out on your balance sheet and show you both options." },
    ],
    fine: [site.lenderNote, "Please read the bank's sanction letter and loan agreement before you sign, including the charges for paying early."],
    closing: { title: ["Talk to us about ", "your loan."], lede: "Leave your name, number and email. We call you, understand what you need, and come back with what the banks offer." },
  },

  "real-estate": {
    slug: "real-estate",
    label: "Real estate",
    title: ["The right property, ", "and the right people."],
    lede: "Consultancy for housing society redevelopment, and help buying, selling or investing in property. We bring in chartered accountants, architects and lawyers where a decision needs them, and check it against your balance sheet before you commit.",
    meta: {
      title: "Redevelopment consultancy, and buying, selling or investing in property",
      description: "Consultancy for housing society redevelopment, with CAs, architects and lawyers, and help buying, selling or investing in property.",
    },
    callFirst: 0,
    offersTitle: "The right property, and the right people around every decision.",
    offers: [
      { title: "Redevelopment consultancy", line: "For housing societies and their members: feasibility, choosing a developer, comparing offers and the agreement, from the first meeting to possession." },
      { title: "Opinions from experts", line: "Chartered accountants, architects, lawyers and other specialists, brought in where a decision needs them, so you hear every side before you sign." },
      { title: "Buying a home", line: "What you can afford without straining other goals, where to look, what a fair price is, and the home loan alongside." },
      { title: "Investing in property", line: "Rent, costs and how easily you can sell, compared with what the same money could do elsewhere." },
      { title: "Property abroad", line: "Property in other countries. We connect you with the right people and help you send the money from India within RBI's rules." },
      { title: "Selling", line: "Timing, price and paperwork, and a plan for the money after the sale." },
    ],
    steps: [
      { title: "Tell us what you are planning", line: "A redevelopment, a purchase, a sale or an investment: the place, the budget and the timing." },
      { title: "We check your balance sheet", line: "What it does to your other goals, loans and cash, before you commit." },
      { title: "We bring in the right people", line: "Chartered accountants, architects, lawyers, and our partners in other markets, as the decision needs." },
      { title: "You decide", line: "With every opinion in front of you. We stay with you until it is done." },
    ],
    faqs: [
      { q: "What does redevelopment consultancy cover?", a: "The feasibility of the project, choosing a developer, comparing offers (the extra area, the corpus, the rent while it is built and the timelines), and the development agreement, with an architect, a chartered accountant and a lawyer alongside." },
      { q: "Can we see an example of your work?", a: "Yes. A sample is available on request. Call us or write to us, and we will share one." },
      { q: `Do you help outside ${site.city}?`, a: "Yes, across India." },
      { q: "Can I buy property abroad from India?", a: "Yes. Resident Indians can send money abroad for property under RBI's Liberalised Remittance Scheme, within its yearly limit. We go through the limit, the tax and the paperwork with you first." },
    ],
    fine: [
      "The sale or purchase of a property is always between you and the other party. Opinions from chartered accountants, architects and lawyers are their own, given in their professional capacity.",
      "Before you buy, check the title, the approvals and the project's registration with your own lawyer. Property abroad is bought under the laws of that country, and money sent from India is subject to RBI's rules.",
    ],
    closing: { title: ["Talk to us about ", "a property."], lede: "Leave your name, number and email. We call you, understand what you are planning, and ask for a sample of our work if you would like one." },
  },

  family: {
    slug: "family",
    label: "Family",
    title: ["Reviews and planning ", "for the whole family."],
    lede: "One balance sheet for the household, a goal for each person, and a written investment policy statement that sets out how your family's money is invested, and why. Reviewed with you every year.",
    meta: {
      title: "Reviews and planning for the whole family",
      description: "A family balance sheet, goals for each person and a written investment policy statement, reviewed with you every year. Free review.",
    },
    callFirst: 1,
    offersTitle: "Everyone in the family, in one written plan.",
    offers: [
      { title: "A family balance sheet", line: "Everything the household owns and owes, in one place, set against each person's goals." },
      { title: "An investment policy statement", line: "Written rules for your family's money: what each goal needs, how much risk you accept, and how it is invested." },
      { title: "Goals for each person", line: "Children's education, your retirement, your parents' care. Each with a date, an amount and money set aside." },
      { title: "Protection", line: "Health and other cover checked for every member, so one hospital bill does not undo the plan." },
      { title: "Nominations", line: "The right nominee on every folio, policy and account, checked every year." },
      { title: "Family abroad", line: "Members living outside India in the same plan, with the paperwork NRIs need." },
    ],
    steps: [
      { title: "One conversation", line: "With whoever manages the family's money, or with all of you together." },
      { title: "One balance sheet", line: "Everything the household owns and owes, and every person's goals, in one place." },
      { title: "A written plan", line: "Your investment policy statement: what each goal needs, and how its money is invested." },
      { title: "A yearly review", line: "And a call whenever life changes: a new job, a wedding, a child, a move abroad." },
    ],
    faqs: [
      { q: "What is an investment policy statement?", a: "A short document, agreed with you, that sets out your goals, the risk you are comfortable with, and how money is invested for each goal. Every change is saved as a new version, so you can see how the plan has changed over the years." },
      { q: "Can each member have a separate plan?", a: "Yes. Each person's investments stay in their own name and also appear on the family balance sheet, so nothing is counted twice or missed." },
      { q: "We already work with someone for part of this. Is that a problem?", a: "Not at all. We include it in the balance sheet, and if it is right, we leave it alone." },
    ],
    fine: [
      "Planning is a free service provided as part of our mutual fund distribution. A plan is based on what you tell us, and on assumptions we write down for you. It is reviewed with you, and it is not a promise of returns.",
    ],
    closing: { title: ["Talk to us about ", "your family."], lede: "Leave your name, number and email. We call you, starting with whoever manages the family's money." },
  },
};
