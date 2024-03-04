import { notFound } from 'next/navigation';

// NOTE: 画像が設定されていないとき用の静的画像ファイルです。イメージデータなどもこのように直接importできます
import noImage from './noimage.drawio.png';
import Image from 'next/image';
import { fetchFacilityData } from '@/features/Facility/hooks/getServerFacility';
import Link from 'next/link';
import { getAuthState } from '@/features/Auth/hooks/getServerAuthState';

export default async function FacilityDetail({ facility_id }: { facility_id: number }) {
  const facility = await fetchFacilityData(facility_id);

  const { isLoggedIn } = await getAuthState();

  // facilityがnullのとき=facility_idが無かったときなのでnotFound画面に飛ばす
  // NOTE: `notFouond()`は任意の時に404ページに遷移させる関数。
  // 404ページは/app直下に`not-found.tsx`を作成することでデザインできる。
  if (!facility) notFound();

  return (
    <div className='container mx-auto h-full'>
      <div className='flex h-full flex-col justify-center md:flex-row-reverse md:justify-between'>
        <div className='flex w-full items-center justify-center'>
          <Image
            src={facility.picture_url ?? noImage}
            alt='施設写真'
            height={300}
            width={300}
          />
        </div>
        <div className='py-2 md:w-2/3 md:flex-grow'>
          <h1 className='pb-10 font-noto text-6xl font-extrabold'>{facility.name}</h1>
          <div className='pl-4 text-lg'>
            <div className='mb-4'>
              <h3 className='font-noto font-semibold'>収容人数</h3>
              <p className='ml-10'>{facility.capacity}</p>
            </div>
            <div className='mb-4'>
              <h3 className='font-noto font-semibold'>使用可能備品</h3>
              <ul className='ml-10 list-disc'>
                {facility.furniture?.map((item) => {
                  return <li key={item.furniture_id}>{item.name}</li>;
                })}
              </ul>
            </div>
            <div className='mb-8'>
              <h3 className='font-noto font-semibold'>概要</h3>
              <p className=''>{facility.description}</p>
            </div>
            {isLoggedIn && (
              <div className='mb-8'>
                <Link
                  href={`/menu/reservation?facility_id=${facility.facility_id}`}
                  className='rounded-lg bg-[#FF99D6] p-4 font-bold hover:bg-[#FF0099]'
                >
                  予約する
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
