import { Noto_Sans_JP } from 'next/font/google';

// NOTE: tailwind.config.tsにて`variable`を設定することで任意のタグにフォントを指定できます。
export const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans',
});
