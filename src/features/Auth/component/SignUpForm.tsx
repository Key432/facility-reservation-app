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

export default function SignUpForm() {
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
      const { data, error } = await supabase.auth.signUp({
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
      if (data.session) router.push('/reservation');
    } catch (error) {
      console.log(error);
      alert('登録に失敗しました');
    }
  };

  return (
    <div className='rounded-lg border border-gray-400 p-8'>
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className='mb-4'>
          <label>
            名前*
            <input
              {...register('name', { required: true })}
              className='ml-2 w-48 rounded-md border border-gray-400 p-2'
              placeholder='施設太郎'
            />
          </label>
          {errors.name && <p className='text-red-600'>必須項目です</p>}
        </div>
        <div className='mb-4'>
          <label>
            性別*
            <select
              {...register('sex', { required: true })}
              className='ml-2 w-48 rounded-md border border-gray-400 p-2'
              defaultValue={undefined}
            >
              <option value='male'>男性</option>
              <option value='female'>女性</option>
              <option value='other'>その他</option>
            </select>
          </label>
          {errors.sex && <p className='text-red-600'>必須項目です</p>}
        </div>
        <div className='mb-4'>
          <label>
            メールアドレス*
            <input
              {...register('email', { pattern: emailPattern, required: true })}
              className='ml-2 w-48 rounded-md border border-gray-400 p-2'
              placeholder='email@example.com'
            />
          </label>
          {errors.email && (
            <p className='text-red-600'>正しい形式のメールアドレスを入力してください</p>
          )}
        </div>
        <div className='mb-4'>
          <label>
            パスワード*
            <input
              {...register('password', { required: true, minLength: 6 })}
              className='ml-2 w-48 rounded-md border border-gray-400 p-2'
              type='password'
              placeholder='password'
            />
          </label>
          {errors.password && (
            <p className='text-red-600'>パスワードは6文字以上で必須です</p>
          )}
        </div>
        <Button
          label='登録'
          className='w-full rounded-md bg-[#FF99D6] py-2 hover:bg-[#FF0099]'
        />
      </form>
    </div>
  );
}
