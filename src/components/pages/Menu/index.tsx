import Link from 'next/link';
import PageLayout from '@/components/bases/PageLayout';
import Card from '@/components/ui/Card';

/*
  NOTE: カスタムコンポーネントで囲った場合、子要素はカスタムコンポーネントの`children`という属性に渡されます
*/
export default function Menu() {
  return (
    <PageLayout title='予約メニュー'>
      <div className='grid grid-cols-4 gap-4 p-4'>
        <Link href='/menu/reservation' className='col-span-4 lg:col-span-2'>
          <Card title='予約登録' text='施設の予約フォーム' />
        </Link>
        <Link href='/menu/list' className='col-span-4 lg:col-span-2'>
          <Card title='予約確認' text='施設ごとの予約状況の確認' />
        </Link>
        <Link href='/facilities' className='col-span-4 lg:col-span-2'>
          <Card title='施設一覧' text='予約できる施設の一覧' />
        </Link>
      </div>
    </PageLayout>
  );
}
