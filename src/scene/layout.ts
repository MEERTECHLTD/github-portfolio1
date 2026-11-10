/* The systems map as data: where each domain hub and each project sits in
   space. Pure functions, used twice: by the three.js engine, and at build time
   to draw the static SVG that stands in when WebGL is unavailable. Because
   both read this file, the fallback shows exactly the same structure. */
import { projects, DOMAINS, STATUS, type Domain, type Status } from "../data/projects";

export interface MapNode { id: string; kind: "hub" | "project"; label: string; x: number; y: number; z: number; r: number; status?: Status; statusLabel?: string; href?: string; domains: Domain[] }
export interface MapEdge { a: number; b: number; primary: boolean }

const ORDER: Domain[] = ["energy", "finance", "ai", "data", "tooling"];
const HUB_R = 6.4;
const GOLDEN = 2.399963;

export function buildMap(): { nodes: MapNode[]; edges: MapEdge[] } {
  const nodes: MapNode[] = [];
  const edges: MapEdge[] = [];
  const hub: Record<string, number> = {};
  ORDER.forEach((d, i) => {
    const a = (i / ORDER.length) * Math.PI * 2 - Math.PI / 2;
    hub[d] = nodes.length;
    nodes.push({ id: d, kind: "hub", label: DOMAINS[d].label, x: Math.cos(a) * HUB_R, y: (i % 2 ? 0.9 : -0.7), z: Math.sin(a) * HUB_R, r: 0.34, domains: [d] });
  });
  // Hubs are joined in a ring: the domains are one practice, not five.
  ORDER.forEach((d, i) => edges.push({ a: hub[d]!, b: hub[ORDER[(i + 1) % ORDER.length]!]!, primary: false }));

  const seen: Record<string, number> = {};
  for (const p of projects) {
    const d0 = p.domains[0]!;
    const h = nodes[hub[d0]!]!;
    const k = (seen[d0] = (seen[d0] ?? 0) + 1);
    const ang = k * GOLDEN + ORDER.indexOf(d0);
    const rad = 1.5 + (1 - p.weight) * 2.4 + (k % 2) * 0.35;
    let x = h.x + Math.cos(ang) * rad, z = h.z + Math.sin(ang) * rad, y = h.y + Math.sin(k * 1.7) * 1.7 + (p.weight - 0.6) * 1.6;
    // A system that spans two domains is pulled toward the second, so it visibly bridges them.
    const d1 = p.domains[1];
    if (d1) { const g = nodes[hub[d1]!]!; x += (g.x - x) * 0.26; z += (g.z - z) * 0.26; y += (g.y - y) * 0.2; }
    const idx = nodes.length;
    nodes.push({ id: p.slug, kind: "project", label: p.name, x, y, z, r: 0.14 + p.weight * 0.16, status: p.status, statusLabel: STATUS[p.status].label, href: `/work/${p.slug}`, domains: p.domains });
    p.domains.forEach((d, i) => edges.push({ a: idx, b: hub[d]!, primary: i === 0 }));
  }
  return { nodes, edges };
}

/* Fixed three-quarter projection for the static figure. */
export function project2d(n: { x: number; y: number; z: number }, w: number, h: number) {
  const az = 0.62, el = 0.5;
  const x1 = n.x * Math.cos(az) - n.z * Math.sin(az);
  const z1 = n.x * Math.sin(az) + n.z * Math.cos(az);
  const y1 = n.y * Math.cos(el) - z1 * Math.sin(el);
  const depth = n.y * Math.sin(el) + z1 * Math.cos(el);
  const s = Math.min(w, h) / 21;
  return { x: w / 2 + x1 * s, y: h / 2 - y1 * s, depth };
}
