import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import { site } from '@/lib/site'

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  const photo = readFileSync(join(process.cwd(), 'public', 'mahmud.jpg'))
  const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#060608',
          position: 'relative',
        }}
      >
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '70px',
            flex: 1,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={photoSrc}
              alt=""
              width={52}
              height={52}
              style={{ borderRadius: 12, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.15)' }}
            />
            <div style={{ color: '#a1a1aa', fontSize: 24, letterSpacing: '0.04em' }}>{site.company}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#ffffff', fontSize: 78, fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.03em' }}>
              {site.name}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 38,
                fontWeight: 600,
                backgroundImage: 'linear-gradient(110deg, #5eead4, #818cf8 45%, #e879f9)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI Systems Engineer &amp; Founder
            </div>
            <div style={{ marginTop: 20, color: '#a1a1aa', fontSize: 25, maxWidth: 540, lineHeight: 1.4 }}>
              Production AI, energy-access &amp; fintech infrastructure — built for African markets.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, color: '#71717a', fontSize: 22 }}>
            <span>{site.location}</span>
            <span>github.com/{site.githubUser}</span>
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
    { ...size },
  )
}
