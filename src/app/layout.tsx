/*
  NOTE: layout.tsxは名前の通り、レイアウトやメタデータを定義するためのものです。
  すべてのpage.tsxはlayout.tsxに内部でラップされます。
  また、`app`配下以外のディレクトリにも配置でき、その場合は、そのディレクトリより下の階層のpage.tsxがラップされます。
  https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
*/
/*
  NOTE: layout.tsxと似た役割のファイルにtemplate.tsxがあります。
  どちらも配置されているディレクトリ配下のpage.tsxをラップして配置します。
  違いは、layout.tsxはページを最初に表示したときにレンダリングし、それ以降ページを遷移をしても再レンダリングされません。
  template.tsxは画面を遷移するたびにレンダリングされます。
  https://nextjs.org/docs/app/api-reference/file-conventions/template
*/

import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/bases/RootLayout';
import { notoSansJP } from '@/style/fonts';

// NOTE: `title.template`を用いることで簡単にページごとの<title>を設定できます
// メタデータは`metadata.ts`で切り出したり動的に生成することも可能です。
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
// htmlとbodyはここに記載します。出ないと、LayoutコンポーネントのテストをするときにvalidateDOMNesting(...)エラーが発生します
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className='flex min-h-screen flex-col'>
      <body className={`flex min-h-screen flex-col ${notoSansJP.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
