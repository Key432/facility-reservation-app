import { notoSansJP } from '@/style/fonts';

// NOTE: トップレベルのclassNameで使うフォントを設定する必要があります
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className='h-full'>
      <body className={`h-full ${notoSansJP.variable}`}>{children}</body>
    </html>
  );
}
