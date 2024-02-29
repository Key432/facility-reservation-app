import Menu from '@/components/pages/Menu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '予約メニュー',
};

export default function Page() {
  return <Menu />;
}
