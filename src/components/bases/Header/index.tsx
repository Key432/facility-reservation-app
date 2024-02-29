import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-[#33CCBB]'>
      <div className='container mx-auto flex h-full w-full items-center justify-between'>
        <Link href='/'>
          <p className='font-noto py-4 text-lg font-bold'>設備予約デモ</p>
        </Link>
        {/* NOTE: v14からLinkは内部に<a>タグをラップするようになったのでh-fullでも背景が上下に伸びません。flexで対応しています */}
        <Link
          href='/login'
          className='flex h-full items-center bg-[#FF99D6] px-4 font-bold hover:bg-[#FF0099]'
        >
          ログイン
        </Link>
      </div>
    </header>
  );
}
