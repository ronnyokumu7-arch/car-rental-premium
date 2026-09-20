import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#081529',
          color: '#c9a227',
          fontSize: '120px',
          fontFamily: 'serif',
          fontWeight: 700,
          letterSpacing: '-0.05em',
        }}
      >
        R
      </div>
    ),
    { ...size }
  );
}