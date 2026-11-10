# Mahmud Sani Madobi: portfolio

Source for [sm.meertech.tech](https://sm.meertech.tech), the portfolio of Mahmud Sani Madobi, AI systems engineer, software architect and founder of [MeerTech Ltd](https://www.meertech.tech).

## Stack

| Layer     | Choice                                                         |
| --------- | -------------------------------------------------------------- |
| Framework | Next.js 15 (App Router, static generation) and TypeScript      |
| Styling   | Tailwind CSS 3 with a small custom design system               |
| Motion    | Framer Motion                                                  |
| Fonts     | Geist Sans and Geist Mono                                      |
| Writing   | Markdown rendered with `react-markdown` and `remark-gfm`       |
| SEO       | Metadata API, JSON-LD, social cards (`next/og`), sitemap, robots, `llms.txt` |
| Deploy    | Vercel                                                         |

## Structure

```
app/
  layout.tsx            root: fonts, metadata, backdrop, nav, footer
  page.tsx              home, composed from the sections
  work/                 index and one case study per system
  writing/              index and articles
  resume/               HTML résumé with a PDF download
  og/[name]/            social cards, one per page
  llms.txt/ sitemap.ts robots.ts not-found.tsx
components/
  layout/   Backdrop, Nav, Footer, ScrollProgress
  ui/       Reveal, Section, SpotlightCard, Marquee, PageHeader
  sections/ Hero, Footprint, Focus, Projects, Skills, Experience, Research, Philosophy, Contact
  work/     StatusBadge, FlowDiagram
  seo/      JsonLd
content/
  site.ts       identity, experience, education, credentials, stack
  projects.ts   every system, with its status and evidence
  writing/*.md  articles
  github.json   measured snapshot of the public GitHub footprint
lib/
  site.ts seo.ts writing.ts github.ts utils.ts
```

## Content rules

All facts live in `content/`. Every system carries a status (production, substantial system, functional or prototype) that is stated from evidence, and organisations that have not agreed to be named are described, not named. No figure appears on the site unless it is counted from these records or read from the public GitHub API.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

## Environment

See `.env.example`. Both variables are optional.

- `NEXT_PUBLIC_SITE_URL`: the site URL used as the metadata base.
- `GITHUB_TOKEN`: raises the GitHub API rate limit for the live footprint. Without it, or if GitHub is unreachable, the site uses the snapshot in `content/github.json`.
