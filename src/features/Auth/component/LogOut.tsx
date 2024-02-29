'use client';
/*
  NOTE: このコンポーネントはベストプラクティスになっていません
  なぜなら、ログアウトという基本的な機能にもかかわらず、ロジックとUIが分離しておらず、
  ログアウトのためのボタンのデザインをカスタマイズできないため再利用性が低いからです。
  今回は制作時間の都合でこのままです。
*/

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

export default function LogOut() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // 画面を再読み込みする
      // NOTE: 画面を再読み込みすると、middlewareの処理が走る。
      // 予約メニュー配下にいるときはmiddlewareの処理によってログインページにリダイレクトされる
      /* 
        NOTE: router.push()でログインページにリダイレクトすることもできるが、その場合、
        Layoutとして全体を覆っているサーバーサイドコンポーネントであるlayout.tsxが再読み込みされず、
        ログアウトされているのに「予約メニュー」ボタンが表示される（やり方が間違っているだけかも）
      */
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('ログアウトに失敗しました');
    }
  };

  return (
    <Button label='ログアウト' onClick={() => void handleLogOut()} className='h-full' />
  );
}
