import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const alt = `${site.name} — ${site.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#060608',
          padding: '72px',
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
            right: -60,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 70%)',
          }}
        />

        {/* top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ededf0',
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ color: '#a1a1aa', fontSize: 26, letterSpacing: '0.04em' }}>{site.company}</div>
        </div>

        {/* main */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#ffffff', fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            {site.name}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 40,
              fontWeight: 600,
              backgroundImage: 'linear-gradient(110deg, #5eead4, #818cf8 45%, #e879f9)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            AI Systems Engineer &amp; Founder
          </div>
          <div style={{ marginTop: 22, color: '#a1a1aa', fontSize: 28, maxWidth: 900, lineHeight: 1.4 }}>
            Production AI, energy-access, and fintech infrastructure — built for African markets.
          </div>
        </div>

        {/* bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#71717a', fontSize: 24 }}>
          <span>{site.location}</span>
          <span>github.com/{site.githubUser}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
