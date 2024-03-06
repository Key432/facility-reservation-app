'use client';

import { useForm } from 'react-hook-form';

import Button from '@/components/ui/Button';

export type SignUpData = {
  email: string;
  name: string;
  sex: string;
  password: string;
};

const emailPattern =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export default function SignUpForm({
  onSubmit,
}: {
  onSubmit: (data: SignUpData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();

  return (
    <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
      <div className='grid grid-cols-2 gap-x-4 gap-y-2 text-left'>
        <div className='col-span-1'>
          <label htmlFor='name' className='block'>
            名前*
          </label>
          <input
            id='name'
            {...register('name', { required: true })}
            className='w-full rounded-md border border-gray-400 p-2'
            placeholder='施設太郎'
          />
          <p className={`text-red-600 ${errors.name ? 'visible' : 'invisible'}`}>
            必須項目です
          </p>
        </div>
        <div className='col-span-1'>
          <label htmlFor='sex' className='block'>
            性別*
          </label>
          <select
            id='sex'
            {...register('sex', { required: true })}
            className='w-full rounded-md border border-gray-400 p-2'
            defaultValue={undefined}
          >
            <option value='male'>男性</option>
            <option value='female'>女性</option>
            <option value='other'>その他</option>
          </select>
          <p className={`text-red-600 ${errors.sex ? 'visible' : 'invisible'}`}>
            必須項目です
          </p>
        </div>
        <div className='col-span-2'>
          <label htmlFor='email' className='block'>
            メールアドレス*
          </label>
          <input
            id='email'
            {...register('email', { pattern: emailPattern, required: true })}
            className='w-full rounded-md border border-gray-400 p-2'
            placeholder='email@example.com'
          />
          <p className={`text-red-600 ${errors.email ? 'visible' : 'invisible'}`}>
            正しい形式のメールアドレスを入力してください
          </p>
        </div>
        <div className='col-span-2'>
          <label htmlFor='password' className='block'>
            パスワード*
          </label>
          <input
            id='password'
            {...register('password', { required: true, minLength: 6 })}
            className='w-full rounded-md border border-gray-400 p-2'
            type='password'
            placeholder='password'
          />
          <p className={`text-red-600 ${errors.password ? 'visible' : 'invisible'}`}>
            パスワードは6文字以上で必須です
          </p>
        </div>
      </div>
      <Button
        label='登録'
        className='w-full rounded-md bg-[#FF99D6] py-2 hover:bg-[#FF0099]'
      />
    </form>
  );
}
