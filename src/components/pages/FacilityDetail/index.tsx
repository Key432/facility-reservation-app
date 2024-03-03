import { accessFacility } from '@/features/Facility/hooks/accessFacility';
import { notFound } from 'next/navigation';

// NOTE: 画像が設定されていないとき用の静的画像ファイルです。イメージデータなどもこのように直接importできます
import noImage from './noimage.drawio.png';
import Image from 'next/image';

export default async function FacilityDetail({ facility_id }: { facility_id: number }) {
  const { fetchFacility } = await accessFacility();
  const facility = await fetchFacility(facility_id);

  // facilityがnullのとき=facility_idが無かったときなのでnotFound画面に飛ばす
  // NOTE: `notFouond()`は任意の時に404ページに遷移させる関数。
  // 404ページは/app直下に`not-found.tsx`を作成することでデザインできる。
  if (!facility) notFound();

  return (
    <div className='container mx-auto h-full bg-blue-300'>
      <div className='grid h-full grid-cols-6 items-center gap-4'>
        <div className='col-span-4 grid h-full grid-cols-4'>
          <div className='col-span-4'>
            <h1 className='font-noto py-4 text-6xl font-bold'>{facility.name}</h1>
          </div>
          <div className='col-span-4'>
            <p className='text-xl'>収容人数：{facility.capacity}</p>
          </div>
        </div>
        <div className='col-span-2'>
          <Image
            src={facility?.picture_url ?? noImage}
            alt='施設の要素'
            height={300}
            width={300}
          />
        </div>
      </div>
    </div>
  );
}
