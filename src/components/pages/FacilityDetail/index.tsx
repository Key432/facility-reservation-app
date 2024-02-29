import { accessFacility } from '@/features/Facility/hooks/accessFacility';
import { notFound } from 'next/navigation';

// NOTE: 画像が設定されていないとき用の静的画像ファイルです。イメージデータなどをこのように直接importできます
import picture from './noimage.drawio.png';
import Image from 'next/image';
import Link from 'next/link';

export default async function FacilityDetail({ facility_id }: { facility_id: number }) {
  const { fetchFacility } = await accessFacility();
  const facility = await fetchFacility(facility_id);

  // facilityがnullのとき=facility_idが無かったときなのでnotFound画面に飛ばす
  // NOTE: `notFouond()`は任意の時に404ページに遷移させる関数。
  // 404ページは/app直下に`not-found.tsx`を作成することでデザインできる。
  if (!facility) notFound();

  return (
    <div className='container mx-auto h-full pt-6'>
      <div className='justify-betweeen mb-6 md:flex'>
        {/*
            NOTE: next/imageのImageコンポーネントは画像の配信を最適化するコンポーネントです。
            画像の大きさやキャッシュを最適化してくれます。大きさの指定などに癖があるので確認してください。
          */}
        <Image
          src={facility?.picture_url ?? picture}
          alt='施設写真'
          height={300}
          width={300}
          className='m-6 mt-0'
        />
        <div className='px-4'>
          <div className='items-center justify-between lg:flex'>
            <div>
              <h1 className='inline text-6xl font-extrabold'>{facility.name}</h1>
              <p className='ml-4 inline'>収容人数: {facility.capacity}</p>
            </div>
            <div className='mt-4'>
              <Link
                href={`/reservation/register?id=${facility.facility_id}`}
                className='rounded-md bg-[#FF99D6] px-10 py-4 hover:bg-[#FF0099]'
              >
                この施設を予約する
              </Link>
            </div>
          </div>
          <p className='pt-4'>※画像・施設説明文はすべてChatGPTが生成したものです。</p>
          <div className='flex w-full justify-between pt-6'>
            <p>{facility?.description ?? '説明がありません'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
