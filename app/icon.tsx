import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  // Read the local file and convert to base64
  const imageBuffer = readFileSync(join(process.cwd(), 'public', 'assets', 'logo.png'));
  const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={base64Image} 
          alt="Site Logo Icon"
          width="64" 
          height="64" 
          style={{ 
            width: '64px', 
            height: '64px',
            objectFit: 'contain'
          }} 
        />
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
