'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

//NOTE: 認証関係の情報を提供するカスタムフックス。カスタムフックはuseで始める必要があります。
export function useAuthState() {
  const supabase = createClientComponentClient<Database>();
  const [event, setEvent] = useState<AuthChangeEvent | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // NOTE: useEffectは副作用を制御するHooksです。
  // マウント時と第二引数の配列（依存配列）が変更されたときに第一引数のコールバック関数が実行されます。
  useEffect(() => {
    // 認証に関するイベントとセッション情報を監視するSupabaseの関数
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setEvent(event);
      setSession(session);
    });

    // NOTE: useEffectのコールバック関数のreturnは「クリーンアップ関数」と呼ばれます。
    // コンポーネントのアンマウント時または依存配列に渡した値が変更されたときに、コールバック関数が実行される前に、
    // returnで返される関数が実行されます。ここでは認証イベントの監視解除を行います
    return () => data.subscription.unsubscribe();
  }, [supabase.auth]);

  // sessionがnull -> ログイン中ではない
  const isLoggedIn: boolean = session !== null;

  return { event, session, isLoggedIn };
}
