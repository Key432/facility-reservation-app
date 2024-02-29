/* NOTE: layout.tsxは名前の通り、レイアウトやメタデータを定義するためのものです。
  総てのpage.tsxはlayout.tsxに内部でラップされます。
  また、`app`配下以外のディレクトリにも配置でき、その場合は、そのディレクトリより下の階層のpage.tsxがラップされます。
*/

import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/bases/RootLayout';

// NOTE: `title.template`を用いることで簡単にページごとの<title>を設定できます
// メタデータは`metadata.tsx`で切り出すことも可能です。
export const metadata: Metadata = {
  title: {
    template: '%s | 設備予約デモ',
    default: '設備予約デモ',
  },
  description: '設備予約サイトのデモアプリ',
  // デモアプリをVercelでデプロイするため検索に引っかからないようにする設定
  // 実際にはいらないと思います
  robots: {
    index: false,
  },
};

// NOTE: ルーティングによるディレクトリ構成と分離するためただ一つだけ`component`ディレクトリから呼び出します。
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Layout>{children}</Layout>;
}
