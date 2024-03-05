/*
  NOTE: `children`は特別なpropsで、カスタムコンポーネントタグで囲った子コンポーネントノードがわたります。
  これを使ってレイアウトを作成することができます
*/
export default function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full flex-col bg-gray-300 text-center'>
      <div className='py-5'>
        <h1 className='text-6xl font-extrabold'>{title}</h1>
      </div>
      <div className='mx-auto h-auto w-full max-w-6xl grow bg-white'>{children}</div>
    </div>
  );
}
