#!/usr/bin/env node
/* Measures the public GitHub footprint and writes src/data/github.json.

   Runs before every build. It reads public REST endpoints only, so nothing
   about private repositories can reach the site. If GITHUB_TOKEN is set in the
   build environment it is used to raise the rate limit; it is never written to
   the output. If GitHub is unreachable or rate limited, the previous snapshot
   is kept and the page shows the date it was measured. Nothing is estimated. */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const USER = "MEERTECHLTD";
/* Repositories left out of the "recent work" list: this site's own source, profile and empty repositories, and one that is under review. */
const SKIP = new Set(["github-portfolio", "github-portfolio1", "meertechnology01", "Nigeria-Music-Analytics-System-NMAS", "mids", "midspro", "Jules"]);
const OUT = new URL("../src/data/github.json", import.meta.url);
const headers = { accept: "application/vnd.github+json", "user-agent": "portfolio-build", ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
const get = async (path) => {
  const res = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(12000) });
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  return res.json();
};

try {
  const user = await get(`/users/${USER}`);
  const repos = (await get(`/users/${USER}/repos?per_page=100&type=owner&sort=pushed`)).filter((r) => !r.private);
  const originals = repos.filter((r) => !r.fork);
  const languages = {};
  let measured = 0;
  for (const r of originals) {
    const l = await get(`/repos/${USER}/${r.name}/languages`);
    if (Object.keys(l).length) measured++;
    for (const [k, v] of Object.entries(l)) languages[k] = (languages[k] ?? 0) + v;
  }
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  const snapshot = {
    measuredAt: new Date().toISOString().slice(0, 10),
    account: USER,
    profile: `https://github.com/${USER}`,
    publicRepos: user.public_repos,
    originals: originals.length,
    originalsWithCode: measured,
    forks: repos.length - originals.length,
    followers: user.followers,
    stars: repos.reduce((a, r) => a + r.stargazers_count, 0),
    languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, bytes]) => ({ name, share: +((bytes / total) * 100).toFixed(1) })),
    recent: originals.filter((r) => r.size > 0 && !SKIP.has(r.name)).slice(0, 6).map((r) => ({ name: r.name, url: r.html_url, language: r.language, pushedAt: r.pushed_at.slice(0, 10) })),
  };
  writeFileSync(OUT, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`github: measured ${snapshot.publicRepos} public repositories (${snapshot.originals} original, ${snapshot.forks} forks) on ${snapshot.measuredAt}`);
} catch (err) {
  if (!existsSync(OUT)) { console.error("github: no snapshot and GitHub is unreachable:", err.message); process.exit(1); }
  const prev = JSON.parse(readFileSync(OUT, "utf8"));
  console.warn(`github: could not refresh (${err.message}); keeping the snapshot measured on ${prev.measuredAt}`);
}
