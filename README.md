# sm.meertech.tech

The personal site of Mahmud Sani Madobi: AI systems engineer, software architect, founder and CEO of MeerTech Ltd.

A static Astro site. Every page is HTML at build time. The interactive 3D systems map is a separate chunk that loads after the page is usable, and an SVG version of the same map is in the page for every case where WebGL is not.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local development |
| `npm run build` | Refresh the GitHub snapshot, then build into `dist/` |
| `npm run check` | Strict type check |
| `npm test` | 17 checks on the built site |
| `npm run verify` | check, build, test. Run before merging |

## Deploying

`main` is the production branch. Vercel (project `portfolio`, team `meertech`) builds and deploys every push to `main` to https://sm.meertech.tech. Work on a branch, open a pull request, merge.

## Where things are

| Path | What it is |
|---|---|
| `src/data/projects.ts` | Every system: status, summary, problem, architecture pipeline, decisions, security, evidence |
| `src/data/site.ts` | Identity, experience, education, credentials, stack |
| `src/data/github.json` | Public GitHub footprint, measured by `scripts/github.mjs` before each build |
| `src/content/writing/*.md` | Engineering notes |
| `src/scene/` | The systems map: `layout.ts` (positions, shared by the SVG and the engine), `engine.ts` (three.js), `boot.ts` (lazy loader) |
| `src/lib/seo.ts` | JSON-LD: Person, ProfilePage, WebSite, BreadcrumbList, SoftwareApplication or CreativeWork, TechArticle |
| `scripts/tests/site.test.mjs` | The checks |

## Rules this site keeps

1. **Status comes from evidence.** Production means in use today. Substantial, functional and prototype mean what `src/data/projects.ts` says they mean. Nothing is upgraded ahead of the evidence, and each project page states its evidence.
2. **Some organisations are described, not named.** The tests fail the build if a name on the do-not-name list appears.
3. **No invented numbers.** GitHub figures are measured from public endpoints and dated. Forks are counted as forks. Private repositories are not counted.
4. **No personal phone number.** Contact is by email, LinkedIn and GitHub.
5. **No em dashes.**

## The GitHub snapshot

`scripts/github.mjs` reads public REST endpoints (no token needed; set `GITHUB_TOKEN` in the build environment to raise the rate limit). If GitHub is unreachable or rate limited, the committed snapshot is kept and the page shows the date it was measured.

## Regenerating the résumé PDF

`public/mahmud-sani-madobi-resume.pdf` is the `/resume` page printed to A4. After changing the résumé data, open `/resume` in a browser, print to PDF and replace the file.
