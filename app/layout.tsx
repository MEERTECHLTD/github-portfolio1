import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { site, siteUrl } from '@/lib/site'
import { seo } from '@/content'
import { Backdrop } from '@/components/layout/Backdrop'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: seo.title,
    template: `%s · ${site.name}`,
  },
  description: seo.description,
  applicationName: `${site.name} · Portfolio`,
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  keywords: seo.keywords,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: seo.ogTitle,
    description: seo.ogDescription,
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.ogTitle,
    description: seo.ogDescription,
    creator: '@MEERTECHLtd',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
}

export const viewport: Viewport = {
  themeColor: '#060608',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>
        <Backdrop />
        <ScrollProgress />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
