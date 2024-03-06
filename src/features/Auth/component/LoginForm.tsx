'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
// NOTE: React-Hook-Formは主流のフォームヘルパーライブラリです。詳しい使い方は公式ドキュメントを参照してください。
// https://react-hook-form.com/
import { useForm } from 'react-hook-form';

export type LoginData = {
  email: string;
  password: string;
};

const emailPattern =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

export default function LoginForm({
  onSubmit,
}: {
  loginSuccessRedirect?: string;
  onSubmit: (data: LoginData) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  /* 
    NOTE: Reactにおけるフォームの作り方はしっかり調べるとややこしいです。
    ReactのフォームにはControled、Uncontroledという概念があります。
    ざっくりstateで管理するかrefで管理するかという違いがあります。
    これはUI Componentライブラリを使う場合などに問題になることがあります
    参考
    https://zenn.dev/tns_00/articles/react-controlled-and-uncontrolled
  */
  return (
    <>
      {/*
        NOTE: `onSubmit={handleSubmit(onSubmit)}`では動かず、こうやって無名関数でラップしないとエラーになる。
        同事例報告あり：https://stackoverflow.com/questions/74190256/eslint-promise-returning-function-provided-to-attribute-where-a-void-return-was
      */}
      <div className='text-left'>
        <form onSubmit={(event) => void handleSubmit(onSubmit)(event)}>
          <div className='mb-2'>
            {/* NOTE: htmlのfor属性はJSの予約語と衝突するのでhtmlForとなります */}
            <label className='block' htmlFor='email'>
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
          <div className='mb-4'>
            <label className='block' htmlFor='password'>
              パスワード*
            </label>
            <input
              id='password'
              {...register('password', { required: true })}
              className='w-full rounded-md border border-gray-400 p-2'
              type='password'
              placeholder='password'
            />
            <p className={`text-red-600 ${errors.password ? 'visible' : 'invisible'}`}>
              パスワードを入力してください
            </p>
          </div>
          <Button
            label='ログイン'
            className='w-full rounded-md bg-[#FF99D6] py-2 hover:bg-[#FF0099]'
          />
        </form>
      </div>
      <p className='mt-4'>
        会員登録がまだですか？{' '}
        <Link href='/signup' className='underline hover:text-[#FF0099]'>
          サインアップ
        </Link>
      </p>
    </>
  );
}
