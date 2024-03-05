'use client';

import { Database } from '@/lib/supabase/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCallback, useEffect, useState } from 'react';
import { isSameDay, format } from 'date-fns';

export type ReservationInsertParams = {
  facility_id: number;
  reservation_date: Date;
  remark: string | null;
  furniture_ids: number[];
};

export function useReservation() {
  const supabase = createClientComponentClient<Database>();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const fetchData = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('reservation_with_data')
        .select('*')
        .filter('reservation_date', 'gte', today);

      setReservations(
        (data?.map((item) => {
          const { reservation_date, ...remain } = item as Reservation & {
            reservation_date: string;
          };
          return { ...remain, reservation_date: new Date(reservation_date) };
        }) as Reservation[]) ?? [],
      );
      setLoading(false);
    };
    void fetchData();
  }, [supabase]);

  /*
    NOTE: `useCallback()`は関数をメモ化するためのHooksです。
    これを使うことで、依存配列に渡した値が変化するときのみ関数が新たに作成されます。
    NOTE: 進んだ注：JavaScriptの関数は第一級オブジェクトであり、内部ではオブジェクトリテラルで管理されます。
    レンダリングされるたびに関数は異なるアドレスが振られるため、別物として扱われます。
    メモ化することで最初に宣言された関数がレンダリングに拘わらず返されるためパフォーマンスが向上する可能性があります
  */
  const isReserved = useCallback(
    (facility_id: number, reservation_date: Date): boolean => {
      return !!reservations.find((reservation) => {
        return (
          reservation.facility_id === facility_id &&
          isSameDay(new Date(reservation.reservation_date), new Date(reservation_date))
        );
      });
    },
    [reservations],
  );

  const reserveFacility = useCallback(
    (insertParams: ReservationInsertParams) => {
      const insertReservation = async () => {
        const { furniture_ids, ...remain } = insertParams;
        const { data } = await supabase
          .from('reservation')
          .insert({
            facility_id: remain.facility_id,
            reservation_date: format(new Date(remain.reservation_date), 'yyyy-MM-dd'),
            remark: remain.remark,
          })
          .select()
          .single();
        const { reservation_id } = data!;
        for (const furniture_id of furniture_ids) {
          await supabase.from('reservation_furniture').insert({
            reservation_id,
            furniture_id,
          });
        }
        await supabase.from('reservation_user').insert({ reservation_id });
      };
      void insertReservation();
    },
    [supabase],
  );

  return { reservations, isLoading, isReserved, reserveFacility };
}
