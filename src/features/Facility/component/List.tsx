import { Database } from '@/lib/supabase/database.types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { HTMLAttributes, cache } from 'react';

type FacilityData = {
  facility_id: number;
  name: string;
};

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

/*
  NOTE: SSR（サーバーサイドレンダリング）のコンポーネントはコンポーネントレベルでasync/awaitを直接使えます
  これはApp Routerからの機能です。（Page RouterではgetServersidePropsを使う）
  データ取得中はloading.tsxが表示されるのでスケルトンなどをそちらで指定可能
*/
export default async function FacilityList({
  ulClassName,
  liClassName,
  linkClassName,
  href,
}: {
  ulClassName?: HTMLAttributes<HTMLUListElement>['className'];
  liClassName?: HTMLAttributes<HTMLLIElement>['className'];
  linkClassName?: string;
  href?: string;
}) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('facility')
    .select('facility_id, name')
    .order('facility_id');

  if (error) return null;

  const FacilityList = ({ name }: { name: string }) => {
    return <li className={liClassName}>{name}</li>;
  };

  return (
    <ul className={ulClassName}>
      {/*
        NOTE: `?.`はオプショナルチェーンという記法。
        `data`は`null`の可能性があるので、普通に`data.map()`とするとアクセスエラーが発生する可能性がある
        `?.`とすると左辺がnullやundefinedだった時点で全体としてundefinedを返してくれるためエラーとならない
        https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      */}
      {data?.map(({ facility_id, name }: FacilityData) => {
        // propsでhrefが指定されているときはLinkを指定する
        if (href) {
          return (
            <Link
              key={facility_id}
              href={`${href}/${facility_id}`}
              className={linkClassName}
            >
              <FacilityList name={name} />
            </Link>
          );
        } else {
          return <FacilityList key={facility_id} name={name} />;
        }
      })}
    </ul>
  );
}
