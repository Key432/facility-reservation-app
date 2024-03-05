'use client';

import { useFacility } from '@/features/Facility/hooks/useFacility';
import { useReservation } from '../hooks/useReservation';
import { addDays, format, isSameDay } from 'date-fns';
import Link from 'next/link';

// Nに入れた数値分の要素を持つ固定長配列を作成する
type FixedLengthArray<T, N extends number, A extends unknown[] = []> = A extends {
  length: N;
}
  ? A
  : FixedLengthArray<T, N, [...A, T]>;

type Header = {
  date: Date;
};

type TableReservation = {
  date: Date;
  isReserved: boolean;
};

type TableHeader<N extends number> = FixedLengthArray<Header, N>;
type Reservations<N extends number> = FixedLengthArray<TableReservation, N>;
type TableData<N extends number> = {
  facility_id: number;
  name: string;
  reservations: Reservations<N>;
}[];

type ReservationTable<Range extends number> = {
  header: TableHeader<Range>;
  data: TableData<Range>;
};

// テーブルに表示する日数
const viewRange = 90;

/**
 *
 * @param reservations {Reservation[]} 予約一覧
 * @param facilities {FacilityData[]} 施設一覧
 * @returns 今日から固定日数間の期間のそれぞれの予約有無を格納したテーブル用データを作成する
 */
function constructReservationTable(
  reservations: Reservation[],
  facilities: FacilityData[],
): ReservationTable<typeof viewRange> {
  const header = Array.from({ length: viewRange }, (_, index) => {
    return addDays(new Date(), index);
  }).map((date) => ({ date: date })) as TableHeader<typeof viewRange>;
  const data = facilities.map((facility) => {
    const { facility_id, name } = facility;
    const filteredReservations = reservations.filter((reservation) => {
      return reservation.facility_id === facility_id;
    });
    const reservationsData: Reservations<typeof viewRange> = header.map((item) => {
      const { date } = item;
      const isReserved = !!filteredReservations.find((reservation) => {
        return isSameDay(reservation.reservation_date, date);
      });
      return { date, isReserved };
    }) as Reservations<typeof viewRange>;

    return { facility_id, name, reservations: reservationsData };
  });
  return { header, data };
}

export default function Table() {
  const { reservations } = useReservation();
  const { facilities } = useFacility();
  const tableData = constructReservationTable(reservations, facilities);

  return (
    <div className='w-full overflow-x-auto'>
      <table>
        <thead className='bg-gray-100'>
          <tr>
            <th className='sticky left-0 min-w-24 bg-gray-100 pl-2 text-left'>施設</th>
            {tableData.header.map((row, index) => {
              return (
                <th key={index} className='px-2'>
                  {format(row.date, 'MM/dd')}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.data.map((item, index) => {
            return (
              <tr key={index}>
                <th
                  scope='row'
                  className='sticky left-0 min-w-24 bg-gray-100 pl-2 text-left'
                >
                  {item.name}
                </th>
                {item.reservations.map((reservation, index) => {
                  return (
                    <TableD
                      facility_id={item.facility_id}
                      reservation={reservation}
                      key={index}
                    />
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableD({
  facility_id,
  reservation,
}: {
  facility_id: number;
  reservation: TableReservation;
}) {
  if (reservation.isReserved) {
    return <td className='bg-gray-100'>×</td>;
  } else {
    return (
      <td>
        <Link
          href={`/menu/reservation?facility_id=${facility_id}&reservation_date=${format(reservation.date, 'yyyy-MM-dd')}`}
          className='underline hover:text-[#FF0099]'
        >
          〇
        </Link>
      </td>
    );
  }
}
