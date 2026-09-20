import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Royride Car Hire — Rental Cars for Short-Term Use';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #081529 0%, #1a365d 100%)',
          color: '#faf9f7',
          fontFamily: 'serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Gold accent glow — single child, no display needed */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(201, 162, 39, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Content wrapper — MUST have display: flex */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'flex',
              fontSize: '20px',
              letterSpacing: '0.5em',
              color: '#c9a227',
              marginBottom: '40px',
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
            }}
          >
            Royride Car Hire
          </div>

          {/* Headline — single text child, no display needed */}
          <div
            style={{
              display: 'flex',
              fontSize: '86px',
              fontWeight: 400,
              lineHeight: 1.1,
              textAlign: 'center',
              letterSpacing: '-0.02em',
              marginBottom: '40px',
            }}
          >
            Rental Cars for Short-Term Use
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              color: 'rgba(250, 249, 247, 0.7)',
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            Nairobi · Kenya · Since 2016
          </div>

          {/* CTA badge */}
          <div
            style={{
              display: 'flex',
              marginTop: '60px',
              padding: '14px 32px',
              background: '#c9a227',
              color: '#081529',
              fontSize: '18px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              fontWeight: 600,
            }}
          >
            royride.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}