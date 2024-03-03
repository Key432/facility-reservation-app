'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';
import { useRouter } from 'next/navigation';

export default function LogOut({
  children,
  logoutSuccessRedirect,
}: {
  children: React.ReactNode;
  logoutSuccessRedirect?: string;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      if (logoutSuccessRedirect) router.push(logoutSuccessRedirect);
    } catch (error) {
      console.error(error);
      alert('ログアウトに失敗しました');
    }
  };

  return (
    <div onClick={() => void handleLogOut()} className='h-full'>
      {children}
    </div>
  );
}
