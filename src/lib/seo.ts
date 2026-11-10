/* Structured data. One @graph per page. The Person node carries a stable @id
   and sameAs only for profiles the owner controls. No awards, ratings,
   publications or credentials are asserted that are not on the page. */
import { SITE, CREDENTIALS, EDUCATION } from "../data/site";
import type { Project } from "../data/projects";
import { STATUS } from "../data/projects";

export const abs = (p: string) => (p.startsWith("http") ? p : SITE.origin + p);
export const PERSON_ID = `${SITE.origin}/#person`;
const ORG_ID = "https://www.meertech.tech/#organization";
const WEB_ID = `${SITE.origin}/#website`;
export interface Crumb { name: string; href: string }

export const person = () => ({
  "@type": "Person", "@id": PERSON_ID, name: SITE.name, alternateName: ["Mahmud Madobi", "Sani Mahmud Madobi", "Mahmud Sani"], url: SITE.origin,
  image: `${SITE.origin}/mahmud.jpg`, jobTitle: "Founder and CEO", description: SITE.description,
  worksFor: { "@type": "Organization", "@id": ORG_ID, name: "MeerTech Ltd", url: SITE.company },
  address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
  alumniOf: EDUCATION.filter((e) => /University/.test(e.where)).map((e) => ({ "@type": "CollegeOrUniversity", name: e.where })).filter((v, i, a) => a.findIndex((x) => x.name === v.name) === i),
  hasCredential: CREDENTIALS.filter((c) => !/member/i.test(c.what)).map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.what, recognizedBy: { "@type": "Organization", name: c.where } })),
  knowsAbout: ["AI systems engineering", "software architecture", "backend engineering", "distributed systems", "double-entry ledger systems", "offline-first architecture", "energy and metering software", "geospatial systems", "Model Context Protocol", "PostgreSQL"],
  knowsLanguage: ["en", "ha"],
  sameAs: [SITE.github, SITE.linkedin, SITE.company],
});
export const website = () => ({ "@type": "WebSite", "@id": WEB_ID, url: SITE.origin, name: `${SITE.name}: portfolio`, publisher: { "@id": PERSON_ID }, inLanguage: "en" });
export const webPage = (o: { path: string; title: string; description: string; type?: string }) => ({
  "@type": o.type ?? "WebPage", "@id": `${abs(o.path)}#webpage`, url: abs(o.path), name: o.title, description: o.description, isPartOf: { "@id": WEB_ID }, about: { "@id": PERSON_ID }, inLanguage: "en",
  ...(o.type === "ProfilePage" ? { mainEntity: { "@id": PERSON_ID } } : {}),
});
export const breadcrumbs = (path: string, crumbs: Crumb[]) => ({ "@type": "BreadcrumbList", "@id": `${abs(path)}#breadcrumb`, itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.href) })) });
export const projectSchema = (p: Project, path: string) => {
  const live = p.links?.find((l) => !/meertech\.tech|github\.com/.test(l.href));
  const repo = p.links?.find((l) => /github\.com/.test(l.href));
  return {
    "@type": live && p.status === "production" ? "SoftwareApplication" : "CreativeWork", "@id": `${abs(path)}#work`, name: p.name, description: p.summary, url: abs(path),
    creator: { "@id": PERSON_ID }, creativeWorkStatus: STATUS[p.status].label, keywords: p.stack.join(", "),
    ...(live && p.status === "production" ? { applicationCategory: "BusinessApplication", sameAs: [live.href] } : {}),
    ...(repo ? { codeRepository: repo.href } : {}),
  };
};
export const article = (o: { path: string; title: string; description: string; date: string; words: number }) => ({
  "@type": "TechArticle", "@id": `${abs(o.path)}#article`, headline: o.title, description: o.description, datePublished: o.date, dateModified: o.date,
  author: { "@id": PERSON_ID }, publisher: { "@id": PERSON_ID }, mainEntityOfPage: { "@id": `${abs(o.path)}#webpage` }, wordCount: o.words, inLanguage: "en", image: `${SITE.origin}/og/${o.path.replace(/^\//, "").replace(/\//g, "-")}.png`,
});
export const graph = (...n: (object | null | false | undefined)[]) => JSON.stringify({ "@context": "https://schema.org", "@graph": n.filter(Boolean) });
