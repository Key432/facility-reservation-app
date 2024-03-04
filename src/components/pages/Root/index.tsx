import Link from 'next/link';

export default function Root() {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <h1 className='font-noto text-xl font-extrabold md:text-4xl'>
        設備予約アプリケーションデモサイト
      </h1>
      <Link
        href='/facilities'
        className='my-10 w-1/2 rounded-lg bg-[#FF99D6] p-4 text-center font-bold hover:bg-[#FF0099]'
      >
        施設一覧
      </Link>
      <p className='text-base md:text-xl'>質問は清水のTeamsまでよろしくお願いします。</p>
    </div>
  );
}
