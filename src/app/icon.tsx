/*
  NOTE: faviconは`favicon.ico`などを`/app`直下に置くだけでなく、コードで生成することもできます。
  `icon.tsx`を`/app`直下に配置し、`ImageResponse`を使用て決まった名前の定数をexportすることで生成します
  https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
*/

import { ImageResponse } from 'next/og';

// Route Segment Config
export const runtime = 'edge';

// アイコンのメタデータ
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        📅
      </div>
    ),
    {
      ...size,
    },
  );
}
