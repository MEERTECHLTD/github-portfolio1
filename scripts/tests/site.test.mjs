/* Checks on the built site. Run: npm test (after npm run build). */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { parse } from "node-html-parser";

const DIST = new URL("../../dist/", import.meta.url).pathname;
const ORIGIN = "https://sm.meertech.tech";
assert.ok(existsSync(DIST), "dist/ not found: run `npm run build` first");
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(DIST);
const pages = files.filter((f) => f.endsWith(".html")).map((file) => {
  const rel = "/" + relative(DIST, file);
  const path = rel === "/index.html" ? "/" : rel.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  const html = readFileSync(file, "utf8");
  return { path, html, root: parse(html) };
});
const indexable = pages.filter((p) => !/noindex/.test(p.root.querySelector('meta[name="robots"]')?.getAttribute("content") ?? ""));
const exists = (u) => { const c = decodeURIComponent(u.split("#")[0].split("?")[0]); return c === "/" || c === "" || [c, c + ".html", join(c, "index.html")].some((x) => existsSync(join(DIST, x)) && statSync(join(DIST, x)).isFile()); };
const all = pages.map((p) => p.html).join("\n") + readFileSync(join(DIST, "llms.txt"), "utf8");

test("expected pages exist", () => {
  for (const m of ["/", "/work", "/writing", "/resume", "/work/ranawallet", "/work/clearmind", "/work/exportflow", "/work/aditusos", "/work/meridian-books", "/work/agricultural-intelligence", "/work/nmas", "/work/maizeguard"]) assert.ok(pages.some((p) => p.path === m), `missing ${m}`);
  assert.ok(pages.length >= 24);
});
test("unique titles and descriptions of sensible length", () => {
  const t = new Map(), d = new Map();
  for (const p of pages) {
    const title = p.root.querySelector("title")?.text.trim() ?? "", desc = p.root.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    assert.ok(title.length >= 15 && title.length <= 72, `${p.path}: title length ${title.length}`);
    assert.ok(desc.length >= 60 && desc.length <= 170, `${p.path}: description length ${desc.length}`);
    assert.ok(!t.has(title), `${p.path}: duplicate title`); t.set(title, 1);
    assert.ok(!d.has(desc), `${p.path}: duplicate description`); d.set(desc, 1);
  }
});
test("one h1 per page and no skipped heading levels", () => {
  for (const p of pages) {
    assert.equal(p.root.querySelectorAll("h1").length, 1, `${p.path}: h1 count`);
    let prev = 0;
    for (const h of p.root.querySelectorAll("h1, h2, h3, h4")) { const l = Number(h.tagName[1]); assert.ok(prev === 0 || l <= prev + 1, `${p.path}: h${prev} to h${l} ("${h.text.trim().slice(0, 30)}")`); prev = l; }
  }
});
test("canonical is self-referencing and og:url agrees", () => {
  for (const p of indexable) {
    const c = p.root.querySelector('link[rel="canonical"]')?.getAttribute("href");
    assert.equal(c, ORIGIN + p.path, `${p.path}: canonical ${c}`);
    assert.equal(p.root.querySelector('meta[property="og:url"]')?.getAttribute("content"), c);
  }
});
test("social card exists for every page", () => {
  for (const p of pages) { const i = p.root.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? ""; assert.ok(i.startsWith(ORIGIN) && exists(i.slice(ORIGIN.length)), `${p.path}: og image ${i}`); }
});
test("images have alt and dimensions", () => {
  for (const p of pages) for (const img of p.root.querySelectorAll("img")) { assert.ok(img.getAttribute("alt") !== undefined, `${p.path}: img without alt`); assert.ok(img.getAttribute("width") && img.getAttribute("height"), `${p.path}: img without dimensions`); }
});
test("internal links and anchors resolve", () => {
  for (const p of pages) for (const a of p.root.querySelectorAll("a[href]")) {
    const h = a.getAttribute("href");
    if (h.startsWith("/")) { assert.ok(exists(h), `${p.path}: broken link ${h}`); const [path, id] = h.split("#"); if (id) { const t = pages.find((x) => x.path === (path || "/")); assert.ok(t?.root.querySelector(`[id="${id}"]`), `${p.path}: anchor ${h} has no target`); } }
    if (h.startsWith("#") && h.length > 1) assert.ok(p.root.querySelector(`[id="${h.slice(1)}"]`), `${p.path}: anchor ${h}`);
    assert.ok(!/^http:/.test(h), `${p.path}: insecure link ${h}`);
  }
});
test("no orphan pages", () => {
  const linked = new Set(pages.flatMap((p) => p.root.querySelectorAll("a[href]").map((a) => a.getAttribute("href").split("#")[0])));
  for (const p of indexable) if (p.path !== "/") assert.ok(linked.has(p.path), `${p.path} is not linked`);
});
test("sitemap matches the indexable pages; robots points at it", () => {
  const locs = [...readFileSync(join(DIST, "sitemap.xml"), "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
  assert.deepEqual(locs, indexable.map((p) => ORIGIN + p.path).sort());
  assert.match(readFileSync(join(DIST, "robots.txt"), "utf8"), /Sitemap: https:\/\/sm\.meertech\.tech\/sitemap\.xml/);
});
test("structured data: one Person with a stable id, ProfilePage on home, valid JSON", () => {
  for (const p of pages) {
    const blocks = p.root.querySelectorAll('script[type="application/ld+json"]');
    assert.equal(blocks.length, 1, `${p.path}: JSON-LD blocks`);
    const g = JSON.parse(blocks[0].text)["@graph"], types = g.map((n) => n["@type"]);
    assert.equal(types.filter((t) => t === "Person").length, 1, `${p.path}: Person count`);
    assert.equal(g.find((n) => n["@type"] === "Person")["@id"], `${ORIGIN}/#person`);
    for (const banned of ["aggregateRating", "review", "award", "telephone"]) assert.ok(!blocks[0].text.includes(`"${banned}"`), `${p.path}: asserts ${banned}`);
    if (p.path === "/") assert.ok(types.includes("ProfilePage"));
    if (p.path.startsWith("/work/")) assert.ok(types.includes("SoftwareApplication") || types.includes("CreativeWork"));
    if (p.path.startsWith("/writing/")) assert.ok(types.includes("TechArticle"));
  }
});
test("organisations that must not be named are not named", () => {
  for (const re of [/jigawa/i, /offgrid/i, /national bureau of statistics/i, /\bNBS\b/]) assert.doesNotMatch(all, re, `the built site contains ${re}`);
});
test("no phone numbers, no unverified credentials, no stale claims", () => {
  for (const re of [/\+234/, /tel:/, /t\.me\//, /HCIA/, /90\+/, /95\.35/, /Harvard/i, /real on-chain trades/i]) assert.doesNotMatch(all, re, `the built site contains ${re}`);
});
test("no em dashes in published copy", () => { assert.ok(!all.includes("—")); });
test("every project page states a status and its evidence", () => {
  for (const p of pages.filter((x) => x.path.startsWith("/work/"))) { assert.ok(p.root.querySelector(".phero .status"), `${p.path}: no status`); assert.match(p.root.querySelector("main").text, /Evidence/, `${p.path}: no evidence row`); }
});
test("research and prototype work is not described as production", () => {
  const m = pages.find((p) => p.path === "/work/maizeguard");
  assert.ok(m.root.querySelector(".phero .status-prototype"));
  const a = pages.find((p) => p.path === "/work/aditusos");
  assert.ok(a.root.querySelector(".phero .status-substantial"), "AditusOS must not be shown as production");
});
test("no third-party resources; the 3D engine is a lazy chunk", () => {
  for (const p of pages) for (const el of p.root.querySelectorAll("script[src], link[rel=stylesheet], link[rel=preload]")) { const u = el.getAttribute("src") ?? el.getAttribute("href"); assert.ok(u.startsWith("/"), `${p.path}: third-party ${u}`); }
  const engine = files.filter((f) => /\/_a\/engine\.[^/]+\.js$/.test(f));
  assert.equal(engine.length, 1);
  for (const p of pages) assert.ok(!p.html.includes(engine[0].split("/").pop() + '"></script>'), `${p.path}: engine loaded eagerly`);
});
test("the static systems map links every project, so it works without WebGL", () => {
  const home = pages.find((p) => p.path === "/");
  const links = home.root.querySelectorAll(".sm-svg a").map((a) => a.getAttribute("href"));
  assert.equal(links.length, pages.filter((p) => p.path.startsWith("/work/")).length);
});
