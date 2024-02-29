// サーバーでのセッション認証を行うため、サーバーでの使用を強制する
'use server';

import { Database } from '@/lib/supabase/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export type FacilityList = {
  facility_id: number;
  name: string;
};

export type FacilityData = {
  facility_id: number;
  name: string;
  capacity: string | null;
  description: string | null;
  picture_url: string | null;
  created_at: string;
};

// クッキーを読み込みなおすため、サーバーでデータをキャッシュせず、強制的にレンダリングしなおさせる設定
export const dynamic = 'force-dynamic';

export async function accessFacility() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: facilityList } = await supabase
    .from('facility')
    .select('facility_id, name')
    .order('facility_id');

  const fetchFacility = async (facility_id: number): Promise<FacilityData | null> => {
    const { data } = await supabase
      .from('facility')
      .select('*')
      .eq('facility_id', facility_id)
      .single();

    return data as FacilityData | null;
  };

  return { facilityList, fetchFacility };
}