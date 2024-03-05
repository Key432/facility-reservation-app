'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';

export function useFacility() {
  const supabase = createClientComponentClient<Database>();
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFacilityData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('facility')
        .select('*, furniture(*)')
        .order('facility_id');

      setFacilities(data ?? []);
      setLoading(false);
    };

    void fetchFacilityData();
  }, [supabase]);

  return { facilities, isLoading };
}
