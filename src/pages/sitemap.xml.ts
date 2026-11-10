import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { projects } from "../data/projects";
import { SITE } from "../data/site";
export const GET: APIRoute = async () => {
  const urls: { loc: string; lastmod?: string }[] = [{ loc: "/" }, { loc: "/work" }, { loc: "/writing" }, { loc: "/resume" }, ...projects.map((p) => ({ loc: `/work/${p.slug}` }))];
  for (const n of await getCollection("writing")) urls.push({ loc: `/writing/${n.id}`, lastmod: n.data.date.toISOString().slice(0, 10) });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.origin}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
};
