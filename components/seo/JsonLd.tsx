import { breadcrumbs, graph, person, webPage, website, type Crumb } from '@/lib/seo'

interface JsonLdProps {
  path: string
  title: string
  description: string
  pageType?: string
  crumbs?: Crumb[]
  schema?: object[]
}

/** One schema.org @graph per page: Person, WebSite, the page, breadcrumbs and any page-specific nodes. */
export function JsonLd({ path, title, description, pageType, crumbs, schema = [] }: JsonLdProps) {
  const ld = graph(
    person(),
    website(),
    webPage({ path, title, description, type: pageType }),
    crumbs && crumbs.length > 1 ? breadcrumbs(path, crumbs) : null,
    ...schema,
  )
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld.replace(/</g, '\\u003c') }} />
}
