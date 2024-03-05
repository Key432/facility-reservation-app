'use client';

import Button from '@/components/ui/Button';
import { useFacility } from '@/features/Facility/hooks/useFacility';
import { ReservationInsertParams, useReservation } from '../hooks/useReservation';

/*
  NOTE: `useSearchParams`はClient ComponentでURLQueryを取得するためのHooksです。
  <url>?hoge=""の結果を`.get()`や`.getAll()`で受け取れます
*/
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

type ReservationItem = {
  facility_id: number;
  furniture?: number[];
  reservation_date: Date;
  remark?: string;
};

export default function ReservationForm() {
  const { facilities, isLoading } = useFacility();
  const { isReserved, reserveFacility } = useReservation();
  const searchParams = useSearchParams();
  const defaultSelected = Number(searchParams.getAll('facility_id') || '');
  const defaultDate = searchParams.getAll('reservation_date')[0] ?? '';

  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ReservationItem>({
    defaultValues: {
      facility_id: defaultSelected || undefined,
    },
  });

  // NOTE: `watch()`はRHFのよく使う関数です。現在フォームに入力されている値を監視することができます
  const selectedFurniture =
    facilities
      .find((facility) => facility.facility_id === Number(watch('facility_id')))
      ?.furniture?.map((furniture) => ({
        name: furniture.name,
        furniture_id: furniture.furniture_id,
      })) ?? [];

  /*
    NOTE: 予約日に日付が入力された際に、その日付が今日以降かを確認する
    useEffectの依存配列に`reservationDate`をわたし、この値が変更されるたびに実行されるようにします。
    useEffectを使わない場合、今日以前の日付を選んだ瞬間に無限レンダリングが発生します
    NOTE: `setError()`はRHFのよく使う関数で、任意のタイミングでバリデーションエラーを発生させることができます。
    ただし、WGではzodを使っていたのでzodのresolverを使った方がよいかと思います
    TODO: zodを使ってバリデーションを実装する
  */
  const reservationDate = watch('reservation_date');
  const facilityId = watch('facility_id');
  useEffect(() => {
    if (new Date(reservationDate) <= new Date()) {
      setError('reservation_date', { message: '今日以降の日付を選択してください' });
    } else {
      clearErrors('reservation_date');
    }

    // すでに予約済みでないか確認する
    if (facilityId) {
      if (isReserved(Number(facilityId), new Date(reservationDate))) {
        setError('reservation_date', { message: '予約が埋まっています' });
      } else {
        clearErrors('reservation_date');
      }
    }
  }, [clearErrors, facilityId, isReserved, reservationDate, setError]);

  const onSubmit = (data: ReservationItem) => {
    const insertParams: ReservationInsertParams = {
      facility_id: data.facility_id,
      reservation_date: new Date(data.reservation_date),
      remark: data.remark ?? null,
      furniture_ids: data.furniture ?? [],
    };
    reserveFacility(insertParams);
    alert('予約が完了しました');
    reset();
  };

  return (
    <div className='min-w-96 rounded-lg border border-gray-400 p-8'>
      <div className='text-left'>
        {/* 
          NOTE: 設備一覧が取得できるまではフォームを表示しない。
          こうしないと、設備が<option>にわたるまえに<select>がレンダリングされてしまい、defaultValueが機能しない
        */}
        {!isLoading && (
          <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
            <div className='mb-2'>
              <div className='flex justify-between'>
                <label className='block' htmlFor='facility_id'>
                  予約する設備*
                </label>
                <p className='text-red-600'>
                  {errors.facility_id && errors.facility_id.message}
                </p>
              </div>
              {/* 
                NOTE: Reactでは<option>のselected属性は使えない。
                代わりに<select>タグのdefaultValue属性を使用する。
              */}
              <select
                id='facility_id'
                {...register('facility_id', {
                  required: '必須項目です',
                })}
                defaultValue={defaultSelected || ''}
                className='w-full rounded-md border border-gray-400 p-2'
              >
                <option value=''>選択してください</option>
                {facilities.map(({ facility_id, name }) => (
                  <option key={facility_id} value={facility_id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-4'>
              <p>使用什器</p>
              <div className='h-20 overflow-y-auto rounded-lg border border-gray-400 py-2'>
                {selectedFurniture.map((furniture) => (
                  <label
                    className='ml-2 block'
                    htmlFor={`furniture${furniture.furniture_id}`}
                    key={furniture.furniture_id}
                  >
                    <input
                      type='checkbox'
                      value={furniture.furniture_id}
                      id={`furniture${furniture.furniture_id}`}
                      {...register('furniture')}
                      className='mr-2'
                    />
                    {furniture.name}
                  </label>
                ))}
              </div>
            </div>
            <div className='mb-2'>
              <div className='flex justify-between'>
                <label className='block' htmlFor='reservation_date'>
                  予約日*
                </label>
                <p className='text-red-600'>
                  {errors.reservation_date && errors.reservation_date.message}
                </p>
              </div>
              <input
                id='reservation_date'
                {...register('reservation_date', { required: '必須項目です' })}
                className='w-full rounded-md border border-gray-400 p-2'
                type='date'
                defaultValue={defaultDate}
              />
            </div>
            <div className='mb-4'>
              <label className='block' htmlFor='remark'>
                備考
              </label>
              <textarea
                id='remark'
                {...register('remark')}
                className='w-full rounded-md border border-gray-400 p-2'
              />
            </div>
            <Button
              label='予約'
              className='w-full rounded-md bg-[#FF99D6] py-2 hover:bg-[#FF0099]'
            />
          </form>
        )}
      </div>
    </div>
  );
}
