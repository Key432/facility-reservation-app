import FacilityDetail from '@/components/pages/FacilityDetail';

// NOTE: ダイナミックルーティングの使用例。
// [facility_id]というディレクトリの配下に置くと、props.prams.<directory_name>に値が格納される
// ここではfacility/layout.tsxにて左のメニューからfacility_id（一意のID）がわたってくる
export default function Page({
  params: { facility_id },
}: {
  params: { facility_id: number };
}) {
  return <FacilityDetail facility_id={facility_id} />;
}
