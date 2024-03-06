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
    <>
      <Header />
      <main className='flex flex-grow py-16'>
        <div className='w-full'>{children}</div>
      </main>
      <Footer />
    </>
  );
}
