import { ImageResponse } from 'next/og'

export const alt = 'Las Vegas Strip high-rise condos — Dr. Jan Duffy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 72px',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1917 45%, #422006 100%)',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 600, color: '#facc15', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Las Vegas Strip
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, marginTop: 16 }}>
          High-Rise Condos
        </div>
        <div style={{ fontSize: 32, color: '#d4d4d8', marginTop: 24, maxWidth: 900 }}>
          Expert buyer guidance on Strip towers — Dr. Jan Duffy, BHHS Nevada Properties
        </div>
        <div style={{ fontSize: 26, color: '#facc15', marginTop: 40 }}>702-299-6607 · lasvegasstriphighrises.com</div>
      </div>
    ),
    { ...size }
  )
}
