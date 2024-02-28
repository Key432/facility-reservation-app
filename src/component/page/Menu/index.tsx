import Link from 'next/link';

export default function Menu() {
  return (
    <div className='flex h-full flex-col text-center'>
      <h1 className='my-20 text-6xl font-extrabold'>予約メニュー</h1>
      <div className='container mx-auto mt-10 flex flex-grow flex-col items-center justify-center bg-gray-100'>
        <Link
          href='/'
          className='my-10 rounded-md  bg-[#FF99D6] px-20 py-4 hover:bg-[#FF0099]'
        >
          予約登録
        </Link>
        <Link
          href='/'
          className='my-10 rounded-md  bg-[#FF99D6] px-20 py-4 hover:bg-[#FF0099]'
        >
          予約確認
        </Link>
        <Link
          href='/'
          className='my-10 rounded-md  bg-[#FF99D6] px-20 py-4 hover:bg-[#FF0099]'
        >
          施設一覧
        </Link>
      </div>
    </div>
  );
}
