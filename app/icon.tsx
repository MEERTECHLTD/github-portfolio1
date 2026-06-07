import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5eead4, #818cf8 55%, #e879f9)',
          color: '#060608',
          fontSize: 36,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        M
      </div>
    ),
    { ...size },
  )
}
