/* Social cards, drawn at build time. One per page. */
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const f = (pkg: string, file: string) => readFileSync(require.resolve(`${pkg}/files/${file}`));
const fonts = [
  { name: "Instrument Serif", data: f("@fontsource/instrument-serif", "instrument-serif-latin-400-normal.woff"), weight: 400 as const, style: "normal" as const },
  { name: "Geist", data: f("@fontsource/geist-sans", "geist-sans-latin-500-normal.woff"), weight: 500 as const, style: "normal" as const },
  { name: "Geist Mono", data: f("@fontsource/geist-mono", "geist-mono-latin-500-normal.woff"), weight: 500 as const, style: "normal" as const },
];
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });
export interface Card { kicker: string; title: string; foot?: string }
export async function renderCard({ kicker, title, foot = "sm.meertech.tech" }: Card): Promise<Buffer> {
  const size = title.length > 60 ? 64 : title.length > 34 ? 84 : 112;
  const tree = h("div", { width: 1200, height: 630, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 68px", backgroundColor: "#0a0b0f", fontFamily: "Geist", color: "#ece9e1" }, [
    h("div", { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }, [
      h("div", { display: "flex", alignItems: "center", gap: 14 }, [h("div", { width: 14, height: 14, borderRadius: 7, backgroundColor: "#ff5a36", display: "flex" }), h("div", { display: "flex" }, "Mahmud Sani Madobi")]),
      h("div", { display: "flex", fontFamily: "Geist Mono", fontSize: 18, letterSpacing: 1.6, color: "#8a877f", textTransform: "uppercase" }, "AI systems engineer · Abuja"),
    ]),
    h("div", { display: "flex", flexDirection: "column", gap: 20 }, [
      h("div", { display: "flex", fontFamily: "Geist Mono", fontSize: 20, letterSpacing: 2, color: "#ff5a36", textTransform: "uppercase" }, kicker),
      h("div", { display: "flex", fontFamily: "Instrument Serif", fontSize: size, lineHeight: 1.0, letterSpacing: -2, maxWidth: 1040 }, title),
    ]),
    h("div", { display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(236,233,225,0.18)", paddingTop: 22, fontFamily: "Geist Mono", fontSize: 18, letterSpacing: 1.4, color: "#b1aea6", textTransform: "uppercase" }, [h("div", { display: "flex" }, foot), h("div", { display: "flex", color: "#8a877f" }, "Founder and CEO, MeerTech Ltd")]),
  ]);
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return Buffer.from(new Resvg(svg).render().asPng());
}
