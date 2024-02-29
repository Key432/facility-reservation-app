// NOTE: middleware.tsについては以下を参考
// https://qiita.com/masakinihirota/items/30a5e06e3288031b9788
// middlewareは/src直下に置く決まりがあります。

import { Database } from '@/lib/supabase/database.types';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ログインしていない状態で/reservation配下にアクセスした場合はログイン画面にリダイレクト
  if (req.nextUrl.pathname.startsWith('/reservation') && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // ログインしている状態でログイン画面にアクセスした場合は予約メニューにリダイレクト
  if (req.nextUrl.pathname === '/login' && user) {
    return NextResponse.redirect(new URL('/reservation', req.url));
  }

  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
