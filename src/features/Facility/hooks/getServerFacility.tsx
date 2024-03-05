// サーバーでのセッション認証を行うため、サーバーでの使用を強制する
'use server';

import { Database } from '@/lib/supabase/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export async function fetchFacilityData(
  facility_id: number,
): Promise<FacilityData | null> {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from('facility')
    .select('*, furniture(*)')
    .eq('facility_id', facility_id)
    .single();

  return data;
}
