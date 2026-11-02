import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Ampledia — Digital | Creative | Growth';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  let base64Logo = '';
  try {
    const imageBuffer = readFileSync(join(process.cwd(), 'public', 'assets', 'logo.png'));
    base64Logo = `data:image/png;base64,${imageBuffer.toString('base64')}`;
  } catch {
    // fallback if file not readable
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #1A0F33 0%, #0A0614 70%, #05030A 100%)',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Subtle grid border frame */}
        <div
          style={{
            position: 'absolute',
            inset: '24px',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '24px',
            display: 'flex',
          }}
        />

        {/* Ambient Top Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            width: '600px',
            height: '300px',
            background: 'rgba(124, 58, 237, 0.25)',
            filter: 'blur(100px)',
            borderRadius: '1000px',
          }}
        />

        {/* Brand Logo & Name Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {base64Logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={base64Logo}
              alt="Logo"
              width="80"
              height="80"
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
            />
          ) : null}
          <div
            style={{
              fontSize: '32px',
              fontFamily: 'sans-serif',
              fontWeight: 800,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#F5F0FF',
            }}
          >
            Ampledia
          </div>
        </div>

        {/* Hero Tagline */}
        <div
          style={{
            fontSize: '56px',
            fontFamily: 'sans-serif',
            fontWeight: 800,
            color: '#F5F0FF',
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '900px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>Your Brand Deserves More.</span>
          <span
            style={{
              background: 'linear-gradient(90deg, #A855F7, #C084FC, #DDD6FE)',
              backgroundClip: 'text',
              color: 'transparent',
              fontStyle: 'italic',
            }}
          >
            Digital | Creative | Growth
          </span>
        </div>

        {/* Pillar Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '36px',
          }}
        >
          <div
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              backgroundColor: 'rgba(36, 20, 69, 0.8)',
              color: '#DDD6FE',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Strategy
          </div>
          <div
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              backgroundColor: 'rgba(36, 20, 69, 0.8)',
              color: '#DDD6FE',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Creativity
          </div>
          <div
            style={{
              padding: '8px 24px',
              borderRadius: '9999px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              backgroundColor: 'rgba(36, 20, 69, 0.8)',
              color: '#DDD6FE',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Growth
          </div>
        </div>

        {/* Footer Attribution */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '14px',
            color: '#B7A9D6',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}
        >
          Bhilwara, Rajasthan • ampledia.in • (formerly Rollix Media)
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

