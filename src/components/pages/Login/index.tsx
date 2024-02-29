import PageLayout from '@/components/bases/PageLayout';
import LoginForm from '@/features/Auth/component/LoginForm';

export default function Login() {
  return (
    <PageLayout title='ログイン'>
      <div className='flex h-full flex-col items-center justify-center'>
        <LoginForm />
      </div>
    </PageLayout>
  );
}
