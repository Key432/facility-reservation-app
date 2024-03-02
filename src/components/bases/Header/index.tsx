/*
  NOTE: Headerはlayout.tsxで使います。
  もしtamplete.tsxで使うと画面遷移のたびに一瞬だけ「ログアウト」ボタンがちらつきます。
  なぜなら、`AuthStateWrapper`はログイン状態に応じて表示・非表示を決めるものですが、
  コンポーネントマウント時の初期時点で非ログイン状態のstateを持っています。
  そのため、一瞬だけ非ログイン状態で表示させるコンテンツが表示されます。
  layout.tsxは最初に一回だけマウントされるので、（最初の一回以外）ちらつきは起きません。
*/

import Link from 'next/link';
import LogOut from '@/features/Auth/component/LogOut';

import AuthStateWrapper from '@/features/Auth/component/AuthStateWrapper';

export default function Header() {
  return (
    <header className='fixed top-0 h-16 w-full bg-[#33CCBB] px-4'>
      <div className='container mx-auto flex h-full w-full items-center justify-between'>
        <Link href='/'>
          <p className='font-noto py-4 text-lg font-bold'>設備予約デモ</p>
        </Link>
        {/* AuthStateWrapperはログインしているかどうかで表示・非表示を変えますshowWhenLoggedInがtrueの時はログイン中にだけ表示するコンテンツ */}
        <AuthStateWrapper showWhenLoggedIn={true}>
          <div className='flex h-full items-center '>
            <Link
              href='/reservation'
              className='flex h-full items-center bg-[#FF99D6] px-4 font-bold hover:bg-[#FF0099]'
            >
              予約ページ
            </Link>
            <div className='flex h-full items-center bg-[#FF99D6] px-4 font-bold hover:bg-[#FF0099]'>
              <LogOut />
            </div>
          </div>
        </AuthStateWrapper>
        <AuthStateWrapper showWhenLoggedIn={false}>
          <Link
            href='/login'
            className='flex h-full items-center bg-[#FF99D6] px-4 font-bold hover:bg-[#FF0099]'
          >
            ログイン
          </Link>
        </AuthStateWrapper>
      </div>
    </header>
  );
}
