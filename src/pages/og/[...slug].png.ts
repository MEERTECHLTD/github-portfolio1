import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderCard, type Card } from "../../lib/og";
import { projects, STATUS } from "../../data/projects";
export const getStaticPaths: GetStaticPaths = async () => {
  const cards: Record<string, Card> = {
    home: { kicker: "Portfolio", title: "Building intelligent systems for the real world." },
    work: { kicker: "Work", title: "The work, and how far each piece got." },
    writing: { kicker: "Writing", title: "Notes from systems that shipped." },
    resume: { kicker: "Résumé", title: "AI systems engineer and software architect." },
  };
  for (const p of projects) cards[`work-${p.slug}`] = { kicker: `${STATUS[p.status].label} · Case study`, title: p.name, foot: `sm.meertech.tech/work/${p.slug}` };
  for (const n of await getCollection("writing")) cards[`writing-${n.id}`] = { kicker: n.data.category, title: n.data.title };
  return Object.entries(cards).map(([slug, card]) => ({ params: { slug }, props: { card } }));
};
export const GET: APIRoute = async ({ props }) => new Response(new Uint8Array(await renderCard((props as { card: Card }).card)), { headers: { "content-type": "image/png" } });
