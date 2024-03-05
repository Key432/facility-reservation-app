import PageLayout from '@/components/bases/PageLayout';
import Table from '@/features/Reservation/components/Table';

export default function ReservationList() {
  return (
    <PageLayout title='予約一覧'>
      <div>
        <Table />
      </div>
    </PageLayout>
  );
}
