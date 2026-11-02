import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  const imageBuffer = readFileSync(join(process.cwd(), 'public', 'assets', 'logo.png'));
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0614',
          borderRadius: '36px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={base64Image}
          alt="Ampledia Icon"
          width="130"
          height="130"
          style={{ width: '130px', height: '130px', objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}

