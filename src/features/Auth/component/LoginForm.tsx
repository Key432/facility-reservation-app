// NOTE: onSubmitはユーザーの操作によって発火するイベントなのでサーバーサイドでは使えません。"use client"を指定します。
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';

import Button from '@/components/ui/Button';
import Link from 'next/link';
// NOTE: React-Hook-Formは主流のフォームヘルパーライブラリです。詳しい使い方は公式ドキュメントを参照してください。
// https://react-hook-form.com/
import { useForm } from 'react-hook-form';

// NOTE:  クライアントコンポーネントでリダイレクトなどを行うためのHooksです。
// ネットで検索すると同名の`useRouter`を`next/router`から読み込んでいるものがありますが、Page Routerのものです。
import { useRouter } from 'next/navigation';

export type LoginForm = {
  email: string;
  password: string;
};

const emailPattern =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export default function LoginForm() {
  // supabaseを操作するクライアントの作成
  const supabase = createClientComponentClient<Database>();
  // ルーティング操作を行うHooksであるuseRouterからインスタンスを取得
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // formのサブミットボタンを押下されるとhandleSbumitに渡したこのonSubmitが実行される。
  // フォームのデータは引数としてわたってくる
  const onSubmit = async ({ email, password }: LoginForm) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      /*
        NOTE: ログインに成功した場合は画面をリフレッシュする。
        リフレッシュするとmiddlewareの処理が走り
        「ログイン済み状態でログイン画面にいる場合は予約メニューにリダイレクト」が実行される
        router.push()を使うとリダイレクトをここで行えるが、全体を覆っているLayoutのサーバーサイドコンポーネントである
        Headerが再読み込みされず、ログイン済み状態でも「予約メニュー・ログアウト」ボタンが表示されなかったのでこの方法にしている
      */
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('サインインに失敗しました');
    }
  };

  /* NOTE: Reactにおけるフォームの作り方はしっかり調べるとややこしいです。
    ReactのフォームにはControled、Uncontroledという概念があります。
    ざっくりstateで管理するかrefで管理するかという違いがあります。
    これはUI Componentライブラリを使う場合などに問題になることがあります
    参考
    https://zenn.dev/tns_00/articles/react-controlled-and-uncontrolled
  */
  return (
    <div className='rounded-lg border border-gray-400 p-8'>
      {/* NOTE: 公式ドキュメントではこうしていないはずだが、こうしないと動かなかったりSubmitによるリロードが走る。要検証。*/}
      <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
        <div className='mb-4'>
          <label>
            メールアドレス*
            {/*
              NOTE: JSXのなかでは{}で囲むことで式を書くことができます。変数などを表示させるときに{}で括るのはこのためです。
              ここで`...register()`の`...`はスプレッド構文というものです。
              https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
              
              register()は引数でオブジェクトリテラルを返すのですが、そのkey-valueをタグ内に展開することができます。
              例えば
              ```
                const props = {label: "test", color: "black"}
                <Button {...props}/>
              ```
              と書くのは、
              ```
                <Button label="test" color="black"/>
              ```
              と書くのと同じことです。子コンポーネントにまとめてpropsを渡すとき便利です。
            */}
            <input
              {...register('email', { pattern: emailPattern, required: true })}
              className='ml-2 rounded-md border border-gray-400 p-2'
              placeholder='email@example.com'
            />
          </label>
          {/*
            NOTE: この書き方はJavaScriptの短絡評価を利用しています。
            JSでは""（空文字）や`0`、`null`などはfalsyな値となります。エラーの時は文字列がわたりtruthyになるので<p>タグがレンダリングされます。
            RHFではエラーがない場合は`undefined`となるため使えますが、数値などがわたる場合は0が描画されてしまうので三項演算子をつかうことをお勧めします。
            https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND
          */}
          {errors.email && (
            <p className='text-red-600'>正しい形式のメールアドレスを入力してください</p>
          )}
        </div>
        <div className='mb-4'>
          <label>
            パスワード*
            <input
              {...register('password', { required: true })}
              className='ml-2 rounded-md border border-gray-400 p-2'
              type='password'
              placeholder='password'
            />
          </label>
          {errors.password && (
            <p className='text-red-600'>パスワードを入力してください</p>
          )}
        </div>
        <Button
          label='ログイン'
          className='w-full rounded-md bg-[#FF99D6] py-2 hover:bg-[#FF0099]'
        />
      </form>
      <p className='mt-4'>
        会員登録がまだですか？{' '}
        <Link href='/signup' className='underline hover:text-[#FF0099]'>
          サインアップ
        </Link>
      </p>
    </div>
  );
}
