'use client';

import Button from '@/components/ui/Button';
import { useFacility } from '@/features/Facility/hooks/useFacility';
import { useForm } from 'react-hook-form';

type ReservationItem = {
  facility_id: number;
  furniture?: number[];
  reservation_date: Date;
  remark?: string;
};

export default function ReservationForm() {
  const { facilities } = useFacility();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<ReservationItem>();

  const selectedFurniture = facilities.find((faclity) => {
    return faclity.facility_id === Number(watch('facility_id'));
  })?.furniture;

  const onSubmit = (data: ReservationItem) => {
    console.log(data);
  };

  return (
    <div className='min-w-96 rounded-lg border border-gray-400 p-8'>
      <div className='text-left'>
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className='mb-2'>
            <div className='flex justify-between'>
              <label className='block' htmlFor='facility_id'>
                予約する設備*
              </label>
              <p
                className={`text-red-600 ${errors.facility_id ? 'visible' : 'invisible'}`}
              >
                必須項目です
              </p>
            </div>
            <select
              id='facility_id'
              {...register('facility_id', { required: true })}
              className='w-full rounded-md border border-gray-400 p-2'
            >
              {facilities.map((facility) => {
                const { facility_id, name } = facility;
                return (
                  <option key={facility_id} value={facility_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='mb-4'>
            <p>使用什器</p>
            <div className='h-20 overflow-y-auto rounded-lg border border-gray-400'>
              {selectedFurniture?.map((furniture) => {
                return (
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
                );
              })}
            </div>
          </div>
          <div className='mb-2'>
            <div className='flex justify-between'>
              <label className='block' htmlFor='password'>
                予約日*
              </label>
              <p
                className={`text-red-600 ${errors.reservation_date ? 'visible' : 'invisible'}`}
              >
                必須項目です
              </p>
            </div>
            <input
              id='reservation_date'
              {...register('reservation_date', { required: true })}
              className='w-full rounded-md border border-gray-400 p-2'
              type='date'
            />
          </div>
          <div className='mb-4'>
            <label className='block' htmlFor='remark'>
              備考
            </label>
            {/* 
              NOTE: Reactの`<textarea>`の指定方法はプレーンHTMLの書き方
              `<textarea></textarea>`と異なります
            */}
            <textarea
              id='remark'
              {...register('remark', { required: true })}
              className='w-full rounded-md border border-gray-400 p-2'
            />
          </div>
          <Button
            label='予約'
            className='w-full rounded-md bg-[#FF99D6] py-2 hover:bg-[#FF0099]'
          />
        </form>
      </div>
    </div>
  );
}
