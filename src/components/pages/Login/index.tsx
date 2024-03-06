import PageLayout from '@/components/bases/PageLayout';
import Login from '@/features/Auth/component/Login';

export default function LoginPage() {
  return (
    <PageLayout title='ログイン'>
      <div className='flex h-full flex-col items-center justify-center'>
        <p>
          プレースホルダーのメアドとパスワードでログインできます。会員登録もできます。
        </p>
        <Login loginSuccessRedirect='/menu' />
      </div>
    </PageLayout>
  );
}
