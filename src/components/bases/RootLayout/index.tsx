import { notoSansJP } from '@/style/fonts';
import Header from '../Header';
import Footer from '../Footer';

// NOTE: トップレベルのclassNameで使うフォントを設定する必要があります
// TailwindCSSの記法でフォントを指定するためにtailwind.config.tsで設定しています
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja' className='flex min-h-screen flex-col'>
      <body className={`flex min-h-screen flex-col ${notoSansJP.variable}`}>
        <Header />
        <main className='flex flex-grow py-16'>
          <div className='w-full'>{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
