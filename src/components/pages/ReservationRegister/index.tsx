import PageLayout from '@/components/bases/PageLayout';
import ReservationForm from '@/features/Reservation/components/Form';

export default function ReservationRegister() {
  return (
    <PageLayout title='予約登録'>
      <div className='flex h-full flex-grow flex-col items-center justify-center'>
        <ReservationForm />
      </div>
    </PageLayout>
  );
}
