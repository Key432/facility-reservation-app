'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import SignUpForm, { SignUpData } from './SignUpForm';
import { Database } from '@/lib/supabase/database.types';

export default function SignUp({
  signupSuccessRedirect,
}: {
  signupSuccessRedirect?: string;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const onSubmit = async ({ name, sex, email, password }: SignUpData) => {
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
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
}
