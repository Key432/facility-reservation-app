import FacilityLayout from '@/components/bases/FacilityLayout';

// NOTE: layoutは入れ子にできる。この場合、facilities配下ではこのレイアウトとapp直下のレイアウトにラップされる
export default function Layout({ children }: { children: React.ReactNode }) {
  return <FacilityLayout>{children}</FacilityLayout>;
}
