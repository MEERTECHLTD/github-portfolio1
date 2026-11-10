import type { APIRoute } from "astro";
import { SITE } from "../data/site";
export const GET: APIRoute = () => new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
