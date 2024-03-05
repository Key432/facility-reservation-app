import PageLayout from '@/components/bases/PageLayout';
import ReservationForm from '@/features/Reservation/components/Form';
import { Suspense } from 'react';

export default function ReservationRegister() {
  return (
    // NOTE: usePathParamsを使用するときはSuspenseで囲む必要があるため使用
    // https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
    // https://ja.react.dev/reference/react/Suspense
    <Suspense>
      <PageLayout title='予約登録'>
        <div className='flex h-full flex-grow flex-col items-center justify-center'>
          <ReservationForm />
        </div>
      </PageLayout>
    </Suspense>
  );
}
