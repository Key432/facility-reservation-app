import type { Config } from 'tailwindcss';

const config: Config = {
  // NOTE: 独自のディレクトリ構成にTailwindCSSを適用するため変更しています
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        // NOTE: className="text-noto"と指定することでNoto Sansを指定できるようになります。
        noto: [
          'var(--font-noto-sans)',
          'Arial',
          'Hiragino Kaku Gothic ProN',
          'Hiragino Sans',
          'Meiryo',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
export default config;
