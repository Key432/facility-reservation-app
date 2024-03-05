import List from '@/features/Facility/component/List';

export default function FacilityLayout({ children }: { children: React.ReactNode }) {
  // レスポンシブに少し対応：画面が小さくなると左部にあった一覧を下部に移動させる
  // そのため`flex-row-reverse`を指定している
  return (
    <div className='h-full md:flex md:flex-row-reverse'>
      <div className='md:flex-grow'>{children}</div>
      <div className='border-r-2 md:w-1/6'>
        <List
          href='/facilities'
          ulClassName='bg-gray-100'
          liClassName='pl-2 py-4 hover:bg-gray-200'
        />
      </div>
    </div>
  );
}
