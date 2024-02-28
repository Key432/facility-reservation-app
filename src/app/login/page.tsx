import Login from '@/component/page/Login';
import { Metadata } from 'next';

// NOTE: app/layout.tsxのmetadataで`title.template`を設定している場合、配下のメタデータでタイトルを指定するとtemplateの`%s`に代入されます
export const metadata: Metadata = {
  title: 'ログイン',
};

export default function Page() {
  return <Login />;
}
