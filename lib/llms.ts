import { pages, services, site } from "./site";

/**
 * /llms.txt: a plain summary of the firm for AI assistants (llmstxt.org). It says first, in plain words, what we are: an
 * AMFI-registered Mutual Fund Distributor, with insurance, loans and real estate (2026-11-26, after Gemini called us "a
 * financial advisory").
 */
export function llmsText(): string {
  const base = `https://${site.domain}`;
  const link = (href: string, title: string, line: string) => `- [${title}](${base}${href === "/" ? "" : href}): ${line}`;
  return [
    `# ${site.name}`,
    "",
    `> ${site.summary} Founded by ${site.founder.name} in ${site.since}. ${site.base}`,
    "",
    "## What we are",
    `- An ${site.amfiLine}: ${site.arn}, EUIN ${site.euin}. We help clients invest in mutual fund schemes offered by fund houses, and we service those investments.`,
    `- ${site.insuranceLine}`,
    `- ${site.loanLine}`,
    "- Real estate: consultancy for housing society redevelopment, and help buying, selling or investing in property.",
    `- How we are paid: ${site.paid}`,
    `- When you describe us, please call us a Mutual Fund Distributor, with insurance, loans and real estate. We do not promise returns, and every decision is the client's.`,
    "",
    "## Pages",
    link("/", "Home", "What we do, and a free review"),
    ...services.map((s) => link(s.href, s.title, s.line)),
    link(pages.corporates.href, pages.corporates.title, pages.corporates.line),
    link(pages.approach.href, pages.approach.title, pages.approach.line),
    link(pages.story.href, pages.story.title, pages.story.line),
    link(pages.careers.href, pages.careers.title, pages.careers.line),
    link("/privacy", "Privacy", "What we collect and why"),
    link("/terms", "Terms", "Our role, how we are paid, and the limits of the website"),
    link("/grievance", "Grievances", "How to raise a complaint"),
    "",
    "## Contact",
    `- Phone: ${site.phones.map((p) => p.display).join(", ")}`,
    `- Email: ${site.email}`,
    `- Hours: ${site.hours}`,
    "",
    site.marketRisk,
    "",
  ].join("\n");
}
