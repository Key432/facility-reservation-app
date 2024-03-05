import PageLayout from '@/components/bases/PageLayout';
import SignUpForm from '@/features/Auth/component/SignUpForm';

export default function SignUp() {
  return (
    <PageLayout title='会員登録'>
      <div className='flex h-full flex-col items-center justify-center'>
        <p className='py-4 font-bold'>
          開発速度を優先してセキュリティの確認などをあまりしていないので、ダミーデータ以外は登録しないでください
        </p>
        <SignUpForm signupSuccessRedirect='/menu' />
      </div>
    </PageLayout>
  );
}
