/* Social cards, drawn at build time. One per page, at /og/<name>.png. */
import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { SITE } from '@/content/site'
import { projects, STATUS } from '@/content/projects'
import { getNotes } from '@/lib/writing'

export const dynamic = 'force-static'
export const dynamicParams = false

interface Card {
  kicker: string
  title: string
}

function cards(): Record<string, Card> {
  const all: Record<string, Card> = {
    home: { kicker: SITE.role, title: SITE.tagline },
    work: { kicker: 'Work', title: 'The work, and how far each piece got.' },
    writing: { kicker: 'Writing', title: 'Notes from systems that shipped.' },
    resume: { kicker: 'Résumé', title: SITE.name },
  }
  for (const p of projects) all[`work-${p.slug}`] = { kicker: `Case study · ${STATUS[p.status].label}`, title: p.name }
  for (const n of getNotes()) all[`writing-${n.slug}`] = { kicker: n.category, title: n.title }
  return all
}

export const generateStaticParams = () => Object.keys(cards()).map((id) => ({ name: `${id}.png` }))

export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const card = cards()[(await params).name.replace(/\.png$/, '')]
  if (!card) return new Response('Not found', { status: 404 })

  const photo = readFileSync(join(process.cwd(), 'public', 'mahmud.jpg'))
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`
  const size = card.title.length > 44 ? 50 : card.title.length > 24 ? 62 : 78

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#060608', position: 'relative' }}>
        {/* aurora blooms */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -80,
            width: 520,
            height: 520,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.45), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -160,
            right: 220,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,234,212,0.30), transparent 70%)',
          }}
        />

        {/* left: text column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '70px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={photoSrc}
              alt=""
              width={52}
              height={52}
              style={{ borderRadius: 12, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            <div style={{ color: '#a1a1aa', fontSize: 24, letterSpacing: '0.04em' }}>{SITE.name}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                backgroundImage: 'linear-gradient(110deg, #5eead4, #818cf8 45%, #e879f9)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {card.kicker}
            </div>
            <div
              style={{
                marginTop: 16,
                color: '#ffffff',
                fontSize: size,
                fontWeight: 700,
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                maxWidth: 640,
              }}
            >
              {card.title}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, color: '#71717a', fontSize: 22 }}>
            <span>{SITE.title}</span>
            <span>sm.meertech.tech</span>
          </div>
        </div>

        {/* right: portrait */}
        <div style={{ display: 'flex', alignItems: 'center', paddingRight: 70 }}>
          <div
            style={{
              display: 'flex',
              width: 360,
              height: 470,
              borderRadius: 28,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.16)',
              boxShadow: '0 30px 80px -20px rgba(129,140,248,0.45)',
            }}
          >
            <img src={photoSrc} alt="" width={360} height={470} style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
