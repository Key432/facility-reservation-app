import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/lib/supabase/database.types';
import LogOut from '@/features/Auth/component/LogOut';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export default async function Header() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='bg-[#33CCBB] px-4'>
      <div className='container mx-auto flex h-full w-full items-center justify-between'>
        <Link href='/'>
          <p className='font-noto py-4 text-lg font-bold'>設備予約デモ</p>
        </Link>
        {/* NOTE: v14からLinkは内部に<a>タグをラップするようになったのでh-fullでも背景が上下に伸びません。flexで対応しています */}
        {user ? (
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
        ) : (
          <Link
            href='/login'
            className='flex h-full items-center bg-[#FF99D6] px-4 font-bold hover:bg-[#FF0099]'
          >
            ログイン
          </Link>
        )}
      </div>
    </header>
  );
}
