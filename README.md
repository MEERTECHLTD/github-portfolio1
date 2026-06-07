# Mahmud Madobi — Portfolio

A world-class engineering portfolio for **Mahmud Madobi** (Sani Mahmud Madobi) — AI Systems Engineer and Founder & CEO of **[Meertech Ltd](https://meertech.tech)**, building production AI, energy-access, and fintech infrastructure from Abuja, Nigeria.

Dark, premium, motion-driven, accessible, and SEO-optimized — built to make recruiters, investors, accelerators, and research labs immediately understand the depth of the work.

---

## ✦ Stack

| Layer        | Choice                                                        |
| ------------ | ------------------------------------------------------------ |
| Framework    | Next.js 15 (App Router, RSC) + TypeScript                    |
| Styling      | Tailwind CSS 3 + custom design system (glassmorphism, aurora)|
| Motion       | Framer Motion (scroll reveals, layout animation, marquee)   |
| Fonts        | Geist Sans + Geist Mono                                       |
| Content      | Evidence-grounded data layer (`/content`)                    |
| Résumé       | MDX-style Markdown rendered via `react-markdown` + `remark-gfm` |
| GitHub       | Resilient live public-profile fetch + curated footprint     |
| SEO          | Metadata API, dynamic OG image (`next/og`), sitemap, robots |
| Deploy       | Vercel-optimized                                             |

## ✦ How the content was produced

This is not template copy. Every project card, résumé bullet, and skill is grounded in a **real audit of the GitHub account (90+ original repositories, including private ones)**. A multi-agent analysis pipeline read each flagship repo's actual code — migrations, CI/CD workflows, Dockerfiles, source files — and produced evidence-cited profiles under strict integrity rules:

- **No fabricated metrics.** Numbers appear only when they exist in the code (e.g. _66 Supabase migrations_, _9 GitHub Actions workflows_ — both independently verified).
- **Evidence sets the altitude.** A repo is described as a "substantial system" or an "early build" based on what the code actually shows.
- **Client confidentiality.** Private/client work is described at a safe, generic altitude with no names, secrets, or internal URLs, and no links to private code.

## ✦ Structure

```
app/
  layout.tsx            # root: fonts, metadata, backdrop, nav, footer
  page.tsx              # home — composes all sections (RSC, async)
  resume/page.tsx       # résumé hub (4 tailored variants)
  opengraph-image.tsx   # dynamic social card
  icon.tsx              # generated monogram favicon
  sitemap.ts robots.ts globals.css
components/
  layout/   # Backdrop, Nav, Footer, ScrollProgress
  ui/       # Reveal, Section, SpotlightCard, Marquee
  sections/ # Hero, Footprint, Focus, Projects, Skills, Experience, Research, Philosophy, Contact
  resume/   # ResumeView (variant switcher + print-to-PDF)
content/
  data.json # generated, evidence-grounded content
  index.ts  # typed exports + derived pillars/education/certs
  types.ts
lib/
  site.ts   # single source of truth: identity, contact, links
  github.ts # live profile fetch + curated footprint
  utils.ts
```

## ✦ Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

## ✦ Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected.
3. Set environment variables (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — your canonical domain (e.g. `https://sm.meertech.tech`).
   - `GITHUB_TOKEN` — _optional_, raises the GitHub API rate limit for live stats.
4. Add your custom domain in the Vercel dashboard and point DNS to it.

> The site builds fully static (with one on-demand route for the OG image) and works without any environment variables — live GitHub stats gracefully fall back to curated figures.

## ✦ Editing content

All copy lives in `content/data.json` and `content/index.ts`; identity and contact details live in `lib/site.ts`. Update those and the entire site reflows. To add or refresh a project, edit the `projects` array in `content/data.json`.

---

© 2026 Sani Mahmud Madobi · Founder, [Meertech Ltd](https://meertech.tech)
