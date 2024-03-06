// NOTE: onSubmitはユーザーの操作によって発火するイベントなのでサーバーサイドでは使えません。"use client"を指定します。
// ちなみに、"use client"はReactの現行v18で実験的実装で、次期v19で正式実装予定のものをNext.jsが先んじて実装したものです。
// そのためReactの時期バージョンアップでもしかすると仕様が変わるかもしれません。
'use client';

import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// NOTE:  クライアントコンポーネントでリダイレクトなどを行うためのHooksです。
// ネットで検索すると同名の`useRouter`を`next/router`から読み込んでいるものがありますが、Page Routerのものです。
import { useRouter } from 'next/navigation';
import LoginForm, { LoginData } from './LoginForm';

export default function Login({
  loginSuccessRedirect,
}: {
  loginSuccessRedirect?: string;
}) {
  // supabaseを操作するクライアントの作成
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  // formのサブミットボタンを押下されるとhandleSbumitに渡したこのonSubmitが実行される。
  // フォームのデータは引数としてわたってくる
  const onSubmit = async ({ email, password }: LoginData) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // propsで渡されたページに遷移する
      if (loginSuccessRedirect) void router.push(loginSuccessRedirect);
    } catch (error) {
      console.error(error);
      alert('サインインに失敗しました');
    }
  };

  return (
    <div className='rounded-lg border border-gray-400 p-8'>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}
