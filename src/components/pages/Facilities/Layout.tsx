import { accessFacility } from '@/features/Facility/hooks/accessFacility';
import Link from 'next/link';

export default async function FacilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { facilityList } = await accessFacility();

  return (
    <div className='flex h-full justify-start'>
      <div className='h-full w-1/6 bg-gray-200 pl-4'>
        <ul className='pt-10'>
          {/* 
            この書き方は「オプショナルチェーン（data?.map()）」と「Null合体演算子（??）」を一緒に使っています
            オプショナルチェーンはAPIなど返り値が不確定な時に使えます。
            オプショナルチェーンはアクセスしたプロパティがNullish（Null / undefined）だった時、エラーになるのではなく、
            undefinedを返します。Null合体演算子は左の式がundefined / Nullの時右の式を返します。
            すなわち、この場合だともしデータが返ってこず`data`がnullのときは「登録されている施設がありません」という文字が返されます
          */}
          {facilityList?.map(({ facility_id, name }) => {
            return (
              <Link
                href={`/reservation/facilities/${facility_id}`}
                key={facility_id}
                className='underline hover:text-[#FF0099]'
              >
                <li className='my-4'>{name}</li>
              </Link>
            );
          }) ?? '登録されている施設がありません'}
        </ul>
      </div>
      <div className='flex-grow'>{children}</div>
    </div>
  );
}
