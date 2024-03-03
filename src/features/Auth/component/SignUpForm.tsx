'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';

import Button from '@/components/ui/Button';

export type SignUpForm = {
  email: string;
  name: string;
  sex: string;
  password: string;
};

const emailPattern =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export default function SignUpForm({
  signupSuccessRedirect,
}: {
  signupSuccessRedirect?: string;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async ({ name, sex, email, password }: SignUpForm) => {
    try {
      // これはSupabaseの会員登録実装を行っているので、NextAuth×Prisma×ローカルPostgreSQLとは実装が異なります。
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            sex,
          },
        },
      });

      // エラーの場合はthrowする（JavaScriptはエラーオブジェクト以外に文字列でもなんでもスローできる）
      if (error) throw error;

      // 会員登録が成功したら予約メニューに遷移
      if (signupSuccessRedirect) router.push(signupSuccessRedirect);
    } catch (error) {
      console.error(error);
      alert('登録に失敗しました');
    }
  };

  return (
    <div className='rounded-lg border border-gray-400 p-8'>
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
    </div>
  );
}
