import { notoSansJP } from '@/style/fonts';
import Header from '../Header';
import Footer from '../Footer';

// NOTE: トップレベルのclassNameで使うフォントを設定する必要があります
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className='h-full'>
      <body className={`h-full ${notoSansJP.variable} flex flex-col`}>
        <Header />
        <main className='my-16 h-full'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
