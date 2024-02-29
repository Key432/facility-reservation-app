import Link from 'next/link';
import PageLayout from '@/components/bases/PageLayout';

/*
  NOTE: カスタムコンポーネントで囲った場合、子要素はカスタムコンポーネントの`children`という属性に渡されます
*/
export default function Menu() {
  return (
    <PageLayout title='予約メニュー'>
      <div className='flex h-full flex-grow flex-col items-center justify-center'>
        <Link
          href='/reservation/register'
          className='my-10 rounded-md  bg-[#FF99D6] px-20 py-4 hover:bg-[#FF0099]'
        >
          予約登録
        </Link>
        <Link
          href='/reservation/list'
          className='my-10 rounded-md  bg-[#FF99D6] px-20 py-4 hover:bg-[#FF0099]'
        >
          予約確認
        </Link>
        <Link
          href='/reservation/facilities'
          className='my-10 rounded-md  bg-[#FF99D6] px-20 py-4 hover:bg-[#FF0099]'
        >
          施設一覧
        </Link>
      </div>
    </PageLayout>
  );
}
