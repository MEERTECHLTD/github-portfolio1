import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { site, siteUrl } from '@/lib/site'
import { pageMeta } from '@/lib/seo'
import { Backdrop } from '@/components/layout/Backdrop'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/layout/ScrollProgress'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMeta({
    title: `${site.fullName}: AI systems engineer and software architect`,
    description: site.description,
    path: '/',
  }),
  applicationName: `${site.fullName}: portfolio`,
  authors: [{ name: site.fullName, url: siteUrl }],
  creator: site.fullName,
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '256x256' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#060608',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="me" href={site.links.github} />
        <link rel="me" href={site.links.linkedin} />
      </head>
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
