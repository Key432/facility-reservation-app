'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/lib/supabase/database.types';

export function useFacility() {
  const supabase = createClientComponentClient<Database>();
  const [facilities, setFacilities] = useState<FacilityData[]>([]);

  useEffect(() => {
    const fetchFacilityData = async () => {
      const { data } = await supabase
        .from('facility')
        .select('*, furniture(*)')
        .order('facility_id');

      setFacilities(data ?? []);
    };

    void fetchFacilityData();
  }, [supabase]);

  return { facilities };
}
