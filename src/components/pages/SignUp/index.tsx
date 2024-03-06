import PageLayout from '@/components/bases/PageLayout';
import SignUp from '@/features/Auth/component/SignUp';

export default function SignUpPage() {
  return (
    <PageLayout title='会員登録'>
      <div className='flex h-full flex-col items-center justify-center'>
        <p className='py-4 font-bold'>
          開発速度を優先してセキュリティの確認などをあまりしていないので、ダミーデータ以外は登録しないでください
        </p>
        <SignUp signupSuccessRedirect='/menu' />
      </div>
    </PageLayout>
  );
}
