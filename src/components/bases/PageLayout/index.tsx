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
      <h1 className='my-10 text-6xl font-extrabold'>{title}</h1>
      <div className='container mx-auto h-full bg-white'>{children}</div>
    </div>
  );
}
